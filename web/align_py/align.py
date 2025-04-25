#!/usr/bin/env python3
import json
import torch
import numpy as np
from ctc_forced_aligner import (
    load_alignment_model,
    get_alignments,
    get_spans,
    split_text,
    text_normalize,
    get_uroman_tokens,
    merge_segments
)
from ctc_forced_aligner.alignment_utils import time_to_frame
import time
import argparse
import sys


def preprocess_text(
    text, romanize, language, split_size="word", star_frequency="segment"
):
    assert split_size in [
        "sentence",
        "word",
        "char",
    ], "Split size must be sentence, word, or char"
    assert star_frequency in [
        "segment",
        "edges",
    ], "Star frequency must be segment or edges"
    if language in ["jpn", "chi"]:
        split_size = "char"
    text_split = [split for block in text.split('\n') for split in split_text(block, split_size) or []]
    norm_text = [text_normalize(line.strip(), language) for line in text_split]

    if romanize:
        tokens = get_uroman_tokens(norm_text, language)
    else:
        tokens = [" ".join(list(word)) for word in norm_text]

    # add <star> token to the tokens and text
    # it's used extensively here but I found that it produces more accurate results
    # and doesn't affect the runtime
    if star_frequency == "segment":
        tokens_starred = []
        [tokens_starred.extend(["<star>", token]) for token in tokens]

        text_starred = []
        [text_starred.extend(["<star>", chunk]) for chunk in text_split]

    elif star_frequency == "edges":
        tokens_starred = ["<star>"] + tokens + ["<star>"]
        text_starred = ["<star>"] + text_split + ["<star>"]

    return tokens_starred, text_starred



def postprocess_results(
    text_starred: list,
    spans: list,
    stride: float,
    scores: np.ndarray,
    skips: list[list[float]],
    merge_threshold: float = 0.0,
):
    results = []

    for i, t in enumerate(text_starred):
        if t == "<star>":
            continue
        span = spans[i]
        seg_start_idx = span[0].start
        seg_end_idx = span[-1].end

        audio_start_sec = seg_start_idx * (stride) / 1000
        audio_end_sec = seg_end_idx * (stride) / 1000

        for start, end in skips:
            if start < audio_start_sec:
                audio_start_sec += end - start
            if start < audio_end_sec:
                audio_end_sec += end - start

        score = scores[seg_start_idx:seg_end_idx].sum()
        sample = {
            "start": audio_start_sec,
            "end": audio_end_sec,
            "text": t,
            "score": score.item(),
        }
        results.append(sample)

    merge_segments(results, merge_threshold)
    return results



if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-e', required=True)
    parser.add_argument('--lang', default="eng")
    parser.add_argument('--skip', default="")

    args = parser.parse_args()

    with sys.stdin as f:
        lines = f.readlines()
    text = "".join(line for line in lines).strip()

    emissions_path = args.e
    language = args.lang
    skip_str = args.skip

    skips = [[float(n) for n in range.split(':')] for range in skip_str.split(',')] if skip_str else []

    start_time = time.time()

    device = "cuda" if torch.cuda.is_available() else "cpu"
    batch_size = 16

    alignment_model, alignment_tokenizer = load_alignment_model(
        device,
        dtype=torch.float16 if device == "cuda" else torch.float32,
    )

    emissions, stride = torch.load(emissions_path)

    tokens_starred, text_starred = preprocess_text(
        text,
        romanize=True,
        language=language,
        split_size="sentence"
    )

    keeps: list[list[int|None]] = [[None, None]]
    for start, end in skips:
        last_keep = keeps[-1]
        last_keep[1] = time_to_frame(start)

        keeps.append([time_to_frame(end), None])

    unskipped_emissions = torch.cat(
        [emissions[start:end] for start, end in keeps],
        dim=0
    )

    segments, scores, blank_token = get_alignments(
        unskipped_emissions,
        tokens_starred,
        alignment_tokenizer,
    )

    spans = get_spans(tokens_starred, segments, blank_token)

    timestamps = postprocess_results(text_starred, spans, stride, scores, skips)
    print(json.dumps(timestamps))
