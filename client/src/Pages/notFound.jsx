import { Link } from "react-router";
import '../Utils/utility.css'

export default function notFoundPage() {
    return (
        <main className="flex flex-col items-center justify-center gap-1 my-3">
            <h1 className="text-5xl font-bold animate-pulse">404!</h1>
            <p className="font-semibold text-violet-900">The page you are looking for is not found.</p>
            <p className="text-sm">Please try again or refresh the page.</p>
            <Link to='/' className="btn mt-3">Go Back Home</Link>
        </main>
    )
}