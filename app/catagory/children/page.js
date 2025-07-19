

"use client";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function MensClothing() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://dummyjson.com/products/search?q=shoes")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">children&apos;s Clothing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
     
      </div>
    </div>
  );
}
