//required element
const inputBox = document.querySelector('.input-field input');
const addBtn = document.querySelector('.input-field button');
const todoList = document.querySelector('.task-list')
const deleteAllBtn = document.querySelector('.footer button');

inputBox.onkeyup = () =>{
    let taskData = inputBox.value;
    if (taskData.trim() != 0){
        addBtn.classList.add('active');
    }else{
        addBtn.classList.remove('active');
    }
}

addTask(); //call the function

addBtn.onclick = ()=>{
    let taskData = inputBox.value;
    let getLocalStorage = localStorage.getItem('NewTodo');
    if (getLocalStorage == null){
        taskArr = [];
    }else{
        taskArr = JSON.parse(getLocalStorage); //json string into js obj
    }
    taskArr.push(taskData);
    localStorage.setItem('NewTodo', JSON.stringify(taskArr)); //js obj to json string
    addTask();
}

function addTask(){
    let getLocalStorage = localStorage.getItem('NewTodo');
    if (getLocalStorage == null){
        taskArr = [];
    }else{
        taskArr = JSON.parse(getLocalStorage); //json string into js obj
    }
     
    const availTask = document.querySelector('.availTask');
    availTask.innerHTML = taskArr.length;

    if (taskArr.length > 0){
        deleteAllBtn.classList.add('active');
    }else{
        deleteAllBtn.classList.remove('active');
    }

    let newList = '';
    taskArr.forEach((element, index) => {
        newList += `<li> ${element} <span onclick = deleteTask(${index})><i class="fas fa-trash"></i></span></li>`
    })
    todoList.innerHTML = newList;
    inputBox.value = ""; //this remove the input field when we add a list
}

inputBox.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        addBtn.click();
    }
})

//delete task
function deleteTask(index){
    let getLocalStorage = localStorage.getItem('NewTodo')
    taskArr = JSON.parse(getLocalStorage)
    taskArr.splice(index, 1);
    //update localstorage after delete list
    localStorage.setItem('NewTodo', JSON.stringify(taskArr));
    addTask();
}

//delete all task list
deleteAllBtn.onclick = ()=>{
     taskArr = []; //empty the array

     //update the localstorage
     localStorage.setItem('NewTodo', JSON.stringify(taskArr));
     addTask();
}

