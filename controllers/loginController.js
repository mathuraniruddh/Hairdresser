var User = require('../models/users')
var shop = require('../models/shops')
var mongoose = require('mongoose');
const moment =  require('moment')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRETEKEY);
const upload = require('../middleware/upload')
const jwt  = require('jsonwebtoken')


exports.registerUser = async function(req,res) {
    try{

       // console.log(req.body)
        console.log(req.file)
         var {firstName,lastName,shopID,username,role,dateOfBirth,password,mobileNo} =  req.body; 
         const profilePicture = req.file ? req.file.path : null;
         var hashedpassword = cryptr.encrypt(password)
          
         var UserInstance= new User({
                            profile:profilePicture,
                           firstName:firstName,
                            lastName:lastName,
                            username:username,
                            role:role,
                            ShopID:shopID,
                            dateOfBirth: moment.utc(dateOfBirth),
                            password:hashedpassword,
                            mobileNo:mobileNo
                            });
         await UserInstance.save()

         if(req.body.role == 'Barber'){
            console.log(req.body.shopID)
            var shopresult = await shop.findOne({
                ShopID: req.body.shopID})
             console.log(shopresult)
               var increasecount =  shopresult.noWorkers+1
             
              await shop.updateOne({ShopID:req.body.shopID},{$set:{noWorkers:increasecount}} )

         }

         res.status(201).json({ message: 'user created successfully' });
    }
    catch(error){
        console.error('Error creating user:', error);
        res.status(400).json({ message: 'Error creating user', error });
    }

}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const decrypted = await cryptr.decrypt(user.password);
       //console.log("pass",decrypted)
        if (password != decrypted) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , { expiresIn: '1h' });
        
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


