/* eslint-disable @typescript-eslint/ban-types */
import { type StateCreator } from "zustand";

export type UserDetailsType = {
  email: string;
  name: string;
  id: string;
};
export type UserDetailsSliceType = {
  userDetails: UserDetailsType;
  setUserDetails: (userState: UserDetailsType) => void;
};

export const createUserDetialsSlice: StateCreator<UserDetailsSliceType> = (
  set,
) => ({
  userDetails: {
    email: "",
    name: "",
    id: "",
  },
  setUserDetails: (userState: UserDetailsType) =>
    set(() => ({ userDetails: userState })),
});
