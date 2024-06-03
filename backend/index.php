
<?php
  require_once '../backend/controllers/UserController.php';

  $userController = new UserController();
  switch ($_SERVER["REQUEST_METHOD"]) {
    case 'POST':
      $accion = $_POST['accion'];
      if($accion == 'registrar') {
        $userController->registrar();
      }
      if($accion == 'login') {
        $userController->login();
      }
      break;
    case 'GET': 
      $accion = $_GET['accion'];
      if($accion == 'todos') {
        $userController->obtenerTodosCarros();
      }
      break;
  }

?>