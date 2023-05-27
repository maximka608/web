
const url = 'http://127.0.0.1:5000/user/';

const discardButton = document.getElementById('discard-button');
const discardChangesButton = document.getElementById('discard-changes');
const discardPopUp = document.querySelector('.pop-up-box');
const closeIcon = discardPopUp.querySelector('header i');
const saveButton = document.getElementById('save-button');
const logOutButton = document.getElementById('logout-button');

function displayErrorMessage(error) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = `<img src="../images/alert.png" alt="" width="16" height="16">
    <span id='error-message'>${error}</span>`;
}

function saveChangesHandler(e) {
    e.preventDefault();

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    if (password.value !== '' || confirmPassword.value !== '') {
        if (password.value !== confirmPassword.value) {
            const error = 'Passwords are not the same';
            displayErrorMessage(error);
            return;
        }
    }

    fetch(`${url}${window.localStorage.getItem('id')}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: username.value,
            email: email.value,
            password: password.value,
        }),
    }).then(async (response) => {
        if (response.ok) {
            return response.json();
        }
        return response.text().then((text) => { throw new Error(text); });
    }).then(() => {
        window.location.replace('../html/profile.html');
    }).catch((error) => {
        displayErrorMessage(error);
    });
}

function discardChangesHandler(e) {
    e.preventDefault();
    if (discardPopUp.classList.contains('show')) {
        discardPopUp.classList.remove('show');
        window.location.replace('../html/profile.html');
    }
}

function discardButtonHandler(e) {
    e.preventDefault();
    discardPopUp.classList.add('show');
}

function closeIconHandler(e) {
    e.preventDefault();
    discardPopUp.classList.remove('show');
}

function logOut(e) {
    e.preventDefault();

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    window.location.replace('../html/login.html');
}

discardButton.addEventListener('click', discardButtonHandler);
discardChangesButton.addEventListener('click', discardChangesHandler);
closeIcon.addEventListener('click', closeIconHandler);
saveButton.addEventListener('click', saveChangesHandler);
logOutButton.addEventListener('click', logOut);