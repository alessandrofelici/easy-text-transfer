const { contextBridge } = require("electron");
const { loadText, saveText } = require("../firebase/firestore");

contextBridge.exposeInMainWorld('contactFirebase', {
    getData: async () => {
      return await loadText();
    },
    setData: (text) => {
      saveText(text);
    },
});