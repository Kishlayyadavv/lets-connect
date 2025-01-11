import { create } from 'zustand';

interface RoomStore {
  roomId: string | null;
  username: string | null;
  setRoom: (roomId: string) => void;
  setUsername: (username: string) => void;
  clearRoom: () => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  roomId: null,
  username: null,
  setRoom: (roomId) => set({ roomId }),
  setUsername: (username) => set({ username }),
  clearRoom: () => set({ roomId: null }),
}));