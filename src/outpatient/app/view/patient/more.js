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
//the view after clicking one of the patient in the patient list
Ext.define('RaxaEmr.Outpatient.view.patient.more', {
    extend: 'Ext.Container',
    xtype: 'patientlist-show',
    requires: ['RaxaEmr.Outpatient.view.patient.Grid', 'RaxaEmr.Outpatient.view.patient.medicationhistory', 'RaxaEmr.Outpatient.view.patient.refertodoc', 'RaxaEmr.Outpatient.view.patient.work', 'RaxaEmr.Outpatient.view.patient.labresulthistory'],
    config: {
        title: 'Outpatient Department',
        cls: 'x-show-contact',
        ui: 'round',
        id: 'more',
        layout: 'vbox',
        items: [{
            id: 'content',
            tpl: ['<div class="top">', '<div style="float:left;width:50%;">', '<div class="headshot" style="float:left;background-image:url({image});">', '</div>', '<div class="name" style="float:left;width:80%;">', '{display}', '</br>', '<span>From : -- </span>', '</br>', '</div>', '</div>', '<div style="float:left;width:50%;">', '<div class="name_small" style="float:left;width:50%;">', '<span> Age : {age} </span>', '<span>ID : --</span>', '</br>', '</div>', '<div class="name_right" style="float:left;width:50%;">', '<h3>--</h3>', '<span></span>', '</div>', '</div>', '</div>'].join('')
        }, {
            xtype: 'vitalsGrid',
            height: 84
            /*border: 10,*/
        }, {
            xtype: 'container',
            layout: {
                type: 'card'
            },
            /*border: '1 0 0 0',*/
            /*style: 'border:solid #666666;',*/
            id: 'working-area',
            flex: 1,
            activeItem: 0,
            items: [{
                    xtype: 'container',
                    /*scrollable: 'vertical',*/
                    items: [{
                    /*xtype: 'formpanel',*/
                    /*height: 100,*/
                    /*layout: {*/
                    /*pack: 'center',*/
                    /*type: 'hbox'*/
                    /*},*/
                    /*scrollable: 'false',*/
                    /*items: [{*/
                    /*xtype: 'fieldset',*/
                    /*height: 75,*/
                    /*margin: '-10 20 0 -3',*/
                    /*layout: {*/
                    /*type: 'hbox'*/
                    /*},*/
                    /*flex: 1,*/
                    /*items: [{*/
                    /*xtype: 'selectfield',*/
                    /*label: 'Chief Complain',*/
                    /*id: 'cheifComplain',*/
                    /*valueField: 'cheifComplain',*/
                    /*displayField: 'title',*/
                    /*autoComplete: true,*/
                    /*flex: 1,*/
                    /*store: {*/
                    /*data: [{*/
                    /*cheifComplain: 'Abdominal Pain',*/
                    /*title: 'Abdominal Pain',*/
                    /*}, {*/
                    /*cheifComplain: 'Fever',*/
                    /*title: 'Fever',*/
                    /*}, {*/
                    /*cheifComplain: 'Nausea',*/
                    /*title: 'Nausea',*/
                    /*}, {*/
                    /*cheifComplain: 'Vomiting',*/
                    /*title: 'Vomiting',*/
                    /*}, {*/
                    /*cheifComplain: 'Weakness',*/
                    /*title: 'Weakness',*/
                    /*}]*/
                    /*}*/
                    /*}]*/
                    /*}, {*/
                    /*xtype: 'fieldset',*/
                    /*height: 75,*/
                    /*margin: '-10 0 0 0',*/
                    /*layout: {*/
                    /*type: 'hbox'*/
                    /*},*/
                    /*flex: 1,*/
                    /*items: [{*/
                    /*xtype: 'textareafield',*/
                    /*label: 'Notes',*/
                    /*flex: 1*/
                    /*}]*/
                    /*}]*/
                    /*}, {*/
                    xtype: 'work'
                }]
        }]
        }],
        record: null
    },

    updateRecord: function (newRecord) {
        if (newRecord) {
            this.down('#content').setData(newRecord.data);
        }
    }
});
