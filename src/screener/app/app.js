/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
//this is for debugging only - when production rolls around, we need to put all dependencies in a single .js file
//<debug>
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': '../lib/i18n' //Path to the i18n library
    }
});

Ext.require('Ext.i18n.Bundle', function(){
    Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle',{
        bundle: 'RaxaEmrScreener',
        //Specify language here
        lang: 'en-US',
        path: 'app/view', //Path to the .properties file
        noCache: true
    });
});

//</debug>
Ext.application({
    name: 'Screener',

    requires: ['Screener.store.Patients', 'Screener.store.Doctors', 'Screener.store.druglist', 'Ext.navigation.View'],
    stores: ['Screener.store.AssignedPatientList', 'Screener.store.Doctors', 'Screener.store.drugConcept', 'Screener.store.drugEncounter', 'Screener.store.druglist', 'Screener.store.encounterpost', 'Screener.store.encounters', 'Screener.store.IdentifierType', 'Screener.store.Location', 'Screener.store.NewPatients', 'Screener.store.NewPersons', 'Screener.store.PatientList', 'Screener.store.Patients', 'Screener.store.PatientSummary', 'Screener.store.PostLists'],

    //we will use a Patient and Doctor class
    models: ['Patient', 'Doctor', 'Links', 'PostList', 'GetList', 'Patients', 'observation', 'druglist', 'drugOrder', 'drugEncounter', 'PatientSummary', 'Obs'],

	//here we declare the visual components
	views: ['Main', 'PatientView', 'NewPatient', 'Sort', 'PharmacyView', 'PharmacyForm', 'DrugStore', 'PatientListView', 'LabOrderView', 'LabOrderForm', 'LabStore', 'PatientSummary', 'DoctorSummary'],

    //here we declare our controller that will perform actions
    controllers: ['Application'],

    //the stores will hold our data in a local cache
    // TODO: remove duplicate member "stores"
    stores: ['Patients', 'Doctors', 'PostLists', 'druglist', 'drugEncounter', 'PatientSummary', 'AssignedPatientList'],

	//entry point
	launch: function() {
		if (Util.checkModulePrivilege('screener')&& Util.uuidLoadedSuccessfully()) {
            var mainScreen = Ext.create('Screener.view.Main', {
                fullscreen: true,
            });
            var topBar = Ext.create('Topbar.view.TopToolbar', {
                });
            mainScreen.add(topBar);
            Ext.getCmp('topbarSelectfield').setValue("Screener");
        }
    }
});

