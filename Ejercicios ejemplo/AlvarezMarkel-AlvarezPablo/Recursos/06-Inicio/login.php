<?php

require_once __DIR__.'/includes/config.php';
require_once __DIR__.'/includes/FormularioLogin.php';

$tituloPagina = 'Login';

$form = new FormularioLogin("login.php"); 
$form->gestiona();
$formulario = $form->generaFormulario();

$contenidoPrincipal = <<<EOS
	<h1>Acceso al sistema</h1>
	$formulario
EOS;

require __DIR__.'/includes/plantillas/plantilla.php';