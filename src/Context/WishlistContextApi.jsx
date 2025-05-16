import React, { useState, createContext } from 'react';

export const WishlistContext = createContext();

function WishlistContextApi({ children }) {
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [addwishlistResponse, setaddwishlistResponse] = useState([]);
    const [deletefromwishlistResponse,setdeltefromwishlistResponse]=useState()

    const toggleWishlist = () => setWishlistOpen(!wishlistOpen);

    return (
        <WishlistContext.Provider
            value={{
                wishlistOpen,
                setWishlistOpen,
                toggleWishlist,
                deletefromwishlistResponse,setdeltefromwishlistResponse,
                addwishlistResponse,setaddwishlistResponse
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistContextApi;
