const urlParams = new URLSearchParams(queryString);
let p = document.getElementById('user')

const id = urlParams.get('id')

console.log(id);