import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, fetchCart, updateCartItem, removeFromCart, cartTotal } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) fetchCart();
  }, [userInfo, fetchCart]);

  if (!userInfo) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>Please login to view your cart.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div
              key={item.product}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderBottom: "1px solid #eee",
                padding: "1rem 0",
              }}
            >
              <img
                src={item.imageUrl || "https://via.placeholder.com/60"}
                alt={item.name}
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <p>{item.name}</p>
                <p>₹{item.price}</p>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateCartItem(item.product, Number(e.target.value))}
                style={{ width: "60px", padding: "0.3rem" }}
              />
              <button onClick={() => removeFromCart(item.product)}>Remove</button>
            </div>
          ))}
          <h3 style={{ marginTop: "1.5rem" }}>Total: ₹{cartTotal.toFixed(2)}</h3>
          <button
            onClick={() => navigate("/checkout")}
            style={{ padding: "0.7rem 1.5rem", marginTop: "1rem" }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
