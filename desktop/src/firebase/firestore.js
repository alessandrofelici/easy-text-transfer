const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDoc, doc, updateDoc, setDoc } = require('firebase/firestore');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const firebaseConfig = require('../../../shared/firebase.config.json');


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let userId = null;

const saveText = async (text) => {
  if (userId) {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, { text });
    console.log("Saved");
  }
  else {
    console.log("User not logged in");
  }
};

const loadText = async () => {
  if (userId) {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().text
    }
    else {
      console.log("User not found");
    }
  }
  else {
    console.log("User not logged in");
  }
};

const auth = getAuth();
const signUp = async (email, password) => {
  let user = null;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      user = userCredential.user;
      // ...
      console.log(user)
    })
    .then(() => createUser(user))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    })
  return user ? true : false;
}

const signIn = async (email, password) => {
  let user = null;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      // ...
      console.log(user)
      userId = user.uid
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    })
  return user ? true : false;
}

const createUser = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      name: user.email,
      text: ""
    });
    userId = user.uid
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  console.log("Saved");
};

module.exports = { saveText, loadText, signIn, signUp };