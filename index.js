const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserModel = require("./models/user");
const bodyParser = require("body-parser");
const user = require("./models/user");

app.use(bodyParser.json());
mongoose
    .connect("mongodb://127.0.0.1:27017/restApi", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.error("Database connection error");
    });

app.get("/", (req, res) => {
    UserModel.find()
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
});

app.post("/post", (req, res) => {
    const user = new UserModel({
        name: req.body.name,
        age: req.body.age,
        mail: req.body.mail,
    });
    user.save()
        .then((data) => {
            console.log("user Added" + data), res.send("user Added : " + data);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.put("/put/:userId", (req, res) => {
    let newuser = {
        name: req.body.name,
        age: req.body.age,
        mail: req.body.mail,
    };

    UserModel.findByIdAndUpdate(req.params.userId, newuser)
        .then((data) => {
            console.log(
                "user changed : " + data + " by new user : " + newuser.name
            ),
                res.send("user updated : " + data);
        })
        .catch((err) => console.log(err));
});

app.delete("/delete/:userId", (req, res) => {
    UserModel.findByIdAndDelete(req.params.userId)
        .then((data) => {
            console.log("user deleted : " + data),
                res.send("user deleted : " + data);
        })
        .catch((err) => console.log(err));
});

app.listen(3000);
