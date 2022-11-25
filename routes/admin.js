const express = require('express');
const router = express.Router();

const admincontroller = require('../controllers/admincontroller');

router.use('/delete/:customerid', admincontroller.deletecustomer);

router.post('/save', admincontroller.addcustomer);

router.get('/',admincontroller.getcustomers);

module.exports = router;
