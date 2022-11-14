const myform = document.querySelector("#my-form");
myform.addEventListener('submit', onsubmit);

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
    
}