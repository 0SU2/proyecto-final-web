<?php
  interface UserInterface {
    public function registrarUsuario($usuario);
    public function login($usuario, $password);
    public function obtenerTodosCarros();
    public function getUserId($usuario, $password);
    public function getPedidosUser($userId);
    public function entregarCarroUsuario($id_pedido, $id_carro);
    public function datosCompletosUsuario($idUsuario);
    public function getModelosDisponibles();
    public function reservarAuto($id_usuario, $id_carro, $dia_alquilacion, $costo_total, $estatus, $modelo);
  }

?>