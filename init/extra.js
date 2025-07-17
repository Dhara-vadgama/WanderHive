const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const URL = "mongodb://127.0.0.1:27017/WanderHive";

async function main() {
  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Location to coordinates mapping
function getCoordinates(location) {
  switch (location) {
    case "Malibu": return [-118.788193, 34.031246];
    case "New York City": return [-74.0060, 40.7128];
    case "Aspen": return [-106.8245, 39.1911];
    case "Florence": return [11.2558, 43.7696];
    case "Portland": return [-122.6765, 45.5231];
    case "Cancun": return [-86.8515, 21.1619];
    case "Lake Tahoe": return [-120.0433, 39.0968];
    case "Los Angeles": return [-118.2437, 34.0522];
    case "Verbier": return [7.2260, 46.0966];
    case "Serengeti National Park": return [34.8333, -2.3333];
    case "Amsterdam": return [4.9041, 52.3676];
    case "Fiji": return [178.0650, -17.7134];
    case "Cotswolds": return [-1.8456, 51.7736];
    case "Boston": return [-71.0589, 42.3601];
    case "Bali": return [115.1889, -8.4095];
    case "Banff": return [-115.5708, 51.1784];
    case "Miami": return [-80.1918, 25.7617];
    case "Phuket": return [98.3794, 7.9519];
    case "Scottish Highlands": return [-4.2026, 57.5363];
    case "Dubai": return [55.2708, 25.2048];
    case "Montana": return [-110.3626, 46.8797];
    case "Mykonos": return [25.3289, 37.4467];
    case "Costa Rica": return [-84.0907, 9.9281];
    case "Charleston": return [-79.9311, 32.7765];
    case "Tokyo": return [139.6917, 35.6895];
    case "New Hampshire": return [-71.5724, 43.1939];
    case "Maldives": return [73.2207, 4.1755];
    default: return [0, 0]; // fallback if location not found
  }
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "686945cff818230cd4a6d509",
    geometry: {
      type: "Point",
      coordinates: getCoordinates(obj.location)
    }
  }));

  await Listing.insertMany(initdata.data);
  console.log("Data was initialized ✅");
};

initDB();
