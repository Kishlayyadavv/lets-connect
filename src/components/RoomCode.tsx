import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useRoomStore } from '../store/useRoomStore';

export const RoomCode = () => {
  const { roomId } = useRoomStore();
  const [copied, setCopied] = React.useState(false);

  const copyRoomCode = async () => {
    if (roomId) {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!roomId) return null;

  return (
    <div className="top-4 left-20 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2">
      <div>
        <div className="text-xs text-gray-300">Room Code</div>
        <div className="font-mono font-medium text-white">{roomId}</div>
      </div>
      <button
        onClick={copyRoomCode}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        title={copied ? "Copied!" : "Copy room code"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-white" />
        )}
      </button>
    </div>
  );
};