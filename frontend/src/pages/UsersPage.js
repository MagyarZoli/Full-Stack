import { useEffect, useState } from "react";
import axios from "axios";

import UsersList from "../components/UsersList";

const UsersPage = () => {
  const [usersInfo, setUsersInfo] = useState("");
  useEffect(() => {
    const loadUsersInfo = async () => {
      try {
        const token = usersInfo && await usersInfo.getIdToken();
        const headers = token ? { authToken: token } : {};
        const response = await axios.get(`/user`, { headers });
        setUsersInfo(response.data);
      } catch (error) {
        console.error('Error loading users info:', error);
      }
    };
    loadUsersInfo().then();
  }, []);
  if (!usersInfo) return <p>Loading...</p>;
  return (
    <>
      <h1>Users:</h1>
      <UsersList users={usersInfo}/>
    </>
  );
};

export default UsersPage;