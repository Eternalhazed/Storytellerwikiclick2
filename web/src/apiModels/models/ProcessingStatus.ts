/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export enum ProcessingTaskType {
  SPLIT_CHAPTERS = "SPLIT_CHAPTERS",
  TRANSCRIBE_CHAPTERS = "TRANSCRIBE_CHAPTERS",
  SYNC_CHAPTERS = "SYNC_CHAPTERS",
  TTS = "TTS",
}

export enum ProcessingTaskStatus {
  STARTED = "STARTED",
  COMPLETED = "COMPLETED",
  IN_ERROR = "IN_ERROR",
  PROCESSING = "PROCESSING",
  FAILED = "FAILED",
}

export type ProcessingStatus = {
  current_task: ProcessingTaskType
  progress: number
  status: ProcessingTaskStatus
  is_processing: boolean
  is_queued: boolean
  tts_incomplete?: boolean
}
