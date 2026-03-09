require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const app = express();

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// Check Mongo URL
if (!uri) {
  console.error("MONGO_URL not found in .env file");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

/* ===========================
   MongoDB Connection
=========================== */

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Reconnecting...");
  connectDB();
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

/* ===========================
   Holdings API
=========================== */

app.get("/allHoldings", async (req, res) => {
  try {
    const { userId } = req.query;
    
    // If no userId, return empty array (user must be logged in)
    if (!userId) {
      return res.json([]);
    }
    
    const query = { userId };
    const allHoldings = await HoldingsModel.find(query);
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching holdings" });
  }
});

/* ===========================
   Positions API
=========================== */

app.get("/allPositions", async (req, res) => {
  try {
    const { userId } = req.query;
    
    // If no userId, return empty array (user must be logged in)
    if (!userId) {
      return res.json([]);
    }
    
    const query = { userId };
    const allPositions = await PositionsModel.find(query);
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching positions" });
  }
});

/* ===========================
   Orders API
=========================== */

app.get("/allOrders", async (req, res) => {
  try {
    const { userId } = req.query;
    
    // If no userId, return empty array (user must be logged in)
    if (!userId) {
      return res.json([]);
    }
    
    const query = { userId };
    const allOrders = await OrdersModel.find(query);
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { userId, name, qty, price, mode } = req.body;
    
    // Create the order
    const newOrder = new OrdersModel({
      userId: userId || "",
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();

    // Update holdings based on order type
    if (userId) {
      if (mode === "BUY") {
        // Check if user already has this stock
        const existingHolding = await HoldingsModel.findOne({ userId, name });
        
        if (existingHolding) {
          // Update existing holding - calculate new average price
          const totalQty = existingHolding.qty + qty;
          const totalValue = (existingHolding.avg * existingHolding.qty) + (price * qty);
          const newAvg = totalValue / totalQty;
          
          await HoldingsModel.updateOne(
            { userId, name },
            { 
              qty: totalQty,
              avg: newAvg,
              price: price,
              day: "0%",
              net: "+0%"
            }
          );
        } else {
          // Create new holding
          const newHolding = new HoldingsModel({
            userId,
            name,
            qty,
            avg: price,
            price: price,
            day: "0%",
            net: "+0%",
            isLoss: false
          });
          await newHolding.save();
        }
      } else if (mode === "SELL") {
        // Reduce quantity in holdings
        const existingHolding = await HoldingsModel.findOne({ userId, name });
        
        if (existingHolding) {
          const newQty = existingHolding.qty - qty;
          
          if (newQty <= 0) {
            // Remove holding if all shares sold
            await HoldingsModel.deleteOne({ userId, name });
          } else {
            // Update quantity
            await HoldingsModel.updateOne(
              { userId, name },
              { qty: newQty }
            );
          }
        }
      }
    }

    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Error saving order" });
  }
});

/* ===========================
   Seed Sample Holdings API
=========================== */

app.post("/seedHoldings", async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if user already has holdings
    const existingHoldings = await HoldingsModel.find({ userId });
    if (existingHoldings.length > 0) {
      return res.status(200).json({ 
        message: "User already has holdings", 
        holdings: existingHoldings 
      });
    }

    // Sample holdings to seed
    const sampleHoldings = [
      { userId, name: "BHARTIARTL", qty: 2, avg: 500.00, price: 600.00, day: "+2.99%", net: "+20.00%", isLoss: false },
      { userId, name: "HDFCBANK", qty: 2, avg: 1400.00, price: 1522.35, day: "+0.11%", net: "+8.75%", isLoss: false },
      { userId, name: "HINDUNILVR", qty: 1, avg: 2500.00, price: 2417.40, day: "+0.21%", net: "-3.31%", isLoss: true },
      { userId, name: "INFY", qty: 1, avg: 1600.00, price: 1555.45, day: "-1.60%", net: "-2.78%", isLoss: true },
      { userId, name: "ITC", qty: 5, avg: 250.00, price: 207.90, day: "+0.80%", net: "-16.84%", isLoss: true },
      { userId, name: "KPITTECH", qty: 5, avg: 200.00, price: 266.45, day: "+3.54%", net: "+33.22%", isLoss: false },
      { userId, name: "RELIANCE", qty: 1, avg: 2500.00, price: 2112.40, day: "+1.44%", net: "-14.52%", isLoss: true },
      { userId, name: "SBIN", qty: 4, avg: 500.00, price: 430.20, day: "-0.34%", net: "-42.32%", isLoss: true },
      { userId, name: "TCS", qty: 1, avg: 2800.00, price: 3194.80, day: "-0.25%", net: "+14.09%", isLoss: false },
      { userId, name: "WIPRO", qty: 4, avg: 600.00, price: 577.75, day: "+0.32%", net: "-88.10%", isLoss: true },
    ];

    // Insert sample holdings
    await HoldingsModel.insertMany(sampleHoldings);

    // Also create some sample orders
    const sampleOrders = [
      { userId, name: "INFY", qty: 1, price: 1550, mode: "BUY", date: new Date() },
      { userId, name: "TCS", qty: 2, price: 3200, mode: "BUY", date: new Date() },
      { userId, name: "RELIANCE", qty: 5, price: 2100, mode: "SELL", date: new Date() },
    ];

    await OrdersModel.insertMany(sampleOrders);

    // Also create sample positions
    const samplePositions = [
      { userId, name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, product: "CNC" },
      { userId, name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, product: "CNC" },
    ];

    await PositionsModel.insertMany(samplePositions);

    res.status(201).json({ 
      message: "Sample holdings seeded successfully",
      holdings: sampleHoldings 
    });
  } catch (error) {
    console.error("Error seeding holdings:", error);
    res.status(500).json({ message: "Error seeding holdings" });
  }
});

/* ===========================
   Signup API
=========================== */

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const newUser = new UserModel({
      email: email.toLowerCase(),
      password: password,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Server error during signup",
    });
  }
});

/* ===========================
   Login API
=========================== */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      email: user.email,
      name: user.name || user.email.split('@')[0], // Return user's name or derive from email
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
});

/* ===========================
   Server Start
=========================== */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});