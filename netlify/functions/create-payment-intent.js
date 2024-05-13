require("dotenv").config(); // using dotenv attaching all secret variables on end file onto our process environement
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // main exports
  try {
    const { amount } = JSON.parse(event.body);

    // create payement intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      description: "for CRWN_CLOTHING APP ",
      shipping: {
        name: "DIKSHANT PARTAP SINGH",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
