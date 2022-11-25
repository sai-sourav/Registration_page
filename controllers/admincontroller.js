const rootdir = require('../util/path');
const path = require('path');

const Customer = require('../models/modeladmin');

exports.getcustomers = async (req, res, next) => {
    // res.sendFile(path.join(rootdir,'views','index.html'));
    const customers = await Customer.findAll()
    // console.log(customers);
    res.json(customers);
}

exports.addcustomer = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.emailid;
    const phone = req.body.phone;
    const date = req.body.calldate;
    const time = req.body.calltime;
    try{
        const data = await Customer.create({
            name: name,
            email: email,
            phone: phone,
            calldate: date,
            calltime: time
        })
        res.status(201).json({created: data});
    } catch(err){
        if (err){
            res.status(500).json({error:err});
        }
    }
    
}

exports.deletecustomer = async (req, res, next) => {
    const custid = req.params.customerid;
    const customer = await Customer.findByPk(custid)
    const status = await customer.destroy();
    res.json({"status": status});
}
