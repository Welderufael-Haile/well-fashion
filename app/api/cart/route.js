{/*import { useCart } from '../../context/CartContext';
// app/api/cart/route.js (if using the App Router)
export async function GET(request) {
    // Handle GET request
    return new Response(JSON.stringify({ cartItems: [] }), {
      headers: { "Content-Type": "application/json" },
    });
}
  
  export async function POST() {
    // Handle POST request
    // const { item } = await request.json();
    // Logic to add item to the cart
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  
//const SomeComponent = () => {
  const {  addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div>
      <button onClick={() => handleAddToCart(someItem)}>Add to Cart</button>
    </div>
  );

*/}