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
                    window.location = "."
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
    // console.log(Ext.getCmp('viewPort').getActiveItem());
    },
    doAdd: function(step,arg){
        if(arg){
            if(step==='family'){
                //add family
                var name = Ext.getCmp('familyName').getValue();
                var address = Ext.getCmp('address').getValue();
                var description = Ext.getCmp('description').getValue();
                
                if(familyName=='' || address==''){
                    Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'));
                }else{
                    var familyStore = Ext.getStore('families');
                    if(!familyStore){
                        familyStore = Ext.create('chw.store.families');
                    }
                    var familyCount = familyStore.getCount();
                    familyCount = familyCount+1;
                    var familyModel = Ext.create('chw.model.family',{
                        familyName: name,
                        familyAddress: address,
                        familyDescrip: description,
                        familyId: familyCount,
                        familyLatitude: 25,
                        familyLongitude: 25,
                        familyImage: 'resources/home.png',
                        familyDistance: 20
                    });
                    
                    familyStore.add(familyModel);
                    familyStore.sync();
                    //                    familyStore.on('write',function(){
                    // console.log('Added family locally');
                    Ext.getCmp('familyName').reset();
                    Ext.getCmp('address').reset();
                    Ext.getCmp('description').reset();
                    Ext.getCmp('viewPort').setActiveItem(PAGES.familyList);
                //                    })
                }
            } else if(step==='patient') {
                //add patient
                var familyIdVal = Ext.ComponentQuery.query('AddPatient #familyId')[0].getValue();
                var firstNameVal = Ext.ComponentQuery.query('AddPatient #firstName')[0].getValue();
                var lastNameVal = Ext.ComponentQuery.query('AddPatient #lastName')[0].getValue();
                var radioform = Ext.getCmp('ext-AddPatient-1').saveForm();
                var birthDay = Ext.ComponentQuery.query('AddPatient #bday')[0].getValue();
                
                if(firstNameVal=='' || lastNameVal== '' || !radioform.radiogroup){
                    Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'));
                }else{
                    //Move ahead with adding the patient
                    var gender = radioform.radiogroup.charAt(0);
                    var patientStore = Ext.getStore('patients');
                    if(!patientStore){
                        Ext.create('chw.store.patients');
                    }
                    
                    var saveFilter= patientStore.getFilters();
                    patientStore.clearFilter()
                    var patientCount = patientStore.getCount();
                    patientCount = patientCount+1;
                    patientStore.setFilters(saveFilter);
                    patientStore.load();
                    
                    var patientModel = Ext.create('chw.model.patient',{
                        familyId: familyIdVal,
                        patientId: patientCount,
                        firstName: firstNameVal,
                        familyName: lastNameVal,
                        patientGender: gender,
                        birthDate: birthDay
                    });
                    
                    patientStore.add(patientModel);
                    patientStore.sync();
                    Ext.getCmp('ext-AddPatient-1').reset();
                    Ext.getCmp('viewPort').setActiveItem(PAGES.familyDetails);
                }
            } else if (step==='illness') {
                // TODO: get patient ID -- how do i pass this?
                // get all information from form
                var patientIdVal = Ext.ComponentQuery.query('addIllness #patientIdField')[0].getValue();
                var illnessNameVal = Ext.ComponentQuery.query('addIllness #illnessNameField')[0].getRecord().data;
                // console.log(illnessNameVal);
                var illnessStartVal = Ext.ComponentQuery.query('addIllness #illnessStartDate')[0].getValue();
                var illnessEndVal = Ext.ComponentQuery.query('addIllness #illnessEndDate')[0].getValue();
                var illnessTreatmentVal = Ext.ComponentQuery.query('addIllness #illnessTreatmentField')[0].getValue();
                var illnessNotesVal = Ext.ComponentQuery.query('addIllness #illnessNotesField')[0].getValue();
                // console.log(illnessNameVal,illnessStartVal,illnessEndVal,illnessTreatmentVal,illnessNotesVal)
                if (illnessNameVal===''||illnessStartVal===''||illnessEndVal===''||illnessTreatmentVal===''||illnessNotesVal==='') {
                    Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'));
                } else {
                    var piStore = Ext.getStore('patientsIllnesses');
                    if (!piStore) {
                        Ext.create('chw.store.patientIllnesses')
                    }
                    var piModel = Ext.create('chw.model.patientIllness', {
                        patientId: patientIdVal,
                        illnessDetails: illnessNameVal,
                        illnessStartDate: illnessStartVal,
                        illnessEndDate: illnessEndVal,
                        illnessTreatment: illnessTreatmentVal,
                        illnessNotes: illnessNotesVal
                    });
                    piStore.add(piModel);
                    piStore.sync();
                    // console.log(localStorage)
                    // TODO: reset
                    // console.log(Ext.getCmp('ext-addIllness-1'))
                    // Ext.getCmp('ext-addIllness-1').reset();
                    Ext.getCmp('viewPort').setActiveItem(PAGES.patientDetails)
                }
            }
        }
    },
    doBack: function () {
        var active = Ext.getCmp('viewPort').getActiveItem();
        
        if(active.id=='ext-panel-5' || active.id=='ext-familyDetails-1' || active.id=='ext-panel-3' || active.id=='ext-tabpanel-2'){
            this.doList('familyList');
            Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
        }else if(active.id == 'ext-AddPatient-1' || active.id=='ext-patientDetails-1'){
            //go back to family details
            helper.listDisclose('family', savedFamilyRecord)
        }else if(active.id=='inventoryDetails'){
            //go back to inventory list
            this.doToolbar('inventory')
        }else if(active.id=='ext-resourceDetail-1'){
            this.doToolbar('resources')
        }else{
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
        // TODO: pass this amount to the ganiyari
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
                Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'),Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.fillAllFieldsError'))
            } else {
                // get user information
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
                        CONNECTED = true;
                        var authenticated = Ext.decode(response.responseText).authenticated;
                        if (authenticated) {
                            localStorage.setItem("basicAuthHeader", "Basic " + window.btoa(USER.name + ":" + pass));
                            Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].reset();
                            Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].reset();
                            this.doList('familyList');
                            Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
                        } else {
                            localStorage.removeItem("basicAuthHeader");
                            Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].reset();
                            Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].reset();
                            Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.tryAgainError'))
                        }
                    },
                    failure: function () {
                        CONNECTED = false;
                        // hash user/pass
                        var hashPass = 'Basic ' + window.btoa(USER.name + ":" + pass);
                        var hashStored = localStorage.getItem('basicAuthHeader');
                        // compare hashPass to hashStored
                        if (hashPass === hashStored) {
                            Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].reset();
                            Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].reset();
                            this.doList('familyList');
                            Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
                        } else {
                            Ext.ComponentQuery.query('LoginScreen #usernameIID')[1].reset();
                            Ext.ComponentQuery.query('LoginScreen #passwordIID')[1].reset();
                            Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.error'), Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.tryAgainError'))
                        }
                    }
                })
            }
        } else {
            // exit the program
            this.doExit();
        }
    },
    doList: function (arg) {
        if (arg==='familyList') {
            // set up store for list organized by family
            var fstore = Ext.getStore('families');
            if (!fstore) {
                Ext.create('chw.store.families')
            }
            fstore.load();
            Ext.getCmp('familyLists').setStore(fstore)
            // set up store for list organized by illness
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
            // console.log(active.id);
            if (active.getActiveItem()===PAGES.loginScreen) {
                this.doLogin(arg);
            } else if (active.id==='ext-panel-5'){ //add a Family
                this.doAdd('family', arg);
            } else if (active.id==='ext-familyDetails-1'){ //Go to adding patient page. Here the family name and family id is being forwarded
                Ext.ComponentQuery.query('AddPatient #familyField')[0].setValue(Ext.ComponentQuery.query('familyDetails #familyTitle')[0].getTitle());
                Ext.ComponentQuery.query('AddPatient #familyId')[0].setValue(Ext.ComponentQuery.query('familyDetails #familyIdLabel')[0].getValue())
                Ext.getCmp('viewPort').setActiveItem(PAGES.addPatient);
            } else if (active.id==='ext-AddPatient-1'){ //Add a patient
                this.doAdd('patient', arg);
            } else if (active.id==='ext-addIllness-1'){
                this.doAdd('illness', arg)
            }
        }
    }, 
    doToolbar: function (arg) {
        if (arg==='add') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.addFamily)
        } else if (arg==='sync') {
            Ext.Msg.confirm('',Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.sync'), function (resp) {
                if (resp==='yes') {}
            })
        } else if (arg==='inventory') {
            // TODO: why doesn't the list load?
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
            Ext.getCmp('viewPort').setActiveItem(PAGES.resourceList)
        }
    }
})
