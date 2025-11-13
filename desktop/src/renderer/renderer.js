import { renderAppView } from "./views/app.js";
import { renderLoginView } from "./views/login.js";

const clearCurrentView = (element) => {
  if (!element) {
    return;
  }

  for (const child of element.children) {
    clearCurrentView(child)
  }
  element.remove();
}

const showView = (viewName) => {
  clearCurrentView(document.body.children[0]);

  if (viewName === 'login') {
    renderLoginView();
  } else if (viewName === 'app') {
    renderAppView();
  }
}

showView('login');