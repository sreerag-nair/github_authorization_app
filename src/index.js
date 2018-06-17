import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import OpenInSamePage from './OpenInSamePage';

ReactDOM.render(
    <Router >

        
        <App />
        {/* <OpenInSamePage />     */}
    

    </Router>
    , document.getElementById('root'));
registerServiceWorker();
