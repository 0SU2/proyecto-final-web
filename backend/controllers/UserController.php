<?php
  require_once '../backend/services/UserService.php';

  class UserController {
    private $userService;

    public function __construct() 
    {
      $db =  (new Database())->getConnection();
      $this->userService = new UserService($db);
    }

		public function login() {
			if($_SERVER["REQUEST_METHOD"] == "POST") {
				$usuario = $_POST['usuario'];
				$password =$_POST['password'];

				if(!empty($usuario) && !empty($password)) {
					$user = $this->userService->login($usuario, $password);
					if($user) {
						session_start();
						echo json_encode(array("success" => true, "message" => "Inicio Satisfactorio", 'result' => session_id()));
					} else {
						echo json_encode(array("success" => false, "message" => "Credenciales Incorrectas"));
					}
				} else {
					echo json_encode(array("success" => false, "message" => "Rellene bien la casilla"));
				}
			} else {
				echo json_encode(array("success" => false, "message" => "Tipo de peticion incorrecta"));
			}
		}

		public function registrar () {
			$nombre = $_POST['nombre'];
			$apaterno = $_POST['apaterno'];
			$amaterno = $_POST['amaterno'];
			$correo = $_POST['correo'];
			$usuario = $_POST['usuario'];
			$password = $_POST['password'];

			$usuarioNuevo = new User($usuario, $nombre, $apaterno, $amaterno, $correo, $password);
			
			$resultado = $this->userService->registrarUsuario($usuarioNuevo);
			if($resultado) {
				echo json_encode(array('success' => true, 'message' => 'Registro Exitoso'));
			} else {
				echo json_encode(array('success' => false, 'message' => 'Error al registar'));
			}
		}

  }

?>