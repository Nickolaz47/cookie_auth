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

const login = async (req, res) => {};

const logout = async (req, res) => {};

const getUserData = async (req, res) => {};

const userService = { register, login, logout, getUserData };

export default userService;
