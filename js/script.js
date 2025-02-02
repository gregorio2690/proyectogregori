const apiBaseUrl = 'https://terasoluciones.com.mx/todolist/API/index.php';
async function login(){
    const username = document.getElementById('username').value;
    const pin = document.getElementById('pin').value;


    try {
        const response = await axios.post(`${apiBaseUrl}/login`, {
        username, pin });
        console.log(JSON.stringify(response.data));
        if(response.data.user_id){
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('pin',pin);
            window.location.href = 'dashboard.html';
        } else{
            alert('login failed: User ID not found');
        }
    }catch (error){
        alert('login failed: ' + (error.response?.data?.error ||
            error.message));
 
       }


       
}
