// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyBX2nPIiEtWIW9ihNQIikQl1v2_DDt7OJc",
    authDomain: "staging-dream-book.firebaseapp.com",
    projectId: "staging-dream-book",
    storageBucket: "staging-dream-book.firebasestorage.app",
    messagingSenderId: "649205651583",
    appId: "1:649205651583:web:927139a12dce9ab4e8c74a",
    measurementId: "G-PB3LDTG9C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);