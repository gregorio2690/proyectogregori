const apiBaseUrl ='https://terasoluciones.com.mx/todolist/API/index.php';
const userId = localStorage.getItem('user_id');
const pin = localStorage.getItem('pin');




async function loadTasks() {
    let response;
    try {


        response = await axios.get(`${apiBaseUrl}/tasks`, {
            params:{user_id: userId, pin }});
     console.log(JSON.stringify(response));
     const tasks = response.data;
     const taskList = document.getElementById('task-list');
     taskList.innerHTML = '';
     tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${task.description}</td>
        <td>${task.start_date}</td>
        <td>${task.end_date}</td>
         <td class = "action-icons">
         <i onclick="viewPhoto('${task.photo}')">&#128247;</i>
         <i onclick="editTask(${task.id})">&#9998;</i>
         <i onclick="deleteTask(${task.id})">&#128665;</i>
         <i onclick="marKAscompleted(${task.id})">&#9989;</i>
         </td>
         `;
         
         taskList.appendChild(row);
         });
    }catch(error){
        alert('Failed to load tasks: ' + error.menssage);
    }
}
async function addTask() {
    const description = document.getElementById('description').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const photoInput = document.getElementById('photo');
    if (photoInput.files.lenght === 0) {
        alert('please capture a photo.');
        return;
    }
    const photo =photoInput.files[0];
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('pin', pin);
    formData.append('description', description);
    formData.append('start_date', start_date);
    formData.append('end_date', end_date);
    formData.append('file', photo);
   try {
        const response = await axios.post(`${apiBaseUrl}/tasks`, formData,
    {
            headers: { 'Content-Type': 'multipart/form-data'}
        });
            console.log(JSON.stringify(response.data));
            alert('Task added successfully!');
            loadTasks();
    } catch (error) {
        alert('Failed to add task:' + error.message);
    }
}
async function deleteTask(taskId) {
    try {
        await axios.delete(`${apiBaseUrl}/tasks` , {
            data: { user_id: userId, pin, task_id: taskId}
        });
        alert('Task deleted successfully!');
        loadTasks();
    }catch(error){
        alert('Failed to delete task: ' + error.message)
    }
   
}
async function marKAscompleted(taskId){
    try {
        await axios.put(`${apiBaseUrl}/tasks` ,{
            user_id: userId,
            pin,
            task_id: taskId,
            status:'completed'
        });
        alert('Task marked as completed!');
        loadTasks();
    }catch (error) {
        alert('Failed to mark task as completed: ' + error.message);
    }
}


function viewPhoto (photoUrl){
    window.open(photoUrl, '_blank');
}
function editTask(taskId){
    alert('Edit functionality is under development.');
}
loadTasks();