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
Ext.define('chw.store.pills', {
    extend: 'Ext.data.Store',
    config: {
        model: 'chw.model.pill',
        id: 'pills',
        sorters: 'pillName',
        grouper: function (record) {
            return record.get('pillName')[0];
        },
        proxy: {
            type: 'localStorage',
            id: 'inventoryList'
        },
        data: [{
            pillName: 'Medicine #1',
            pillDescrip: 'What the medicine is used for',
            pillFrequency: 'How often it is taken',
            pillNotes: 'Any additional instructions',
            pillAmount: 100,
            pillImage: 'resources/circle.png'
        }, {
            pillName: 'Medicine #2',
            pillDescrip: 'What the medicine is used for',
            pillFrequency: 'How often it is taken',
            pillNotes: 'Any additional instructions',
            pillAmount: 100,
            pillImage: 'resources/circle.png'
        }, {
            pillName: 'Medicine #3',
            pillDescrip: 'What the medicine is used for',
            pillFrequency: 'How often it is taken',
            pillNotes: 'Any additional instructions',
            pillAmount: 100,
            pillImage: 'resources/circle.png'
        }, {
            pillName: 'Medicine #4',
            pillDescrip: 'What the medicine is used for',
            pillFrequency: 'How often it is taken',
            pillNotes: 'Any additional instructions',
            pillAmount: 100,
            pillImage: 'resources/circle.png'
        }, {
            pillName: 'Medicine #5',
            pillDescrip: 'What the medicine is used for',
            pillFrequency: 'How often it is taken',
            pillNotes: 'Any additional instructions',
            pillAmount: 100,
            pillImage: 'resources/circle.png'
        }]
    }
})