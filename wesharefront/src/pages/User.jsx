import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfilePage from "../components/ProfilePage";
import { useSelector } from "react-redux";
import { getUser } from "../services/userservices";

const User = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const posts = useSelector((state) => state.post);
  const post = posts.find((p) => p.id === id);

  console.log("post", post);
  const handelUser = async (id) => {
    const userData = await getUser(id);
    console.log(userData);
    setUser(userData);
  };

  useEffect(() => {
    const id = post && post.user.id;
    handelUser(id);
    // setUser(post.user);
  }, []);
  return <ProfilePage user={user} isSelf={false} />;
};

export default User;
