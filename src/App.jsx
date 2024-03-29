import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Shop from './pages/Shop/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import { createContext, useEffect, useState } from 'react';
import Checkout from './pages/Checkout/Checkout';
import Signin from './pages/Signin/Signin';
import PrivateOutlet from './components/PrivateOutlet/PrivateOutlet';
import User from './pages/User/User';
import Payment from './pages/Payment/Payment';
import Success from './pages/Success/Success';

export const CartContext = createContext();

function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [orderInfo, SetOrderInfo] = useState();
  const [isNewUser, SetIsNewUser] = useState(false);
  const [userInfo, SetUserInfo] = useState();

  const updateCart = (id) => {
    const checkProduct = cartProducts.includes(id);
    if (!checkProduct) {
      setCartProducts([id, ...cartProducts]);
    }
  };

  const deleteItem = (id) => {
    const removeCart = cartProducts.filter(cart => cart !== id);
    setCartProducts(removeCart);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const userData = JSON.parse(storedData);
      SetUserInfo(userData);
      SetIsLoggedIn(true);
    }
    else {
      SetIsLoggedIn(false);
      SetUserInfo("");
    }
  },[]);

  return (
    <CartContext.Provider value={{
      cartProducts, 
      updateCart, 
      deleteItem, 
      isNewUser,
      SetIsNewUser,
      SetIsLoggedIn, 
      isLoggedIn, 
      userInfo, 
      SetUserInfo,
      SetOrderInfo,
      orderInfo,
    }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:id" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<PrivateOutlet/>}> 
          <Route path="checkout" element={<Checkout />} />
          <Route path="user" element={<User />}/>
          <Route path="user/:url" element={<User />}/>
          <Route path="payment" element={<Payment />}/>
          <Route path="success" element={<Success />}/>
        </Route>
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </CartContext.Provider>
  )
}

export default App;
