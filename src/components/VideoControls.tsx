import React from 'react';
import { Camera, Mic, MicOff, VideoOff } from 'lucide-react';
import { TrackState } from '../types/agora';

interface VideoControlsProps {
  trackState: TrackState;
  onToggleTrack: (type: "audio" | "video") => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({ trackState, onToggleTrack }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
      <button
        onClick={() => onToggleTrack("audio")}
        className={`p-3 rounded-full shadow-lg transition ${
          trackState.audio ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
        } text-white`}
      >
        {trackState.audio ? <Mic size={22} /> : <MicOff size={22} />}
      </button>
      <button
        onClick={() => onToggleTrack("video")}
        className={`p-3 rounded-full shadow-lg transition ${
          trackState.video ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
        } text-white`}
      >
        {trackState.video ? <Camera size={22} /> : <VideoOff size={22} />}
      </button>
    </div>
  );
};
