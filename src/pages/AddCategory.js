import React, { useEffect, useState } from "react";
import CustomInput from "../Component/Custominput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory,getOneCategory,resetState, updateCategory } from "../features/category/categorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});
const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCategoryId = location.pathname.split('/')[3];
  const newCategory = useSelector((state)=> state.category)
  const { isSuccess, isError, isLoading, createdCategory, categoryName,updatedCategory } = newCategory;

  useEffect(()=>{
    if(getCategoryId !== undefined){
      dispatch(getOneCategory(getCategoryId));
    } else {
      dispatch(resetState())
    }
  },[getCategoryId])

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
      navigate("/admin/list-category")
    }
    if (isSuccess && updatedCategory ) {
      toast.success("Category Updated Successfullly!");
      navigate("/admin/list-category")
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      
      if(getCategoryId !== undefined){
        const data = {id:getCategoryId,categoryData:values}
        dispatch(updateCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        dispatch(resetState());

      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getCategoryId !== undefined ? "Edit":"Add"} Category</h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type='text' 
          label ='Enter Category Title' 
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
          />
          <div className="error mt-2">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5"  type="submit">{getCategoryId !== undefined ? "Edit":"Add"} Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;