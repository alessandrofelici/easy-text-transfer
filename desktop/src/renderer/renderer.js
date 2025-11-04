

const textBox = document.getElementById('text-box');
// Update time period in seconds
const interval = 0.5;

contactFirebase.getData().then((data) => {
  textBox.value = data;
  textBox.disabled = false;
});

// Limit number of writes to database
let saving = false;
let typing = false;
let text = "";
let lastKeyPress = null;

// Save text each key press
textBox.addEventListener("keyup", () => {
  lastKeyPress = Date.now();
  if (!saving) {
    console.log("Saving...")
    saving = true;
    typing = true;
    setTimeout(() => {
      contactFirebase.setData(text);
      saving = false;
    }, interval*1000);
  }
  text = textBox.value
});

// Retrieve data from other devices every 3 seconds, if not saving or typing
setInterval(async () => { 
  if (lastKeyPress && Date.now() - lastKeyPress > 5*1000 && typing) {
    typing = false;
    console.log("User inactive");
  }
  if (!saving && !typing) {
    contactFirebase.getData().then((data) => {
      textBox.value = data;
    });
  }
}, interval*1000);