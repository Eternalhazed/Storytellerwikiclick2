"use client"

import { Settings } from "@/apiModels"
import { useApiClient } from "@/hooks/useApiClient"
import { useEffect, useRef, useState } from "react"
import { useForm } from "@mantine/form"
import {
  Box,
  Button,
  Checkbox,
  Code,
  Fieldset,
  Group,
  List,
  Loader,
  NativeSelect,
  NumberInput,
  PasswordInput,
  Select,
  TextInput,
  Title,
} from "@mantine/core"
import { SynthesisVoice } from "echogarden"
import { getMlxVoiceOptions, kokoroLanguages } from "./tts_voices_mlx_kokoro"

export enum MLXModel {
  KOKORO = "mlx-community/Kokoro-82M-4bit",
  ORPHEUS = "mlx-community/orpheus-3b-0.1-ft-bf16",
}

interface Props {
  settings: Settings
}

export function SettingsForm({ settings }: Props) {
  const [saved, setSaved] = useState(false)
  const clearSavedTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [echogardenVoices, setEchogardenVoices] = useState<
    Array<{ value: string; label: string }>
  >([
    { value: "Heart", label: "Heart (female)" },
    { value: "Sky", label: "Sky (male)" },
    { value: "Air", label: "Air (female)" },
    { value: "Water", label: "Water (male)" },
    { value: "Forest", label: "Forest (male)" },
  ])
  const [loadingVoices, setLoadingVoices] = useState(false)

  const client = useApiClient()

  const initialValues: Settings = {
    smtp_host: settings.smtp_host,
    smtp_port: settings.smtp_port,
    smtp_username: settings.smtp_username,
    smtp_password: settings.smtp_password,
    smtp_from: settings.smtp_from,
    smtp_ssl: settings.smtp_ssl,
    smtp_reject_unauthorized: settings.smtp_reject_unauthorized,
    library_name: settings.library_name,
    web_url: settings.web_url,
    max_track_length: settings.max_track_length ?? 2,
    codec: settings.codec ?? "",
    bitrate: settings.bitrate ?? "",
    transcription_engine: settings.transcription_engine ?? "whisper.cpp",
    whisper_build: settings.whisper_build ?? "cpu",
    whisper_model: settings.whisper_model ?? "tiny",
    google_cloud_api_key: settings.google_cloud_api_key ?? "",
    azure_subscription_key: settings.azure_subscription_key ?? "",
    azure_service_region: settings.azure_service_region ?? "",
    amazon_transcribe_region: settings.amazon_transcribe_region ?? "",
    amazon_transcribe_access_key_id:
      settings.amazon_transcribe_access_key_id ?? "",
    amazon_transcribe_secret_access_key:
      settings.amazon_transcribe_secret_access_key ?? "",
    open_ai_api_key: settings.open_ai_api_key ?? "",
    open_ai_organization: settings.open_ai_organization ?? "",
    open_ai_base_url: settings.open_ai_base_url ?? "",
    open_ai_model_name: settings.open_ai_model_name ?? "",
    deepgram_api_key: settings.deepgram_api_key ?? "",
    deepgram_model: settings.deepgram_model ?? "nova-3",
    parallel_transcribes: settings.parallel_transcribes,
    parallel_transcodes: settings.parallel_transcodes,
    parallel_whisper_build: settings.parallel_whisper_build,

    // TTS Settings - engine selection
    tts_engine: settings.tts_engine,

    // TTS voice - using different defaults based on engine
    tts_voice: settings.tts_voice || "Heart", // will be overridden based on engine

    // Common TTS settings
    tts_language: settings.tts_language || "en-US",

    // Echogarden specific settings
    tts_pitch: settings.tts_pitch || 1.0,
    tts_normalize: settings.tts_normalize,
    tts_target_peak: settings.tts_target_peak || -3,
    tts_bitrate: settings.tts_bitrate || 192000,
    tts_speed: settings.tts_speed || 1.0,

    // MLX specific settings
    tts_model: settings.tts_model || MLXModel.KOKORO,
    tts_temperature: settings.tts_temperature || 0.6,
    tts_top_p: settings.tts_top_p || 0.9,
    tts_top_k: settings.tts_top_k || 50,

    tts_kokoro_fastapi_base_url: settings.tts_kokoro_fastapi_base_url || "",
  }

  const form = useForm({
    mode: "controlled",
    initialValues,
  })

  useEffect(() => {
    if (
      form.values.tts_engine === "mlx" &&
      form.values.tts_model === (MLXModel.KOKORO as string)
    ) {
      // When changing language, we need to update the voice selection
      const availableVoices = getMlxVoiceOptions(
        form.values.tts_model,
        form.values.tts_language,
      )
      const currentVoiceExists = availableVoices.some(
        (v) => v.value === form.values.tts_voice,
      )

      // Check that we have voices before accessing index 0
      if (!currentVoiceExists && availableVoices.length > 0) {
        // TypeScript now knows availableVoices[0] exists
        const firstVoice = availableVoices[0]
        if (firstVoice) {
          form.setFieldValue("tts_voice", firstVoice.value)
        } else {
          form.setFieldValue("tts_voice", "af_heart")
        }
      }
    }
  }, [form, form.values.tts_language, form.values.tts_model])

  // Load available Echogarden voices when the form loads
  useEffect(() => {
    async function loadEchogardenVoices() {
      if (form.values.tts_engine === "echogarden") {
        setLoadingVoices(true)
        try {
          // Fetch available voices via API endpoint
          const response = await fetch("/api/tts/voices/echogarden")
          if (response.ok) {
            const voices = (await response.json()) as SynthesisVoice[]
            if (Array.isArray(voices) && voices.length > 0) {
              // First, organize all voices by language code
              const voicesByLanguage = new Map<string, SynthesisVoice[]>()

              voices.forEach((voice) => {
                // TypeScript knows voice.languages might be undefined
                // so we need to check it exists first
                if (voice.languages.length > 0) {
                  // Now we know voice.languages is an array with at least one element
                  const primaryLanguage = voice.languages[0]
                  // Need to check primaryLanguage is a string to satisfy TypeScript
                  if (typeof primaryLanguage === "string") {
                    // Initialize array for this language if it doesn't exist
                    if (!voicesByLanguage.has(primaryLanguage)) {
                      voicesByLanguage.set(primaryLanguage, [])
                    }

                    // Add this voice to its language array - now TypeScript knows primaryLanguage is a string
                    const voicesForLanguage =
                      voicesByLanguage.get(primaryLanguage)
                    if (voicesForLanguage) {
                      voicesForLanguage.push(voice)
                    }
                  }
                }
              })

              // Get selected language code (or default to en-US)
              const selectedLanguage = form.values.tts_language || "en-US"

              // Get voices for the matching language
              const languageVoices =
                voicesByLanguage.get(selectedLanguage) || []

              // Convert to select options
              const voiceOptions = languageVoices.map((voice) => ({
                value: voice.name,
                label: `${voice.name} (${voice.gender === "female" ? "Female" : "Male"})`,
              }))

              setEchogardenVoices(voiceOptions)
            }
          }
        } catch (error) {
          console.error("Failed to load Echogarden voices:", error)
        } finally {
          setLoadingVoices(false)
        }
      }
    }

    void loadEchogardenVoices()
  }, [form.values.tts_engine, form.values.tts_language])

  const state = form.getValues()

  return (
    <form
      onSubmit={form.onSubmit(async (updatedSettings) => {
        await client.updateSettings(updatedSettings)
        setSaved(true)

        if (clearSavedTimeoutRef.current) {
          clearTimeout(clearSavedTimeoutRef.current)
        }
        clearSavedTimeoutRef.current = setTimeout(() => {
          setSaved(false)
        }, 2000)
      })}
    >
      <Fieldset legend="Library settings">
        <TextInput
          label="Library name"
          {...form.getInputProps("library_name")}
        />
        <TextInput label="Web URL" {...form.getInputProps("web_url")} />
      </Fieldset>
      <Fieldset legend="Audio settings">
        <NativeSelect
          label="Maximum processed track length"
          description={
            <span className="text-black opacity-70">
              Audio tracks longer than this will be split to be this length or
              shorter before transcribing.
              <br />
              This can help with reducing Storyteller&rsquo;s memory usage
              during transcription.
            </span>
          }
          {...form.getInputProps("max_track_length")}
        >
          <option value={0.75}>45 minutes</option>
          <option value={1}>1 hour</option>
          <option value={2}>2 hours (default)</option>
          <option value={3}>3 hours</option>
          <option value={4}>4 hours</option>
        </NativeSelect>
        <NativeSelect
          label="Preferred audio codec"
          {...form.getInputProps("codec")}
        >
          <option value="">Default</option>
          <option value="libopus">OPUS</option>
          <option value="libmp3lame">MP3</option>
          <option value="aac">AAC</option>
        </NativeSelect>
        {state.codec === "libopus" && (
          <NativeSelect
            label="Preferred audio bitrate"
            {...form.getInputProps("bitrate")}
          >
            <option value="">Default (32 Kb/s)</option>
            <option value="16K">16 Kb/s</option>
            <option value="24K">24 Kb/s</option>
            <option value="32K">32 Kb/s</option>
            <option value="64K">64 Kb/s</option>
            <option value="96K">96 Kb/s</option>
          </NativeSelect>
        )}
        {state.codec === "libmp3lame" && (
          <NativeSelect
            label="Preferred audio bitrate"
            {...form.getInputProps("bitrate")}
          >
            <option value="">Default (constant 48 kb/s)</option>
            <option value="0">0 (high quality/low compression)</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">
              4 (perceptually transparent/moderate compression)
            </option>
            <option value="5">5</option>
            <option value="6">6 (acceptable quality/high compression)</option>
            <option value="0">0</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </NativeSelect>
        )}
      </Fieldset>
      <Fieldset legend="Transcription settings">
        <Box className="mb-3 text-sm opacity-70">
          <p>
            As part of the synchronization process, Storyteller attempts to
            transcribe the audiobook narration to text.
          </p>
          <p>
            This is by far the most resource-intensive phase of the process. By
            default, Storyteller will attempt to run the transcription job
            locally, using your server&apos;s hardware. If you would prefer to
            run the task via a paid third-party service, you set that with the
            &quot;transcription engine&quot; setting below.
          </p>
          <p>The available paid transcription services are:</p>
          <List listStyleType="disc" className="text-sm">
            <List.Item>
              <a href="https://cloud.google.com/text-to-speech">Google Cloud</a>
            </List.Item>
            <List.Item>
              <a href="https://cloud.google.com/speech-to-text" rel="nofollow">
                Google Cloud
              </a>
            </List.Item>
            <List.Item>
              <a
                href="https://azure.microsoft.com/en-us/products/ai-services/speech-to-text/"
                rel="nofollow"
              >
                Azure Cognitive Services
              </a>
            </List.Item>
            <List.Item>
              <a href="https://aws.amazon.com/transcribe/" rel="nofollow">
                Amazon Transcribe
              </a>
            </List.Item>
            <List.Item>
              <a href="https://platform.openai.com/" rel="nofollow">
                OpenAI Cloud Platform
              </a>
            </List.Item>
            <List.Item>
              <a
                href="https://developers.deepgram.com/docs/pre-recorded-audio"
                rel="nofollow"
              >
                Deepgram Speech to Text
              </a>
            </List.Item>
          </List>
        </Box>
        <NativeSelect
          label="Transcription engine"
          {...form.getInputProps("transcription_engine")}
        >
          <option value="whisper.cpp">whisper.cpp (local)</option>
          <option value="google-cloud">Google Cloud</option>
          <option value="microsoft-azure">Azure Cognitive Services</option>
          <option value="amazon-transcribe">Amazon Transcribe</option>
          <option value="openai-cloud">OpenAI Cloud Platform</option>
          <option value="deepgram">Deepgram Speech to Text</option>
        </NativeSelect>
        {state.transcription_engine === "whisper.cpp" && (
          <>
            <NativeSelect
              label="Whisper build"
              {...form.getInputProps("whisper_build")}
            >
              <option value="cpu">CPU</option>
              <option value="cublas-11.8">cuBLAS 11.8 (NVIDIA GPU)</option>
              <option value="cublas-12.6">cuBLAS 12.6 (NVIDIA GPU)</option>
              <option value="hipblas">hipBLAS (AMD GPU)</option>
            </NativeSelect>
            <Box className="text-sm opacity-70">
              <p>
                You can also specify which Whisper model Storyteller should use
                for transcription. The default (tiny) is sufficient for most
                English books. For books with many uncommon words, or in
                languages other than English, you may need to try larger models,
                such as small or medium.
              </p>
            </Box>
            <NativeSelect
              label="Whisper model"
              {...form.getInputProps("whisper_model")}
            >
              <option value="tiny">tiny</option>
              <option value="tiny-q5_1">tiny-q5_1</option>
              <option value="base">base</option>
              <option value="base-q5_1">base-q5_1</option>
              <option value="small">small</option>
              <option value="small-q5_1">small-q5_1</option>
              <option value="medium">medium</option>
              <option value="medium-q5_0">medium-q5_0</option>
              <option value="large-v1">large-v1</option>
              <option value="large-v2">large-v2</option>
              <option value="large-v2-q5_0">large-v2-q5_0</option>
              <option value="large-v3">large-v3</option>
              <option value="large-v3-q5_0">large-v3-q5_0</option>
              <option value="large-v3-turbo">large-v3-turbo</option>
              <option value="large-v3-turbo-q5_0">large-v3-turbo-q5_0</option>
            </NativeSelect>
          </>
        )}
        {state.transcription_engine === "google-cloud" && (
          <TextInput
            label="API key"
            withAsterisk
            {...form.getInputProps("google_cloud_api_key")}
          />
        )}
        {state.transcription_engine === "microsoft-azure" && (
          <>
            <TextInput
              label="Subscription key"
              withAsterisk
              {...form.getInputProps("azure_subscription_key")}
            />
            <TextInput
              label="Service region key"
              withAsterisk
              {...form.getInputProps("azure_service_region")}
            />
          </>
        )}
        {state.transcription_engine === "amazon-transcribe" && (
          <>
            <TextInput
              label="Region"
              withAsterisk
              {...form.getInputProps("amazon_transcribe_region")}
            />
            <TextInput
              label="Access key id"
              withAsterisk
              {...form.getInputProps("amazon_transcribe_access_key_id")}
            />
            <TextInput
              label="Secret access key"
              withAsterisk
              {...form.getInputProps("amazon_transcribe_secret_access_key")}
            />
          </>
        )}
        {state.transcription_engine === "openai-cloud" && (
          <>
            <TextInput
              label="API Key"
              withAsterisk
              {...form.getInputProps("open_ai_api_key")}
            />
            <TextInput
              label="Organization (optional)"
              {...form.getInputProps("open_ai_organization")}
            />
            <TextInput
              label="Base URL (optional)"
              description={
                <>
                  You can use a custom base URL to point at a OpenAI
                  Cloud-compatible service URL, such as a self-hosted{" "}
                  <a
                    className="text-st-orange-800 underline"
                    href="https://github.com/fedirz/faster-whisper-server"
                  >
                    faster-whisper-server
                  </a>{" "}
                  instance.
                </>
              }
              {...form.getInputProps("open_ai_base_url")}
            />
            <TextInput
              label="Model name (optional)"
              description={
                <>
                  e.g. <Code>Systran/faster-distil-whisper-large-v3</Code> for
                  faster-whisper-server&rsquo;s large-v3 model, or{" "}
                  <Code>whisper-1</Code> for large-v3 on OpenAI Cloud.
                </>
              }
              {...form.getInputProps("open_ai_model_name")}
            />
          </>
        )}
        {state.transcription_engine === "deepgram" && (
          <>
            <TextInput
              label="API Key"
              withAsterisk
              {...form.getInputProps("deepgram_api_key")}
            />
            <TextInput
              label="Model name"
              description={
                <>
                  Can be any model the server supports, like <Code>nova-3</Code>
                  , <Code>nova-2</Code>,<Code>nova</Code>, <Code>enhanced</Code>
                  , <Code>base</Code> or <Code>whisper</Code> (see model list{" "}
                  <a
                    href="https://developers.deepgram.com/docs/model"
                    rel="nofollow"
                  >
                    here
                  </a>
                  ). Defaults to <Code>nova-3</Code>
                </>
              }
              {...form.getInputProps("deepgram_model")}
            />
          </>
        )}
      </Fieldset>
      <Fieldset legend="Parellelization settings">
        <Box className="mb-3 text-sm opacity-70">
          <p>
            Audio transcoding is an inherently single-threaded task, and
            Whisper’s transcription engine has diminishing returns on multi-core
            processing for a single file.
          </p>
          <p>
            However, since Storyteller splits input audio into multiple tracks,
            it’s possible to run transcoding and transcription on multiple
            tracks in parallel.
          </p>
        </Box>
        <NumberInput
          label="Number of audio tracks to transcode in parallel"
          description="Transcoding one track will use on CPU core"
          {...form.getInputProps("parallel_transcodes")}
        />
        <NumberInput
          label="Number of audio tracks to transcribe in parallel"
          description="Transcribing one track will use up to 4 CPU cores (when using CPU-based transcription)"
          {...form.getInputProps("parallel_transcribes")}
        />
        <Box className="mb-3 text-sm opacity-70">
          <p>
            Whenever the Storyteller container is recreated (e.g. after an
            update), it will rebuild whisper.cpp. This process can be sped up
            considerably by dedicating multiple CPU cores.
          </p>
        </Box>
        <NumberInput
          label="Number of CPU cores to allocate for building whisper.cpp locally"
          {...form.getInputProps("parallel_whisper_build")}
        />
      </Fieldset>
      <Fieldset legend="Text-to-Speech Settings">
        <Box className="mb-3 text-sm opacity-70">
          <p>
            Text-to-Speech (TTS) settings control how Storyteller generates
            speech from text. Two engines are available:
          </p>
          <List>
            <List.Item>
              <strong>MLX Audio</strong>: High-quality TTS for Apple Silicon
              Macs. Uses machine learning models optimized for Apple M-series
              chips.
            </List.Item>
            <List.Item>
              <strong>Echogarden</strong>: Cross-platform TTS that works on all
              systems.
            </List.Item>
          </List>
        </Box>

        <NativeSelect
          label="TTS Engine"
          description="Select the text-to-speech engine to use"
          {...form.getInputProps("tts_engine")}
        >
          <option value="mlx">MLX Audio (Apple Silicon)</option>
          <option value="echogarden">Echogarden</option>
          <option value="kokoro_fastapi">Kokoro FastAPI</option>
        </NativeSelect>

        {/* Echogarden-specific settings */}
        {form.values.tts_engine === "echogarden" && (
          <>
            <Title order={5} mt={15} mb={10}>
              Echogarden Voice Settings
            </Title>

            <Select
              label="Language"
              description="Language for speech generation"
              data={[
                { value: "en-US", label: "English (US)" },
                { value: "en-GB", label: "English (UK)" },
                { value: "es-ES", label: "Spanish" },
                { value: "fr-FR", label: "French" },
                { value: "hi-IN", label: "Hindi" },
                { value: "it-IT", label: "Italian" },
                { value: "pt-BR", label: "Portuguese (Brazil)" },
                { value: "zh-CN", label: "Chinese (Mandarin)" },
              ]}
              {...form.getInputProps("tts_language")}
            />

            {loadingVoices ? (
              <Group>
                <Loader size="sm" />
                <span>
                  Loading available voices for {form.values.tts_language}...
                </span>
              </Group>
            ) : (
              <Select
                label="Voice"
                description={`Voices available for ${form.values.tts_language}`}
                data={echogardenVoices}
                searchable
                {...form.getInputProps("tts_voice")}
              />
            )}

            <Title order={5} mt={15} mb={10}>
              Echogarden Speech Settings
            </Title>
            <NumberInput
              label="Speed"
              description="Speech rate multiplier (0.5 to 2.0)"
              min={0.5}
              max={2.0}
              step={0.1}
              {...form.getInputProps("tts_speed")}
            />

            <NumberInput
              label="Pitch"
              description="Voice pitch multiplier (0.5 to 2.0)"
              min={0.5}
              max={2.0}
              step={0.1}
              {...form.getInputProps("tts_pitch")}
            />

            <Checkbox
              label="Normalize Audio"
              description="Automatically adjust audio levels for consistency"
              {...form.getInputProps("tts_normalize", { type: "checkbox" })}
            />

            {form.values.tts_normalize && (
              <NumberInput
                label="Target Peak (dB)"
                description="Target peak level for normalization (negative values, -6 to -1)"
                min={-20}
                max={-1}
                step={0.5}
                {...form.getInputProps("tts_target_peak")}
              />
            )}
          </>
        )}

        {/* MLX-specific settings */}
        {form.values.tts_engine === "mlx" && (
          <>
            <Title order={5} mt={15} mb={10}>
              MLX Audio Settings
            </Title>

            <NativeSelect
              label="Model"
              description="MLX Audio model to use"
              {...form.getInputProps("tts_model")}
            >
              <option value={MLXModel.KOKORO}>Kokoro (smaller, faster)</option>
            </NativeSelect>

            {form.values.tts_model === (MLXModel.KOKORO as string) ? (
              <Select
                label="Language"
                description="Language for speech synthesis"
                data={kokoroLanguages}
                {...form.getInputProps("tts_language")}
              />
            ) : (
              <TextInput
                label="Language Code"
                description="For Orpheus, this setting is not used"
                {...form.getInputProps("tts_language")}
                disabled
              />
            )}

            <Select
              label="Voice"
              description="Voice to use for speech synthesis"
              data={getMlxVoiceOptions(
                form.values.tts_model,
                form.values.tts_language,
              )}
              searchable
              {...form.getInputProps("tts_voice")}
            />
          </>
        )}

        {/* KokoroFastAPI-specific settings */}
        {form.values.tts_engine === "kokoro_fastapi" && (
          <>
            <Title order={5} mt={15} mb={10}>
              Kokoro FastAPI Settings
            </Title>

            <TextInput
              label="Base URL"
              description="The base URL of the Kokoro FastAPI server"
              placeholder="https://example.com"
              required
              {...form.getInputProps("tts_kokoro_fastapi_base_url")}
            />

            <Select
              label="Language"
              description="Language for speech synthesis"
              data={kokoroLanguages}
              {...form.getInputProps("tts_language")}
            />

            <Select
              label="Voice"
              description="Voice to use for speech synthesis"
              data={getMlxVoiceOptions(
                "mlx-community/Kokoro-82M-4bit",
                form.values.tts_language,
              )}
              searchable
              {...form.getInputProps("tts_voice")}
            />

            <NumberInput
              label="Speed"
              description="Speech rate multiplier (0.5 to 2.0)"
              min={0.5}
              max={2.0}
              step={0.1}
              {...form.getInputProps("tts_speed")}
            />
          </>
        )}
      </Fieldset>
      <Fieldset legend="Email settings">
        <TextInput label="SMTP host" {...form.getInputProps("smtp_host")} />
        <TextInput
          label="SMTP port"
          type="number"
          {...form.getInputProps("smtp_port")}
        />
        <TextInput label="SMTP from" {...form.getInputProps("smtp_from")} />
        <TextInput
          label="SMTP username"
          {...form.getInputProps("smtp_username")}
        />
        <PasswordInput
          label="SMTP password"
          {...form.getInputProps("smtp_password")}
        />
        <Checkbox
          label="SMTP - Enable SSL?"
          className="my-4"
          description={
            <>
              <strong>Note:</strong> Only disable SSL and self-signed cert
              rejection if you use a locally hosted SMTP server. If you need to
              connect over the internet, keep SSL enabled!
            </>
          }
          {...form.getInputProps("smtp_ssl", { type: "checkbox" })}
        />
        <Checkbox
          label="SMTP - Reject self-signed TLS certs?"
          {...(form.getInputProps("smtp_reject_unauthorized"),
          { type: "checkbox" })}
        />
      </Fieldset>
      <Group justify="flex-end" className="sticky bottom-0 z-10 bg-white p-6">
        <Button type="submit">{saved ? "Saved!" : "Update"}</Button>
      </Group>
    </form>
  )
}
