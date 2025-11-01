import { Link, NavLink } from "react-router";
import '../Utils/utility.css'
import NavImg from "../assets/thumb-profile.png"

export default function Navbar() {
    const user = null;
    return (
        <header className="bg-white w-full shadow-md">
        <nav className="flex items-center justify-between w-11/12 mx-auto p-4">
            <Link to='/' className="text-2xl font-bold">Smart<span className="text-violet-600">Deals</span></Link>
            <div className="space-x-3 text-sm font-medium text-gray-900">
                <NavLink className="hover:text-gray-500 trnsition" to='/'>Home</NavLink>
                <NavLink className="hover:text-gray-500 trnsition" to='/all-products'>All Products</NavLink>
                <NavLink className="hover:text-gray-500 trnsition" to='/my-products'>My Products</NavLink>
                <NavLink className="hover:text-gray-500 trnsition" to='/my-bids'>My Bids</NavLink>
                <NavLink className="hover:text-gray-500 trnsition" to='/create-product'>Create Product</NavLink>
            </div>
            {
                user?
                <img src={NavImg} className="h-7 aspect-square object-cover rounded-full" alt="icon" />
                :
                <div className='flex items-center justify-center gap-3'>
                        <Link to='/login' className='px-4 py-2 text-sm font-semibold text-violet-700 border border-purple-700 hover:text-purple-950 hover:border-purple-950 rounded-sm trnsition'>
                            Login
                        </Link>
                        <Link to='/register' className='btn trnsition'>Register</Link>
                    </div>
            }
            </nav>
        </header>
    )
}