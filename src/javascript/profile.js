
const url = 'http://127.0.0.1:5000/user/';

const deleteButton = document.getElementById('delete-button');
const editButton = document.getElementById('edit-button');
const deletePopUp = document.querySelector('.pop-up-box');
const closeIcon = deletePopUp.querySelector('header i');
const deleteAccountButton = document.getElementById('delete-account');
const logOutButton = document.getElementById('logout-button');

window.onload = (e) => {
    e.preventDefault();

    fetch(`${url}${window.localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        if (response.ok) {
            return response.json();
        }
        return response.text().then((text) => { throw new Error(text); });
    }).then((data) => {
        const username = document.getElementById('username');
        username.innerHTML = `<span id="username">${data.name}</span>`;
        const email = document.getElementById('email');
        email.innerHTML = `<span id="email">${data.email}</span>`;
    });
};

function deleteUser(e) {
    e.preventDefault();

    fetch(`${url}${window.localStorage.getItem('id')}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    }).then(() => {
        window.localStorage.removeItem('id');
        window.localStorage.removeItem('token');
        window.location.replace('../templates/login.html');
    });
}

function deleteAccountHandler(e) {
    e.preventDefault();

    if (deletePopUp.classList.contains('show')) {
        deleteUser();
        deletePopUp.classList.remove('show');
        window.location.replace('../html/register.html');
    }
}

function deleteButtonHandler(e) {
    e.preventDefault();
    deletePopUp.classList.add('show');
}

function closeIconHandler(e) {
    e.preventDefault();
    deletePopUp.classList.remove('show');
}

function editButtonHandler(e) {
    e.preventDefault();
    window.location.replace('../html/edituser.html');
}

function logOut(e) {
    e.preventDefault();

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    window.location.replace('../html/login.html');
}

deleteButton.addEventListener('click', deleteButtonHandler);
editButton.addEventListener('click', editButtonHandler);
closeIcon.addEventListener('click', closeIconHandler);
deleteAccountButton.addEventListener('click', deleteAccountHandler);
logOutButton.addEventListener('click', logOut);

