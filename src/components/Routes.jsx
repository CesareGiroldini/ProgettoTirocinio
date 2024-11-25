import Game from "../pages/Game.jsx";
import Matches from "../pages/Matches.jsx";
import Login from "../pages/Login.jsx";
import Menu from "../pages/Menu.jsx";
import Register from "../pages/Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import PrivateRoute from "./PrivateRoute.jsx";

export default function Routes() {

    const routes = [

        { path: "/", element: <Login /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },

        {
            path: "/",
            element: <PrivateRoute />,
            children: [
                { path: "menu", element: <Menu /> },
                { path: "game", element: <Game /> },
                { path: "games", element: <Matches /> },
            ]
        }
    ];

    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
}
