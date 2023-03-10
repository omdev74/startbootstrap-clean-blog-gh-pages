module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
        await BlogPost.create(
            { ...req.body, image: "/img/" + image.name },
            (error, blogpost) => {
                res.redirect("/");
            }
        );
    });
}