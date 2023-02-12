const BlogPost = require("./Models/BlogPost");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    //   .connect("mongodb+srv://omdev:omdev123@cluster0.bttorco.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(PORT, () => console.log(`SERVER Port : ${PORT}`));
  })
  .catch((err) => {
    console.log(`${err} did not Connect`);
  });

// BlogPost.create(
//   { title: "Blog Title 2", body: "Blog Body" },
//   (error, blogpost) => {
//     console.log(error, blogpost);
//   }
// );


// to find all documemnts in the database

// BlogPost.find({}, (error, blogspot) => {
//   console.log(error, blogspot);
// });

// to find the document in the collection by an id
BlogPost.findByIdAndUpdate(id,{ title:'Blog Title 2'}, (error, blogspot) => {
    console.log(error, blogspot);
  });
  


console.log(process.env);
