#!/usr/bin/env python3
import json
import torch
from ctc_forced_aligner import (
    load_alignment_model,
    get_alignments,
    get_spans,
    split_text,
    postprocess_results,
    text_normalize,
    get_uroman_tokens
)
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


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-e', required=True)
    parser.add_argument('--lang', default="eng")

    args = parser.parse_args()

    with sys.stdin as f:
        lines = f.readlines()
    text = "".join(line for line in lines).strip()

    emissions_path = args.e
    language = args.lang

    start_time = time.time()

    device = "cuda" if torch.cuda.is_available() else "cpu"
    batch_size = 16

    alignment_model, alignment_tokenizer = load_alignment_model(
        device,
        dtype=torch.float16 if device == "cuda" else torch.float32,
    )

    emissions, stride = torch.load(emissions_path)

    # TODO: Break this down into components and customize
    # `split_text` to split on newlines before using punkt
    tokens_starred, text_starred = preprocess_text(
        text,
        romanize=True,
        language=language,
        split_size="sentence"
    )

    segments, scores, blank_token = get_alignments(
        emissions,
        tokens_starred,
        alignment_tokenizer,
    )

    spans = get_spans(tokens_starred, segments, blank_token)

    timestamps = postprocess_results(text_starred, spans, stride, scores)
    print(json.dumps(timestamps))
