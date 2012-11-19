Ext.define('RaxaEmr.Pharmacy.view.goodsIssueGrid', {
    extend: 'Ext.ux.ModalGrid',
    alias: 'widget.goodsIssueGrid',
    id: 'goodsIssueGrid',
    height: 250,
    width: 780 - 2, // Total pixels - Border
    store: Ext.create('RaxaEmr.Pharmacy.store.StockList',{
        autoLoad: false,
        storeId: 'newIssue'
    }),
    selType: 'cellmodel',
    cellEditor: Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    }),
    viewConfig: {
        stripeRows: false
    },
    initComponent: function () {
        var issueEditor = this;
        this.columns = [
        {
            xtype: 'rownumberer'
        },
        {
            xtype: 'gridcolumn',
            width: 200,
            dataIndex: 'drugName',
            text: 'Name Of drug',
            editor: {
                xtype: 'combobox',
                editable: true,
                minChars: 2,
                typeAhead: true,
                autoSelect: false,
                store: 'allDrugs',
                queryMode: 'local',
                hideTrigger : true,
                displayField: 'text',
                forceSelection: true,
                listeners: {
                    'focus': {
                        fn: function (comboField) {
                            comboField.expand();
                        },
                        scope: this
                    },
                    'select':{
                        fn: function(comboField, records){
                        // TODO: when drug is changed, clear all corresponding fields, as they'll need to be updated
                        }
                    }
                }
            }
        },
        {
            xtype: 'gridcolumn',
            width: 55,
            dataIndex: 'quantity',
            text: 'Quantity',
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                allowDecimals: false,
                minValue: 0,
                hideTrigger: true
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Batch No.',
            dataIndex: 'batchQuantity',
            width: 170,
            editor: {
                xtype: 'combobox',
                itemId: 'batchNumber',
                allowBlank: false,
                editable: true,
                store: Ext.create('RaxaEmr.Pharmacy.store.StockList',{
                    storeId: 'batches'
                }),
                displayField: 'batchQuantity',
                forceSelection: true,
                listeners: {
                    //on focus, filter batches to all that are available at current location with same drug name
                    'focus': {
                        fn: function (comboField) {
                            // Get drugName entered by user in the modal
                            var gig = Ext.getCmp('goodsIssueGrid');
                            var selectedDrug = gig.modalForm.query('[name="drugName"]')[0].value;
                            
                            //only allow batches that are available, have the correct drug, are in the current location, and
                            //haven't yet been assigned to another inventory
                            comboField.getStore().clearFilter();
                            comboField.getStore().filter(function(record){
                                var isAvailable = (record.get('status')===RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE);
                                var isCurrentDrug = (record.get('drugName')===selectedDrug);
                                var isBatch = (Ext.getStore('newIssue').find("batch",record.get('batch'))===-1);
                                var locationUuid = Ext.getCmp('allStockLocationPicker').value;
                                var isAtLocation = (record.get('location').uuid===locationUuid)
                                return isAvailable && isCurrentDrug && isBatch && isAtLocation;
                            });
                            comboField.doQuery(comboField.allQuery, true);
                            comboField.expand();
                            comboField.getStore().updateFields();
                        }, 
                        scope: this
                    },
                    'select':{
                        // TODO: Ideally this shouldnt run on select, but rather, on submit of the modal form
                        //  probably need to create a new handler function, equivalent to "unselect" or "change selection" 
                        //  in the grid, which runs validation(s) on submit of the modal form
                        fn: function(comboField, records){
                            // Auto-filled values
                            var expiryDate = records[0].data.expiryDate;
                            var dt = new Date(expiryDate);
                            expiryDate = Ext.Date.format(dt, 'd-m-Y');    // format so it can go into UI
                            var roomLoc = records[0].data.roomLocation;
                            
                            // Update drug details in the modal
                            var mf = Ext.getCmp('goodsIssueGrid').modalForm;
                            var form = mf.getComponent("ModalGridFormPanel").form;
                            form.setValues({
                                'expiryDate': expiryDate
                            });
                            form.setValues({
                                'roomLocation': roomLoc
                            });

                            // Check if the batch has sufficient quantity to fill the order.
                            // If not, add another row for remainining quantity needed
                            var requiredQuantity = form.getValues().quantity;
                            var quantityInBatch = records[0].data.quantity;
                            
                            // TODO: Usability not great. responds to whatever is first batch that's chosen, without even submitting
                            // If current batch doesn't cover entire quantity required, reduce quantity and add new row
                            if(quantityInBatch < requiredQuantity){
                                form.setValues({
                                    'quantity': quantityInBatch,
                                });

                                Ext.getStore('newIssue').add({
                                    drug: {
                                        text: records[0].data.drug.display,
                                        uuid: records[0].data.drug.uuid
                                    },
                                    quantity: requiredQuantity - quantityInBatch,
                                    drugName: records[0].data.drug.display
                                })[0];
                            }
                        }
                    }
                }
            }
        },{
            xtype: 'datecolumn',
            text: 'Expiry Date',
            format: 'd/m/y',
            dataIndex: 'expiryDate',
            width: 140,
            editor: {
                xtype: 'datefield',
            // TODO: Disable this field but still submit the value
            // disabled: true
            }
        },{
            xtype: 'gridcolumn',
            text: 'Shelf',
            dataIndex: 'roomLocation',
            width: 60,
            editor: {
                xtype: 'textfield',
            // TODO: Disable this field but still submit the value
            // disabled: true
            }
        }];
        this.plugins = [this.cellEditor];
        this.callParent(arguments);
    }
});
