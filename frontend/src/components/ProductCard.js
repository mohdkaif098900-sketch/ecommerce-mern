import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <Link to={`/products/${product._id}`}>
        <img
          src={product.imageUrl || "https://via.placeholder.com/200"}
          alt={product.name}
          style={styles.img}
        />
        <h3 style={styles.name}>{product.name}</h3>
      </Link>
      <p style={styles.price}>₹{product.price}</p>
      <p style={styles.stock}>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "1rem",
    width: "220px",
    textAlign: "center",
  },
  img: { width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px" },
  name: { fontSize: "1rem", margin: "0.5rem 0" },
  price: { fontWeight: "bold", color: "#e94560" },
  stock: { fontSize: "0.8rem", color: "#666" },
};
