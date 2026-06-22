db.TravelOptions.insertMany([
  {
    transport_type: "Flight",
    provider: "AirAsia",
    route: { origin: "Kuala Lumpur", destination: "Singapore" },
    base_price: 150.00,
    amenities: ["Meal", "Baggage"],
    available_seats: 120,
    departure_date: ISODate("2026-02-01T10:00:00Z")
  },
  {
    transport_type: "Flight",
    provider: "Malaysia Airlines",
    route: { origin: "Kuala Lumpur", destination: "London" },
    base_price: 3200.00,
    amenities: ["WiFi", "Entertainment", "Full Meal"],
    available_seats: 45,
    departure_date: ISODate("2026-02-15T23:30:00Z")
  },
  {
    transport_type: "Train",
    provider: "KTM ETS",
    route: { origin: "KL Sentral", destination: "Ipoh" },
    base_price: 45.00,
    amenities: ["Bistro", "Power Socket"],
    available_seats: 80,
    departure_date: ISODate("2026-02-05T08:00:00Z")
  },
  {
    transport_type: "Train",
    provider: "KTM ETS",
    route: { origin: "KL Sentral", destination: "Padang Besar" },
    base_price: 102.00,
    amenities: ["Bistro", "Toilet", "Luggage Space"],
    available_seats: 12,
    departure_date: ISODate("2026-02-06T07:15:00Z")
  },
  {
    transport_type: "Car",
    provider: "Grab Rent",
    route: { origin: "Johor Bahru", destination: "Melaka" },
    base_price: 250.00,
    amenities: ["AC", "Bluetooth", "Insurance"],
    available_seats: 4,
    departure_date: ISODate("2026-02-10T09:00:00Z")
  },
  {
    transport_type: "Car",
    provider: "Socar",
    route: { origin: "Penang", destination: "Kuala Lumpur" },
    base_price: 180.00,
    amenities: ["AC", "GPS"],
    available_seats: 5,
    departure_date: ISODate("2026-02-12T14:00:00Z")
  },
  {
    transport_type: "Ferry",
    provider: "Langkawi Ferry Line",
    route: { origin: "Kuala Perlis", destination: "Langkawi" },
    base_price: 21.00,
    amenities: ["TV", "AC"],
    available_seats: 200,
    departure_date: ISODate("2026-02-20T11:30:00Z")
  },
  {
    transport_type: "Ferry",
    provider: "Batam Fast",
    route: { origin: "Johor Bahru", destination: "Batam" },
    base_price: 85.00,
    amenities: ["VIP Lounge", "Snacks"],
    available_seats: 50,
    departure_date: ISODate("2026-02-22T13:00:00Z")
  },
  {
    transport_type: "Flight",
    provider: "Singapore Airlines",
    route: { origin: "Singapore", destination: "Tokyo" },
    base_price: 1800.00,
    amenities: ["Premium Dining", "WiFi", "Sleep Kit"],
    available_seats: 25,
    departure_date: ISODate("2026-03-01T06:00:00Z")
  },
  {
    transport_type: "Train",
    provider: "ERL",
    route: { origin: "KL Sentral", destination: "KLIA" },
    base_price: 55.00,
    amenities: ["WiFi", "Speedy Boarding"],
    available_seats: 150,
    departure_date: ISODate("2026-01-20T05:00:00Z")
  }
]);
db.TravelOptions.insertOne({
  transport_type: "Ferry",
  provider: "Star Cruises",
  route: { origin: "Penang", destination: "Phuket" },
  base_price: 1200,
  amenities: ["Pool", "Buffet", "Cabin"],
  available_seats: 50,
  departure_date: ISODate("2026-03-10T09:00:00Z")
});
db.TravelOptions.findOne({ provider: "AirAsia" });
db.TravelOptions.find({ base_price: { $gt: 50, $lt: 500 }, transport_type: { $in: ["Train", "Car"] } });
db.TravelOptions.find({ $or: [ { "route.destination": "Langkawi" }, { "route.destination": "Singapore" } ] });
db.TravelOptions.find({ amenities: "WiFi" });
db.TravelOptions.find({}, { provider: 1, base_price: 1, _id: 0 });
db.TravelOptions.updateOne(
  { provider: "AirAsia", "route.destination": "Singapore" },
  { $set: { status: "Delayed" }, $inc: { available_seats: -1 } }
);
db.TravelOptions.updateMany(
  { transport_type: "Ferry" },
  { $push: { amenities: "Free Water" } }
);
db.TravelOptions.updateMany(
  { transport_type: "Car" },
  { $pull: { amenities: "GPS" } }
);
db.TravelOptions.deleteOne({ _id: ObjectId("69679ffc90b96fffea104ec3") });
db.TravelOptions.deleteMany({ available_seats: { $eq: 0 } });
db.TravelOptions.createIndex({ transport_type: 1 });
db.TravelOptions.createIndex({ "route.origin": 1, "route.destination": 1 });
db.TravelOptions.aggregate([
  { $group: { _id: "$transport_type", total_seats: { $sum: "$available_seats" } } }
]);
db.TravelOptions.aggregate([
  { $match: { transport_type: "Flight" } },
  { $sort: { base_price: 1 } },
  { $limit: 3 },
  { $project: { provider: 1, base_price: 1, _id: 0 } }
]);
db.TravelOptions.find().sort({ base_price: 1 });
db.TravelOptions.find().sort({ base_price: -1 });
