// Shop.jsx
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { addToCart, deleteProduct, fetchProducts, updateProduct } from '../services/productService';

const Shop = () => {
    const { user } = useUser();
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        preference: '',
        description: ''
    });

    useEffect(() => {
        const getProducts = async () => {
            const productsData = await fetchProducts();
            setProducts(productsData);
        };
        getProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            setProducts(products.filter((product) => product._id !== id));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product._id);
        setProductData(product);
    };

    const handleUpdate = async () => {
        await updateProduct(editingProduct, productData);
        setProducts(products.map(product => product._id === editingProduct ? productData : product));
        setEditingProduct(null); // Exit edit mode
    };

    const handleAddToCart = async (productId) => {
        if (user && user._id) {
            try {
                console.log("Adding product to cart...");
                const response = await addToCart({
                    userId: user._id, // Correctly passing user._id
                    productId: productId, // Correctly passing productId
                    quantity: 1 // You can customize this as needed
                });
                
                // Log the response to confirm success
                console.log('Product added to cart:', response);
                alert("Product added to cart");
            } catch (error) {
                console.error("Error adding product to cart:", error);
                alert("Failed to add product to cart");
            }
        } else {
            alert("You need to log in to add products to the cart.");
        }
    };
    

    // Guard against undefined user or missing role
    const userRole = user && user.role ? user.role : "customer"; // Default to "customer" role if undefined

    return (
        <div className="container mx-auto mt-4 mb-16 px-4 lg:px-12">
            <h1 className="text-4xl font-bold text-center mb-12">Products</h1>

            <div className="max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                            {editingProduct === product._id ? (
                                <div className="space-y-4">
                                    {/* Edit Form */}
                                    <input
                                        type="text"
                                        value={productData.name}
                                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Product Name"
                                    />
                                    <input
                                        type="text"
                                        value={productData.category}
                                        onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Category"
                                    />
                                    <input
                                        type="number"
                                        value={productData.price}
                                        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Price"
                                    />
                                    <textarea
                                        value={productData.description}
                                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Description"
                                    />
                                    <button
                                        onClick={handleUpdate}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                                    >
                                        Update Product
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                        <p className="text-gray-600 mb-1">Category: {product.category}</p>
                                        <p className="text-gray-600 mb-3">Price: ${product.price}</p>
                                    </div>
                                    <div className="flex justify-center space-x-2 mt-4">
                                        {userRole === 'admin' || userRole === 'superuser' ? (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleAddToCart(product._id)}
                                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                                                >
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                </button>
                                                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition duration-300">
                                                    Buy Now
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
