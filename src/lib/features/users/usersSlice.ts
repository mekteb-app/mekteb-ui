import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: number;
}

export interface UsersSliceState {
  users: IUser[];
  status: "idle" | "loading" | "failed";
}

const initialState: UsersSliceState = {
  users: [],
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const usersSlice = createAppSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    updateUser: create.reducer((state, action: PayloadAction<any>) => {
      const updatedUser = action.payload;
      const currentValue = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.users = currentValue;
    }),
    // Fetche users from the API and set them in the state
    setUsersAsync: create.asyncThunk(
      async () => {
        const response = await fetchUsers();
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.users = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  // Selectors
  selectors: {
    selectUsers: (Users) => Users.users,
  },
});

// Action creators are generated for each case reducer function.
export const { setUsersAsync, updateUser } = usersSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUsers } = usersSlice.selectors;
