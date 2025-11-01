import { useLoaderData } from "react-router"
import ProductCard from "../Components/ProductCard"

export default function AllProductsPage() {
    const { data } = useLoaderData()
    return (
        <main>
            <h1 className='text-4xl font-bold text-center my-8'>All <span className="text-violet-600">Products</span></h1>
            <section className='grid grid-cols-3 place-content-center gap-8 w-11/12 mx-auto my-8'>
                {data.map(e => <ProductCard e={e} />)}
            </section>
        </main>
    )
}