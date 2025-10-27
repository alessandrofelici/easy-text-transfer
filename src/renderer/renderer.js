const { saveText, loadText } = require("../firebase/firestore");

// TODO write this in html and just get id
const textBox = document.createElement("textarea");
textBox.className = "text-box";
textBox.id = "text-box"
textBox.rows = 20;
textBox.cols = 26;
textBox.placeholder = "Type a message here";
textBox.autofocus = true;
textBox.disabled = true;

setTimeout(() => {
  textBox.disabled = false;
}, 3000);
// window.electron.loadTextBox();

// Limit number of writes to database
let saving = false;
let text = ""

textBox.addEventListener("keyup", () => {
  if (!saving) {
    saving = true;
    setTimeout(() => {
      saveText(text)
      saving = false;
    }, 3000);
  }
  text = textBox.value
});
});

document.body.appendChild(textBox);