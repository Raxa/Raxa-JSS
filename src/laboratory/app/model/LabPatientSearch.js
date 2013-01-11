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
 * This file is model for labPatientSearch 
 */
Ext.define('Laboratory.model.LabPatientSearch', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'PatientUuid',
        type: 'string',
        mapping: 'uuid'
    },{
    	name: 'PatientName',
    	type: 'string',
    	mapping: 'person.display'
   },{
        name: 'FirstName',
        type: 'string',
        mapping: 'person.preferredName.givenName'
    },{
        name: 'LastName',
        type: 'string',
        mapping: 'person.preferredName.familyName'
    },{
        name: 'Sex',
        type: 'string',
        mapping: 'person.gender'
    },{
        name: 'DOB',
        type: 'string',
        mapping: 'person.birthdate'
    },
// Patients created from Registration Module dont have following attributes    
/*    {
        name: 'RelativeName',
        type: 'string',
        persist: false
    },{
        name: 'Village',
        type: 'string',
        mapping: 'preferredAddress.cityVillage', 
        persist: false
    },{
        name: 'Panchayat',
        type: 'string',
        persist : false
    },{
        name: 'Town',
        type: 'string',
        mapping: 'preferredAddress.stateProvince',
        persist: false
    }*/],

});
