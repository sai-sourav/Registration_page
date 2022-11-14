const myform = document.querySelector("#my-form");
const itemList = document.getElementById("items");
// Delete event
itemList.addEventListener('click', removeItem);
// edit event
itemList.addEventListener('click', editItem);
// on submit
myform.addEventListener('submit', onsubmit);

showlist();

function onsubmit(event){
    event.preventDefault();
    // if (name.value !== '' || email.value !== '' ||
    //     phone.value !== '' || calldate.value !== '' ||
    //     calltime.value !== ''){
    //         console.log(name.value)
    // }
    // save on crud crud server change it every 24 hrs
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const calldate = document.querySelector("#calldate").value;
    const calltime = document.querySelector("#calltime").value;
    axios.post('https://crudcrud.com/api/5280ca81cac042c9af8990236e33b0b5/appointmentData',{
        "name": name,
        "emailid": email,
        "phone" : phone,
        "calldate" : calldate,
        "calltime" : calltime
      })
        .then (res => console.log(res))
        .catch (err => console.log(err));
    // save them on local storage
    let myobj = {
        "name": name,
        "emailid": email,
        "phone" : phone,
        "calldate" : calldate,
        "calltime" : calltime
    }
    let myobj_serialized = JSON.stringify(myobj);
    localStorage.setItem("user"+myobj.name,myobj_serialized);
    showlist();
    document.getElementById('name').value = " ";
    document.getElementById('email').value = " ";
    document.querySelector("#phone").value = " ";
    document.querySelector("#calldate").value = " ";
    document.querySelector("#calltime").value = " ";

}


function showlist(){
    itemList.innerHTML = ""
    Object.keys(localStorage).forEach((key)=>{
        var user_serialized = localStorage.getItem(key);
        var user_deserialized = JSON.parse(user_serialized);
        appendlist(user_deserialized.name + " " + user_deserialized.emailid);
    });
}

function appendlist(text){
    // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
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


  ///

  // Append li to list
  itemList.appendChild(li);
}


// Remove item
function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        let arr = li.innerText
        arr = arr.replace("XEdit",'');
        arr = arr.split(' ')
        arr.pop();
        arr = arr.join(' ')
        itemList.removeChild(li);
        localStorage.removeItem("user"+arr)
      }
    }
  }
  
  // Edit item
  function editItem(e){
    if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;
        let arr = li.innerText
        console.log(arr)
        arr = arr.replace("XEdit",'');
        arr = arr.split(' ')
        let email = arr.pop();
        let fullname = arr.join(' ')
        // delete element
        itemList.removeChild(li);
        let obj = localStorage.getItem("user"+fullname)
        localStorage.removeItem("user"+fullname)
        document.getElementById('name').value = obj.name;
        document.getElementById('email').value = obj.email;
        document.querySelector("#phone").value = obj.phone;
        document.querySelector("#calldate").value = obj.calldate;
        document.querySelector("#calltime").value = obj.calltime;
    }
  }


