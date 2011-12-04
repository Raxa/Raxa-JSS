<%@ include file="/WEB-INF/template/include.jsp"%>

<%@ include file="/WEB-INF/template/header.jsp"%>

<h2><spring:message code="basicmodule.replace.this.link.name" /></h2>

<br/>
<table>
  <tr>
   <th>Patient Id</th>
   <th>Name</th>
   <th>Identifier</th>
  </tr>
  <c:forEach var="patient" items="${thePatientList}">
      <tr>
        <td>${patient.patientId}</td>
        <td>${patient.personName}</td>
        <td>${patient.patientIdentifier}</td>
      </tr>		
  </c:forEach>
</table>

<%@ include file="/WEB-INF/template/footer.jsp"%>
