import React from 'react';
import DrawerBar from './modules/menu';
import NewTicketAlert from './components/alert'

const App = () => {
	return (
		<>
			<DrawerBar />
			<div style={{
				position: 'fixed',
				bottom: "10px",
				right: '10px'
			}}>
				<NewTicketAlert />
			</div>
		</>
	);
};

export default App