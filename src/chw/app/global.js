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
var MRSHOST = 'http://raxajss.jelastic.servint.net';
var PAGES = {
    LOGIN_SCREEN: 0,
    CONFIRM_LOC: 1,
    PATIENT_LIST: 2,
    PATIENT_DET: 3,
    ADD: 4,
    ADD_REG: 5,
    ADD_REM: 6,
    ADD_APP: 7,
    INBOX_CHW: 8,
    RESOURCES: 9,
    RESOURCE_DET: 10,
    INBOX_VC: 11,
    SCHEDULING: 12
};
var USER = new Object();
USER.name = '';
USER.type = 'CHW';
USER.uuid = '';
var CURR_DATE = new Date();
var LOCATION = "";
var CONNECTED = true;   //Variable for connectivity status
var helper = {
    listDisclose: function (record) {
        Ext.getCmp('title_det').setTitle(record.get('familyName') + ', ' + record.get('givenName'))
        // navigate to details for specific patient and populate fields
        Ext.getCmp('first_det').setValue(record.get('givenName'));
        Ext.getCmp('last_det').setValue(record.get('familyName'));
        Ext.getCmp('address_det').setValue(record.get('cityVillage'));
        Ext.getCmp('gender_det').setValue(record.get('gender'));
        Ext.getCmp('bday_det').setValue(record.get('birthdate'))
        // change to next page
        Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_DET)
    },
    discloseResource: function (record) {
        Ext.getCmp('resource_title').setTitle(record.get('resourceName'));
        Ext.getCmp('resource_label').setHtml('<img src="resources/'+record.get('resourceLocation')+'.png" height="100%" width="100%"/>')
        Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCE_DET)
    }
}
var HEADERS = {
    "Authorization": localStorage.getItem("basicAuthHeader"),
    "Accept": "application/json",
    "Content-Type": "application/json"
}