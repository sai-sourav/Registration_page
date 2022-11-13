const myform = document.querySelector("#my-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const calldate = document.querySelector("#calldate");
const calltime = document.querySelector("#calltime");
myform.addEventListener('submit', onsubmit);

function onsubmit(event){
    event.preventDefault();
    if (name.value !== '' || email.value !== '' ||
        phone.value !== '' || calldate.value !== '' ||
        calltime.value !== ''){
            console.log(name.value)
    }
    
}