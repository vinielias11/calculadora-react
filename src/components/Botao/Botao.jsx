import React from 'react';
import './Botao.css';

const Botao = ({ className, valor, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            { valor }
        </button>
    );
};

export default Botao;