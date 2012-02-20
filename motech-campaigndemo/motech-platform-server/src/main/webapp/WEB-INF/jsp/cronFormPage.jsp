<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Campaign demonstration using Voxeo</title>
</head>
<body>

	This is a demonstration of message campaigns with voice calling and SMS messaging. It uses the core platform (server, server-api, common) along with scheduler, message-campaign, cmslite, sms-api, sms-http and voxeo.
	<br><br>

	Registering a duplicate id will overwrite its phone
	number which would result in redirecting the campaign messages to that
	number. The cron campaign will send a message every two minutes until the user is unregistered in the campaign or the user is removed from the system.
	<br><br>
	Register a user into the system
	<form method="post" action="/motech-platform-server/user/addCronUser">
		ID:<input type="text" name="externalId" size="12" maxlength="12" />
		Phone Number (with no special characters, like in 2071234567):<input type="text" name="phoneNum" size="24"
			maxlength="24" /> <input type="submit" value="Register User" />
	</form>
	Unregister a user from the system
	<form method="post" action="/motech-platform-server/user/removeCronUser">
		ID:<input type="text" name="externalId" size="12" maxlength="12" /> <input
			type="submit" value="Unregister User" />
	</form>

	Register a user in a cron (periodic) campaign (Call every 2 minutes)
	<form method="post" action="/motech-platform-server/campaign/start">
		ID:<input type="text" name="externalId" size="12" maxlength="12" /> 
		<input type="hidden" name="campaignName" value="Cron based Message Program" />
		<input type="submit" value="Register in campaign" />
	</form>

	Unregister a user from the campaign
	<form method="post" action="/motech-platform-server/campaign/stop">
		ID:<input type="text" name="externalId" size="12" maxlength="12" /> 
		<input type="hidden" name="campaignName" value="Cron based Message Program" />
		<input type="submit" value="Unregister" />
	</form>

	The list of all registered patients (by ID)
	<table>
		<c:forEach var="patients" items="${patients}">
			<tr>
				<td>${patients.externalid}</td>
			</tr>
		</c:forEach>
	</table>


</body>
</html>