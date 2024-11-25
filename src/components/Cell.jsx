import PropTypes from 'prop-types';
import './css/Cell.css'

export default function Cell({ value, onClick }) {
    const cellClass = value ? `cell ${value.toLowerCase()}` : 'cell';

    return (
        <button className={cellClass} onClick={onClick}>
            {value}
        </button>
    );
}

Cell.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};
