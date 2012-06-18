/**
 * Screener application, by John Stoecker using Sencha Touch 2.0
 * This application is a client-side hospital screening system that
 * manages patients and doctors. The user is able to add more patients,
 * attach them to a certain doctor, and remove them back into the patient
 * pool.
 */
//this is for debugging only - when production rolls around, we need to put all dependencies in a single .js file
//<debug>
Ext.Loader.setPath({
    'Ext': '../../../lib/touch/src'
});

Ext.Loader.setConfig({
    enabled: true
});
//</debug>
Ext.application({
    name: 'Screener',

    requires: ['Screener.store.Patients', 'Screener.store.Doctors', 'Ext.navigation.View','Screener.store.NewPatients', 'Screener.store.NewPersons', 'Screener.store.IdentifierType', 'Screener.store.Location'],

    //we will use a Patient and Doctor class
    models: ['Patient', 'Doctor', 'Links', 'Person', 'Names', 'NewPatient', 'Identifiers'],

    //here we declare the visual components
    views: ['Main', 'TopMenu', 'PatientView', 'DoctorView', 'NewPatient', 'Sort', 'PharmacyView', 'PharmacyForm', 'DrugStore', 'PatientListView', 'LabOrderView', 'LabOrderForm', 'LabStore'],

    //here we declare our controller that will perform actions
    controllers: ['Application'],

    //the stores will hold our data in a local cache
    stores: ['Patients', 'Doctors', 'NewPersons', 'IdentifierType', 'Location', 'NewPatients'],

    //entry point
    launch: function () {
        Ext.Viewport.add({
            xclass: 'Screener.view.Main'
        });
    }
});
