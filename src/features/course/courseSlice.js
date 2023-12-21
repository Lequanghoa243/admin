import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "./courseService";
import { createAction } from "@reduxjs/toolkit";

export const getCourses  = createAsyncThunk(
  "course",
  async (thunkAPI) => {
    try {
      return await courseService.getCourse();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCourse = createAsyncThunk(
  "course/create",
  async (courseData, thunkAPI) => {
    try {
      return await courseService.createCourse(courseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneCourse  = createAsyncThunk(
  "course/get-one",
  async (id,thunkAPI) => {
    try {
      return await courseService.getOneCourse(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCourse  = createAsyncThunk(
  "course/delete",
  async (id,thunkAPI) => {
    try {
      return await courseService.deleteCourse(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "course/update",
  async (course, thunkAPI) => {
    try {
      return await courseService.updateCourse(course);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  courses: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCourse = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOneCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.courseName = action.payload.title;
        state.courseDesc = action.payload.description;
        state.courseLearningtime = action.payload.learningTime;
        state.courseCategory = action.payload.category;
        state.courseImg = action.payload.images;
      })
      .addCase(getOneCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCourse = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCourse = action.payload;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default courseSlice.reducer;