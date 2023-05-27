
const logOutButton = document.getElementById('logout-button');
const addnewbutton = document.getElementById('add_new_note_b');
const addnewcont = document.getElementById('addnewcont');
const allnotescont = document.getElementById('all_notes_wrap');
var currentNotesContent = allnotescont.innerHTML;



fetch(`http://127.0.0.1:5000/notes/${window.localStorage.getItem('id')}`, {
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
        let output2 = "";
        data.forEach(note => {
            output2 += `
            <li class="note">
            <div class="details">
                <p>${note.name}</p>
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
                  <li><i class='bx bxs-user-plus'></i>Add editor</li>
                  <li><i class='bx bxs-group'></i>Show editors</li>
                  <li><i class='bx bx-trash' ></i>Delete</li>
              </ul>
              </div>
          </div>
        </li>
            `
        })
        
        allnotescont.innerHTML = currentNotesContent + output2;
    });
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

    addnewcont.innerHTML = output;
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
        <p>${title_note.value}</p>
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

    });


}

logOutButton.addEventListener('click', logOut);
addnewbutton.addEventListener('click', AddNewNotes);
