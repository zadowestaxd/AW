<?php
	require_once __DIR__ . '/Aplicacion.php';
	require_once __DIR__ . '/Usuario.php';
	require_once __DIR__ . '/Form.php';

	class FormularioRegistro extends Form
	{
		private const FORM_ID = 'form-registro';

		public function __construct(string $action)
		{
			parent::__construct(self::FORM_ID, array('action' => $action));
		}
		
		protected function generaCamposFormulario($datosIniciales, $errores = [])
		{
			$nombreUsuario = '';
			$app = Aplicacion::getSingleton();

			if (!empty($datosIniciales))
			{
				$nombreUsuario = isset($datosIniciales['nombreUsuario']) ? $datosIniciales['nombreUsuario'] : $nombreUsuario;
			}

			$html = <<< HTML
				<fieldset>
					<legend>Usuario y contraseña</legend>
					<div class="grupo-control">
						<label>Nombre de usuario:</label> <input type="text" name="nombreUsuario"/>
					</div>
					<div class="grupo-control">
						<label>Nombre completo:</label> <input class="control" type="text" name="nombre"/>
					</div>
					<div class="grupo-control">
						<label>Password:</label> <input type="password" name="password" />
					</div>
					<div class="grupo-control">
						<label>Vuelve a introducir el Password:</label> <input class="control" type="password" name="password2"/>
					</div>
					<div class="grupo-control"><button type="submit" name="registro">Registrar</button></div>
				</fieldset>
			HTML;

			return $html;
		}
		
		protected function procesaFormulario($datos): void
		{
			$erroresFormulario = array();
			
			$nombreUsuario = isset($_POST['nombreUsuario']) ? $_POST['nombreUsuario'] : null;
			if ( empty($nombreUsuario) || mb_strlen($nombreUsuario) < 5 ) {
				$erroresFormulario['nombreUsuario'] = "El nombre de usuario tiene que tener una longitud de al menos 5 caracteres.";
			}
			
			$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
			if ( empty($nombre) || mb_strlen($nombre) < 5 ) {
				$erroresFormulario['nombre'] = "El nombre tiene que tener una longitud de al menos 5 caracteres.";
			}
			
			$password = isset($_POST['password']) ? $_POST['password'] : null;
			if ( empty($password) || mb_strlen($password) < 5 ) {
				$erroresFormulario['password'] = "El password tiene que tener una longitud de al menos 5 caracteres.";
			}
			$password2 = isset($_POST['password2']) ? $_POST['password2'] : null;
			if ( empty($password2) || strcmp($password, $password2) !== 0 ) {
				$erroresFormulario['password2'] = "Los passwords deben coincidir";
			}
			
			// Si no hay ningún error, continuar.
			if (empty($error))
			{
				$usuario = Usuario::crea($nombreUsuario, $nombre, $password, 'user');
	
				if (! $usuario ) {
					$erroresFormulario[] = "El usuario ya existe";
					$this->generaListaErroresGlobales($erroresFormulario);
				} else {
					$_SESSION['login'] = true;
					$_SESSION['nombre'] = $nombreUsuario;
					header('Location: index.php');
					exit();
				}
			}
			else
			{
				$this->generaListaErroresGlobales($erroresFormulario);
			}

			$this->generaFormulario();
		}
	}
?>