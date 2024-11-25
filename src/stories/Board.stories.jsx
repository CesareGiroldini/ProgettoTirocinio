import { useState } from 'react';
import Board from '../components/Board.jsx';
import '../components/css/Board.css';
import '../style.css';

export default {
    title: 'TicTacToe/Board',
    component: Board,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Il componente **Board** rappresenta l’intera griglia di gioco del Tic Tac Toe. Può visualizzare lo stato corrente della partita e reagire agli eventi di clic sulle celle.',
            },
        },
    },
    argTypes: {
        board: {
            description: 'Un array di 9 stringhe che rappresentano lo stato della griglia (X, O, o vuoto).',
            control: { type: 'array' },
        },
        onCellClick: {
            description: 'Funzione chiamata quando una cella viene cliccata. Riceve l’indice della cella come parametro.',
            action: 'clicked',
        },
    },
};

const InteractiveTemplate = (args) => {
    const [board, setBoard] = useState(args.board || Array(9).fill(''));
    const [nextPlayer, setNextPlayer] = useState('X');

    const handleCellClick = (index) => {
        if (board[index] === '') {
            const newBoard = [...board];
            newBoard[index] = nextPlayer;
            setBoard(newBoard);
            setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
        }
    };

    return <Board board={board} onCellClick={handleCellClick} />;
};

export const InteractiveBoard = InteractiveTemplate.bind({});
InteractiveBoard.args = {
    board: ['', '', '', '', '', '', '', '', ''],
};
InteractiveBoard.storyName = 'Interactive Board';
InteractiveBoard.parameters = {
    docs: {
        description: {
            story: 'Una griglia interattiva che consente di simulare le mosse dei giocatori cliccando sulle celle.',
        },
    },
};

export const DefaultBoard = (args) => <Board {...args} />;
DefaultBoard.args = {
    board: ['', '', '', '', '', '', '', '', ''],
    onCellClick: (index) => console.log(`Cell ${index} clicked`),
};
DefaultBoard.storyName = 'Empty Board';
DefaultBoard.parameters = {
    docs: {
        description: {
            story: 'Una griglia vuota senza alcun simbolo presente nelle celle.',
        },
    },
};

export const FilledBoard = (args) => <Board {...args} />;
FilledBoard.args = {
    board: ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'],
    onCellClick: (index) => console.log(`Cell ${index} clicked`),
};
FilledBoard.storyName = 'Board with Symbols';
FilledBoard.parameters = {
    docs: {
        description: {
            story: 'Una griglia completamente piena con simboli "X" e "O" distribuiti nelle celle.',
        },
    },
};
