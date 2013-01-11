/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

Ext.define("RaxaEmr.Admin.controller.Application",{
    views: [
    'RaxaEmr.Admin.view.ProviderView', 
    'RaxaEmr.Admin.view.LocationView', 
    'RaxaEmr.Admin.view.NewProvider',
    'RaxaEmr.Admin.view.Main',
    'RaxaEmr.Admin.view.Main.AddLocation'
    ],
    stores: [
    'RaxaEmr.Admin.store.Providers',
    'RaxaEmr.Admin.store.Locations',
    ],
    models: [
    'RaxaEmr.Admin.model.Provider', 
    'RaxaEmr.Admin.model.Names', 
    'RaxaEmr.Admin.model.Person', 
    'RaxaEmr.Admin.model.Location',
    'RaxaEmr.Admin.model.ProviderAttribute'
    ],
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            mainView: 'mainView',
            newProvider: '#newProvider',
            manageProvidersButton: '#manageProvidersButton',
            manageLocationsButton: '#manageLocationsButton',
            saveProviderButton:'#saveProviderButton',
            newLocation: '#newLocation',
            password: '#password',
            confirmPassword: '#confirmPassword',
            hosChecked: '#hosChecked',
            hosUnChecked: '#hosUnChecked',
            saveLocationButton: '#saveLocationButton'
        },
        // Now we define all our listening methods
        control: {
            manageProvidersButton: {
                tap: 'manageProviders'
            },
            password: {
                change: 'validatePassword'  
            },
            confirmPassword: {
                change: 'validateConfirmPassword'
            },
            manageLocationsButton: {
                tap: 'manageLocations'
            },
            newProvider: {
                tap: 'addProvider'
            },
            saveProviderButton: {
                tap: 'saveProviderButton'
            },
            newLocation: {
                tap: 'addLocation'
            },
            saveLocationButton: {
                tap: 'saveLocationButton'
            },
            hosChecked: {
                check : 'hospitalChecked'
            },
            hosUnChecked: {
                check : 'hospitalUnChecked'
            }
        }
    },
    
    saveLocationButton: function() {
        var formp = Ext.getCmp('addLocation').saveForm();
        var hosChecked = Ext.getCmp('hosChecked');
        var parentLocationUuid = "" ;
        var identifier;
        var tagName ;
        // if(hosChecked._checked == true) {
        if(formp.hospital == 'Y') {
            tagName = "isHospital";
            identifier = Ext.getCmp('identifier')._value
        } else {  
            console.log("inside else");
            parentLocationUuid = Ext.getCmp('parentLocation')._value.data.uuid
            console.log(parentLocationUuid)
        }
        //var pharmacyTag = Ext.getCmp('pharmacy')
        // if(pharmacyTag._checked == true) {
        if(formp.pharmacy == "pharmacy") {
            tagName = "canHaveDrugs";
        }
        //var labTag = Ext.getCmp('laboratory')
        //if(labTag._checked == true) {
        if(formp.laboratory == "laboratory") {
            tagName = "Lab";
        }
        console.log("inside save location button");
        //console.log(tagName);
        if (formp.addLocationField ) {
            var addLocation = {
                name: formp.addLocationField,
                tags:[{
                    name: tagName
                }]
            //  parentLocation: parentLocationUuid
            //                attributes: [{
            //                    value: identifier,     
            //                    attributeType: 'd9812099-e958-4046-a573-7976746d0ba2'
            //                }]
            };
            // addLocation.
            //add
            if(parentLocationUuid !== "") {
                console.log("inside if");
                console.log(parentLocationUuid);
                addLocation.parentLocation = parentLocationUuid
            }
            var addLocationParam = Ext.encode(addLocation);
            Ext.Ajax.request({
                scope:this,
                url: HOST + '/ws/rest/v1/location',
                method: 'POST',
                params: addLocationParam,
                disableCaching: false,
                headers: Util.getBasicAuthHeaders(),
                success: function (response) {
                    Ext.getStore('Locations').load();
                //       this.saveLocationTags();
                },
                failure: function (response) {
                    Ext.Msg.alert('Error: unable to write to server. Enter all fields.')
                }
            });
            Ext.getCmp('addLocation').hide();
        }
        else {
            Ext.Msg.alert ("Error","Please Enter all the mandatory fields");
        }
    },
    
    saveLocationTags: function() {
        var tagName = "Hspital" ;
        var addLocationTag = {
            // name: formp.addLocationField, 
            //tags:[{
            name : tagName      
        //}]
        //parentLocation: parentLocationUuid
        };    
        var addLocationTagParam = Ext.encode(addLocationTag);
        Ext.Ajax.request({
            scope:this,
            url: HOST + '/ws/rest/v1/locationtag',
            method: 'POST',
            params: addLocationTagParam,
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            success: function (response) {
                console.log("inside success");
            //Ext.getStore('Locations').load();
            //this.saveLocationTags();
            },
            failure: function (response) {
                Ext.Msg.alert('Error: unable to write to server. Enter all fields.')
            }
        });
    //Ext.getCmp('addLocation').hide();
    },

    //},
    
    saveProviderButton: function() {
        var formp = Ext.getCmp('newProviderId').saveForm();
        if (formp.givenname && formp.familyname && formp.choice && formp.userName && formp.password && formp.location && formp.boolChoice) {
            var newUser = {
                gender : formp.choice,
                firstName: formp.givenname,
                lastName: formp.familyname,
                location: formp.location,
                userName: formp.userName,
                password: formp.password,
                type: "provider"
            };
            if(formp.boolChoice) {
                newUser.isOutpatientDoctor = "true";
            }
            var newUserParam = Ext.encode(newUser);
            console.log("new user param");
            console.log(newUserParam);
            Ext.Ajax.request({
                scope:this,
                url: HOST + '/ws/rest/v1/raxacore/user',
                method: 'POST',
                params: newUserParam,
                disableCaching: false,
                headers: Util.getNewAccountAuthHeaders(),
                success: function (response) {
                    Ext.Msg.alert("Successful", "Provider is been successfully created.");
                },
                failure: function (response) {
                    var errorJson = Ext.decode(response.responseText);
                    var message = errorJson.error.detail.toString().split(":")[1]
                    Ext.Msg.alert('Error '+message);
                }
            });
        }
        else {
            Ext.Msg.alert ("Error","Please Enter all the mandatory fields");
        }
    },
    
    validatePassword : function(newPaswrd , confirmPaswrd) {
        // var minPswrdLength = 0;
        var newPassword = Ext.getCmp('password')._value;
        var minPswrdLength = 8;
        if(newPassword.length > 0) {
            if(newPassword.length < minPswrdLength) {
                Ext.getCmp('password').reset();
                Ext.Msg.alert('Error', 'Password must be eight characters in length.');
            }
            var re = {
                lower:   /[a-z]/g,
                upper:   /[A-Z]/g,
                numeric: /[0-9]/g
            }
            for (var rule in re) {
                console.log((newPassword.match(re[rule]) || []).length)
                if(((newPassword.match(re[rule]) || []).length) <= 0) {
                    Ext.getCmp('password').reset();
                    Ext.Msg.alert('Error', 'Password must contain atleast one lower ,uppper case and numeric');
                }        
            }
        }
    },
    
    validateConfirmPassword : function() {
        var newPassword = Ext.getCmp('password')._value;
        var confirmPassword = Ext.getCmp('confirmPassword')._value;
        if(confirmPassword.length > 0) {
            if( newPassword !== confirmPassword ) {
                Ext.getCmp('confirmPassword').reset();
                Ext.Msg.alert('Error', 'Confirm password is not same as new Password');
            }
        }
    },
    
    //    FOR cHECKING IF USER NAME EXIST OR NOT
    //    
    //    isUserNameExist : function(userName) {
    //        console.log("inside userNameExist");
    //        var formp = Ext.getCmp('newProviderId').saveForm();
    //        var newUser = {
    //            username : formp.userName
    //        //  password : formp.password,
    //        //  person   : personUuid
    //        };
    //        var newUserParam = Ext.encode(newUser);
    //        Ext.Ajax.request({
    //            scope:this,
    //            url : HOST + '/ws/rest/v1/user?q='+userName,
    //            method: 'GET',
    //            //params: newUserParam,
    //            disableCaching: false,
    //            headers: Util.getBasicAuthHeaders(),
    //            success: function (response) {
    //                console.log("inside success 4");
    //                //console.log(response);
    //                return true;
    //            //this.saveProvider(personUuid ,formp.boolChoice );
    //            },
    //            failure: function (response) {
    //                //console.log(response);
    //                console.log("inside failure 4");
    //                return false;
    //            //Ext.Msg.alert('Error: unable to write to server. Enter all fields.')
    //            //Ext.Msg.alert('UserName already Exist')    
    //            }
    //        });
    //        
    //    },
    
    //For saving provider Attribute
    saveProvAttribute : function(personUuid) {
        var formp = Ext.getCmp('newProviderId').saveForm();
        var providerAttribute = {
            value : formp.boolChoice,
            attributeType : 'a9f27997-1b3a-4197-bcbc-6d869bd7698a'
        };
        var providerAttributeParam = Ext.encode(providerAttribute);
        Ext.Ajax.request({
            scope:this,
            url: HOST + '/ws/rest/v1/provider/' +personUuid+ '/attribute',
            method: 'POST',
            params: providerAttributeParam,
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            success: function (response) {
                console.log(response);
                console.log("inside success Of provider attribute");
            },
            failure: function (response) {
                Ext.Msg.alert('Error: unable to write to server. Enter all fields.')
            }
        });
    },

    // Opens form for creating new provider
    addProvider: function () {
        if (!this.newProvider) {
            this.newProvider = Ext.create('RaxaEmr.Admin.view.NewProvider');
            Ext.Viewport.add(this.newProvider);
        }
        this.newProvider.show();
    },
    
    addLocation: function() {
        if (!this.newLocation) {
            this.newLocation = Ext.create('RaxaEmr.Admin.view.AddLocation');
            Ext.Viewport.add(this.newLocation);
        }
        this.newLocation.show();
    },
    
    // Get Location using Location store
    getlocation: function (personUuid, identifierType) {
        var locations = Ext.create('RaxaEmr.Admin.store.Locations')
        locations.load({
            scope: this,
            callback: function(records, operation, success){
                if(success){
                    this.makePatient(personUuid,identifierType,locations.getAt(0).getData().uuid)
                }
                else{
                    Ext.Msg.alert("Error", Util.getMessageLoadError());
                }
            }
        });
    },
    // Creates a new patient using NewPatients store 
    makePatient: function (personUuid, identifierType, location) {
        var patient = Ext.create('RaxaEmr.Admin.model.NewPatient', {
            person: personUuid,
            identifiers: [{
                identifier: Util.getPatientIdentifier().toString(),
                identifierType: identifierType,
                location: location,
                preferred: true
            }]
        });
        var PatientStore = Ext.create('RaxaEmr.Admin.store.NewPatients')
        PatientStore.add(patient);
        PatientStore.sync();
        PatientStore.on('write', function () {
            // TODO: https://raxaemr.atlassian.net/browse/TODO-67
            // Need to add location to OpenMRS for screenerUuidlocation
            this.sendEncounterData(personUuid, localStorage.regUuidencountertype, localStorage.screenerUuidlocation, localStorage.loggedInUser)
        }, this)
    },
    
    manageLocations: function() {
        if (!this.locationView) {
            this.locationView = Ext.create('RaxaEmr.Admin.view.LocationView');
            Ext.Viewport.add(this.locationView);
        }
        this.locationView.show();
    },
    
    manageProviders: function() {
        if (!this.providerView) {
            this.providerView = Ext.create('RaxaEmr.Admin.view.ProviderView');
            Ext.Viewport.add(this.providerView);
        }
        this.providerView.show();
    },

    hospitalChecked : function() {
        var identifier = Ext.getCmp('identifier')
        var ideConfig = identifier.config;
        identifier.setConfig({
            hidden : false
        })
        var parentLoc = Ext.getCmp('parentLocation')
        var parLocConfig = parentLoc.config;
        parentLoc.setConfig({
            hidden : true
        })
    },
      
    hospitalUnChecked : function() {
        var identifier = Ext.getCmp('identifier')
        var ideConfig = identifier.config;
        identifier.setConfig({
            hidden : true
        })
        var parentLoc = Ext.getCmp('parentLocation')
        var parLocConfig = parentLoc.config;
        parentLoc.setConfig ({
            hidden : false
        })
    }
});