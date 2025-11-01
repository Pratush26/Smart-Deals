import { Link, useLoaderData } from "react-router"
import { FaArrowLeftLong } from "react-icons/fa6";
import ImgManager from "../Components/ImgManager";

export default function ProductDetailsPage() {
    const { data, bids } = useLoaderData()
    console.log(bids)
    return (
        <main className="w-11/12 mx-auto">
            <section className="grid grid-cols-2 place-content-center my-8 gap-6">
                <div>
                    <ImgManager imgUrl={data.image} altTxt={"Product Image"} styles={"w-full h-auto mb-4 rounded-lg shadow-lg/70 shadow-gray-700"} />
                    <section>
                        <h4 className="text-2xl font-semibold">Product Description</h4>
                        <div className="flex items-center justify-between gap-2 flex-wrap my-2 font-medium text-gray-800">
                            <p><span className="text-violet-600">Condition : </span>{data.condition}</p>
                            <p><span className="text-violet-600">Usage Time : </span>{data.usage}</p>
                        </div>
                        <hr className="border-none h-0.5 bg-gray-400 rounded-full" />
                        <article className="font-medium text-sm text-gray-600 my-2">{data.description}</article>
                    </section>
                </div>
                <aside>
                    <Link className="text-lg hover:text-gray-600 flex gap-2 items-center trnsition" to='/all-products'><FaArrowLeftLong /> Back to Products</Link>
                    <h1 className="text-3xl font-semibold my-4">{data.title}</h1>
                    <span className="bg-violet-600 text-white px-4 py-2 rounded-full text-xs font-semibold">{data.category}</span>
                    <h3 className="bg-white rounded-lg my-4 text-xl font-semibold text-violet-800 px-3 py-4">Price : $ {data.price_min} - {data.price_max}</h3>
                    <div className="bg-white rounded-lg px-3 py-4 text-sm space-y-2">
                        <h5 className="text-xl font-semibold">Product Details</h5>
                        <p><span className="font-semibold">Product ID : </span>{data._id}</p>
                        <p><span className="font-semibold">Posted : </span>{data.created_at}</p>
                    </div>
                    <div className="bg-white rounded-lg my-4 text-sm  px-3 py-4 space-y-0.5">
                        <h4 className="text-xl font-bold">Seller Information</h4>
                        <div className="flex items-center gap-3 my-3">
                            <ImgManager imgUrl={data.seller_image} altTxt={"seller Image"} styles={"h-16 aspect-square rounded-full object-center object-contain"} />
                            <span>
                                <p className="font-semibold">{data.seller_name}</p>
                                <p className="text-xs font-medium text-gray-500">{data.email}</p>
                            </span>
                        </div>
                        <p><span className="font-semibold">Location : </span>{data.location}</p>
                        <p><span className="font-semibold">Contact : </span>{data.seller_contact}</p>
                        <p><span className="font-semibold">Status : </span>{data.status}</p>
                    </div>
                    <button className="btn trnsition w-full">I want to buy this product</button>
                </aside>
            </section>
            <section className="my-6">
                <h2 className='text-4xl font-bold my-4'>Bids For This Products : <span className="text-violet-600">{bids.length}</span></h2>
                <table className="table-auto text-center border-separate border border-gray-400 w-full">
                    <thead>
                        <tr>
                            <th>SL no.</th>
                            <th>Buyer</th>
                            <th>Bid Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bids.map((e, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td className="flex flex-wrap justify-center items-center gap-2">
                                        <ImgManager imgUrl={e.buyer_image} altTxt={"buyer Image"} styles={"h-7 aspect-square rounded-full object-center object-contain"} />
                                        <div>
                                            <p className="font-semibold">{e.buyer_name}</p>
                                            <p className="text-xs">{e.buyer_email}</p>
                                        </div>
                                    </td>
                                    <td>${e.bid_price}</td>
                                    <td>{e.bid_price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </main>
    )
}