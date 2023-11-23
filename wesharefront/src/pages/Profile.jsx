import { useEffect, useState } from "react";
import "./profile.css";
import { getProfile } from "../services/userservices";
import Posts from "../components/Posts";
const Profile = () => {
  const [user, setUser] = useState(null);

  const likes = user && user.posts.map((post) => post.likes.length);
  console.log(likes);
  // const totalLikes = likes.reduce((a, b) => {
  //   return a + b;
  // }, 0);
  // console.log(totalLikes);
  const profileHandler = async () => {
    try {
      const data = await getProfile();

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    profileHandler();
  }, []);
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
        <p>total likes {user && likes.length}</p>
      </div>
      <div className="profile-nav">
        <p>Posts</p>
        <p>Following</p>
        <p>Followers</p>
      </div>
      <div className="profile-post">{user && <Posts posts={user.posts} />}</div>
    </div>
  );
};

export default Profile;
