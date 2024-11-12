import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { UserProvider } from './contexts/UserContext';
import './index.css';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import DataCaptureForm from './pages/DataCaptureForm';
import Home from './pages/Home';
import Login from './pages/Login';
import RetrieveData from './pages/RetrieveData';
import Shop from './pages/Shop';
import Signup from './pages/Signup';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App m-0 p-0 box-border md:box-content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/dataCaptureForm" element={<DataCaptureForm />} />
            <Route path="/retrieve/:shortUrl" element={<RetrieveData />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;