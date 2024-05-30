
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
      if($accion == 'todosLosPedidos') {
        $idUser = $_POST['id'];
        $userController->getAllUserPedidos($idUser);
      }
      break;

  }

?>