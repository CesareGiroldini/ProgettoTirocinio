import { Navigate, Outlet } from 'react-router';
import {useAuth} from "../contexts/AuthContext.jsx";
import Admin from "../pages/Admin.jsx";

export default function PrivateRoute() {
    const {userRole} = useAuth();
    const token = localStorage.getItem('token');
    if(userRole === 'admin'){
        return token ? <Admin /> : <Navigate to="/login" />;
    }
    return token ? <Outlet /> : <Navigate to="/login" />;
}
