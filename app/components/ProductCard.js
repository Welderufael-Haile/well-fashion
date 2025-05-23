import Link from "next/link";

function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link href={`/product/${product.id}`} className="bg-black text-white px-4 py-2 mt-2 block text-center">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
