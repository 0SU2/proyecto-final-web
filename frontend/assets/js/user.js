const titleUser = document.getElementById('title-dashboard');
const usuarioTablaDatos = document.getElementById('rowCarros').content;
const usuarioOrdenes = document.getElementById('usuarioOrdenes');
const fragment = document.createDocumentFragment();

const idForm = document.getElementById('idForm');
let todosLosPedidos = document.getElementById('accion');
let pedidosId = document.getElementById('id');

document.addEventListener('DOMContentLoaded', () => {
    // leer un parametro
    const params = new URLSearchParams(window.location.search);
    const userId =  params.get('id');
    if(userId) {
        console.log(' id => ', userId);
        obtenerDatosUsuario(userId);
        loadData(userId)
    }
})

const obtenerDatosUsuario = (userId) => {
  titleUser.innerHTML = userId
}

const loadData = (userId) => {
  // obtener los datos de sus ordenes
  pedidosId.value = userId;
  todosLosPedidos.value = 'todosLosPedidos';
  const form = new FormData(idForm);
  console.log(form);
  fetch('../backend/index.php', {
    method: 'POST',
    body: form,
  })
  .then(response => response.json())
  .then((res) => {
    cargarDatosUsuario(res.result);
  })
  .catch(error => {
    console.log(error);
  })
}

const cargarDatosUsuario = (data) => {
  usuarioOrdenes.innerHTML = '';
  console.log(data);
  data.forEach((data) => {
    const clone = usuarioTablaDatos.cloneNode(true);
    clone.querySelectorAll('td')[0].textContent = data.id_carro;
    clone.querySelectorAll('td')[1].textContent = data.modelo
    clone.querySelectorAll('td')[2].textContent = data.dia_alquilacion;
    clone.querySelectorAll('td')[3].textContent = data.costo_total;
    clone.querySelectorAll('td')[4].textContent = data.estatus;
    clone.querySelector('.btn-success').dataset.id = data.id_carro;

    const btnActualizar = clone.querySelector('.btn-success');
    btnActualizar.addEventListener('click', () => {
        console.log('@@ btnEntregado => ', btnActualizar.dataset.id);
        entregarCarro(btnActualizar.dataset.id);
    })

    fragment.appendChild(clone);
  }); 

  usuarioOrdenes.appendChild(fragment);
}

const entregarCarro = (id) => {
  // boton para entregar el carro
  console.log(id);
}