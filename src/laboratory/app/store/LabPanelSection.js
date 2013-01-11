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
 * License for the specific lLaboratory.store.LabPananguage governing permissions and limitations under
 * the License.
 * 
 * This file is store of list of LabPanel Section, which will be used in LabOrderCreation final view
 */
Ext.define('Laboratory.store.LabPanelSection', {
    extend: 'Ext.data.Store',
    model: 'Laboratory.model.LabPanel',
	fields: ['Section', 'PanelUuid'],
    proxy: {
        type: 'rest',
        url: HOST+'/ws/rest/v1/jsslab/labtestpanel?v=full',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    },
    autoLoad: true,
})
