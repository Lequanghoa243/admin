import axios from "axios";
import { config } from "../../untils/axiosconfig";
import { base_url } from "../../untils/base_url";

const uploadImg = async (data) => {
    const response = await axios.post(`${base_url}upload`,data,config);

      return response.data;
  };

  const uploadService = {
    uploadImg,
  };
  
  export default uploadService;