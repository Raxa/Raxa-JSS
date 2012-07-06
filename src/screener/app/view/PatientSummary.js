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
/**
 * This panel will overlay when a patient is pressed for 2 seconds.
 * This is a form that shows the patient summary
 */
Ext.define('Screener.view.PatientSummary', {
    xtype: 'patientSummary',
    extend: 'Ext.Panel',
    id: 'patientSummary',
    config: {
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        hidden: false,
        // Set the width and height of the panel
        width: 400,
        height: 260,
        scrollable: true,
        items: [{
            xtype: 'textfield',
            label: 'Name : ',
            width: '100%',
            value: 'Creative',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'Gender : ',
            width: '100%',
            value: 'Male',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'Age : ',
            width: '100%',
            value: '18',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'BMI : ',
            width: '100%',
            value: '22',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'ID# : ',
            width: '100%',
            value: '1',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'Village : ',
            width: '100%',
            value: 'abc',
            disabled: 'true',
        }, {
            xtype: 'textfield',
            label: 'District : ',
            width: '100%',
            value: 'xyz',
            disabled: 'true',
        }]
    }
});