import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, handleLike } from "../store/postSlice";
import { Link } from "react-router-dom";

// import { useQuery } from "react-query";
// import { getPosts } from "../services/postservices";

import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

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
              <div className="post-user-profile">
                <Link className="user-profile-img">{post.user.name[0]}</Link>
                <Link>{post.user.name}</Link>
              </div>
              <h2 className="post-desc">{post.desc}</h2>
              <h3 className="post-location">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="location-icon"
                />
                {post.location}
              </h3>
              <div className="post-img-box"></div>
              <div className="post-catagories">
                {post.catagories.map((catag, index) => {
                  return (
                    <span key={index} className="post-catagory">
                      #{catag}
                    </span>
                  );
                })}
              </div>

              <div className="post-feedback">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="feedback-icon feedback-like"
                  onClick={() => {
                    const postId = post.id;
                    dispatch(handleLike(postId, post));
                  }}
                />
                <form className="post-comment-form">
                  <input type="text" placeholder="palce comment" />
                  <button type="submit">post</button>
                </form>
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="feedback-icon feedback-save"
                />
              </div>
              <div className="post-feedback-total">
                <p>{`${post.likes.length}`} likes</p>
                <p>{`${post.comment.length}`} comment</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
