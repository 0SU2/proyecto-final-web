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
      console.log('response => ', res);
      if(!res.succes) {
        alert(res.message)
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
      console.log('server res =>', res)
      if(!res.succes) {
        alert(res.message)
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