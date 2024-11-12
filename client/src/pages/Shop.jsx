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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    
    // New state for price range
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            const productsData = await fetchProducts();
            setProducts(productsData);
            const uniqueCategories = [...new Set(productsData.map(product => product.category))];
            setCategories(uniqueCategories);
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
        setEditingProduct(null);
    };

    const handleAddToCart = async (productId) => {
        if (user && user._id) {
            try {
                await addToCart({
                    userId: user._id,
                    productId: productId,
                    quantity: 1
                });
                alert("Product added to cart");
            } catch (error) {
                console.error("Error adding product to cart:", error);
                alert("Failed to add product to cart");
            }
        } else {
            alert("You need to log in to add products to the cart.");
        }
    };

    const userRole = user && user.role ? user.role : "customer";

    // Filter products based on search query, selected category, and price range
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesPrice =
            (minPrice ? product.price >= parseFloat(minPrice) : true) &&
            (maxPrice ? product.price <= parseFloat(maxPrice) : true);
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="container mx-auto mt-2 mb-16 px-4 lg:px-12 bg-gray-100">
            <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6">Explore Our Collection</h1>

            <div className="mb-4 flex flex-col md:flex-row">
                <div className="mb-2 md:mr-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by product name"
                        className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-2 md:mr-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Price Range Inputs */}
                <div className="mb-2 flex flex-col md:flex-row">
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min Price"
                        className="w-full md:w-1/2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:mr-2"
                    />
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max Price"
                        className="w-full md:w-1/2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:ml-2"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                        {editingProduct === product._id ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={productData.name}
                                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg"
                                    placeholder="Product Name"
                                />
                                <input
                                    type="text"
                                    value={productData.category}
                                    onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg"
                                    placeholder="Category"
                                />
                                <input
                                    type="number"
                                    value={productData.price}
                                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg"
                                    placeholder="Price"
                                />
                                <textarea
                                    value={productData.description}
                                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg"
                                    placeholder="Description"
                                />
                                <button
                                    onClick={handleUpdate}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    Update Product
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                                    <p className="text-gray-600 mb-1">Category: {product.category}</p>
                                    <p className="text-gray-600 mb-3">Price: ${product.price}</p>
                                </div>
                                <div className="flex justify-center space-x-2 mt-4">
                                    {userRole === 'admin' || userRole === 'superuser' ? (
                                        <>
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleAddToCart(product._id)}
                                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                                            >
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </button>
                                            <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200">
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
    );
};

export default Shop;
