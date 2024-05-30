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
    // Datos del formulario
    const formData = new FormData(this);
    formData.append('accion', 'reservar');
    formData.append('modelo', modelo);

    // Opciones de la petición
    const options = {
        method: 'POST',
        body: formData
    };

    // Enviar los datos al servidor
    fetch('../backend/index.php', options)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('¡Reserva realizada con éxito para el ' + modelo + '!');
                // Redirigir a una página de confirmación o similar
                window.location.href = `../frontend/confirmacion.html?id=${data.result}`;
            } else {
                alert('Error al realizar la reserva: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con la solicitud. Por favor, inténtelo de nuevo más tarde.');
        });
  });