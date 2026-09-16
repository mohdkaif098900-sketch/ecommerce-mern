import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { userInfo, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>ShopMERN</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>Cart ({itemCount})</Link>
        {userInfo ? (
          <>
            <Link to="/orders" style={styles.link}>My Orders</Link>
            {userInfo.role === "admin" && <Link to="/admin" style={styles.link}>Admin</Link>}
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#1a1a2e",
    color: "#fff",
  },
  brand: { color: "#fff", fontSize: "1.4rem", fontWeight: "bold", textDecoration: "none" },
  links: { display: "flex", gap: "1.2rem", alignItems: "center" },
  link: { color: "#fff", textDecoration: "none" },
  button: {
    background: "#e94560",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.9rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
