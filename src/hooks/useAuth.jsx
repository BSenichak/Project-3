import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const useAuth = () => {
    const navigate = useNavigate(); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); 
    }, []);
    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/");
    };
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
    };
    return { isAuthenticated, login, logout };
};
