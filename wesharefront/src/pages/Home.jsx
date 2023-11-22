import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, handleComment, handleLike } from "../store/postSlice";
import { Link } from "react-router-dom";

// import { useQuery } from "react-query";
// import { getPosts } from "../services/postservices";

import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const posts = useSelector((state) => state.post);
  const user = JSON.parse(useSelector((state) => state.user));

  const checkLike = (post) => {
    const likes = post.likes.map((like) => like.user);
    if (likes.includes(user.id)) {
      return "liked";
    } else {
      return;
    }
  };

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
                  className={`feedback-icon feedback-like ${checkLike(post)}`}
                  onClick={() => {
                    const postId = post.id;
                    dispatch(handleLike(postId, post));
                  }}
                />
                <form
                  className="post-comment-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const comment = e.target.comment.value;
                    dispatch(
                      handleComment(post.id, { data: post, text: comment })
                    );
                    e.target.comment.value = "";
                  }}
                >
                  <input
                    type="text"
                    placeholder="palce comment"
                    name="comment"
                  />
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
