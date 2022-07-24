const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongoose").Types;
const productdata = [
  {
    // _id: 1,
    name: "Spices",
    images: [
      "https://res.cloudinary.com/vinsmokecyrus/image/upload/v1609701870/samples/food/pot-mussels.jpg",
    ],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque maxime perferendis voluptatem odio velit magni ipsa sapiente modi corrupti repellat, dolorem ",
    price: 10,
    quantity: 10,
    rating: 4,
    seller: new ObjectId("62dba2b4e3d51e7a733029ea"),
    numReviews: 2,
  },
  {
    // _id: 2,
    name: "Shakes",
    images: [
      "https://res.cloudinary.com/vinsmokecyrus/image/upload/v1658429454/ecom/px-mangoJ4_iq3xvk.png",
    ],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque maxime perferendis voluptatem odio velit magni ipsa sapiente modi corrupti repellat, dolorem ",
    price: 150,
    quantity: 20,
    rating: 3,
    seller: new ObjectId("62dba2b4e3d51e7a733029ea"),
    numReviews: 4,
  },
  {
    // _id: 3,
    name: "Onion",
    images: [
      "https://res.cloudinary.com/vinsmokecyrus/image/upload/v1658429466/ecom/px-onion3_itimw3.png",
    ],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque maxime perferendis voluptatem odio velit magni ipsa sapiente modi corrupti repellat, dolorem ",
    price: 40,
    quantity: 30,
    rating: 4,
    seller: new ObjectId("62dba2b4e3d51e7a733029ea"),
    numReviews: 0,
  },
  {
    // _id: 4,
    name: "Apples",
    images: [
      "https://res.cloudinary.com/vinsmokecyrus/image/upload/v1658429476/ecom/apple1_xehzmh.png",
    ],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque maxime perferendis voluptatem odio velit magni ipsa sapiente modi corrupti repellat, dolorem ",
    price: 120,
    quantity: 20,
    rating: 4,
    seller: new ObjectId("62dba2b4e3d51e7a733029eb"),
    numReviews: 1,
  },
  {
    // _id: 5,
    name: "Bananas",
    images: [
      "https://res.cloudinary.com/vinsmokecyrus/image/upload/v1658429480/ecom/bananas_xns7ed.png",
    ],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque maxime perferendis voluptatem odio velit magni ipsa sapiente modi corrupti repellat, dolorem ",
    price: 70,
    quantity: 14,
    rating: 4,
    seller: new ObjectId("62dba2b4e3d51e7a733029e9"),
    numReviews: 2,
  },
  {
    // _id: 6,
    name: "Bread",
    images: [
      "https://res.cloudinary.com/vinsmokecyrus/image/upload/v1658429494/ecom/px-bread3_ubfjcn.png",
    ],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque maxime perferendis voluptatem odio velit magni ipsa sapiente modi corrupti repellat, dolorem ",
    price: 30,
    quantity: 20,
    rating: 3,
    seller: new ObjectId("62dba2b4e3d51e7a733029e9"),
    numReviews: 4,
  },
  {
    // _id: 7,
    name: "Capsicum",
    images: [
      "https://res.cloudinary.com/vinsmokecyrus/image/upload/v1658429507/ecom/px-capsicum4_nsr03j.png",
    ],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque maxime perferendis voluptatem odio velit magni ipsa sapiente modi corrupti repellat, dolorem ",
    price: 10,
    quantity: 10,
    rating: 4,
    seller: new ObjectId("62dba2b4e3d51e7a733029e9"),
    numReviews: 1,
  },
  {
    // _id: 8,
    name: "Carrots",
    images: [
      "https://res.cloudinary.com/vinsmokecyrus/image/upload/v1658429511/ecom/px-carrot3_rqupyi.png",
    ],
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor neque maxime perferendis voluptatem odio velit magni ipsa sapiente modi corrupti repellat, dolorem ",
    price: 50,
    quantity: 4,
    rating: 3,
    seller: new ObjectId("62dba2b4e3d51e7a733029e8"),
    numReviews: 4,
  },
];

const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin123", 10),
    isSeller: false,
    locality: "Dehradun",
    isAdmin: true,
  },
  {
    name: "user1",
    email: "user1@gmail.com",
    password: bcrypt.hashSync("user1123", 10),
    isSeller: false,
    locality: "Noida",
    isAdmin: false,
  },
  {
    name: "user2",
    email: "user2@gmail.com",
    password: bcrypt.hashSync("user2123", 10),
    isSeller: false,
    locality: "Chandigarh",
    isAdmin: false,
  },
  {
    name: "user3",
    email: "user3@gmail.com",
    password: bcrypt.hashSync("user3123", 10),
    isSeller: false,
    locality: "Pune",
    isAdmin: false,
  },
  {
    name: "user4",
    email: "user4@gmail.com",
    password: bcrypt.hashSync("user4123", 10),
    isSeller: false,
    locality: "Haryana",
    isAdmin: false,
  },
];
const sellers = [
  {
    name: "seller1",

    email: "seller1@gmail.com",
    password: bcrypt.hashSync("seller1123", 10),
    isSeller: true,
    locality: "Noida 62",
    location: "Uttar Pradesh",
    isAdmin: false,
  },
  {
    name: "seller2",
    email: "seller2@gmail.com",

    password: bcrypt.hashSync("seller2123", 10),
    isSeller: true,
    locality: "chandigarh",
    location: "Pubjab",
    isAdmin: false,
  },
  {
    name: "seller3",
    email: "seller3@gmail.com",
    password: bcrypt.hashSync("seller3123", 10),

    isSeller: true,
    locality: "Pune",
    location: "Mumbai",
    isAdmin: false,
  },
  {
    name: "seller4",
    email: "seller4@gmail.com",
    password: bcrypt.hashSync("seller4123", 10),
    isSeller: true,
    locality: "Dehradun",
    location: "Uttrakhand",
    isAdmin: false,
  },
];

module.exports = { productdata, users, sellers };
