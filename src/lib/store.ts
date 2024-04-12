import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
  type UserDetailsSliceType,
  createUserDetialsSlice,
} from "./slices/UserDetailsSlice";

type StoreState = UserDetailsSliceType;

export const useAppStore = create<StoreState>()(
  devtools((...a) => ({
    ...createUserDetialsSlice(...a),
  })),
);
