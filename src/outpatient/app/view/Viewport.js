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
    xtype: 'mainview',
	id: 'mainview',
	//other view used in this view are included
    requires: ['RaxaEmr.Outpatient.view.patientlist', 'RaxaEmr.Outpatient.view.patient.more', 'RaxaEmr.Outpatient.view.patient.labresulthistorypanel', 'RaxaEmr.Outpatient.view.patient.refertodocpanel', 'RaxaEmr.Outpatient.view.patient.medicationhistorypanel', 'RaxaEmr.Outpatient.view.patient.diagnosis'],

    config: {
        autoDestroy: false,
        fullscreen: true,
		// confirmation buttons in the toolbar in the different view like medication history, refer to doc panel etc.
        navigationBar: {
            items: [{
                xtype: 'button',
                id: 'confirmmedicationhistory',
                text: 'Done',
                ui: 'confirm',
                align: 'right',
                hidden: true
            }, {
                xtype: 'button',
                id: 'confirmlabresulthistory',
                text: 'Done',
                ui: 'confirm',
                align: 'right',
                hidden: true
            }, {
                xtype: 'button',
                id: 'confirmrefertodoc',
                text: 'Done',
                ui: 'confirm',
                align: 'right',
                hidden: true
            }, ]
        },
		//the basic view of the main page is loaded
        items: [{
            xtype: 'patientlist'
        }]
    }
});
