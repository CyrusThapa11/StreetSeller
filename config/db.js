const mongoose = require("mongoose");

mongoose
  .connect(process.env.mongo_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => {
    console.log(err);
    console.log("err.reason.servers", err.reason.servers);
  });
