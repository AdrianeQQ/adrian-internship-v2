import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51KJdHABFmTrmbD39yFXjYHH2ndOqq0GcHY6EAU0P3ZYntJ4wXG0iq7HgDC4gd0sThSUAqmFOwtxN2Hw0MEMgTvj700HcD1kdUu"
    );
  }
  return stripePromise;
};

export default initializeStripe;
