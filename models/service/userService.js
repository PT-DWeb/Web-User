const userModel = require("../mongoose/userModel");
const bcrypt = require('bcrypt');
const emailValidator = require('email-deep-validator');
const saltRounds = 10;
let accountdata = "abc";

exports.addNewUser = async (newaccount) => {
    const newUser = new userModel(newaccount);
    console.log(newUser);
    newUser.save();
}

exports.findOne = async (key, value) => {
    var name = key;
    var value1 = value;
    var query = {};
    query[name] = value1;
    const user = await userModel.findOne(query);

    console.log(user);
    return user
}

exports.UpdatePassword = async (key, value, update) => {
    var name = key;
    var value1 = value;
    var query = {};
    query[name] = value1;
    const user = await userModel.findOneAndUpdate(query,update);
    console.log("UPDATE PASSWORD")
    console.log(user);
    return user
}


exports.checkUserRegister = async (req, res, next) => {
    let check = {
        isFailUser: false,
        isFailEmail: false,
        valid: false
    }
    console.log("Kiểm tra User có tồn tại trong cơ sở dữ liệu không");
    console.log(req.body)

    const userExist = await userModel.findOne({ name: req.body.Name });
    // Kiểm tra email cố tồn tại trong cơ sở dữ liệu không
    const emailExist = await userModel.findOne({ email: req.body.Email });
    const EmailValidator = new emailValidator();
    let emailValid = await EmailValidator.verify(req.body.Email);
    console.log("EMAIL VALID");
    //console.log(emailValid.validators.smtp.reason);
    console.log(emailValid);

    while(emailValid.validMailbox == null)
    {
        emailValid = await EmailValidator.verify(req.body.Email);
    }
    
    check.valid = emailValid.validMailbox;

    console.log("KIEM TRA EMAIL TỒN TẠI KHÔNG");

    console.log(emailExist);

    
    console.log(check);
    //console.log(valid);

    console.log(userExist);
    if (userExist != null && emailExist != null) {
        check.isFailUser = true;
        check.isFailEmail = true;
    }
    else if (userExist != null) {

        console.log("VAO FALSE");

        check.isFailUser = true;
    }
    else if (emailExist != null) {

        console.log("VAO FALSE");

        check.isFailEmail = true;
    }
    return check;
}

exports.checkUser = async (username, password) => {
    const user = await userModel.findOne({ name: username })


    if (!user) {
        return false;
    }
    let checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
        
        return user;
    }

    return false;
}

exports.getUser = async (id) => {
    return await userModel.findOne({ _id: id });
}



exports.saveTemporaryAccount = async (req, res, next) => {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    accountdata = {
        name: req.body.Name,
        password: hashedPassword,
        userName: req.body.username,
        email: req.body.Email,
        avatar: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png',
        role: "5fe9b7b8ea0d1f18102eed2f"
    };
}

exports.getTemporaryAccount = (req, res, next) => {
    return accountdata;
}

exports.setTemporaryAccount = (req, res, next) => {
    accountdata = "abc";
}

