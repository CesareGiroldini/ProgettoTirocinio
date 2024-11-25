import { Navigate, Outlet } from 'react-router';

export default function PrivateRoute() {
    const token = localStorage.getItem('token');
    console.log(token);
    return token ? <Outlet /> : <Navigate to="/login" />;
}
