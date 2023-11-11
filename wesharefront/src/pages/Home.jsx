import { useEffect, useState } from "react";
import { getPosts } from "../services/postservices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const fetchPost = async () => {
    const result = await getPosts();
    setPosts(result);
    console.log(result);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="home">
      <div className="posts">
        {posts &&
          posts.map((post) => {
            return (
              <div className="post-card" key={post.id}>
                <div className="user-post-pr">
                  <div className="user-post-pr-pic">
                    <h2>{post.user.name[0]}</h2>
                  </div>
                  <p>{post.user.username}</p>
                </div>
                <div className="user-post-desc">
                  <p>{post.desc}</p>
                </div>
                <div className="user-post-location">
                  <h4>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="location-icon"
                    />{" "}
                    Location
                  </h4>
                  <p>{post.location}</p>
                </div>
                <div className="user-post-content"></div>

                <div className="user-post-catagories">
                  {post.catagories.map((cat, index) => {
                    return <p key={index}>#{cat}</p>;
                  })}
                </div>
                <div className="user-post-feedbacks">
                  <FontAwesomeIcon icon={faHeart} className="like" />

                  <form className="user-post-comment-field">
                    <input type="text" placeholder="Add a comment.." />
                    <button type="submit">post</button>
                  </form>

                  <FontAwesomeIcon icon={faBookmark} className="save" />
                </div>
                <div className="user-post-feedbacks-total">
                  <h4>{post.likes.length} likes</h4>
                  <p>view all {post.comment.length} comments</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
