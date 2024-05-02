import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createUser,
  fetchUserDetails,
  fetchUserOptions,
  fetchUsers,
} from "./usersAPI";
import { IUser } from "@/interfaces/IUser";
import { IUserPayload } from "@/interfaces/IUserPayload";
import { toast } from "react-toastify";
import { IError } from "@/interfaces/IError";
import { IUserOption } from "@/interfaces/IUserOption";

export interface UsersSliceState {
  users: IUser[];
  userOptions: IUserOption[];
  user: IUser | undefined;
  status: "idle" | "loading" | "failed" | "created";
  count: number;
  error: any;
}

const initialState: UsersSliceState = {
  users: [],
  userOptions: [],
  user: undefined,
  status: "idle",
  count: 0,
  error: undefined,
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
          state.error = undefined;
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.error = undefined;
          state.users = action.payload.data || [];
          state.count = action.payload.count || 0;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error;
        },
      }
    ),
    setUserOptionsAsync: create.asyncThunk(
      async () => {
        const response = await fetchUserOptions();
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.error = undefined;
        },
        fulfilled: (state, action) => {
          state.error = undefined;
          state.userOptions = action.payload.data || [];
        },
        rejected: (state, action) => {
          state.error = action.error;
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
          state.status = "created";
          state.users = [action.payload.data, ...(state.users || [])];
          state.count = state.count || 0 + 1;
          toast.success("User created successfully");
        },
        rejected: (state, action) => {
          console.log("rejected");
          state.status = "failed";
          state.error = action.error as IError;
        },
      }
    ),
    setUserDetailsAsync: create.asyncThunk(
      async (id: string) => {
        const response = await fetchUserDetails(id);
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload.data || undefined;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error as IError;
        },
      }
    ),
    resetError: create.reducer((state) => {
      state.error = undefined;
    }),

    resetUsersState: create.reducer((state) => {
      state.users = [];
      state.userOptions = [];
      state.user = undefined;
      state.status = "idle";
      state.count = 0;
      state.error = undefined;
    }),
  }),
  // Selectors
  selectors: {
    selectUsers: (Users) => Users.users || [],
    selectUserOptions: (Users) => Users.userOptions || [],
    selectUser: (Users) => Users.user || undefined,
    selectUsersCount: (Users) => Users.count || 0,
    selectStatus: (Users) => Users.status || "idle",
    selectUserError: (Users) => Users.error || undefined,
  },
});

// Action creators are generated for each case reducer function.
export const {
  setUsersAsync,
  setUserOptionsAsync,
  setUserDetailsAsync,
  updateUser,
  createUserAsync,
  resetError,
  resetUsersState,
} = usersSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectUsers,
  selectUser,
  selectUsersCount,
  selectStatus,
  selectUserError,
  selectUserOptions,
} = usersSlice.selectors;
