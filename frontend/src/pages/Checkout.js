import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartTotal, fetchCart } = useCart();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/orders", {
        shippingAddress: address,
        paymentMethod,
      });

      await fetchCart();

      navigate(`/orders/${data._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to place order"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "1rem",
      }}
    >
      <h2>Checkout</h2>

      <p>Order Total: ₹{cartTotal.toFixed(2)}</p>

      <form onSubmit={handlePlaceOrder}>
        <input
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "0.8rem",
          }}
        />

        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "0.8rem",
          }}
        />

        <input
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "0.8rem",
          }}
        />

        <input
          name="zip"
          placeholder="ZIP Code"
          value={address.zip}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "0.8rem",
          }}
        />

        <input
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "0.8rem",
          }}
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "1rem",
          }}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Card Payment</option>
          <option value="UPI">UPI</option>
        </select>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}