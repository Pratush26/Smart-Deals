import { Link, NavLink } from "react-router";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between w-11/12 mx-auto">
            <Link to='/'>Smart<span>Deals</span></Link>
            <div>
                <NavLink to='/'></NavLink>
                <NavLink to='/'></NavLink>
                <NavLink to='/'></NavLink>
                <NavLink to='/'></NavLink>
                <NavLink to='/'></NavLink>
            </div>
            <div className="h-4 w-4 bg-amber-300">

            </div>
        </nav>
    )
}