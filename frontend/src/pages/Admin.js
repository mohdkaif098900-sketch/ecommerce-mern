import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: "", description: "", price: "", category: "", brand: "", stock: "", imageUrl: "",
  });
  const [error, setError] = useState("");

  const loadData = async () => {
    const [productsRes, ordersRes] = await Promise.all([
      api.get("/products?limit=100"),
      api.get("/orders"),
    ]);
    setProducts(productsRes.data.products);
    setOrders(ordersRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/products", { ...form, price: Number(form.price), stock: Number(form.stock) });
      setForm({ name: "", description: "", price: "", category: "", brand: "", stock: "", imageUrl: "" });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    }
  };

  const handleDeleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    loadData();
  };

  const handleStatusChange = async (orderId, status) => {
    await api.put(`/orders/${orderId}/status`, { status });
    loadData();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>

      <h3>Add New Product</h3>
      <form onSubmit={handleCreateProduct} style={{ maxWidth: "400px", marginBottom: "2rem" }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.6rem" }} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.6rem" }} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.6rem" }} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.6rem" }} />
        <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.6rem" }} />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.6rem" }} />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.6rem" }} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "0.6rem 1.2rem" }}>Add Product</button>
      </form>

      <h3>All Products</h3>
      {products.map((p) => (
        <div key={p._id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "0.5rem 0" }}>
          <span>{p.name} — ₹{p.price} — Stock: {p.stock}</span>
          <button onClick={() => handleDeleteProduct(p._id)}>Delete</button>
        </div>
      ))}

      <h3 style={{ marginTop: "2rem" }}>All Orders</h3>
      {orders.map((order) => (
        <div key={order._id} style={{ borderBottom: "1px solid #eee", padding: "0.7rem 0" }}>
          <p>Order #{order._id} — {order.user?.name} — ₹{order.totalPrice}</p>
          <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}
