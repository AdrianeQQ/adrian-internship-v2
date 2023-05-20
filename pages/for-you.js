import { auth } from "@/firebase";
import { logout } from "@/redux/authSlice";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

const ForYouPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>This is For You Page</h1>
      <p>{user.email ? `Email: ${user.email}` : "Not Logged In"}</p>
      <button onClick={logoutUser}>Logout</button>
      <Link href="/" style={{ display: "block" }}>
        Main page
      </Link>
    </div>
  );
};

export default ForYouPage;
