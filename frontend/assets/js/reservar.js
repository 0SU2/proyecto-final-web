  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const modelo = urlParams.get('modelo');

  // Establecer el valor del campo de modelo
  document.getElementById('modelo').value = modelo;

  // una class list propia para indicar en donde se encuentra el usuario
  document.getElementById('reservar').classList.add('active-header');
 
  // para mantener la session activa
  document.getElementById('perfil').addEventListener('click', () => {
    // leer un parametro
    const params = new URLSearchParams(window.location.search);
    const userId =  params.get('id');
    if(userId) {
      window.location.href = `../frontend/user.html?id=${userId}`;
      return;
    }
  })

  // Manejar el envío del formulario
  document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('¡Reserva realizada con éxito para el ' + modelo + '!');
    // Aquí puedes agregar el código para enviar los datos a tu servidor
  });