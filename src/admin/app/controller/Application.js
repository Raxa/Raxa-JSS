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

Ext.define("RaxaEmr.Admin.controller.Application", {
    views: [
    'RaxaEmr.Admin.view.ProviderView', 
    'RaxaEmr.Admin.view.LocationView', 
//    'RaxaEmr.Admin.view.NewProvider',
    'RaxaEmr.Admin.view.Main',
    ],
    stores: [
    'RaxaEmr.Admin.store.Providers',
    'RaxaEmr.Admin.store.Locations',
//    'RaxaEmr.Admin.store.NewPersons',
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
//            providerView: 'providerView',
//            doctorSummary: 'doctorSummary',
//            newProvider: 'newProvider',
//            addProviderButton: 'providerView #addProviderButton',
            manageProvidersButton: '#manageProvidersButton',
            manageLocationsButton: '#manageLocationsButton'
        },
        // Now we define all our listening methods
        control: {
            manageProvidersButton: {
                tap: 'manageProviders'
            },
            manageLocationsButton: {
                tap: 'manageLocations'
            },
        }
    },

    // Opens form for creating new provider
    addProvider: function () {
        if (!this.newProvider) {
            this.newProvider = Ext.create('RaxaEmr.Admin.view.NewProvider');
            Ext.Viewport.add(this.newProvider);
        }
        this.newProvider.show();
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
    }

});
