<?php
require_once '../backend/models/User.php';
require_once '../backend/db/Database.php';
require_once '../backend/interfaces/UserInterface.php';

class UserService implements UserInterface {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function registrarUsuario($usuario) {
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

    public function getUserId($usuario, $password) {
        $sql_usuario = "SELECT * FROM usuarios WHERE usuario= '$usuario'";
        $result = $this->db->query($sql_usuario);
        if($result->num_rows == 1) {
            $user = $result->fetch_assoc();
            if(password_verify($password, $user['password'])) {
                return $user['id'];
            }
        }
    }

    public function getPedidosUser($userId) {
        $sql_query = "SELECT * FROM pedidos WHERE id_usuario='$userId' ";
        $result = $this->db->query($sql_query);
        $data = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function entregarCarroUsuario($id_pedido) {
        $sql_query = "UPDATE pedidos SET estatus = 'entregado' WHERE id_pedido = $id_pedido";

        if($this->db->query($sql_query) == TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function datosCompletosUsuario($idUsuario) {
        $sql_query = "SELECT usuario FROM `usuarios` WHERE id = $idUsuario";
        $result = $this->db->query($sql_query);
        return $result->fetch_assoc();
    }

    // Nueva función para obtener los modelos disponibles
    public function getModelosDisponibles() {
        $sql_query = "SELECT id, modelo, categoria, precio, descripcion, disponibles, estatus FROM carros WHERE disponibles > 0";
        
        $result = $this->db->query($sql_query);
        $modelos = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $modelos[] = $row;
            }
        }
        return $modelos;
    }

    public function reservarAuto($id_usuario, $id_carro, $dia_alquilacion, $costo_total, $estatus, $modelo) {
        $sql_query = "INSERT INTO pedidos (id_usuario, id_carro, dia_alquilacion, costo_total, estatus, modelo) VALUES ('$id_usuario', '$id_carro', '$dia_alquilacion', $costo_total, '$estatus', '$modelo')";
        if ($this->db->query($sql_query) === TRUE) {
            return true;
        } else {
            return false;
        }
    }    
}
		public function login($usuario, $password) {
			$sql_usuario = "SELECT * FROM usuarios WHERE usuario= '$usuario'";
      $query = $this->db->prepare("SELECT * FROM usuarios WHERE correo = :username AND password = :pass");
			$result = $this->db->query($sql_usuario);
			if ($result->num_rows == 1) {
				$user = $result->fetch_assoc();
				if (password_verify($password, $user['password'])) {
					return $user;
				}
			}
			return false;
		}

    public function obtenerTodosCarros() {
			$sql = "SELECT * FROM carros";
			$result = $this->db->query($sql);
			$carros = array();

			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$carros[] = $row;
				}
			}

			return $carros;
		}
    
  }

?>


