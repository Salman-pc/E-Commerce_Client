
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Authntication from './Pages/Authntication'
import HomePage from './Pages/HomePage'
import Cart from './Pages/Cart'
import ProductView from './Pages/ProductView'
import { useContext } from 'react'
import { WishlistContext } from './Context/WishlistContextApi'
import Wishlist from './Components/Wishlist'

function App() {
const { wishlistOpen, setWishlistOpen } = useContext(WishlistContext);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Authntication />} />
         <Route path='/home' element={<HomePage />} />
         {/* <Route path='/wishlist' element={<Wishlist />} /> */}
         <Route path='/cart' element={<Cart />} />
         <Route path='/ProductView/:id' element={<ProductView />} />
         
      </Routes>
       {wishlistOpen && <Wishlist onClose={() => setWishlistOpen(false)} />}
    </div>
  )
}

export default App
