import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { login, logout, subscription } from "@/redux/authSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loadFinished, loadSaved } from "@/redux/booksSlice";

const Context = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(login(user));
        const userSnap = await getDoc(doc(db, "users", user.uid));
        await user.getIdToken(true);
        const dekodedToken = await user.getIdTokenResult();
        const role = dekodedToken?.claims?.stripeRole || "";
        console.log(role);
        if (role) {
          await updateDoc(doc(db, "users", user.uid), {
            premium: role,
          });
        }
        dispatch(subscription(role));
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
