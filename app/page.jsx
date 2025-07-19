
"use client";
import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import Link from "next/link";
import Image from "next/image";

// import CatagoryList from "../components/CatagoryList"
export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    
    <div className="p-4 dark:bg-gray-800 dark:text-white">
      {/* <CatagoryList ></CatagoryList> */}
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-1 md:px-12 lg:px-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.title}
                className="h-40 mx-auto cursor-pointer"
              />
            </Link>
            <Link href={`/product/${product.id}`}>
              <h2 className="text-lg font-semibold mt-2 hover:underline cursor-pointer">
                {product.title}
              </h2>
            </Link>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
 
  );
}
