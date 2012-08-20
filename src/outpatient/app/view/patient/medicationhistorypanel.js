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
 
 //view of medication history panel
 
Ext.define('RaxaEmr.Outpatient.view.patient.medicationhistorypanel', {
    extend: 'Ext.Container',
    xtype: 'Medication-History-Panel',
    requires: ['RaxaEmr.Outpatient.view.patient.medicationhistory'],
    config: {
        title: 'Medication-History',
        cls: 'x-show-contact',
        layout: 'vbox',
        items: [{
            id: 'medicationhistorycontent',
            tpl: ['<div class="top">', '<div style="float:left;width:50%;">', '<div class="headshot" style="float:left;background-image:url({image});">', '</div>', '<div class="name" style="float:left;width:80%;">', '{display}', '</br>', '<span>From : New Delhi, India</span>', '</br>', '</div>', '</div>', '<div style="float:left;width:50%;">', '<div class="name_small" style="float:left;width:50%;">', '<span> Age : {age} </span>', '<span>ID : 16736127</span>', '</br>', '</div>', '<div class="name_right" style="float:left;width:50%;">', '<h3>Dr.Arpana Jain</h3>', '<span></span>', '</div>', '</div>', '</div>'].join('')
        }, {
            xtype: 'Medication-History',
            flex: 1
        }],
        record: null
    },

    updateRecord: function (newRecord) {
        if (newRecord) {
            this.down('#medicationhistorycontent').setData(newRecord.data);
        }
    }
});