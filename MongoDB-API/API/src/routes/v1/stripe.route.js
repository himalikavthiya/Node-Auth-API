const express = require("express");
const router = express();
const stripe = require("stripe")(process.env.STRIPE_SECRECT_KEY);

const {createNewCustomer,addNewCard,createCharges}=require('../../controllers/stripe.controller');

router.post("/create-customer", createNewCustomer);
router.post("/add-card", addNewCard);
router.post("/create-charges", createCharges);

module.exports = router;
