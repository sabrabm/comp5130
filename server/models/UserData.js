// models/UserData.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
    data: String, // Encrypted data
    shortUrl: String, // Unique short URL
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 }, // Expires in 24 hours
});

UserDataSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const UserData = mongoose.model('UserData', UserDataSchema);
module.exports = UserData;
