import axios from "axios";

let tocken = null;

export const setTocken = (newtocken) => {
  tocken = `Bearer ${newtocken}`;
};

export const getPosts = async () => {
  const result = await axios.get("http://localhost:3000/api/posts");
  console.log(result.data); //console
  return result.data;
};

export const getPost = async (id) => {
  const result = await axios.get(`http://localhost:3000/api/posts/${id}`);
  console.log(result.data); //console
};

export const createPost = async (data) => {
  const config = {
    headers: { Authorization: tocken },
  };
  const result = await axios.post(
    "http://localhost:3000/api/posts",
    data,
    config
  );

  console.log(result.data); //console
};

export const likePost = async (id) => {
  const result = await axios.put(`http://localhost:3000/api/posts/${id}`);
  console.log(result);
};
