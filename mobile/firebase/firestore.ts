import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import firebaseConfig from "../../shared/firebase.config.json";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const saveText = async (text: string) => {
  const userRef = doc(db, 'users', '4j5rXHDUkamtxZMm3EBF');
  await updateDoc(userRef, { text });
  console.log("Saved");
}

const loadText = async () => {
  const docRef = doc(db, 'users', '4j5rXHDUkamtxZMm3EBF');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().text
  }
  else {
    console.log("User not found");
  }
}

export { saveText, loadText };