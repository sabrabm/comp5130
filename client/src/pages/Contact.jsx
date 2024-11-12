import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-800 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6">Get in Touch</h2>
        <p className="text-lg mb-12 text-gray-600">We’d love to hear from you! Whether you have a question about our collections or need assistance, feel free to reach out to us.</p>
        
        {/* Contact Info */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-left">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Contact Information</h3>
          <ul className="text-lg space-y-4 text-gray-600">
            <li>
              <span className="font-bold text-gray-800">Email: </span>
              <a href="mailto:contact@clothingstore.com" className="hover:text-gray-800 transition-colors">contact@clothingstore.com</a>
            </li>
            <li>
              <span className="font-bold text-gray-800">Phone: </span>
              <a href="tel:+123456789" className="hover:text-gray-800 transition-colors">+123 456 789</a>
            </li>
            <li>
              <span className="font-bold text-gray-800">Address: </span>
              123 Fashion Avenue, New York, NY 10001
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg text-left">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">Send Us a Message</h3>
          <form className="space-y-6">
            <div className="flex flex-col">
              <label className="text-gray-600 mb-2" htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                className="p-3 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-2" htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                className="p-3 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-2" htmlFor="message">Your Message</label>
              <textarea
                id="message"
                rows="5"
                className="p-3 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Type your message here"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-bold transition-transform transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
