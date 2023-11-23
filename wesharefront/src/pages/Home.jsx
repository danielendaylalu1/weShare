import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";

import "./home.css";

import Posts from "../components/Posts";

const Home = () => {
  const posts = useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="home">
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
