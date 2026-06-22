db.Payment.insertOne({
    booking_id: ObjectId("696c7758d9f5104bf49bb829"), 
      payment_method: "Credit Card",
      transaction_details: {
        transaction_id: "T1",
        gateway: "iPay88",
        card_type: "Visa",
        last_4: "4242"
      },
      pay_amount: 250.00,
      currency: "MYR",
        promo_codes: ["WELCOME10", "HOLIDAY_SAVE20"],
      payment_date: new Date()
  });
  
  db.Payment.insertMany([
    {
      booking_id: ObjectId("696c7758d9f5104bf49bb82a"), 
      payment_method: "E-Wallet",
      transaction_details: {
        transaction_id: "T2",
        gateway: "GrabPay",
        reference: "GP-20260110"
      },
      pay_amount: 40.50,
      currency: "MYR",
      promo_codes: ["WELCOME10"],
      payment_date: ISODate("2026-01-10T15:00:00Z")
    },
    {
      booking_id: ObjectId("696c7758d9f5104bf49bb82b"), 
      payment_method: "Bank Transfer",
      transaction_details: {
        transaction_id: "T3",
        gateway: "FPX",
        bank_name: "Maybank2u"
      },
      pay_amount: 230.00,
      currency: "MYR",
      promo_codes: ["HOLIDAY_SAVE20"],
      payment_date: ISODate("2026-01-12T09:30:00Z")
    },
    {
      booking_id: ObjectId("696c7758d9f5104bf49bb82a"), 
      payment_method: "Debit Card",
      transaction_details: {
        transaction_id: "T4",
        gateway: "SamsungPay",
        card_type: "MasterCard"
      },
      pay_amount: 550,
      currency: "MYR",
      payment_date: ISODate("2026-01-10T15:00:00Z")
    },
    {
      booking_id: ObjectId("696c7758d9f5104bf49bb82b"), 
      payment_method: "Bank Transfer",
      transaction_details: {
        transaction_id: "T5",
        gateway: "FPX",
        bank_name: "Maybank2u"
      },
      pay_amount: 1500.00,
      currency: "MYR",
      payment_date: ISODate("2026-01-12T09:30:00Z")
    },
    {
      booking_id: ObjectId("696c7758d9f5104bf49bb82a"), 
      payment_method: "E-Wallet",
      transaction_details: {
        transaction_id: "T6",
        gateway: "TouchnGo Wallet",
        reference: "TNG-551887"
      },
      pay_amount: 40.00,
      currency: "MYR",
      payment_date: ISODate("2026-01-10T15:00:00Z")
    }
  ]);
  
  
  //findOne
  db.Payment.findOne({ "transaction_details.gateway" : "iPay88"});
  
  //find, condition, 
  db.Payment.find({ 
    currency : "MYR", 
    pay_amount: { $gt: 100 } 
  });
  db.Payment.find({ pay_amount: { $lt: 50 } });
  db.Payment.find({ "transaction_details.gateway": { $eq: "FPX" } });
  db.Payment.find({ 
    payment_method: { $in: ["E-Wallet", "Bank Transfer"] } 
  });
  db.Payment.find({ $and: [
      { payment_method: "Credit Card" },
      { pay_amount: { $gt: 200 } }
    ]
  });
  db.Payment.find({ $or: [
      { pay_amount: { $lt: 50 } },
      { promo_codes: "HOLIDAY_SAVE20" }
    ]
  });
  
  //array query
  db.Payment.find({ 
    promo_codes: { $all: ["WELCOME10", "HOLIDAY_SAVE20"] } 
  });
  
  //filter find
  db.Payment.find(
    {},             
    { booking_id: 1, pay_amount: 1, promo_codes: 1, _id: 0 }
  );
  
  
  //updateOne
  db.Payment.updateOne(
    { "transaction_details.transaction_id": "T1" },
    { $set: { "transaction_details.receipt_no": "R-001" } }
  );
  
  //updateMany 
  db.Payment.updateMany(
    { 
      "transaction_details.card_type": "Visa",
      "promo_codes": "HOLIDAY_SAVE20"          
    },
    { 
      $set: { "promo_codes.$": "HOLIDAYVISA20" }
    }
  );
  
  
  //delete
  db.Payment.deleteOne({ "transaction_details.gateway": "TouchnGo Wallet"})
  db.Payment.deleteMany({ 
    pay_amount: { $gt: 500 } 
  });
  
  
  //indexing
  db.Payment.createIndex({ payment_method: 1 });
  db.Payment.createIndex({ "transaction_details.gateway": 1, pay_amount: -1 });
  
  
  //aggregate
  db.Payment.aggregate([{
      $group: {
        _id: "$payment_method",           
        total_revenue: { $sum: "$pay_amount" }, 
        count: { $sum: 1 }                
      }
    },
    { $sort: { total_revenue: -1 } }
  ]);
  db.Payment.aggregate([
    { 
      $match: { "transaction_details.card_type": "Visa" } //filter only visa
    },
    { 
      $sort: { pay_amount: -1 } //sort by amount(descending)
    },
    { 
      $limit: 3 //take only the top 3
    },
    { 
      $project: { //select only relevant fields to show
        _id: 0,
        transaction_id: "$transaction_details.transaction_id",
        amount: "$pay_amount",
        date: "$payment_date"
      } 
    }
  ]);
  
  
  //sort
  db.Payment.find().sort({ pay_amount: 1 });
  db.Payment.find().sort({ payment_date: -1 });
  