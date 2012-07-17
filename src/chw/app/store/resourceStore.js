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
Ext.define('chw.store.resourceStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'chw.model.resourceModel',
        id: 'resourceStore',
        sorters: 'resourceName',
        grouper: function (record) {
            return record.get('resourceName')[0];
        },
        data: [{
            resourceType: 'photo',
            resourceName: 'Sharing',
            resourceLocation: 'sharing.png'
        }, {
            resourceType: 'photo',
            resourceName: 'Spider Bites',
            resourceLocation: 'spider.png'
        }, {
            resourceType: 'photo',
            resourceName: 'Wash Your Hands',
            resourceLocation: 'freeride.png'
        }, {
            resourceType: 'photo',
            resourceName: 'Cover Your Cough',
            resourceLocation: 'cough.png'
        }, {
            resourceType: 'video',
            resourceName: 'Hands Together',
            resourceLocation: 'handwash.webm'
        }, {
            resourceType: 'audio',
            resourceName: 'H1N1',
            resourceLocation: 'h1n1.mp3'
        }, {
            resourceType: 'audio',
            resourceName: 'HIV Testing',
            resourceLocation: 'hiv.mp3'
        }, /*{
            resourceType: 'video',
            resourceName: 'AIDS Awareness, Cricket',
            resourceLocation: 'aids_cricket.ram'
        }, {
            resourceType: 'video',
            resourceName: 'AIDS Awareness, Mother',
            resourceLocation: 'aids_mom.ram'
        }, {
            resourceType: 'video',
            resourceName: 'Polio, Part 1',
            resourceLocation: 'polio_erad1.ram'
        }, {
            resourceType: 'video',
            resourceName: 'Polio, Part 2',
            resourceLocation: 'polio_erad2.ram'
        }, {
            resourceType: 'video',
            resourceName: 'Polio, Part 3',
            resourceLocation: 'polio_erad3.ram'
        }, {
            resourceType: 'video',
            resourceName: 'Vitamin A, Part 2',
            resourceLocation: 'vita2.ram'
        }, {
            resourceType: 'video',
            resourceName: 'Vitamin A, Part 2',
            resourceLocation: 'vita1.ram'
        }, {
            resourceType: 'video',
            resourceName: 'Vitamin A, Part 3',
            resourceLocation: 'vita3.ram'
        }*/]
    }
})