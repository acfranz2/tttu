import firebase from 'firebase';
  
const firebaseConfig = {
    apiKey: "AIzaSyA0qAuhdPWU4BPIouERv1ZayCSx2oaKuHU",
    authDomain: "tictactoeultra-2c96c.firebaseapp.com",
    projectId: "tictactoeultra-2c96c",
    storageBucket: "tictactoeultra-2c96c.appspot.com",
    messagingSenderId: "673130755587",
    appId: "1:673130755587:web:1b077ee7e36421dde10036",
    measurementId: "G-YHR3FLFSRJ"
};
    
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
  
export default database;
