import { Link } from "react-router";
import ImgManager from "./ImgManager";

export default function ProductCard({ e }) {
    return (
        <div key={e._id} className='rounded-sm shadow-lg/50 shadow-gray-600 overflow-hidden'>
            <ImgManager imgUrl={e.image} altTxt={"Product Image"} />
            <p className='m-3 mb-0 font-bold'>{e.title}</p>
            <span className='flex items-center justify-between gap-2 m-4 mt-2 font-medium text-sm'>
                <p>${e.price_max} - {e.price_min}</p>
                <Link to={`/details/${e._id}`} className='px-3 py-1 text-sm font-semibold cursor-pointer text-violet-700 border border-purple-700 hover:text-purple-950 hover:border-purple-950 rounded-sm trnsition'>
                    View Details
                </Link>
            </span>
        </div>
    )
}