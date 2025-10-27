const { saveText, loadText } = require("../firebase/firestore");


const textBox = document.getElementById('text-box');

setTimeout(() => {
  textBox.disabled = false;
}, 3000);

// Limit number of writes to database
let saving = false;
let text = ""

textBox.addEventListener("keyup", () => {
  if (!saving) {
    console.log("Saving...")
    saving = true;
    setTimeout(() => {
      saveText(text)
      saving = false;
    }, 3000);
  }
  text = textBox.value
});