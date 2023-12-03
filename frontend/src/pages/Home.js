import useUser from "../hooks/useUser.js";

const Home = () => {
  const { user, isLoading } = useUser();
  return (
    <h1>Home</h1>
  );
};

export default Home;
