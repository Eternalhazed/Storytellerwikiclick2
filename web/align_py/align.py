import json
import torch
from ctc_forced_aligner import (
    load_alignment_model,
    preprocess_text,
    get_alignments,
    get_spans,
    postprocess_results,
)
import time
import argparse
import datetime

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', required=True)
    parser.add_argument('-e', required=True)
    parser.add_argument('--lang', default="eng")
    parser.add_argument('-o', required=True)

    args = parser.parse_args()
    text_path = args.i
    emissions_path = args.e
    output_path = args.o
    language = args.lang

    start_time = time.time()

    device = "cuda" if torch.cuda.is_available() else "cpu"
    batch_size = 16

    print("Loading alignment model...")
    alignment_model, alignment_tokenizer = load_alignment_model(
        device,
        dtype=torch.float16 if device == "cuda" else torch.float32,
    )
    print(f"Alignment model loaded {datetime.timedelta(seconds=time.time() - start_time)}")

    with open(text_path, "r") as f:
        lines = f.readlines()
    text = "".join(line for line in lines).replace("\n", " ").strip()

    print("Loading emissions...")
    emissions, stride = torch.load(emissions_path)
    print(f"Emissions loaded {datetime.timedelta(seconds=time.time() - start_time)}")

    print("Pre-processing text...")
    tokens_starred, text_starred = preprocess_text(
        text,
        romanize=True,
        language=language,
        split_size="sentence"
    )
    print(f"Pre-processed text {datetime.timedelta(seconds=time.time() - start_time)}")

    print("Generating alignments...")
    segments, scores, blank_token = get_alignments(
        emissions,
        tokens_starred,
        alignment_tokenizer,
    )
    print(f"Alignments generated {datetime.timedelta(seconds=time.time() - start_time)}")

    print("Getting spans...")
    spans = get_spans(tokens_starred, segments, blank_token)
    print(f"Done getting spans {datetime.timedelta(seconds=time.time() - start_time)}")

    timestamps = postprocess_results(text_starred, spans, stride, scores)
    json.dump(timestamps, output_path)
