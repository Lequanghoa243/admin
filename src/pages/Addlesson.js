import React, { useEffect, useState } from "react";
import CustomInput from "../Component/Custominput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {createLesson,resetState,getOneLesson, updateLesson } from "../features/lesson/lessonSlice";
import { toast } from "react-toastify";
import { getCourses } from "../features/course/courseSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  sequence: yup.string().required("Sequence is Required"),
  videoURL: yup.string().required("videoURL is Required"),
  course: yup.string().required("Course is Required")
});


const Addlesson = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getLessonId = location.pathname.split('/')[3];

  useEffect(()=>{
    if(getLessonId !== undefined){
      dispatch(getOneLesson(getLessonId));
    } else {
      dispatch(resetState())
    }
  },[getLessonId])

  useEffect(()=> {
    dispatch(resetState())
    dispatch(getCourses())
  },[])
  const courseState = useSelector((state)=> state.course.courses)
  const newLesson = useSelector((state)=> state.lesson)

  const { isSuccess, isError, isLoading, createdLesson,updatedLesson,
  lessonName, lessonDesc,lessonURL,lessonSequence,lessonCourse} = newLesson;
  useEffect(() => {
    if (isSuccess && createdLesson) {
      toast.success("Lesson Added Successfullly!");
      navigate("/admin/list-lesson")
    }
    if (isSuccess && updatedLesson ) {
      toast.success("Lesson Updated Successfullly!");
      navigate("/admin/list-lesson")
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: lessonName ||"" ,
      description: lessonDesc ||"",
      sequence: lessonSequence||"",
      videoURL:lessonURL||"",
      course:lessonCourse||"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getLessonId !== undefined){
        const data = {id:getLessonId,lessonData:values}
        dispatch(updateLesson(data));
        dispatch(resetState());
      } else {
        dispatch(createLesson(values));
        formik.resetForm();
        dispatch(resetState());

      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getLessonId !== undefined ? "Edit":"Add"} Lesson</h3>
      <div className="mt-4">
        <form action=""  onSubmit={formik.handleSubmit}>
        <CustomInput type='text' 
          name='title' 
          label ='Enter Course Title'
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
          />
          <div className="error mt-2">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput type='text' 
          label ='Enter Course Description'
           name='description'
           onChng={formik.handleChange("description")}
           onBlr={formik.handleBlur("description")}
           val={formik.values.description}
           />
          <div className="error mt-2">
            {formik.touched.description && formik.errors.description}
          </div>  
          <CustomInput type='text' label ='Enter Lesson Sequence'
          name='sequence'
          onChng={formik.handleChange("sequence")}
          onBlr={formik.handleBlur("sequence")}
          val={formik.values.sequence}
          />
         <div className="error mt-2">
           {formik.touched.sequence && formik.errors.sequence}
         </div>  
          <CustomInput type='text' label ='Enter Lesson videoURL'
          name='videoURL'
          onChng={formik.handleChange("videoURL")}
          onBlr={formik.handleBlur("videoURL")}
          val={formik.values.videoURL}
          />
         <div className="error mt-2">
           {formik.touched.videoURL && formik.errors.videoURL}
         </div>  
         <select name="course" 
          className="form-control py-3 mb-3 my-3"id=""
           onChange={formik.handleChange("course")}
           onBlr={formik.handleBlur("course")}
           value={formik.values.course}
          >
            <option value="">Select Course</option>
            {courseState.map((i,j) =>{
              return(
                <option key ={j} value={i.title}>
                  {i.title}
                </option>
              )
            })}
          </select>
          <div className="error mt-2">
            {formik.touched.course && formik.errors.course}
          </div> 
          
          <button className="btn btn-success border-0 rounded-3 my-5"
                    type="submit"
                  >{getLessonId !== undefined ? "Edit":"Add"} Lesson</button>
          
        </form>

      </div>
    </div>
  );
};

export default Addlesson;