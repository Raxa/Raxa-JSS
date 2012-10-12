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
 *  1. There will be multiple lab order records which share the same LabOrderID. The LabOrderID is what will be listed 
 *     in the panel and what the user will select.
 *  2. Each lab order has a concept field, which is the lab panel concept, which is also in the LabPanel table.
 *  3. The lab panel concept will be a set, each member of which corresponds to a lab test.
 *  4. If the lab test concept is a coded type, it will have answers which comprise the full set of possible values.
 *     So what you want is a query to GET all the orders with a given LabOrderID. You want a representation that contains 
 *     the test panel concept and its name, its test concepts with their name, format information (from LabTest and ConceptNumeric 
 *     if numeric), answer concept set with their names.
 *  5. To GET the full set of flags, which you need to get via ConceptSource and Code (not yet implemented in OpenMRS) 
 *     to populate the dropdown.
 *  6. So for each test result, you need to GET (in case they are editing an existing lab order) based on order id/uuid and then POST
 *     (either with the    *uuid from the GET or without a uuid for a new value) an obs of the appropriate type (text, numeric, concept) 
 *     which contains the date (of the specimen or test, manually entered), the test concept, the value, properly formatted (watch out 
 *     for titer), and a flag (optional). There will also be an obs for each panel, the concept is the panel concept and the id/uuid of 
 *     the panel concept is the obsgroup value of the result obs. The order field of the obses created will be the id/uuid of the lab order.
 *  7. Because this is paper entry, we do not use test specimen or lab test ranges, that is only for work done in our own lab. We may use 
 *     specimen if we send over a specimen rather than a patient (for example, with pathology specimens). If there is a specimen, then it 
 *     will carry the specimen type and specimen role, but that will have been set in specimen collection. 
 */
