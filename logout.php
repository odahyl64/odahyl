<?php

session_start();

if(!isset($_REQUEST['logmeout'])){

	echo "Voc&ecirc; realmente deseja sair da &aacute;rea restrita?<br />";
	echo "<a href=\"logout.php?logmeout\">Sim</a> | <a href=\"javascript:history.go(-1)\">N&atilde;o</a>";

}
else{

	session_destroy();

	if(!session_is_registered('nome')){

		echo "<strong>Voc&ecirc; n&atilde;o est&aacute; mais logado em nosso site!</strong><br /><br />";
		echo "<strong>Login:</strong><br /><br />";

		include "formulario_login.html";

	}
}
?>
