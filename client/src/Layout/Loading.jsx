import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";

export default function LoadingPage() {
    return (
        <div className='flex flex-col items-center justify-between min-h-screen'>
            <Navbar />
            <Loader />
            <Footer />
        </div>
    )
}