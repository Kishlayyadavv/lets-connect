import React, { useState, useEffect, useRef } from 'react';
import { Send, Smile } from 'lucide-react';
import { useRoomStore } from '../store/useRoomStore';
import AgoraRTM from 'agora-rtm-sdk';
import { agoraConfig } from '../config/agora';
import Picker from 'emoji-picker-react';

interface Message {
  text: string;
  sender: string | null;  // Allow sender to be either string or null
  timestamp: number;
}


export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { roomId, username } = useRoomStore();
  const rtmClientRef = useRef<any>(null);
  const channelRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initRTM = async () => {
      if (!roomId || !username) return;

      try {
        const client = AgoraRTM.createInstance(agoraConfig.appId);
        await client.login({ uid: username });
        console.log('✅ RTM client logged in successfully');

        const channel = client.createChannel(roomId);
        await channel.join();
        console.log('✅ Joined RTM channel:', roomId);

        channel.on('ChannelMessage', (message: any, senderId: string) => {
          console.log('📩 Message received:', message.text, 'from', senderId);
          try {
            const messageData = JSON.parse(message.text);
            setMessages(prev => [...prev, {
              text: messageData.text,
              sender: senderId,
              timestamp: messageData.timestamp
            }]);
          } catch (error) {
            console.error('❌ Error parsing message:', error);
          }
        });

        rtmClientRef.current = client;
        channelRef.current = channel;
      } catch (error) {
        console.error('❌ Error initializing RTM:', error);
      }
    };

    initRTM();

    return () => {
      const cleanup = async () => {
        try {
          if (channelRef.current) {
            await channelRef.current.leave();
            console.log('👋 Left RTM channel');
          }
          if (rtmClientRef.current) {
            await rtmClientRef.current.logout();
            console.log('👋 RTM client logged out');
          }
        } catch (error) {
          console.error('❌ Error during cleanup:', error);
        }
      };
      cleanup();
    };
  }, [roomId, username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !channelRef.current) return;

    const messageData = {
      text: newMessage,
      sender: username,
      timestamp: Date.now()
    };

    try {
      console.log('📤 Sending message:', messageData);
      await channelRef.current.sendMessage({ text: JSON.stringify(messageData) });

      setMessages(prev => [...prev, {
        text: newMessage,
        sender: username,
        timestamp: messageData.timestamp
      }]);

      setNewMessage('');
      setShowEmojiPicker(false);
    } catch (error) {
      console.error('❌ Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-600 flex justify-between items-center">
        <h2 className="text-lg font-semibold">🔥 GenZ Chatroom</h2>
        <span className="text-sm opacity-70">Room: {roomId}</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === username ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${message.sender === username ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
              <p className="font-bold text-xs">{message.sender}</p>
              <p className="mt-1">{message.text}</p>
              <p className="text-xs opacity-70 text-right">{new Date(message.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="relative p-4 flex items-center bg-gray-800 rounded-full">
        
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-14 left-4 z-10">
            <Picker onEmojiClick={(e, emoji) => setNewMessage(prev => prev + emoji.emoji)} />
          </div>
        )}

        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 text-gray-400 hover:text-blue-400 transition">
          <Smile size={24} />
        </button>

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-transparent border-none outline-none text-white"
        />

        <button type="submit" className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50" disabled={!newMessage.trim()}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
