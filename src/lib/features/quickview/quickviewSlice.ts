import { createAppSlice } from "@/lib/createAppSlice";
import { Entity } from "@/enums/entity";
import { PayloadAction } from "@reduxjs/toolkit";

interface IQuickview {
  entities: { entity: Entity; id: string }[];
}

const initialState: IQuickview = {
  // Your initial state here
  entities: [],
};

export const quickviewSlice = createAppSlice({
  name: "quickview",
  initialState,
  reducers: {
    // Your other reducers here
    openQuickview: (
      state,
      action: PayloadAction<{ entity: Entity; id: string }>
    ) => {
      state.entities = [action.payload, ...state.entities];
    },
    closeQuickviews: (state) => {
      state.entities = [];
    },
  },
  selectors: {
    selectQuickviews: (Quickview) => Quickview.entities || [],
  },
});

export const { openQuickview, closeQuickviews } = quickviewSlice.actions;

export const { selectQuickviews } = quickviewSlice.selectors;
