const firebase = require("firebase");
// firebase.initializeApp(firebaseConfig);

const firebaseConfig = {
  apiKey: "AIzaSyCBZDPLFg5j0sHRqiANBr397u0IQ3tDG7Y",
  authDomain: "demoproject-f178d.firebaseapp.com",
  projectId: "demoproject-f178d",
  storageBucket: "demoproject-f178d.appspot.com",
  messagingSenderId: "146057414593",
  appId: "1:146057414593:web:6804a3f5e193ce4736d140",
  measurementId: "G-3V6GRLHGWE",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");

module.exports = User;

