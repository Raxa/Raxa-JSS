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
 *//* store for getting the patient identifiersType from the server */
Ext.define('mUserStories.store.identifiersType', {
    extend: 'Ext.data.Store',
    config: {
        fields: [{
            name: 'uuid',
            //contains just one fiels because we only need uuid
            type: 'string'
        }],
        proxy: { //proxy for GET rest call
            type: 'rest',
            url: MRSHOST + '/ws/rest/v1/patientidentifiertype',
            headers: {
                "Authorization": "Basic " + window.btoa("admin" + ":" + "Hello123"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});