import React from 'react';
import './App.css';
import { Route, Link, Routes } from 'react-router-dom';
import MaleHoodie from './Components/MaleHoodie';
import FemaleHoodie from './Components/FemaleHoodie';
import MaleShirt from './Components/MaleShirt';
import FemaleShirt from './Components/FemaleShirt';
import MaleSweatShirt from './Components/MaleSweatShirt';
import FemaleSweatShirt from './Components/FemaleSweatShirt';
import MaleTank from './Components/MaleTank';
import FemaleOverShirt from './Components/FemaleOverShirt';
import youtubeLogo from './Components/youtube.png';
import pinterestLogo from './Components/pinterest.png';
import facebookLogo from './Components/facebook.png';
import instagramLogo from './Components/instagram.png';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/male-hoodie" element={<MaleHoodie />} />
        <Route path="/female-hoodie" element={<FemaleHoodie />} />
        <Route path="/male-shirt" element={<MaleShirt />} />
        <Route path="/female-shirt" element={<FemaleShirt />} />


        <Route path="/male-sweatshirt" element={<MaleSweatShirt />} />
        <Route path="/female-sweatshirt" element={<FemaleSweatShirt />} />
        <Route path="/male-tank" element={<MaleTank />} />
        <Route path="/oversize-t-shirt-women" element={<FemaleOverShirt />} />

      </Routes>
      <footer className="App-footer">
        <p className="footer-text">&copy; 2024 Stitch Switch. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

function Navigation() {
  return (
    <>
      <header className="App-header">
        <h1><Link to="/"><img src="/assets/logo_2.png" style={{ maxWidth: "30px", height: "auto", marginRight: "15px" }}
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
      <div>
        <div className="category-container">
          <Link to="/male-hoodie" className="category-box">
            <div className="image-overlay">Men's Hoodies</div>
            <img src="/assets/male-hoodie.png" alt="Male Hoodie" />
          </Link>
          <Link to="/female-hoodie" className="category-box">
            <div className="image-overlay">Women's Hoodies</div>
            <img src="/assets/woman-hoodie.png" alt="Female Hoodie" />
          </Link>
          <Link to="/male-shirt" className="category-box">
            <div className="image-overlay">Men's Shirts</div>
            <img src="/assets/male-t-shirt.png" alt="Male Shirt" />
          </Link>
          <Link to="/female-shirt" className="category-box">
            <div className="image-overlay">Women's Shirts</div>
            <img src="/assets/woman-t-shirt.png" alt="Female Shirt" />
          </Link>
          {/*           <Link to="/male-sweatshirt" className="category-box">
            <div className="image-overlay">Men's Sweatshirts</div>
            <img src="/assets/male-sweatshirt.png" alt="male sweatshirt" />
          </Link>
          <Link to="/female-sweatshirt" className="category-box">
            <div className="image-overlay">Women's Sweatshirts</div>
            <img src="/assets/female-sweatshirt.png" alt="Female Shirt" />
          </Link>
          <Link to="/male-tank" className="category-box">
            <div className="image-overlay">Men's Tanks</div>
            <img src="/assets/male-tank.png" alt="Male tank" />
          </Link>
          <Link to="/oversize-t-shirt-women" className="category-box">
            <div className="image-overlay">Women's oversize Shirts</div>
            <img src="/assets/oversize-women.png" alt="Female Shirt" />
          </Link> */}
        </div>
        <div className="social-icons">
          <a href="https://www.youtube.com/channel/UCHUCgzgi2265UZfegBMk-Nw" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src={youtubeLogo} alt="YouTube" />
          </a>
          <a href="https://www.pinterest.com/stitchswitch10" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src={pinterestLogo} alt="Pinterest" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61557422802362" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src={facebookLogo} alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/stitchswitch10" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src={instagramLogo} alt="Instagram" />
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
