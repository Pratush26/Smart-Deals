import { Link, useLoaderData } from "react-router"
import { FaArrowLeftLong } from "react-icons/fa6";
import ImgManager from "../Components/ImgManager";
import { useContext, useRef } from "react";
import '../utils/utility.css'
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";

export default function ProductDetailsPage() {
    const { data, bids } = useLoaderData()
    const { user } = useContext(AuthContext)
    const modalRef = useRef(null)
    const axis = useAxios()
    const handleBuy = () => modalRef.current.showModal()
    const handleBid = (e) => {
        e.preventDefault();
        const obj = {
            product: data._id,
            buyer_image: user.photoURL,
            buyer_name: user.displayName,
            buyer_contact: e.target.contactInfo.value,
            buyer_email: user.email,
            bid_price: e.target.bidingPrice.value,
            status: "pending",
        }
        axis.post('/createBid', obj).then(res => {
            e.target.reset()
            if(res.data.insertedId) console.log("successfull")
        }).catch(err => console.error(err))
    }
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
                    <button onClick={handleBuy} className="btn trnsition w-full">I want to buy this product</button>
                </aside>
            </section>
            <section className="my-6">
                <h2 className='text-4xl font-bold my-4'>Bids For This Products : <span className="text-violet-600">{bids.length}</span></h2>
                <table className="table-auto text-center text-sm font-medium border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>SL no.</th>
                            <th>Buyer</th>
                            <th>Bid Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {
                            bids.map((e, i) => (
                                <tr key={i} className="border border-gray-300 bg-white">
                                    <td>{i + 1}</td>
                                    <td className="flex flex-wrap justify-center items-center gap-2">
                                        <ImgManager imgUrl={e.buyer_image} altTxt={"buyer Image"} styles={"h-7 aspect-square rounded-full object-center object-contain"} />
                                        <div>
                                            <p className="font-semibold ">{e.buyer_name}</p>
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
            {/* modal section */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form
                        onSubmit={handleBid}
                        className="mt-5">
                        <h3 className="font-bold text-lg text-center">Give Seller Your Offered Price</h3>
                        <fieldset className='flex flex-col gap-1'>
                            <label htmlFor="bidingPrice">Place your Price:</label>
                            <input type="number" required='true' name="bidingPrice" id="bidingPrice" placeholder="e.g. $ (Dollar)" />
                            <label htmlFor="contactInfo">Contact Info:</label>
                            <input type="tel" required='true' name="contactInfo" id="contactInfo" placeholder="Enter your contact info" />
                            <button className='btn w-fit mx-auto my-3'>Submit Bid</button>
                        </fieldset>
                    </form>
                    <div className="modal-action mt-0">
                        <form method="dialog" className="mx-auto">
                            <button className="px-4 py-2 text-sm font-semibold text-violet-700 border border-purple-700 hover:text-purple-950 hover:border-purple-950 rounded-sm trnsition cursor-pointer">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* modal section */}
        </main>
    )
}