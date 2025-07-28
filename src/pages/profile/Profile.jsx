import { useLoaderData, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/firebaseConfig";

function Profile() {
  const details = useLoaderData();
  const navigate = useNavigate();
  const handleLogut = () => {
    logout();
    navigate("/login");
  };

  if (!details) return <div>Loading...</div>;
  return (
    <>
      <div>{details.name}</div>
      <button onClick={handleLogut}>Logout</button>
    </>
  );
}

export default Profile;
