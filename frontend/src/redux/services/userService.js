// Config
import { baseUrl, requestConfig } from "../../config/config";
import axios from "axios";

const getUserData = async (userId) => {
  const config = requestConfig(`${baseUrl}/users/${userId}`, "GET", null);
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const userService = { getUserData };

export default userService;
