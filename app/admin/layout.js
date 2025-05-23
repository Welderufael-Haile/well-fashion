import SideBar from "./componenets/SideBar";
import Logout from './componenets/Logout'


export default function RootLayout({ children }) {
  return (
    
         
         <div>
            <div className="flex flex-row" >
                <div className="w-48 bg-gray-50 p-5 text-lg">
                <SideBar></SideBar>
                </div>
            
           <div className="items-center text-center justify-center rounded-lg w-full ">
            <Logout></Logout>
            <h1 className="text-2xl font-bold  p-3 mb-3">Admin panel</h1>
           {children}
           </div>
            </div>
      
         </div>
  );
}