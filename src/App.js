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
        <h1><Link to="/"><img src="/assets/logo_2.png" style={{ maxWidth: "30px", height: "auto", marginRight:"10px" }}
          className="needle" alt="Stitch Switch" /></Link>Stitch Switch</h1>
      </header>
      <section className="how-it-works">
        <h2>How it works!</h2>
        <ol>
          <li><strong>1. Select your outwear</strong> Choose from a selection of hoodies and shirts to find the perfect canvas for your design.</li>
          <li><strong>2. Pick a Color:</strong> Use our color palette tool  to try out different colours and find the one that suits your style.</li>
          <li><strong>3. Upload Your Design:</strong> Add your own logo or artwork to the outwear. Simply upload the image and it’ll appear on your selected apparel.</li>
          <li><strong>4. Adjust with Ease:</strong> Drag and scale your design to the desired position and size. Our tools are designed to give you flexibility and control over your creation.</li>
          <li><strong>5. Preview and Download:</strong> View your design from all angles by clicking on the thumbnails below. Satisfied with your masterpiece? Download images of each side of your customized apparel.</li>
          <li><strong>Tips:</strong> Click on “Design Ideas” to explore a gallery of possibilities that might catch your fancy.</li>
        </ol>
      </section>
      <div className="category-container">
        <Link to="/male-hoodie" className="category-box">
          <div className="image-overlay">Men's Hoodies</div>
          <img src="/assets/male-hoodie.jpg" alt="Male Hoodie" />
        </Link>
        <Link to="/female-hoodie" className="category-box">
          <div className="image-overlay">Women's Hoodies</div>
          <img src="/assets/woman-hoodie.jpg" alt="Female Hoodie" />
        </Link>
        <Link to="/male-shirt" className="category-box">
          <div className="image-overlay">Men's Shirts</div>
          <img src="/assets/male-t-shirt.jpg" alt="Male Shirt" />
        </Link>
        <Link to="/female-shirt" className="category-box">
          <div className="image-overlay">Women's Shirts</div>
          <img src="/assets/woman-t-shirt.jpg" alt="Female Shirt" />
        </Link>
      </div>
    </>
  );
}

export default App;
