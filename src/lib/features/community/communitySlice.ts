import { createAppSlice } from "@/lib/createAppSlice";
import { fetchCommunities, fetchCommunityOptions } from "./communityAPI";
import { ICommunity } from "@/interfaces/ICommunity";
import { ICommunityOption } from "@/interfaces/ICommunityOption";

export interface CommunitySliceState {
  communities: ICommunity[];
  communityOptions: ICommunityOption[];
  status: "idle" | "loading" | "failed";
  count: number;
  error: any;
}

const initialState: CommunitySliceState = {
  communities: [],
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
    // Fetch communities from the API and set them in the state
    setCommunitiesAsync: create.asyncThunk(
      async (page = 1) => {
        const response = await fetchCommunities({ page, count: 10 });
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
          state.communities = action.payload.data || [];
          state.count = action.payload.count || 0;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error;
        },
      }
    ),
    // Fetch community options from the API and set them in the state
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
    selectCommunities: (Community) => Community.communities || [],
    selectCommunityOptions: (Community) => Community.communityOptions || [],
    selectCommunitiesCount: (Community) => Community.count || 0,
    selectCommunityStatus: (Community) => Community.status || "idle",
    selectCommunityError: (Community) => Community.error || undefined,
  },
});

// Action creators are generated for each case reducer function.
export const {
  setCommunitiesAsync,
  setCommunityOptionsAsync,
  resetError,
  resetCommunityState,
} = communitySlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectCommunities,
  selectCommunityOptions,
  selectCommunitiesCount,
  selectCommunityStatus,
  selectCommunityError,
} = communitySlice.selectors;
