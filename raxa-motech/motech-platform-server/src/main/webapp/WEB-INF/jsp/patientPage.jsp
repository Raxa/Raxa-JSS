<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Open MRS Patient stuff</title>
</head>
<body>

	<form method="post" action="/motech-platform-server/openMRS/test">
		ID:<input type="text" name="userName" size="12" maxlength="12" />
		Password:<input type="text" name="password" size="24"
			maxlength="24" /> <input type="submit" value="Register User" />
	</form>
</body>
</html>