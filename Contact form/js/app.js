/**
 * ? Variable declaration
 */
let form = document.getElementById('form')
let btns = document.querySelectorAll('.btn')
let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let messageInput = document.querySelector('#message')
let tbody = document.getElementById('tbody')


form.addEventListener('submit', (e)=> {
    e.preventDefault()
})



btns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        if(btn.classList.contains('send')){

            if(nameInput.value.trim()==''){
                alert('Name field csnnot be blank')
            }
            else if(emailInput.value.trim()==''){
                alert('Email field cannot be empty')
            }
            else if(messageInput.value.trim()==''){
                alert('Message field cannot be empty')
            }
            else {
                acceptData()
                resetForm()
            }
        }

        if(btn.classList.contains('reset')){
            resetForm()
        }
    })
})

let resetForm = () => {
    nameInput.value = ''
    emailInput.value = ''
     messageInput.value = ''
}

let data = []

let acceptData = () => {
    data.push({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    
    })
   
    localStorage.setItem('data', JSON.stringify(data))

    console.log(data);
    postData()
}
let postData = () => {
    tbody.innerHTML = ''
   data.map((x,y)=>{
    const {name, email, message} = x
    return (
        tbody.innerHTML += 
        `
        <tr id=${y}>
            <td>${name}</td>
            <td>${email}</td>
            <td>${message}</td>
            <td>
                <button onclick="editItem(this)"><i class="bi bi-pencil-square"></i></button>
                <button onclick="deleteItem(this)"><i class="bi bi-trash"></i></button>
            </td>
      </tr>
        `
    )
   })
 
}

let deleteItem = (e) =>{
    e.parentElement.parentElement.remove()
    data.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem('data', JSON.stringify(data))
    console.log(data)
}

let editItem = (e) => {
    let selectedItem = e.parentElement.parentElement
    nameInput.value = selectedItem.children[0].innerHTML
    emailInput.value = selectedItem.children[1].innerHTML
    message.value = selectedItem.children[2].innerHTML

    deleteItem(e)
}

(()=>{
    data = JSON.parse(localStorage.getItem('data')) || []
    postData();
})()




