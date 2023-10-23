const express = require('express');
const router = express();
const userRoute=require('./user.route')
const stripeRoute=require('./stripe.route')

router.use('/user',userRoute);
router.use('/stripe',stripeRoute);

module.exports = router;
