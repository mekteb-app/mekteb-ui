import { createAppSlice } from "@/lib/createAppSlice";
import { IChild } from "@/interfaces/IChild";
import {
  createChild,
  fetchChildren,
  fetchChildrenOptions,
} from "./childrenAPI";
import { IChildPayload } from "@/interfaces/IChildPayload";
import { toast } from "react-toastify";
import { IError } from "@/interfaces/IError";
import { IChildOption } from "@/interfaces/IChildOption";

export interface ChildrenSliceState {
  children: IChild[];
  childrenOptions: IChildOption[];
  status: "idle" | "loading" | "failed" | "created";
  count: number;
  error: any;
}

const initialState: ChildrenSliceState = {
  children: [],
  childrenOptions: [],
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
    createChildAsync: create.asyncThunk(
      async (data: IChildPayload) => {
        const response = await createChild(data);
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "created";
          state.children = [action.payload.data, ...(state.children || [])];
          state.count = state.count || 0 + 1;
          toast.success("Child created successfully");
        },
        rejected: (state, action) => {
          console.log("rejected");
          state.status = "failed";
          state.error = action.error as IError;
        },
      }
    ),

    setChildrenOptionsAsync: create.asyncThunk(
      async () => {
        const response = await fetchChildrenOptions();
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
          state.childrenOptions = action.payload.data || [];
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

    resetChildrenState: create.reducer((state) => {
      state.children = [];
      state.childrenOptions = [];
      state.status = "idle";
      state.count = 0;
      state.error = undefined;
    }),
  }),
  // Selectors
  selectors: {
    selectChildren: (Children) => Children.children || [],
    selectChildrenOptions: (Children) => Children.childrenOptions || [],
    selectChildrenCount: (Children) => Children.count || 0,
    selectChildrenStatus: (Children) => Children.status || "idle",
    selectChildrenError: (Children) => Children.error || undefined,
  },
});

// Action creators are generated for each case reducer function.
export const {
  setChildrenAsync,
  setChildrenOptionsAsync,
  createChildAsync,
  resetError,
  resetChildrenState,
} = childrenSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectChildren,
  selectChildrenOptions,
  selectChildrenCount,
  selectChildrenStatus,
  selectChildrenError,
} = childrenSlice.selectors;
