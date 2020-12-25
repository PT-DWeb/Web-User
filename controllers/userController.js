//const userModel = require('../models/mongoose/userModel');
const userService = require('../models/service/userService');
const allmobilesModel = require('../models/mongoose/productModel');


exports.displayFormRegister = (req, res, next) =>{

    res.render("account/userRegister", {register : false});
}


exports.displayFormLogin = (req, res, next) =>{

    res.render("account/userLogin");
}

exports.addUserToDatabase = async (req, res, next) =>{
    console.log("USER CONTROLLER")
    

    //notify1 = await userService.addNewUser(req, res, next);
    //res.redirect("/")
    let notify1 = await userService.addNewUser(req, res, next);
    
    console.log('notify');
    console.log(notify1);
  

    
    const product = await allmobilesModel.find();
    if(notify1 == false)
    {
        res.render('home/index', {product, notify2: true});
    }

    res.render('home/index', {product, notify1: true});
}

// exports.alert1 = async (req, res, next) =>{
//     console.log("VAO USERSS");
 
     
//     const product = await allmobilesModel.find();
//     //console.log(product);
   

//     res.render('home/index', {product, notify: true});
//  }