import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { useToken } from "../hooks/useToken";
import NotFoundPage from "./NotFoundPage";

const UserPage = () => {
  const [token, setToken] = useToken();
  const [userInfo, setUserInfo] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const response = await axios.get(`/user/${id}`, {
          headers: {Authorization: token}
        });
        const { token: newToken } = response.data;
        setToken(newToken);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    };
    loadUserInfo().then();
  }, [id]);
  if (!userInfo) return <p>Loading...</p>;
  if (!userInfo._id) return <NotFoundPage />;
  const { username, created_date, googleId, githubId, facebookId, email } = userInfo;
  return (
    <>
      <h1>{username}</h1>
      <p>{created_date}</p>
      {googleId && <p>Google+: {googleId}</p>}
      {githubId && <p>Github: {githubId}</p>}
      {facebookId && <p>Facebook: {facebookId}</p>}
      {!googleId && !githubId && !facebookId && <p>Email: {email}</p>}
    </>
  );
};

export default UserPage;