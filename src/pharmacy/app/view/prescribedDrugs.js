Ext.define('RaxaEmr.Pharmacy.view.prescribedDrugs', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.prescribedDrugs',
    id: 'prescribedDrugs',
    height: 300,
    styleHtmlContent: false,
    width: 750,
    store: 'orderStore',
    autoScroll: true,
    selType: 'cellmodel',
    cellEditor: Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    }),
    viewConfig: {
        stripeRows: false
    },
    initComponent: function () {    
        var drugEditor = this;
        this.addEvents(['deleteDrug']);
        this.columns = [
        {
            xtype: 'gridcolumn',
            width: 220,
            dataIndex: 'drugname',
            text: 'Name Of drug',
            resizable: false,
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                editable: false,
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
            width: 100,
            dataIndex: 'dosage',
            text: 'Dosage',
            resizable: false,
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                editable: false,
                store: new Ext.data.Store({
                    fields:['value'],
                    data: [{value: '250'},{value: '500'},{value: '600'},{value: '800'}]
                }),
                displayField: 'value',
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
            width: 90,
            dataIndex: 'duration',
            text: 'Duration',
            resizable: false,
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                editable: false,
                store: new Ext.data.Store({
                    fields:['value'],
                    data: [{value: '1 week'},{value: '2 week'},{value: '3 week'},{value: '1 month'},{value: '2 month'}]
                }),
                displayField: 'value',
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
            xtype: 'numbercolumn',
            width: 55,
            dataIndex: 'qty',
            text: 'Qty',
            resizable: false,
            editor: {
                xtype: 'numberfield',
                allowBlank: true
            }
        },
        {
            xtype: 'numbercolumn',
            text: 'Unit Price',
            width: 100,
            resizable: false,
            dataIndex: 'unitprice',
            editor: {
                xtype: 'numberfield',
                allowBlank: true
            }
        },
        {
            xtype: 'numbercolumn',
            width: 100,
            dataIndex: 'itemprice',
            text: 'Item Price',
            resizable: false,
            id: 'itemprice'
        },{
            xtype: 'actioncolumn',
            width: 45,
            items: [{
                icon: '../../resources/img/delete.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    drugEditor.fireEvent('deleteDrug', {
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
            config:{
                align: 'left'
            },
            items: ['->',{
                text: 'Add Drug',
                iconCls: 'icon-add'
            }]
        }];
        this.callParent(arguments);
    }
});
