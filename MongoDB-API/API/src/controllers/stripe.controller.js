const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRECT_KEY);

/**Create Stripe Customer */
const createNewCustomer = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const customer = await stripe.customers.create({
      name: name,
      email: email,
    });
    res.status(201).json({
      success: true,
      messsage: "Customer create successfully !",
      data: customer,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      messsage: err.messsage,
    });
  }
};

// /**Create New Card */
// const addNewCard = async (req, res,next) => {
//   const {
//     customer_Id,
//     card_Name,
//     card_ExpYear,
//     card_ExpMonth,
//     card_Number,
//     card_CVC,
//   } = req.body;
// //   console.log(req.body,"++++++++++++++++++++ ")

//   try {

//     const card_Token = await stripe.tokens.create({
//             card: {
//             name: card_Name,
//             number: card_Number,
//             exp_month: card_ExpMonth,
//             exp_year: card_ExpYear,
//             cvc: card_CVC,
//             },
//     });

// console.log(stripe.tokens.create);

//     console.log(card_Token,"card_Token+++++++++++");

//     const card = await stripe.customers.createSource(customer_Id, {
//         source: `${card_Token.id}`,
//     });

//     console.log(card,"card+++++++++++");

//     res.status(201).json({
//       success: true,
//       messsage: "Card detail add successfully !",
//       card: card.id,
//     });

//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       messsage: err,
//     });
//   }
// };

const addNewCard = async (req, res) => {
  try {
    const {
      customer_Id,
      card_Name,
      card_ExpYear,
      card_ExpMonth,
      card_Number,
      card_CVC,
    } = req.body;

    const card_Token = await stripe.tokens.create({
      // tos_shown_and_accepted: true,
      card: {
        name: card_Name,
        number: card_Number,
        exp_month: card_ExpMonth,
        exp_year: card_ExpYear,
        cvc: card_CVC,
      },
    });
    console.log("ok");

    // Check if token creation is successful
    if (!card_Token || !card_Token.id) {
      throw new Error("Failed to create card token");
    }

    const card = await stripe.customers.createSource(customer_Id, {
      source: `${card_Token.id}`,
    });

    return res.status(200).send({ card: card.id });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

/**create charges */
const createCharges = async (req, res, next) => {
  try {
    const createCharge = await stripe.charges.create({
      receipt_email: "test@gmail.com",
      amount: 50 * 100, //USD*100
      currency: "INR",
      card: req.body.card_ID,
      customer: req.body.customer_Id,
    });
    res.send(createCharge);
  } catch (err) {
    throw new Error(error);
  }
};


module.exports = { createNewCustomer, addNewCard, createCharges };
