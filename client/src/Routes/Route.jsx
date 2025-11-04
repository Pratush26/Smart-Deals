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

const user = "office.supplies@email.com";
export const router  = createBrowserRouter([{
    path: '/',
    Component: App,
    children: [
        {
            index: true,
            loader: () => axios(`${import.meta.env.VITE_BACKEND}latest-products`),
            Component: Homepage
        },
        {
            path: '/all-products',
            loader: () => axios(`${import.meta.env.VITE_BACKEND}products`),
            Component: AllProductsPage
        },
        {
            path: '/my-products',
            loader: () => axios(`${import.meta.env.VITE_BACKEND}productsByEmail/${user}`),
            Component: MyProductsPage
        },
        {
            path: '/my-bids',
            loader: () => axios(`${import.meta.env.VITE_BACKEND}myBids/${user}`),
            Component: MyBidsPage
        },
        {
            path: '/details/:id',
            loader: async ({params}) => {
                const ProductInfo = await axios(`${import.meta.env.VITE_BACKEND}productById/${params.id}`)
                const ProductBidInfo = await axios(`${import.meta.env.VITE_BACKEND}bidsById/${params.id}`)
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
            Component: CreateProductPage
        },
    ]
}])