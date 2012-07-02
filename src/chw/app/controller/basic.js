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

Ext.define('mUserStories.controller.basic',{
    extend:'Ext.app.Controller',
    controllers:['basic'],
    views:['loginScreen','confirmLocation','patientList','patientDetails','vcNotifications','vcScheduling'],
    config:{
        refs:{
            cancel_loc:'#cancel_loc',
            cancel_login:'#cancel_login',
            cancel_reg:'#cancel_reg',
            cancel_rem:'#cancel_rem',
            back_add:'#back_add',
            back_det:'#back_det',
            back_inb:'#back_inb',
            back_res:'#back_res',
            downButton:'#downButton',
            inboxButton:'#inboxButton',
            logoutButton:'#logoutButton',
            logoutButton_vc:'#logoutButton_vc',
            menuButton:'#menuButton',
            notButton:'#notButton',
            ok_loc:'#ok_loc',
            ok_login:'#ok_login',
            ok_reg:"#ok_reg",
            ok_rem:'#ok_rem',
            resourcesButton:'#resourcesButton',
            schButton:'#schButton',
            upButton:'#upButton'
        },
        control:{
            back_add:{
                tap:function(){
                    this.doBack()
                }
            },back_det:{
                tap:function(){
                    this.doBack()
                }
            },back_inb:{
                tap:function(){
                    this.doBack()
                }
            },back_res:{
                tap:function(){
                    this.doBack()
                }
            },cancel_loc:{
                tap:function(){
                    this.doLocation(false)
                }
            },cancel_login:{
                tap:function(){
                    this.doLogin(false)
                }
            },cancel_reg:{
                tap:function(){
                    this.doAdd('register',false)
                }
            },cancel_rem:{
                tap:function(){
                    this.doAdd('reminder',false)
                }
            },downButton:{
                tap:function(){
                    this.doToolbar('down')
                }
            },inboxButton:{
                tap:function(){
                    this.doToolbar('inbox')
                }
            },logoutButton:{
                tap:function(){
                    this.doExit()
                }
            },logoutButton_vc:{
                tap:function(){
                    this.doExit()
                }
            },menuButton:{
                tap:function(){
                    this.doToolbar('menu')
                }
            },notButton:{
                tap:function(){
                    this.doToolbar('not')
                }
            },ok_loc:{
                tap:function(){
                    this.doLocation(true)
                }
            },ok_login:{
                tap:function(){
                    this.doLogin(true)
                }
            },ok_reg:{
                tap:function(){
                    this.doAdd('register',true)
                }
            },ok_rem:{
                tap:function(){
                    this.doAdd('reminder',true)
                }
            },resourcesButton:{
                tap:function(){
                    this.doToolbar('resources')
                }
            },schButton:{
                tap:function(){
                    this.doToolbar('sch')
                }
            },
            upButton:{
                tap:function(){
                    this.doToolbar('up')
                }
            }
        }
    },
    launch:function(){
        Ext.create('Ext.Container',{
            id:'viewPort',
            fullscreen:true,
            layout:'card',
            items:[{
                // log into application
                xclass:'mUserStories.view.loginScreen'
            },{
                // daily checkin
                xclass:'mUserStories.view.confirmLocation'
            },{
                // display a list of patients
                xclass:'mUserStories.view.patientList'
            },{
                // display details of patient
                xclass:'mUserStories.view.patientDetails'
            },{
                // display options for adding
                xclass:'mUserStories.view.addOptions'
            },{
                // display inbox/outbox
                xclass:'mUserStories.view.notificationInbox'
            },{
                xclass:'mUserStories.view.resources'
            },{
                xclass:'mUserStories.view.vcNotifications'
            },{
                xclass:'mUserStories.view.vcScheduling'
            }]
        })
    },
/* SCREEN FUNCTIONS */
    // add registrations and reminders
    // TODO: should we add more functionality? ex. place order for sample
    doAdd:function(step,arg){
        if(arg){
            if(step==='register'){
                // var id = Ext.getCmp('id_reg').getValue();
                var fname = Ext.getCmp('first_reg').getValue();
                var lname = Ext.getCmp('last_reg').getValue();
                var phone = Ext.getCmp('phone_reg').getValue();
                var village = Ext.getCmp('village_reg').getValue();
                var radioform = Ext.getCmp('reg_form');
                var gender = radioform.getValues().radiogroup.charAt(0);
                var bday = Ext.getCmp('bday').getValue();
                
                if(fname=='' || lname=='' || phone=='' || village=='' || gender=='' || bday==''){
                    Ext.Msg.alert("Error","Please fill in all fields")
                }else{
                    var up_store=Ext.create('mUserStories.store.upPersonStore');
                    var up_Model = Ext.create('mUserStories.model.upPersonModel',{
                        names:[{
                            givenName:fname,
                            familyName:lname
                        }],
                        gender:gender,
                        birthdate:bday,
                        addresses:[{
                            cityVillage:village
                        }]
                    });
                    //Adding registration details into local storage (a store)
                    up_store.add(up_Model);
                    //REST call for creating a Person
                    up_store.sync();
                    up_store.on('write',function(){
                        console.log('Stored locally, calling identifier type');
                        // Now that Person is created, send request to create Patient
                        this.getidentifierstype(up_store.getAt(0).getData().uuid)
                    },this)
                }
            }else if(step==='reminder'){
            // TODO: validate all fields
            // TODO: add 'other' option
            }
        }else{
            // TODO: doReturn()
            this.doDownload();
            Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
        }
    },
    // allow chw to check in
    doLocation:function(arg){
        if(arg){
            // TODO: generate close locations based on USER
            LOCATION=Ext.getCmp('location').getValue();
            if (LOCATION==='empty'){
                Ext.Msg.alert("",'Please fill in the form')
            }else{
                if(LOCATION==="otherlocation"){
                    Ext.Msg.prompt("","Please enter other location:",function(btn,text){
                        if(btn==='ok'){
                            LOCATION=text;
                        }
                    })
                }
                // TODO: pass LOCATION & CURR_DATE to manager
                // download all data into local storage
                this.doDownload();
                // continue to the next screen
                Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
            }
        }else{
            // exit the program
            this.doExit();
        }
    },
    // login to the application
    doLogin:function(arg){
        if(arg){
            // store items
            USER.name=Ext.getCmp('username').getValue();
            var pass=Ext.getCmp('password').getValue();
            if(USER.name==''||pass==''){
                Ext.Msg.alert("Error","Please fill in all fields")
            }else{
                //this.saveBasicAuthHeader(USER.name,pass);
                helper.loginContinue();
            }
        }else{
            // exit the program
            this.doExit();
        }
    },   
    // manage navigation based on lower toolbar
    doToolbar:function(arg){
        if(arg==='menu'){
            Ext.getCmp('viewPort').setActiveItem(PAGES.ADD)
        }else if(arg==='up'){
            Ext.Msg.confirm('','Upload all information?',function(resp){
                if(resp==='yes'){
                    // upload information in localStorage
                    this.doUpload();
                }
            })
        }else if(arg==='down'){
            Ext.Msg.confirm('','Download all information?',function(resp){
                if(resp==='yes'){
                    // TODO: check for conflicts
                    // doDownload information in localStorage
                    this.doDownload();
                }
            })
        }else if(arg==='inbox'){
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_CHW)
        }else if(arg==='resources'){
            Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCES)
        }else if(arg==='not'){
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_VC)
        }else if(arg==='sch'){
            Ext.getCmp('viewPort').setActiveItem(PAGES.SCHEDULING)
        }
    },
