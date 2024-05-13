import { createAppSlice } from "@/lib/createAppSlice";
import { fetchCommunityOptions } from "./communityAPI";
import { ICommunity } from "@/interfaces/ICommunity";

export interface CommunitySliceState {
  communityOptions: ICommunity[];
  status: "idle" | "loading" | "failed";
  count: number;
  error: any;
}

const initialState: CommunitySliceState = {
  communityOptions: [],
  status: "idle",
  count: 0,
  error: undefined,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const communitySlice = createAppSlice({
  name: "community",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // Fetche users from the API and set them in the state
    setCommunityOptionsAsync: create.asyncThunk(
      async () => {
        const response = await fetchCommunityOptions();
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
          state.communityOptions = action.payload.data || [];
          state.count = action.payload.count || 0;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error;
        },
      }
    ),

    resetError: create.reducer((state) => {
      state.error = undefined;
    }),

    resetCommunityState: create.reducer((state) => {
      state.communityOptions = [];
      state.status = "idle";
      state.count = 0;
      state.error = undefined;
    }),
  }),
  // Selectors
  selectors: {
    selectCommunityOptions: (Community) => Community.communityOptions || [],
    selectCommunityStatus: (Community) => Community.status || "idle",
    selectCommunityError: (Community) => Community.error || undefined,
  },
});

// Action creators are generated for each case reducer function.
export const { setCommunityOptionsAsync, resetError, resetCommunityState } =
  communitySlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectCommunityOptions,
  selectCommunityStatus,
  selectCommunityError,
} = communitySlice.selectors;
