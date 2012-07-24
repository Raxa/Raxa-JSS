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
/* model for body of post call for creating the patient */
Ext.define('mUserStories.model.postPatient', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [{
            name: 'id',
            persist: false
        }, {
            name: 'person',
            type: 'string'
        }, {
            name: 'identifiers',
            model: 'mUserStories.model.identifier'
        }]
    }
});