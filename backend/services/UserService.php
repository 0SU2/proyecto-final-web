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
        $sql_query = "SELECT modelo FROM carros WHERE cantidad > 0";
        
        $result = $this->db->query($sql_query);
        $modelos = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $modelos[] = $row['modelo'];
            }
        }
        return $modelos;
    }

    public function reservarAuto($userId, $modeloId, $fecha, $duracion) {
        $sql_query = "INSERT INTO reservas (user_id, modelo_id, fecha, duracion) VALUES ('$userId', '$modeloId', '$fecha', '$duracion')";
        if ($this->db->query($sql_query) === TRUE) {
            return true;
        } else {
            return false;
        }
    }
}
?>