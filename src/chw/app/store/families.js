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
Ext.define('chw.store.families', {
    extend: 'Ext.data.Store',
    config: {
        model: 'chw.model.family',
        id: 'families',
        sorters: 'familyDistance',
        grouper: function (record) {
            return record.get('familyDistance');
        },
        data: [{
            familyName: 'Desai',
            familyId: '001',
            familyAddress: 'Desai Place',
            familyLatitude: 25,
            familyLongitude: 25,
            familyImage: 'resources/home.png',
            // familyMembers: 'chw.store.patients',
            familyDistance: 50,
            familyDescrip: 'Pointy roof'
        }, {
            familyName: 'Eppanapally',
            familyId: '002',
            familyAddress: 'Eppanapally Villa',
            familyLatitude: 25,
            familyLongitude: 25,
            familyImage: 'resources/home.png',
            // familyMembers: 'chw.store.patients',
            familyDistance: 20,
            familyDescrip: 'Three stories'
        }, {
            familyName: 'Patel',
            familyId: '003',
            familyAddress: 'Patels Home',
            familyLatitude: 25,
            familyLongitude: 25,
            familyImage: 'resources/home.png',
            // familyMembers: 'chw.store.patients',
            familyDistance: 30,
            familyDescrip: 'Large complex'
        }, {
            familyName: 'Vaidya',
            familyId: '004',
            familyAddress: 'Vaidya Nagar',
            familyLatitude: 25,
            familyLongitude: 25,
            familyImage: 'resources/home.png',
            // familyMembers: 'chw.store.patients',
            familyDistance: 40,
            familyDescrip: 'Near lake'
        }, {
            familyName: 'Mital',
            familyId: '005',
            familyAddress: 'Mital Hauz',
            familyLatitude: 25,
            familyLongitude: 25,
            familyImage: 'resources/home.png',
            // familyMembers: 'chw.store.patients',
            familyDistance: 40,
            familyDescrip: 'On top of a hill'
        }]
    }
})