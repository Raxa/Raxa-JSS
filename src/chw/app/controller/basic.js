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
    config: {
        control: {
            "button[action=add_app]": {
                tap: function () {
                    this.doAdd('app', true)
                }
            },
            "button[action=add_reg]": {
                tap: function () {
                    this.doAdd('reg', true)
                }
            },
            "button[action=add_rem]": {
                tap: function () {
                    this.doAdd('rem', true)
                }
            },
            "button[action=cancel]": {
                tap: function () {
                    this.doOption(false)
                }
            },
            "button[action=syncButton]": {
                tap: function () {
                    this.doToolbar('sync')
                }
            },
            "button[action=inboxButton]": {
                tap: function () {
                    this.doToolbar('inbox')
                }
            },
            "button[action=locButton]" :{
                tap: function () {
                    this.doLocation()
                }
            },
            "button[action=logoutButton]": {
                tap: function () {
                    this.doExit()
                }
            },
            "button[action=logoutButton_vc]": {
                tap: function () {
                    this.doExit()
                }
            },
            "button[action=menuButton]": {
                tap: function () {
                    this.doToolbar('menu')
                }
            },
            "button[action=notButton]": {
                tap: function () {
                    this.doToolbar('not')
                }
            },
            "button[action=okButton]": {
                tap: function () {
                    this.doOption(true)
                }
            },
            "button[action=resourcesButton]": {
                tap: function () {
                    this.doToolbar('resources')
                }
            },
            "button[action=schButton]": {
                tap: function () {
                    this.doToolbar('sch')
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
                xclass: 'mUserStories.view.loginScreen'
            }, {
                xclass: 'mUserStories.view.patientList'
            }, {
                xclass: 'mUserStories.view.patientDetails'
            }, {
                xclass: 'mUserStories.view.addOptions'
            }, {
                xclass: 'mUserStories.view.addPatient'
            }, {
                xclass: 'mUserStories.view.addReminder'
            }, {
                xclass: 'mUserStories.view.addAppointment'
            }, {
                xclass: 'mUserStories.view.notificationInbox'
            }, {
                xclass: 'mUserStories.view.mapPanel'
            }, {
                xclass: 'mUserStories.view.resources'
            }, {
                xclass: 'mUserStories.view.resourceDetail'
            }, {
                xclass: 'mUserStories.view.vcNotifications'
            }, {
                xclass: 'mUserStories.view.vcScheduling'
            }]
        })
    },
    addMarker: function (lat,log) {
        // TODO: wait how does this work?
        var latLng = new google.maps.LatLng(lat, log);
        var marker = new google.maps.Marker({
            map: Ext.getCmp('mapValue').map,
            position: latLng
        });
        // google.maps.event.addListener(marker, "click", function () {})
    },
    // add registrations and reminders
    // TODO: should we add more functionality? ex. place order for sample
    doAdd: function (step, arg) {
        if (arg) {
            if (step === 'app') {
                this.toPage(PAGES.ADD_APPOINTMENT)
            } else if (step === 'reg') {
                this.toPage(PAGES.ADD_REGISTER)
            } else if (step === 'rem') {
                this.toPage(PAGES.ADD_REMINDER)
            } else if (step === 'register') {
                var fname = Ext.getCmp('first_reg').getValue();
                var lname = Ext.getCmp('last_reg').getValue();
                var phone = Ext.getCmp('phone_reg').getValue();
                var village = Ext.getCmp('village_reg').getValue();
                var radioform = Ext.getCmp('ext-formpanel-4').saveForm();
                var gender = radioform.radiogroup.charAt(0);
                var bday = Ext.getCmp('bday').getValue();

                if (fname == '' || lname == '' || phone == '' || village == '' || gender == '' || bday == '') {
                    Ext.Msg.alert("Error", "Please fill in all fields")
                } else {
                    
                    var offlineStore = Ext.getStore('offlineRegisterStore');
                    if(!offlineStore){
                        offlineStore = Ext.create('mUserStories.store.offlineRegisterStore')
                    }
                    
                    var up_Model = Ext.create('mUserStories.model.postPerson',{
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
                    offlineStore.add(up_Model);
                    offlineStore.sync();
                    
                    console.log('stored offline');
                    
                    Ext.getCmp('ext-formpanel-4').reset();
                    this.doDownload();
                    this.toPage(PAGES.PATIENT_LIST)
                // Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST.value)    
                }
            } else if (step === 'reminder') {
            // TODO: validate all fields
            // TODO: add 'other' option
            }
        } else {
            // TODO: doReturn()
            this.doDownload();
            this.toPage(PAGES.PATIENT_LIST)
        }
    },
    /*/ deal with backbutton
    doBack: function () {
        // TODO: Fix this with the Titlebar
        var active = Ext.getCmp('viewPort').getActiveItem();
        if (active.id === 'ext-formpanel-5' || active === 'ext-panel-6' || active === 'ext-panel-7') {
            this.toPage(PAGES.ADD)
        } else {
            this.toPage(PAGES.PATIENT_LIST)
        }
    },*/
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
        // Ext.getCmp('location').reset();
        // return to login screen
        USER.name = '';
        USER.uuid = '';
        this.toPage(PAGES.LOGIN_SCREEN)
    },
    doLocation: function () {
        var coords = Ext.getCmp('mapValue').getGeo();
        CURR_LOC.LAT = coords.getLatitude();
        CURR_LOC.LOG = coords.getLongitude();
        Ext.Msg.alert("Location",CURR_LOC.LAT + ', ' + CURR_LOC.LOG);
        this.addMarker(CURR_LOC.LAT, CURR_LOC.LOG);
        this.toPage(PAGES.LOCATION);
    },
    // login to the application
    doLogin: function (arg) {
        if (arg) {
            // store items
            var UsernameRef = Ext.ComponentQuery.query('LoginScreen #usernameIID');
            var PasswordRef = Ext.ComponentQuery.query('LoginScreen #passwordIID');
            USER.name = UsernameRef[1].getValue();
            var pass = PasswordRef[1].getValue();
            if (USER.name === '' || pass === '') {
                Ext.Msg.alert("Error", "Please fill in all fields")
            } else {
                this.getUserInformation(USER.name);
                this.saveBasicAuthHeader(USER.name,pass);
            }
        } else {
            // exit the program
            this.doExit();
        }
    },
    // distinguish between ok and cancel
    doOption: function (arg) {
        var active = Ext.getCmp('viewPort').getActiveItem();
        if (active.getActiveItem() === PAGES.LOGIN_SCREEN.value) {
            this.doLogin(arg)
        } else if (active.id === 'ext-formpanel-4') {
            this.doAdd('register',arg)
        } else if (active === 'ext-panel-6') {
            this.doAdd('reminder',arg)
        } else if (active === 'ext-panel-7') {
            this.doAdd('appointment',arg)
        } else if (active === 'ext-tabpanel-3') {
            
        } else if (active === PAGES.INBOX_VC.value) {
            
        }
    },
    // manage navigation based on lower toolbar
    doToolbar: function (arg) {
        if (arg === 'menu') {
            this.toPage(PAGES.ADD)
        } else if (arg === 'sync') {
            Ext.Msg.confirm('', 'Sync all information?', function (resp) {
                if (resp === 'yes') {
                    // TODO: check for conflicts             
                    // doUpload all information
                    
                    var onlineStore = Ext.create('mUserStories.store.upPersonStore');
                    var offlineStore = Ext.getStore('offlineRegisterStore');
                    var i = 0;
                    
                    onlineStore.onAfter('write',function(){
                        var data =  onlineStore.getAt(i).getData();
                        this.getidentifierstype(data.uuid);
                        i++;
                    },this);
                    
                    offlineStore.each(function(record){
                        record.phantom = true;
                        onlineStore.add(record);
                        console.log(offlineStore.getNewRecords());
                        console.log(offlineStore.getUpdatedRecords());
                        console.log(offlineStore.getRemovedRecords());
                    },this);
                    
                    onlineStore.sync();
                    this.doDownload();
                    offlineStore.removeAll();
                    offlineStore.sync();
                }
            },this)
        } else if (arg === 'inbox') {
            this.toPage(PAGES.INBOX)
        } else if (arg === 'resources') {
            this.getResources();
            this.toPage(PAGES.RESOURCES)
        } else if (arg === 'not') {
            this.toPage(PAGES.INBOX_VC)
        } else if (arg === 'sch') {
            this.toPage(PAGES.SCHEDULING)
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
    getGeoLocation: function () {
        
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
    getResources : function () {
        var resource_store = Ext.getStore('resourceStore');
        resource_store.load();
        Ext.getCmp('resourceList').setStore(resource_store)
    },
    getUserInformation: function (username) {
        Ext.Ajax.request({
            scope: this,
            withCredentials: true,
            useDefaultXhrHeader: false,
            url: MRSHOST + '/ws/rest/v1/user?q=' + username,
            method: 'GET',
            headers: HEADERS,
            success: this.storeUserInformation,
            failure: function () {}
        });
    },
    loginContinue: function () {
        // clear form fields
        Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].reset();
        Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].reset();
        if (USER.type === 'CHW') {
            this.doDownload();
            this.toPage(PAGES.PATIENT_LIST);
        } else if (USER.type === 'VC') {
            this.toPage(PAGES.INBOX_VC)
        }
    },
    /* this funtions makes a post call to create the patient with three parameter which will sent as person, identifiertype 
       and loaction */
    makePatient: function (personUuid, identifierType, location) {
        var patient = Ext.create('mUserStories.model.postPatient', {
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
        
        Ext.getCmp('ext-formpanel-5').reset();
        
        this.doDownload();
        this.toPage(PAGES.PATIENT_LIST)
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
        var JSONEncounter = Ext.create(mUserStories.model.encounter,{
            encounterDatetime: ISODateString(new Date()),
            patient: Uuid,
            encounterType: 'f30845d5-9ec0-4960-8104-a1366db21dc4',
            provider : USER.uuid
            
        })
        
        //Create the encounter store and POST the encounter
        var store = Ext.create('mUserStories.store.encounterStore');
        store.add(JSONEncounter);
        store.sync();
    },
    storeUserInformation: function (userInfo) {
        var userInfoJson = Ext.decode(userInfo.responseText);
        if (userInfoJson.results.length !== 0) {
            Ext.Ajax.request({
                scope: this,
                url: userInfoJson.results[0].links[0].uri + '?v=full',
                method: 'GET',
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: HEADERS,
                success: function (response) {
                    var userInfo = Ext.decode(response.responseText);
                    USER.uuid = userInfo.person.uuid;
                    localStorage.setItem('uuid', userInfo.person.uuid)
                },
                failure: function () {
                    USER.uuid = localStorage.getItem('uuid')
                }
            });
        } else {}
    }, 
    
    toPage: function (p) {
       Ext.getCmp('viewPort').setActiveItem(p.value);
    }
})
