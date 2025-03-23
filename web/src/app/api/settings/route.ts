import { withHasPermission } from "@/auth"
import {
  getSettings,
  Settings,
  SETTINGS_COLUMN_NAMES,
  updateSettings,
} from "@/database/settings"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type SettingsResponse = {
  [Key in keyof typeof SETTINGS_COLUMN_NAMES]:
    | Required<Settings>[(typeof SETTINGS_COLUMN_NAMES)[Key]]
    | undefined
}

export const GET = withHasPermission("settings_update")(() => {
  const settings = getSettings()

  const response: SettingsResponse = {
    smtp_host: settings.smtpHost,
    smtp_port: settings.smtpPort,
    smtp_username: settings.smtpUsername,
    smtp_password: settings.smtpPassword,
    smtp_from: settings.smtpFrom,
    smtp_ssl: settings.smtpSsl ?? true,
    smtp_reject_unauthorized: settings.smtpRejectUnauthorized ?? true,
    library_name: settings.libraryName,
    web_url: settings.webUrl,
    max_track_length: settings.maxTrackLength,
    codec: settings.codec,
    bitrate: settings.bitrate,
    transcription_engine: settings.transcriptionEngine,
    whisper_build: settings.whisperBuild,
    whisper_model: settings.whisperModel,
    google_cloud_api_key: settings.googleCloudApiKey,
    azure_subscription_key: settings.azureSubscriptionKey,
    azure_service_region: settings.azureServiceRegion,
    amazon_transcribe_region: settings.amazonTranscribeRegion,
    amazon_transcribe_access_key_id: settings.amazonTranscribeAccessKeyId,
    amazon_transcribe_secret_access_key:
      settings.amazonTranscribeSecretAccessKey,
    open_ai_api_key: settings.openAiApiKey,
    open_ai_organization: settings.openAiOrganization,
    open_ai_base_url: settings.openAiBaseUrl,
    open_ai_model_name: settings.openAiModelName,
    deepgram_api_key: settings.deepgrapmApiKey,
    deepgram_model: settings.deepgramModel,
    parallel_transcodes: settings.parallelTranscodes,
    parallel_transcribes: settings.parallelTranscribes,
    parallel_whisper_build: settings.parallelWhisperBuild,
    tts_engine: settings.ttsEngine,
    tts_voice: settings.ttsVoice,
    tts_language: settings.ttsLanguage,
    tts_model: settings.ttsModel,
    tts_temperature: settings.ttsTemperature,
    tts_target_peak: settings.ttsTargetPeak,
    tts_normalize: settings.ttsNormalize,
    tts_pitch: settings.ttsPitch,
    tts_bitrate: settings.ttsBitrate,
    tts_speed: settings.ttsSpeed,
    tts_top_k: settings.ttsTopK,
    tts_top_p: settings.ttsTopP,
  }

  return NextResponse.json(response)
})

type SettingsRequest = {
  [Key in keyof typeof SETTINGS_COLUMN_NAMES]: Required<Settings>[(typeof SETTINGS_COLUMN_NAMES)[Key]]
}

export const PUT = withHasPermission("settings_update")(async (request) => {
  const settings = (await request.json()) as SettingsRequest

  updateSettings({
    smtpHost: settings.smtp_host,
    smtpPort: settings.smtp_port,
    smtpUsername: settings.smtp_username,
    smtpPassword: settings.smtp_password,
    smtpFrom: settings.smtp_from,
    smtpSsl: settings.smtp_ssl,
    smtpRejectUnauthorized: settings.smtp_reject_unauthorized,
    libraryName: settings.library_name,
    webUrl: settings.web_url,
    maxTrackLength: settings.max_track_length,
    codec: settings.codec,
    bitrate: settings.bitrate,
    transcriptionEngine: settings.transcription_engine,
    whisperBuild: settings.whisper_build,
    whisperModel: settings.whisper_model,
    googleCloudApiKey: settings.google_cloud_api_key,
    azureSubscriptionKey: settings.azure_subscription_key,
    azureServiceRegion: settings.azure_service_region,
    amazonTranscribeRegion: settings.amazon_transcribe_region,
    amazonTranscribeAccessKeyId: settings.amazon_transcribe_access_key_id,
    amazonTranscribeSecretAccessKey:
      settings.amazon_transcribe_secret_access_key,
    openAiApiKey: settings.open_ai_api_key,
    openAiOrganization: settings.open_ai_organization,
    openAiBaseUrl: settings.open_ai_base_url,
    openAiModelName: settings.open_ai_model_name,
    deepgrapmApiKey: settings.deepgram_api_key,
    deepgramModel: settings.deepgram_model,
    parallelTranscodes: settings.parallel_transcodes,
    parallelTranscribes: settings.parallel_transcribes,
    parallelWhisperBuild: settings.parallel_whisper_build,
    ttsEngine: settings.tts_engine,
    ttsTopK: settings.tts_top_k,
    ttsTopP: settings.tts_top_p,
    ttsVoice: settings.tts_voice,
    ttsLanguage: settings.tts_language,
    ttsModel: settings.tts_model,
    ttsTemperature: settings.tts_temperature,
    ttsTargetPeak: settings.tts_target_peak,
    ttsNormalize: settings.tts_normalize,
    ttsPitch: settings.tts_pitch,
    ttsBitrate: settings.tts_bitrate,
    ttsSpeed: settings.tts_speed,
  })

  return new Response(null, { status: 204 })
})
