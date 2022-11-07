// Config
import { baseUrl, requestConfig } from "../../config/config";
import axios from "axios";
import Cookies from "js-cookie";
import authService from "../services/authService";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response.data.errors[0] === "Access token expirado!") {
      const config = requestConfig(`${baseUrl}/token/refresh`, "GET");
      await axios(config);
      return;
    } else if (response.data.errors[0] === "Refresh token expirado!") {
      Cookies.remove("frontAuthCookie");
      await authService.logout();
      return
    }
    return response;
  }
);

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
