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
 * This file is model of laborder which is extended resource of order  
 */
function orderlist(v, record) {
    return record.data.labOrderId + ' ' + record.data.PatientDisplay;
}


Ext.define('Laboratory.model.LabOrderSearch', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'orderlist',
        convert: orderlist
    }, {
        name: 'labOrderId',
        type: 'string',
        mapping: 'labOrderId'
    }, {
        name: 'PatientDisplay',
        type: 'string',
        mapping: 'patient.display'
    }, {
        name: 'PatientUUID',
        type: 'string',
        mapping: 'patient.uuid'
    }]
})
