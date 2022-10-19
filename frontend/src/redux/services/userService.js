// Config
import { baseUrl, requestConfig } from "../../config/config";
import axios from "axios";

const register = async (data) => {
  const config = requestConfig(`${baseUrl}/register`, "POST", data);
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const login = async (data) => {
  const config = requestConfig(`${baseUrl}/login`, "POST", data);
  try {
    const res = await axios(config);

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const logout = async () => {
  const config = requestConfig(`${baseUrl}/logout`, "GET", null);
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const getUserData = async (userId) => {
  const config = requestConfig(`${baseUrl}/${userId}/info`, "GET", null);
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const userService = { register, login, logout, getUserData };

export default userService;
