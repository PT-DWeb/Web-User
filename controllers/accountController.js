const accountService = require('../models/accountService');
const Account = require('../models/accoutModel');

exports.displayInfo = async(req, res, next) => {
    const foundAcc = await Account.findOne ({ name: "abc", password: "12345" });
    console.log(foundAcc);
    res.render('account/userProfile', {foundAcc, isLogin: true});
};

exports.changeCustomerAvt = async(req, res, next) => {
    await accountService.changeAvt(req, res, next);
    const foundAcc = await Account.findOne ({ name: "abc", password: "12345" });
    res.render('account/userProfile', {foundAcc, isLogin: true});
};