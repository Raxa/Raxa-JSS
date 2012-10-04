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
 * This script initiates the registration module
 */

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': '../lib/i18n' //Path to the i18n library
    }
});

Ext.require('Ext.i18n.Bundle', function(){
    Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle',{
        bundle: 'RaxaEmrReg',
        //Specify language here
        lang: 'en-US',
        path: 'app/view', //Path to the .properties file
        noCache: true
    });
});

Ext.application({
    name: 'Registration',
    views: ['Viewport', 'Home', 'RegistrationPart1', 'IllnessDetails', 'RegistrationConfirm', 'RegistrationBMI', 'SearchPart1', 'SearchPart2', 'SearchConfirm', 'ConfirmFields'],
    controllers: ['Main', 'BMI','Search','PrintCard'],

    launch: function () {
        if(Util.checkModulePrivilege('registrationextjs4')&& Util.uuidLoadedSuccessfully()){
            Ext.create('Registration.view.Viewport');
        }
    }
});

