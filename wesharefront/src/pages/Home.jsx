import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/postSlice";

// import { useQuery } from "react-query";
// import { getPosts } from "../services/postservices";

import "./home.css";

const Home = () => {
  const posts = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  //   const result = useQuery({
  //     queryKey: ["posts"],
  //     queryFn: getPosts,
  //     refetchOnWindowFocus: false,
  //     retry: 1,
  //   });

  //   if (result.isPending) {
  //     return <div>pending.....</div>;
  //   }
  //   if (result.isError) {
  //     return <div>{result.error.message}</div>;
  //   }
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div key={post.id} className="post">
              <h1>{post.user.name[0]}</h1>
              <h2>{post.desc}</h2>
              <h3>{post.location}</h3>
              {post.catagories.map((catag, index) => {
                return <span key={index}>#{catag}</span>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
