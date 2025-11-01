import { useLoaderData } from "react-router"

export default function MyBidsPage() {
    const { data } = useLoaderData()
    return (
        <main>
            <h1 className='text-4xl font-bold text-center my-8'>My Bids : <span className="text-violet-600">{data.length}</span></h1>
        </main>
    )
}