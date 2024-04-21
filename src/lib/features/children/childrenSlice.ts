import { createAppSlice } from "@/lib/createAppSlice";
import { IChild } from "@/interfaces/IChild";
import { fetchChildren } from "./childrenAPI";

export interface ChildrenSliceState {
  children: IChild[];
  status: "idle" | "loading" | "failed";
  count: number;
  error: any;
}

const initialState: ChildrenSliceState = {
  children: [],
  status: "idle",
  count: 0,
  error: undefined,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const childrenSlice = createAppSlice({
  name: "children",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // Fetche users from the API and set them in the state
    setChildrenAsync: create.asyncThunk(
      async (page = 1) => {
        const response = await fetchChildren({ page, count: 10 });
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
          state.children = action.payload.data || [];
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
  }),
  // Selectors
  selectors: {
    selectChildren: (Children) => Children.children || [],
    selectChildrenCount: (Children) => Children.count || 0,
    selectChildrenStatus: (Children) => Children.status || "idle",
    selectChildrenError: (Children) => Children.error || undefined,
  },
});

// Action creators are generated for each case reducer function.
export const { setChildrenAsync, resetError } = childrenSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectChildren,
  selectChildrenCount,
  selectChildrenStatus,
  selectChildrenError,
} = childrenSlice.selectors;
