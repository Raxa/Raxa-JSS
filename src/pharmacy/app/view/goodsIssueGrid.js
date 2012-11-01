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
        this.addEvents(['deleteIssueDrug']);
        this.columns = [
        {
            xtype: 'rownumberer',
            text: 'S.N0',
            width: 50
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
                            var row = (Ext.getCmp('goodsIssueGrid').getSelectionModel().selection.row);
                            Ext.getStore('newIssue').getAt(row).set('expiryDate', null);
                            Ext.getStore('newIssue').getAt(row).set('batch', null);
                            Ext.getStore('newIssue').getAt(row).set('batchQuantity', null);
                            Ext.getStore('newIssue').getAt(row).set('roomLocation', null);
                            Ext.getStore('newIssue').getAt(row).set('batchUuid', null);
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
                            var selectedDrug = Ext.getCmp('goodsIssueGrid').getSelectionModel().lastSelected.data.drugName;
                            comboField.getStore().clearFilter();
                            //only allow batches that are available, have the correct drug, are in the current location, and
                            //haven't yet been assigned to another inventory
                            comboField.getStore().filter(function(record){
                                var isAvailable = (record.get('status')===RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE);
                                var isCurrentDrug = (record.get('drugName')===selectedDrug);
                                var isBatch = (Ext.getStore('newIssue').find("batch",record.get('batch'))===-1);
                                var locationUuid = Ext.getCmp('issueStockLocationPicker').value;
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
                        fn: function(comboField, records){
                            var expiryDate = records[0].data.expiryDate;
                            var roomLoc = records[0].data.roomLocation;
                            var batchUuid = records[0].data.uuid;
                            var batch = records[0].data.batch;
                            var row = (Ext.getCmp('goodsIssueGrid').getSelectionModel().selection.row);
                            Ext.getStore('newIssue').getAt(row).set('expiryDate', expiryDate);
                            Ext.getStore('newIssue').getAt(row).set('batch', batch);
                            Ext.getStore('newIssue').getAt(row).set('roomLocation', roomLoc);
                            Ext.getStore('newIssue').getAt(row).set('batchUuid', batchUuid);
                            Ext.getCmp('goodsIssueGrid').getView().refresh();
                            var requiredQuantity = Ext.getStore('newIssue').getAt(row).get('quantity');
                            var quantityInBatch = records[0].data.quantity;
                            //if current batch doesn't cover entire quantity required, reduce quantity and add new row
                            if(quantityInBatch < requiredQuantity){
                                Ext.getStore('newIssue').getAt(row).set('quantity', quantityInBatch);
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
            width: 180
        },{
            xtype: 'gridcolumn',
            text: 'Shelf',
            dataIndex: 'roomLocation',
            width: 60
        },        
        {
            xtype: 'actioncolumn',
            width: 22,
            items: [{
                icon: '../resources/img/delete.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    issueEditor.fireEvent('deleteIssueDrug', {
                        rowIndex: rowIndex,
                        colIndex: colIndex
                    });
                }
            }]
        }];
        this.plugins = [this.cellEditor];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
            '->',
            {
                text: '(+) Add Drug',
                action: 'addIssueDrug'
            }]
        }];
        Ext.getStore('newIssue').add({
            drugname: '',
            quantity: ''
        })[0];
        this.callParent(arguments);
    }
});
