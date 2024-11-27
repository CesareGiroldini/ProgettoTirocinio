import React, {useEffect, useState} from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {useGame} from '../contexts/GameContext';
import Board from '../components/Board.jsx';
import './css/Game.css';
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import PlayerCard from "../components/PlayerCard.jsx";
import iconO from '../assets/icon_PlayerO.png'
import iconX from '../assets/icon_PlayerX.png'

const GamePage = () => {
    const {
        board,
        currentPlayer,
        makeMove,
        resetGame,
        winner,
        gameMode,
        chooseMode,
        opponentName,
        setOpponentName
    } = useGame();
    const [showGameEndDialog, setShowGameEndDialog] = useState(false);
    const [showOpponentDialog, setShowOpponentDialog] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        if (winner) {
            setShowGameEndDialog(true);
        }
    }, [winner]);

    useEffect(() => {
        if (gameMode === 'PvP') {
            setShowOpponentDialog(true);
        }
    }, [gameMode]);

    const handleOpponentSubmit = () => {
        setShowOpponentDialog(false);
    };

    const handleCloseGameEndDialog = () => {
        setShowGameEndDialog(false);
        resetGame();
    };

    const renderGameEndDialog = () => (
        <Dialog header="🏆 Game Over 🏆" visible={showGameEndDialog} onHide={handleCloseGameEndDialog} draggable={false}
                closable={false} headerClassName="text-center">
            <div className="dialog-content">
                <p>{winner === 'Draw' ? t('draw') : `${t('winner_result')} ${winner} 🎉`}</p>
                <Button label={t('restart_game')} onClick={handleCloseGameEndDialog} className="p-button-success"/>
            </div>
        </Dialog>
    );

    const renderOpponentDialog = () => (
        <Dialog header={t('enter_opp_name')} visible={showOpponentDialog} onHide={() => setShowOpponentDialog(false)}
                draggable={false} closable={false}>
            <div className="field">
                <label htmlFor="opponentName" className="headerDialog">{t('insert_name')}:</label>
                <InputText
                    id="opponentName"
                    value={opponentName}
                    onChange={(e) => setOpponentName(e.target.value)}
                    className="w-full"
                />
            </div>
            <Button label={t('start_game')} onClick={handleOpponentSubmit} className="p-button-primary mt-2"/>
        </Dialog>
    );

    return (
        <div className="game-page">
            <Card className="game-card justify-content-center text-center">
                <h1 className="game-title">
                    <span className="title-box title-red">Tic</span>
                    <span className="title-box title-yellow">Tac</span>
                    <span className="title-box title-blue">Toe</span>
                </h1>
                {!gameMode ? (
                    <div className="button-group">
                        <Button label={t('player_vs_player')} onClick={() => chooseMode('PvP')} className="button"/>
                        <Button label={t('player_vs_cpu')} onClick={() => chooseMode('PvC')} className="button"/>
                        <Button label={t('back_to_menu')} onClick={() => navigate('/menu')} className="button"/>
                    </div>
                ) : (
                    <>
                        <Board board={board} onCellClick={makeMove} className="board"/>
                        <div className="game-info">
                            {gameMode === 'PvP' ? (<PlayerCard
                                nextPlayer={currentPlayer}
                                avatar={currentPlayer === 'X' ? iconX : iconO}/>): ""}
                            <Button label={t('restart_game')} onClick={resetGame} className="restartButton p-button-danger mt-3"/>
                        </div>
                        {renderGameEndDialog()}
                        {renderOpponentDialog()}
                    </>
                )}
            </Card>
        </div>
    );
};

export default GamePage;
