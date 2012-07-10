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
Ext.define('mUserStories.store.visitStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'mUserStories.model.visitModel',
        id: 'visStore',
        /*sorters: 'resourceName',
        grouper: function (record) {
            return record.get('resourceName')[0];
        },*/
        data: [{
            vis_id: 'vis_ors',
            vis_text: 'ORS',
            vis_det: 'Administer Oral Rehydration Salts',
            vis_aud: 'resources/ping.amr',
            vis_comp: false,
            vis_incl: true
        }, {
            vis_id: 'vis_rdt',
            vis_text: 'RDT',
            vis_det: 'Administer Rapid Diagnostic Test for malaria',
            vis_aud: 'resources/ping.amr',
            vis_comp: false,
            vis_incl: true
        }, {
            vis_id: 'vis_vita',
            vis_text: 'Vitamin A',
            vis_det: 'Check if Vitamin A has been registered',
            vis_aud: 'resources/ping.amr',
            vis_comp: false,
            vis_incl: true
        }, {
            vis_id: 'vis_alb',
            vis_text: 'Albendazole',
            vis_det: 'Check if Albendazole has been administered',
            vis_aud: 'resources/ping.amr',
            vis_comp: false,
            vis_incl: true
        }, {
            vis_id: 'vis_blood',
            vis_text: 'Blood sample',
            vis_det: 'Take a blood sample for CBC',
            vis_aud: 'resources/ping.amr',
            vis_comp: false,
            vis_incl: true
        }]
    }
})