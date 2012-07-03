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
/* model for identifiers to be used in Patient model */
Ext.define('mUserStories.model.identifiers', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'identifier',
            type: 'string'
        }, {
            name: 'identifierType',
            type: 'string'
        }, {
            name: 'location',
            type: 'string'
        }, {
            name: 'preferred',
            type: 'boolean'
        }]
    }
});