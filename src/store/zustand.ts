import { create } from "zustand";

type user = {
  userRole: string;
  userId: string;
};
type userStore = {
  user: user;
  add: (user: user) => void;
  // remove: () => void,
  // removeAll: () => void
};

export const useUserStore = create<userStore>((set) => ({
  user: {
    userId: "",
    userRole: "",
    email: "",
  },
  add: (user) => set((state) => ({ user: user })),
  // remove: () => set((state) => ({ cart: state.cart - 1 })),
  // removeAll: () => set({ cart: 0 }),
}));
