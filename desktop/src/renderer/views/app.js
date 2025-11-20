
export const renderAppView = () => {
  const appPage = document.createElement('div')
  appPage.id = 'app-page'

  const textBox = document.createElement('textarea');
  textBox.className = 'text-box';
  textBox.id = 'text-box';
  textBox.rows = 20;
  textBox.cols = 26;
  textBox.placeholder = 'Type a message here';
  textBox.autofocus = true;
  textBox.disabled = true;

  const urlButton = document.createElement('button');
  urlButton.id = 'url-button';
  urlButton.textContent = 'Follow Link';

  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.className = 'notification hidden';

  const notificationMessage = document.createElement('div');
  notificationMessage.id = 'notification-message';
  notification.appendChild(notificationMessage);

  appPage.appendChild(textBox);
  appPage.appendChild(urlButton);
  appPage.appendChild(notification);
  document.body.appendChild(appPage)

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

  urlButton.addEventListener("click", () => {
      // Check for link in text
      const urlPattern = /https:\/\/[^\s]+/;
      if (urlPattern.test(textBox.value)) {
        window.open(textBox.value);
      }
      else {
        notificationMessage.textContent = "No valid url found.";
        notification.classList.remove('hidden');
        
        setTimeout(() => hideNotification(), 3000);
      }
  });

  const hideNotification = () => {
    document.getElementById('notification').classList.add('hidden');
  }

}
