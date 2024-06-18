const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors"); // Import cors package
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

console.log("Path from", path.resolve());
console.log(__dirname);

// Connect to MongoDB

mongoose
  .connect(
    "mongodb+srv://ayesha_user-21:757001ank@cluster0.lvksl.mongodb.net/xnadb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(process.env.DATABASE);
    console.error(err);
  }),
  //   mongoose.connect( "mongodb://localhost:27017/xnadb")
  // .then(() => {
  //     console.log('Database connection successful')
  //   })
  //   .catch(err => {
  //     console.error('Database connection error')
  //   })
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://xna-frontend.vercel.app"
        : "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Enable sending cookies across domains
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "Ihsanxna",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    name: "xna_session",
    cookie: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      sameSite: "none",
    },
  })
);
app.set("trust proxy", 1); // Trust first proxy
// "node": "16.13.2",
app.use(require("./api/auth"));

app.get("/", (req, res) => {
  res.send("hello from backend ank");
});

// "./xna/build/index.html"
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("xna/build"));
//   app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "xna", "build", "index.html"));
//     // res.sendFile(path.join(__dirname,"./xna/build/index.html" ));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("hello from backend");
//   });
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
