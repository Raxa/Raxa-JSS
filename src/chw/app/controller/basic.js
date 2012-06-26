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

// global variables
var user = "";
var up_url = "";
var down_url = "";
var PAGES = {
    LOGIN_SCREEN : 0,
    CONNECTION_SETTINGS : 1,
    OPTIONS_PANEL : 2,
    PATIENT_OPTIONS : 3,
    SETTINGS_SCREEN : 4,
    STUDY_SCREEN : 5   
}
// current functionality: move between screens
Ext.define('motechScheduleTracking.controller.basic', { 
    extend: 'Ext.app.Controller',
    controllers: ['basic'],
    views: ['loginScreen', 'optionsScreen', 'connectionSettings', 'patientOptions', 'settingsScreen' /*, 'optionsPanel'*/ ],
    models: ['registerModel', 'enrollModel', 'encounterModel'],
    stores: ['registerList', 'enrollList', 'encounterList'],
    config: {
        refs: {
            loginOkay: '#loginOkay',
            loginCancel: '#loginCancel',
            connectionOkay: '#connectionOkay',
            connectionCancel: '#connectionCancel',
            selectStudy: '#selectStudy',
            selectForms: '#selectForms',
            downloadButton: '#downloadButton',
            uploadButton: '#uploadButton',
            settingsButton: '#settingsButton',
            logoutButton: '#logoutButton',
            registerOkay: '#registerOkay',
            registerCancel: '#registerCancel',
            enrollOkay: '#enrollOkay',
            enrollCancel: '#enrollCancel',
            encounterOkay: '#encounterOkay',
            encounterCancel: '#encounterCancel',
            settingsConnection: '#settingsConnection',
            settingsCancel: '#settingsCancel',
            studyOkay: '#studyOkay',
            studyCancel: '#studyCancel',
            registerForm: '#registerForm',
            enrollForm: '#enrollForm',
            encounterForm: '#encounterForm'
        },
        control: {
            // control for buttons in loginScreen
            loginOkay: {
                tap: function () {
                    this.doLogin(true);
                }
            },loginCancel: {
                tap: function () {
                    this.doLogin(false);
                }
            },
            // control for buttons in connectionSettings
            connectionOkay: {
                tap: function () {
                    this.doConnect(true);
                }
            },connectionCancel: {
                tap: function () {
                    this.doConnect(false);
                }
            },
            // control for buttons in optionsScreen 
            selectStudy: {
                tap: function () {
                    this.doStudy('start')
                }
            },selectForms: {
                tap: function () {
                    this.doForms('start', true)
                }
            },downloadButton: {
                tap: function () {
                    this.doDownload('start')
                }
            },uploadButton: {
                tap: function () {
                    this.doUpload('start')
                }
            },settingsButton: {
                tap: function () {
                    this.doSettings('start')
                }
            },logoutButton: {
                tap: function () {
                    this.doLogout('start')
                }
            },
            // control for buttons in patientOptions
            registerOkay: {
                tap: function () {
                    this.doForms('register', true)
                }
            },registerCancel: {
                tap: function () {
                    this.doForms('register', false)
                }
            },enrollOkay: {
                tap: function () {
                    this.doForms('enroll', true)
                }
            },enrollCancel: {
                tap: function () {
                    this.doForms('enroll', false)
                }
            },encounterOkay: {
                tap: function () {
                    this.doForms('encounter', true)
                }
            },encounterCancel: {
                tap: function () {
                    this.doForms('encounter', false)
                }
            },
            // control for buttons in settingsScreen
            settingsConnection: {
                tap: function () {
                    this.doSettings('connection')
                }
            },settingsCancel: {
                tap: function () {
                    this.doSettings('cancel')
                }
            },
            // control for buttons in studyScreen
            studyOkay: {
                tap: function () {
                    this.doStudy('okay')
                }
            },studyCancel: {
                tap: function () {
                    this.doStudy('cancel')
                }
            }
        }
    },

    launch: function () {
        Ext.create('Ext.Container', {
            id: 'viewPort',
            fullscreen: true,
            layout: 'card',
            items: [{
                // log into application
                xclass: 'motechScheduleTracking.view.loginScreen'
            },{
                // confirm or adjust connection settings
                xclass: 'motechScheduleTracking.view.connectionSettings'
            },{
                // select actions based on button layout
                xclass: 'motechScheduleTracking.view.optionsScreen'
            },{
                // select form to fill in and submit
                xclass: 'motechScheduleTracking.view.patientOptions'
            },{
                // confirm or adjust settings
                xclass: 'motechScheduleTracking.view.settingsScreen'
            },{
                // confirm or adjust study selection
                xclass: 'motechScheduleTracking.view.studyScreen'
            }]
        });
    },
    /* BUTTON LOGIC */
    // when clicking the login button
    doLogin: function (arg) {
        if (arg) {
            // check login credentials
            // store items
            user = Ext.getCmp('username').getValue();
            var pass = Ext.getCmp('password').getValue();
            if (user == '' || pass == '') {
                Ext.Msg.alert("Error", "Please fill in all fields")
            } else {
                // clear form fields
                Ext.getCmp('username').reset();
                Ext.getCmp('password').reset();
                // continue to next page
                Ext.getCmp('viewPort').setActiveItem(PAGES.CONNECTION_SETTINGS);
            }
        } else {
            // exit the program
            Ext.getCmp('viewPort').setActiveItem(PAGES.LOGIN_SCREEN)
        }
    },
    // when completing the connection settings
    doConnect: function (arg) {
        if (arg) {
            // check connections
            up_url = Ext.getCmp('up_url').getValue();
            down_url = Ext.getCmp('down_url').getValue();
            if (up_url == "") {
                up_url = "http://motech.rcg.usm.maine.edu/motech-platform-server/formupload"
            }
            if (down_url == "") {
                down_url = 'http://motech.rcg.usm.maine.edu/motech-platform-server/formupload'
            }
            //continue to the next page 
            Ext.getCmp('viewPort').setActiveItem(PAGES.OPTIONS_PANEL);
        } else {
            // exit the program
            // BUG : if you navigate here through settings, you don't want to just exit the program
            // You want to just return to the previous page
            Ext.getCmp('viewPort').setActiveItem(PAGES.LOGIN_SCREEN)
        }
    },
    // when selecting a study
    doStudy: function (arg) {
        if (arg === 'start') {
            // go to studyScreen
            Ext.getCmp('viewPort').setActiveItem(PAGES.STUDY_SCREEN)
        } else if (arg === 'okay') {
            // display confirmational message
            Ext.Msg.confirm('Confirm', 'Are you sure you want to change to $study?', function () {
                // go back to optionsScreen
                Ext.getCmp('viewPort').setActiveItem(PAGES.OPTIONS_PANEL);
                // store study value in memory
            });
        } else if (arg === 'cancel') {
            // go back to optionsScreen
            Ext.getCmp('viewPort').setActiveItem(PAGES.OPTIONS_PANEL)
        }
    },
    // when selecting a form
    doForms: function (step, value) {
        if (value) {
            if (step === 'start') {
                // continue to the next page
                Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_OPTIONS);
            } else {
                Ext.Msg.confirm('Confirm', 'Are you sure you want to proceed?', function (buttonId) {
                    if (buttonId === 'yes') {
                        if (step === 'register') {
                            // get values from form
                            var regVal = Ext.getCmp('registerForm').getValues();
                            // pass values into instance of model
                            var regMod = Ext.create('motechScheduleTracking.model.registerModel', {
                                mid_reg : regVal.mid_reg,
                                first : regVal.first,
                                last : regVal.last,
                                gender : regVal.gender,
                                bday : regVal.bday,
                                phone_reg : regVal.phone_reg,
                                indemo : regVal.indemo
                            });
                            // track errors and message
                            var regErrs = regMod.validate();
                            var regMsg = '';
                            // generate error message if errors are present
                            if (!regErrs.isValid()) {
                                regErrs.each(function (err) {
                                    regMsg += err.getMessage() + '<br/>';
                                });
                                Ext.Msg.alert('ERROR',regMsg)
                            } else {
                                // create instance of store
                                var regList = Ext.create('motechScheduleTracking.store.registerList');
                                // add model to store
                                regList.add(regMod);
                                regList.sync();
                                // reset form values
                                Ext.getCmp('registerForm').reset();
                                // return to options panel
                                Ext.getCmp('viewPort').setActiveItem(PAGES.OPTIONS_PANEL);
                            }
                        } else if (step === 'enroll') {
                            // get values from form
                            var enrVal = Ext.getCmp('enrollForm').getValues();
                            // pass values into instance of model
                            var enrMod = Ext.create('motechScheduleTracking.model.enrollModel', {
                                mid_enr : enrVal.mid_enr,
                                phone_enr : enrVal.phone_enr
                            });
                            // track errors and message
                            var enrErrs = enrMod.validate();
                            var enrMsg = '';
                            // generate error message if errors are present
                            if (!enrErrs.isValid()) {
                                enrErrs.each(function (err) {
                                    enrMsg += err.getMessage() + '<br/>';
                                });
                                Ext.Msg.alert('ERROR',enrMsg)
                            } else {
                                // create instance of store
                                var enrList = Ext.create('motechScheduleTracking.store.enrollList');
                                // add model to store
                                enrList.add(enrMod);
                                enrList.sync();
                                // reset form values
                                Ext.getCmp('enrollForm').reset();
                                // return to options panel
                                Ext.getCmp('viewPort').setActiveItem(PAGES.OPTIONS_PANEL)
                            }
                        } else if (step === 'encounter') {
                            // get values from form
                            var encVal = Ext.getCmp('encounterForm').getValues();
                            // pass values into instance of model
                            var encMod = Ext.create('motechScheduleTracking.model.encounterModel', {
                                mid_enc : encVal.mid_enc,
                                date : encVal.date,
                                concept : encVal.concept
                            });
                            // track errors and message
                            var encErrs = encMod.validate();
                            var encMsg = '';
                            // generate error message if errors are present
                            if (!encErrs.isValid()) {
                                encErrs.each(function (err) {
                                    encMsg += err.getMessage() + '<br/>';
                                });
                                Ext.Msg.alert('ERROR',encMsg)
                            } else {
                                // create instance of store
                                var encList = Ext.create('motechScheduleTracking.store.encounterList');
                                // add model to store
                                encList.add(encMod);
                                encList.sync();
                                // reset form values
                                Ext.getCmp('encounterForm').reset();
                                // return to options panel
                                Ext.getCmp('viewPort').setActiveItem(PAGES.OPTIONS_PANEL)
                            }
                        }
                    }
                })
            }
        } else {
            // return to options screen 
            Ext.getCmp('viewPort').setActiveItem(PAGES.OPTIONS_PANEL);
        }
    },
    // when downloading information
    doDownload: function (arg) {
        // shows actionsheet with download options
        if (!this.actions) {
            this.actions = Ext.Viewport.add({
                xtype: 'actionsheet',
                items: [{
                    text: 'Download studies',
                    scope: this,
                    handler: function () {
                        Ext.Msg.confirm('Confirm', 'Are you sure you want to download all studies?');
                        this.actions.hide();
                    }
                },{
                    text: 'Download forms',
                    scope: this,
                    handler: function () {
                        Ext.Msg.confirm('Confirm', 'Are you sure you want to download the forms in $study?');
                        this.actions.hide();
                    }
                },{
                    text: 'Cancel',
                    scope: this,
                    ui: 'decline',
                    handler: function () {
                        this.actions.hide();
                    }
                }]
            })
        }
        this.actions.show();
    },
    // when uploading information
    doUpload: function (arg) {
        Ext.Msg.confirm('Confirm', 'Are you sure you want to upload your data?', function () {
            // upload the data
            Ext.getCmp('viewPort').setActiveItem(PAGES.OPTIONS_PANEL);
        })
        // check if connection is strong enough
        // need function to allow uploading of data
    },
    // when dealing with settings
    doSettings: function (args) {
        if (args === 'start') {
            // go to settingsScreen
            Ext.getCmp('viewPort').setActiveItem(PAGES.SETTINGS_SCREEN);
        } else if (args === 'connection') {
            // go to connectionSettings
            Ext.getCmp('viewPort').setActiveItem(PAGES.CONNECTION_SETTINGS);
        } else if (args === 'cancel') {
            // return to optionsScreen
            Ext.getCmp('viewPort').setActiveItem(PAGES.OPTIONS_PANEL)
        }
    },
    // when logging out
    doLogout: function (arg) {
        Ext.Msg.confirm('Confirm', 'Are you sure you want to logout?', function () {
            // make sure everything is uploaded
            // delete information stored
            // close application
            Ext.getCmp('viewPort').setActiveItem(PAGES.LOGIN_SCREEN)
        })
    }
});