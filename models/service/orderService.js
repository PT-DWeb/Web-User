const orderModel=require('../mongoose/orderModel');

exports.addOrder = async(object)=>{
    const order =new orderModel(object);
    order.save();

    return order._id;
}

exports.updateOrder = async(newObject)=>{
    await orderModel.findOneAndUpdate(newObject);
}