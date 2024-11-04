const bookingCategorys = require('../models/bookingCategory');
const mongoose = require('mongoose')
exports.AddBookingCategory = async function(req,res) {
    try{
         var bookingCategory =  req.body.bookingCategory;
         var subCategory =  req.body.subCategory
         var gender = req.body.gender
          var result = await bookingCategorys.findOne({bookingCategory:bookingCategory, gender:gender})
          if(result){
            res.status(400).json({ message: 'bookingCategory already exist' });
          }
          else{
         var bookingCategory = new bookingCategorys({bookingCategory:bookingCategory,subCategory:subCategory,gender:gender});
         await bookingCategory.save()

         res.status(201).json({ message: 'bookingCategory created successfully' });
          }
    }
    catch(error){
        console.error('Error creating bookingCategory:', error);
        res.status(400).json({ message: 'Error creating bookingCategory', error });
    }

}

exports.DeleteBookingCategory = async function(req,res) {
    try{
        var bookingCategory =  req.body.bookingCategory;
        var ID =  req.body.ID;
          var result = await bookingCategorys.deleteOne({_id :  new mongoose.Types.ObjectId(ID),bookingCategory:bookingCategory})
          if(result.deletedCount === 0){
            res.status(400).json({ message: 'bookingCategory does not exist' });
          }
          else{
         res.status(201).json({ message: 'bookingCategory successfully deleted' });
          }
    }
    catch(error){
        console.error('Error deleting bookingCategory:', error);
        res.status(400).json({ message: 'Error deleting bookingCategory', error });
    }

}

exports.UpdateBookingCategory = async function(req,res) {
    try{
         var bookingCategory =  req.body.bookingCategory;
         var subCategory =  req.body.subCategory;
         var gender= req.body.gender;
         var ID =  req.body.ID;
          var result = await bookingCategorys.updateOne({_id :  new mongoose.Types.ObjectId(ID)},{$set:{bookingCategory:bookingCategory,subCategory:subCategory,gender:gender}})
          //console.log(result)
          if(result.modifiedCount == 0){
            res.status(400).json({ message: 'bookingCategory is not updated' });
          }
          else{
         res.status(201).json({ message: 'bookingCategory successfully updated' });
          }
    }
    catch(error){
        console.error('Error updating bookingCategory:', error);
        res.status(400).json({ message: 'Error updating bookingCategory', error });
    }

}

exports.GetBookingCategory = async function(req,res) {
    try{
     console.log( req.params)
        const {gender} = req.params
        if(gender == 'Men' || gender == 'Women'){
            var result = await bookingCategorys.find({gender:gender})
            if(!result){
                res.status(400).json({ message: 'No bookingCategory present' });
              }
              else{
             res.status(200).json({ message: result });
              }
        }
         else{   
          var result = await bookingCategorys.find({})
          //console.log(result)
          if(!result){
            res.status(400).json({ message: 'No bookingCategory present' });
          }
          else{
         res.status(200).json({ message: result });
          }
        }
    }
    catch(error){
        console.error('Error getting bookingCategory:', error);
        res.status(400).json({ message: 'Error getting bookingCategory', error });
    }

}


exports.AddSubBookingCategory = async function(req,res) {
    try{
         var ID =  req.body.ID
         var subCategory =  req.body.subCategory

          var result = await bookingCategorys.findOne({_id: new mongoose.Types.ObjectId(ID)})

        result.subCategory.push(subCategory)
        result.save()

         res.status(201).json({ message: 'subcategory added successfully' });
          
    }
    catch(error){
        console.error('Error adding subcategory:', error);
        res.status(400).json({ message: 'Error adding subcategory:', error });
    }

}

exports.UpdateSubBookingCategory = async function(req,res) {
    try{
         var ID =  req.body.ID
         var subCategory =  req.body.subCategory
         var price =req.body.price

         var result = await bookingCategorys.findOne({"subCategory._id": new mongoose.Types.ObjectId(ID)})

         if(result){
          await bookingCategorys.updateOne({"subCategory._id": new mongoose.Types.ObjectId(ID)},{$set:{"subCategory.$.name":subCategory,"subCategory.$.price":price }})

         res.status(201).json({ message: 'subcategory updated successfully' });
         }
         else{
            res.status(500).json({ message: 'subcategory not found' });
         }
          
    }
    catch(error){
        console.error('Error adding subcategory:', error);
        res.status(400).json({ message: 'Error adding subcategory:', error });
    }

}

exports.DeleteSubBookingCategory = async function(req,res) {
    try{
         var ID =  req.body.ID
        
         var result = await bookingCategorys.findOne({"subCategory._id": new mongoose.Types.ObjectId(ID)})

         if(result){
          await bookingCategorys.updateOne({"subCategory._id": new mongoose.Types.ObjectId(ID)},{$pull:{"subCategory":{_id:new mongoose.Types.ObjectId(ID)}}})

         res.status(201).json({ message: 'subcategory Delete successfully' });
         }
         else{
            res.status(500).json({ message: 'subcategory not found' });
         }
          
    }
    catch(error){
        console.error('Error Deleting subcategory:', error);
        res.status(400).json({ message: 'Error Deleting subcategory:', error });
    }

}