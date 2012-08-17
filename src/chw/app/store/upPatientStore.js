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
/* store for making the post call to create the patient using patient model */
Ext.define('mUserStories.store.upPatientStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'mUserStories.model.upPatientModel',
        proxy: {

            type: 'rest',
            url: MRSHOST + '/ws/rest/v1/patient',
            headers: {
                "Authorization": localStorage.getItem('basicAuthHeader'),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },

            reader: {
                type: 'json'

            },
            writer: {
                type: 'json'
            }
        }
    }
});