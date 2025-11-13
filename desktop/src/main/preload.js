const { contextBridge } = require("electron");
const { loadText, saveText, signIn, signUp } = require("../firebase/firestore");

contextBridge.exposeInMainWorld('contactFirebase', {
    getData: async () => {
      return await loadText();
    },
    setData: (text) => {
      saveText(text);
    },
    signIn: (email, password) => {
      signIn(email, password);
    },
    signUp: (email, password) => {
      signUp(email, password);
    },
});