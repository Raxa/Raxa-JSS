Ext.define('RaxaEmr.Pharmacy.view.goodsReceiptGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.goodsReceiptGrid',
    styleHtmlContent: false,
    height: 250,
    width: 780 - 2, // Total pixels - Border
    store: Ext.create('RaxaEmr.Pharmacy.store.StockList',{
        autoLoad: false,
        storeId: 'newReceipt'
    }),
    //layout: 'absolute',
    selType: 'cellmodel',
    cellEditor: Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    }),
    viewConfig: {
        stripeRows: false
    },
    initComponent: function () {
        var receiptEditor = this;
        this.addEvents(['deleteReceiptDrug']);
        this.columns= [
        {
            xtype: 'gridcolumn',
            width: 25,
            text: '#'
        },
        {
            xtype: 'gridcolumn',
            width: 200,
            dataIndex: 'drugName',
            text: 'Name Of drug',
            editor: {
                xtype: 'combobox',
                editable: true,
                minChars: 3,
                typeAhead: true,
                autoSelect: false,
                store: 'allDrugs',
                displayField: 'text',
                listeners: {
                    'focus': {
                        fn: function (comboField) {
                            comboField.expand();
                        },
                        scope: this
                    },
                    'select': {
                        fn: function(comboField, records){
                            var row = Ext.ComponentQuery.query('goodsReceiptGrid')[0].getSelectionModel().selection.row;
                            var supplierIndex = (Ext.getStore('drugInfos').find("drugUuid",records[0].data.uuid));
                            if(supplierIndex!==-1)
                                Ext.getStore('newReceipt').getAt(row).set('supplier', Ext.getStore('drugInfos').getAt(supplierIndex).data.description);
                        }
                    }
                }
            }
        },
        {
            xtype: 'gridcolumn',
            width: 80,
            text: 'Qty Sent',
            dataIndex: 'originalQuantity',
            hidden: true,
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                decimalPrecision: 0,
                allowDecimals: false,
                minValue: 0
            }
        },
        {
            xtype: 'gridcolumn',
            width: 80,
            text: 'Qty Received',
            dataIndex: 'quantity',
            editable: true,
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                decimalPrecision: 0,
                allowDecimals: false,
                minValue: 0
            }
        },
        {
            xtype: 'gridcolumn',
            width: 80,
            text: 'Shelf',
            dataIndex: 'roomLocation',
            editor: {
                xtype: 'textfield',
                allowBlank: true
            }
        },
        {
            xtype: 'gridcolumn',
            editable: true,
            text: 'Batch no',
            dataIndex: 'batch',
            width: 80,
            editor: {
                xtype: 'textfield',
                allowBlank: true
            }
        },
        {
            xtype: 'datecolumn',
            editable: true,
            text: 'Expiry Date',
            dataIndex: 'expiryDate',
            width: 80,
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: 'd/m/y'
            }
        },
        {
            xtype: 'gridcolumn',
            editable: true,
            text: 'Supplier',
            dataIndex: 'supplier',
            editor: {
                xtype: 'combobox',
                editable: true,
                minChars: 3,
                typeAhead: true,
                autoSelect: false,
                store: [
                'Shyam & Sons', 
                'Jagat Traders', 
                'Pankaj Medico Traders', 
                'Melaram & Brothers', 
                'Gurunanak Medical Stores', 
                'Saluja Medical Agencies', 
                'G. Medical Services', 
                'Nitin Medical Agency', 
                'Vimal Enterprises', 
                'Locost', 
                'CMSI'
                ],
                displayField: 'text',
                listeners: {
                    'focus': {
                        fn: function (comboField) {
                            comboField.expand();
                        },
                        scope: this
                    }
                }
            }
        },
        {
            xtype: 'actioncolumn',
            width: 22,
            items: [{
                icon: '../resources/img/delete.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    receiptEditor.fireEvent('deleteReceiptDrug', {
                        rowIndex: rowIndex,
                        colIndex: colIndex
                    });
                }
            }]
        }],
        this.plugins = [this.cellEditor];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
            '->',
            {
                text: '(+) Add Drug',
                action: 'addReceiptDrug'
            }]
        }];
        Ext.getStore('newReceipt').add({
            drugname: '',
            quantity: ''
        })[0];
        this.callParent(arguments);
    }
});
