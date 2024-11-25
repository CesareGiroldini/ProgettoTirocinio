import React, {createContext, useContext, useEffect, useState} from 'react';
import {findBestMove} from '../utils/minmax.js';
import {saveMatch} from "../services/UserService.js";
import {AuthContext} from "./AuthContext.jsx";

const GameContext = createContext(undefined);

export const GameProvider = ({children}) => {
    const initialBoard = Array(9).fill('');
    const [board, setBoard] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [gameMode, setGameMode] = useState(null);
    const [winner, setWinner] = useState(null);
    const [opponentName, setOpponentName] = useState('');
    const [matchResult, setMatchResult] = useState(null);
    const {user} = useContext(AuthContext);

    const chooseMode = (mode) => {
        setGameMode(mode);
    };

    useEffect(() => {
        if (winner === "O") {
            setMatchResult('WIN');
            saveGameResult();
        }
        else if (winner === 'X'){
            setMatchResult('LOSE');
            saveGameResult();
        }
    }, [winner]);

    const checkWinner = (newBoard) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                setWinner(newBoard[a]);
                return;
            }
        }

        if (!newBoard.includes('')) {
            setWinner('Draw');
        }
    };

    const makeMove = (index) => {
        if (board[index] === '' && !winner) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            checkWinner(newBoard);

            if (!winner && gameMode === 'PvC' && currentPlayer === 'X') {
                setTimeout(() => makeCPUMove(newBoard), 500);
            } else {
                setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
            }
        }
    };

    const makeCPUMove = (currentBoard) => {
        const cpuMove = findBestMove(currentBoard);
        if (cpuMove !== -1) {
            const newBoard = [...currentBoard];
            newBoard[cpuMove] = 'O';
            setBoard(newBoard);
            checkWinner(newBoard);
            setCurrentPlayer('X');
        }
    };

    const saveGameResult = () => {
        const matchData = {
            user: user,
            opponent: gameMode === 'PvC' ? 'CPU' : opponentName,
            result: winner === 'Draw' ? 'DRAW' : matchResult,
            date: new Date().toISOString().split('T')[0]
        };

        saveMatch(matchData).then(savedMatch => {
            if (savedMatch) {
                console.log("Match saved successfully:", savedMatch);
            }
        });
    };


    const resetGame = () => {
        setBoard(initialBoard);
        setCurrentPlayer('X');
        setGameMode(null);
        setWinner(null);
    };

    return (
        <GameContext.Provider value={{board, currentPlayer, gameMode, chooseMode, makeMove, resetGame, winner, opponentName, setOpponentName}}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame deve essere usato dentro GameProvider');
    }
    return context;
};
