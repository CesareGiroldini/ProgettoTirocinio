import Cell from './Cell';
import './css/Board.css'

export default function Board({ board, onCellClick }) {
    return (
        <div className="board">
            {board.map((cell, index) => (
                <Cell key={index} value={cell} onClick={() => onCellClick(index)} />
            ))}
        </div>
    );
}
