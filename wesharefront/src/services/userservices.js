import axios from "axios";
import { tocken } from "./postservices";

const BASE_URI = `${import.meta.env.VITE_BASE_URI}users`;

export const getUsers = async () => {
  const result = await axios.get(`${BASE_URI}`);
  console.log(result.data);
  return result.data;
};

export const getUser = async (id) => {
  const result = await axios.get(`${BASE_URI}/${id}`);
  console.log(result.data);
  return result.data;
};

export const getProfile = async () => {
  const config = {
    headers: {
      Authorization: tocken,
    },
  };
  console.log(config);
  const result = await axios.get(`${BASE_URI}/profile`, config);
  console.log(result);
  return result.data;
};

export const createUser = async (data) => {
  const result = await axios.post(`${BASE_URI}/signup`, data);
  console.log(result.data);
  return result.data;
};

export const signUser = async (data) => {
  const result = await axios.post(`${BASE_URI}/signin`, data);
  console.log(result.data);
  return result.data;
};

export const followUser = async (data) => {
  const config = {
    headers: {
      Authorization: tocken,
    },
  };
  const result = await axios.put(`${BASE_URI}/follow`, data, config);
  console.log(result.data);
  return result.data;
};
