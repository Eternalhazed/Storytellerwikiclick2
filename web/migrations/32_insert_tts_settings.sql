-- Add TTS engine setting
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_engine', '"echogarden"');
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_model', '"82m-v1.0-quantized"');

-- Add basic voice setting (used by both engines)
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_voice', '"Heart"');
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_language', '"en-US"');

-- Echogarden specific settings
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_speed', '1.0');
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_pitch', '1.0');
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_normalize', 'true');
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_target_peak', '-3');
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_bitrate', '192000');

-- MLX specific settings
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_model', '"mlx-community/Kokoro-82M-4bit"');
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_temperature', '0.6');
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_top_p', '0.9');
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_top_k', '50');

-- Kokoro FastAPI specific settings
INSERT OR IGNORE INTO settings (name, value) VALUES ('tts_kokoro_fastapi_base_url', '"http://localhost:8880"');
