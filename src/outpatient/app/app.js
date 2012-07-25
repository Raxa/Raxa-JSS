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
 */
Ext.Loader.setPath({
    'Ext.ux.touch.grid': '../lib/touch/Ext.ux.touch.grid'
});

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Outpatient',

    models: ['patientlist', 'Grid', 'medicationhistory', 'refertodoc', 'labresulthistory', 'drugpanel', 'cheifcomplain'],
    stores: ['patientlist', 'Grid', 'medicationhistory', 'refertodoc', 'labresulthistory', 'drugpanel', 'cheifcomplain'],
    views: ['Viewport'],
    controllers: ['patientlist'],

    launch: function () {
        Ext.create('RaxaEmr.Outpatient.view.Viewport');
    }
});