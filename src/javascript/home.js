const logOutButton = document.getElementById('logout-button');

const url = 'http://127.0.0.1:5000/user/';
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
    
    const username1 = document.getElementById('sidebar_name');
    username1.innerHTML = `<p>${data.name}</p>`;
    
});
function logOut(e) {
    e.preventDefault();

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    window.location.replace('../html/login.html');
}

logOutButton.addEventListener('click', logOut);

