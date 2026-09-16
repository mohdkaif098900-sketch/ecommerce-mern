import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my-orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ border: "1px solid #eee", padding: "1rem", marginBottom: "1rem" }}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <Link to={`/orders/${order._id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}
