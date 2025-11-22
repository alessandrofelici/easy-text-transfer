import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../../shared/firebase.config.json";
import { useAuth } from "@/app/authContext";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export let userId: string | null = null;

const saveText = async (text: string) => {
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
const signUp = async (email: string, password: string) => {
  let user: any = null;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      // Signed up
      user = userCredential.user;
      // ...
      console.log(user)
    })
    .then(() => createUser(user))
    .catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    })
  return user ? user.uid : null;
}

const signIn = async (email: string, password: string) => {
  let user: any = null;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      // Signed in
      user = userCredential.user;
      // ...
      console.log(user)
      userId = user.uid
    })
    .catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    })
  return user ? user.uid : null;
}

const createUser = async (user: any) => {
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


export { saveText, loadText, signIn, signUp };