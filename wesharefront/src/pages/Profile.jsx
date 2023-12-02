import { useEffect, useState } from "react";
import { getProfile } from "../services/userservices";
import { useDispatch } from "react-redux";
import { logOutUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../components/ProfilePage";
const Profile = () => {
  const [user, setUser] = useState(null);

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
  }, []);
  return <ProfilePage user={user} isSelf={true} />;
};

export default Profile;
