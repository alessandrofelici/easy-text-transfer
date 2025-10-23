// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAUTKgOvVnZvPJ_Qa8lOttKyoPwKpA95Y",
  authDomain: "easy-text-transfer.firebaseapp.com",
  databaseURL: "https://easy-text-transfer-default-rtdb.firebaseio.com",
  projectId: "easy-text-transfer",
  storageBucket: "easy-text-transfer.firebasestorage.app",
  messagingSenderId: "815628299779",
  appId: "1:815628299779:web:34c357ce0f78ca3f142836",
  measurementId: "G-4CY3NCDP35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const createSamples = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

// Add a second document with a generated ID.

  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  console.log("Saved");
};

const retrieveData = async () => {
  let ret = "";
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    ret += `\n${doc.id} => ${doc.data()}`;
  });
  return ret
};

module.exports = { createSamples, retrieveData };