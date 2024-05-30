// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const modeloSeleccionado = urlParams.get('modelo');

// Función para cargar los modelos de autos desde el servidor
function cargarModelos() {
    fetch('../backend/index.php?accion=getModelos')
        .then(response => response.json())
        .then(data => {
            const selectModelo = document.getElementById('modelo');
            selectModelo.innerHTML = ''; // Limpiar el select antes de añadir los nuevos modelos
            data.modelos.forEach(modelo => {
                const option = document.createElement('option');
                option.value = modelo;
                option.textContent = modelo;
                if (modelo === modeloSeleccionado) {
                    option.selected = true; // Seleccionar el modelo pasado en la URL si existe
                }
                selectModelo.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los modelos:', error);
        });
}

// Añadir clase active-header al enlace de reservar
document.getElementById('reservar').classList.add('active-header');

// Para mantener la sesión activa
document.getElementById('perfil').addEventListener('click', () => {
    // Leer un parámetro
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    if (userId) {
        window.location.href = `../frontend/user.html?id=${userId}`;
    }
});

// Manejar el envío del formulario
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Datos del formulario
    const formData = new FormData(this);
    formData.append('accion', 'reservar');

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
                alert('¡Reserva realizada con éxito para el ' + formData.get('modelo') + '!');
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

// Cargar los modelos de autos al cargar la página
document.addEventListener('DOMContentLoaded', cargarModelos);
