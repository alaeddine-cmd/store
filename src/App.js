import React from 'react';
import './App.css';
import { Route, Link, Routes } from 'react-router-dom';
import MaleHoodie from './Components/MaleHoodie';
import FemaleHoodie from './Components/FemaleHoodie';
import MaleShirt from './Components/MaleShirt';
import FemaleShirt from './Components/FemaleShirt';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/male-hoodie" element={<MaleHoodie />} />
        <Route path="/female-hoodie" element={<FemaleHoodie />} />
        <Route path="/male-shirt" element={<MaleShirt />} />
        <Route path="/female-shirt" element={<FemaleShirt />} />
      </Routes>
    </div>
  );
}

function Navigation() {
  return (
    <>
      <header className="App-header">
        <h1><img src="/assets/logo_2.png" />Welcome to Our Fashion Store</h1>
      </header>
      <div className="category-container">
        <Link to="/male-hoodie" className="category-box">
          <img src="/assets/male-hoodie.jpg" alt="Male Hoodie" />
        </Link>
        <Link to="/female-hoodie" className="category-box">
          <img src="/assets/woman-hoodie.jpg" alt="Female Hoodie" />
        </Link>
        <Link to="/male-shirt" className="category-box">
          <img src="/assets/male-t-shirt.jpg" alt="Male Shirt" />
        </Link>
        <Link to="/female-shirt" className="category-box">
          <img src="/assets/woman-t-shirt.jpg" alt="Female Shirt" />
        </Link>
      </div>
    </>
  );
}

export default App;
