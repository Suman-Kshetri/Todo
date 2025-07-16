
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full mb-4" />
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Full Name:</strong> {user.fullname}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default ProfilePage;
