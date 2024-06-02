document.addEventListener("DOMContentLoaded", () => {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const modelo = urlParams.get('modelo');
  
    // Establecer el valor del campo de ID de usuario y modelo
    document.getElementById('userId').value = userId;
    document.getElementById('modelo').value = modelo;
  
    // Clase para indicar en dónde se encuentra el usuario
    document.getElementById('reservar').classList.add('active-header');
  
    // Mantener la sesión activa
    document.getElementById('perfil').addEventListener('click', () => {
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('id');
      if (userId) {
        window.location.href = `../frontend/user.html?id=${userId}`;
      }
    });
  
    // Manejar el envío del formulario
    document.getElementById('reservationForm').addEventListener('submit', function(event) {
      event.preventDefault();
      alert('¡Reserva realizada con éxito para el ' + modelo + '!');
  
      // Aquí puedes agregar el código para enviar los datos al servidor
      const formData = new FormData(this);
      formData.append('accion', 'reservar');
      fetch('../backend/index.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('¡Reserva realizada con éxito!');
        } else {
          alert('Hubo un problema con la reserva: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error en la conexión con el servidor');
      });
    });
  
    // Obtener modelos de autos desde la base de datos
    fetch('../backend/index.php?accion=getModelos')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const modeloSelect = document.getElementById('modelo');
          modeloSelect.innerHTML = ''; // Limpiar opciones existentes
          data.modelos.forEach(modelo => {
            const option = document.createElement('option');
            option.value = modelo.id_carro;
            option.textContent = `${modelo.marca} - ${modelo.modelo}`;
            modeloSelect.appendChild(option);
          });
        } else {
          console.error('Error al obtener los modelos:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  