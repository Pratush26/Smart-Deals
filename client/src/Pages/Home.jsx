import { Link, NavLink, useLoaderData } from 'react-router'
import { IoSearchOutline } from "react-icons/io5";
import '../Utils/utility.css'
import ProductCard from '../Components/ProductCard';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function Homepage() {
    const { data } = useLoaderData()
    const {user} = useContext(AuthContext)
    console.log(user)
    return (
        <main>
            <section className='bg-linear-155 from-purple-200 to-green-100'>
                <div id="hero" className='min-h-[90vh] flex flex-col items-center p-20 justify-center text-center gap-6'>
                    <h1 className='text-5xl font-bold'>Deal your <span className="text-violet-600">Products</span> <br />
                        in a <span className="text-violet-600">Smart</span> way !</h1>
                    <p className='text-gray-600 font-medium'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
                    <form className='flex items-center justify-center w-1/3'>
                        <input type="text" name="search" id="search" placeholder='search For Products, Categoriees...' className='bg-white px-4 py-2 rounded-l-full w-full h-10 focus:outline-none shadow' />
                        <button type="submit" className='py-2 px-4 h-10 cursor-pointer bg-linear-155 from-violet-900 to-purple-500 hover:from-indigo-800 shadow text-white rounded-r-full trnsition'><IoSearchOutline /></button>
                    </form>
                    <div className='flex items-center justify-center gap-2'>
                        <Link to='/all-products' className='btn trnsition'>
                            Watch All Products
                        </Link>
                        <Link to='/create-product' className='px-4 py-2 text-sm font-semibold text-violet-700 border border-purple-700 hover:text-purple-950 hover:border-purple-950 rounded-sm trnsition'>
                            Post an Product
                        </Link>
                    </div>
                </div>
            </section>
            <h2 className='text-4xl font-bold text-center mt-12 mb-8'>Recent <span className="text-violet-600">Products</span></h2>
            <section className='grid grid-cols-3 place-content-center gap-8 w-11/12 mx-auto'>
                {data.map(e => <ProductCard e={e} />)}
            </section>
            <Link to='/all-products' className='btn trnsition flex w-fit mx-auto my-6'>
                Show All
            </Link>
        </main>
    )
}