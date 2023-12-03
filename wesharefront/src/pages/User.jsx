import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfilePage from "../components/ProfilePage";

import { getUser } from "../services/userservices";
import { getPost } from "../services/postservices";

const User = () => {
  const [user, setUser] = useState(null);
  const params = useParams();

  const handelUser = async (id) => {
    const post = await getPost(id);
    const userId = post.user.id;
    const userData = await getUser(userId);
    setUser(userData);
  };

  useEffect(() => {
    handelUser(params.id);
    // setUser(post.user);
  }, []);
  return <ProfilePage user={user} isSelf={false} />;
};

export default User;
