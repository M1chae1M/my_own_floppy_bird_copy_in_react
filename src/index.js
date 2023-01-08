import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

{/* <BrowserRouter basename={window.location.pathname || ''}>
<Route exact path="/" component={Index} />
</BrowserRouter> */}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<BrowserRouter basename={process.env.PUBLIC_URL}>
<App />
</BrowserRouter>
</React.StrictMode>
);

reportWebVitals();