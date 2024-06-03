const carrosBody = document.getElementById('carrosBody');
const rowCarros = document.getElementById('rowCarros').content;
const fragment = document.createDocumentFragment();
let inputId = document.getElementById('id');
  
document.addEventListener('DOMContentLoaded', () => {
    loadAllCars();
})
  
const loadAllCars = () => {
    fetch('../backend/index.php?accion=todos')
    .then((res) => res.json())
    .then(data => {
    console.log('@@ data => ', data);
    if (data.carros && data.carros.length > 0 ) {
        pinterCarros(data.carros);
    }
    })
    .catch(err => {
      console.log('@@ error loadAll => ', err);
    })
}
  
const pinterCarros = (carros) => {
    carrosBody.innerHTML = '';
    carros.forEach((car) => {
        const clone = rowCarros.cloneNode(true);
        clone.querySelectorAll('td')[0].textContent = car.id;
        clone.querySelectorAll('td')[1].textContent = car.modelo;
        clone.querySelectorAll('td')[2].textContent = car.categoria;
        clone.querySelectorAll('td')[3].textContent = car.precio;
        clone.querySelectorAll('td')[4].textContent = car.descripcion;
        clone.querySelectorAll('td')[5].textContent = car.disponibles;
        clone.querySelectorAll('td')[6].textContent = car.estatus;

        if (car.estatus === 'Disponible') {
            const btnReservar = document.createElement('button');
            btnReservar.textContent = 'Reservar';
            btnReservar.classList.add('btn', 'btn-primary');
            btnReservar.addEventListener('click', () => {
                window.location.href = '../frontend/reservar.html';
            });
        clone.appendChild(btnReservar);
        }
        fragment.appendChild(clone);
    }); 
    carrosBody.appendChild(fragment);
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    loadAllCars();
});
