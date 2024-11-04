 const shop = require('../models/shops') 
 const mongoose = require('mongoose')


exports.registerShop = async function(req,res) {
    try{

       // console.log(req.body)
       // console.log(req.file)
         var {shopName,shopID,mobileNo,noSeats,Address,pincode,noWorkers} =  req.body; 
         const profilePicture = req.file ? req.file.path : null;

          
         var shopInstance= new shop({
                            profile:profilePicture,
                            shopName:shopName,
                            ShopID:shopID,
                            Address:Address,
                            mobileNo:mobileNo,
                            pincode:pincode,
                            noSeats:noSeats,
                            noWorkers:noWorkers
                            });
         await shopInstance.save()

         res.status(201).json({ message: 'shop created successfully' });
    }
    catch(error){
        console.error('Error creating shop:', error);
        res.status(400).json({ message: 'Error creating shop', error });
    }

}

exports.GetShop = async function(req,res) {
    try{
          var result = await shop.find({})
          //console.log(result)
          if(!result){
            res.status(400).json({ message: 'No shop present' });
          }
          else{
         res.status(200).json({ message: result });
          }
    }
    catch(error){
        console.error('Error updating role:', error);
        res.status(400).json({ message: 'Error updating role', error });
    }

}

exports.UpdateShop = async function(req,res) {
    try{
        var {ID,shopName,mobileNo,noSeats,Address,pincode} =  req.body; 
          var result = await shop.updateOne({_id :  new mongoose.Types.ObjectId(ID)},
          {$set:{shopName:shopName,
            mobileNo: mobileNo,
            Address:Address,
            pincode:pincode,
            noSeats: noSeats
          }})
          //console.log(result)
          if(result.modifiedCount == 0){
            res.status(400).json({ message: 'shop info is not updated' });
          }
          else{
         res.status(200).json({ message: 'shop info  successfully updated' });
          }
    }
    catch(error){
        console.error('Error updating shop info :', error);
        res.status(400).json({ message: 'Error updating shop info ', error });
    }

}