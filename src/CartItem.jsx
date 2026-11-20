import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost for one plant = unit price x quantity
  const calculateItemTotal = (item) => item.cost * item.quantity;

  // Total cost of everything in the cart
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // quantity would hit 0, so remove it
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">🌿 Paradise Nursery</div>
        <div className="navbar-links">
          <a onClick={() => onNavigate('home')}>Home</a>
          <a onClick={() => onNavigate('plants')}>Plants</a>
          <a onClick={() => onNavigate('cart')} aria-label="Cart">
            <span className="cart-icon">
              🛒
              <span className="cart-count">{totalQuantity}</span>
            </span>
          </a>
          <a className="active" onClick={() => onNavigate('cart')}>Cart</a>
        </div>
      </nav>

      <div className="cart-page">
        <h2>Shopping Cart</h2>
        <p className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</p>

        {cartItems.length === 0 && (
          <p className="empty-cart">Your cart is empty. Add some plants to get started!</p>
        )}

        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Unit price: ${item.cost}</p>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => handleDecrement(item)} aria-label="Decrease quantity">−</button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => handleIncrement(item)} aria-label="Increase quantity">+</button>
              </div>
              <p><strong>Total: ${calculateItemTotal(item)}</strong></p>
            </div>
            <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
          </div>
        ))}

        <div className="cart-actions">
          <button className="continue-btn" onClick={() => onNavigate('plants')}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;