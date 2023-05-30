const url = 'http://127.0.0.1:5000/user/';
const logOutButton = document.getElementById('logout-button');
const addnewbutton = document.getElementById('add_new_note_b');
const addnewcont = document.getElementById('addnewcont');
const allnotescont = document.getElementById('all_notes_wrap');
var currentNotesContent = allnotescont.innerHTML;
const searchinput = document.getElementById('search_input');

var currentDate = new Date();
var options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
var formattedDate = currentDate.toLocaleDateString('en-US', options).toUpperCase();

var dataElement = document.querySelector('span.calendar-day');
dataElement.textContent = formattedDate;

function func1() {
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
  
  const username1 = document.getElementById('sidebar_name2');
  username1.innerHTML = `<p>${data.name}</p>`;
 
});
}




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
                    <li class="edit-note-button" data-note-id="${note.id}"><i class='bx bx-pencil'></i>Edit</li>
                   
                    <li class="delete-note-button" data-note-id="${note.id}"><i class='bx bx-trash'></i>Delete</li>
                  </ul>
                </div>
              </div>
            </li>
          `;
        });
  
        allnotescont.innerHTML =  output;
        addnewbutton.addEventListener('click', AddNewNotes);
        func1();
    });


function updateNotesList() {
    console.log("Error");
    
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
                    <li class="edit-note-button" data-note-id="${note.id}"><i class='bx bx-pencil'></i>Edit</li>
                    
                    <li class="delete-note-button" data-note-id="${note.id}"><i class='bx bx-trash'></i>Delete</li>
                  </ul>
                </div>
              </div>
            </li>
          `;
        });
  
        allnotescont.innerHTML = currentNotesContent + output;
        addnewbutton.addEventListener('click', AddNewNotes);
        addnewbutton.addEventListener('click', AddNewNotes);

    
    const editButtons = document.querySelectorAll('.edit-note-button');
    editButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        console.log("dwsds");
        const noteId = button.getAttribute('data-note-id');
        fetch(`http://127.0.0.1:5000/note/${noteId}`, {
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
          .then((noteData) => {
            const editnotescont = button.closest('li.note');
            const form = `
              <div class="form" id="editnote_form">
                <p class="title_edit_note">Editing note</p>
                <input type="text" id="edit_note_title" placeholder="Title" value="${noteData.name}" required=""/>
                <input type="text" id="edit_note_text" placeholder="Text" value="${noteData.text}" required=""/>
                <input type="text" id="edit_note_tag" placeholder="Tag" value="${noteData.tag}" required=""/>
                <button id="updatenotebutton" data-note-id="${noteId}">Update</button>
              </div>
            `;
            editnotescont.innerHTML = form;

            const updateNoteButton = document.getElementById('updatenotebutton');
            updateNoteButton.addEventListener('click', () => {
              const updatedTitle = document.getElementById('edit_note_title').value;
              const updatedText = document.getElementById('edit_note_text').value;
              const updatedTag = document.getElementById('edit_note_tag').value;
              fetch(`http://127.0.0.1:5000/note/${noteId}`, {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: updatedTitle,
                  text: updatedText,
                  tag: updatedTag,
                }),
              })
                .then(async (response) => {
                  if (response.ok) {
                    console.log('Note edited successfully.');
                    updateNotesList();
                  } else {
                    throw new Error('Failed to edit the note.');
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });

    const deleteButtons = document.querySelectorAll('.delete-note-button');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        console.log("eror");
        const noteId = button.getAttribute('data-note-id');
        fetch(`http://127.0.0.1:5000/note/${noteId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        })
          .then(async (response) => {
            if (response.ok) {
              console.log('Note deleted successfully.');
              updateNotesList();
              
            } else {
              throw new Error('Failed to delete the note.');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
  });
}


updateNotesList();


function AddNewNotes(e) {
    e.preventDefault();
    let output = "";
    output += `
    <div class="form" id="addnewnote_form">
        <p>Adding new note </p>
        <input type="text" id="note_title" placeholder="Title" required=""/>
        <input type="text" id="note_text" placeholder="Text" required=""/>
        <input type="text" id="note_tag" placeholder="Tag" required=""/>
        <button id="createnewbutton">Create </button>
    </div>
    `
    addnewcont.innerHTML = output;
    const createnewbutt = document.getElementById('createnewbutton');
    createnewbutt.addEventListener('click', CreateNewNotes);

}

function logOut(e) {
    e.preventDefault();

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    window.location.replace('../html/login.html');
}


function CreateNewNotes(e) {
    console.log("Error");
    e.preventDefault();

    const title_note = document.getElementById('note_title');
    const text_note = document.getElementById('note_text');
    const tag_note = document.getElementById('note_tag');
    var currentDate = new Date();
    var monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      var monthIndex = currentDate.getMonth();
      
    var monthName = monthNames[monthIndex];      
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    var formattedDate = monthName + ' ' + day + ', ' + year;

    //addnewcont.innerHTML = output;

    fetch(`http://127.0.0.1:5000/note`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: title_note.value,
                text: text_note.value,
                tag: tag_note.value,
                idOwner: window.localStorage.getItem('id')
            })
        }).then((response) => {
            let output2 = "";
        output2 += `
        <li class="note">
        <div class="details">
            <p class="note-title">${title_note.value}</p>
            <span>${text_note.value}</span>
        </div>
        <div class="tags">
            <button class="tag">#${tag_note.value}</button>
          </div>
          <div class="bottom-content">
          <span>${formattedDate}</span>
          <div class="settings">
             <i class='bx bx-dots-horizontal-rounded'></i>
             <ul class="note-menu">
              <li><i class='bx bx-pencil'></i>Edit</li>
              <li><i class='bx bxs-user-plus'></i>Add editor</li>
              <li><i class='bx bxs-group'></i>Show editors</li>
              <li><i class='bx bx-trash' ></i>Delete</li>
          </ul>
          </div>
      </div>
    </li>
        `
        allnotescont.innerHTML = currentNotesContent + output2;
        title_note.value = "";
        text_note.value = "";
        tag_note.value = "";
        updateNotesList();

        });
    
    
    }

    function search_notes() {
    
        var input, filter, ul, li, title, i, txtValue;
        input = document.getElementById("search_input");
        filter = input.value.toUpperCase();
        ul = document.getElementById("all_notes_wrap");
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
    addnewbutton.addEventListener('click', AddNewNotes);
    searchinput.addEventListener('keyup', search_notes);
    
    

    

