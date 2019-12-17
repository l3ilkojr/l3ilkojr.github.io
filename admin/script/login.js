const login = document.querySelector('#login');
const userName = document.querySelector('#userName');
const password = document.querySelector('#password');
const msg= document.querySelector(".msg");

// Listen for a login event on the form
login.addEventListener('submit', onLogin);



function onLogin(e) {
    e.preventDefault();
    
    if (uerName.value === '' || password.value === '') {
        msg.innerHTML = 'Please If your not a admin don\'t try login.';
        setTimeout(() => msg.remove(), 3000);
    } else {
        if (userName.value === 'admin' && password.value === 'adminlogin') {
            window.location.href = "https://l3ilkojr.github.io/admin/adminpage.html
        } else {
            alert('Nope');
        }
    }
}
