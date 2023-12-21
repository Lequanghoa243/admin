import axios from "axios";
import { config } from "../../untils/axiosconfig";
import { base_url } from "../../untils/base_url";


const getLesson = async () => {
    const response = await axios.get(`${base_url}lesson`);

      return response.data;
  };

  const createLesson = async (lesson) => {
    const response = await axios.post(`${base_url}lesson/create`,lesson,config);

      return response.data;
  };

  const getOneLesson = async (id) => {
    const response = await axios.get(`${base_url}lesson/${id}`,config);

      return response.data;
  };

  const updateLesson= async (lesson) => {
    const response = await axios.put(`${base_url}lesson/${lesson.id}`,{title:lesson.lessonData.title,
      title:lesson.lessonData.title,
      description:lesson.lessonData.description,
      videoURL:lesson.lessonData.videoURL,
      sequence:lesson.lessonData.sequence,
      course:lesson.lessonData.course},config);

      return response.data;
  };

  const deleteLesson = async (id) => {
    const response = await axios.delete(`${base_url}lesson/${id}`,config);

      return response.data;
  };
  const lessonService = {
    getLesson,
    createLesson,
    getOneLesson,
    deleteLesson,
    updateLesson
  };
  
  export default lessonService;