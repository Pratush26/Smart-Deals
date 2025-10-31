import { NavLink } from 'react-router'
import { IoSearchOutline } from "react-icons/io5";
import '../Utils/utility.css'

export default function Homepage() {
    return (
        <main>
            <section className='bg-linear-155 from-purple-200 to-green-100'>
                <div id="hero" className='min-h-[70vh] flex flex-col items-center p-20 justify-center text-center gap-6'>
                    <h1 className='text-5xl font-bold'>Deal your <span className="text-violet-600">Products</span> <br />
                        in a <span className="text-violet-600">Smart</span> way !</h1>
                    <p className='text-gray-600 font-medium'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
                    <form className='flex items-center justify-center w-1/3'>
                        <input type="text" name="search" id="search" placeholder='search For Products, Categoriees...' className='bg-white px-4 py-2 rounded-l-full w-full h-10 focus:outline-none shadow' />
                        <button type="submit" className='py-2 px-4 h-10 cursor-pointer bg-linear-155 from-violet-900 to-purple-500 hover:from-indigo-800 shadow text-white rounded-r-full transition-colors duration-200 transition-discrete'><IoSearchOutline /></button>
                    </form>
                    <div className='flex items-center justify-center gap-2'>
                        <button className='px-4 py-2 text-sm font-semibold cursor-pointer bg-linear-155 from-violet-900 to-purple-500 hover:from-indigo-800 text-white rounded-sm transition-colors duration-200 transition-discrete'>
                            Watch All Products
                        </button>
                        <button className='px-4 py-2 text-sm font-semibold cursor-pointer text-violet-700 border border-purple-700 hover:text-purple-950 hover:border-purple-950 rounded-sm transition-colors duration-200 transition-discrete'>
                            Post an Product
                        </button>
                    </div>
                </div>
            </section>
                    <h2 className='text-4xl font-bold text-center my-8'>Recent <span className="text-violet-600">Products</span></h2>
                        <NavLink to='/' className='px-4 py-2 text-sm font-semibold bg-linear-155 from-violet-900 to-purple-500 hover:from-indigo-800 text-white rounded-sm transition-colors duration-200 transition-discrete'>
                            Show All
                        </NavLink>
        </main>
    )
}