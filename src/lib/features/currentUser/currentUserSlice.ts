import { createAppSlice } from "@/lib/createAppSlice";
import { getCurrentUser } from "./currentUserAPI";
import { toast } from "react-toastify";
import { IUser } from "@/interfaces/IUser";

export interface CurrentUserSliceState {
  currentUser?: IUser;
  status: "idle" | "loading" | "failed";
}

const initialState: CurrentUserSliceState = {
  currentUser: undefined,
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const currentUserSlice = createAppSlice({
  name: "current-user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // Fetch access token and current user details from the API and set them in the state
    setCurrentUserAsync: create.asyncThunk(
      async () => {
        const response = await getCurrentUser();
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
        rejected: (state, action) => {
          state.status = "failed";
          toast.error(action.error.message);
        },
      }
    ),
    clearCurrentUser: create.reducer((state) => {
      state.currentUser = undefined;
      state.status = "idle";
    }),
  }),
  // Selectors
  selectors: {
    selectCurrentUser: (CurrentUser) => CurrentUser.currentUser,
    selectStatus: (CurrentUser) => CurrentUser.status,
  },
});

// Action creators are generated for each case reducer function.
export const { setCurrentUserAsync, clearCurrentUser } =
  currentUserSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCurrentUser, selectStatus } = currentUserSlice.selectors;
