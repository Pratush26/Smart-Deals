import { Link } from "react-router";

export default function Footer() {
    return (
        <section className="bg-gray-900 text-white py-16 px-2">
            <footer className="grid grid-cols-5 place-content-between gap-5 w-11/12 mx-auto">
                <div>
                    <Link to='/' className="text-xl font-bold">Smart<span className="text-violet-600">Deals</span></Link>
                    <p className="text-gray-300 text-sm">Your trusted marketplace for authentic local products. Discover the best deals from across Bangladesh.</p>
                </div>
                <div className="text-gray-400 flex flex-col gap-3 text-sm">
                    <h6 className="text-lg font-semibold text-white">Quick Links</h6>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>All Products</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>Dashboard</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>Login</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>Register</Link>
                </div>
                <div className="text-gray-400 flex flex-col gap-3 text-sm">
                    <h6 className="text-lg font-semibold text-white">Categories</h6>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>Electronics</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>Fashion</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>Home & Living</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>Groceries</Link>
                </div>
                <div className="text-gray-400 flex flex-col gap-3 text-sm">
                    <h6 className="text-lg font-semibold text-white">Contact & Support</h6>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>support@Smartdeals.com</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>+880 123 456 789</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>123 Commerce Street, Dhaka, Bangladesh</Link>
                </div>
                <div className="text-gray-400 space-x-3 space-y-2 text-sm">
                    <h6 className="text-lg font-semibold text-white">Social Links</h6>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>support@Smartdeals.com</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>+880 123 456 789</Link>
                    <Link className="hover:text-gray-200 transition-colors duration-200 transition-discrete" to='/'>123 Commerce Street, Dhaka, Bangladesh</Link>
                </div>
            </footer>
        </section>
    )
}