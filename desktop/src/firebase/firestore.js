const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDoc, doc, updateDoc } = require('firebase/firestore');
const firebaseConfig = require('../../../shared/firebase.config.json');


const app = initializeApp(firebaseConfig);

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