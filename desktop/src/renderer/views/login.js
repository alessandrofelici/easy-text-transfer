
export const renderLoginView = (onLoginSuccess) => {
  const loginPage = document.createElement('div')
  loginPage.id = 'login-page'

  const form = document.createElement('div')

  const emailInput = document.createElement('input');
  emailInput.type = 'text';
  emailInput.placeholder = 'email';

  const passwordInput = document.createElement('input');
  passwordInput.type = 'text';
  passwordInput.placeholder = 'Password';

  const signInButton = document.createElement('button');
  signInButton.textContent = 'Sign In';

  const signUpButton = document.createElement('button');
  signUpButton.textContent = 'Sign Up';

  const showError = document.createElement('div')

  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(signInButton);
  form.appendChild(signUpButton);
  form.appendChild(showError);
  loginPage.append(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  
  /*
   *  Setup new account or login new account on respective button press
   */
  const registerAccount = async (firebaseFunction) => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const res = await firebaseFunction(email, password);
    if (res) {
      onLoginSuccess();
    }
  }

  signInButton.addEventListener('click', () => registerAccount(contactFirebase.signIn))
  signUpButton.addEventListener('click', () => registerAccount(contactFirebase.signUp))

  document.body.appendChild(loginPage);
}