import { useLoaderData } from "react-router"

export default function ProductDetailsPage() {
    const {data} = useLoaderData()
    console.log(data)
    return (
        <main>
            Product Details
        </main>
    )
}