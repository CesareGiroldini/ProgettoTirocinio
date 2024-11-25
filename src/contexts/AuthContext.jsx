import React, { createContext, useContext, useState } from 'react';
import { loginUser } from '../services/userService';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (username, password) => {
        const userData = await loginUser(username, password);
        if (userData && userData.token) {
            setUser(userData.username);
            setToken(userData.token);
            localStorage.setItem('token', userData.token);
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
