module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({});
    console.log(blogposts);
    res.render("index", {
        blogposts, // assigning data to blogposts variable
    });
}