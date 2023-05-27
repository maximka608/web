
const url = 'http://127.0.0.1:5000/user/login';

const loginInButton = document.getElementById('login-button');
const registerButton = document.getElementById('navigation-register-button');
const aboutButton = document.getElementById('navigation-about-button');
const logButton = document.getElementById('navigation-log-button');
const changeButton = document.getElementById('change-form-button');

if (window.localStorage.getItem('token')) {
    window.location.replace('../html/home.html');
}

function displayErrorMessage(error) {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.innerHTML = `<img src="../images/alert.png" alt="" width="16" height="16">
    <span id='error-message'>${error}</span>`;
}

function loginInButtonHandler(e) {
    e.preventDefault();

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.text().then((text) => { throw new Error(text); });
    }).then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        window.location.replace('../html/home.html');
    }).catch((error) => {
        displayErrorMessage(error);
    });
}

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

loginInButton.addEventListener('click', loginInButtonHandler);
aboutButton.addEventListener('click', aboutButtonHandler);
logButton.addEventListener('click', logButtonHandler);
registerButton.addEventListener('click', registerButtonHandler);
changeButton.addEventListener('click', registerButtonHandler);