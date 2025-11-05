import { Link, Navigate, useLoaderData } from 'react-router'
import '../utils/utility.css'
import { useContext, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../Context/AuthContext'
import useAxios from '../Hooks/useAxios'

export default function CreateProductPage() {
    const [msg, setMsg] = useState({})
    const { user } = useContext(AuthContext)
    const axis = useAxios()
    const { data } = useLoaderData()
    const handleCreate = (e) => {
        e.preventDefault();
        const obj = {
            title: e.target.productName.value,
            price_min: e.target.minPrice.value,
            price_max: e.target.maxPrice.value,
            email: user.email,
            category: e.target.category.value,
            created_at: new Date().toISOString(),
            image: e.target.image.value,
            status: "pending",
            location: e.target.location.value,
            seller_image: user.photoURL,
            seller_name: user.displayName,
            condition: e.target.condition.value,
            usage: e.target.usage.value,
            description: e.target.description.value,
            seller_contact: e.target.phone.value
        }
        console.log(obj)
        axis.post('/createProduct', obj).then(res => {
            e.target.reset()
            if(res.data.insertedId) console.log("successfull")
        }).catch(err => setMsg({ type: "err", message: err.message }))
    }
    return (
        <form
            onSubmit={handleCreate}
            className="bg-white w-1/2 mx-auto p-4 m-8 shadow-lg/50 shadow-gray-400">
            <h1 className='text-3xl font-bold text-center my-8'>Create <span className="text-violet-600">new Products</span></h1>
            {msg && <p className={`${msg.type === 'err' ? 'text-red-600' : 'text-green-600'} w-11/12 mx-auto my-2`}>{msg.message}</p>}
            <fieldset className='w-11/12 mx-auto space-y-3'>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" name="productName" id="productName" placeholder="Enter product name" />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" name="phone" id="phone" placeholder="Enter your phone number" />
                </div>
                <section className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="minPrice">Minimum Price:</label>
                        <input type="number" name="minPrice" id="lominPricecation" placeholder="Enter minimum price amount" />
                    </div>
                    <div>
                        <label htmlFor="maxPrice">Max Price:</label>
                        <input type="number" name="maxPrice" id="maxPrice" placeholder="Enter maximum price amount" />
                    </div>
                    <div>
                        <label htmlFor="category">Category:</label>
                        <input type="text" name="category" id="categoryInput" className="input" placeholder="Enter Category" list="category" />
                        <datalist id="category">
                            {
                                data?.map(e => <option key={e._id} value={e.name}>{e.name}</option>)
                            }
                        </datalist>
                    </div>
                    <div className='rdio'>
                        <legend>Condition:</legend>
                        <div className='flex items-center justify-around'>
                            <span>
                                <input type="radio" id="fresh" name="condition" value="fresh" />
                                <label htmlFor="fresh">Fresh</label>
                            </span>
                            <span>
                                <input type="radio" id="used" name="condition" value="used" defaultChecked />
                                <label htmlFor="used">Used</label>
                            </span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="location">Location:</label>
                        <input type="text" name="location" id="location" placeholder="Enter Location" />
                    </div>
                    <div>
                        <label htmlFor="usage">Usage:</label>
                        <input type="text" name="usage" id="usage" placeholder="Enter usage time (e.g. Brand New)" />
                    </div>
                </section>
                <div>
                    <label htmlFor="image">Product's Image:</label>
                    <input type="url" name="image" id="image" placeholder="Give product image url" />
                </div>
                <div>
                    <label htmlFor="description">Product's Description:</label>
                    <textarea name="description" id="description" placeholder='Enter product description'></textarea>
                </div>
                <div className='w-fit mx-auto my-4'>
                    <button className='btn trnsition'>Create</button>
                </div>
            </fieldset>
        </form >
    )
}