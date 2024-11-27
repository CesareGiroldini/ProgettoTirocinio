import  { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../services/userService';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedUserRole = localStorage.getItem('userRole');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedUserRole && storedToken) {
            setUser(JSON.parse(storedUser));
            setUserRole(JSON.parse(storedUserRole));
            setToken(storedToken);
        }
    }, []);

    const login = async (username, password) => {
        const userData = await loginUser(username, password);
        if(!userData.active) {
            return null;
        }
        if (userData && userData.token) {
            setUser(userData.username);
            setUserRole(userData.role);
            setToken(userData.token);

            localStorage.setItem('user', JSON.stringify(userData.username));
            localStorage.setItem('userRole', JSON.stringify(userData.role));
            localStorage.setItem('token', userData.token);

            console.log('ecco il nostro utente: ' + userData.username);
            console.log('ecco il suo ruolo: ' + userData.role);
            console.log('ecco il token: ' + userData.token);
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setUserRole(null);
        setToken(null);

        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, userRole, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
