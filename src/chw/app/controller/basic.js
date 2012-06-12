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


// current functionality: move between screens
Ext.define('demoVersion2.controller.basic', {

    extend: 'Ext.app.Controller',
    // requires: '',
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
            },
            loginCancel: {
                tap: function () {
                    this.doLogin(false);
                }
            },

            // control for buttons in connectionSettings
            connectionOkay: {
                tap: function () {
                    this.doConnect(true);
                }
            },
            connectionCancel: {
                tap: function () {
                    this.doConnect(false);
                }
            },

            // control for buttons in optionsScreen 
            selectStudy: {
                tap: function () {
                    this.doStudy('start')
                }
            },
            selectForms: {
                tap: function () {
                    this.doForms('start', true)
                }
            },
            downloadButton: {
                tap: function () {
                    this.doDownload('start')
                }
            },
            uploadButton: {
                tap: function () {
                    this.doUpload('start')
                }
            },
            settingsButton: {
                tap: function () {
                    this.doSettings('start')
                }
            },
            logoutButton: {
                tap: function () {
                    this.doLogout('start')
                }
            },

            // control for buttons in patientOptions
            registerOkay: {
                tap: function () {
                    this.doForms('register', true)
                }
            },
            registerCancel: {
                tap: function () {
                    this.doForms('register', false)
                }
            },
            enrollOkay: {
                tap: function () {
                    this.doForms('enroll', true)
                }
            },
            enrollCancel: {
                tap: function () {
                    this.doForms('enroll', false)
                }
            },
            encounterOkay: {
                tap: function () {
                    this.doForms('encounter', true)
                }
            },
            encounterCancel: {
                tap: function () {
                    this.doForms('encounter', false)
                }
            },

            // control for buttons in settingsScreen
            settingsConnection: {
                tap: function () {
                    this.doSettings('connection')
                }
            },
            settingsCancel: {
                tap: function () {
                    this.doSettings('cancel')
                }
            },

            // control for buttons in studyScreen
            studyOkay: {
                tap: function () {
                    this.doStudy('okay')
                }
            },
            studyCancel: {
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
            items: [

            // log into application
            {
                xclass: 'demoVersion2.view.loginScreen'
            },

            // confirm or adjust connection settings
            {
                xclass: 'demoVersion2.view.connectionSettings'
            },

            // select actions based on button layou
            {
                xclass: 'demoVersion2.view.optionsScreen'
            },
            // select actions based on nested tab layout
            // { xclass : 'demoVersion2.view.optionsPanel'},

            // select form to fill in and submit
            {
                xclass: 'demoVersion2.view.patientOptions'
            },

            // confirm or adjust settings
            {
                xclass: 'demoVersion2.view.settingsScreen'
            },

            // confirm or adjust study selection
            {
                xclass: 'demoVersion2.view.studyScreen'
            }

            ]
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

            // console.log(user);
            // console.log(pass);
            if (user == '' || pass == '') {

                Ext.Msg.alert("Error", "Please fill in all fields")

            } else {

                Ext.getCmp('username').reset();
                Ext.getCmp('password').reset();

                // continue to next page
                Ext.getCmp('viewPort').setActiveItem(1);

            }

        } else {
            // exit the program
            Ext.getCmp('viewPort').setActiveItem(0)
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

            // console.log(up_url+down_url)

            //continue to the next page 
            Ext.getCmp('viewPort').setActiveItem(2);

        } else {
            // exit the program
            // BUG : if you navigate here through settings, you don't want to just exit the program
            // You want to just return to the previous page
            Ext.getCmp('viewPort').setActiveItem(0)
        }

    },

    // when selecting a study
    doStudy: function (arg) {

        if (arg == 'start') {

            // go to studyScreen
            Ext.getCmp('viewPort').setActiveItem(5)

        } else if (arg == 'okay') {

            // display confirmational message
            Ext.Msg.confirm('Confirm', 'Are you sure you want to change to $study?', function () {

                // go back to optionsScreen
                Ext.getCmp('viewPort').setActiveItem(2);

                // store study value in memory
            });

        } else if (arg == 'cancel') {

            // go back to optionsScreen
            Ext.getCmp('viewPort').setActiveItem(2)
        }

    },

    // when selecting a form
    doForms: function (step, value) {


        if (value) {
            if (step == 'start') {
                // continue to the next page
                Ext.getCmp('viewPort').setActiveItem(3);
            } else {

                Ext.Msg.confirm('Confirm', 'Are you sure you want to proceed?', function (buttonId) {

                    if (buttonId === 'yes') {

                        if (step == 'register') {

                            // register patient
                            var values = Ext.getCmp('registerForm').getValues();
                            // console.log(values.mid_reg);
                            // console.log(values);
                            if (values.first == "" || values.gender == "empty" || values.indemo == "empty" || values.last == "" || values.mid_reg == "" || values.phone_reg == "") {

                                Ext.Msg.alert("Error", "Please fill in all fields")

                            } else if (!isNaN(values.phone_reg) || !isNaN(values.mid_reg)) {

                                Ext.Msg.alert("Error", "Please use only numbers for MoTeCH ID and Phone Number")

                            } else {

                                var temp = Ext.create('demoVersion2.model.registerModel');

                                temp.set('mid_reg', values.mid_reg);
                                temp.set('first', values.first);
                                temp.set('last', values.last);
                                temp.set('gender', values.gender);
                                temp.set('bday', values.bday);
                                temp.set('phone_reg', values.phone_reg);
                                temp.set('indemo', values.indemo);

                                console.log(temp);

                                var store = Ext.create('demoVersion2.store.registerList');

                                store.add(temp);
                                store.sync();

                                /*store.on("write", function () {
                                        console.log("write")
                                    }, this)*/

                                Ext.getCmp('registerForm').reset();
                                Ext.getCmp('viewPort').setActiveItem(2);

                            }

                        } else if (step == 'enroll') {

                            // enroll patient
                            var values = Ext.getCmp('enrollForm').getValues();

                            if (values.mid_enr == '' || values.phone_enr == '') {

                                Ext.Msg.alert("Error", "Please fill in all fields")

                            } else if (!isNaN(values.phone_enr) || !isNaN(values.mid_enr)) {

                                Ext.Msg.alert("Error", "Please use only numbers for MoTeCH ID and Phone Number")

                            } else {

                                var temp = Ext.create('demoVersion2.model.enrollModel');

                                temp.set('mid_enr', values.mid_enr);
                                temp.set('phone_enr', values.phone_enr);

                                /*Ext.getStore('enrollList').add(temp);
                                    Ext.getStore('enrollList').sync();*/

                                console.log(temp);

                                var store = Ext.create('demoVersion2.store.enrollList');

                                store.add(temp);
                                store.sync();

                                Ext.getCmp('enrollForm').reset();
                                Ext.getCmp('viewPort').setActiveItem(2);

                            }

                        } else if (step == 'encounter') {

                            // register encounter
                            var values = Ext.getCmp('encounterForm').getValues();

                            if (values.mid_enc == '' || values.date == '' || values.concept == 'empty') {

                                Ext.Msg.alert("Error", "Please fill in all fields")

                            } else if (!isNaN(values.mid_enc)) {

                                Ext.Msg.alert("Error", "Please use only numbers for MoTeCH ID")

                            } else {

                                var temp = Ext.create('demoVersion2.model.encounterModel');

                                temp.set('mid_enc', values.mid_enc);
                                temp.set('date', values.date);
                                temp.set('concept', values.concept);

                                /*Ext.getStore('encounterList').add(temp);
                                    Ext.getStore('encounterList').sync();*/

                                console.log(temp);

                                var store = Ext.create('demoVersion2.store.encounterList');

                                store.add(temp);
                                store.sync();

                                Ext.getCmp('encounterForm').reset();
                                Ext.getCmp('viewPort').setActiveItem(2);

                            }

                        }

                    }

                })

            }
        } else {
            // return to options screen 
            Ext.getCmp('viewPort').setActiveItem(2);
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
                }, {
                    text: 'Download forms',
                    scope: this,
                    handler: function () {
                        Ext.Msg.confirm('Confirm', 'Are you sure you want to download the forms in $study?');
                        this.actions.hide();
                    }
                }, {
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
            Ext.getCmp('viewPort').setActiveItem(2);
        })
        // check if connection is strong enough
        // need function to allow uploading of data
    },

    // when dealing with settings
    doSettings: function (args) {

        if (args == 'start') {

            // go to settingsScreen
            Ext.getCmp('viewPort').setActiveItem(4);

        } else if (args == 'connection') {

            // go to connectionSettings
            Ext.getCmp('viewPort').setActiveItem(1);

        } else if (args == 'cancel') {

            // return to optionsScreen
            Ext.getCmp('viewPort').setActiveItem(2)

        }

    },

    // when logging out
    doLogout: function (arg) {

        Ext.Msg.confirm('Confirm', 'Are you sure you want to logout?', function () {

            // make sure everything is uploaded
            // delete information stored
            // close application
            Ext.getCmp('viewPort').setActiveItem(0)
        })


    }
});