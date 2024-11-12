// components/DataCaptureForm.jsx
import React, { useState } from 'react';
import { saveUserData } from '../services/userDataService';
import { useNavigate } from 'react-router-dom';

const DataCaptureForm = () => {
    const [userData, setUserData] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await saveUserData(userData);
            setShortUrl(data.shortUrl);
            setMessage('Data saved successfully!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleViewData = () => {
        if (shortUrl) {
            // Navigate to the retrieve data route with the generated short URL
            navigate(`/retrieve/${shortUrl}`);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Send your feedback</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 border rounded"
                    rows="4"
                    placeholder="Enter your text here"
                    value={userData}
                    onChange={(e) => setUserData(e.target.value)}
                ></textarea>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                    Send
                </button>
            </form>
            {message && <p>{message}</p>}
            {shortUrl && (
                <p>
                    <strong>Short URL:</strong>{' '}
                    <button className="text-blue-500 underline" onClick={handleViewData}>
                        View Data
                    </button>
                </p>
            )}
        </div>
    );
};

export default DataCaptureForm;
