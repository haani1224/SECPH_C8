db.Booking.insertOne({
    user_id: ObjectId("696b8ff9a6bab70f5774302e"),
    travel_id: ObjectId("696b8da1a6bab70f57743023"), // Replace with actual AirAsia _id
    passengers: [
      { name: "Ahmad Zaki", age: 30, passport: "A1234567" },
      { name: "Siti Aminah", age: 28, passport: "B7654321" }
    ],
    booking_date: new Date(),
    status: "Confirmed",
    total_amount: 300.00
  });
  
  db.Booking.insertMany([
    {
      user_id: ObjectId("696b9049a6bab70f5774302f"), 
      travel_id: ObjectId("696b8da1a6bab70f57743025"), 
      passengers: [
        { name: "Siti Sarah", age: 25, id_no: "990101-01-5000" }
      ],
      booking_date: ISODate("2026-01-10T14:30:00Z"),
      status: "Pending",
      total_amount: 45.00
    },
    {
      user_id: ObjectId("65a1122334455aabbccddeef"),
      travel_id: ObjectId("696b8da1a6bab70f57743027"), 
      passengers: [
        { name: "Siti Sarah", age: 25, id_no: "990101-01-5000" },
        { name: "Ali Bakar", age: 26, id_no: "980505-01-6000" }
      ],
      booking_date: ISODate("2026-01-12T09:15:00Z"),
      status: "Confirmed",
      total_amount: 250.00
    }
  ]);
  
  db.Booking.find({ status: "Confirmed" });
  db.Bookings.find(
    { total_amount: { $gt: 200 } },
    { user_id: 1, total_amount: 1, _id: 0 }
  );
  
  db.Booking.updateOne(
    { status: "Pending" },
    { $set: { status: "Confirmed" } }
  );
  
  db.Booking.deleteMany({ status: "Cancelled" });
  db.Booking.createIndex({ status: 1 });
  db.Booking.createIndex({ user_id: 1, booking_date: -1 });
  db.Booking.aggregate([
    { $match: { total_amount: { $gt: 0 } } },
    { 
      $group: { 
        _id: "$status", 
        total_revenue: { $sum: "$total_amount" }, 
        booking_count: { $sum: 1 } 
      } 
    },
    { $sort: { total_revenue: -1 } }
  ]);