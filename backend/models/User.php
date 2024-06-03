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
  class Car {
      private $id;
      private $modelo;
      private $categoria;
      private $precio;
      private $descripcion;
      private $disponibles;
      private $estatus;

      // Creacion del Constructor de la Clase
      public function __construct ($modelo, $categoria, $precio, $descripcion, $disponibles, $estatus) {
          $this->modelo = $modelo;
          $this->categoria = $categoria;
          $this->precio = $precio;
          $this->descripcion = $descripcion;
          $this->disponibles = $disponibles;
          $this->estatus = $estatus;
      }

      // Getters y Setters para cada una de las propiedades
      public function getId () {
          return $this->id;
      }

      public function setId ($id) {
          $this->id = $id;
      }

      public function getModelo () {
          return $this->modelo;
      }

      public function setModelo ($modelo) {
          $this->modelo = $modelo;
      }

      public function getCategoria () {
          return $this->categoria;
      }

      public function setCategoria ($categoria) {
          $this->categoria = $categoria;
      }

      public function getPrecio () {
          return $this->precio;
      }

      public function setPrecio ($precio) {
          $this->precio = $precio;
      }

      public function getDescripcion () {
          return $this->descripcion;
      }

      public function setDescripcion ($descripcion) {
          $this->descripcion = $descripcion;
      }

      public function getDisponibles () {
          return $this->disponibles;
      }

      public function setDisponibles ($disponibles) {
          $this->disponibles = $disponibles;
      }

      public function getEstatus () {
          return $this->estatus;
      }

      public function setEstatus ($estatus) {
          $this->estatus = $estatus;
      }

  }

?>