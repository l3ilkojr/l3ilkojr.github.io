const login = document.querySelector('#login');
const userName = document.querySelector('#userName');
const password = document.querySelector('#password');
const msg= document.querySelector(".msg");

// Listen for a login event on the form
login.addEventListener('submit', onLogin);

function onLogin(e) {
    e.preventDefault();

    // Form validation
    if (userName.value === '' || password.value === '') {
        msg.innerHTML = 'Please enter username and password';
        setTimeout(() => msg.remove() , 3000);
    } else {

        // Validate the userName and password
        if (userName.value === 'admin' && password.value === 'password') {
            msg.innerHTML = 'Enter the correct username and password'
            setTimeout(() => msg.remove(), 3000);
        } else {
            alert('Login success');
        }
    }
}
