import { create } from "zustand";
import { type UserType } from "@/features/shared/models/user";

type UserStore = {
  user: UserType | null;
  useUser: (user: UserType | null) => void;
};

const dummyUser = {
  name: "mangawy",
  lat: 31.250545425899407,
  long: 29.970028787218897,
  email: "",
  _id: null,
} as unknown as UserType;

export const useUserStore = create<UserStore>((set) => ({
  user: dummyUser,
  useUser: (user) => set({ user }),
}));
