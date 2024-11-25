import React from 'react';
import {AuthProvider} from './contexts/AuthContext';
import {GameProvider} from './contexts/GameContext';
import {LoadingProvider} from "./contexts/LoadingContext.jsx";
import {Spinner} from "./components/Spinner.jsx";
import Routes from './components/Routes';


export default function App() {
    return (
        <AuthProvider>
            <GameProvider>
                <LoadingProvider>
                    <Spinner/>
                    <Routes />
                </LoadingProvider>
            </GameProvider>
        </AuthProvider>
    );
}

