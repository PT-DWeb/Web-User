const accountService = require('../models/accountService');
const Account = require('../models/accountModel');

exports.displayInfo = async(req, res, next) => {
    const foundAcc = await Account.findOne ({ _id: "5fcf8a508c04a6ba5099647d"});
    //console.log(foundAcc);
    res.render('account/userProfile', {foundAcc, isLogin: true});
};

exports.changeCustomerAvt = async(req, res, next) => {
    await accountService.changeAvt(req, res, next);
    //const foundAcc = await Account.findOne ({ name: "abc", password: "12345" });
    //console.log("Đã cập nhật ảnh");
    //res.redirect('/account/edit');
};