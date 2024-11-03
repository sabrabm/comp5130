import React from 'react';

const Home = () => {
  return (
    <div className="home-container bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-800">
      {/* Hero Section */}
      <div className="hero relative bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?fashion,urban)' }}>
        <div className="text-center p-8 bg-white bg-opacity-80 rounded-lg animate-fade-in">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-800">Elevate Your Fashion Experience</h1>
          <p className="text-xl mb-8 opacity-90">Discover sophisticated designs crafted for the modern individual.</p>
          <button className="px-8 py-3 bg-gray-600 hover:bg-gray-500 text-lg text-white font-semibold rounded-full transition-transform transform hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="featured-categories py-24 px-10">
        <h2 className="text-4xl font-bold text-center mb-12">Explore Our Premium Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="category bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform hover:bg-gray-50">
            <img src="https://source.unsplash.com/400x300/?techwear" alt="Techwear" className="rounded-lg mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700">Techwear</h3>
            <p className="text-gray-600 mb-6">Innovative fashion engineered for versatility and style.</p>
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full">Shop Now</button>
          </div>

          <div className="category bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform hover:bg-gray-50">
            <img src="https://source.unsplash.com/400x300/?streetwear" alt="Streetwear" className="rounded-lg mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700">Streetwear</h3>
            <p className="text-gray-600 mb-6">Bold, urban styles that define individuality and attitude.</p>
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full">Shop Now</button>
          </div>

          <div className="category bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform hover:bg-gray-50">
            <img src="https://source.unsplash.com/400x300/?accessories,futuristic" alt="Accessories" className="rounded-lg mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700">Accessories</h3>
            <p className="text-gray-600 mb-6">Complete your look with sophisticated accessories.</p>
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full">Shop Now</button>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo-section py-16 bg-gray-700 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">Join Our VIP Members</h2>
        <p className="text-xl mb-8 text-gray-200">Get exclusive early access to limited releases and offers.</p>
        <button className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition-transform transform hover:scale-105">
          Sign Up for Free
        </button>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-24 px-10">
        <h2 className="text-4xl font-bold text-center mb-12">Our Customers' Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="testimonial bg-white p-8 rounded-lg shadow-lg text-center hover:bg-gray-50 transition-transform transform hover:scale-105">
            <p className="text-gray-700 mb-6">"I’ve never felt more stylish and comfortable! The techwear collection is a game-changer."</p>
            <h4 className="font-bold text-gray-600">- Alex W.</h4>
          </div>

          <div className="testimonial bg-white p-8 rounded-lg shadow-lg text-center hover:bg-gray-50 transition-transform transform hover:scale-105">
            <p className="text-gray-700 mb-6">"This is where fashion meets innovation. Top quality and cutting-edge designs!"</p>
            <h4 className="font-bold text-gray-600">- Jamie D.</h4>
          </div>

          <div className="testimonial bg-white p-8 rounded-lg shadow-lg text-center hover:bg-gray-50 transition-transform transform hover:scale-105">
            <p className="text-gray-700 mb-6">"I’ve been a loyal customer for years, and they never disappoint with their collections."</p>
            <h4 className="font-bold text-gray-600">- Sarah P.</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
