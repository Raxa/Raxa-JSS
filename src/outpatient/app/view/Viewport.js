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

Ext.define('RaxaEmr.Outpatient.view.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'mainView',
    
    initialize: function (args) {
        var topBar = Ext.create('Topbar.view.TopToolbar', {
            docked: 'top',
            title:'Outpatient Department',

        });

         topBar.add(
                {
                xtype: 'button',
                id: 'confirmmedicationhistory',
                text: 'Done',
                ui: 'confirm',
                align: 'right',
                hidden: false
                });
        topBar.add({
                xtype: 'button',
                id: 'confirmlabresulthistory',
                text: 'Done',
                ui: 'confirm',
                align: 'right',
                hidden: false
            });
          topBar.add(
          {
                xtype: 'button',
                id: 'confirmrefertodoc',
                text: 'Done',
                ui: 'confirm',
                align: 'right',
                hidden: false
            }
        );
        
        this.add(topBar); 
        
        

    },

    requires: ['RaxaEmr.Outpatient.view.patientlist', 'RaxaEmr.Outpatient.view.patient.more', 'RaxaEmr.Outpatient.view.patient.labresulthistorypanel', 'RaxaEmr.Outpatient.view.patient.refertodocpanel', 'RaxaEmr.Outpatient.view.patient.medicationhistorypanel'],

    config: {
        autoDestroy: false,
        fullscreen: true,
        navigationBar:false,
        items: [{
            xtype: 'patientlist'
        }]
    }
});