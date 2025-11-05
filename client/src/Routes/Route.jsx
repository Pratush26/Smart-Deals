import { createBrowserRouter } from "react-router";
import App from "../App";
import axios from 'axios';
import Homepage from "../Pages/Home";
import AllProductsPage from "../Pages/AllProduct";
import RegisterPage from "../Pages/Register";
import LoginPage from "../Pages/Login";
import CreateProductPage from "../Pages/CreateProductForm";
import MyProductsPage from "../Pages/MyProducts";
import MyBidsPage from "../Pages/MyBids";
import ProductDetailsPage from "../Pages/Details";
import notFoundPage from "../Pages/notFound";
import ErrorPage from "../Layout/ErrorPage";
import LoadingPage from "../Layout/Loading";
import PrivateRoute from "../Utils/PrivateRoute";

export const router  = createBrowserRouter([{
    path: '/',
    hydrateFallbackElement: <LoadingPage />,
    Component: App,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            loader: () => axios(`${import.meta.env.VITE_BACKEND}/latest-products`),
            Component: Homepage
        },
        {
            path: '/all-products',
            loader: () => axios.get(`${import.meta.env.VITE_BACKEND}/products`),
            element: <PrivateRoute><AllProductsPage /></PrivateRoute>
        },
        {
            path: '/my-products',
            Component: MyProductsPage
        },
        {
            path: '/my-bids',
            Component: MyBidsPage
        },
        {
            path: '/details/:id',
            loader: async ({params}) => {
                const ProductInfo = await axios(`${import.meta.env.VITE_BACKEND}/productById/${params.id}`)
                const ProductBidInfo = await axios(`${import.meta.env.VITE_BACKEND}/bidsById/${params.id}`)
                return {data: ProductInfo.data, bids: ProductBidInfo.data}
            },
            Component: ProductDetailsPage
        },
        {
            path: '/register',
            Component: RegisterPage
        },
        {
            path: '/login',
            Component: LoginPage
        },
        {
            path: '/create-product',
            loader: () => axios.get(`${import.meta.env.VITE_BACKEND}/categories`),
            Component: CreateProductPage
        },
        {
            path: '*',
            Component: notFoundPage
        }
    ]
}])