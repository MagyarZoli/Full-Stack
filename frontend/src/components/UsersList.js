import { Link } from "react-router-dom";

const UsersList = ({ users }) => {
  return (
    <>
      {users.map((user, i) => (
        <Link key={i} to={`/user/${user._id}`} className="user-list-item">
          <h3>{user.username}</h3>
          <p>{user.created_date}</p>
          {user.googleId && <p>Google+: {user.googleId}</p>}
          {user.githubId && <p>Github: {user.githubId}</p>}
          {user.facebookId && <p>Facebook: {user.facebookId}</p>}
          {!user.googleId && !user.githubId && !user.facebookId && <p>Email: {user.email}</p>}
        </Link>
      ))}
    </>
  );
};

export default UsersList;