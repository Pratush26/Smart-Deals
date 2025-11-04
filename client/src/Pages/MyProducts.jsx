import { useLoaderData } from "react-router"
import ImgManager from "../Components/ImgManager"

export default function MyProductsPage() {
    const { data } = useLoaderData()
    return (
        <main className="w-11/12 mx-auto my-6">
            {
                data.length ?
                    <table className="table-auto text-center text-sm font-medium border-collapse border border-gray-400 w-full">
                        <caption className='text-4xl font-bold my-8'>My Products : <span className="text-violet-600">{data.length}</span></caption>
                        <thead>
                            <tr className="bg-gray-200">
                                <th>SL no.</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {
                                data.map((e, i) => (
                                    <tr key={i} className="border border-gray-300 bg-white">
                                        <td>{i + 1}</td>
                                        <td className="flex flex-wrap justify-center items-center gap-2">
                                            <ImgManager imgUrl={e.image} altTxt={"product Image"} styles={"h-20 w-auto rounded-xl object-center object-contain"} />
                                        </td>
                                        <td>{e.title}</td>
                                        <td>{e.category}</td>
                                        <td>$ {e.price_max} - {e.price_min}</td>
                                        <td><span className={`${e.status === 'sold' ? "bg-gray-600" : "bg-violet-600"} rounded-full px-4 text-white py-1 h-10`}>{e.status}</span></td>
                                        <td>{e.category}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <p className="text-3xl font-semibold text-center">No Product <span className="text-violet-600">Found!</span></p>
            }
        </main>
    )
}