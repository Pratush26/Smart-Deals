import { useLoaderData } from "react-router"

export default function MyProductsPage() {
    const { data } = useLoaderData()
    return (
        <main>
            <h1 className='text-4xl font-bold text-center my-8'>My Products : <span className="text-violet-600">{data.length}</span></h1>
        </main>
    )
}