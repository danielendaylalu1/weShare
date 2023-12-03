import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";

import "./home.css";

import Posts from "../components/Posts";

const Home = () => {
  const posts = useSelector((state) => state.post);
  const { loading, error } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="home">
      {/* {console.log(loading, error)} */}
      {loading === true ? (
        <p style={{ color: "white" }}>loading.....</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Posts posts={posts} />
      )}
    </div>
  );
};

export default Home;
