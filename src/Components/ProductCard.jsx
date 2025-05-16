import React from 'react';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import serverUrl from '../services/serverUrl';

const ProductCard = ({ name, price, image ,id}) => {
    return (

        <div className="border h-[340px] border-gray-200 rounded-2xl w-72 m-4 shadow-md bg-white">
            <Link to={`/ProductView/${id}`} className='w-fit'>
                <div className="p-4 text-center relative">
                    <div className='w-10 absolute top-6 right-5 flex justify-center items-center rounded-full bg-sky-200 h-10'>
                        <FaRegHeart />
                    </div>
                    <img
                        src={`${serverUrl}/uploads/${image}` || "https://via.placeholder.com/200x150"}
                        alt={name}
                        className="mx-auto border w-64 h-48 object-contain"
                    />
                </div>
                <div className="p-4 pt-1">
                    <h3 className="text-gray-800 text-lg font-medium mb-2">{name}</h3>
                    <p className="text-xl font-bold my-2">{price ? `₹${price}` : "Price not available"}</p>

                    {/* 5 Gray Stars */}
                    <div className="flex gap-3">
                        {[...Array(5)].map((_, index) => (
                            <FaStar key={index} className="text-gray-400" />
                        ))}
                    </div>
                </div>
            </Link>
        </div >


    );
};

export default ProductCard;
