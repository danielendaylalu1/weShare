import axios from "axios";
import { tocken } from "./postservices";

export const getUsers = async () => {
  const result = await axios.get("http://localhost:3000/api/users");
  console.log(result.data);
  return result.data;
};

export const getUser = async (id) => {
  const result = await axios.get(`http://localhost:3000/api/users/${id}`);
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
  const result = await axios.get(
    `http://localhost:3000/api/users/profile`,
    config
  );
  console.log(result);
  return result.data;
};

export const createUser = async (data) => {
  const result = await axios.post(
    "http://localhost:3000/api/users/signup",
    data
  );
  console.log(result.data);
  return result.data;
};

export const signUser = async (data) => {
  const result = await axios.post(
    "http://localhost:3000/api/users/signin",
    data
  );
  console.log(result.data);
  return result.data;
};
