const socket=io(`http://localhost:8000`);

const form=document.getElementById(`sendContainer`);
const msgINP=document.getElementById(`msgINP`);
const msgContainer=document.querySelector(`.container`);

window.addEventListener(`load`, () => {

   //Via Query parameters - GET
    const params = (new URL(document.location)).searchParams;
   const name = params.get(`nameee`);
   // // Via local Storage
   // /* const name = localStorage.getItem('NAME');
   // const surname = localStorage.getItem('SURNAME'); */

   // const name = sessionStorage.getItem('NAME');
   // const surname = sessionStorage.getItem('SURNAME');

   document.getElementById(`result`).innerHTML = name;
   socket.emit(`new-user-joined`,name);  
});


var audio=new Audio(`ding-sound.mp3`);

form.addEventListener(`submit`,(e)=>{
     e.preventDefault();     //to stop reloading
     const msg=msgINP.value;
     append(msg,`right`);
     socket.emit(`send-message`,msg);
     msgINP.value=null;

});

// form1.addEventListener(`submit`,(e)=>{
//    e.preventDefault();     //to stop reloading
//    const msg=msgINP1.value;
//    // append(msg,`right`);
//    // socket.emit(`send-message`,msg);
//    socket.emit(`new-user-joined`,msg);  
//    msgINP1.value=null;
// });


const append=(message,position)=>{
     const msgelem=document.createElement(`div`);
     msgelem.innerText=message;
     msgelem.classList.add(`message`);
     msgelem.classList.add(position);
     msgContainer.append(msgelem);

     window.setInterval(function() {
      var elem = document.getElementById('divi');
      elem.scrollTop = elem.scrollHeight;
    }, 1);

     if(position==`left`)
     audio.play();
}



socket.on(`user-joined`,data=>{
   append(`${data}: joined the chat`,`right`);
});

socket.on(`received`,data=>{
    append(`${data.name}: ${data.message}`,`left`);
 });
 
 socket.on(`left`,data=>{
    append(`${data}: Left the chat`,`right`);
 });
 
//  var myDiv = document.getElementById("divi");
// window.scrollTo(0, divi.innerHeight);

