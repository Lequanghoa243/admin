import axios from "axios";
import { config } from "../../untils/axiosconfig";
import { base_url } from "../../untils/base_url";


const getCourse = async () => {
    const response = await axios.get(`${base_url}course`);

      return response.data;
  };

const createCourse = async (course) => {
    const response = await axios.post(`${base_url}course/create`,course,config);

      return response.data;
  };

  const getOneCourse = async (id) => {
    const response = await axios.get(`${base_url}course/${id}`,config);

      return response.data;
  };

  const updateCourse= async (course) => {
    const response = await axios.put(`${base_url}course/${course.id}`,{title:course.courseData.title,
       description:course.courseData.description,
       category:course.courseData.category,
       learingTime:course.courseData.learingTime,
       images:course.courseData.images},config);

      return response.data;
  };

  const deleteCourse = async (id) => {
    const response = await axios.delete(`${base_url}course/${id}`,config);

      return response.data;
  };
  

  const courseService = {
    getCourse,
    createCourse,
    getOneCourse,
    deleteCourse,
    updateCourse
  };
  
  export default courseService;