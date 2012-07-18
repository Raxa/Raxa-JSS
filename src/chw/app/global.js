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
var MRSHOST = 'http://emrjss.jelastic.dogado.eu';
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
    addPatient: 10
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
            Ext.ComponentQuery.query('familyDetails #familyNameLabel')[0].setHtml('<div style="font-size:13px;">'+record.get('familyName')+'</div>');
            Ext.ComponentQuery.query('familyDetails #familyAddress')[0].setHtml('<div style="font-size:13px;">'+record.get('familyAddress')+'</div>');
            Ext.ComponentQuery.query('familyDetails #familyTitle')[0].setTitle(record.get('familyName'));
            Ext.ComponentQuery.query('familyDetails #familyDescripLabel')[0].setHtml('<div style="text-align:center;"><i>'+record.get('familyDescrip')+'</i></div>');
            // loading family member list
            var pstore = Ext.getStore('patients');
            if (!pstore) {
                Ext.create('chw.store.patients')
            }
            pstore.onAfter('load',function(){
                Ext.getCmp('familyMembersList').setStore(pstore);
                Ext.getCmp('viewPort').setActiveItem(PAGES.familyDetails)
            });
            pstore.load();
        } else if (list==='illness'){
            // filter and fetch a list of all patients with that illness
            // display all patients with that illness
        }
    },     
    doBack: function () {
        Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
    }
}
var HEADERS = {
    "Authorization": localStorage.getItem("basicAuthHeader"),
    "Accept": "application/json",
    "Content-Type": "application/json"
}