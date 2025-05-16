import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import { FaAngleRight } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import AddProduct from '../Components/AddProduct';
import Wishlist from '../Components/Wishlist';
import { WishlistContext } from '../Context/WishlistContextApi';
import { addTowishlistApi, getSingleProductsApi } from '../services/allApi';
import serverUrl from '../services/serverUrl';

function ProductView() {

    const { id } = useParams();
    const { wishlistOpen, toggleWishlist, setaddwishlistResponse } = useContext(WishlistContext);

    const [product, setProduct] = useState({});
    const [selectedRam, setSelectedRam] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [user, setUser] = useState(null);

    // Get variant based on selected RAM
    const selectedVariant = product?.variants?.find(v => v.ram === selectedRam);


    const handleRamSelect = (ram) => {
        setSelectedRam(ram);
    };

    const handleQtyChange = (type) => {
        setQuantity((prev) => {
            if (type === 'increment') {
                return selectedVariant?.qty && prev < selectedVariant.qty ? prev + 1 : prev;
            }
            if (type === 'decrement') {
                return prev > 1 ? prev - 1 : 1;
            }
            return prev;
        });
    };


    const handleEdit = () => {
        console.log('Editing product...');
        // Implement modal or redirect
    };

    const handleBuy = () => {
        console.log('Buying', quantity, 'unit(s) of RAM:', selectedRam);
    };

    const handleWishlist = async () => {
        try {
            
            if (!user) {
                alert("Please log in to use the wishlist");
                return;
            }

            const reqbody = {
                userid: user.id,
                title: product.title,
                price: selectedVariant.price,
                image: product.images?.[0]
            }
            console.log(reqbody, "reqbody");

            const result = await addTowishlistApi(reqbody);

            if (result.status === 201) {
                console.log(result);
                setIsWishlisted(true);
                alert(result.data.message);
                setaddwishlistResponse(result.data)
            } else {
                alert(result.response.data.message);
            }
        } catch (error) {
            console.error("Wishlist Error:", error);
            alert("Failed to add to wishlist");
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
        setUser(storedUser);
        console.log("Loaded user from sessionStorage:", storedUser);
    }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getSingleProductsApi(id);
                if (result.status === 200) {
                    setProduct(result.data);
                    // Default to first available RAM
                    if (result.data.variants?.length > 0) {
                        setSelectedRam(result.data.variants[0].ram);
                    }
                }
            } catch (error) {
                console.log("Failed to load product", error);
            }
        };

        fetchProduct();
    }, [id]);



    return (
        <div className='bg-white'>
            <Header />
            <div className='h-full'>
                <div className="flex items-center gap-2 p-4 text-gray-600">
                    <Link to={'/home'} className='flex gap-2 items-center'>
                        <span className="text-sm cursor-pointer">Home</span>
                        <FaAngleRight className='cursor-pointer' />
                    </Link>
                    <span className="text-sm cursor-pointer">Product details</span>
                </div>

                <div className="flex items-center justify-center md:h-[90vh]">
                    <div className="flex flex-col md:flex-row gap-8 p-8 rounded-lg max-w-6xl w-full">
                        {/* Image Section */}
                        <div className="flex-1 flex flex-col items-center gap-4">
                            <img src={`${serverUrl}/uploads/${product?.images?.[0]}`} alt="Product" className="w-full h-96 border object-contain" />
                            <div className="flex gap-4">
                                {product?.images?.slice(1, 3)?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${serverUrl}/uploads/${img}`}
                                        className="w-40 h-26 border rounded-lg"
                                        alt={`thumb-${index}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 md:pl-5">
                            <h2 className="text-2xl font-semibold mb-2">{product?.title || 'Loading...'}</h2>
                            <p className="text-xl text-gray-700 mb-1">
                                ₹{selectedVariant?.price || 'N/A'}
                            </p>
                            <p className="text-green-600 mb-4">
                                {selectedVariant?.qty > 0 ? '✔ In stock' : '❌ Out of stock'}
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                                Hurry up! Only {selectedVariant?.qty || 0} left in stock!
                            </p>

                            {/* RAM Options */}
                            <div className="mb-4">
                                <p className="font-medium mb-2">Ram:</p>
                                <div className="flex gap-2">
                                    {product?.variants?.map((variant) => (
                                        <button
                                            key={variant.ram}
                                            className={`border px-3 py-1 rounded-md ${selectedRam === variant.ram ? 'bg-yellow-400' : ''}`}
                                            onClick={() => handleRamSelect(variant.ram)}
                                        >
                                            {variant.ram}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-4">
                                <p className="font-medium mb-2">Quantity:</p>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="border rounded-md px-3 py-1"
                                        onClick={() => handleQtyChange('decrement')}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        className="border rounded-md px-3 py-1"
                                        onClick={() => handleQtyChange('increment')}
                                        disabled={quantity >= selectedVariant?.qty}
                                    >
                                        +
                                    </button>
                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 mt-6">
                                <button
                                    className="bg-yellow-400 text-black px-6 py-2 rounded-3xl hover:bg-yellow-500"
                                    onClick={handleEdit}
                                >
                                    Edit Product
                                </button>
                                <button
                                    className="bg-yellow-400 text-black px-6 py-2 rounded-3xl hover:bg-yellow-500"
                                    onClick={handleBuy}
                                >
                                    Buy it now
                                </button>
                                <button
                                    className={`border p-2 h-12 text-2xl flex justify-center items-center w-12 rounded-full ${isWishlisted ? 'text-red-500 border-red-400' : ''}`}
                                    onClick={handleWishlist}
                                    title="Add to Wishlist"
                                >
                                    {isWishlisted ? '❤️' : '♡'}
                                </button>
                                {wishlistOpen && (
                                    <Wishlist
                                        
                                        onClose={toggleWishlist}  
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductView;
