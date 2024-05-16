<?php
  class User {
    public $id;
    public $usuario;
    public $nombre;
    public $apaterno;
    public $amaterno;
    private $correo;
    private $password;
    
    // Creacion del Constructor de la Clase
    public function __construct ($usuario, $nombre, $apaterno, $amaterno, $correo, $password) {
      $this->nombre = $nombre;
      $this->apaterno = $apaterno;
      $this->amaterno = $amaterno;
      $this->correo = $correo;
      $this->usuario = $usuario;
      $this->password = $password;
    }

    public function getCorreo() {
      return $this->correo;
    }

    public function setCorreo($correo) {
      $this->correo = $correo;
    }

    public function getPassword(){
      return $this->password;
    }

    public function setPassword($password) {
      $this->password = $password;
    }

    
  }

?>