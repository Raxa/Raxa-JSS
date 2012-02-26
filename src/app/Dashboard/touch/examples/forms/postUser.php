<?php
$pw = $_REQUEST['password'];
header('Content-Type: application/json');
if($pw != ''){
	echo '{"success":true, "msg":'.json_encode('This User is authorized').'}';
}else{
	echo '{"success":false, "msg":'.
		json_encode('This User is NOT authorized').
		', "errors" : { "password" :'.json_encode('Password is required').
		'}'.
		', "pwd" :'.json_encode($pw).'}';
}
?>