Ext.define('Laboratory.controller.PaperEntry', {
    extend: 'Ext.app.Controller',
    id: 'PaperEntryController',
    views: ['Viewport', 'Home', 'PaperEntry1', 'PaperEntry2', 'PaperEntry3', 'PaperEntry4', 'BatchApproval', 'QueueStatus', 'ReportDelivery1', 'ReportDelivery1', 'ReportDelivery2', 'ReportDelivery3', 'ReportDelivery4', 'ReportDelivery5', 'SpecimenCollection1', 'SpecimenCollection2', 'SpecimenCollection3', 'SpecimenCollection4', 'SpecimenCollection5', 'SpecimenCollection6', 'SpecimenCollection7', 'SpecimenCollection8', 'SpecimenCollection9', 'SpecimenCollection10', 'SpecimenCollection11', 'SpecimenCollection12', 'SpecimenCollection13', 'LabOrderCreation1', 'LabOrderCreation2', 'LabOrderCreation3', 'LabOrderCreation4', 'LabOrderCreation5', 'LabOrderCreation6', 'LabOrderCreation7', 'LabOrderCreation8', 'LabOrderCreation9', 'LabOrderCreation10', 'LabOrderCreation11', 'LabOrderCreation12', 'SpecimenRegistration1', 'SpecimenRegistration2', 'SpecimenRegistration3', 'SpecimenRegistration4', 'SpecimenRegistration5', 'SpecimenRegistration6', 'SpecimenRegistration7', 'SpecimenRegistration8', 'SpecimenRegistration9', 'SpecimenRegistration10', 'SpecimenRegistration11', 'SpecimenRegistration12', 'SpecimenRegistration13', 'ResultEntry1', 'ResultEntry2', 'ResultEntry3', 'ResultEntry4', 'ResultEntry5', 'ReportApproval1', 'ReportApproval2', 'ReportApproval3', 'ReportApproval4', 'LabOrderList'],

    init: function () {
        this.control({
            'PaperEntry4 button[action=submitPaperEntry]': {
                click: this.sendLabObs
            },
            'PaperEntry1': {
                activate: function () {
                    // listener on laborderlist which triggers on selection of laborder
                    Ext.getCmp('labOrderListPaperEntry').on('cellClick', function () {
                        this.showLabPanel('labOrderListPaperEntry');
                    }, this)
                }
            },
            'PaperEntry4': {
                activate: function () {
                    // listener on laborderlist which triggers on selection of laborder
                    Ext.getCmp('labOrderListPaperEntry4').on('cellClick', function () {
                        this.showLabPanel('labOrderListPaperEntry4');
                    }, this)
                }
            },
        })
    },

    /* 
     * This method uses the value entered in "results" grid (on PaperEntry4 view) and POSTs them as obs
     * TO-DO: Add validation to the entered fields 
     */
    sendLabObs: function () {
        //function to get the date in required format of the openMRS, since the default extjs4 format is not accepted
        function ISODateString(d) {
            function pad(n) {
                return n < 10 ? '0' + n : n
            }
            return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z'
        }
        var currentDate = new Date();

        for (i = 0; i < Ext.getCmp('results').store.totalCount; i++) {

            var jsonLabObs = {
                "obsDatetime": ISODateString(currentDate),
                "person": selectedPatientUuid,
                "concept": Ext.getCmp('results').store.data.items[i].data.Uuid,
                "value": Ext.getCmp('results').store.data.items[i].data.Result,
            };

            //Ajax Request to POST json Object containing name+URL
            Ext.Ajax.request({
                url: LAB_HOST + '/ws/rest/v1/obs',
                method: 'POST',
                disableCaching: false,
                jsonData: jsonLabObs,
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Basic " + window.btoa(LAB_USERNAME + ":" + LAB_PASSWORD),
                    "Content-Type": "application/json"
                },

                failure: function (response) {
                    Ext.Msg.alert("Error", Util.getMessageSyncError());
                },

                success: function (response) {
                    console.log('Lab Paper Entry for' + Ext.getCmp('results').store.data.items[i].data.Result + 'POST successful with response status' + response.status);

                }
            });

        }
    },

    /*  This function is called after a user selects a laborder. It sets the store of result grid (concept)
     *  after which the tests of selected laborder can be seen in the grid.
     */
    showLabPanel: function (gridPanel) {
        var l = Ext.getCmp('mainLabArea').getLayout();
        l.setActiveItem(LAB_PAGES.PAPER_ENTRY_ENTER_DATA.value);
        var grid = Ext.getCmp(gridPanel);
        var pos = grid.getSelectionModel().selected.length;
        selectedLabOrderId = grid.getSelectionModel().lastSelected.data.labOrderId;
        selectedPatientDisplay = grid.getSelectionModel().lastSelected.data.PatientDisplay;
        selectedPatientUuid = grid.getSelectionModel().lastSelected.data.PatientUUID;
        selectedLabOrderIdUuid = grid.getSelectionModel().lastSelected.data.LabOrderUuid;

        //Sets the LabOrderId and Patient's Name in the view
        Ext.getCmp('LabOrderNoPaperEntry4Panel').setValue(selectedLabOrderId);
        Ext.getCmp('patientDisplayPaperEntry4Panel').setValue(selectedPatientDisplay);
        //results is grid which shows tests in the selected lab panel

        var resultGrid = Ext.getCmp('results');

        //This Ajax call gets the uuid of LabSpecimen concept which is used to set the proxy of concept store
        Ext.Ajax.request({
            url: LAB_HOST + '/ws/rest/v1/order/' + selectedLabOrderIdUuid + '?v=full',
            method: 'GET',
            disableCaching: false,
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + window.btoa(LAB_USERNAME + ":" + LAB_PASSWORD),
                "Content-Type": "application/json"
            },
            failure: function (response) {
                Ext.Msg.alert("Error", Util.getMessageSyncError());
            },
            success: function (response) {
                var JSONResult = JSON.parse(response.responseText);
                conceptUuid = JSONResult.concept.uuid;
                // This is to change the proxy by getting corresponding concept uuid from order
                resultGrid.store.getProxy().url = LAB_HOME + '/ws/rest/v1/concept/' + conceptUuid + '?v=full';
                resultGrid.store.load({
                    scope: this,
                    callback: function(records, operation, success){
                        if(success){
                        }
                        else{
                            Ext.Msg.alert("Error", Util.getMessageLoadError());
                        }
                    }
                });
            }
        });
    },
});
