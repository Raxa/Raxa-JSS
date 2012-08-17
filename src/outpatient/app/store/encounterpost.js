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
 * 
 * This script initiates the registration module
 */



//the store for an encounter. Sends all filledd fields to the server

Ext.define('RaxaEmr.Outpatient.store.encounterpost', {
    extend: 'Ext.data.Store',
    config:{
        model: 'RaxaEmr.Outpatient.model.encounterpost',
        proxy: {
            type: 'rest',
            url : HOST + '/ws/rest/v1/encounter',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json'
            },
            writer: {
                type: 'json'
            }, 
            afterRequest:function(request,success){         //prints if request is successful
                alert('Encounter saved successfully.');
            }
        }
    }
});