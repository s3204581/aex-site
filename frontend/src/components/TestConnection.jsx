import React, { useState } from 'react';

function TestConnectionButton() {
    const [message, setMessage] = useState('');

    const testConnection = () => {
        fetch('http://backend:3001/test')
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
            })
            .catch(error => {
                setMessage('Failed to connect to backend.');
            });
    };

    return (
        <div>
            <button onClick={testConnection}>Test Connection</button>
            <p>{message}</p>
        </div>
    );
}

export default TestConnectionButton;
