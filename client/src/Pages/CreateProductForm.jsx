import { Link, Navigate } from 'react-router'
import '../utils/utility.css'
import { useContext, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function CreateProductPage() {
    const [msg, setMsg] = useState({})
    // const { user, createUser, updateUser, googleSignIn, githubSignIn } = useContext(AuthContext)

    // if (user) return <Navigate to="/" ></Navigate>
    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     createUser(e.target.email.value, e.target.password.value).then(() => {
    //         updateUser(e.target.name.value, e.target.imgaeUrl.value).then(() => {
    //             setMsg({ type: "success", message: "Successfully Registered User" })
    //             e.target.reset()
    //         }).catch((c) => {
    //             setMsg({ type: "err", message: c.message })
    //         })
    //     }).catch((c) => {
    //         setMsg({ type: "err", message: c.message })
    //     })

    // }
    return (
        <form
            // onSubmit={handleRegister}
            className="bg-white w-1/2 mx-auto p-4 m-8 shadow-lg/50 shadow-gray-400">
            <h1 className='text-3xl font-bold text-center my-8'>Create <span className="text-violet-600">new Products</span></h1>
            {msg && <p className={`${msg.type === 'err' ? 'text-red-600' : 'text-green-600'}`}>{msg.message}</p>}
            <fieldset className='grid grid-cols-2 gap-1'>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" placeholder="Enter your name" />
                </div>
                <button className='btn w-fit mx-auto my-4 col-span-2'>Create</button>
            </fieldset>
        </form>
    )
}