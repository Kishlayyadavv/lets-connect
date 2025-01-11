import React, { useState } from 'react';
import { useRoomStore } from '../store/useRoomStore';
import { Video } from 'lucide-react';
import { nanoid } from 'nanoid';

export const JoinRoom = () => {
  const [inputRoomId, setInputRoomId] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const { setRoom, setUsername } = useRoomStore();

  const createRoom = () => {
    if (!inputUsername.trim()) return;
    const newRoomId = nanoid(10);
    setUsername(inputUsername);
    setRoom(newRoomId);
  };

  const joinRoom = () => {
    if (!inputRoomId.trim() || !inputUsername.trim()) return;
    setUsername(inputUsername);
    setRoom(inputRoomId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <Video className="w-12 h-12 text-blue-500" />
          <h1 className="text-3xl font-bold ml-3">Video Chat</h1>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Code
            </label>
            <input
              type="text"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room code to join"
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={joinRoom}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Join Room
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            <button
              onClick={createRoom}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Create New Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};