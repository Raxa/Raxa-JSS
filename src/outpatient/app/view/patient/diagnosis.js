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

Ext.define('RaxaEmr.Outpatient.view.patient.diagnosis', {
    extend: 'Ext.Container',
    xtype: 'diagnosis-panel',
    id: 'diagnosis-panel',
    config: {
        layout: {
            type: 'hbox'
        },
        title: 'Diagnosis',
        items: [{
            xtype: 'formpanel',
            flex: 1,
            scrollable: 'false',
            items: [{
                xtype: 'fieldset',
                items: [{
                    xtype: 'selectfield',
                    label: 'Diagnosis Category',
                    valueField: 'diagnosisCategory',
                    displayField: 'title',
                    store: {
                        data: [{
                            diagnosisCategory: '',
                            title: '',
                        }, {
                            diagnosisCategory: 'Cardiovascular',
                            title: 'Cardiovascular',
                        }, {
                            diagnosisCategory: 'Endocrine',
                            title: 'Endocrine',
                        }, {
                            diagnosisCategory: 'Gastrointestinal',
                            title: 'Gastrointestinal',
                        }, {
                            diagnosisCategory: 'Genitourinary',
                            title: 'Genitourinary',
                        }, {
                            diagnosisCategory: 'Musculoskeletal',
                            title: 'Musculoskeletal',
                        }, {
                            diagnosisCategory: 'Neurological',
                            title: 'Neurological',
                        }, {
                            diagnosisCategory: 'Orthopedic',
                            title: 'Orthopedic',
                        }, {
                            diagnosisCategory: 'Respiratory',
                            title: 'Respiratory',
                        }]
                    }
                }, {
                    xtype: 'selectfield',
                    label: 'Diagnosis',
                    valueField: 'diagnosisCategory',
                    displayField: 'title',
                    store: {
                        data: [{
                            diagnosisCategory: '',
                            title: '',
                        }, {
                            diagnosisCategory: 'Chronic Diarrhea',
                            title: 'Chronic Diarrhea',
                        }, {
                            diagnosisCategory: 'Hookworm Infestation',
                            title: 'Hookworm Infestation',
                        }, {
                            diagnosisCategory: 'Infectious Diarrhea',
                            title: 'Infectious Diarrhea',
                        }, {
                            diagnosisCategory: 'Menetrier\'s Disease',
                            title: 'Menetrier\'s Disease',
                        }]
                    }
                }, {
                    xtype: 'textareafield',
                    label: 'Notes'
                }]
            }, {
                xtype: 'container',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                /*items: [{*/
                /*xtype: 'button',*/
                /*ui: 'decline',*/
                /*text: 'Cancel',*/
                /*flex: 1*/
                /*}, {*/
                /*xtype: 'button',*/
                /*margin: '0 10 0 10',*/
                /*text: 'Clear',*/
                /*flex: 1*/
                /*}, {*/
                /*xtype: 'button',*/
                /*ui: 'confirm',*/
                /*text: 'Done',*/
                /*flex: 1*/
                /*}]*/
            }]
        }, {
            xtype: 'container',
            width: 60,
            items: [{
                xtype: 'button',
                docked: 'top',
                height: 40,
                id: 'reftodocbutton',
                margin: '20 20 0 0',
                width: 40,
                icon: '../outpatient/resources/images/doclist.png',
                padding: '0 10 10 0'
            }, {
                xtype: 'button',
                docked: 'top',
                height: 40,
                margin: '10 20 0 0',
                width: 40,
                icon: '../outpatient/resources/images/add.png',
                padding: '0 10 10 0'
            }]
        }]
    }
});
