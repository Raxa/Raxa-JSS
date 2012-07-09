Ext.define('RaxaEmr.Pharmacy.view.prescribedDrugs', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.prescribedDrugs',
    id: 'prescribedDrugs',
    height: 300,
    styleHtmlContent: false,
    width: 777,
    store: 'orderStore',
    autoScroll: true,
    selType: 'rowmodel',
    rowEditor: Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 3
    }),
    viewConfig: {
        stripeRows: false
    },
    initComponent: function () {    
        var drugEditor = this;
        this.addEvents(['drugEdit', 'drugDelete']);
        this.columns = [
        {
            xtype: 'gridcolumn',
            width: 200,
            dataIndex: 'drugname',
            text: 'Name Of drug',
            resizable: false,
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                editable: false,
                store: Ext.create('RaxaEmr.Pharmacy.store.allDrugs'),
                displayField: 'text',
                forceSelection: true     
            }
        },
        {
            xtype: 'gridcolumn',
            width: 85,
            dataIndex: 'dosage',
            text: 'Dosage',
            resizable: false,
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                editable: false,
                store: new Ext.data.Store({
                    fields:['value'],
                    data: [{value: '250 mg'},{value: '500 mg'},{value: '600 mg'},{value: '800 mg'}]
                }),
                displayField: 'value',
                forceSelection: true
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
                forceSelection: true
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
            width: 130,
            resizable: false,
            dataIndex: 'unitprice',
            editor: {
                xtype: 'numberfield',
                allowBlank: true
            }
        },
        {
            xtype: 'numbercolumn',
            width: 170,
            dataIndex: 'itemprice',
            text: 'Item Price',
            resizable: false,
            id: 'itemprice'
        },{
            xtype: 'actioncolumn',
            width: 45,
            items: [{
                icon: '../../resources/img/edit.png',
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    drugEditor.fireEvent('drugEdit', {
                        rowIndex: rowIndex,
                        colIndex: colIndex
                    });
                }
            },{
                icon: '../../resources/img/edit.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    drugEditor.fireEvent('drugDelete', {
                        rowIndex: rowIndex,
                        colIndex: colIndex
                    });
                }
            }]
        }];
        this.plugins = [this.rowEditor];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
            '->',
            {
                text: 'Add Drug',
                iconCls: 'icon-add'
            }]
        }];
        this.callParent(arguments);
    }
});