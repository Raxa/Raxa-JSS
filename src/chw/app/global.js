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
// TODO: find a way to set the value in the program
// See src/app/view/Login.js
var HOST = 'http://174.129.222.130:8080/motech-platform-server/';
var MRSHOST = 'http://test.raxa.org:8080/openmrs';
var PAGES = {
    loginScreen: 0,
    familyList: 1,
    diseaseList: 2,
    familyDetails: 3,
    patientDetails: 4,
    visitDetails: 5,
    inventoryList: 6,
    inventoryDetails: 7,
    addOptions: 8,
    addFamily: 9,
    addPatient: 10,
    addIllness: 11,
    resourceList: 12,
    resourceDetail: 13
}
var USER = new Object();
USER.name = '';
USER.type = 'CHW';
USER.uuid = '';
var CURR_DATE = new Date();
var CURR_LOC = {
    LAT : 0,
    LOG: 0
}
var LOCATION = "";
var CONNECTED = true;
var helper = {
    listDisclose: function (list,record) {
        if(list==='family'){
            // set all family details before transition
            // set all family details before transition
            Ext.ComponentQuery.query('familyDetails #familyAddressLabel')[0].setValue(record.get('familyAddress'));
            Ext.ComponentQuery.query('familyDetails #familyTitle')[0].setTitle(record.get('familyName'));
            Ext.ComponentQuery.query('familyDetails #familyDescripLabel')[0].setTitle(record.get('familyDescrip'));
            Ext.ComponentQuery.query('familyDetails #familyIdLabel')[0].setValue(record.get('familyId'));
            // loading family member list
            var patientStore = Ext.getStore('patients');
            if (!patientStore) {
                Ext.create('chw.store.patients')
            }
            
            var familyId = record.get('familyId');
            console.log(familyId);
            //Filtering the list by family id
            patientStore.filter('familyId',familyId)
            patientStore.onAfter('load',function(){
                console.log(patientStore)
                console.log('loaded') 
                Ext.getCmp('familyMembersList').setStore(patientStore);
                Ext.getCmp('viewPort').setActiveItem(PAGES.familyDetails)
            });
            patientStore.load();
        } else if (list==='illness') {
            // filter and fetch a list of all patients with that illness
            // display all patients with that illness
        } else if (list==='patient') {
            Ext.ComponentQuery.query('patientDetails #firstNameLabel')[0].setValue(record.get('firstName'));
            Ext.ComponentQuery.query('patientDetails #familyNameLabel')[0].setValue(record.get('familyName'));
            Ext.ComponentQuery.query('patientDetails #patientGenderLabel')[0].setValue(record.get('patientGender'));
            Ext.ComponentQuery.query('patientDetails #patientAgeLabel')[0].setValue(record.get('patientAge'));
            Ext.getCmp('viewPort').setActiveItem(PAGES.patientDetails)
        } else if (list==='inventory') {
            Ext.getCmp('inventoryDetails').setHidden(false);
            Ext.ComponentQuery.query('inventoryDetails #pillDescripLabel')[0].setValue(record.get('pillDescrip'));
            Ext.ComponentQuery.query('inventoryDetails #pillAmountLabel')[0].setValue(record.get('pillAmount'));
            Ext.ComponentQuery.query('inventoryDetails #pillFrequencyLabel')[0].setValue(record.get('pillFrequency'));
            Ext.ComponentQuery.query('inventoryDetails #pillNotesLabel')[0].setValue(record.get('pillNotes'));
            Ext.ComponentQuery.query('inventoryDetails #pillTitleLabel')[0].setTitle(record.get('pillName'));
            Ext.ComponentQuery.query('inventoryDetails #pillImageLabel')[0].setHtml('<center><img src="'+record.get('pillImage')+'" width="80%"/></center>');
            // console.log(Ext.ComponentQuery.query('inventoryDetails #pillTitleLabel')[0])
            Ext.getCmp('viewPort').setActiveItem(PAGES.inventoryDetails)
        } else if (list==='resources') {
            Ext.ComponentQuery.query('resourceDetail #resourceNameTitle')[0].setTitle(record.get('resourceName'));
            var type = record.get('resourceType')
            var location = record.get('resourceLocation');
            var container = Ext.ComponentQuery.query('resourceDetail #resourceLocationLabel')[0];
            if (type==='photo') {
                container.setHtml('<img src="'+ location +'" height="100%" width="100%"/>')
            } else if (type === 'video') {
                container.setHtml('<video controls="controls" height="100%" width="100%"><source src="' + location + '" type="video/webm" />Your browser does not support the video tag</video>')
            } else if (type === 'audio') {
                container.setHtml('<audio controls="controls"><source src="' + location + '" type = "audio/mp3" />Your browser does not support the audio element</audio>')
            }
            Ext.getCmp('viewPort').setActiveItem(PAGES.resourceDetail)
        }
    }
    
}
var HEADERS = {
    "Authorization": localStorage.getItem("basicAuthHeader"),
    "Accept": "application/json",
    "Content-Type": "application/json"
}
