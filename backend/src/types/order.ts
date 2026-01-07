import Stripe from "stripe";

export type OrderShipping = {
  name?: string;
  phone?: string;
  address?: Stripe.Address;
};
