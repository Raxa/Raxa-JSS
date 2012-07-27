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

//Model for storing inventory details
Ext.define('chw.model.pill', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'pillName',
            type: 'string'
        }, {
            name: 'pillDescrip',
            type: 'string'
        }, {
            name: 'pillFrequency',
            type: 'string'
        }, {
            name: 'pillNotes',
            type: 'string'
        }, {
            name: 'pillAmount',
            type: 'int'
        }, {
            name: 'pillImage',
            type: 'string'
        }, {
            name: 'pillMin',
            type: 'int'
        }, 
        // TODO: make it so not hard coded in
        {
            name: 'pillColor',
            type: 'string'
        }]
    }
})