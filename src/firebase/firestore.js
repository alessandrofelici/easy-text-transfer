// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDoc, doc, updateDoc } = require('firebase/firestore');

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

const saveText = async (text) => {
  const userRef = doc(db, 'users', '4j5rXHDUkamtxZMm3EBF');
  await updateDoc(userRef, {
    text: text
  });
  console.log("Saved");
};

// TODO: Expand to more users
// -> separate create & edit functions
// -> more ids in users

// const createUser = async (text) => {
//   try {
//     const docRef = await addDoc(collection(db, "users"), {
//       name: "CHANGE ME",
//       text: text
//     });
//     console.log("Document written with ID: ", docRef.id);
//     // TOOD save this internally
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }

//   console.log("Saved");
// };

const loadText = async () => {
  // TODO add case if user data does not exist yet
  const docRef = doc(db, 'users', '4j5rXHDUkamtxZMm3EBF');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().text
  }
  else {
    console.log("User not found");
  }
};

module.exports = { saveText, loadText };