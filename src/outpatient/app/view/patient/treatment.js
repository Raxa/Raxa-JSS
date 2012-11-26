// 'LockableCarousel' from: http://stackoverflow.com/questions/8283196/disable-dragging-in-carousel
// TODO: Temp workaround to have 2 views. Eventually at FB style grab side and scroll, like:
// ...
Ext.define('Ext.LockableCarousel', {
    extend: 'Ext.Carousel',
    id: 'WelcomeCarousel',
    initialize: function() {
        this.onDragOrig = this.onDrag;
        this.onDrag = function(e) {
            // console.log(e);
            // TODO: Fiddle with this. idea is that you cannot drag on the canvasas "drawable area"
            // TODO: Instead, catch event where (if mouse over floating "tab" (or "thin bar"), then you can drag it)
            if (e.startX > 710) {
            // if(!this.locked) {
                this.onDragOrig(e);
            }
        }
    },
    // locked: false,
    locked: true,
    lock: function() {
        this.locked = true;
    },
    unlock: function() {
        this.locked = false;
    }
});

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

Ext.define('RaxaEmr.Outpatient.view.patient.treatment', {
    // extend: 'Ext.Container',
    extend: 'Ext.LockableCarousel',

    xtype: 'treatment-panel',
    requires: ['RaxaEmr.Outpatient.view.patient.drugpanel', 'RaxaEmr.Outpatient.view.patient.treatmentsummery', 'Screener.store.druglist', 'Screener.model.druglist', 'RaxaEmr.Outpatient.view.patient.druglist', 'RaxaEmr.Outpatient.view.patient.drugform', 'RaxaEmr.Outpatient.view.patient.DrugGrid'],
    id: 'treatment-panel',
    config: {
        title: 'Treatment',
        indicator: false,
        activeItem: 0,
        items: [{
            xtype: 'drug-panel'
        }, {
            xtype: 'draw-panel'
        }, {
            xtype: 'history-panel'
        }]
    }
});
