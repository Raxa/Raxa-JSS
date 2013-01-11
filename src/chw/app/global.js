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
var PAGES = {
    loginScreen: 0,
    familyList: 1,
    illnessList: 2,
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
    resourceDetail: 13,
    illnessDetails: 14,
    newPatient:15
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
var CONNECTED = true; //This global var is probably not used anymore.
var toHistoryFrom = '' //This var is used to determine from which view the illness history of a patient is being reached.
//Either from the patient details page of the disease list page
var savedFamilyRecord
var savedPatientRecord
var savedIllnessRecord
var helper = {
    listDisclose: function (list,record) {
        if(list==='family'){
            // set all family details before transition
            savedFamilyRecord=record
            Ext.ComponentQuery.query('familyDetails #familyAddressLabel')[0].setValue(record.get('familyAddress'));
            Ext.ComponentQuery.query('familyDetails #familyTitle')[0].setTitle(record.get('familyName'));
            Ext.ComponentQuery.query('familyDetails #familyDescripLabel')[0].setTitle(record.get('familyDescrip'));
            Ext.ComponentQuery.query('familyDetails #familyIdLabel')[0].setValue(record.get('familyId'));
            Ext.ComponentQuery.query('familyDetails #familyImageLabel')[0].setHtml('<center><img src="'+record.get('familyImage')+'" height="100px"/></center>')
            // loading family member list
            var patientStore = Ext.getStore('patients');
            if (!patientStore) {
                Ext.create('chw.store.patients')
            }
            var familyId = record.get('familyId');
            //Filtering the list by family id
            patientStore.filter('familyId',familyId)
            patientStore.onAfter('load',function(){
                Ext.getCmp('familyMembersList').setStore(patientStore);
                Ext.getCmp('viewPort').setActiveItem(PAGES.familyDetails)
            });
            patientStore.load({
                scope: this,
                    callback: function(records, operation, success){
                        if(success){
                        }
                        else{
                            Ext.Msg.alert("Error", Util.getMessageLoadError());
                        }
                    }
                });
        } else if (list==='illness') {
            console.log('===Illness===')
            savedIllnessRecord = record
            var pistored = Ext.getStore('patientsIllnesses')
            if (!pistored) {
                Ext.create('chw.store.patientsIllnesses')
            }
            // TODO: Something is definitely wrong with the filter
            pistored.filter('illnessId',record.get('illnessId'))
            pistored.load({
                scope: this,
                callback: function(records, operation, success){
                    if(success){
                        Ext.getCmp('illnessList').setStore(pistored);
                        Ext.getCmp('viewPort').setActiveItem(PAGES.illnessList)
                    }
                    else{
                        Ext.Msg.alert("Error", Util.getMessageLoadError());
                    }
                }
            });
        } else if (list==='patient') {
            savedPatientRecord=record
            Ext.ComponentQuery.query('patientDetails #patientDetailsImage')[0].setHtml('<center><img src="'
                +record.get('patientImage')+'" width="150px" /></center>')
            Ext.ComponentQuery.query('patientDetails #firstNameLabel')[0].setValue(record.get('firstName'));
            Ext.ComponentQuery.query('patientDetails #familyNameLabel')[0].setValue(record.get('familyName'));
            Ext.ComponentQuery.query('patientDetails #patientGenderLabel')[0].setValue(record.get('patientGender'));
            Ext.ComponentQuery.query('patientDetails #patientAgeLabel')[0].setValue(record.get('patientAge'));
            Ext.ComponentQuery.query('patientDetails #patientIdLabel')[0].setValue(record.get('patientId'));
            var pistore = Ext.getStore('patientsIllnesses');
            if (!pistore) {
                Ext.create('chw.store.patientsIllnesses')
            }
            var pid = record.get('patientId')
            pistore.filter('patientId',pid)
            pistore.load({
                scope: this,
                callback: function(records, operation, success){
                    if(success){
                        Ext.getCmp('patientIllnessList').setStore(pistore);
                        Ext.getCmp('viewPort').setActiveItem(PAGES.patientDetails)
                    }
                    else{
                        Ext.Msg.alert("Error", Util.getMessageLoadError());
                    }
                }
            });
        } else if (list==='inventory') {
            Ext.getCmp('inventoryDetails').setHidden(false);
            Ext.ComponentQuery.query('inventoryDetails #pillDescripLabel')[0].setValue(record.get('pillDescrip'));
            Ext.ComponentQuery.query('inventoryDetails #pillAmountLabel')[0].setValue(record.get('pillAmount'));
            Ext.ComponentQuery.query('inventoryDetails #pillFrequencyLabel')[0].setValue(record.get('pillFrequency'));
            Ext.ComponentQuery.query('inventoryDetails #pillNotesLabel')[0].setValue(record.get('pillNotes'));
            Ext.ComponentQuery.query('inventoryDetails #pillTitleLabel')[0].setTitle(record.get('pillName'));
            Ext.ComponentQuery.query('inventoryDetails #pillImageLabel')[0].setHtml('<center><img src="'
                +record.get('pillImage')+'" width="100px"/></center>');
            Ext.getCmp('viewPort').setActiveItem(PAGES.inventoryDetails)
        } else if (list==='resources') {
            savedResourcesRecord=record
            Ext.ComponentQuery.query('resourceDetail #resourceNameTitle')[0].setTitle(record.get('resourceName'));
            var type = record.get('resourceType')
            var location = record.get('resourceLocation');
            var container = Ext.ComponentQuery.query('resourceDetail #resourceLocationLabel')[0];
            if (type==='photo') {
                container.setHtml('<img src="'+ location +'" height="100%" width="100%"/>')
            } else if (type === 'video') {
                container.setHtml('<video controls="controls" height="100%" width="100%"><source src="' 
                    + location + '" type="video/webm" />Your browser does not support the video tag</video>')
            } else if (type === 'audio') {
                container.setHtml('<audio controls="controls"><source src="' + location 
                    + '" type = "audio/mp3" />Your browser does not support the audio element</audio>')
            }
            Ext.getCmp('viewPort').setActiveItem(PAGES.resourceDetail)
        } else if (list==='patientIllness') {
            //Going to illness history from patient details
            toHistoryFrom = 'patientDetails'
            Ext.getCmp('illnessDetails').setHidden(false);
            var pfname = Ext.ComponentQuery.query('patientDetails #firstNameLabel')[0].getValue();
            var plname = Ext.ComponentQuery.query('patientDetails #familyNameLabel')[0].getValue();
            Ext.ComponentQuery.query('illnessDetails #patientIdField')[0].setValue(pfname + ' ' + plname)
            var illId = record.get('illnessId')
            var iStore = Ext.getStore('illnesses');
            iStore.load({
                scope: this,
                callback: function(records, operation, success){
                    if(success){
                        var illnessDetails = iStore.getAt(illId).getData();
                        Ext.ComponentQuery.query('illnessDetails #illnessNameField')[0].setValue(illnessDetails.illnessName);
                        Ext.ComponentQuery.query('illnessDetails #illnessStartDate')[0].setValue(record.get('illnessStartDate'));
                        Ext.ComponentQuery.query('illnessDetails #illnessEndDate')[0].setValue(record.get('illnessEndDate'));
                        Ext.ComponentQuery.query('illnessDetails #illnessTreatmentField')[0].setValue(record.get('illnessTreatment'));
                        Ext.ComponentQuery.query('illnessDetails #illnessNotesField')[0].setValue(record.get('illnessNotes'));
                        Ext.ComponentQuery.query('illnessDetails #illnessImageLabel')[0].setHtml('<center><img src="' 
                            + illnessDetails.illnessImage+'" width="100px" /></center>');
                        Ext.getCmp('viewPort').setActiveItem(PAGES.illnessDetails)
                    }
                    else{
                        Ext.Msg.alert("Error", Util.getMessageLoadError());
                    }
                }
            });
        } else if (list==='ipatient') {
            //Going to illness history from disease list
            toHistoryFrom = 'diseaseList'
            // get the patient information
            var patid = record.get('patientId') - 1;
            var pStore = Ext.getStore('patients');
            pStore.load({
                scope: this,
                callback: function(records, operation, success){
                    if(success){
                        var pName = pStore.getAt(patid).getData();
                        // populate patient fields in patient details
                        Ext.ComponentQuery.query('patientDetails #firstNameLabel')[0].setValue(pName.firstName);
                        Ext.ComponentQuery.query('patientDetails #familyNameLabel')[0].setValue(pName.familyName);
                        Ext.ComponentQuery.query('patientDetails #patientGenderLabel')[0].setValue(pName.patientGender);
                        Ext.ComponentQuery.query('patientDetails #patientAgeLabel')[0].setValue(pName.patientAge);
                        Ext.ComponentQuery.query('patientDetails #patientIdLabel')[0].setValue(pName.patientId);
                        Ext.ComponentQuery.query('patientDetails #patientDetailsImage')[0].setHtml('<center><img src="'
                            +pName.patientImage+'" width="150px" /></center>')
                        // show history
                        var patillstore = Ext.getStore('patientsIllnesses');
                        if (!patillstore) {
                            Ext.create('chw.store.patientsIllnesses')
                        }
                        patillstore.filter('patientId',patid)
                        patillstore.load({
                            scope: this,
                            callback: function(records, operation, success){
                                if(success){
                                    Ext.getCmp('patientIllnessList').setStore(patillstore);
                                    Ext.getCmp('viewPort').setActiveItem(PAGES.patientDetails)
                                }
                                else{
                                    Ext.Msg.alert("Error", Util.getMessageLoadError());
                                }
                            }
                        });
                    }
                    else{
                        Ext.Msg.alert("Error", Util.getMessageLoadError());
                    }
                }
            });
        }
    },
    doVis: function (arg) {
        var visitStore = Ext.getStore('visits');
        visitStore.load({
            scope: this,
            callback: function(records, operation, success){
                if(success){
                    var t = visitStore.getById(arg)
                    Ext.Msg.confirm('Task', t.get('visitDetail'), function (resp) {
                        if (resp==='yes') {
                            var comp = Ext.getCmp(arg);
                            comp.setUi('decline');
                            comp.setDisabled(true);
                            Ext.ComponentQuery.query('visitDetails #'+arg+'_audio')[0].play();
                        }
                    })
                }
                else{
                    Ext.Msg.alert("Error", Util.getMessageLoadError());
                }
            }
        });
    }
    
}
var HEADERS = {
    "Authorization": localStorage.getItem("basicAuthHeader"),
    "Accept": "application/json",
    "Content-Type": "application/json"
}
var VIS = {
    ORS: 0,
    RDT: 1,
    VITA: 2,
    ALB: 3,
    BLOOD: 4
}
