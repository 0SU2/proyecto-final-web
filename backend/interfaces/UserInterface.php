<?php
  interface UserInterface {
    public function registrarUsuario($usuario);
    public function login($usuario, $password);
    public function getUserId($usuario, $password);
    public function getPedidosUser($userId);
    public function entregarCarroUsuario($id_pedido);
    public function datosCompletosUsuario($idUsuario);
  }

?>