import React from 'react';
import ReactDom from 'react-dom'
//import ButtonAppBar from './components/appBar';
import ResponsiveDrawer from './components/menu'

const App = () => {
    return(
        <div>
            <ResponsiveDrawer />
        </div>
    )
}



ReactDom.render(<App />, document.getElementById('root'))
