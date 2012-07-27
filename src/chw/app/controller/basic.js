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
Ext.define('chw.controller.basic', {
    extend: 'Ext.app.Controller',
    config: {
        control: {
            "button[action=addButton]": {
                tap: function () {
                    this.doToolbar('add')
                }
            },
            "button[action=cancelButton]": {
                tap: function () {
                    this.doOption(false)
                }
            },
            "button[action=goback]":{
                tap:function(){
                    this.doBack();
                }
            },
            "button[action=goToAddPatient]":{
                tap:function(){
                    this.doOption(true);
                }
            },
            "button[action=illnessAdd]": {
                tap: function () {
                    var pid = Ext.ComponentQuery.query('patientDetails #patientIdLabel')[0].getValue();
                    Ext.ComponentQuery.query('addIllness #patientIdField')[0].setValue(pid);
                    Ext.getCmp('viewPort').setActiveItem(PAGES.addIllness)
                }
            },
            "button[action=inventoryAdd]": {
                tap: function () {
                    this.doInventory('add')
                }
            },
            "button[action=inventoryButton]": {
                tap: function () {
                    this.doToolbar('inventory')
                }
            },
            "button[action=inventoryReduce]": {
                tap: function () {
                    this.doInventory('reduce')
                }
            },
            "button[action=logoutButton]": {
                tap: function () {
                    this.doToolbar('logout')
                }
            },
            "button[action=okButton]": {
                tap: function () {
                    this.doOption(true)
                }
            },
            "button[action=resourceButton]": {
                tap: function () {
                    this.doToolbar('resources')
                }
            },
            "button[action=syncButton]": {
                tap: function () {
                    this.doToolbar('sync')
                }
            },
            "selectfield[action=langfield]":{
                change:function(option){
                    localStorage.setItem('lang',option.getValue());
                    window.location = "." //Refreshing page
                }
            }
        }
    },
    launch: function () {
        Ext.create('Ext.Container', {
            id: 'viewPort',
            fullscreen: true,
            layout: 'card',
            activeItem: PAGES.loginScreen,
            items: [{   
                xclass: 'chw.view.loginScreen'
            }, {
                xclass: 'chw.view.familyList'
            }, {
                xclass: 'chw.view.illnessList'
            }, {
                xclass: 'chw.view.familyDetails'
            }, {
                xclass: 'chw.view.patientDetails'
            }, {
                xclass: 'chw.view.visitDetails'
            }, {
                xclass: 'chw.view.inventoryList'
            }, {
                xclass: 'chw.view.inventoryDetails'
            }, {
                xclass: 'chw.view.addOptions'
            }, {
                xclass: 'chw.view.addFamily'
            }, {
                xclass: 'chw.view.addPatient'
            }, {
                xclass: 'chw.view.addIllness'
            }, {
                xclass: 'chw.view.resourceList'
            }, {
                xclass: 'chw.view.resourceDetail'
            }, {
                xclass: 'chw.view.illnessDetails'
            }]
        })
    },
    
    doAdd: function(step,arg){
        if(arg){
            if(step==='family'){
                //Adding a  family
                var name = Ext.getCmp('familyName').getValue();
                var address = Ext.getCmp('address').getValue();
                var description = Ext.getCmp('description').getValue();
                
                if(familyName=='' || address==''){
                    Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), 
                    Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'));
                }else{
                    var familyStore = Ext.getStore('families');
                    if(!familyStore){
                        familyStore = Ext.create('chw.store.families');
                    }
                    //Assign family ID using the number of families already in store. These ID start from 1
                    var familyCount = familyStore.getCount();
                    familyCount = familyCount+1;
                    
                    var familyModel = Ext.create('chw.model.family',{
                        familyName: name,
                        familyAddress: address,
                        familyDescrip: description,
                        familyId: familyCount,
                        familyLatitude: 25,
                        familyLongitude: 25,
                        //Hard-coded image of family. This is where the image location would
                        //be inserted when the user takes the image using the camera.
                        familyImage: 'resources/home.png', 
                        //Calculate distance using GPS and insert here
                        familyDistance: 20
                    });
                    
                    familyStore.add(familyModel);
                    familyStore.sync();
                    Ext.getCmp('familyName').reset();
                    Ext.getCmp('address').reset();
                    Ext.getCmp('description').reset();
                    Ext.getCmp('viewPort').setActiveItem(PAGES.familyList);
                }
            } else if(step==='patient') {
                //Add a patient
                var familyIdVal = Ext.ComponentQuery.query('AddPatient #familyId')[0].getValue();
                var firstNameVal = Ext.ComponentQuery.query('AddPatient #firstName')[0].getValue();
                var lastNameVal = Ext.ComponentQuery.query('AddPatient #lastName')[0].getValue();
                var radioform = Ext.getCmp('ext-AddPatient-1').saveForm();
                var birthDay = Ext.ComponentQuery.query('AddPatient #bday')[0].getValue();
                var imageLocation = Ext.ComponentQuery.query('AddPatient #imageField')[0].getValue();
                imageLocation = '/Raxa-JSS/chw/resources/'+imageLocation
                
                if(firstNameVal=='' || lastNameVal== '' || !radioform.radiogroup || imageLocation==''){
                    Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'));
                }else{
                    //Move ahead with adding the patient
                    var gender = radioform.radiogroup.charAt(0);
                    var patientStore = Ext.getStore('patients');
                    if(!patientStore){
                        Ext.create('chw.store.patients');
                    }
                    
                    //Removing the filter from the patient store so that counting 
                    //the number of patients in store gives a correct count. Before removing filter
                    //its being saved first.
                    var saveFilter= patientStore.getFilters();
                    patientStore.clearFilter()
                    var patientCount = patientStore.getCount();
                    patientCount = patientCount+1;
                    //After counting, re-apply whatever filter it had.
                    patientStore.setFilters(saveFilter);
                    patientStore.load();
                    
                    var patientModel = Ext.create('chw.model.patient',{
                        familyId: familyIdVal,
                        patientId: patientCount,
                        firstName: firstNameVal,
                        familyName: lastNameVal,
                        patientGender: gender,
                        birthDate: birthDay,
                        //Currenty, image needs to be specified by user. In the future
                        //this will be replaced by letting the user take a picture, after
                        //which the location should be inserted here
                        patientImage: imageLocation
                    });
                    
                    patientStore.add(patientModel);
                    patientStore.sync();
                    Ext.getCmp('ext-AddPatient-1').reset();
                    Ext.getCmp('viewPort').setActiveItem(PAGES.familyDetails);
                }
            } else if (step==='illness') {
                //Add an illness
                var patientIdVal = Ext.ComponentQuery.query('addIllness #patientIdField')[0].getValue();
                var patientStore = Ext.getStore('patients')
                patientStore.load();
                var patientDetailsVal = patientStore.getAt(patientIdVal - 1).getData();
                var illnessIdVal = Ext.ComponentQuery.query('addIllness #illnessNameField')[0].getRecord().data.illnessId;
                var illnessDetailsVal = Ext.ComponentQuery.query('addIllness #illnessNameField')[0].getRecord().data;
                var illnessStartVal = Ext.ComponentQuery.query('addIllness #illnessStartDate')[0].getValue();
                var illnessEndVal = Ext.ComponentQuery.query('addIllness #illnessEndDate')[0].getValue();
                var illnessTreatmentVal = Ext.ComponentQuery.query('addIllness #illnessTreatmentField')[0].getValue();
                var illnessNotesVal = Ext.ComponentQuery.query('addIllness #illnessNotesField')[0].getValue();
                if (illnessDetailsVal===''||illnessStartVal===''||illnessEndVal===''||illnessTreatmentVal===''||illnessNotesVal==='') {
                    Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'));
                } else {
                    var piStore = Ext.getStore('patientsIllnesses');
                    if (!piStore) {
                        Ext.create('chw.store.patientIllnesses')
                    }
                    var piModel = Ext.create('chw.model.patientIllness', {
                        patientId: patientIdVal,
                        illnessId: illnessIdVal,
                        illnessDetails: illnessDetailsVal,
                        illnessStartDate: illnessStartVal,
                        illnessEndDate: illnessEndVal,
                        illnessTreatment: illnessTreatmentVal,
                        illnessNotes: illnessNotesVal,
                        patientDetails: patientDetailsVal
                    });
                    piStore.add(piModel);
                    piStore.sync();
                    // TODO: reset form
                    Ext.getCmp('viewPort').setActiveItem(PAGES.patientDetails)
                }
            }
        }
    },
    doBack: function () {
        var active = Ext.getCmp('viewPort').getActiveItem();
        if(active.id=='ext-panel-5' || active.id=='ext-familyDetails-1' || active.id=='ext-panel-3' || active.id=='ext-tabpanel-2' || active.id=='ext-panel-1'){
            //Go back to family list
            this.doList('familyList');
            Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
        }else if(active.id == 'ext-AddPatient-1' || active.id=='ext-patientDetails-1'){
            //Go back to family details
            helper.listDisclose('family', savedFamilyRecord)
        }else if(active.id=='inventoryDetails'){
            //Go back to inventory list
            this.doToolbar('inventory')
        }else if(active.id=='ext-resourceDetail-1'){
            //Go back to resource list
            this.doToolbar('resources')
        }else if(active.id=='illnessDetails'){
            //Since illnessDetails can be reached from two separate views,
            //we are maintaining one global var 'toHistoryFrom' which saves
            //which page we came into illnessDetails from
            if(toHistoryFrom == 'patientDetails'){
                //go back to patient details
                helper.listDisclose('patient', savedPatientRecord)
            }else if(toHistoryFrom == 'ipatient'){
                //or disease list
                //This is not working. Something might be broken.
                helper.listDisclose('illness', savedIllnessRecord)
            }
        }else{
            //If youve added a new view and have not handled it's back button functionality
            //this will console it's page id
            console.log(active.id);
        }
    },
    doInventory: function (arg, amt) {
        // prompt user to input amount of pills to decrease or increase
        // TODO: do we need to document to whom this interaction is being made?
        if (!amt) {
            if (arg==='add') {
                Ext.Msg.prompt('Add', 'How many pills would you like to add?', function (resp, input) {
                    if (resp==='ok') {
                        this.doInventory('add', input)
                    }
                })
            } else if (arg==='reduce') {
                Ext.Msg.prompt('Reduce', 'How many pills would you like to reduce?', function (resp, input) {
                    if (resp==='ok') {
                        this.doInventory('reduce', input)
                    }
                })
            }
        } else {
            // TODO: increase the pill amount
            if (arg==='add') {
                
            }
            // TODO: decrease the pill amount
            else if (arg==='reduce') {
                
            }
        // TODO: refresh the page
        // TODO: send this amount to the server for notifying the  main hospital
        }
    }, 
    doExit: function () {
        USER.name = '';
        USER.uuid = '';
        Ext.getCmp('viewPort').setActiveItem(PAGES.loginScreen)
    },
    doLogin: function (arg) {
        if (arg) {
            // fetch and store items
            USER.name = Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].getValue();
            var pass = Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].getValue(); 
            if (USER.name===''||pass==='') {
                Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'),
                    Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'))
            } else {
                // Get user information from the server
                Ext.Ajax.request({
                    scope: this,
                    withCredentials: true,
                    useDefaultXhrHeader: false,
                    url: MRSHOST + '/ws/rest/v1/user?q=' + USER.name,
                    method: 'GET',
                    headers: HEADERS,
                    success: function (resp) {
                        var userInfo = Ext.decode(resp.responseText);
                        if (userInfo.results.length!==0) {
                            Ext.Ajax.request({
                                scope: this,
                                url: userInfo.results[0].links[0].uri + '?v=full',
                                method: 'GET',
                                withCredentials: true,
                                useDefaultXhrHeader: false,
                                headers: HEADERS,
                                success: function (resp) {
                                    var userInf = Ext.decode(resp.responseText);
                                    //Once we have the user uuid verified, we now store these in local storage.
                                    localStorage.setItem('uuid',userInf.person.uuid)
                                },
                                failure: function () {}
                            })
                            USER.uuid = localStorage.getItem('uuid')
                        } else {}
                    },
                    failure: function () {}
                })
                // save basic auth header
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
                        "Authorization": "Basic " + window.btoa(USER.name + ":" + pass)
                    },
                    success: function (response) {
                        CONNECTED = true; //TODO: This global var is probably not used anymore.
                        var authenticated = Ext.decode(response.responseText).authenticated;
                        if (authenticated) {
                            //Once the credentials are verified by the server, we now save the auth headers in local storage.
                            //This way  the user can log in to the application without requiring internet connectivity
                            localStorage.setItem("basicAuthHeader", "Basic " + window.btoa(USER.name + ":" + pass));
                            Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].reset();
                            Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].reset();
                            this.doList('familyList');
                            Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
                        } else {
                            Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].reset();
                            Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].reset();
                            Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), 
                                Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.tryAgainError'))
                        }
                    },
                    failure: function () {
                        //We were not able connect to the server.Now process to verifiy credentails against locally
                        //stored values.
                        //TODO: This global var is probably not used anymore.
                        CONNECTED = false;
                        // Hashing user/pass
                        var hashPass = 'Basic ' + window.btoa(USER.name + ":" + pass);
                        var hashStored = localStorage.getItem('basicAuthHeader');
                        // Compare hashPass to hashStored
                        if (hashPass === hashStored) {
                            Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].reset();
                            Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].reset();
                            this.doList('familyList');
                            Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
                        } else {
                            Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].reset();
                            Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].reset();
                            Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), 
                                Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.tryAgainError'))
                        }
                    }
                })
            }
        } else {
            // Exit the program
            this.doExit();
        }
    },
    doList: function (arg) {
        if (arg==='familyList') {
            // Set up store for list organized by family
            var fstore = Ext.getStore('families');
            if (!fstore) {
                Ext.create('chw.store.families')
            }
            fstore.load();
            Ext.getCmp('familyLists').setStore(fstore)
            // Set up store for list organized by illness
            var istore = Ext.getStore('illnesses');
            if (!istore) {
                Ext.create('chw.store.illnesses')
            }
            istore.load();
            Ext.getCmp('illnessNames').setStore(istore)
        }
    },
    doOption: function (arg) {
        if (arg) {
            var active = Ext.getCmp('viewPort').getActiveItem();
            if (active.getActiveItem()===PAGES.loginScreen) {
                this.doLogin(arg);
            } else if (active.id==='ext-panel-5'){ 
                //Proceed to add a Family
                this.doAdd('family', arg);
            } else if (active.id==='ext-familyDetails-1'){ 
                //Proceed to adding a patient. Here the family name and family id is being forwarded to that view.
                Ext.ComponentQuery.query('AddPatient #familyField')[0].setValue(Ext.ComponentQuery.query('familyDetails #familyTitle')[0].getTitle());
                Ext.ComponentQuery.query('AddPatient #familyId')[0].setValue(Ext.ComponentQuery.query('familyDetails #familyIdLabel')[0].getValue())
                Ext.getCmp('viewPort').setActiveItem(PAGES.addPatient);
            } else if (active.id==='ext-AddPatient-1'){ 
                //Execute logic for adding a patient.
                //Optimization: Instead of calling doOption, the button for adding a patient should directly
                //call doAdd.
                this.doAdd('patient', arg);
            } else if (active.id==='ext-addIllness-1'){
                //Execute logic for adding an illness
                //Optimization: Instead of calling doOption, the button for adding an illness should directly
                //call doAdd.
                this.doAdd('illness', arg)
            }
        }
    }, 
    doToolbar: function (arg) {
        //Toolbar button functionalities
        if (arg==='add') {
            //Adding a family
            Ext.getCmp('viewPort').setActiveItem(PAGES.addFamily)
        } else if (arg==='sync') {
            //Syncing data
            Ext.Msg.confirm('',Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.sync'), function (resp) {
                if (resp==='yes') {
                    //Send data to server
                }
            })
        } else if (arg==='inventory') {
            //Show inventory
            var nstore = Ext.getStore('pills')
            if (!nstore) {
                Ext.create('chw.store.pills')
            }
            nstore.load();
            Ext.getCmp('inventoryLists').setStore(nstore)
            // console.log(Ext.getCmp('inventoryLists').getStore())
            Ext.getCmp('viewPort').setActiveItem(PAGES.inventoryList)
        } else if (arg==='logout') {
            this.doExit()
        } else if (arg==='resources') {
            //Show resources
            Ext.getCmp('viewPort').setActiveItem(PAGES.resourceList)
        }
    }
})
