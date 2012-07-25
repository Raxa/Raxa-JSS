/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': '../lib/i18n'  //Mention the relevant path to the i18n library over here.
    }
});

Ext.application({
    name: 'chw',
    controllers: ['basic'],
    models: ['family', 'patient', 'illness', 'pill', 'patientIllness', 'resource'],
    stores: ['families', 'patients', 'illnesses', 'pills', 'patientsIllnesses', 'resources'],
    views: [
        'loginScreen', 
        'familyList', 
        'illnessList', 
        'familyDetails', 
        'patientDetails', 
        'visitDetails', 
        'inventoryList', 
        'inventoryDetails', 
        'addOptions', 
        'addFamily', 
        'addPatient',
        'illnessDetails'
    ],
    launch: function () {
        Ext.create('chw.view.loginScreen');
    }
});

Ext.require('Ext.i18n.Bundle', function(){
    Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle',{
        bundle: 'RaxaEmrChw',
        // lang: 'hi-IN',
        lang: localStorage.getItem('lang'),
        path: 'app/view',
        noCache: true
    });
});
