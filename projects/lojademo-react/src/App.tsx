import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas COM Navbar e Footer (Layout Principal) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rotas SEM Navbar e Footer (Telas de Autenticação) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
