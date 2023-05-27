const url = 'http://127.0.0.1:5000/user';

const signUpButton = document.getElementById('sign-up-button');
const aboutButton = document.getElementById('navigation-about-button');
const logButton = document.getElementById('navigation-log-button');
const registerButton = document.getElementById('navigation-register-button');
const changeButton = document.getElementById('change-form-button');

if (window.localStorage.getItem('token')) {
    window.location.replace('../html/home.html');
}

function displayErrorMessage(error) {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.innerHTML = `<img src="../images/alert.png" alt="" width="16" height="16">
    <span id="error-message">${error.message}</span>`;
}

function signUpButtonHandler(e) {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    if (password.value !== confirmPassword.value) {
        const pass = 'Passwords are not the same';
        displayErrorMessage(pass);
        return;
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    }).then(async (response) => {
        if (response.ok) {
            return response.json();
        }
        console.log('shit error');
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

signUpButton.addEventListener('click', signUpButtonHandler);
aboutButton.addEventListener('click', aboutButtonHandler);
logButton.addEventListener('click', logButtonHandler);
registerButton.addEventListener('click', registerButtonHandler);
changeButton.addEventListener('click', logButtonHandler);