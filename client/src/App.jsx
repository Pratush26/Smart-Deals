import { Outlet, useNavigation } from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Loader from './Components/Loader'

function App() {
  const { state } = useNavigation()

  return (
    <div className='flex flex-col items-center justify-between min-h-screen'>
      <Navbar />
      {
        state === 'loading' ?
          <Loader />
          :
          <Outlet />
      }
      <Footer />
    </div>
  )
}

export default App
