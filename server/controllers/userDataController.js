const crypto = require('crypto');
const UserData = require('../models/UserData');

const encryptData = (data) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.JWT_SECRET), Buffer.alloc(16, 0));
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

exports.saveUserData = async (req, res) => {
    try {
        const { userInput } = req.body;
        const encryptedData = encryptData(userInput);

        const { nanoid } = await import('nanoid');
        const shortUrl = nanoid(10);

        const newUserData = new UserData({
            data: encryptedData,
            shortUrl,
        });

        await newUserData.save();
        res.status(200).json({ message: 'Data saved successfully', shortUrl });
    } catch (error) {
        console.error("Error in saveUserData controller:", error); // Log detailed error
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
};
