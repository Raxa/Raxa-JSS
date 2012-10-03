//Ext.Loader.setConfig({
        //enabled: true,
        //paths: {
            //'Ext.i18n': '../lib/i18n' //Path to the i18n library
        //}
    //});

//Ext.require('Ext.i18n.Bundle', function(){
        //Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle',{
                //bundle: 'RaxaEmrScreener',
                ////Specify language here
                //lang: 'en-US',
                //path: 'app/view', //Path to the .properties file
                //noCache: true
            //});
    //});

//</debug>
Ext.application({
        //name: 'RaxaEmr.Screener',

    //requires: [
        //'Ext.MessageBox'
    //],

    //views: ['Main'],

    //icon: {
        //'57': 'resources/icons/Icon.png',
        //'72': 'resources/icons/Icon~ipad.png',
        //'114': 'resources/icons/Icon@2x.png',
        //'144': 'resources/icons/Icon~ipad@2x.png'
    //},

    //isIconPrecomposed: true,

    //startupImage: {
        //'320x460': 'resources/startup/320x460.jpg',
        //'640x920': 'resources/startup/640x920.png',
        //'768x1004': 'resources/startup/768x1004.png',
        //'748x1024': 'resources/startup/748x1024.png',
        //'1536x2008': 'resources/startup/1536x2008.png',
        //'1496x2048': 'resources/startup/1496x2048.png'
    //},

    //launch: function() {
        //// Destroy the #appLoadingIndicator element
        //Ext.fly('appLoadingIndicator').destroy();

        //// Initialize the main view
        //Ext.Viewport.add(Ext.create('RaxaEmr.Screener.view.Main'));
    //},

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

	name: 'Screener',

	requires: ['Ext.MessageBox', 'Screener.store.Patients', 'Screener.store.Doctors', 'Screener.store.druglist', 'Ext.navigation.View'],
	stores: ['Screener.store.AssignedPatientList', 'Screener.store.Doctors', 'Screener.store.drugConcept', 'Screener.store.drugEncounter', 'Screener.store.druglist', 'Screener.store.encounterpost', 'Screener.store.encounters', 'Screener.store.IdentifierType', 'Screener.store.Location', 'Screener.store.NewPatients', 'Screener.store.NewPersons', 'Screener.store.PatientList', 'Screener.store.Patients', 'Screener.store.PatientSummary', 'Screener.store.PostLists'],

	//we will use a Patient and Doctor class
	models: ['Patient', 'Doctor', 'Links', 'PostList', 'GetList', 'Patients', 'observation', 'druglist', 'drugOrder', 'drugEncounter', 'PatientSummary', 'Obs'],

	//here we declare the visual components
	views: ['Main', 'TopMenu', 'PatientView', 'NewPatient', 'Sort', 'PharmacyView', 'PharmacyForm', 'DrugStore', 'PatientListView', 'LabOrderView', 'LabOrderForm', 'LabStore', 'PatientSummary', 'DoctorSummary'],

	//here we declare our controller that will perform actions
	controllers: ['Application'],

	//the stores will hold our data in a local cache
    // TODO: remove duplicate member "stores"
	stores: ['Patients', 'Doctors', 'PostLists', 'druglist', 'drugEncounter', 'PatientSummary', 'AssignedPatientList'],

	//entry point
	launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

		if (Util.checkModulePrivilege('screener')&& Util.uuidLoadedSuccessfully()) {
            var mainScreen = Ext.create('Screener.view.Main', {
                    fullscreen: true,
                });
			var topBar = Ext.create('Topbar.view.TopToolbar', {
				docked: 'top',
				title: 'JSS Hospital Screener System'
			});
			mainScreen.add(topBar);
		}
	}
});
