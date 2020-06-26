const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
         required: true
    },
    username: {
        type: String,
    },
    profilepic: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Person = mongoose.model("Person", PersonSchema);