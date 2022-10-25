<?php

require_once __DIR__.'/includes/config.php';
require_once __DIR__.'/includes/FormularioRegistro.php';

$tituloPagina = 'Registro';

$form = new FormularioRegistro(""); 
$form->gestiona();
$formulario = $form->generaFormulario();

$contenidoPrincipal = <<<EOS
	<h1>Registro de usuario</h1>
	$formulario
EOS;

require __DIR__.'/includes/plantillas/plantilla.php';
