import React, { useContext } from 'react';
import { useEffect } from 'react';
import { FaAngleRight, FaTimes } from 'react-icons/fa';
import { deletefromWhishlistApi, getToWhishlistApi } from '../services/allApi';
import { useState } from 'react';
import serverUrl from '../services/serverUrl';
import { WishlistContext } from '../Context/WishlistContextApi';

function Wishlist({  onClose }) {

  const {addwishlistResponse,setdeltefromwishlistResponse}=useContext(WishlistContext)
  const [wishlistItems, setwishlistItems] = useState([])
  const [user, setUser] = useState(null);
  

const displayallwishlist = async (userId) => {
  try {
    const result = await getToWhishlistApi(userId);
    if (result.status === 200) {
      setwishlistItems(result.data.data);
    }
    
  } catch (error) {
    console.error("Wishlist Error:", error);
    alert("Failed to load wishlist");
  }
};

 const handledeleteWishlistItem = async (id) => {
    try {
      const result = await deletefromWhishlistApi(id,user.id);
      if (result.status === 200) {
        displayallwishlist(user.id);
        setdeltefromwishlistResponse(result)
      }
    } catch (error) {
      console.error("Wishlist Delete Error:", error);
      alert("Failed to delete wishlist item");
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      displayallwishlist(storedUser.id);
    }
  }, [addwishlistResponse]);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50">
      {/* Header */}
      <div className="flex justify-between items-center py-[22px] p-4 border-b bg-blue-900 text-white">
        <h2 className="text-lg font-semibold">Items</h2>
        <button onClick={onClose}>
          <FaAngleRight />
        </button>
      </div>

      {/* Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
        {wishlistItems?.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No items in wishlist.</p>
        ) : (
          wishlistItems?.map((item, index) => (
            <div key={index} className="flex items-start gap-4 mb-4 border-b pb-4">
              <img src={`${serverUrl}/uploads/${item?.image}`} alt={item?.title} className="w-20 h-20 object-contain border rounded-md" />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item?.title}</h3>
                <p className="text-sm text-gray-700">${item?.price}</p>
                <div className="text-yellow-500 text-xs mt-1">★★★★★</div>
              </div>
              <button onClick={() => handledeleteWishlistItem(item._id)} className="text-gray-500 hover:text-red-500">
                <FaTimes />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
