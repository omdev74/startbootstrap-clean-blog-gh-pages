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

// Mongo Setup
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  //   .connect("mongodb+srv://omdev:omdev123@cluster0.bttorco.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// .then((result) => {
//   app.listen(PORT, () => console.log(`SERVER Port : ${PORT}`));
// })
// .catch((err) => {
//   console.log(`${err} did not Connect`);
// });



// CRUD opreatiomns on the database

// GET Routes
app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  console.log(blogposts);
  res.render("index", {
    blogposts, // assigning data to blogposts variable
  });
});

app.get("/about", (req, res) => {
  res.render("about");
  // res.sendFile(path.resolve(__dirname, "pages/about.html"));
});
app.get("/post", (req, res) => {
  res.render("post");
  // res.sendFile(path.resolve(__dirname, "pages/post.html"));
});

app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  console.log(blogpost);
  res.render("post", { blogpost });
});

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


app.get("/posts/new", (req, res) => {
  res.render("create");
});



// POST Routes
app.post("/posts/store/", (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    await BlogPost.create(
      { ...req.body, image: "/img/" + image.name },
      (error, blogpost) => {
        res.redirect("/");
      }
    );
  });
});

// UPDATE ROUTES

app.get("/update", async (req, res) => {
  const updated = await BlogPost.findByIdAndUpdate("63e2d3d26cbaa46898dab0da", { datePosted: new Date() });

  res.end(JSON.stringify(updated))
})