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
      $userController->entregarCarro($idPedido);
    } elseif ($accion == 'usuarioDatos') {
      $idUser = $_POST['id'];
      $userController->obtenerUsuarioData($idUser);
    } elseif ($accion == 'reservar') {
      $userController->reservar();
    }
    break;
  case 'GET':
    if (isset($_GET['accion']) && $_GET['accion'] == 'getModelos') {
      $userController->getModelos();
    }
    break;
}
?>