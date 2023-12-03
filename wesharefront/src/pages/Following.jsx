import { useSelector } from "react-redux";
import { getFollowing } from "../services/userservices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./following.css";

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleFollow } from "../store/postSlice";

const Following = () => {
  const [users, setUsers] = useState(null);
  const [active, setActive] = useState("following");

  const user = JSON.parse(useSelector((state) => state.user));
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handelFollowing = async () => {
    const data = await getFollowing();
    console.log(data);
    setUsers(data);
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
      {users && (
        <div className="following-users">
          {active === "following"
            ? users.following.map((u) => {
                return (
                  <div key={u.id} className="following-users-list">
                    <div className="post-user-profile">
                      <Link
                        to={`/post/${user.id}`}
                        className="user-profile-img"
                      >
                        {u.name[0]}
                      </Link>

                      <Link to={`/post/${user.id}`}>{u.username}</Link>
                    </div>
                    {!user ? (
                      <div
                        className="post-user-follow"
                        onClick={() => {
                          // console.log("hi");
                          navigate("/signin");
                        }}
                      >
                        <p>follow</p>
                        <FontAwesomeIcon icon={faAdd} className="icon" />
                      </div>
                    ) : (
                      u.id !== user.id && (
                        <div
                          className="post-user-follow"
                          onClick={() => {
                            // console.log("hi");
                            dispatch(handleFollow(u));
                          }}
                        >
                          {u.followers.includes(user.id) ? (
                            <p>unfollow</p>
                          ) : (
                            <>
                              <p>follow</p>
                              <FontAwesomeIcon icon={faAdd} className="icon" />
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>
                );
              })
            : users.followers.map((u) => {
                return (
                  <div key={u.id} className="following-users-list">
                    <div className="post-user-profile">
                      <Link
                        className="user-profile-img"
                        to={`/post/${user.id}`}
                      >
                        {u.name[0]}
                      </Link>
                      <Link to={`/post/${user.id}`}>{u.username}</Link>
                    </div>
                    {!user ? (
                      <div
                        className="post-user-follow"
                        onClick={() => {
                          // console.log("hi");
                          navigate("/signin");
                        }}
                      >
                        <p>follow</p>
                        <FontAwesomeIcon icon={faAdd} className="icon" />
                      </div>
                    ) : (
                      u.id !== user.id && (
                        <div
                          className="post-user-follow"
                          onClick={() => {
                            // console.log("hi");
                            dispatch(handleFollow(u));
                          }}
                        >
                          {u.followers.includes(user.id) ? (
                            <p>unfollow</p>
                          ) : (
                            <>
                              <p>follow</p>
                              <FontAwesomeIcon icon={faAdd} className="icon" />
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

export default Following;
