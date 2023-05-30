const logOutButton = document.getElementById('logout-button');
const searchinput = document.getElementById('search_input');


const url = 'http://127.0.0.1:5000/user/';

var currentDate = new Date();
var options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
var formattedDate = currentDate.toLocaleDateString('en-US', options).toUpperCase();

var dataElement = document.querySelector('span.calendar-day');
dataElement.textContent = formattedDate;

function displaymynotes() {
const allnotescont1 = document.getElementById('all_notes_wrap1');
fetch(`http://127.0.0.1:5000/notes/${window.localStorage.getItem('id')}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => { throw new Error(text); });
      })
      .then((data) => {
        let output = "";
        // можливо треба буде node['name'] і т. д. 
        data.forEach((note) => {
          output += `
            <li class="note">
              <div class="details">
                <p class="note-title">${note.name}</p>
                <span>${note.text}</span>
              </div>
              <div class="tags">
                <button class="tag">#${note.tag}</button> 
              </div>
              <div class="bottom-content">
                <span></span>
                <div class="settings">
                  <i class='bx bx-dots-horizontal-rounded'></i>
                  <ul class="note-menu">
                    <li><i class='bx bx-pencil'></i>Edit</li>
                  
                    <li><i class='bx bx-trash'></i>Delete</li>
                  </ul>
                </div>
              </div>
            </li>
          `;
        });

        allnotescont1.innerHTML =  output;
    });
}




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
    
    displaymynotes();
});
function logOut(e) {
    e.preventDefault();

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    window.location.replace('../html/login.html');
}

function search_notes() {
    
    var input, filter, ul, li, title, i, txtValue;
    input = document.getElementById("search_input");
    filter = input.value.toUpperCase();
    ul = document.getElementById("all_notes_wrap1");
    li = ul.getElementsByClassName("note");
    for (i = 0; i < li.length; i++) {
        title = li[i].getElementsByClassName("note-title")[0];
        txtValue = title.textContent || title.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

logOutButton.addEventListener('click', logOut);
searchinput.addEventListener('keyup', search_notes);