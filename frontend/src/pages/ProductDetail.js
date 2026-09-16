import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const { userInfo } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    try {
      await addToCart(id, quantity);
      setMessage("Added to cart!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add to cart");
    }
  };

  if (!product) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ padding: "2rem", display: "flex", gap: "2rem" }}>
      <img
        src={product.imageUrl || "https://via.placeholder.com/300"}
        alt={product.name}
        style={{ width: "300px", height: "300px", objectFit: "cover", borderRadius: "8px" }}
      />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p style={{ fontSize: "1.3rem", color: "#e94560" }}>₹{product.price}</p>
        <p>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>

        {product.stock > 0 && (
          <div style={{ margin: "1rem 0" }}>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: "60px", padding: "0.4rem" }}
            />
            <button onClick={handleAddToCart} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
              Add to Cart
            </button>
          </div>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
