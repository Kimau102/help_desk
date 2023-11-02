import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { socket } from './socket'

socket.on('new-ticket', (data) => {
	console.log(data)
})

const root = document.getElementById('root')

ReactDom.createRoot(root).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
