db.Users.insertOne({
    full_name: "Ahmad Zaki",
    email: "zaki.ahmad@email.com",
    phone: "60123456789",
    preferences: { currency: "MYR", seat_type: "Window" }, // Embedded Document 
    created_at: new Date()
  });
  db.Users.insertMany([
    {
      full_name: "Siti Sarah",
      email: "siti.s@email.com",
      phone: "60112233445",
      preferences: { currency: "MYR", seat_type: "Aisle" },
      created_at: new Date()
    },
    {
      full_name: "John Doe",
      email: "john.d@global.com",
      phone: "60198765432",
      preferences: { currency: "USD", seat_type: "Window" },
      created_at: new Date()
    },
    {
      full_name: "Lim Wei",
      email: "lim.wei@email.com",
      phone: "60177889900",
      preferences: { currency: "MYR", seat_type: "Extra Legroom" },
      created_at: new Date()
    }
  ]);
  db.Users.findOne({ email: "zaki.ahmad@email.com" });
  db.Users.find({ 
    $or: [ 
      { "preferences.seat_type": "Window" }, 
      { "preferences.seat_type": "Extra Legroom" } 
    ] 
  });
  db.Users.find({
    $and: [
      { full_name: { $eq: "Ahmad Zaki" } },
      { "preferences.currency": { $eq: "MYR" } }
    ]
  });
  db.Users.updateOne(
    { email: "john.d@global.com" },
    { $set: { phone: "60100000000" } }
  );
  db.Users.updateOne(
    { email: "zaki.ahmad@email.com" },
    { $set: { "preferences.currency": "USD" } }
  );
  db.Users.updateMany(
    { "preferences.currency": "MYR" },
    { $set: { "preferences.last_updated": new Date() } }
  );
  db.Users.deleteOne({ email: "john.d@global.com" });
  db.Users.deleteMany({ 
    "preferences.currency": { $eq: "USD" } 
  });