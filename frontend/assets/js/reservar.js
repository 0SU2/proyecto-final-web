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
      console.log(formData);
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
              option.setAttribute('data-precio', modelo.precio); // Añade el precio como atributo de datos
              option.setAttribute('nombre-modelo', modelo.modelo); // añade el nombre del modelo como atributo de datos
              option.textContent = `${modelo.modelo} - ${modelo.categoria}`;
              modeloSelect.appendChild(option);
          });
      } else {
          console.error('Error al obtener los modelos:', data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });

  // Calcula el costo total en función de la duración y el precio del modelo
  document.getElementById('duracion').addEventListener('input', calculateCostoTotal);
  document.getElementById('modelo').addEventListener('change', calculateCostoTotal);
});

function calculateCostoTotal() {
  const modeloSelect = document.getElementById('modelo');
  const selectedOption = modeloSelect.options[modeloSelect.selectedIndex];
  const precioBase = parseFloat(selectedOption.getAttribute('data-precio'));
  const duracion = parseInt(document.getElementById('duracion').value);
  
  // obtener el nombre del modelo para asignarlo y mandarlo a la base de datos
  const nombreModelo = selectedOption.getAttribute('nombre-modelo');
  document.getElementById('modelo-nombre-completo').value = nombreModelo;

  if (!isNaN(precioBase) && !isNaN(duracion)) {
      const costoTotal = precioBase + ((duracion - 1) * 100); // Precio base + 100 por cada día adicional
      document.getElementById('costo_total').value = costoTotal;
  } else {
      document.getElementById('costo_total').value = '';
  }
}
