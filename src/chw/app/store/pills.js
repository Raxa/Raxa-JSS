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

//Pills store. Pills are hard-coded currently
Ext.define('chw.store.pills', {
    extend: 'Ext.data.Store',
    config: {
        model: 'chw.model.pill',
        id: 'pills',
        sorters: 'pillName',
        grouper: function (record) {
            return record.get('pillName')[0];
        }, 
        data: [{
            pillName: 'Ciprofloxacin',
            pillDescrip: 'Antibiotic for bowel issues',
            pillFrequency: 'Take on onset of symptoms',
            pillNotes: 'Not necessary to complete cycle',
            pillAmount: 97,
            pillImage: 'resources/ciprofloxacin.png',
            pillMin: 100,
            pillColor: 'red'
        }, {
            pillName: 'Paracetamol',
            pillDescrip: 'Pain reliever and fever reducer',
            pillFrequency: 'Use only when needed',
            pillNotes: 'Acute overdose can cause liver damage',
            pillAmount: 563,
            pillImage: 'resources/paracetamol.png',
            pillMin: 100,
            pillColor: 'black'
        }, {
            pillName: 'Malarone',
            pillDescrip: 'Malaria prevention and treatment',
            pillFrequency: 'Once a day',
            pillNotes: 'Take with food',
            pillAmount: 212,
            pillImage: 'resources/malarone.png',
            pillMin: 100,
            pillColor: 'black'
        }]
    }
})