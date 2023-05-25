import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { login, logout, subscription } from "@/redux/authSlice";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loadFinished, loadSaved } from "@/redux/booksSlice";

const Context = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(login(user));
        const userSnap = await getDoc(doc(db, "users", user.uid));
        dispatch(subscription(userSnap.data().premium));
        dispatch(loadSaved(userSnap.data().saved));
        dispatch(loadFinished(userSnap.data().finished));
      } else {
        dispatch(logout());
        dispatch(subscription(null));
      }
    });
  }, []);
  return <>{children}</>;
};

export default Context;
