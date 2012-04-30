Raxa JSS Hospital Screener using Sencha Touch 2.0.1 MVC

This application is a client-side hospital screening system that
manages patients and doctors. The user is able to add more patients, 
attach them to a certain doctor, and remove them back into the 
patient pool. 

Models:
Doctor: stores doctor information, currently linked to Patient using the hasMany association
Patient: stores patient information

Views:
Main: main view implements a navigationview to navigate between screens
TopMenu: main button menu that includes patient view, doctor view, new patient popup
PatientView: lists the currently unassigned patients, allows us to assign patient -> doctor
DoctorView: lists the current doctors and current patients for each doctor
NewPatient: popup view that allows us to enter in new patient information (NOTE: does not sanitize inputs)
Sort: popup view that allows us to pick how we want to sort the patients

Controller:
Application: controls all the buttons, lists, etc

Stores:
Patients: uses patients.json, stores to local cache (NOTE: no writer defined yet, changes will not persist)
Doctors: uses doctors.json, stores to local cache (NOTE: no writer defined yet, changes will not persist)

