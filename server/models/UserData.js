// models/UserData.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = new mongoose.Schema({
    data: String, // Encrypted data
    shortUrl: String, // Unique short URL
    createdAt: { type: Date, default: Date.now },
});

const UserData = mongoose.model('UserData', UserDataSchema);
module.exports = UserData;