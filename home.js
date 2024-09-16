let name2 = document.getElementById('userName');
let userName = localStorage.getItem('userName');
let exitBtn = document.getElementById('exitBtn')

name2.textContent = `Welcome ${userName}`

exitBtn.addEventListener('click', () => {
    localStorage.removeItem('userName');
    window.location.href = 'login.html'
    
})
