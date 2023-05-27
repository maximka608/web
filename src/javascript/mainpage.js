
const aboutButton = document.getElementById('navigation-about-button');
const logButton = document.getElementById('navigation-log-button');
const registerButton = document.getElementById('navigation-register-button');
const joinButton = document.getElementById('navigation-join-button');
const getStartedButton = document.getElementById('navigation-started-button');

function aboutButtonHandler(e) {
    e.preventDefault();
    window.location.replace('../html/mainpage.html');
}

function logButtonHandler(e) {
    e.preventDefault();
    window.location.replace('../html/login.html');
}

function registerButtonHandler(e) {
    e.preventDefault();
    window.location.replace('../html/register.html');
}

aboutButton.addEventListener('click', aboutButtonHandler);
logButton.addEventListener('click', logButtonHandler);
registerButton.addEventListener('click', registerButtonHandler);
joinButton.addEventListener('click', registerButtonHandler);
getStartedButton.addEventListener('click', registerButtonHandler);