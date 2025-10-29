import { createBrowserRouter } from "react-router";
import App from "../App";
import Homepage from "../Pages/Home";

export const router  = createBrowserRouter([{
    path: '/',
    Component: App,
    children: [
        {
            index: true,
            Component: Homepage
        }
    ]
}])