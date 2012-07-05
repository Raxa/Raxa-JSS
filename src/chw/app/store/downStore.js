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
/*
 * Store used for data while downloading patient details
 */
Ext.define('mUserStories.store.downStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'mUserStories.model.downModel',
        id: 'downStore',
        sorters: 'familyName',
        grouper: function (record) {
            return record.get('familyName')[0];
        },
        proxy: {
            type: 'rest',
            //Hard-coding the host URL searching for patient name 'john'
            // TODO: check out cohort class in OpenMRS
            url: MRSHOST + '/ws/rest/v1/patient?q=john&v=full',
            headers: HEADERS,
            reader: {
                type: 'json',
                rootProperty: 'results'
            },
            //If we are unable to connect to the internet, this exception will be raised.
            listeners: {
                exception:function () {
                    //So now we know we are offline.
                    console.log("We are offline");
                    CONNECTED = false;
                    
                    //We get the offline store and load it from local storage.
                    var offlineStore=Ext.getStore('offlineStore');
                    offlineStore.load();
                    //And fill the list with this store. This is the end of the scenario when we are offline.
                    Ext.getCmp('patientlistid').setStore(offlineStore);
                }
            }
        }
    }
})