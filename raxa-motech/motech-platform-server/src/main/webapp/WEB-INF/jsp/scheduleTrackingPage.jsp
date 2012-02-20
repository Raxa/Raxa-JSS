<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Schedule tracking demo with Open MRS</title>
</head>
<body>
	Schedule Tracking demo using 
	<br><br>
	
	This is a demonstration of schedule tracking with voice calling and SMS messaging. It uses the core platform (server, server-api, common) along with scheduler, scheduletracking, cmslite, sms-api, sms-http, voxeo, mrs-api and openmrs-api.
	<br><br>

	Registering a duplicate id will overwrite its phone
	number which would result in redirecting the messages to that
	number. 
	<br><br>
	Register a patient into Motech
	<form method="post" action="/motech-platform-server/patient/addScheduleUser">
		ID:<input type="text" name="externalId" size="12" maxlength="12" />
		Phone Number (with no special characters, like in 2071234567):<input type="text" name="phoneNum" size="24"
			maxlength="24" /> <input type="submit" value="Register Motech Patient" />
	</form>
	Unregister a Patient from the system
	<form method="post" action="/motech-platform-server/patient/removeScheduleUser">
		ID:<input type="text" name="externalId" size="12" maxlength="12" /> <input
			type="submit" value="Unregister Motech Patient" />
	</form>
	
	<br><br>

	Enroll a patient by Motech ID (coincides with Open MRS) into the Demo Concept Schedule
	<form method="post" action="/motech-platform-server/enroll/start">
		ID:<input type="text" name="externalID" size="12" maxlength="12" />
		<input type="hidden" name="scheduleName" value="Demo Concept Schedule">
		<input type="submit" value="Enroll User" />
	</form>
	<br><br>
	Unenroll a patient by Motech ID (coincides with Open MRS) from the Demo Concept Schedule
	<form method="post" action="/motech-platform-server/enroll/stop">
		ID:<input type="text" name="externalID" size="12" maxlength="12" />
		<input type="hidden" name="scheduleName" value="Demo Concept Schedule">
		<input type="submit" value="Uneroll User" />
	</form>
	<br><br>
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