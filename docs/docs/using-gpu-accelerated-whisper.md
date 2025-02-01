# Using GPU Accelerated Whisper

You can compile `whisper.cpp` locally to take advantage of GPU acceleration
avaliable on your machine. This can speed up the process of transcribing audio
files compared to the default CPU implementation without using a cloud service.

## 0. Pre-requisites

You will need to have `cmake`, `git`, and `ffmpeg` installed, on macOS these can
be installed using homebrew as so

```bash
brew install cmake git ffmpeg
```

For different acceleration options you will need to install additional
dependencies.

## 1. Downloading whisper.cpp

First download the project by running the following:

```bash
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp
```

## 2. Downloading a model

You will also need to download a model file. You can do this by running one of
the following commands,

```bash
make -j tiny.en
make -j tiny
make -j base.en
make -j base
make -j small.en
make -j small
make -j medium.en
make -j medium
make -j large-v1
make -j large-v2
make -j large-v3
make -j large-v3-turbo
```

## 3. Compiling with GPU Acceleration

See the
[whisper.cpp documentation](https://github.com/ggerganov/whisper.cpp/blob/master/docs/README.md)
for more information on the different acceleration options avaliable including,

- [CoreML](https://github.com/ggerganov/whisper.cpp?tab=readme-ov-file#core-ml-support)
- [OpenVINO](https://github.com/ggerganov/whisper.cpp?tab=readme-ov-file#openvino-support)
- [NVIDIA GPU / CUDA](https://github.com/ggerganov/whisper.cpp?tab=readme-ov-file#nvidia-gpu-support)
- [Vulkan](https://github.com/ggerganov/whisper.cpp?tab=readme-ov-file#vulkan-gpu-support)
- [BLAS CPU via OpenBLAS](https://github.com/ggerganov/whisper.cpp?tab=readme-ov-file#blas-cpu-support-via-openblas)
- [Ascend NPU](https://github.com/ggerganov/whisper.cpp?tab=readme-ov-file#ascend-npu-support)

We will be using the CoreML option for this guide.

### 3.1. CoreML

To install the CoreML model you need to setup a python environment and install
the required dependencies. Using [`uv`](https://github.com/astral-sh/uv) this
can be done as so,

```bash
uv venv
source ./venv/bin/activate
uv pip install ane_transformers openai-whisper coremltools
```

In addition you will also need to install the XCode application from the App
Store (not just the CLI tools as this is missing some of the required tools). To
ensure you are using the correct version of XCode you can run,

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

or

```bash
sudo xcode-select --reset
```

Once you have installed the dependencies you can compile the model as so,

```bash
cmake -B build -DWHISPER_COREML=1
cmake --build build -j --config Release
```

Next you will need to convert the model to the CoreML format, this can be done
by running the following,

```bash
./models/generate-coreml-model.sh $OPTION
```

where `$OPTION` is the option you chose above, for example `base` or `large-v1`.

## 4. Running the whisper.cpp server

To run the server you can run the following,

```bash
./build/bin/whisper-server -m models/ggml-$OPTION.bin \
  --host 0.0.0.0 \
  --inference-path /audio/transcriptions \
  --convert
```

The options are as follows:

- `-m models/ggml-$OPTION.bin` specifies the model to use.
- `--host 0.0.0.0` allows it to be accessed from other devices on the network.
- `--inference-path /audio/transcriptions` match up the inference URL with what
  Storyteller expects.
- `--convert` allows it to accept non-`wav` files.

## 5. Configuring Storyteller to use local whisper

In the Storyteller settings, under "Transcription settings" you will need to set
the following,

- "Transcription engine" to "OpenAI Cloud Platform"
- "API Key" to any string as the local whisper server does not require an API
  key.
- "Base URL" to the URL of the whisper.cpp server, for example
  `http://192.168.1.19:8080`

![Transcription settings screenshot](/img/gpu-accelerated-whisper-transcription-settings.png)

The most important part is the "Base URL" as this is what Storyteller will use
to connect to the whisper.cpp server. The default port is `8080` but you can
change it by adding the `--port` flag to the whisper.cpp command.

### 5.1 Determining the host of the whisper.cpp server

The base URL contains the IP address or hostname of the machine running the
whisper.cpp server, if you know the IP address of the machine you can use that,
otherwise you can try the following.

#### Running Storyteller in Docker

If you are running Storyteller in Docker using Docker on Desktop on macOS or
windows you can access the host on `host.docker.internal`.

If you are using linux you can either run the container with,

- `--add-host=host.docker.internal:host-gateway` and use `host.docker.internal`
- or `--network=host` and use `localhost` as the hostname.

If none of these work you can try the options for running Storyteller on a
different machine.

#### Running Storyteller on the same machine

If you are running Storyteller directly on the same machine as the whisper.cpp
server you can simply use `localhost`.

#### Running Storyteller on a different machine

To find the IP address of the machine running the whisper.cpp server you can run
the following,

```bash
ifconfig
```

and looking for IP addresses starting with `192.168.` or by running
`hostname -I` to get your local hostname.
