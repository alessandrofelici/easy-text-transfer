
export const renderAppView = () => {
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

  const button = document.getElementById("url-button");

  button.addEventListener("click", () => {
      // Check for link in text
      const urlPattern = /https:\/\/[^\s]+/;
      if (urlPattern.test(textBox.value)) {
        window.open(textBox.value);
      }
      else {
        const notif = document.getElementById('notification');
        document.getElementById('notification-message').textContent = "No valid url found.";
        notif.classList.remove('hidden');
        
        setTimeout(() => hideNotification(), 3000);
      }
  });

  const hideNotification = () => {
    document.getElementById('notification').classList.add('hidden');
  }

}