/* HELPER FUNCTIONS */  
    // deal with backbutton
    doBack:function(){
        // TODO: Best logic for returning to previous page - doReturn()
        // Hard coded in? Create a list of visited pages?
        this.doDownload();
        Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
    },
    // Download patient with details
    doDownload:function(){
        var down_store=Ext.create('mUserStories.store.downStore');
        down_store.load();
        Ext.getCmp('patientlistid').setStore(down_store);
    // TODO: set patientcurrid to be subset of above organized by appt time
    // Do we need a separate store for this?
    },
    // exit the program
    doExit:function(){
        // TODO: make sure all information is uploaded
        // TODO: delete/save necessary information
        Ext.getCmp('location').reset();
        // return to login screen
        Ext.getCmp('viewPort').setActiveItem(PAGES.LOGIN_SCREEN)
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
    getPatientIdentifier : function(){
        //dummy funtion to be used for creating partient
        // TODO: writen a  ramdom no for patient identufier but it should be a unique id
        return Math.floor(Math.random() * 1000000000);
    },
    isEmpty:function(arg){
        // TODO: check to see if the select field is empty
        // TODO: continue to arg if not empty
    },
    isOther:function(arg){
        // TODO: check to see if the select field is other
        // TODO: pop up screen prompt
        // TODO: continue to arg 
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
        PatientStore.on('write',function(){
            console.log('------Patient Created successfully------');
        },this) ;
        
        Ext.getCmp('first_reg').reset();
        Ext.getCmp('last_reg').reset();
        Ext.getCmp('phone_reg').reset();
        Ext.getCmp('village_reg').reset();
        Ext.getCmp('bday').reset();
        Ext.getCmp('reg_form').reset();
        this.doDownload();
        Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
    },
    saveBasicAuthHeader:function(username,password){
        // delete existing logged in sessions
        Ext.Ajax.request({
            url:MRSHOST+'/ws/rest/v1/session',
            withCredentials:true,
            useDefaultXhrHeader:false,
            method:'DELETE',
            success:function(){}
        })
        // check login and save to localStorage if valid
        Ext.Ajax.request({
            url:MRSHOST+'/ws/rest/v1/session',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + window.btoa(username + ":" + password)
            },
            success: function (response) {
                CONNECTED=true;
                var authenticated = Ext.decode(response.responseText).authenticated;
                if (authenticated) {
                    localStorage.setItem("basicAuthHeader", "Basic " + window.btoa(username + ":" + password));
                    helper.loginContinue();
                } else {
                    localStorage.removeItem("basicAuthHeader");
                    Ext.Msg.alert("Error","Please try again")
                }
            },
            failure:function(response){
                CONNECTED=false;
                // hash user/pass
                var hashPass='Basic ' + window.btoa(username+":"+password);
                var hashStored=localStorage.getItem('basicAuthHeader');
                // compare hashPass to hashStored
                if(hashPass===hashStored){
                    helper.loginContinue();
                }else{
                    Ext.Msg.alert("Error","Please try again")
                }
            }
        })
    }
})