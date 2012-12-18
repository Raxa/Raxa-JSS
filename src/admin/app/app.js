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

//this is for debugging only - when production rolls around, we need to put all dependencies in a single .js file
//<debug>
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': '../lib/i18n' //Path to the i18n library
    }
});

Ext.require('Ext.i18n.Bundle', function() {
    Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle',{
        bundle: 'RaxaEmrAdmin',
        //Specify language here
        lang: 'en-US',
        path: 'app/view', //Path to the .properties file
        noCache: true
    });
});

Ext.application({
    name: 'RaxaEmr.Admin',

    stores: ['Providers', 'Locations', 'NewPersons', 'ParChildLocation'],
    models: ['Provider', 'Names', 'Person', 'ProviderAttribute', 'Location', 'ListItem'],
    views: ['Main', 'ProviderView', 'LocationView', 'NewProvider', 'AddLocation'],
    controllers: ['Application'],
        //entry point
        launch: function() {
                if (Util.checkModulePrivilege('admin')&& Util.uuidLoadedSuccessfully()) {
            var mainScreen = Ext.create('RaxaEmr.Admin.view.Main', {
                fullscreen: true
            });
            var topBar = Ext.create('Topbar.view.TopToolbar', {
                });
            Ext.getCmp('topbarSelectfield').setValue("Admin");
            Ext.getCmp('topbarSelectfield').setHidden(false);
            mainScreen.add(topBar);
        }
    }
});