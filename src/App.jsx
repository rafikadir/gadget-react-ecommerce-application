import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import { createContext, useState } from 'react';

export const CartContext = createContext();

function App() {

  const [cartProducts, setCartProducts] = useState([]);

  const updateCart = (id) => {
    const checkProduct = cartProducts.includes(id);
    if (!checkProduct) {
      setCartProducts([id, ...cartProducts]);
    }
  };

  const deleteItem = (id) => {
    const updateCart = cartProducts.filter(cart => cart !== id);
    setCartProducts(updateCart);
  };

  return ( 
    <CartContext.Provider value={{cartProducts, updateCart, deleteItem}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:id" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </CartContext.Provider>
  )
}

export default App;
