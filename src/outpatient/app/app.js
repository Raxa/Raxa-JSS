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
    'Ext.ux.touch.grid': '../lib/touch/Ext.ux.touch.grid',//Path to grid code so that grid fuctionalities and view can be accessed
    'Screener': '../screener/app'//Path to screener module so that store and models of screener can be accessed 
});

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': 'lib/i18n' //Path to the i18n library
    }
});

Ext.application({
    name: 'RaxaEmr.Outpatient',
	// models, stores, controller and views used in the OPD directly
    models: ['patientlist', 'Grid', 'medicationhistory', 'refertodoc', 'labresulthistory', 'drugpanel', 'cheifcomplain', 'sign', 'Observation'],
    stores: ['patientlist', 'Grid', 'medicationhistory', 'refertodoc', 'labresulthistory', 'drugpanel', 'cheifcomplain', 'sign'],
    views: ['Viewport'], 
    controllers: ['patientlist'],
    // to launch the module view
    launch: function () {
        if(Util.checkModulePrivilege('outpatient')){
            Ext.create('RaxaEmr.Outpatient.view.Viewport');
        }
    }
});
