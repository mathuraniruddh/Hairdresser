const mongoose = require('mongoose')
const booking = require('../models/booking')
const client =  require('../middleware/redis').client
const users  = require('../models/users')
const moment =  require('moment')


exports.createBooking = async function(req,res){
    try{
      const now = moment(); 
    var{customerID,customerName,barberName,barberID,shopID,shopName,subCategory,bookingCategory,bookingDate,bookingStartTime,price,paymmentType }=  req.body
    const delimiters = /[ :]+/;
     var timearr = bookingStartTime.split(delimiters)
                var BookingInstance= new booking({
                customerID:new mongoose.Types.ObjectId(customerID),
                customerName:customerName,
                barberName:barberName,
                barberID:new mongoose.Types.ObjectId(barberID),
                shopName:shopName,
                shopID:shopID,
                bookingCategory:bookingCategory,
                subCategory:subCategory,
                bookingDate: moment.utc(bookingDate),
                bookingStartTime:bookingStartTime,
                timeOfDay: timearr[2],
                price:price,
                paid:false,
                bookingEndTime:"",
                bookingStatus:"Open",
                paymmentType:paymmentType
                });
                await BookingInstance.save()
                res.status(201).json({ message: 'successfully booked the slot' });

} 
catch(error){
    console.error('Error in booking:', error);
    res.status(400).json({ message: 'Error in booking', error });
}
}

exports.getAvailableHairdresser = async function(req,res){
 try{
    const{shopID,bookingStartTime,bookingDate} = req.body;
    var datecheck = moment.utc(bookingDate).toDate();
    console.log(datecheck);
   var result = await users.aggregate([{$match:{ShopID:shopID}},
    {$lookup:{
    from: 'bookings',             // The collection to join
    localField: '_id',      // The field from the orders collection
    foreignField: 'barberID',          // The field from the products collection
    as: 'bookingDetail'          // The name of the new array field to add
}},
 { $unwind: { path: "$bookingDetail", preserveNullAndEmptyArrays: true } },
 {$match: {
   $or:[
     {$and:[ {"bookingDetail.bookingDate":datecheck
                                      },
        {"bookingDetail.bookingStartTime":{$ne:bookingStartTime}},
           ]},
           {$and:[ {"bookingDetail.bookingDate":datecheck
           },
        {"bookingDetail.bookingStartTime":bookingStartTime},
        {"bookingDetail.bookingStatus":"Cancelled"},
        ]},      
     {bookingDetail: { $exists: false }}
   ]
    }
},
{$project:{"firstName":1,"lastName":1,_id:1}}
])
    // console.log(result)
  if(result.length > 0){
    res.status(200).json({ message:result });
  }
  else{
    res.status(200).json({ message:"No Hairdresser Available" });
  }
 }
 catch(error){
    console.error('Error in booking:', error);
    res.status(400).json({ message: 'Error in booking', error });
}
        
}


exports.getBookingsOfHairdresser = async function(req,res){
    try{
       const{barberID,bookingDate} = req.body;
       var datecheck = moment.utc(bookingDate).toDate();
       console.log(datecheck);
      var result = await booking.find({"barberID": new mongoose.Types.ObjectId(barberID),"bookingDate":datecheck})
       console.log(result)
     if(result.length > 0){
       res.status(200).json({ message:result });
     }
     else{
       res.status(200).json({ message: "No Booking Available" });
     }
    }
    catch(error){
       console.error('Error in booking:', error);
       res.status(400).json({ message: 'Error in booking', error });
   }
           
   }

   exports.getBookingsOfCustomer = async function(req,res){
    try{
       const{customerID} = req.body;
       const cacheKey = req.originalUrl;

       const cachedData = await client.get(cacheKey);
    
       if (cachedData) {
         console.log('Cache hit');
         return res.status(200).json(JSON.parse(cachedData)); // Return cached data
       }

      var result = await booking.find({"customerID": new mongoose.Types.ObjectId(customerID)})
       console.log(result)
     if(result.length > 0){
      await client.set(cacheKey, JSON.stringify(result), {
        EX: 60, // Expiration time in seconds
      });           
       res.status(200).json({ message:result });
     }
     else{
       res.status(200).json({ message: "No Booking Available" });
     }
    }
    catch(error){
       console.error('Error in booking:', error);
       res.status(400).json({ message: 'Error in booking', error });
   }
           
   }


   exports.cancelBooking= async function(req,res){
    try{
       const{bookingID} = req.body;
      var result = await booking.updateOne({"bookingID": bookingID},{$set:{bookingStatus:"Cancelled"}})
     if(result){
       res.status(200).json({ message:"Booking Cancelled , your 10% charges will be deducted" });
     }
     else{
       res.status(200).json({ message: "No Booking Available" });
     }
    }
    catch(error){
       console.error('Error in booking:', error);
       res.status(400).json({ message: 'Error in booking', error });
   }
           
   }

   exports.bookingCompleted = async function(req,res){
    try{
      const now = moment();
      const{bookingID} = req.body;
      const endtime = now.format('hh:mm A')
      console.log("booking end time",endtime)
      var result = await booking.findOne({"bookingID": bookingID})
     if(result.bookingStatus != "Cancelled" || result.bookingStatus != "Closed"){ 
      await booking.updateOne({"bookingID": bookingID},{$set:{bookingStatus:"Closed","bookingEndTime":endtime}})
       res.status(200).json({ message:"Thanks for doing your duty" });
     }
     else{
       res.status(200).json({ message: "Your booking is either closed or cancelled" });
     }
    }
    catch(error){
       console.error('Error in bookingCompleted:', error);
       res.status(400).json({ message: 'Error in bookingCompleted', error });
   }
           
   }

   exports.getUpcomingBookings = async function(req,res){
    try{
      const{barberID} = req.body;
      var result = await booking.aggregate([{$match:{barberID:new mongoose.Types.ObjectId(barberID),bookingStatus:"Open"}},
         {$sort:{"bookingDate":1,"timeOfDay":1,"bookingStartTime":1}}])

     if(result){ 
       res.status(200).json({ message:result });
     }
     else{
       res.status(200).json({ message: "No upcoming booking present for you" });
     }
    }
    catch(error){
       console.error('Error in gettingbooking:', error);
       res.status(400).json({ message: 'Error in gettingbooking:', error });
   }
           
   }

   