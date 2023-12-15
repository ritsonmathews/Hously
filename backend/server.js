const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const expressValidator = require("express-validator");

//Import Routes
const authRoutes = require("./routes/auth");
//Database
const connectDB = require("./config/db");

//Admin Routes
const adminApplicationRoutes = require("./routes/admin/application");
const adminInternshipRoutes = require("./routes/admin/internships");
const adminUserRoutes = require("./routes/admin/user");
const adminDomainRoutes = require("./routes/admin/domain");
const admin=require("./routes/admin/admin")

//Seeker Routes
const seekerApplicationRoutes = require("./routes/seeker/application");
const seekerIntershipRoutes = require("./routes/seeker/internships");
const seekerUserRoutes = require("./routes/seeker/user");

// Provider Routes
const providerInternshipRoutes = require("./routes/provider/internships");
const providerApplicationRoutes = require("./routes/provider/application");
const providerUserRoutes = require("./routes/provider/user");

//app
const app = express();

// Database Connection
connectDB();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use(expressValidator());

// Route Middlewares
app.use("/api", authRoutes);
app.use("/api", adminApplicationRoutes);
app.use("/api", adminInternshipRoutes);
app.use("/api", adminUserRoutes);
app.use("/api", adminDomainRoutes);
app.use("/api", admin);
app.use("/api", seekerApplicationRoutes);
app.use("/api", seekerIntershipRoutes);
app.use("/api", seekerUserRoutes);
app.use("/api", providerInternshipRoutes);
app.use("/api", providerApplicationRoutes);
app.use("/api", providerUserRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
