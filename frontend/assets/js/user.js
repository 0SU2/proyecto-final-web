const headerSelected = document.getElementById('perfil');
const titleUser = document.getElementById('title-dashboard');
const usuarioTablaDatos = document.getElementById('rowCarros').content;
const usuarioOrdenes = document.getElementById('usuarioOrdenes');
const fragment = document.createDocumentFragment();

const idForm = document.getElementById('idForm');
let accion = document.getElementById('accion');
let pedidosId = document.getElementById('id');
let carroId = document.getElementById('idCarro');

document.getElementById('perfil').addEventListener('click', () => {
    // leer un parametro
    const params = new URLSearchParams(window.location.search);
    const userId =  params.get('id');
    if(userId) {
      window.location.href = `../frontend/user.html?id=${userId}`;
      return;
    }
})

document.getElementById('reservar').addEventListener('click', () => {
    // leer un parametro
    const params = new URLSearchParams(window.location.search);
    const userId =  params.get('id');
    if(userId) {
      window.location.href = `../frontend/modelosDis.html?id=${userId}`;
      return;
    }
})

document.addEventListener('DOMContentLoaded', () => {
  headerSelected.classList.add('active-header');
    // leer un parametro
    const params = new URLSearchParams(window.location.search);
    const userId =  params.get('id');
    if(userId) {
        obtenerDatosUsuario(userId);
        loadData(userId)
    }
})

const obtenerDatosUsuario = (userId) => {
  pedidosId.value = userId;
  accion.value = 'usuarioDatos';
  const form = new FormData(idForm);
  fetch('../backend/index.php', {
    method: 'POST',
    body: form,
  })
  .then(response => response.json())
  .then((res) => {
    titleUser.innerHTML = res.result.usuario;
  })
  .catch(err => {
    console.log(err);
  })
}

const loadData = (userId) => {
  // obtener los datos de sus ordenes
  pedidosId.value = userId;
  accion.value = 'todosLosPedidos';
  const form = new FormData(idForm);
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
  data.forEach((data) => {
    const clone = usuarioTablaDatos.cloneNode(true);
    clone.querySelectorAll('td')[0].textContent = data.id_carro;
    clone.querySelectorAll('td')[1].textContent = data.modelo
    clone.querySelectorAll('td')[2].textContent = data.dia_alquilacion.substring(0,10);
    clone.querySelectorAll('td')[3].textContent = '$' + data.costo_total;
    clone.querySelectorAll('td')[4].textContent = data.estatus;
    clone.querySelector('.btn').dataset.id = data.id_pedido;

    if(data.estatus.includes('reservado')) {
      clone.querySelector('.btn').classList.add('btn-success');
      clone.querySelectorAll('td')[4].classList.add('text-warning');
      const btnActualizar = clone.querySelector('.btn');
      btnActualizar.addEventListener('click', () => {
          entregarCarro(btnActualizar.dataset.id, data.id_carro);
      })
    } else {
      clone.querySelector('.btn').textContent = "finalizado";
      clone.querySelector('.btn').classList.add('btn-danger');
      clone.querySelectorAll('td')[4].classList.add('text-success');

    }

    fragment.appendChild(clone);
  }); 

  usuarioOrdenes.appendChild(fragment);
}

const entregarCarro = (id, idCarro) => {
  // boton para entregar el carro
  pedidosId.value = id;
  carroId.value = idCarro
  accion.value = 'entregarCarro';
  const form = new FormData(idForm);
  fetch('../backend/index.php', {
    method: 'POST',
    body: form,
  })
  .then(response => response.json())
  .then((res) => {
    if(res.success) { 
      alert(res.message);
      window.location.reload();
    }
  })
  .catch(error => {
    console.log(error);
  })
}