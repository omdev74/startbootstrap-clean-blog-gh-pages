const express = require("express");
const path = require("path");
const app = new express();

const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
app.listen(4000, () => {
  console.log("App listening on port 4000");
});

const dotenv = require("dotenv");

const ejs = require("ejs");
const BlogPost = require("./Models/BlogPost");
// this tell express to use EJS ast the templating engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());
app.use(fileUpload());
const validateMiddleware = require("./middleware/validateMiddleware");

// Env Setup
dotenv.config();

// controllers
const newPostController = require("./controllers/newPost")
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost');
const storeUserController = require("./controllers/storeUser");


mongoose.connect(process.env.MONGO_URL, {

  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// CRUD opreations on the database

// GET Routes
app.get("/", homeController);

app.get("/about", (req, res) => {
  res.render("about");
  // res.sendFile(path.resolve(__dirname, "pages/about.html"));
});
app.get("/post", (req, res) => {
  res.render("post");
  // res.sendFile(path.resolve(__dirname, "pages/post.html"));
});

app.get("/post/:id", getPostController);

app.get("/contact", (req, res) => {
  res.render("contact");
  // res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  const user = {
    id: req.params.id,
    // name: req.params.name,
    stack: "MERN",
    email: "Bob@gmail.com",
    hobby: ["Singing", "anime", "gaming"],
  };
  res.render("user", { user });
  // res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});


app.get("/posts/new", newPostController);

app.get("/login", (req, res) => {
  res.render("login")
})



// POST Routes
app.post("/posts/store/", storePostController);

// UPDATE ROUTES

app.get("/update", async (req, res) => {
  const updated = await BlogPost.findByIdAndUpdate("63e2d3d26cbaa46898dab0da", { datePosted: new Date() });

  res.end(JSON.stringify(updated))
})