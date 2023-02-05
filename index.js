const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 6000;
const app = express();
// const { errorHandler, notFound } = require("./config/errorMware");
const { errorHandler, notFound } = require("./middlewares/notFound");

require("./config/db");

// middlewares :
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// const { chats } = require("./dummydata/data");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const authRoutes = require("./routes/index");
const dataRoutes = require("./data/index");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/category");
const subcategoryRoutes = require("./routes/subcategory");

app.get("/", (req, res) => {
  res.send("Running api");
});

// app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/adddata", dataRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);

// app.use("/api/config/paypal", (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID);
// });

// ERROR HANDLERS :
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
