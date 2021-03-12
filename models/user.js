const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("user", userSchema);
