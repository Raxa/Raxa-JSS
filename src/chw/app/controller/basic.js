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
Ext.define('mUserStories.controller.basic', {
    extend: 'Ext.app.Controller',
    controllers: ['basic'],
    views: ['loginScreen', 'confirmLocation', 'patientList', 'patientDetails', 'vcNotifications', 'vcScheduling'],
    config: {
        refs: {
            add_app: '#add_app',
            add_reg: '#add_reg',
            add_rem: '#add_rem',
            audioButton: '#audioButton',
            back_add: '#back_add',
            back_add_app: '#back_add_app',
            back_add_reg: '#back_add_reg',
            back_add_rem: '#back_add_rem',
            back_aud: '#back_aud',
            back_det: '#back_det',
            back_inb: '#back_inb',
            back_pho: '#back_pho',
            back_res: '#back_res',
            back_vid: '#back_vid',
            cancelButton: '#cancelButton',
            downButton: '#downButton',
            inboxButton: '#inboxButton',
            logoutButton: '#logoutButton',
            logoutButton_vc: '#logoutButton_vc',
            menuButton: '#menuButton',
            notButton: '#notButton',
            okButton: '#okButton',
            photoButton: '#photoButton',
            resourcesButton: '#resourcesButton',
            schButton: '#schButton',
            upButton: '#upButton',
            videoButton: '#videoButton'
        },
        control: {
            add_app: {
                tap: function () {
                    this.doAdd('app', true)
                }
            },
            add_reg: {
                tap: function () {
                    this.doAdd('reg', true)
                }
            },
            add_rem: {
                tap: function () {
                    this.doAdd('rem', true)
                }
            },
            audioButton: {
                tap: function () {
                    this.doResources('audio')
                }
            },
            back_add: {
                tap: function () {
                    this.doBack('list')
                }
            },
            back_add_app: {
                tap: function () {
                    this.doBack('add')
                }
            },
            back_add_reg: {
                tap: function () {
                    this.doBack('add')
                }
            },
            back_add_rem: {
                tap: function () {
                    this.doBack('add')
                }
            },
            back_aud: {
                tap: function () {
                    this.doBack('res')
                }
            },
            back_det: {
                tap: function () {
                    this.doBack('list')
                }
            },
            back_inb: {
                tap: function () {
                    this.doBack('list')
                }
            },
            back_pho: {
                tap: function () {
                    this.doBack('res')
                }
            },
            back_res: {
                tap: function () {
                    this.doBack('list')
                }
            },
            back_vid: {
                tap: function () {
                    this.doBack('res')
                }
            },
            cancelButton: {
                tap: function () {
                    this.doOption(false)
                }
            },
            downButton: {
                tap: function () {
                    this.doToolbar('down')
                }
            },
            inboxButton: {
                tap: function () {
                    this.doToolbar('inbox')
                }
            },
            logoutButton: {
                tap: function () {
                    this.doExit()
                }
            },
            logoutButton_vc: {
                tap: function () {
                    this.doExit()
                }
            },
            menuButton: {
                tap: function () {
                    this.doToolbar('menu')
                }
            },
            notButton: {
                tap: function () {
                    this.doToolbar('not')
                }
            },
            okButton: {
                tap: function () {
                    this.doOption(true)
                }
            },
            photoButton: {
                tap: function () {
                    this.doResources('photo')
                }
            },
            resourcesButton: {
                tap: function () {
                    this.doToolbar('resources')
                }
            },
            schButton: {
                tap: function () {
                    this.doToolbar('sch')
                }
            },
            upButton: {
                tap: function () {
                    this.doToolbar('up')
                }
            },
            videoButton: {
                tap: function () {
                    this.doResources('video')
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
                xclass: 'mUserStories.view.loginScreen'
            }, {
                // daily checkin
                xclass: 'mUserStories.view.confirmLocation'
            }, {
                // display a list of patients
                xclass: 'mUserStories.view.patientList'
            }, {
                // display details of patient
                xclass: 'mUserStories.view.patientDetails'
            }, {
                // display options for adding
                xclass: 'mUserStories.view.addOptions'
            }, {
                xclass: 'mUserStories.view.addPatient'
            }, {
                xclass: 'mUserStories.view.addReminder'
            }, {
                xclass: 'mUserStories.view.addAppointment'
            }, {
                // display inbox/outbox
                xclass: 'mUserStories.view.notificationInbox'
            }, {
                xclass: 'mUserStories.view.resources'
            }, {
                xclass: 'mUserStories.view.videoResources'
            }, {
                xclass: 'mUserStories.view.audioResources'
            }, {
                xclass: 'mUserStories.view.photoResources'
            }, {
                xclass: 'mUserStories.view.vcNotifications'
            }, {
                xclass: 'mUserStories.view.vcScheduling'
            }]
        })
    },
    /* SCREEN FUNCTIONS */
    // add registrations and reminders
    // TODO: should we add more functionality? ex. place order for sample
    doAdd: function (step, arg) {
        if (arg) {
            if (step === 'app') {
                Ext.getCmp('viewPort').setActiveItem(PAGES.ADD_APP)
            } else if (step === 'reg') {
                Ext.getCmp('viewPort').setActiveItem(PAGES.ADD_REG)
            } else if (step === 'rem') {
                Ext.getCmp('viewPort').setActiveItem(PAGES.ADD_REM)
            } else if (step === 'register') {
                var fname = Ext.getCmp('first_reg').getValue();
                var lname = Ext.getCmp('last_reg').getValue();
                var phone = Ext.getCmp('phone_reg').getValue();
                var village = Ext.getCmp('village_reg').getValue();
                // var radioform = Ext.getCmp('radiogroup');
                // var gender = radioform.getValues().radiogroup.charAt(0);
                var gender = 'Male';
                var bday = Ext.getCmp('bday').getValue();

                if (fname == '' || lname == '' || phone == '' || village == '' || gender == '' || bday == '') {
                    Ext.Msg.alert("Error", "Please fill in all fields")
                } else {
                    var up_store = Ext.create('mUserStories.store.upPersonStore');
                    var up_Model = Ext.create('mUserStories.model.upPersonModel', {
                        names: [{
                            givenName: fname,
                            familyName: lname
                        }],
                        gender: gender,
                        birthdate: bday,
                        addresses: [{
                            cityVillage: village
                        }]
                    });
                    //Adding registration details into local storage (a store)
                    up_store.add(up_Model);
                    //REST call for creating a Person
                    up_store.sync();
                    up_store.on('write', function () {
                        console.log('Stored locally, calling identifier type');
                        // Now that Person is created, send request to create Patient
                        this.getidentifierstype(up_store.getAt(0).getData().uuid)
                    }, this)
                }
            } else if (step === 'reminder') {
            // TODO: validate all fields
            // TODO: add 'other' option
            }
        } else {
            // TODO: doReturn()
            this.doDownload();
            Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
        }
    },
    // allow chw to check in
    doLocation: function (arg) {
        if (arg) {
            // TODO: generate close locations based on USER
            LOCATION = Ext.getCmp('location').getValue();
            if (LOCATION === 'empty') {
                Ext.Msg.alert("", 'Please fill in the form')
            } else {
                if (LOCATION === "otherlocation") {
                    Ext.Msg.prompt("", "Please enter other location:", function (btn, text) {
                        if (btn === 'ok') {
                            LOCATION = text;
                        }
                    })
                }
                // TODO: pass LOCATION & CURR_DATE to manager
                // download all data into local storage
                this.doDownload();
                // continue to the next screen
                Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
            }
        } else {
            // exit the program
            this.doExit();
        }
    },
    // login to the application
    doLogin: function (arg) {
        if (arg) {
            // store items
            USER.name = Ext.getCmp('username').getValue();
            var pass = Ext.getCmp('password').getValue();
            if (USER.name === '' || pass === '') {
                Ext.Msg.alert("Error", "Please fill in all fields")
            } else {
                this.saveBasicAuthHeader(USER.name,pass);
            }
        } else {
            // exit the program
            this.doExit();
        }
    },
    // manage resources pages
    doResources: function (arg) {
        if (arg === 'video') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.VIDEO)
        } else if (arg === 'audio') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.AUDIO)
        } else if (arg === 'photo') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.PHOTO)
        }
    },
    // manage navigation based on lower toolbar
    doToolbar: function (arg) {
        if (arg === 'menu') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.ADD)
        } else if (arg === 'down') {
            Ext.Msg.confirm('', 'Sync all information?', function (resp) {
                if (resp === 'yes') {
                    // TODO: check for conflicts
                    // doDownload information in localStorage
                    this.doDownload();
                // doUpload all information
                }
            },this)
        } else if (arg === 'inbox') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_CHW)
        } else if (arg === 'resources') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCES)
        } else if (arg === 'not') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_VC)
        } else if (arg === 'sch') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.SCHEDULING)
        }
    },
    /* HELPER FUNCTIONS */
    // deal with backbutton
    doBack: function (arg) {
        // TODO: Best logic for returning to previous page - doReturn()
        // Hard coded in? Create a list of visited pages?
        if (arg === 'list') {
            this.doDownload();
            Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
        } else if (arg === 'add') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.ADD)
        } else if (arg === 'res') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCES)
        }
    },
    // Download patient with details
    doDownload: function () {
        //Initially assuming we are connected
        CONNECTED = true;
        
        //Get the download store. If it doesnt exist, then create one
        var down_store=Ext.getStore('downStore');
        if(!down_store){
            down_store = Ext.create('mUserStories.store.downStore');
            console.log('created down store');
        }
        
        //Similarly get the offline store. Create if it doesnt exist.
        var offlineStore=Ext.getStore('offlineStore');
        if(!offlineStore){
            offlineStore = Ext.create('mUserStories.store.offlineStore');
            console.log('created offline store');
        }

        //Make the download store attempt to fetch values from the web. See downStore.js
        down_store.load();
        down_store.on('load',function(){
            // So if the exception was raised (in downStore.js), the list would at this point be populated with offline data.
            // If the exception was not raised, and hence CONNECTED=1, then we proceed to fill the offline store with new values
            if(CONNECTED){
                //Before updating the offline store, clean it up
                offlineStore.removeAll();
                //Fill offline store
                down_store.each(function (record){
                    offlineStore.add(record);
                    offlineStore.sync();
                });
                //At this point, when we do have connectivity, borh our stores- the offline and online stores will have the same value. 
                // So you can populate the list with either stores. This is the end of the scenario when we do have connectivity.
                Ext.getCmp('patientlistid').setStore(offlineStore);
            }
        },this)
        
       
        
    // TODO: set patientcurrid to be subset of above organized by appt time
    // Do we need a separate store for this?
    },
    // exit the program
    doExit: function () {
        // TODO: make sure all information is uploaded
        // TODO: delete/save necessary information
        Ext.getCmp('location').reset();
        // return to login screen
        Ext.getCmp('viewPort').setActiveItem(PAGES.LOGIN_SCREEN)
    },
    // distinguish between ok and cancel
    doOption: function (arg) {
        var active = Ext.getCmp('viewPort').getActiveItem();
        console.log(active);
        console.log(active.id);
        // console.log(Ext.getCmp('viewPort').getActiveItem().getActiveIndex());
        if (active.getActiveItem() === PAGES.LOGIN_SCREEN) {
            this.doLogin(arg)
        } else if (active.id === 'ext-panel-5') {
            this.doAdd('register',arg)
        } else if (active === 'ext-panel-6') {
            this.doAdd('reminder',arg)
        } else if (active === 'ext-panel-7') {
            this.doAdd('appointment',arg)
        } else if (active === 'ext-tabpanel-3') {
            
        } else if (active === PAGES.INBOX_VC) {
            
        }
    },
    /* this funtions makes a get call to get the patient identifiers type */
    getidentifierstype: function (personUuid) {
        var identifiers = Ext.create('mUserStories.store.identifiersType')
        identifiers.load();
        console.log('Identifiers loaded');
        // This statement calls getlocation() as soon as the get call is successful
        identifiers.on('load', function () {
            console.log('Getting location');
            //Once the identifiers are loaded, fetch location parameters
            this.getlocation(personUuid, identifiers.getAt(0).getData().uuid)
        }, this);
    },
    /* this funtions makes a get call to get the location uuid */
    getlocation: function (personUuid, identifierType) {
        var locations = Ext.create('mUserStories.store.location')
        locations.load();
        console.log('locations loaded');
        // Now that we have both, identifiers type and location we can create a Patient
        locations.on('load', function () {
            console.log('Sending request to create patient');
            this.makePatient(personUuid, identifierType, locations.getAt(0).getData().uuid)
        }, this)
    },
    getPatientIdentifier: function () {
        //dummy funtion to be used for creating partient
        // TODO: writen a  ramdom no for patient identufier but it should be a unique id
        return Math.floor(Math.random() * 1000000000);
    },
    isEmpty: function (arg) {
    // TODO: check to see if the select field is empty
    // TODO: continue to arg if not empty
    },
    isOther: function (arg) {
    // TODO: check to see if the select field is other
    // TODO: pop up screen prompt
    // TODO: continue to arg 
    },
    loginContinue: function () {
        // clear form fields
        Ext.getCmp('username').reset();
        Ext.getCmp('password').reset();
        if (USER.type === 'CHW') {
            // continue to next page with proper settings
            // Ext.getCmp('welcome_label').setHtml("Welcome, "+USER.name+"<br>"+"This is your check in for "+CURR_DATE)
            this.doDownload();
            Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
        } else if (USER.type === 'VC') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_VC)
        }
    },
    /* this funtions makes a post call to create the patient with three parameter which will sent as person, identifiertype 
       and loaction */
    makePatient: function (personUuid, identifierType, location) {
        var patient = Ext.create('mUserStories.model.upPatientModel', {
            person: personUuid,
            identifiers: [{
                identifier: this.getPatientIdentifier().toString(),
                identifierType: identifierType,
                location: location,
                preferred: true
            }]
        });

        var PatientStore = Ext.create('mUserStories.store.upPatientStore')
        PatientStore.add(patient);
        //makes the post call for creating the patient
        PatientStore.sync();
        PatientStore.on('write', function () {
            console.log('------Patient Created successfully------');
            //After patient has been created, send the encounter data
            this.sendEncounterData(personUuid);
        }, this);
        
        Ext.getCmp('first_reg').reset();
        Ext.getCmp('last_reg').reset();
        Ext.getCmp('phone_reg').reset();
        Ext.getCmp('village_reg').reset();
        Ext.getCmp('bday').reset();
        Ext.getCmp('reg_form').reset();
        this.doDownload();
        Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
    },
    
    sendEncounterData:function(Uuid){
        
        //Function for getting date in correct format
        function ISODateString(d){
            function pad(n){
                return n<10 ? '0'+n : n
            }
            return d.getUTCFullYear()+'-'
            + pad(d.getUTCMonth()+1)+'-'
            + pad(d.getUTCDate())+'T'
            + pad(d.getUTCHours())+':'
            + pad(d.getUTCMinutes())+':'
            + pad(d.getUTCSeconds())+'Z'
        }
        //Creating the encounter model and hard-coding the encounter type uuid and provider uuid
        var JSONEncounter = Ext.create(mUserStories.model.encounterModel,{
            encounterDatetime: ISODateString(new Date()),
            patient: Uuid,
            encounterType: 'e9897b1e-16af-4b67-9be7-6c89e971d907',
            provider : 'fcd0f2cc-c27e-11e1-9262-a5fbf9edb8d2'
        })
        
        //Create the encounter store and POST the encounter
        var store = Ext.create('mUserStories.store.encounterStore');
        store.add(JSONEncounter);
        store.sync();
    },
    
    saveBasicAuthHeader: function (username, password) {
        // delete existing logged in sessions
        Ext.Ajax.request({
            url: MRSHOST + '/ws/rest/v1/session',
            withCredentials: true,
            useDefaultXhrHeader: false,
            method: 'DELETE',
            success: function () {}
        })
        // check login and save to localStorage if valid
        Ext.Ajax.request({
            scope:this,
            url: MRSHOST + '/ws/rest/v1/session',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + window.btoa(username + ":" + password)
            },
            success: function (response) {
                CONNECTED = true;
                var authenticated = Ext.decode(response.responseText).authenticated;
                if (authenticated) {
                    localStorage.setItem("basicAuthHeader", "Basic " + window.btoa(username + ":" + password));
                    this.loginContinue();
                } else {
                    localStorage.removeItem("basicAuthHeader");
                    Ext.Msg.alert("Error", "Please try again")
                }
            },
            failure: function (response) {
                CONNECTED = false;
                // hash user/pass
                var hashPass = 'Basic ' + window.btoa(username + ":" + password);
                var hashStored = localStorage.getItem('basicAuthHeader');
                // compare hashPass to hashStored
                if (hashPass === hashStored) {
                    this.loginContinue();
                } else {
                    Ext.Msg.alert("Error", "Please try again")
                }
            }
        })
    }
})