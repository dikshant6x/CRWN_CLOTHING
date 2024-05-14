import { loadStripe } from "@stripe/stripe-js"; // loadstripe is whta that runs in order for us to know that this our stripe instances

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);
