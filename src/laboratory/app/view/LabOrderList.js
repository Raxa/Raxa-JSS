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
 *  This is a grid panel which contains list of orders
 */
Ext.define('Laboratory.view.LabOrderList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.laborderlistgrid',
    layout: 'fit',

    groupField: 'orderlist',

    columns: [{
        xtype: 'gridcolumn',
        width: 200,
        text: 'Order List',
        dataIndex: 'orderlist',
    }, {
        xtype: 'gridcolumn',
        width: 200,
        text: 'Order List',
        dataIndex: 'ConceptName',
    }]
});
