<?php

session_start();

include "functions.php";

session_checker();

echo "(Mensagem exemplo)<br /><br />";
echo "<hr /><br /><br />";

echo "Bem vindo <strong>". $_SESSION['nome'] ." ". $_SESSION['sobrenome'] ."</strong>! <br />
	Você est&aacute; acessando &aacute;rea restrita para usu&aacute;rios cadastrados!<br /><br />";

echo "Seu n&iacute;vel de usu&aacute;rio &eacute; <strong>". $_SESSION['nivel_usuario']."</strong>.<br />
Com esse n&iacute;vel, voc&ecirc; tem permis&atilde;o de acesso &agrave; algumas &aacute;reas exclusivas do site.<br /><br />";

echo "<a href=\"logout.php\">Sair</a>";

?>