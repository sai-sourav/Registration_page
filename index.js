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

let URL = "https://crudcrud.com/api/01b0f4624a0f46669087aa9d338c9910/appointmentData";

function onsubmit(event){
    event.preventDefault();
    // save on crud crud server change it every 24 hrs
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const calldate = document.querySelector("#calldate").value;
    const calltime = document.querySelector("#calltime").value;
    axios.post(`${URL}/`,{
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
    axios.get(URL)
    .then(response => {
        for(let i = 0; i< response.data.length; i++){
            appendlist(response.data[i]);
            refreshlocalstorage(response.data[i]);
        }
    })

}

function appendlist(obj){
    let text = obj.name + " " + obj.emailid;
    var li = document.createElement('li');
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
        let URL1 = `${URL}/${obj._id}`
        axios.delete(URL1).then(res => console.log(res)).catch(err => console.log(err));
        localStorage.removeItem(li.id);
        itemList.removeChild(li);
      }
    }
  }
  
  // Edit item
  function editItem(e){
    if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;
        let obj = localStorage.getItem(li.id);
        obj = JSON.parse(obj);
        let URL1 = `${URL}/${obj._id}`
        axios.delete(URL1).then(res => console.log(res)).catch(err => console.log(err));
        localStorage.removeItem(li.id);
        itemList.remove(li);
        document.getElementById('name').value = obj.name;
        document.getElementById('email').value = obj.emailid;
        document.querySelector("#phone").value = obj.phone;
        document.querySelector("#calldate").value = obj.calldate;
        document.querySelector("#calltime").value = obj.calltime;
    }
  }


