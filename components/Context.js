import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { login, logout, subscription } from "@/redux/authSlice";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

const Context = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(login(user));
        const userSnap = await getDoc(doc(db, "users", user.uid));
        dispatch(subscription(userSnap.data().premium));
      } else {
        dispatch(logout());
        dispatch(subscription(null));
      }
    });
  }, []);
  return <>{children}</>;
};

export default Context;
