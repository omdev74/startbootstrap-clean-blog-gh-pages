const mongoose = require("mongoose");
const Schema = require("./BlogPost");

const UserSchema = new Schema({

    usename: String,
    password: String
})

