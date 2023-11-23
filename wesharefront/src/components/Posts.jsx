/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleComment, handleLike } from "../store/postSlice";
import "./posts.css";

const Posts = ({ posts }) => {
  const user = JSON.parse(useSelector((state) => state.user));
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
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
              <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
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
                className={`feedback-icon feedback-like ${
                  user && post.likes.includes(user.id) && "liked"
                }`}
                onClick={() => {
                  const postId = post.id;
                  if (user) {
                    dispatch(handleLike(postId, post));
                  } else {
                    navigate("/signin");
                  }
                }}
              />
              <form
                className="post-comment-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const comment = e.target.comment.value;
                  if (user) {
                    dispatch(
                      handleComment(post.id, { data: post, text: comment })
                    );
                  } else {
                    navigate("/signin");
                  }

                  e.target.comment.value = "";
                }}
              >
                <input type="text" placeholder="place comment" name="comment" />
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
  );
};

export default Posts;
