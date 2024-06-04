const carrosBody = document.getElementById('carrosBody');
const camionetasBody = document.getElementById('camionetasBody');
const carrosLujoBody = document.getElementById('carrosLujoBody');

const rowCarros = document.getElementById('rowCarros').content;

const fragmentCarros = document.createDocumentFragment();
const fragmentCamionetas = document.createDocumentFragment();
const fragmentDeLujo = document.createDocumentFragment();

let inputId = document.getElementById('id');
const headerSelected = document.getElementById('reservar');

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
    // leer un parametro
    const params = new URLSearchParams(window.location.search);
    const userId =  params.get('id');
    headerSelected.classList.add('active-header');
    loadAllCars(userId);
})
  
const loadAllCars = (userId) => {
    fetch('../backend/index.php?accion=todos')
    .then((res) => res.json())
    .then(data => {
    console.log('@@ data => ', data);
    if (data.carros && data.carros.length > 0 ) {
        pinterCarros(userId, data.carros);
    }
    })
    .catch(err => {
      console.log('@@ error loadAll => ', err);
    })
}
  
const pinterCarros = (userId, carros) => {
    carrosBody.innerHTML = '';
    camionetasBody.innerHTML = '';
    carrosLujoBody.innerHTML = '';

    // vamos a crear tablas con la foto del modelo y secciones
    carros.forEach(element => {
        if(element.categoria.includes('Autos')) {
            const clone = document.getElementById('rowCarros').content.cloneNode(true);
            clone.querySelectorAll('img')[0].setAttribute('src', element.foto)
            clone.querySelectorAll('b')[0].textContent = element.modelo;
            clone.querySelectorAll('p')[0].textContent = element.descripcion;
            clone.querySelectorAll('p')[1].textContent = 'Disponibles: ' + element.disponibles;
            clone.querySelector('.btn').dataset.id = element.id;
            // checar que el carro tenga carros disponibles, si tiene, el boton estara disponible
            if(element.disponibles == 0) {
                clone.querySelector('.btn').textContent = "Agotado";
                clone.querySelector('.btn').classList.add('btn-danger');
            } else {
                // caso de que si tengamos alguno disponible
                clone.querySelector('.btn').textContent = "Reservar";
                clone.querySelector('.btn').classList.add('btn-success');
                // funcionalidad para reservar el carro
                const reservarBoton = clone.querySelector('.btn');
                reservarBoton.addEventListener('click', () => {
                    // al momento de que el usuario de click, mandarlo a la pagina de reserva con el id del
                    // usuario y del carro que quiere reservar
                    window.location.href = `../frontend/reservar.html?id=${userId}&carId=${reservarBoton.dataset.id}`
                })

            }
            fragmentCarros.appendChild(clone);
        }
        if(element.categoria.includes('Camionetas')) {
            const clone = document.getElementById('rowCarros').content.cloneNode(true);
            clone.querySelectorAll('img')[0].setAttribute('src', element.foto)
            clone.querySelectorAll('b')[0].textContent = element.modelo;
            clone.querySelectorAll('p')[0].textContent = element.descripcion;
            clone.querySelectorAll('p')[1].textContent = 'Disponibles: ' + element.disponibles;
            clone.querySelector('.btn').dataset.id = element.id;
            // checar que el carro tenga carros disponibles, si tiene, el boton estara disponible
            if(element.disponibles == 0) {
                clone.querySelector('.btn').textContent = "Agotado";
                clone.querySelector('.btn').classList.add('btn-danger')
            } else {
                // caso de que si tengamos alguno disponible
                clone.querySelector('.btn').textContent = "Reservar";
                clone.querySelector('.btn').classList.add('btn-success');
                // funcionalidad para reservar el carro
                const reservarBoton = clone.querySelector('.btn');
                reservarBoton.addEventListener('click', () => {
                    // al momento de que el usuario de click, mandarlo a la pagina de reserva con el id del
                    // usuario y del carro que quiere reservar
                    window.location.href = `../frontend/reservar.html?id=${userId}&carId=${reservarBoton.dataset.id}`
                })


            }
            fragmentCamionetas.appendChild(clone);
        }
        if(element.categoria.includes('Coches de Lujo')) {
            const clone = document.getElementById('rowCarros').content.cloneNode(true);
            clone.querySelectorAll('img')[0].setAttribute('src', element.foto)
            clone.querySelectorAll('b')[0].textContent = element.modelo;
            clone.querySelectorAll('p')[0].textContent = element.descripcion;
            clone.querySelectorAll('p')[1].textContent = 'Disponibles: ' + element.disponibles;
            clone.querySelector('.btn').dataset.id = element.id;
            // checar que el carro tenga carros disponibles, si tiene, el boton estara disponible
            if(element.disponibles == 0) {
                clone.querySelector('.btn').textContent = "Agotado";
                clone.querySelector('.btn').classList.add('btn-danger')
            } else {
                // caso de que si tengamos alguno disponible
                clone.querySelector('.btn').textContent = "Reservar";
                clone.querySelector('.btn').classList.add('btn-success')
                // funcionalidad para reservar el carro
                const reservarBoton = clone.querySelector('.btn');
                reservarBoton.addEventListener('click', () => {
                    // al momento de que el usuario de click, mandarlo a la pagina de reserva con el id del
                    // usuario y del carro que quiere reservar
                    window.location.href = `../frontend/reservar.html?id=${userId}&carId=${reservarBoton.dataset.id}`
                })
            }

            fragmentDeLujo.appendChild(clone);
        }
    });
    carrosBody.appendChild(fragmentCarros);
    camionetasBody.appendChild(fragmentCamionetas);
    carrosLujoBody.appendChild(fragmentDeLujo);
}