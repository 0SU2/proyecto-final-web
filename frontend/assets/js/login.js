const registrarForm = document.getElementById('registrarForm') || null;
const loginForm = document.getElementById('loginForm') || null;
const buttonSignIn = document.getElementById('gotSignIn') || null
const buttonSingUp = document.getElementById('gotSignUp')

if(loginForm) {
  loginForm.addEventListener('submit', (event) => {
    console.log("Inicio de session...");
    event.preventDefault();
    const form = new FormData(loginForm);
    fetch('../backend/index.php', {
      method: 'POST',
      body: form
    })
    .then((response) => response.json())
    .then((res) => {
      if(res.success) {
        alert(res.message)
        window.location.href = `../frontend/user.html?id=${res.result}`
        return;
      } else {
        alert(res.message);
        return;
      }

    })
    .catch((err) => {
      console.log('error => ', err);
    })
  });
}

if(registrarForm) {
  registrarForm.addEventListener('submit', (event) => {
    console.log("Registrando...");
    event.preventDefault();
    const form = new FormData(registrarForm);
    fetch('../backend/index.php', {
      method: 'POST',
      body: form
    })
    .then((response) => response.json())
    .then((res) => {
      if(res.success) {
        alert(res.message)
        window.location.href = `../frontend/user.html?id=${res.result}`
        return;
      } else {
        alert(res.message);
        return;
      }
    })
    .catch((err) => {
      console.log('server error =>', err)
    });
  });
}

if(buttonSignIn) {
  buttonSignIn.addEventListener('click', () => {
    window.location.href = '../frontend/register.html'
  })
}

if(buttonSingUp) {
  buttonSingUp.addEventListener('click' , () => {
    window.location.href = '../frontend/login.html'
  })
}