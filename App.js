import React from 'react';
import './style.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import CreateProduct from './components/CreateProduct';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { logout } from './redux/authSlice';
import Favorites from './components/Favorites';

function App() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClearCookies = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    dispatch(logout());
  };

  return (
    <Router>
      <div className="App">
        <div className="bar">
          <div className="navbar">
            <h1>TurboCar.com</h1>
            <h1 style={{textTransform:"capitalize"}}>{user.username}</h1>
            <Link to="/">All Posts</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/create_product">
              <button>New Post</button>
            </Link>
          </div>
          <div className="Sign">
            {user ? (
              <div>
                <a onClick={handleClearCookies}> Log Out</a>
              </div>
            ) : (
              <Link to="/signin"><i className='bx bx-user-circle'></i>Sign</Link>
            )}
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/products" element={<Products />}></Route>
          <Route exact path="/products/:id" element={<ProductDetail />}></Route>
          <Route exact path="/create_product" element={user ? <CreateProduct /> : <SignIn />}></Route>
          <Route exact path="/signin" element={<SignIn />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/favorites" element={<Favorites />}></Route>
          <Route exact path="*" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
