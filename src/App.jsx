
import { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  // 'home' | 'plants' | 'cart'
  const [page, setPage] = useState('home');

  if (page === 'plants') return <ProductList onNavigate={setPage} />;
  if (page === 'cart') return <CartItem onNavigate={setPage} />;

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p className="tagline">Where green meets home</p>
        <button className="get-started-btn" onClick={() => setPage('plants')}>
          Get Started
        </button>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
