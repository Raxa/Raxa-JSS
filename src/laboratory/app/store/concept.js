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
 *  This file is store for labconcepts (Test Specimens & Tests)
 */
Ext.define('Laboratory.store.concept', {
    extend: 'Ext.data.Store',
    model: 'Laboratory.model.Concept',
    //groupField: 'Specimen',
    proxy: {
        type: 'rest',
        url: '',
        headers: {
            "Accept": "application/json",
            "Authorization": "Basic " + window.btoa("admin:Admin123"),
            "Content-Type": "application/json"
        },
        reader: {
            type: 'json',
            root: 'setMembers'
        }
    },
    autoLoad: true,
})
