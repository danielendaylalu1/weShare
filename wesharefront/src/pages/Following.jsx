import { useSelector } from "react-redux";
import { getFollowing } from "../services/userservices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./following.css";

const Following = () => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("following");
  const { id } = JSON.parse(useSelector((state) => state.user));
  console.log(id);
  const handelFollowing = async () => {
    const data = await getFollowing();
    console.log(data);
    setUser(data);
  };
  useEffect(() => {
    handelFollowing();
  }, []);
  return (
    <div className="following-page">
      <div className="following-nav">
        <p
          onClick={() => setActive("following")}
          className={`${active === "following" && "active"}`}
        >
          Following
        </p>
        <p
          onClick={() => setActive("followers")}
          className={`${active === "followers" && "active"}`}
        >
          Followers
        </p>
      </div>
      {user && (
        <div className="following-users">
          {active === "following"
            ? user.following.map((user) => {
                return (
                  <div key={user.id}>
                    <div className="post-user-profile">
                      <Link className="user-profile-img">{user.name[0]}</Link>
                      <Link>{user.username}</Link>
                    </div>
                  </div>
                );
              })
            : user.followers.map((user) => {
                return (
                  <div key={user.id}>
                    <div className="post-user-profile">
                      <Link className="user-profile-img">{user.name[0]}</Link>
                      <Link>{user.username}</Link>
                    </div>
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

export default Following;
