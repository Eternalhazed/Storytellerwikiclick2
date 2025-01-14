import json
import warnings
from sys import stdin, stdout
from typing import cast
from wtpsplit import SaT

def segment_sentences(text: str) -> list[str]:
    if text.strip() == '':
        return [text]

    sat = SaT("sat-3l")

    return cast(list[str], sat.split(text, treat_newline_as_space=True))

if __name__ == '__main__':
    warnings.simplefilter("ignore")
    input = stdin.read()
    output = segment_sentences(input)
    stdout.write(json.dumps(output))
