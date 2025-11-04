import { useLoaderData } from "react-router"
import ImgManager from "../Components/ImgManager"

export default function MyBidsPage() {
    const { data } = useLoaderData()
    return (
        <main className="w-11/12 mx-auto my-6">
            {
                data.length ?
                    <table className="table-auto text-center text-sm font-medium border-collapse border border-gray-400 w-full">
                        <caption className='text-4xl font-bold my-8'>My Bids : <span className="text-violet-600">{data?.bids?.length}</span></caption>
                        <thead>
                            <tr className="bg-gray-200">
                                <th>SL no.</th>
                                <th>Product</th>
                                <th>Seller</th>
                                <th>Bid Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {
                                data?.bids?.map((e, i) => {
                                    const p = data.products.find(f => f._id == e.product)
                                    return (
                                        <tr key={i} className="border border-gray-300 bg-white">
                                            <td>{i + 1}</td>
                                            <td>
                                                <div className="flex flex-wrap justify-center items-center gap-2">
                                                    <ImgManager imgUrl={p.image} altTxt={"product Image"} styles={"h-16 w-auto rounded-sm object-center object-contain"} />
                                                    <span>
                                                        <p className="font-semibold text-sm">{p?.title}</p>
                                                        <p className="text-xs">$ {p?.price_max} - {p?.price_min}</p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-wrap justify-center items-center gap-2">
                                                    <ImgManager imgUrl={e.buyer_image} altTxt={"buyer Image"} styles={"h-7 aspect-square rounded-full object-center object-contain"} />
                                                    <span>
                                                        <p className="font-semibold">{e.buyer_name}</p>
                                                        <p className="text-xs">{e.buyer_email}</p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>$ {e.bid_price}</td>
                                            <td><span className={`${e.status === 'confirmed' ? "bg-emerald-700" : "bg-violet-600"} rounded-full px-4 text-white py-1 h-10`}>{e.status}</span></td>
                                            <td>{e.category}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    :
                    <p className="text-3xl font-semibold text-center">No Bid <span className="text-violet-600">Found!</span></p>
            }
        </main>
    )
}