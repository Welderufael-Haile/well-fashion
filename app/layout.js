// import { CartProvider } from "./context/CartContext";
// import Header from "./components/Header";
// import CatagoryList from "./components/CategoryList"
// import Footer from "./components/Footer"

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
      
//         <CartProvider>
       
//           <div>
//           <Header/>
//           </div>
//           <div >
//           <CatagoryList/>
//           </div>
//          <div className="" >
//          {children}
//          </div>
//           <Footer/>
          
//           </CartProvider>
//       </body>
//     </html>
//   );
// }
'use client'

import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import CategoryList from "./components/CategoryList";
import Footer from "./components/Footer";
import { SessionProvider } from "next-auth/react";  // Import SessionProvider

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap your entire app with SessionProvider */}
        <SessionProvider>
          <CartProvider>
            <div>
              <Header />
            </div>
            <div>
              <CategoryList />
            </div>
            <div>
              {children}
            </div>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
