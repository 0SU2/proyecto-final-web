<?php
  interface UserInterface {
    public function registrarUsuario($usuario);
    public function login($usuario, $password);
    public function obtenerTodosCarros();
  }

?>