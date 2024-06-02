document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');

  if (userId) {
    document.getElementById('userId').value = userId;
  } else {
    console.error('Error: No se pudo obtener el userId de la URL');
  }

  document.getElementById('reservar').classList.add('active-header');

  document.getElementById('perfil').addEventListener('click', () => {
      window.location.href = `../frontend/user.html?id=${userId}`;
  });

  document.getElementById('reservationForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(this);
      formData.append('accion', 'reservar');
      
      fetch('../backend/index.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
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

  fetch('../backend/index.php?accion=getModelos')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const modeloSelect = document.getElementById('modelo');
        modeloSelect.innerHTML = '';
        data.modelos.forEach(modelo => {
          const option = document.createElement('option');
          option.value = modelo.id;
          option.textContent = `${modelo.modelo} - ${modelo.categoria} - ${modelo.precio} - ${modelo.descripcion}`;
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
