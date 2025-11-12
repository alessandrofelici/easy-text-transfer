const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDoc, doc, updateDoc } = require('firebase/firestore');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const firebaseConfig = require('../../../shared/firebase.config.json');


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const saveText = async (text) => {
  const userRef = doc(db, 'users', '4j5rXHDUkamtxZMm3EBF');
  await updateDoc(userRef, { text });
  console.log("Saved");
};

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

const auth = getAuth();
const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // ...
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    })
}

const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    })
}


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

module.exports = { saveText, loadText, signIn, signUp };