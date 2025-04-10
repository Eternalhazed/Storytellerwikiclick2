#!/usr/bin/env python3
import torch
from ctc_forced_aligner import (
    load_audio,
    load_alignment_model,
    generate_emissions,
)
import time
import argparse
import datetime

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', required=True)
    parser.add_argument('--lang', default="eng")
    parser.add_argument('-o', required=True)

    args = parser.parse_args()
    input_path = args.i
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

    print("Loading audio...")
    audio_waveform = load_audio(input_path, alignment_model.dtype, alignment_model.device)
    print(f"Audio loaded {datetime.timedelta(seconds=time.time() - start_time)}")

    print("Generating emissions...")
    emissions, stride = generate_emissions(
        alignment_model, audio_waveform, batch_size=batch_size
    )
    print(f"Emissions generated {datetime.timedelta(seconds=time.time() - start_time)}")

    torch.save((emissions, stride), output_path)
