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
Ext.define('chw.store.patients', {
    extend: 'Ext.data.Store',
    config: {
        model: 'chw.model.patient',
        id: 'patientStore',
        sorters: 'familyName',
        grouper: function (record) {
            return record.get('familyName')[0];
        },
        data: [{
            firstName: 'Ronak',
            familyName: 'Patel',
            familyId: '003',
            patientAge: 20,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
        // patientIllnesses: ''
        },{
            firstName: 'Vishesh',
            familyName: 'Patel',
            familyId: '003',
            patientAge: 20,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
        // patientIllnesses: ''
        },{
            firstName: 'Jignesh',
            familyName: 'Patel',
            familyId: '003',
            patientAge: 20,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
        // patientIllnesses: ''
        },{
            firstName: 'Ishaan',
            familyName: 'Desai',
            familyId: '001',
            patientAge: 19,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
        // patientIllnesses: ''
        },{
            firstName: 'Isha',
            familyName: 'Desai',
            familyId: '001',
            patientAge: 21,
            patientGender: 'Female',
            patientImage: 'resources/user.png'
        // patientIllnesses: ''
        },{
            firstName: 'Ashish',
            familyName: 'Eppanapally',
            familyId: '002',
            patientAge: 20,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        },{
            firstName: 'Pranav',
            familyName: 'Vaidya',
            familyId: '004',
            patientAge: 20,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        },{
            firstName: 'Girish',
            familyName: 'Vaidya',
            familyId: '004',
            patientAge: 20,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        },{
            firstName: 'Vijay',
            familyName: 'Sharma',
            familyId: '005',
            patientAge: 20,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        },{
            firstName: 'Ashsish',
            familyName: 'Sharma',
            familyId: '005',
            patientAge: 20,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        }, {
            firstName: 'Pooja',
            familyName: 'Eppanapally',
            familyId: '002',
            patientAge: 19,
            patientGender: 'Female',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        }, {
            firstName: 'Bansi',
            familyName: 'Patel',
            familyId: '003',
            patientAge: 20,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        }, {
            firstName: 'Udayan',
            familyName: 'Vaidya',
            familyId: '004',
            patientAge: 21,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        }, {
            firstName: 'Pulak',
            familyName: 'Mital',
            familyId: '006',
            patientAge: 19,
            patientGender: 'Male',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        }, {
            firstName: 'Priya',
            familyName: 'Mital',
            familyId: '006',
            patientAge: 38,
            patientGender: 'Female',
            patientImage: 'resources/user.png'
            // patientIllnesses: ''
        }]
    }
})