"use client";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6  dark:bg-gray-800 dark:text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <Image src={product.image} alt={product.title} className="h-80 mx-auto" />
      <p className="text-lg text-gray-700 dark:text-white mt-4">{product.description}</p>
      <p className="text-2xl font-bold text-green-600 mt-2">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-500 text-white ml-32 px-6 py-2 rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}
