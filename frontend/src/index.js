import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

// window.addEventListener('load', async () => {
//     const resMsg = await fetch('/allTickets')
//     console.log(resMsg)
//   })

ReactDom.render(<App />, document.getElementById('root'));
