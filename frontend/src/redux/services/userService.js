// Config
import { baseUrl, requestConfig } from "../../config/config";
// Requests
import axios from "axios";

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 5000,
});

const register = async (data) => {
  const config = requestConfig("post", data);

  try {
    const res = await instance({ url: "/register", data }, config);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

const getUserData = async (req, res) => {};

const userService = { register, login, logout, getUserData };

export default userService;
