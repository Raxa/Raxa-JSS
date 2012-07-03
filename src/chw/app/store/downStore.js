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
        id: 'searchpatient',
        sorters: 'familyName',
        grouper: function (record) {
            return record.get('familyName')[0];
        },
        proxy: {
            type: 'rest',
            //Hard-coding the host URL searching for patient name 'alok'
            url: MRSHOST + '/ws/rest/v1/patient?q=potter&v=full',
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
})