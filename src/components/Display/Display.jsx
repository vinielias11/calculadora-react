import React from 'react';
import { Textfit } from 'react-textfit';
import './Display.css';

const Display = ({ valor }) => {
    return (
        <Textfit className='display' mode='single' max={70}>
            { valor }
        </Textfit>
    );
};

export default Display;