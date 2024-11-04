var User = require('../models/users')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRETEKEY);
const mongoose = require('mongoose')

exports.UpdateUser = async function(req,res) {
    try{
        var {_id,firstName,lastName,shopID,username,role,dateOfBirth,password,mobileNo} =  req.body; 
         const profilePicture = req.file ? req.file.path : null;
         var hashedpassword = cryptr.encrypt(password)
          var result = await User.updateOne({_id :  new mongoose.Types.ObjectId(_id)},
          {$set:{profile:profilePicture,
            firstName:firstName,
             lastName:lastName,
             username:username,
             role:role,
             ShopID:shopID,
             dateOfBirth: new Date(dateOfBirth),
             password:hashedpassword,
             mobileNo:mobileNo}})
          //console.log(result)
          if(result.modifiedCount == 0){
            res.status(400).json({ message: 'user info is not updated' });
          }
          else{
         res.status(201).json({ message: 'user successfully updated' });
          }
    }
    catch(error){
        console.error('Error updating user info:', error);
        res.status(400).json({ message: 'Error updating user info', error });
    }

}

