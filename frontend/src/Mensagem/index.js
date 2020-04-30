import React from 'react';

//HOC Aux
import Aux from '../HOC'

import './style.css'

const Message = ({ data, name, hora, message }) => {
    return (
        <Aux>
            <p>{data} <b>{name}</b> {hora} => {message}</p>
        </Aux>
    )
}

export default Message