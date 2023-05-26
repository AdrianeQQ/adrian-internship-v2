import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripePromise;
};

export default initializeStripe;
