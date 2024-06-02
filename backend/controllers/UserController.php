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
						echo json_encode(array("success" => true, "message" => "Inicio Satisfactorio", 'result' => $user['id']));
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
				$userId = $this->userService->getUserId($usuario, $password);
				echo json_encode(array('success' => true, 'message' => 'Registro Exitoso', 'result' => $userId));
			} else {
				echo json_encode(array('success' => false, 'message' => 'Error al registar'));
			}
		}

		public function getAllUserPedidos($userId) {
			$data = $this->userService->getPedidosUser($userId);
			echo json_encode(array('success' => true, 'result' => $data));
		}

		public function entregarCarro($id_pedido) {
			$response = $this->userService->entregarCarroUsuario($id_pedido);
			if($response) {
				echo json_encode(array('success' =>  true, 'message' => 'Informacion actualizada!'));
			} else {
				echo json_encode(array("succes" => false, 'message' => 'Error'));
			}
		}

		public function obtenerUsuarioData($userId) {
			$response = $this->userService->datosCompletosUsuario($userId);
			echo json_encode(array('success' => true, 'result' => $response));
		}

		public function getModelos() {
				$modelos = $this->userService->getModelosDisponibles();
				echo json_encode(array('success' => true, 'modelos' => $modelos));
		}

		public function reservar() {
			$id_usuario = $_POST['id_usuario'];
			$id_carro = $_POST['id_carro'];
			$dia_alquilacion = $_POST['dia_alquilacion'];
			$costo_total = (int)($_POST['costo_total']);
			$estatus = $_POST['estatus'];
			$modelo = $_POST['modelo'];

			$result = $this->userService->reservarAuto($id_usuario, $id_carro, $dia_alquilacion, $costo_total, $estatus, $modelo);
			
			if ($result) {
				echo json_encode(array('success' => true, 'message' => 'Reserva realizada con éxito'));
			} else {
				echo json_encode(array('success' => false, 'message' => 'Error al realizar la reserva'));
			}
		}

  }

?>