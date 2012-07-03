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
 *  This view shows result status of various specimens 
 */
Ext.define('Laboratory.view.SpecimenRegistration13', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenRegistration13',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },
    items: [{
        xtype: 'gridpanel',
        width: 500,
        title: '',
        x: 10,
        y: 5,
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Report Id'
        }, {
            xtype: 'gridcolumn',
            text: 'Report Status'
        }, {
            xtype: 'gridcolumn',
            width: 160,
            text: 'List of Investigation'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'button',
        text: 'Back',
        x: 230,
        y: 150,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_REGISTRATION_HOME.value);
        }
    }]

});
