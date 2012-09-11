Ext.define('RaxaEmr.Pharmacy.view.goodsIssueGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.goodsIssueGrid',
    id: 'goodsIssueGrid',
    height: 250,
    width: 743,
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
    selType: 'cellmodel',
    cellEditor: Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    }),
    viewConfig: {
        stripeRows: false
    },
    initComponent: function () {    
        var issueEditor = this;
        this.addEvents(['issueDelete']);
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
                allowBlank: false,
                editable: true,
                store: Ext.create('RaxaEmr.Pharmacy.store.allDrugs'),
                displayField: 'text',
                forceSelection: true,     
                listeners: {
                    'focus': {
                        fn: function (comboField) {
                            comboField.doQuery(comboField.allQuery, true);
                            comboField.expand();
                        }
                        , 
                        scope: this
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
                decimalPrecision: 0,
                allowDecimals: false
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Batch No.',
            dataIndex: 'batch',
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
                                return record.get('status')===STOCKSTATUS.AVAILABLE && record.get('drugName')===selectedDrug && (Ext.getStore('newIssue').find("batch",record.get('batch'))===-1);
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
                            var row = (Ext.getCmp('goodsIssueGrid').getSelectionModel().selection.row);
                            Ext.getStore('newIssue').getAt(row).set('expiryDate', expiryDate);
                            Ext.getCmp('goodsIssueGrid').getView().refresh();
                            console.log("have:"+records[0].data.quantity);
                            console.log("require:"+Ext.getStore('newIssue').getAt(row).get('quantity'));
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
            dataIndex: 'expiryDate',
            width: 180
        },        
        {
            xtype: 'actioncolumn',
            width: 22,
            items: [{
                icon: '../../resources/img/delete.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    issueEditor.fireEvent('issueDelete', {
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
                text: 'Add Drug',
                iconCls: 'icon-add',
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