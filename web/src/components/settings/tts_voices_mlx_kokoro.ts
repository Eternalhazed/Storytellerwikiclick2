import { MLXModel } from "@/components/settings/SettingsForm"

export const kokoroLanguages = [
  { value: "a", label: "English (US)" },
  { value: "b", label: "English (UK)" },
  { value: "j", label: "Japanese" },
  { value: "z", label: "Chinese (Mandarin)" },
  { value: "e", label: "Spanish" },
  { value: "f", label: "French" },
  { value: "h", label: "Hindi" },
  { value: "i", label: "Italian" },
  { value: "p", label: "Portuguese (Brazil)" },
]

// Function to get voice options based on model and selected language code
export const getMlxVoiceOptions = (
  modelType: string,
  languageCode: string,
): Array<{ value: string; label: string }> => {
  if (modelType === (MLXModel.KOKORO as string)) {
    // Return voices specific to the selected language code
    switch (languageCode) {
      case "a": // American English
        return [
          { value: "af_heart", label: "Heart (Female)" },
          { value: "af_alloy", label: "Alloy (Female)" },
          { value: "af_aoede", label: "Aoede (Female)" },
          { value: "af_bella", label: "Bella (Female)" },
          { value: "af_jessica", label: "Jessica (Female)" },
          { value: "af_kore", label: "Kore (Female)" },
          { value: "af_nicole", label: "Nicole (Female)" },
          { value: "af_nova", label: "Nova (Female)" },
          { value: "af_river", label: "River (Female)" },
          { value: "af_sarah", label: "Sarah (Female)" },
          { value: "af_sky", label: "Sky (Female)" },
          { value: "am_adam", label: "Adam (Male)" },
          { value: "am_echo", label: "Echo (Male)" },
          { value: "am_eric", label: "Eric (Male)" },
          { value: "am_fenrir", label: "Fenrir (Male)" },
          { value: "am_liam", label: "Liam (Male)" },
          { value: "am_michael", label: "Michael (Male)" },
          { value: "am_onyx", label: "Onyx (Male)" },
          { value: "am_puck", label: "Puck (Male)" },
          { value: "am_santa", label: "Santa (Male)" },
        ]

      case "b": // British English
        return [
          { value: "bf_alice", label: "Alice (Female)" },
          { value: "bf_emma", label: "Emma (Female)" },
          { value: "bf_isabella", label: "Isabella (Female)" },
          { value: "bf_lily", label: "Lily (Female)" },
          { value: "bm_daniel", label: "Daniel (Male)" },
          { value: "bm_fable", label: "Fable (Male)" },
          { value: "bm_george", label: "George (Male)" },
          { value: "bm_lewis", label: "Lewis (Male)" },
        ]

      case "j": // Japanese
        return [
          { value: "jf_alpha", label: "Alpha (Female)" },
          { value: "jf_gongitsune", label: "Gongitsune (Female)" },
          { value: "jf_nezumi", label: "Nezumi (Female)" },
          { value: "jf_tebukuro", label: "Tebukuro (Female)" },
          { value: "jm_kumo", label: "Kumo (Male)" },
        ]

      case "z": // Mandarin Chinese
        return [
          { value: "zf_xiaobei", label: "Xiaobei (Female)" },
          { value: "zf_xiaoni", label: "Xiaoni (Female)" },
          { value: "zf_xiaoxiao", label: "Xiaoxiao (Female)" },
          { value: "zf_xiaoyi", label: "Xiaoyi (Female)" },
          { value: "zm_yunjian", label: "Yunjian (Male)" },
          { value: "zm_yunxi", label: "Yunxi (Male)" },
          { value: "zm_yunxia", label: "Yunxia (Male)" },
          { value: "zm_yunyang", label: "Yunyang (Male)" },
        ]

      case "e": // Spanish
        return [
          { value: "ef_dora", label: "Dora (Female)" },
          { value: "em_alex", label: "Alex (Male)" },
          { value: "em_santa", label: "Santa (Male)" },
        ]

      case "f": // French
        return [{ value: "ff_siwis", label: "Siwis (Female)" }]

      case "h": // Hindi
        return [
          { value: "hf_alpha", label: "Alpha (Female)" },
          { value: "hf_beta", label: "Beta (Female)" },
          { value: "hm_omega", label: "Omega (Male)" },
          { value: "hm_psi", label: "Psi (Male)" },
        ]

      case "i": // Italian
        return [
          { value: "if_sara", label: "Sara (Female)" },
          { value: "im_nicola", label: "Nicola (Male)" },
        ]

      case "p": // Brazilian Portuguese
        return [
          { value: "pf_dora", label: "Dora (Female)" },
          { value: "pm_alex", label: "Alex (Male)" },
          { value: "pm_santa", label: "Santa (Male)" },
        ]

      default:
        // Return English (US) voices as default
        return [
          { value: "af_heart", label: "Heart (Female)" },
          { value: "af_sky", label: "Sky (Male)" },
        ]
    }
  } else {
    // Orpheus model only has two voices and doesn't depend on language code
    return [
      { value: "tara", label: "Tara (Female)" },
      { value: "noah", label: "Noah (Male)" },
    ]
  }
}
