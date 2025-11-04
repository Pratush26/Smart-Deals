import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function PrivateRoute({children}) {
    const {user} = useContext(AuthContext)
    if(!user) return;
    return children;
}