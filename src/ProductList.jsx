import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

// Builds a small leaf-style thumbnail image (works offline, no external files needed)
const thumb = (emoji, bg) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">` +
      `<rect width="200" height="200" fill="${bg}"/>` +
      `<text x="100" y="125" font-size="90" text-anchor="middle">${emoji}</text></svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumb('🌿', '#dcebd0'), cost: 15 },
      { name: 'Spider Plant', image: thumb('🍃', '#e3f0d8'), cost: 12 },
      { name: 'Peace Lily', image: thumb('🌼', '#eaf3e0'), cost: 18 },
      { name: 'Boston Fern', image: thumb('🌱', '#d6e8c9'), cost: 20 },
      { name: 'Rubber Plant', image: thumb('🪴', '#dfecd3'), cost: 17 },
      { name: 'Aloe Vera', image: thumb('🌵', '#e6f1db'), cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: thumb('💜', '#e8e0f0'), cost: 20 },
      { name: 'Jasmine', image: thumb('🤍', '#f4f1e8'), cost: 18 },
      { name: 'Rosemary', image: thumb('🌿', '#dcebd0'), cost: 15 },
      { name: 'Mint', image: thumb('🍃', '#d8ecd4'), cost: 12 },
      { name: 'Lemon Balm', image: thumb('🍋', '#f3f0cf'), cost: 14 },
      { name: 'Gardenia', image: thumb('🌸', '#f6e6ea'), cost: 22 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: thumb('🪴', '#dfecd3'), cost: 25 },
      { name: 'Pothos', image: thumb('🌱', '#d6e8c9'), cost: 10 },
      { name: 'Jade Plant', image: thumb('🍀', '#d9ebd4'), cost: 16 },
      { name: 'Cast Iron Plant', image: thumb('🌿', '#dcebd0'), cost: 19 },
      { name: 'Cactus', image: thumb('🌵', '#e6f1db'), cost: 9 },
      { name: 'Succulent Mix', image: thumb('🪷', '#efe6ee'), cost: 13 },
    ],
  },
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Total number of items in the cart (shown on the cart icon)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // A plant's button is disabled once it has been added to the cart
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">🌿 Paradise Nursery</div>
        <div className="navbar-links">
          <a onClick={() => onNavigate('home')}>Home</a>
          <a className="active" onClick={() => onNavigate('plants')}>Plants</a>
          <a onClick={() => onNavigate('cart')} aria-label="Cart">
            <span className="cart-icon">
              🛒
              <span className="cart-count">{totalQuantity}</span>
            </span>
          </a>
          <a onClick={() => onNavigate('cart')}>Cart</a>
        </div>
      </nav>

      {/* Product categories */}
      <div className="product-page">
        {plantsArray.map((group) => (
          <section key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="product-price">${plant.cost}</p>
                  <button
                    className="add-btn"
                    disabled={isInCart(plant.name)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;