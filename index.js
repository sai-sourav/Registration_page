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

// function refreshlocalstorage(obj) {
//     let string_obj = JSON.stringify(obj);
//     localStorage.setItem(obj._id,string_obj);
// }


async function  showlist(){
    itemList.innerHTML = "";
    await axios.get(URL)
    .then(response => {
        for(let i = 0; i< response.data.length; i++){
            appendlist(response.data[i]);
            // refreshlocalstorage(response.data[i]);
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
        let URL1 = `${URL}/${li.id}`
        axios.delete(URL1).then(res => console.log(res)).catch(err => console.log(err));
        itemList.removeChild(li);
      }
    }
  }
  
  // Edit item
  function editItem(e){
    if(e.target.classList.contains('edit')){
        const itemList = document.getElementById("items");
        var li = e.target.parentElement;
        let URL1 = `${URL}/${li.id}`
        axios.get(URL1)
        .then(resp => {
            console.log(resp.data)
            document.getElementById('name').value = resp.data.name;
            document.getElementById('email').value = resp.data.emailid;
            document.querySelector("#phone").value = resp.data.phone;
            document.querySelector("#calldate").value = resp.data.calldate;
            document.querySelector("#calltime").value = resp.data.calltime;
            axios.delete(URL1).then(res => console.log(res)).catch(err => console.log(err));
            itemList.remove(li);
        })
        
    }
  }


