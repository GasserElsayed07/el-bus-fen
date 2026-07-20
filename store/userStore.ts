import { create } from "zustand";

type User = {
  name: string;
  lat: number;
  long: number;
  route?: string;
  busStop?: string;
};

type UserStore = {
  user: User | null;
  useUser: (user: User | null) => void;
};

const dummyUser = {
  name: "mangawy",
  lat: 31.250545425899407,
  long: 29.970028787218897,
};

export const useUserStore = create<UserStore>((set) => ({
  user: dummyUser,
  useUser: (user) => set({ user }),
}));
