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

	This is a demonstration of an offset message campaign. It uses the core platform (server, server-api, common) along with scheduler, message-campaign, cmslite, sms-api, sms-http and voxeo.
	<br><br>
	Registering a duplicate id will overwrite its phone
	number which would result in redirecting the campaign messages to that
	number. The offset duration determines the entry point into the campaign. In this demo, there is a message offset by 2 minutes, corresponding to a week 5 pregnancy message, and messages at 2 minute intervals thereafter, until 72 minutes, which is the final week 40 message. Entering 71 or 72 for an offset will queue you for only the final message. Entering a negative number will offset you further back. No offset or an invalid offset will start you at the default (0). Larger numbers will offset you out of the campaign and you will receive no messages.
	<br><br>
	Register a user into the system
	<form method="post" action="/motech-platform-server/user/addOffsetUser">
		ID:<input type="text" name="externalId" size="12" maxlength="12" />
		Phone Number (with no special characters, like in 2071234567):<input type="text" name="phoneNum" size="24"
			maxlength="24" /> <input type="submit" value="Register User" />
	</form>
	Unregister a user from the system
	<form method="post" action="/motech-platform-server/user/removeOffsetUser">
		ID:<input type="text" name="externalId" size="12" maxlength="12" /> <input
			type="submit" value="Unregister User" />
	</form>

	Register a user in an offset campaign 
	<form method="post" action="/motech-platform-server/campaign/start">
		ID:<input type="text" name="externalId" size="12" maxlength="12" /> 
		Offset time:<input type="text" name="offset" size="12" maxlength="12" />
		<input type="hidden" name="campaignName" value="Ghana Pregnancy Message Program" />
		<input type="submit" value="Register in campaign" />
	</form>

	Unregister a user from the campaign
	<form method="post" action="/motech-platform-server/campaign/stop">
		ID:<input type="text" name="externalId" size="12" maxlength="12" /> 
		<input type="hidden" name="campaignName" value="Ghana Pregnancy Message Program" />
		<input type="submit" value="Unregister" />
	</form>
	
	<br><br>More about the demo's messages: <br><br>
	The offset campaign is based off of a pregnancy message campaign in Ghana. Two minutes corresponds to the first message, which starts at the 5th week. After that there is a message every two minutes that corresponds to the next week's message. You may enter anywhere in the campaign, negative numbers will delay the campaign, 73 minutes or higher will put you outside of the campaign. For example, an offset of 71 or 72 will queue you for only the last (week 40's) message. If the time if invalid, you will be put at the default (0 minutes). Overall the campaign runs messages from week 5 to week 40.
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