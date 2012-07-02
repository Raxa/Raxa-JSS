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
 *  This view shows search result in tabular form
 */
Ext.define('Laboratory.view.LabOrderCreation3', {
    extend: 'Ext.container.Container',
    alias: 'widget.LabOrderCreation3',
    autoScroll: true,
    activeItem: 0,

    items: [{
        xtype: 'gridpanel',
        autoScroll: true,
        title: 'Lab order search result',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'First Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Last Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Sex'
        }, {
            xtype: 'datecolumn',
            text: 'DOB'
        }, {
            xtype: 'gridcolumn',
            text: 'Husband\'s / Father\'s Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Village'
        }, {
            xtype: 'gridcolumn',
            text: 'Panchayat'
        }, {
            xtype: 'gridcolumn',
            text: 'Town'
        }],
        viewConfig: {

        }
    },{
        xtype: 'button',
        text: 'Continue',
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_PATIENT_DETAILS.value);
        }        
    },
    
    
    ]

});
