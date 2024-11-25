import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router';
import {AuthContext} from '../contexts/AuthContext';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import './css/Menu.css';
import {useGame} from "../contexts/GameContext.jsx";
import {useTranslation} from "react-i18next";
import LanguageSelector from "../components/LanguageSelector.jsx";

const Menu = () => {
    const cssClasses = "animation-duration-1000 animation-iteration-1 flex align-items-center justify-content-center\n" +
        "        font-bold border-round m-2 px-5 py-3";
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {user, logout} = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const {chooseMode} = useGame();

    const handleStartGame = () => {
        setVisible(true);
    };

    const handleSelectMode = (selectedMode) => {
        chooseMode(selectedMode);
        setVisible(false);
        navigate('/game');
    };

    const handleViewGames = () => {
        navigate('/games');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <LanguageSelector />
            <Card title={`${t('welcome')} ${user}!`} className="menu-card">
                <div className="button-group">
                    <Button
                        label={t('start_game')}
                        icon="pi pi-play"
                        onClick={handleStartGame}
                        className={"fadeinright " + cssClasses}
                    />
                    <Button
                        label={t('matches')}
                        icon="pi pi-list"
                        onClick={handleViewGames}
                        className={"fadeinleft " + cssClasses}
                    />
                    <Button
                        label={t('logout')}
                        icon="pi pi-sign-out"
                        onClick={handleLogout}
                        className={"fadeindown " + cssClasses}
                    />
                </div>
            </Card>

            <Dialog header={t('select_game_mode')} closeIcon="pi pi-times" draggable={false} visible={visible}
                    onHide={() => setVisible(false)} style={{width: '30vw'}}>
                <div className="flex flex-column align-items-center">
                    <Button label={t('player_vs_player')} onClick={() => handleSelectMode('PvP')}
                            className="p-button-success m-2 w-14rem"/>
                    <Button label={t('player_vs_cpu')} onClick={() => handleSelectMode('PvC')}
                            className="p-button-warning m-2 w-14rem"/>
                </div>
            </Dialog>
        </>
    );
};

export default Menu;
