// HACK: using an unmerged fork of RNTP, and depending on
// it via GitHub results in losing the type info
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "react-native-track-player" {
  export const Event: any
  export const usePlaybackState: any
  export const State: any
  export const useProgress: any
  export const useTrackPlayerEvents: any
  export const TrackPlayer: any
  export const Capability: any
  export const IOSCategory: any
  export const IOSCategoryMode: any
  export const AddTrack: any
  export type PitchAlgorithm = any
  export const PitchAlgorithm: any
  export type ResourceObject = any
  export default TrackPlayer
}
