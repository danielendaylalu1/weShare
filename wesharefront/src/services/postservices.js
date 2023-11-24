import axios from "axios";

export let tocken = null;

const BASE_URI = `${import.meta.env.VITE_BASE_URI}posts`;

export const setTocken = (newtocken) => {
  console.log(newtocken);
  return (tocken = `Bearer ${newtocken}`);
};

export const getPosts = async () => {
  const result = await axios.get(`${BASE_URI}`);
  console.log(result.data); //console
  return result.data;
};

export const getPost = async (id) => {
  const result = await axios.get(`${BASE_URI}/${id}`);
  console.log(result.data); //console
};

export const createPost = async (data) => {
  const config = {
    headers: { Authorization: tocken },
  };
  console.log(config);
  const result = await axios.post(`${BASE_URI}`, data, config);
  console.log(result.data); //console
  return result.data;
};

export const likePost = async (id, post) => {
  const config = {
    headers: { Authorization: tocken },
  };
  console.log(config);
  const result = await axios.put(`${BASE_URI}/like/${id}`, post, config);
  return result.data;
};
export const commentPost = async (id, data) => {
  const config = {
    headers: { Authorization: tocken },
  };
  console.log(config);
  const result = await axios.put(`${BASE_URI}/comment/${id}`, data, config);
  return result.data;
};
