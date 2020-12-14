const userModel = require('../models/userModel');
const userService = require('../models/userService');
const allmobilesModel = require('../models/allmobilesModel');



exports.addUserToDatabase = async (req, res, next) =>{
    console.log("USER CONTROLLER")
    

    //notify1 = await userService.addNewUser(req, res, next);
    //res.redirect("/")
    let notify1 = await userService.addNewUser(req, res, next);
    
    console.log('notify');
    console.log(notify1);
  

    
    const product = await allmobilesModel.find();
    res.render('electronic/index', {product, notify1});
}

// exports.alert1 = async (req, res, next) =>{
//     console.log("VAO USERSS");
 
     
//     const product = await allmobilesModel.find();
//     //console.log(product);
   

//     res.render('electronic/index', {product, notify: true});
//  }