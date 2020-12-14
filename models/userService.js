const userModel = require("./userModel");
const bcrypt = require('bcrypt');
const { notify } = require("../routes");
const saltRounds = 10;

exports.addNewUser = async (req, res, next) => {

    let notify1 = true;
    console.log("Thêm User");
    console.log(req.body)

    const userExist = await userModel.findOne({ name: req.body.Name });

    if (userExist == null) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.Password, salt, function (err, hash) {
                const newPostData =
                {
                    name: req.body.Name,
                    password: hash,
                    email: req.body.Email,
                };
                const newUser = new userModel(newPostData);
                console.log(newUser);
                newUser.save();
               

            });
        });
    }
    else {
        console.log("VAO FALSE")
        notify1 = false;
    }

    return notify1;
}
