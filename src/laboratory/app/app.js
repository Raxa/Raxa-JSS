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
 * This file lists all the models, views, controllers & stores. Launch function is used to call the viewport
 */
Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'Laboratory',
    controllers: ['Main'],
    views: ['Viewport', 'Home', 'PaperEntry1', 'PaperEntry2', 'PaperEntry3', 'PaperEntry4','BatchApproval','QueueStatus','ReportDelivery1','ReportDelivery1','ReportDelivery2','ReportDelivery3','ReportDelivery4','ReportDelivery5','SpecimenCollection1','SpecimenCollection2','SpecimenCollection3','SpecimenCollection4','SpecimenCollection5','SpecimenCollection6','SpecimenCollection7','SpecimenCollection8','SpecimenCollection9','SpecimenCollection10','SpecimenCollection11','SpecimenCollection12','SpecimenCollection13'],

    launch: function () {
        Ext.create('Laboratory.view.Viewport');
    }
});
