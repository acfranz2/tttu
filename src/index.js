import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import L1Board from './boards/l1Board'
//import L2Board from './boards/l2Board'
//import L3Board from './boards/l3Board'
import reportWebVitals from './reportWebVitals';
import './App.css';
import App from './App';


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyA0qAuhdPWU4BPIouERv1ZayCSx2oaKuHU",
//     authDomain: "tictactoeultra-2c96c.firebaseapp.com",
//     projectId: "tictactoeultra-2c96c",
//     storageBucket: "tictactoeultra-2c96c.appspot.com",
//     messagingSenderId: "673130755587",
//     appId: "1:673130755587:web:1b077ee7e36421dde10036",
//     measurementId: "G-YHR3FLFSRJ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


ReactDOM.render(< App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
