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
Ext.define('chw.store.visits', {
    extend: 'Ext.data.Store',
    config: {
        model: 'chw.model.visit',
        id: 'visStore',
        data: [{
            id: 'vis_ors',
            visitText: 'ORS',
            visitDetail: 'Administer Oral Rehydration Salts',
            visitAudio: 'resources/ping.amr',
            visitComplete: false,
            visitInclude: true
        }, {
            id: 'vis_rdt',
            visitText: 'RDT',
            visitDetail: 'Administer Rapid Diagnostic Test for malaria',
            visitAudio: 'resources/ping.amr',
            visitComplete: false,
            visitInclude: true
        }, {
            id: 'vis_vita',
            visitText: 'Vitamin A',
            visitDetail: 'Check if Vitamin A has been administered',
            visitAudio: 'resources/ping.amr',
            visitComplete: false,
            visitInclude: true
        }, {
            id: 'vis_alb',
            visitText: 'Albendazole',
            visitDetail: 'Check if Albendazole has been administered',
            visitAudio: 'resources/ping.amr',
            visitComplete: false,
            visitInclude: true
        }, {
            id: 'vis_blood',
            visitText: 'Blood sample',
            visitDetail: 'Take a blood sample for CBC',
            visitAudio: 'resources/ping.amr',
            visitComplete: false,
            visitInclude: true
        }]
    }
})