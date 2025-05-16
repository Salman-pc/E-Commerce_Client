import React, { useContext, useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/WishlistContextApi";
import { getToWhishlistApi } from "../services/allApi";
import { SearchContext } from "../Context/SearchContextApi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { toggleWishlist, addwishlistResponse, deletefromwishlistResponse } = useContext(WishlistContext);
  const { setSearchKeyword } = useContext(SearchContext);
  const navigate = useNavigate();

  const [searchkey, setsearchkey] = useState({ keyword: "" });
  const [wishlistItems, setwishlistItems] = useState([])
  const [user, setUser] = useState(null);

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchKeyword(searchkey.keyword.trim());
    navigate('/home')
  };

  const displayallwishlist = async (userId) => {
    try {
      const result = await getToWhishlistApi(userId);
      if (result.status === 200) {
        setwishlistItems(result.data.data);
      }
    } catch (error) {
      alert("Failed to load wishlist");
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      displayallwishlist(storedUser?.id);
    }
  }, [addwishlistResponse, deletefromwishlistResponse]);

  return (
    <header className="bg-blue-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 w-full max-w-xl flex"
        >
          <input
            type="text"
            placeholder="Search for products..."
            onChange={(e) => setsearchkey({ keyword: e.target.value })}
            className="w-full px-4 py-2 rounded-l-full bg-white text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 px-5 rounded-r-full text-white font-semibold hover:bg-yellow-500 transition"
          >
            Search
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 text-sm whitespace-nowrap">
          <div onClick={toggleWishlist} className="flex items-center gap-1 hover:text-yellow-400 transition">
            <FaHeart className="text-xl" />
            <div className="w-4 h-4 bg-yellow-400 rounded-full flex justify-center items-center">{wishlistItems.length > 0 ? wishlistItems.length : 0}</div>
          </div>
          <Link to="/" className="flex items-center gap-1 hover:text-yellow-400 transition">
            <span>Sign In</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-1 hover:text-yellow-400 transition">
            <FaShoppingCart className="text-xl" />
            <div className="w-4 h-4 bg-yellow-500 rounded-full flex justify-center items-center">0</div>
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
