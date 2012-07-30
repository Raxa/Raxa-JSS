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

//Storing resources. Also hard-coded
Ext.define('chw.store.resources', {
    extend: 'Ext.data.Store',
    config: {
        model: 'chw.model.resource',
        id: 'resources',
        sorters: 'resourceName',
        grouper: function (record) {
            return record.get('resourceName')[0];
        },
        data: [{
            resourceType: 'photo',
            resourceName: 'Sharing',
            resourceLocation: 'resources/sharing.png'
        }, {
            resourceType: 'photo',
            resourceName: 'Spider Bites',
            resourceLocation: 'resources/spider.png'
        }, {
            resourceType: 'photo',
            resourceName: 'Wash Your Hands',
            resourceLocation: 'resources/freeride.png'
        }, {
            resourceType: 'photo',
            resourceName: 'Cover Your Cough',
            resourceLocation: 'resources/cough.png'
        }, {
            resourceType: 'video',
            resourceName: 'Hands Together',
            resourceLocation: 'resources/handwash.webm'
        }, {
            resourceType: 'audio',
            resourceName: 'H1N1',
            resourceLocation: 'resources/h1n1.mp3'
        }, {
            resourceType: 'audio',
            resourceName: 'HIV Testing',
            resourceLocation: 'resources/hiv.mp3'
        }]
    }
})