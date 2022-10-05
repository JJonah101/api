const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {timestamps: true})
const Show = mongoose.model("Show", ShowSchema);
module.exports = Show;