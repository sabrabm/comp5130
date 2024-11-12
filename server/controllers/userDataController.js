const crypto = require('crypto');
const UserData = require('../models/UserData');

const encryptData = (data) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.JWT_SECRET), Buffer.alloc(16, 0));
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decryptData = (encryptedData) => {
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(process.env.JWT_SECRET), // Make sure to use the same secret
        Buffer.alloc(16, 0)
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
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


exports.retrieveUserData = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const userData = await UserData.findOne({ shortUrl });
        
        if (!userData) {
            return res.status(404).json({ message: 'Data not found or expired' });
        }

        const decryptedData = decryptData(userData.data);
        res.status(200).json({
            message: 'Data retrieved successfully',
            data: decryptedData,
        });
    } catch (error) {
        console.error("Error in retrieveUserData controller:", error);
        res.status(500).json({ message: 'Error retrieving data', error: error.message });
    }
};

exports.deleteUserData = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const deletedData = await UserData.findOneAndDelete({ shortUrl });

        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found or already deleted' });
        }

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        console.error("Error in deleteUserData controller:", error);
        res.status(500).json({ message: 'Error deleting data', error: error.message });
    }
};