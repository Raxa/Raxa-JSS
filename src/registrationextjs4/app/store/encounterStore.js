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

//the store for an encounter. Sends all filled fields to the server
Ext.define('Registration.store.encounterStore', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.encounterModel',
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
        // TODO: Move this to controller. View updating logic should happen in
        // the controller, not in the model
        afterRequest:function(request,success){         //prints if request is successful
            /*var l = Ext.getCmp('mainRegArea').getLayout();*/
            /*l.setActiveItem(REG_PAGES.HOME.value);*/
            /*Ext.getCmp('heightIDcm').reset();*/
            /*Ext.getCmp('weightIDkg').reset();*/
            /*Ext.getCmp('bmiNumberfieldID').reset();*/
        }
    }
});
