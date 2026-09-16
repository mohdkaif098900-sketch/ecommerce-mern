import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      <h3>Items</h3>
      {order.items.map((item, idx) => (
        <p key={idx}>{item.name} x {item.quantity} — ₹{item.price * item.quantity}</p>
      ))}
      <h3>Shipping Address</h3>
      <p>
        {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
        {order.shippingAddress.zip}, {order.shippingAddress.country}
      </p>
      <h3>Total: ₹{order.totalPrice}</h3>
    </div>
  );
}
