import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lessonService from "./lessonService";
import { createAction } from "@reduxjs/toolkit";

export const getLesson  = createAsyncThunk(
  "lesson",
  async (thunkAPI) => {
    try {
      return await lessonService.getLesson();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createLesson = createAsyncThunk(
  "lesson/create",
  async (lessonData, thunkAPI) => {
    try {
      return await lessonService.createLesson(lessonData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneLesson  = createAsyncThunk(
  "lesson/get-one",
  async (id,thunkAPI) => {
    try {
      return await lessonService.getOneLesson(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteLesson  = createAsyncThunk(
  "lesson/delete",
  async (id,thunkAPI) => {
    try {
      return await lessonService.deleteLesson(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateLesson = createAsyncThunk(
  "lesson/update",
  async (lesson, thunkAPI) => {
    try {
      return await lessonService.updateLesson(lesson);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  lessons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.lessons = action.payload;
      })
      .addCase(getLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(createLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdLesson = action.payload;
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOneLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.lessonName = action.payload.title;
        state.lessonDesc = action.payload.description;
        state.lessonURL = action.payload.videoURL;
        state.lessonSequence = action.payload.sequence;
        state.lessonCourse = action.payload.course;
      })
      .addCase(getOneLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedLesson = action.payload;
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedLesson = action.payload;
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default lessonSlice.reducer;