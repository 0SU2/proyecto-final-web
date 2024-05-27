const buttonAuto = document.getElementById('renta-autos');
const buttonCamionetas = document.getElementById('renta-camionetas');
const buttonAutosLujo = document.getElementById('autos-lujo');

if(buttonAuto) {
  buttonAuto.addEventListener('click', (event) => {
    console.log(event.target);
  })
}

if(buttonCamionetas) {
  buttonCamionetas.addEventListener('click', (event) => {
    console.log(event.target);
  })
}

if(buttonAutosLujo) {
  buttonAutosLujo.addEventListener('click', (event) => {
    console.log(event.target);
  })
}