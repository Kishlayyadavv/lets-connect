export interface RemoteUser {
  uid: string | number;
  videoTrack?: any;
  audioTrack?: any;
}

export interface TrackState {
  video: boolean;
  audio: boolean;
}