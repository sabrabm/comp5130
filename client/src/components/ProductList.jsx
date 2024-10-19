import React from 'react';

const ProductList = () => {
  const products = [
    { id: 1, name: "T-Shirt", description: "A cool t-shirt", price: "$25" },
    { id: 2, name: "Jeans", description: "Stylish jeans", price: "$40" },
  ];

  return (
    <section className="flex flex-wrap justify-center p-6">
      {products.map((product) => (
        <div key={product.id} className="border border-gray-300 rounded-lg p-4 m-4 w-64 text-center">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mt-4">{product.price}</p>
        </div>
      ))}
    </section>
  );
};

export default ProductList;
