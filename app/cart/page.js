"use client";

import { useCart } from "../context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Logout from ".././admin/componenets/Logout";
import Image from "next/image";
//import dynamic from "next/dynamic";

// const GoogleMapReact = dynamic(() => import("google-map-react"), { ssr: false });

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, checkout } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    email: session?.user?.email || "", // Pre-fill email if available
    phone: "",
    address: "",
    mapAddress: "", // New field for Google Maps input
    paymentMethod: "bank", // Default payment method
  });

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;

  const handleInputChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  {/*const handleMapClick = ({ lat, lng }) => {
    const location = `Lat: ${lat}, Lng: ${lng}`;
    setOrderDetails({ ...orderDetails, mapAddress: location });
  }; */}

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      ...orderDetails,
      userId: session?.user?.id,
      products: cart.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      alert("Order placed successfully!");
      setShowPopup(false);
      checkout();
    } else {
      alert("Error placing order.");
    }
  };

  return (
    <div className="p-6 dark:bg-gray-700 dark:text-white">
      <Logout />

      <h1 className="text-3xl text-center font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500 dark:text-white">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="space-y-4 md:flex lg:flex items-center justify-between border p-4 rounded-lg shadow-md">
              <Image src={item.image} alt={item.title}  className="h-20 w-20 object-contain" />
              <div className="flex-1 px-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-red-600">${item.price}</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-300 text-black px-2 py-1 rounded-l">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="bg-gray-300 text-black px-2 py-1 rounded-r">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Remove</button>
            </div>
          ))}
          <div className="text-xl text-red-500 font-bold mt-4">Total = ${totalPrice}</div>
          <button onClick={() => setShowPopup(true)} className="bg-green-500 text-white sm:ml-10 md:ml-96 px-6 py-3 rounded-lg mt-4">
            Order Now
          </button>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <form onSubmit={handleOrderSubmit}>
              <label className="block font-semibold">Full Name:</label>
              <input type="text" name="fullName" placeholder="Full Name" required onChange={handleInputChange} className="w-full p-2 mb-2 border rounded" />

              <label className="block font-semibold">Email:</label>
              <input type="email" name="email" value={orderDetails.email} disabled className="w-full p-2 mb-2 border rounded bg-gray-100" />

              <label className="block font-semibold">Phone:</label>
              <input type="tel" name="phone" placeholder="Phone" required onChange={handleInputChange} className="w-full p-2 mb-2 border rounded" />

              <label className="block font-semibold">Address:</label>
              <input type="text" name="address" placeholder="Address" required onChange={handleInputChange} className="w-full p-2 mb-2 border rounded" />

              <label className="block font-semibold">Map Address:</label>
              <input type="text" name="mapAddress" placeholder="Enter your location (Google Maps link or address)" required onChange={handleInputChange} className="w-full p-2 mb-2 border rounded" />

              <label className="block font-semibold">Payment Method:</label>
              <select name="paymentMethod" value={orderDetails.paymentMethod} onChange={handleInputChange} className="w-full p-2 mb-2 border rounded">
                <option value="bank">Bank Transfer</option>
                <option value="manual">Manual Payment</option>
                <option value="online">Online Payment</option>
              </select>

              {/* <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA1lHnirfkmqV4q-4qBzIdDDDQUdVtQmuI" }}
                defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                defaultZoom={11}
                onClick={handleMapClick}
              />*/}

              {/* Show bank details if Bank Transfer is selected */}
              {orderDetails.paymentMethod === "bank" && (
                <div className="p-2 bg-gray-100 rounded-md mb-2">
                  <p className="font-semibold">Bank Account Details:</p>
                  <p>Account No: <strong>1000 22 5678 9012</strong></p>
                  <p>Bank Name: <strong>CBE Bank</strong></p>
                </div>
              )}

              <div className="flex flex-row gap-3 justify-between mt-4">
                <button type="button" onClick={() => setShowPopup(false)} className="bg-red-500 text-white rounded-lg w-24">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-32">Place Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



