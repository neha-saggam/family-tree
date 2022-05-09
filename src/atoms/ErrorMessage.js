import React from 'react';

export const ErrorMessage = ({ children }) => {
    console.info(children);
    return <p style={{ color: 'red', fontSize: '15px' }}>{children}</p>
}
