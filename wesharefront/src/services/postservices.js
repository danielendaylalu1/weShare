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
  return result.data;
};

export const createPost = async (data, file) => {
  const formData = new FormData();
  formData.append("location", data.location);
  formData.append("desc", data.desc);
  formData.append("catagories", data.catagories);
  formData.append("file", file);

  console.log(formData);

  const config = {
    headers: {
      Authorization: tocken,
      "Content-Type": "multipart/form-data", // Add this line
    },
  };

  const result = await axios.post(`${BASE_URI}`, formData, config); // Send the form data instead of the data object
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
