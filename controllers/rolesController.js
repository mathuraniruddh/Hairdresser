const Roles = require('../models/roles');
const client = require('../middleware/redis').client
const mongoose = require('mongoose')
exports.AddRoles = async function(req,res) {
    try{
         var roleName =  req.body.roleName;
          var result = await Roles.findOne({name:roleName})
          if(result){
            res.status(400).json({ message: 'role already exist' });
          }
          else{
         var role = new Roles({name:roleName});
         await role.save()

         res.status(201).json({ message: 'role created successfully' });
          }
    }
    catch(error){
        console.error('Error creating role:', error);
        res.status(400).json({ message: 'Error creating role', error });
    }

}

exports.DeleteRole = async function(req,res) {
    try{
         var roleName =  req.body.roleName;
         var ID =  req.body.ID;
          var result = await Roles.deleteOne({_id :  new mongoose.Types.ObjectId(ID),name:roleName})
          if(result.deletedCount === 0){
            res.status(400).json({ message: 'role does not exist' });
          }
          else{
         res.status(201).json({ message: 'role successfully deleted' });
          }
    }
    catch(error){
        console.error('Error deleting role:', error);
        res.status(400).json({ message: 'Error deleting role', error });
    }

}

exports.UpdateRole = async function(req,res) {
    try{
         var roleName =  req.body.roleName;
         var ID =  req.body.ID;
          var result = await Roles.updateOne({_id :  new mongoose.Types.ObjectId(ID)},{$set:{name:roleName}})
          //console.log(result)
          if(result.modifiedCount == 0){
            res.status(400).json({ message: 'role is not updated' });
          }
          else{
         res.status(201).json({ message: 'role successfully updated' });
          }
    }
    catch(error){
        console.error('Error updating role:', error);
        res.status(400).json({ message: 'Error updating role', error });
    }

}


exports.GetRoles = async function(req, res) {
  try {
    const cacheKey = req.originalUrl; // Define cacheKey here
    console.log("here are the roles", cacheKey)
    // Check if the data is in the cache first
    const cachedData = await client.get(cacheKey);
    
    if (cachedData) {
      console.log('Cache hit');
      return res.status(200).json(JSON.parse(cachedData)); // Return cached data
    }

    // Fetch roles from the database
    const result = await Roles.find({});
     console.log("here are the roles", result)
    if (!result || result.length === 0) { // Check if no roles found
      return res.status(400).json({ message: 'No roles present' });
    } else {
      console.log("Fetched roles from database:", result);
      
      // Set the result in the cache with an expiration time
      await client.set(cacheKey, JSON.stringify(result), {
        EX: 60, // Expiration time in seconds
      });
      
      console.log("The result has been set in the Redis server");
      return res.status(200).json({ message: result });
    }
  } catch (error) {
    console.error('Error in getting roles:', error);
    return res.status(500).json({ message: 'Error in getting roles', error });
  }
};