import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND,
});

const useAxios = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const interceptor = instance.interceptors.request.use((config) => {
            if (user?.accessToken) config.headers.Authorization = `Bearer ${user.accessToken}`;
            return config;
        })
        return () => instance.interceptors.request.eject(interceptor);
    }, [user?.accessToken]);

    return instance;
};

export default useAxios;