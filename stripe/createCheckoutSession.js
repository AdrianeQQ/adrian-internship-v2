import { addDoc, collection, onSnapshot } from "firebase/firestore";
import getStripe from "./initializeStripe";
import { db } from "@/firebase";

export const createCheckoutSession = async (uid, pid) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: pid,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );
  onSnapshot(checkoutSessionRef, async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
};
