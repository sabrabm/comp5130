import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RetrieveData = () => {
    const { shortUrl } = useParams();
    const [retrievedData, setRetrievedData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/api/userData/retrieve/${shortUrl}`);
                setRetrievedData(response.data.data);
            } catch (err) {
                setError('Error retrieving data or data may have expired.');
            }
        };
        fetchData();
    }, [shortUrl]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3005/api/userData/delete/${shortUrl}`);
            setRetrievedData(null); // Clear data from the state
            toast.success('Data deleted successfully'); // Show success toast
            setTimeout(() => navigate('/'), 2000); // Redirect after a short delay
        } catch (err) {
            toast.error('Error deleting data'); // Show error toast
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Retrieved Data</h1>
            {retrievedData ? (
                <>
                    <p>{retrievedData}</p>
                    <button 
                        onClick={handleDelete} 
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Delete Data
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default RetrieveData;
