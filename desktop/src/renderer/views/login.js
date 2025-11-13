
export const renderLoginView = () => {
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

  signInButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    contactFirebase.signIn(email, password);
  })

  signUpButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const error = contactFirebase.signUp(email, password);
  })

  document.body.appendChild(loginPage);
}