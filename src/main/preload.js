const { contextBridge } = require("electron");
const { loadText, saveText } = require("../firebase/firestore");

contextBridge.exposeInMainWorld('contactFirebase', {
    getData: () => {
      return loadText();
    },
    setData: (text) => {
      saveText(text);
    },
});