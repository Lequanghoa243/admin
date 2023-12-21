import React, { useEffect, useState } from "react";
import CustomInput from "../Component/Custominput";
import {getCategory} from '../features/category/categorySlice'
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { uploadImg } from "../features/upload/uploadSlice";
import { createCourse,resetState,getOneCourse, updateCourse } from "../features/course/courseSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  learningTime: yup.string().required("Learning Time is Required"),
  category: yup.string().required("Category is Required")
});


const Addcourse = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCourseId = location.pathname.split('/')[3];
  const categoryState = useSelector((state)=> state.category.categorys)
  const imgState = useSelector((state)=> state.upload.images)
  const newCourse = useSelector((state)=> state.course)

  const { isSuccess, isError, isLoading, createdCourse, updatedCourse ,courseName,
  courseDesc,courseLearningtime,courseCategory,courseImg} = newCourse;
  useEffect(()=>{
    if(getCourseId !== undefined){
      dispatch(getOneCourse(getCourseId));
    } else {
      dispatch(resetState())
    }
  },[getCourseId])

  useEffect(()=> {
    dispatch(resetState())
    dispatch(getCategory())
  },[])



  useEffect(() => {
    if (isSuccess && createdCourse) {
      toast.success("Course Added Successfullly!");
      navigate("/admin/list-course")
    }
    if (isSuccess && updatedCourse ) {
      toast.success("Course Updated Successfullly!");
      navigate("/admin/list-course")
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
  enableReinitialize:true,
    initialValues: {
      title: courseName || "",
      description: courseDesc || "",
      learningTime: courseLearningtime || "",
      category: courseCategory || "",
      images: courseImg || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getCourseId !== undefined){
        const data = {id:getCourseId,courseData:values}
        dispatch(updateCourse(data));
        dispatch(resetState());
      } else {
        dispatch(createCourse(values));
        formik.resetForm();
        dispatch(resetState());

      }
    },
  });



  return (
    <div>
      <h3 className="mb-4">{getCourseId !== undefined ? "Edit":"Add"} Course</h3>
      <div className="mt-4">
        <form action="" onSubmit={formik.handleSubmit}>
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
          <CustomInput type='text' label ='Enter Course Learning Time'
           name='learningTime'
           onChng={formik.handleChange("learningTime")}
           onBlr={formik.handleBlur("learningTime")}
           val={formik.values.learningTime}
           />
          <div className="error mt-2">
            {formik.touched.learningTime && formik.errors.learningTime}
          </div>  

          <select name="category" 
          className="form-control py-3 mb-3 my-3"id=""
           onChange={formik.handleChange("category")}
           onBlr={formik.handleBlur("category")}
           value={formik.values.category}
          >
            <option value="">Select Course Category</option>
            {categoryState.map((i,j) =>{
              return(
                <option key ={j} value={i.title}>
                  {i.title}
                </option>
              )
            })}
          </select>
          <div className="error mt-2">
            {formik.touched.category && formik.errors.category}
          </div> 

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
            <button className="btn btn-success border-0 rounded-3 my-5"
                    type="submit"
                  >{getCourseId !== undefined ? "Edit":"Add"} Course</button>
        </form>

      </div>
    </div>
  );
};

export default Addcourse;