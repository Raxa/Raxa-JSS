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
 *  This view provides option to search on provider
 */
Ext.define('Laboratory.view.SpecimenCollection4', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenCollection4',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'textfield',
        width: 240,
        blankText: '',
        emptyText: 'Enter the Provider Registration Number',
        x: 10,
        y: 60
    }, {
        xtype: 'textfield',
        width: 140,
        fieldLabel: 'Provider\'s Name',
        labelAlign: 'top',
        labelWidth: 50,
        emptyText: 'First Name',
        x: 10,
        y: 160
    }, {
        xtype: 'textfield',
        width: 240,
        fieldLabel: '',
        hideEmptyLabel: false,
        emptyText: 'Last Name',
        x: 60,
        y: 180
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 260,
        y: 60,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_COLLECTION_PROVIDER_SEARCH_RESULT.value);
        }
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 260,
        y: 220,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_COLLECTION_PROVIDER_SEARCH_RESULT.value);
        }
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 100,
    }

    ]

});
