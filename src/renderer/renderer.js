

const textBox = document.getElementById('text-box');
textBox.value = contactFirebase.getData();

setTimeout(() => {
  textBox.disabled = false;
}, 3000);

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