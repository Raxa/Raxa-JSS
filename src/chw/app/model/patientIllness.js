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

//Model for mapping patients with  illnesses
Ext.define('chw.model.patientIllness', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [{
            name: 'patientId',
            type: 'int'
        }, {
            name: 'patientDetails',
            model: 'chw.model.patient'
        }, {
            name: 'illnessDetails',
            model: 'chw.model.illness'
        }, {
           name: 'illnessId',
           type: 'int'
        }, {
            name: 'illnessStartDate',
            type: 'date'
            // dateFormat: 'g:i a'
        }, {
            name: 'illnessEndDate',
            type: 'date'
            // dateFormat: 'g:i a'
        }, {
            name: 'illnessTreatment',
            type: 'string'
        }, {
            name: 'illnessNotes',
            type: 'string'
        }/*, {
            name: 'illnessIncident',
            type: 'int'
        }*//*, {
            name: 'illnessActive',
            type: 'bool'
        }*/]
    }
})