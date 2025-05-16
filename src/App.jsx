
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Authntication from './Pages/Authntication'
import HomePage from './Pages/HomePage'
import Wishlist from './Components/Wishlist'
import Cart from './Pages/Cart'
import ProductView from './Pages/ProductView'

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Authntication />} />
         <Route path='/home' element={<HomePage />} />
         {/* <Route path='/wishlist' element={<Wishlist />} /> */}
         <Route path='/cart' element={<Cart />} />
         <Route path='/ProductView/:id' element={<ProductView />} />
         
      </Routes>
    </div>
  )
}

export default App
