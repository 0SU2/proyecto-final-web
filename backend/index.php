<?php
require_once '../backend/controllers/UserController.php';

$userController = new UserController();

switch ($_SERVER["REQUEST_METHOD"]) {
  case 'POST':
    $accion = $_POST['accion'];
    if ($accion == 'registrar') {
      $userController->registrar();
    } elseif ($accion == 'login') {
      $userController->login();
    } elseif ($accion == 'todosLosPedidos') {
      $idUser = $_POST['id'];
      $userController->getAllUserPedidos($idUser);
    } elseif ($accion == 'entregarCarro') {
      $idPedido = $_POST['id'];
      $idCarro = $_POST['idCarro'];
      $userController->entregarCarro($idPedido, $idCarro);
    } elseif ($accion == 'usuarioDatos') {
      $idUser = $_POST['id'];
      $userController->obtenerUsuarioData($idUser);
    } elseif ($accion == 'reservar') {
      $userController->reservar();
    }
    break;
  case 'GET':
      $accion = $_GET['accion'];
      if($accion == 'todos') {
        $userController->obtenerTodosCarros();
      }
    if (isset($_GET['accion']) && $_GET['accion'] == 'getModelos') {
      $userController->getModelos();
    }
    break;
}

?>