import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HeaderBar from './components/HeaderBar.js';
// import Home from './components/Home.js';
import Select from './components/Select.js';
// import Result from './components/Result.js';

ReactDOM.render(<HeaderBar/>, document.getElementById("header-bar"));
ReactDOM.render(<Select/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
