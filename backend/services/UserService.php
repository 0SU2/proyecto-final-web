<?php
  require_once '../backend/models/User.php';
  require_once '../backend/db/Database.php';
  require_once '../backend/interfaces/UserInterface.php';

  class UserService implements UserInterface {
    private $db;
    
    public function __construct($db)
    {
      $this->db = $db; 
    }

    public function registrarUsuario($usuario) 
    {
      $nombre = $usuario->nombre;
      $username = $usuario->usuario;
      $apaterno = $usuario->apaterno;
      $amaterno = $usuario->apaterno;
      $correo = $usuario->getCorreo();
      $password = password_hash($usuario->getPassword(), PASSWORD_DEFAULT);

			$sql_insertar = "INSERT INTO usuarios (id, usuario, nombre, apaterno, amaterno, correo, password) 
                          VALUES (null, '$username','$nombre', '$apaterno', '$amaterno', '$correo',  '$password')";

      if($this->db->query($sql_insertar) === TRUE) {
        return true;
      } else {
        return false;
      }

    }

		public function login($usuario, $password) {
			$sql_usuario = "SELECT * FROM usuarios WHERE usuario= '$usuario'";
			$result = $this->db->query($sql_usuario);
			if ($result->num_rows == 1) {
				$user = $result->fetch_assoc();
				if (password_verify($password, $user['password'])) {
					return $user;
				}
			}
			return false;
		}
    
  }

?>