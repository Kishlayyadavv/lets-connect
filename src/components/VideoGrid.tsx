import React from 'react';
import { VideoOff } from 'lucide-react';
import { RemoteUser } from '../types/agora';

interface VideoGridProps {
  localTracks: any[];
  users: RemoteUser[];
  ready: boolean;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ localTracks, users, ready }) => {
  const totalParticipants = users.length + 1;
  
  const gridClassName = React.useMemo(() => {
    if (totalParticipants <= 1) return 'grid-cols-1';
    if (totalParticipants === 2) return 'grid-cols-2';
    if (totalParticipants <= 4) return 'grid-cols-2';
    if (totalParticipants <= 9) return 'grid-cols-3';
    return 'grid-cols-4';
  }, [totalParticipants]);

  return (
    <div className={`grid ${gridClassName} gap-4 h-full auto-rows-fr`}>
      {ready && localTracks && (
        <div className="relative rounded-lg overflow-hidden bg-gray-800 w-full h-full min-h-[200px]">
          <div className="absolute inset-0">
            {localTracks[1] && (
              <video
                ref={(ref) => {
                  if (ref) ref.srcObject = localTracks[1].mediaStream;
                }}
                autoPlay
                playsInline
                className="w-full h-full object-cover mirror"
              />
            )}
          </div>
        </div>
      )}
      
      {users.map((user) => (
        <div key={user.uid} className="relative rounded-lg overflow-hidden bg-gray-800 w-full h-full min-h-[200px]">
          <div className="absolute inset-0">
            <div id={`user-${user.uid}`} className="w-full h-full" />
            {!user.videoTrack && (
              <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-800">
                <VideoOff size={48} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};