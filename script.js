const list = JSON.parse(localStorage.getItem('taskList')) || [];
const form = document.querySelector('#form-block');
const tableTask = document.querySelector('#task-list')

function addTask(name, deadline){
    const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        deadline,
        done:null
    };
    list.push(newTask);
    localStorage.setItem('taskList', JSON.stringify(list));
    render(newTask);
}

function deleteTask(id){
    const task = document.getElementById(id);
    task.remove();

    const taskIndex = list.findIndex(e=> e.id ===id);
    list.splice(taskIndex, 1);
    localStorage.setItem('taskList', JSON.stringify(list));

}

function doneTask(id){
    const nameElement = document.getElementById(id).querySelector('.task-name');

    const task = list.find(e=>e.id===id);
    if(task.done){
        task.done=null;
        nameElement.style.textDecoration = "none";
    }else{
        task.done = new Date();
        nameElement.style.textDecoration =  "line-through";
    }
    localStorage.setItem('taskList', JSON.stringify(list));

}

function render(task){
    const {id, name, deadline, done} = task;
    const taskLine = document.createElement('tr');
    const check = done ? 'checked': 'unchecked';
    const nameDecoration = done ? 'line-through': 'none';

    taskLine.id = id;
    taskLine.innerHTML=`
        <td>
            <input type="checkbox" ${check} onchange="doneTask('${id}')" class="task-input-done" />
        </td>
        <td class="task-name" style="text-decoration: ${nameDecoration};">${name}</td>
        <td class="task-dedline">${new Date(deadline).toLocaleDateString()}</td>
        <td>
            <button type="button" onclick="deleteTask('${id}')" >Remover</button> 
        </td>
    `;

    tableTask.appendChild(taskLine);

}

form.addEventListener('submit',e =>{
    e.preventDefault();
    const name = form['name'].value;
    const deadline = form['deadline'].value;
    const error = document.querySelector('.error')

    if(name && deadline){
        addTask(name, deadline);
        form['name'].value = '';
        form['deadline'].value = '';
        error.style.display = 'none';
    }else error.style.display = 'block';
})

list.map(task => render(task));