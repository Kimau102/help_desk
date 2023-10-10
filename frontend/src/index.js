import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

const root = document.getElementById('root');
ReactDom.createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)