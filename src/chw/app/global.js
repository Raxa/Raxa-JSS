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
    PATIENT_LIST: 1,
    PATIENT_DET: 2,
    ADD: 3,
    ADD_REG: 4,
    ADD_REM: 5,
    ADD_APP: 6,
    INBOX_CHW: 7,
    RESOURCES: 8,
    RESOURCE_DET: 9,
    INBOX_VC: 10,
    SCHEDULING: 11
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
        var CURRENT = true;
        // set up title
        // console.log(Ext.getCmp('narwhal'));
        // Ext.getCmp('narwhal').setTitle(record.get('familyName') + ', ' + record.get('givenName'))
        // set up visit
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
                width: '80%',
                id: 'cont'
            })
            var visStore = Ext.getStore('visitStore');
            visStore.load();
            var t = visStore.getAt(taskList[0]);
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
                    id: t.get('vis_id'),
                    text: t.get('vis_text'),
                    ui: u,
                    disabled: d,
                    listeners: {
                        tap: function () {
                            helper.doVis(t)
                            console.log(t)
                        }
                    }
                }]
            })
            cont.add(cell);
            c.add(cont);
            /*for (var i = 0; i < taskList.length; i++) {
                var visStore = Ext.getStore('visitStore');
                visStore.load();
                var t = visStore.getAt(taskList[0]);
                if (t.get('vis_comp')) {
                    var u = 'decline';
                    var d = true
                } else {
                    var u = 'confirm';
                    var d = false
                }
                var p = Ext.create('Ext.Panel', {
                    items: [{
                        layout: 'vbox',
                        type: 'button',
                        id: t.get('vis_id'),
                        text: t.get('vis_text'),
                        ui: u,
                        disabled: d,
                        listeners: {
                            tap: function () {
                                window.location = this.doVis(t.get('vis_id'))
                            }
                        }
                    }, {
                        xtype: 'audio',
                        id: t.get('vis_id') + '_audio',
                        url: t.get('vis_aud'),
                        hidden: true
                    }]
                })
                cont.add(p);
                console.log(cont);
            }*/
            c.add(cont)
            console.log(c);
        } else {
            // TODO: hide visit panel
            Ext.getCmp('vis_panel').hidden(true);
        }
        // set up basic info
        /*Ext.getCmp('first_det').setValue(record.get('givenName'));
        Ext.getCmp('last_det').setValue(record.get('familyName'));
        Ext.getCmp('address_det').setValue(record.get('cityVillage'));
        Ext.getCmp('gender_det').setValue(record.get('gender'));
        Ext.getCmp('bday_det').setValue(record.get('birthdate'));
        // change to next page
        Ext.getCmp('backButton').setHidden(false);
        Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_DET)*/
    },
    discloseResource: function (record) {
        console.log(Ext.getCmp('narwhal'));
        Ext.getCmp('narwhal').setTitle(record.get('resourceName'));
        if (record.get('resourceType')==='photo') {
            var located = 'resources/' + record.get('resourceLocation') + '.png'
            Ext.getCmp('resource_label').setHtml('<img src="'+located+'" height="100%" width="100%"/>')
        }
        Ext.getCmp('backButton').setHidden(false);
        Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCE_DET)
    },
    getVisitType: function (person) {
        
    },
    getTaskList: function (visType) {
        
    },
    doVis: function (t) {
        Ext.Msg.confirm('Task', t.get('vis_det'), function (resp) {
            if (resp === 'yes') {
                // Ext.getCmp(t.get('vis_comp')).set(true);
                Ext.getCmp(t.get('vis_id')).setUi('decline');
                Ext.getCmp(t.get('vis_id')).setDisabled(true);
                //t.setUi('decline');
                //t.setDisabled(true);
                console.log(t)
            }
        })
    }
}
var HEADERS = {
    "Authorization": localStorage.getItem("basicAuthHeader"),
    "Accept": "application/json",
    "Content-Type": "application/json"
}