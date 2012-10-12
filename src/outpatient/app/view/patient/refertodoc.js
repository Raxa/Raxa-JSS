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
 
 //view of refer to doc grid
 
Ext.define('RaxaEmr.Outpatient.view.patient.refertodoc', {
    extend: 'Ext.ux.touch.grid.View',
    xtype: 'Refer-To-Doc',

    requires: ['Ext.ux.touch.grid.feature.Feature', 'Ext.field.Number', 'RaxaEmr.Outpatient.store.Grid'],

    config: {
        title: 'Refer to Doctor',
        id: 'refToDocPanel',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'segmentedbutton',
                margin: '0 0 0 10',
                allowDepress: false,
                items: [{
                    xtype: 'button',
                    text: 'Sort By Drug Name',
                    id: 'reftodocsortbydocname',
                    pressed: true,
                    width: 200,
                }, {
                    xtype: 'button',
                    id: 'reftodocsortbyopdno',
                    text: 'Sort By OPD No.',
                    width: 200,
                }]
            }, {
                xtype: 'spacer'
            }, {
				xtype: 'button',
				id: 'referpatient',
				text: 'Refer',
				ui: 'confirm',
				width: 100,
			}, {
                xtype: 'searchfield',
                id: 'reftodocsearchfield',
                placeHolder: 'Search...'
            }]
        }],
        columns: [{
            header: 'Doctor Name',
            dataIndex: 'display',
            width: '50%',
            cls: 'centered-cell',
            renderer: function (value) {
                return value.split("- ")[1];
            }
        }, {
            header: 'Identifier',
            dataIndex: 'identifier',
            width: '50%',
            cls: 'centered-cell'
        }]
    }
});