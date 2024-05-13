import { createAppSlice } from "@/lib/createAppSlice";
import { IError } from "../../../interfaces/IError";

const initialState: { error: IError | undefined } = {
  // Your initial state here
  error: undefined,
};

export const errorsSlice = createAppSlice({
  name: "errors",
  initialState,
  reducers: {
    // Your other reducers here
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
  selectors: {
    selectError: (Error) => Error.error || null,
  },
});

export const { setError, clearError } = errorsSlice.actions;

export const { selectError } = errorsSlice.selectors;
