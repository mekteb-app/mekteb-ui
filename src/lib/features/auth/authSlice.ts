import { createAppSlice } from "@/lib/createAppSlice";
import { login, verify } from "./authAPI";
import { IAuthUser } from "@/interfaces/IAuthUser";
import { ILoginPayload } from "@/interfaces/ILoginPayload";
import { SESSION_TOKEN } from "@/constants";
import { IVerifyUser } from "@/interfaces/IVerifyUser";

export interface AuthSliceState {
  currentUser?: IAuthUser;
  status: "idle" | "loading" | "failed" | "verified";
}

const initialState: AuthSliceState = {
  currentUser: {},
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createAppSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // Fetch access token and current user details from the API and set them in the state
    setCurrentUserAsync: create.asyncThunk(
      async (data: ILoginPayload) => {
        const response = await login(data);
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.currentUser = action.payload.data || null;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    // Fetch access token and current user details from the API and set them in the state
    setVerifyUserAsync: create.asyncThunk(
      async (data: IVerifyUser) => {
        const response = await verify(data);
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state) => {
          state.status = "verified";
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  // Selectors
  selectors: {
    selectCurrentUser: (Auth) => Auth.currentUser,
    selectStatus: (Auth) => Auth.status,
  },
});

// Action creators are generated for each case reducer function.
export const { setCurrentUserAsync, setVerifyUserAsync } = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCurrentUser, selectStatus } = authSlice.selectors;
