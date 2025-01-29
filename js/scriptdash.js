const apiBaseUrl =`https://terasoluciones.com.mx/todolist/API/index.php`;
const user_Id = localStorage.getItem(`user_id`);
const pin = localStorage.getItem(`pin`);

async function loadTasks() {
    let response;
    try{
        response = await axios.get(`${apiBaseUrl}/tasks`,{
            params:{user_Id, pin}
        });
        console.log(JSON.stringify(response));
        const tasks = response.data;
        const tasksList =document.getElementById(`task-list`);
        tasksList.innerHTML =``;
        tasks.forEach(task=>{
            const row = document.createElement(`tr`);
            row.innerHTML = `
            <td>${task.description}</td>
            <td>${task.start_date}</td>
            <td>${task.end_date}</td>
            <td class ="action-icons">
            <i onclick = "viewphoto(`${task.photo}`)">&#128247;</i>
            <i onclick = "editTask(${task.id})">&#9998;</i>
            <i onclick = "deleteTask(${task.id})">&#128465;</i>
            <i onclick = "marKAsComplete(${task.id})">&#9989;</i>
            </td> 
            `;
            tasksList.appendChild(row);
        });

        }  catch(error){alert(`Failed to load tasks:` + error.messaje);
            
         }
     }
    
}