import { Link, useRouteError } from "react-router"
import '../Utils/utility.css'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

export default function ErrorPage() {
    const { message } = useRouteError()
    return (
        <div className='flex flex-col items-center justify-between min-h-screen'>
            <Navbar />
            <main className="flex flex-col items-center justify-center gap-1 my-3">
                <h1 className="text-3xl font-bold">Something went wrong!</h1>
                <p className="font-medium text-violet-900 animate-bounce">{message}</p>
                <p className="text-sm">Please try again or refresh the page.</p>
                <Link to='/' className="btn mt-3">Go Back Home</Link>
            </main>
            <Footer />
        </div>
    )
}