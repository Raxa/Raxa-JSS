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
 *  This view contains grid view of specimen to be collected
 */
Ext.define('Laboratory.view.SpecimenCollection13', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenCollection13',
    autoScroll: true,
    activeItem: 0,

    items: [{
        xtype: 'gridpanel',
        width: 500,
        title: '',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Lab Order no'
        }, {
            xtype: 'gridcolumn',
            text: 'Speciment id'
        }, {
            xtype: 'gridcolumn',
            text: 'Specimen Type'
        }, {
            xtype: 'datecolumn',
            text: 'Collection Date '
        }]

    }, {
        xtype: 'button',
        height: 20,
        text: 'OK',
        x: 280,
        y: 90,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_COLLECTION_HOME.value);
        }
    }]

});
