import React from 'react';
import { JoinRoom } from './components/JoinRoom';
import { VideoCall } from './components/VideoCall';
import { Chat } from './components/Chat';
import { useRoomStore } from './store/useRoomStore';

function App() {
  const { roomId } = useRoomStore();

  if (!roomId) {
    return <JoinRoom />;
  }

  return (
    <div className="h-screen flex">
      <div className="flex-1">
        <VideoCall />
      </div>
      <div className="w-96 p-4 bg-gray-100">
        <Chat />
      </div>
    </div>
  );
}

export default App;