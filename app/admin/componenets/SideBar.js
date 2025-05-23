import Link from "next/link";

export default function SideBar() {
    return(
        <div className="felx flex-col  space-y-2 mt-10 overflow-y-scroll h-screen ">
            <h1 className="text-lg font-bold underline">Add menus</h1>
            <ul className="flex flex-col space-y-3 ">
                <li> <Link  className="hover:text-blue-400 " href="/admin/addmen">mens</Link></li>
                <li><Link  className="hover:text-blue-400 " href="/admin/mensshoes">mens shoes</Link></li>
                <li><Link  className="hover:text-blue-400 " href="/admin/addwomen"> womens</Link></li>
                <li><Link  className="hover:text-blue-400" href="/admin/womensshoes"> womenshoes</Link></li>
                <li><Link  className="hover:text-blue-400" href="/admin/addchildren">Children&apos;s</Link></li>
                <li><Link className="hover:text-blue-400" href="/admin/orderpage">Orderd-pge</Link></li>
                <li><Link  className="hover:text-blue-400" href="/admin/message">Client-messages</Link></li>
              
            </ul>
        </div>
    );
}