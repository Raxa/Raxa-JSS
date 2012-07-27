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

//Store for illnesses. Illness data are hard-coded currently
Ext.define('chw.store.illnesses', {
    extend: 'Ext.data.Store',
    config: {
        model: 'chw.model.illness',
        id: 'illnesses',
        sorters: 'illnessName',
        grouper: function (record) {
            return record.get('illnessName')[0];
        },
        data: [{
            illnessName: 'Malaria',
            illnessImage: 'resources/malaria.png',
            illnessId: 001
        }, {
            illnessName: 'Antenatal Care',
            illnessImage: 'resources/antenatal.png',
            illnessId: 002
        }, {
            illnessName: 'Dehydration',
            illnessImage: 'resources/dehydration.png',
            illnessId: 003
        }, {
            illnessName: 'Sickle Cell Anemia',
            illnessImage: 'resources/sicklecell.png',
            illnessId: 004
        }, {
            illnessName: 'Diarrhea',
            illnessImage: 'resources/diarrhea.png',
            illnessId: 005
        }]
    }
})