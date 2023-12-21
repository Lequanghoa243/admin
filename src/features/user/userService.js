import axios from "axios";
import { config } from "../../untils/axiosconfig";
import { base_url } from "../../untils/base_url";

const getUsers = async () => {
    const response = await axios.get(`${base_url}user`,config);

      return response.data;
  };

  const userService = {
    getUsers,
  };
  
  export default userService;