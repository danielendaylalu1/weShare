import { useEffect, useState } from "react";
import "./profile.css";
import { getProfile } from "../services/userservices";
import Posts from "../components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState(null);
  const postsData = useSelector((state) => state.post);

  const [current, setCurrent] = useState("post");

  const likes = user && user.posts.map((post) => post.likes.length);
  console.log(likes);
  const totalLikes = likes && likes.reduce((a, b) => a + b, 0);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const profileHandler = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      const errorMessage = error.response.data;
      if (errorMessage.error == "jwt expired") {
        window.localStorage.removeItem("user");
        dispatch(logOutUser(null));
        navigate("/signin");
      }
    }
  };
  useEffect(() => {
    profileHandler();
  }, [postsData]);
  return (
    <div className="profile-page">
      <div className="profile-name">
        <h3>{user && user.name}</h3>
        <p>{user && user.posts.length} posts</p>
      </div>
      <div className="profile-desc">
        <div className="profile-pic">
          <h1>{user && user.name[0]}</h1>
        </div>

        <div className="profile-desc-text">
          <h3>{user && user.name}</h3>
          <p>{user && user.username}</p>
        </div>
        <p>total likes {user && totalLikes}</p>
        <p
          className="profile-logout-mobile"
          onClick={() => {
            dispatch(logOutUser(null));
            navigate("/signin");
          }}
        >
          logout
        </p>
      </div>
      <div className="profile-nav">
        <p
          onClick={() => {
            setCurrent("post");
          }}
          className={`${current === "post" && "active"}`}
        >
          Posts
        </p>
        <p
          onClick={() => {
            setCurrent("following");
          }}
          className={`${current === "following" && "active"}`}
        >
          Following
        </p>
        <p
          onClick={() => {
            setCurrent("followers");
          }}
          className={`${current === "followers" && "active"}`}
        >
          Followers
        </p>
      </div>
      <div className="profile-post">
        {user && current === "post" ? (
          user.posts.length === 0 ? (
            <div>no post posted yet</div>
          ) : (
            <Posts posts={user.posts.reverse()} />
          )
        ) : current === "following" ? (
          <div>{current}</div>
        ) : (
          <div>{current}</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
