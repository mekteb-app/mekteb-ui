import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createUser, fetchUsers } from "./usersAPI";
import { IUser } from "@/interfaces/IUser";
import { IUserPayload } from "@/interfaces/IUserPayload";

export interface UsersSliceState {
  users: IUser[];
  status: "idle" | "loading" | "failed";
  count: number;
}

const initialState: UsersSliceState = {
  users: [],
  status: "idle",
  count: 0,
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
      async (page = 1) => {
        const response = await fetchUsers({ page, count: 10 });
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.users = action.payload.data || [];
          state.count = action.payload.count || 0;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    createUserAsync: create.asyncThunk(
      async (data: IUserPayload) => {
        const response = await createUser(data);
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.users = [action.payload.data, ...(state.users || [])];
          state.count = state.count || 0 + 1;
        },
        rejected: (state) => {
          console.log("rejected");
          state.status = "failed";
        },
      }
    ),
  }),
  // Selectors
  selectors: {
    selectUsers: (Users) => Users.users || [],
    selectUsersCount: (Users) => Users.count || 0,
  },
});

// Action creators are generated for each case reducer function.
export const { setUsersAsync, updateUser, createUserAsync } =
  usersSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUsers, selectUsersCount } = usersSlice.selectors;
