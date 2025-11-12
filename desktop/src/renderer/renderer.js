import { renderAppView } from "./views/app.js";
import { renderLoginView } from "./views/login.js";

let viewName = 'app';

const pages = ["loginPage", "appPage"]
const clearCurrentView = () => {
  // TODO take more dynamic approach, call each function to clear dom elems
  pages.forEach(pageId => {
    const pageElement = document.getElementById(pageId);
    pageElement.style.display = 'none';
  });
}

const showView = () => {
  clearCurrentView();

  if (viewName === 'login') {
    renderLoginView();
  } else if (viewName === 'app') {
    renderAppView();
  }
}


showView();