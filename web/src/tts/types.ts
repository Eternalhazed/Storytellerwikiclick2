export interface BaseTTSOptions {
  join_audio?: boolean
  filePrefix: string
}

export interface KokoroTTSOptions extends BaseTTSOptions {
  model?: string
  voice?: string
  lang_code?: string
}

export interface OrpheusTTSOptions extends BaseTTSOptions {
  voice?: string
  model?: string
  temperature?: number
  top_p?: number
  top_k?: number
  repetition_penalty?: number
}
