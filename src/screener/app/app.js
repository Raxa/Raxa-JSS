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
Ext.Loader.setPath({
    'Ext': '../../../lib/touch/src'
});

Ext.Loader.setConfig({
    enabled: true
});
//</debug>
Ext.application({
    name: 'Screener',

    requires: ['Screener.store.Patients', 'Screener.store.Doctors', 'Screener.store.Doctors', 'Ext.navigation.View'],

    //we will use a Patient and Doctor class
    models: ['Patient', 'Doctor', 'Links', 'PostList', 'GetList', 'Patients', 'Observation', 'druglist', 'drugOrder', 'drugEncounter', 'PatientSummary', 'Obs'],

    //here we declare the visual components
    views: ['Main', 'TopMenu', 'PatientView', 'NewPatient', 'Sort', 'PharmacyView', 'PharmacyForm', 'DrugStore', 'PatientListView', 'LabOrderView', 'LabOrderForm', 'LabStore', 'PatientSummary', 'DoctorSummary'],

    //here we declare our controller that will perform actions
    controllers: ['Application'],

    //the stores will hold our data in a local cache
    stores: ['Patients', 'Doctors', 'PostLists', 'druglist', 'drugEncounter', 'PatientSummary','AssignedPatientList'],

    //entry point
    launch: function () {
        Ext.Viewport.add({
            xclass: 'Screener.view.Main'
        });
    }
});