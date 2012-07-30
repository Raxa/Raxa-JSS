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

Ext.define('RaxaEmr.Outpatient.view.patientlist', {
    extend: 'Ext.List',
    xtype: 'patientlist',
    id: 'contact',

    config: {
        title: 'Outpatient Department',
        cls: 'x-contacts',
        ui: 'round',
        store: 'patientlist',
        items: [{
            xtype: 'toolbar',
            docked: 'top',

            items: [{
                xtype: 'segmentedbutton',
                allowDepress: false,
                items: [{
                    xtype: 'button',
                    ui: 'normal',
                    text: 'Today\'s List',
                    pressed: true,
                    width: 150,
                }, {
                    xtype: 'button',
                    text: 'All Patients',
                    width: 150,
                }, {
                    xtype: 'button',
                    text: 'Pending',
                    width: 150,
                }]
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'searchfield',
                id: 'searchfield',
                placeHolder: 'Search...'
            }]
        }, {
            xtype: 'toolbar',
            docked: 'top',

            items: [{
                xtype: 'segmentedbutton',
                allowDepress: false,
                items: [{
                    xtype: 'button',
                    width: 130,
                    text: 'Name',
                    id: 'name'
                }, {
                    xtype: 'button',
                    width: 130,
                    text: 'Doctor',
                    id: 'docname'
                }, {
                    xtype: 'button',
                    width: 130,
                    text: 'Urgency',
                    id: 'urgency'
                }, {
                    xtype: 'button',
                    width: 130,
                    text: 'Last Visit',
                    id: 'lastvisit'
                }]
            }]
        }],
        itemTpl: [  
            /*'<div class="headshot" style="background-image:url(resources/images/headshots/pic.gif);"></div>', */
            '<div class="headshot" style="background-image:url({image});"></div>', 
            '<div style="float:left;width:30%;">', 
                '{firstName} {lastName}', 
                '<span>From : {city}, {state}</span>', 
                '<span>Age : {age}</span>', 
            '</div>', 
            '<div style="float:left;width:20%;">', 
                '<span>{nameofdoc}</span>', 
                '<span>Disease : {disease}</span>', 
            '</div>', 
            '<div style="float:left;height:32px;width:32px;background-image:url(resources/images/urgency.png);">{urgency}</div>', 
            '<div style="float:right;width:40%;">', 
                '<span>Last Visit : {lastvisit:date("j M Y")}</span>',
                '<span>No. of Visits : {noofvisits}</span>', 
                '<span>ID : {id}</span>', 
            '</div>'
        ].join('')
    }
});
