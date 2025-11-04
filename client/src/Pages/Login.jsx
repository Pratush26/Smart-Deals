import { Link, Navigate } from 'react-router'
import '../utils/utility.css'
import { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { AuthContext } from '../Context/AuthContext'

export default function LoginPage() {
    const [msg, setMsg] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const { user, createUser, updateUser, googleSignIn } = useContext(AuthContext)

    if (user) return <Navigate to="/" ></Navigate>
    const handleRegister = (e) => {
        e.preventDefault();
        createUser(e.target.email.value, e.target.password.value).then(() => {
            updateUser(e.target.name.value, e.target.imgaeUrl.value).then(() => {
                setMsg({ type: "success", message: "Successfully Registered User" })
                e.target.reset()
            }).catch((c) => {
                setMsg({ type: "err", message: c.message })
            })
        }).catch((c) => {
            setMsg({ type: "err", message: c.message })
        })

    }
    const googleLogin = () => {
        googleSignIn().then(() => setMsg({ type: "success", message: "Successfully Signed in" })).catch((c) => {
            setMsg({ type: "err", message: c.message })
        })
    }
    return (
        <form
            onSubmit={handleRegister}
            className="bg-white w-1/2 mx-auto p-4 m-8 shadow-lg/50 shadow-gray-400">
            <h1 className="flex items-center justify-center text-center text-2xl font-bold my-4" >Login</h1>
            {msg && <p className={`${msg.type === 'err' ? 'text-red-600' : 'text-green-600'}`}>{msg.message}</p>}
            <fieldset className='flex flex-col gap-1'>
                <label htmlFor="email">Email:</label>
                <input type="email" required='true' name="email" id="email" placeholder="Enter your email" />
                <label htmlFor="password">Password:</label>
                <div className='relative flex items-center justify-center'>
                    <input type={`${showPassword ? 'text' : 'password'}`} name="password" id="password" placeholder='Enter your password' />
                    <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute p-1 right-7 top-1/2 -translate-y-1/2 cursor-pointer'>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <p className="m-2 text-center text-sm">Don't have account? <Link to="/register" className="text-blue-500 hover:text-blue-600 font-medium">Register</Link></p>
                    <button className='btn w-fit'>Login</button>
                    <button
                        onClick={googleLogin}
                        type="button"
                        className="flex items-center justify-center gap-3 rounded-sm border px-4 py-2 text-sm font-medium hover:text-sky-800 w-fit cursor-pointer trnsition"><FcGoogle />
                        Login with Google
                    </button>
                </div>
            </fieldset>
        </form>
    )
}