import { createAppSlice } from "@/lib/createAppSlice";
import { fetchLessons } from "./lessonsAPI";
import { ILesson } from "@/interfaces/ILesson";

export interface ILessonSliceState {
  lessons: ILesson[];
  status: "idle" | "loading" | "failed";
  count: number;
  error: any;
}

const initialState: ILessonSliceState = {
  lessons: [],
  status: "idle",
  count: 0,
  error: undefined,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const lessonSlice = createAppSlice({
  name: "lesson",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // Fetch lessons from the API and set them in the state
    setLessonsAsync: create.asyncThunk(
      async (page = 1) => {
        const response = await fetchLessons({ page, count: 10 });
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
          state.lessons = action.payload.data || [];
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

    resetLessonState: create.reducer((state) => {
      state.lessons = [];
      state.status = "idle";
      state.count = 0;
      state.error = undefined;
    }),
  }),
  // Selectors
  selectors: {
    selectLessons: (Lesson) => Lesson.lessons || [],
    selectLessonsCount: (Lesson) => Lesson.count || 0,
    selectLessonStatus: (Lesson) => Lesson.status || "idle",
    selectLessonError: (Lesson) => Lesson.error || undefined,
  },
});

// Action creators are generated for each case reducer function.
export const { setLessonsAsync, resetError, resetLessonState } =
  lessonSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectLessons,
  selectLessonsCount,
  selectLessonStatus,
  selectLessonError,
} = lessonSlice.selectors;
