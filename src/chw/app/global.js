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
/*var PAGES = {
    LOGIN_SCREEN: 0,
    PATIENT_LIST: 1,
    PATIENT_DET: 2,
    ADD: 3,
    ADD_REG: 4,
    ADD_REM: 5,
-    ADD_APP: 6,
    INBOX_CHW: 7,
    RESOURCES: 8,
    RESOURCE_DET: 9,
    INBOX_VC: 10,
    SCHEDULING: 11
}*/
var PAGES = {
    LOGIN_SCREEN: {
        value: 0,
        text: 'CHW Module',
        bb: true
    }, PATIENT_LIST: {
        value: 1,
        text: 'Patient List',
        bb: true
    }, PATIENT_DET: {
        value: 2,
        text: '',
        bb: false, 
        bbb: 'list'
    }, ADD: {
        value: 3,
        text: 'Add Options',
        bb: false,
        bbb: 'list'
    }, ADD_REG: {
        value: 4,
        text: 'Register Patient',
        bb: false,
        bbb: 'add'
    }, ADD_REM: {
        value: 5,
        text: 'Add Reminder',
        bb: false,
        bbb: 'add'
    }, ADD_APP: {
        value: 6, 
        text: 'Add Appointment',
        bb: false,
        bbb: 'add'
    }, INBOX_CHW: {
        value: 7,
        text: 'Inbox',
        bb: false,
        bbb: 'list'
    }, RESOURCES: {
        value: 8,
        text: 'Resources',
        bb: false,
        bbb: 'list'
    }, RESOURCE_DET: {
        value: 9,
        text: '',
        bb: false,
        bbb: 'resource'
    }, INBOX_VC: {
        value: 10,
        text: 'Inbox',
        bb: true
    }, SCHEDULING: {
        value: 11,
        text: 'Scheduling',
        bb: true
    }
}
var VIS = {
    ORS: 0,
    RDT: 1,
    VITA: 2,
    ALB: 3,
    BLOOD: 4
}

var USER = new Object();
USER.name = '';
USER.type = 'CHW';
USER.uuid = '';
var CURR_DATE = new Date();
var LOCATION = "";
var CONNECTED = true;   //Variable for connectivity status
var helper = {
    listDisclose: function (record) {
        Ext.getCmp('title_pdet').setTitle(record.get('familyName') + ', ' + record.get('givenName'))
        var CURRENT = true;
        if (CURRENT) {
            // TODO: get type of visit associated with patient
            // var visType = this.getVisitType(record.get('familyName'));
            // TODO: get list of tasks associated with visit type
            // var taskList = this.getTaskList(visType);
            var taskList = [VIS.ORS, VIS.RDT, VIS.VITA, VIS.ALB, VIS.BLOOD]
            // get container for task buttons
            var c = Ext.getCmp('check_vis');
            var cont = Ext.create('Ext.Container', {
                centered: true,
                width: '100%',
                id: 'cont'
            })
            // get store for visit details
            var visStore = Ext.getStore('visitStore');
            visStore.load();
            // create buttons for each task
            for (var i = 0; i < taskList.length; i++) {
                var t = visStore.getAt(taskList[i]);
                var u = 'confirm';
                var d = false;
                if (t.get('vis_comp')) {
                    u = 'decline',
                    d = true
                }
                var cell = Ext.create('Ext.Panel', {
                    items: [{
                        layout: 'vbox',
                        xtype: 'button',
                        id: t.get('id'),
                        text: t.get('vis_text'),
                        ui: u,
                        disabled: d,
                        listeners: {
                            tap: function () {
                                helper.doVis(this.id)
                            }
                        }
                    }, {
                        xtype: 'audio',
                        id: t.get('id') + '_audio',
                        url: t.get('vis_aud'),
                        hidden: true
                    }]
                })
                cont.add(cell);
            }
            c.add(cont);
        } else {
            // TODO: hide visit panel
            Ext.getCmp('vis_panel').hidden(true);
        }
        // set up basic info
        Ext.getCmp('first_det').setValue(record.get('givenName'));
        Ext.getCmp('last_det').setValue(record.get('familyName'));
        Ext.getCmp('address_det').setValue(record.get('cityVillage'));
        Ext.getCmp('gender_det').setValue(record.get('gender'));
        Ext.getCmp('bday_det').setValue(record.get('birthdate'));
        // change to next page
        // Ext.getCmp('backButton').setHidden(false);
        Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_DET.value)
    },
    discloseResource: function (record) {
        Ext.getCmp('title_res_det').setTitle(record.get('resourceName'));
        if (record.get('resourceType')==='photo') {
            var located = 'resources/' + record.get('resourceLocation') + '.png'
            Ext.getCmp('resource_label').setHtml('<img src="'+located+'" height="100%" width="100%"/>')
        }
        //Ext.getCmp('backButton').setHidden(false);
        Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCE_DET.value)
    },
    getVisitType: function (person) {
        
    },
    getTaskList: function (visType) {
        
    },
    doVis: function (vid) {
        var visStore = Ext.getStore('visitStore');
        visStore.load();
        var t = visStore.getById(vid)
        Ext.Msg.confirm('Task', t.get('vis_det'), function (resp) {
            if (resp === 'yes') {
                // TODO: set vis_comp as true
                Ext.getCmp(t.get('id')).setUi('decline');
                Ext.getCmp(t.get('id')).setDisabled(true);
                Ext.getCmp(t.get('id') + '_audio').play();
            }
        })
    }, 
    doBack: function (arg) {
        if (arg === 'list') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST.value)
        } else if (arg === 'add') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.ADD.value)
        } else if (arg === 'resource') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCES.value)
        }
    }
}
var HEADERS = {
    "Authorization": localStorage.getItem("basicAuthHeader"),
    "Accept": "application/json",
    "Content-Type": "application/json"
}