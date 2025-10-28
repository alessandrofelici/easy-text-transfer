

const textBox = document.getElementById('text-box');

contactFirebase.getData().then((data) => {
  textBox.value = data;
  textBox.disabled = false;
});

// Limit number of writes to database
let saving = false;
let text = "";

textBox.addEventListener("keyup", () => {
  if (!saving) {
    console.log("Saving...")
    saving = true;
    setTimeout(() => {
      contactFirebase.setData(text);
      saving = false;
    }, 3000);
  }
  text = textBox.value
});