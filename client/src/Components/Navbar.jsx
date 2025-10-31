import { Link, NavLink } from "react-router";
import '../Utils/utility.css'
import NavImg from "../assets/thumb-profile.png"

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between w-11/12 mx-auto p-4">
            <Link to='/' className="text-2xl font-bold">Smart<span className="text-violet-600">Deals</span></Link>
            <div className="space-x-3 text-sm font-medium text-gray-900">
                <NavLink className="hover:text-gray-500 transition-colors duration-200 transition-discrete" to='/'>Home</NavLink>
                <NavLink className="hover:text-gray-500 transition-colors duration-200 transition-discrete" to='/all-products'>All Products</NavLink>
                <NavLink className="hover:text-gray-500 transition-colors duration-200 transition-discrete" to='/my-products'>My Products</NavLink>
                <NavLink className="hover:text-gray-500 transition-colors duration-200 transition-discrete" to='/my-bids'>My Bids</NavLink>
                <NavLink className="hover:text-gray-500 transition-colors duration-200 transition-discrete" to='/create-products'>Create Product</NavLink>
            </div>
                <img src={NavImg} className="h-7 aspect-square object-cover rounded-full" alt="icon" />
            </nav>
    )
}