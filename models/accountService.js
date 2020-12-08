const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mv = require('mv');
const cloudinary = require('cloudinary').v2; 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const Account = require('../models/accoutModel');

exports.changeAvt = async (req, res, next) => {
    const form = formidable({ multiples: true });
    
    await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }
   
            const coverImg = files.customerAvt;
            console.log(coverImg.path);

            if (coverImg && coverImg.size > 0){
                const fileName = coverImg.path.split('\\').pop() + '.' + coverImg.name.split('.').pop();
                console.log(fileName);
                //fs.renameSync(coverImg.path, path.join(__dirname,'/../public/img/products/' + fileName));
                
                const filePath = path.join(__dirname, '/../public/images/customerAvts/upload/' + fileName);
                mv(coverImg.path, filePath, function(err) {
                    if (err) throw err;
                });

                //Upload cover image to server
                const publicID = 'customerAvts/' + coverImg.path.split('\\').pop();
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload(coverImg.path, { public_id: publicID}, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        console.log(result);
                        resolve();
                    });
                });

                const id= fields.customerID;    
                fields.customerAvt = cloudinary.url(publicID);
            
                await new Promise((resolve, reject) => {
                    Account.findOneAndUpdate({_id: id}, fields, {upsert: true}, (err, doc) => {
                        if (err) return res.send(500, {error: err});
                        return res.send('Succesfully saved.');
                    });
                    resolve();
                });

            }
          
            resolve();
        });
    });
}