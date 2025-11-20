const { contextBridge } = require("electron");
const { loadText, saveText, signIn, signUp } = require("../firebase/firestore");

contextBridge.exposeInMainWorld('contactFirebase', {
    getData: loadText,
    setData: saveText,
    signIn: signIn,
    signUp: signUp,
});