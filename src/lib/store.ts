import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./features/users/usersSlice";
import { errorsSlice } from "./features/error/errorSlice";
import { currentUserSlice } from "./features/currentUser/currentUserSlice";
import { authApiSlice } from "./features/auth/authSlice";
import { childrenSlice } from "./features/children/childrenSlice";
import { communitySlice } from "./features/community/communitySlice";
import { quickviewSlice } from "./features/quickview/quickviewSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  usersSlice,
  errorsSlice,
  currentUserSlice,
  authApiSlice,
  childrenSlice,
  communitySlice,
  quickviewSlice
);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(authApiSlice.middleware);
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
