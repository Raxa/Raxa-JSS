Ext.define('RaxaEmr.Pharmacy.view.goodsReceiptGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.goodsReceiptGrid',
    styleHtmlContent: false,
    height: 250,
    width: 743,
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
    x: 110,
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
                allowDecimals: false
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
                allowDecimals: false
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
            width: 150,
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
            width: 150,
            editor: {
                xtype: 'datefield',
                allowBlank: false,
                format: 'd/m/y',
            }
        },{
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
                        text: 'Add Drug',
                        iconCls: 'icon-add',
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
