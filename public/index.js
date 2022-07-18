let username = sessionStorage.getItem('username')
if(username == null){
    username = prompt('insert username')
    sessionStorage.setItem('username',username)
}

document.getElementById('username').innerHTML = `welcome ${username}`
const socket = io()
loadFirstData()

const btnSend = document.getElementById('send')
btnSend.onclick = e=>{
    e.preventDefault()

    const msn = document.getElementById('msn').value
   socket.emit('chat-in',{msn,username})
}

socket.on('chat-out',data=>{
    addDataToDiv(data)  
})

function addDataToDiv(data) {
    const div = document.getElementById('chat')
    div.innerHTML += `<br>[${data.date}] <b>${data.username}</b>: <i>${data.msn}</i>`
}


function loadDataToDiv(data){
   data.forEach(d=> addDataToDiv(d))
}

function loadFirstData(){
fetch('/data')
.then(data=>data.json())
.then(d=>{ 
    loadDataToDiv(d.data)
})
.catch(e=>alert(e))
}