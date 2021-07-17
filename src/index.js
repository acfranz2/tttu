import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './game';
import L2Game from './l2Game';
//import L1Board from './boards/l1Board'
//import L2Board from './boards/l2Board'
//import L3Board from './boards/l3Board'
import reportWebVitals from './reportWebVitals';
import './App.css';

ReactDOM.render(<Game />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
