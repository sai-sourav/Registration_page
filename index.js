const myform = document.querySelector("#my-form");
const itemList = document.getElementById("items");
// Delete event
itemList.addEventListener('click', removeItem);
// edit event
itemList.addEventListener('click', editItem);
// on submit
myform.addEventListener('submit', onsubmit);
// on reload
window.addEventListener('DOMContentLoaded', showlist);

function onsubmit(event){
    event.preventDefault();
    // save on crud crud server change it every 24 hrs
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const calldate = document.querySelector("#calldate").value;
    const calltime = document.querySelector("#calltime").value;
    axios.post('https://crudcrud.com/api/392ddf094f374650ba84ef186aa86dbc/appointmentData/',{
        "name": name,
        "emailid": email,
        "phone" : phone,
        "calldate" : calldate,
        "calltime" : calltime
      })
        .then (res => console.log(res))
        .catch (err => console.log(err));
    // save them on local storage
    showlist();

}

function refreshlocalstorage(obj) {
    let string_obj = JSON.stringify(obj);
    localStorage.setItem(obj._id,string_obj);
}


function showlist(){
    itemList.innerHTML = "";
    localStorage.clear();
    axios.get('https://crudcrud.com/api/392ddf094f374650ba84ef186aa86dbc/appointmentData')
    .then(response => {
        for(let i = 0; i< response.data.length; i++){
            appendlist(response.data[i]);
            refreshlocalstorage(response.data[i]);
        }
    })

}

function appendlist(obj){
  let text = obj.name + " " + obj.emailid;
//   let newelement = `<li class="list-group-item" id="${obj._id}"> ${text} 
//                         <button class="btn btn-danger btn-sm float-right delete">delete</button>
//                         <button class="btn btn-default btn-sm float-right edit">edit</button> 
//                     </li>`
  var li = document.createElement('li');
//   li.innerHTML = newelement;
li.className = 'list-group-item';

li.id = obj._id;
// Add text node with input value
li.appendChild(document.createTextNode(text));
///

// Create del button element
var deleteBtn = document.createElement('button');

// Add classes to del button
deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

// Append text node
deleteBtn.appendChild(document.createTextNode('X'));

// Append button to li
li.appendChild(deleteBtn);

///

// create edit button element
var editBtn = document.createElement('button');

// Add classes to edit button
editBtn.className = 'btn btn-default btn-sm float-right edit';

 // Append text node
 editBtn.appendChild(document.createTextNode('Edit'));

 // Append button to li
  li.appendChild(editBtn);


  // Append li to list
  itemList.appendChild(li);
}


// Remove item
function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        const itemList = document.getElementById("items");
        var li = e.target.parentElement;
        let obj_string = localStorage.getItem(li.id);
        let obj = JSON.parse(obj_string);
        let URL = `https://crudcrud.com/api/392ddf094f374650ba84ef186aa86dbc/appointmentData/${obj._id}`
        axios.delete(URL).then(res => console.log(res)).catch(err => console.log(err));
        localStorage.removeItem(li.id);
        itemList.removeChild(li);
      }
    }
  }
  
  // Edit item
  function editItem(e){
    if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;
        // delete element
        let obj_string = localStorage.getItem(li.id);
        let obj1 = JSON.parse(obj_string);
        let URL = `https://crudcrud.com/api/392ddf094f374650ba84ef186aa86dbc/appointmentData/${obj1._id}`
        axios.delete(URL).then(res => console.log(res)).catch(err => console.log(err));
        let obj = localStorage.getItem(li.id);
        localStorage.removeItem(li.id);
        itemList.remove(li);
        document.getElementById('name').value = obj.name;
        document.getElementById('email').value = obj.email;
        document.querySelector("#phone").value = obj.phone;
        document.querySelector("#calldate").value = obj.calldate;
        document.querySelector("#calltime").value = obj.calltime;
    }
  }


