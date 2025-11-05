import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router";

export default function PrivateRoute({children}) {
    const {user} = useContext(AuthContext)
    if(!user) return <Navigate to='/' />;
    return children;
}