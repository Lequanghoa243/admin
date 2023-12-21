import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import courseReducer from '../features/course/courseSlice'
import categoryReducer from '../features/category/categorySlice'
import lessonReducer from '../features/lesson/lessonSlice'
import uploadReducer from '../features/upload/uploadSlice'
export const store = configureStore({
    reducer: {
      auth:authReducer,
      user:userReducer,
      course:courseReducer,
      category:categoryReducer,
      lesson:lessonReducer,
      upload:uploadReducer
    },
  });