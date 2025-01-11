import React, { useEffect, useState } from 'react';
import { useRoomStore } from '../store/useRoomStore';
import { agoraConfig } from '../config/agora';
import { RoomCode } from './RoomCode';
import { VideoControls } from './VideoControls';
import { VideoGrid } from './VideoGrid';
import { useClient, useMicrophoneAndCameraTracks } from '../hooks/useAgoraClient';
import { RemoteUser, TrackState } from '../types/agora';

export const VideoCall = () => {
  const { roomId, username } = useRoomStore();
  const [users, setUsers] = useState<RemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [trackState, setTrackState] = useState<TrackState>({ video: true, audio: true });

  useEffect(() => {
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            const exists = prevUsers.find(u => u.uid === user.uid);
            if (exists) {
              return prevUsers.map(u => u.uid === user.uid ? { ...u, videoTrack: user.videoTrack } : u);
            }
            return [...prevUsers, user as RemoteUser];
          });
        }
        
        if (mediaType === "audio") {
          setUsers((prevUsers) => {
            const exists = prevUsers.find(u => u.uid === user.uid);
            if (exists) {
              user.audioTrack?.play();
              return prevUsers.map(u => u.uid === user.uid ? { ...u, audioTrack: user.audioTrack } : u);
            }
            user.audioTrack?.play();
            return [...prevUsers, user as RemoteUser];
          });
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "video") {
          setUsers((prevUsers) => 
            prevUsers.map(u => u.uid === user.uid ? { ...u, videoTrack: undefined } : u)
          );
        }
        if (mediaType === "audio") {
          user.audioTrack?.stop();
          setUsers((prevUsers) => 
            prevUsers.map(u => u.uid === user.uid ? { ...u, audioTrack: undefined } : u)
          );
        }
      });

      client.on("user-left", (user) => {
        user.audioTrack?.stop();
        setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });

      try {
        await client.join(agoraConfig.appId, name, null, username || undefined);
        if (tracks) {
          await client.publish(tracks);
          setStart(true);
        }
      } catch (error) {
        console.error("Error joining channel:", error);
      }
    };

    if (ready && tracks && roomId) {
      init(roomId);
    }

    return () => {
      client.removeAllListeners();
      tracks?.forEach((track) => track.close());
      client.leave().catch(console.error);
    };
  }, [client, ready, tracks, roomId, username]);

  useEffect(() => {
    users.forEach(user => {
      if (user.videoTrack) {
        user.videoTrack.play(`user-${user.uid}`);
      }
    });
  }, [users]);

  const toggleTrack = async (type: "audio" | "video") => {
    if (!tracks || !client) return;
  
    const trackIndex = type === "audio" ? 0 : 1;
    const track = tracks[trackIndex];
  
    if (track) {
      try {
        if (trackState[type]) {
          // If currently enabled, disable and unpublish it
          await track.setEnabled(false);
          await client.unpublish(track);
        } else {
          // If currently disabled, enable and re-publish it
          await track.setEnabled(true);
          await client.publish(track);
        }
  
        // Update UI state
        setTrackState((prev) => ({
          ...prev,
          [type]: !prev[type],
        }));
      } catch (error) {
        console.error(`Error toggling ${type}:`, error);
      }
    }
  };
  

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 shadow-md">
        <h1 className="text-lg font-semibold">Video Call Room: {roomId}</h1>
        <RoomCode />
      </div>

      {/* Video Grid Section */}
      <div className="flex-1 p-4">
        <VideoGrid localTracks={tracks} users={users} ready={ready} />
      </div>

      {/* Controls Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 shadow-lg">
        <div className="flex justify-center gap-6">
          <VideoControls trackState={trackState} onToggleTrack={toggleTrack} />
        </div>
      </div>
      
    </div>
  );
};
