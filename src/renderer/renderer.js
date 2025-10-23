const { createSamples, retrieveData } = require("../firebase/firestore");

const textBox = document.createElement("textarea");
textBox.className = "text-box";
textBox.rows = 20;
textBox.cols = 26;
textBox.placeholder = "Type a message here";
textBox.autofocus = true;

textBox.addEventListener("keydown", async (event) => {
  const currMessage = textBox.value;
  console.log(currMessage);

  if (event.key === "Enter") {
    createSamples();
  }
  if (event.key === "Escape") {
    textBox.value = await retrieveData();
  }
});

document.body.appendChild(textBox);