Ext.define('RaxaEmr.Pharmacy.view.prescribedDrugs', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.prescribedDrugs',
    id: 'prescribedDrugs',
    height: 300,
    styleHtmlContent: false,
    width: 780,
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
            width: 117,
            dataIndex: 'drugname',
            text: 'Name Of drug',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            width: 67,
            dataIndex: 'dosage',
            text: 'Dosage',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            width: 73,
            dataIndex: 'duration',
            text: 'Duration',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            xtype: 'numbercolumn',
            width: 38,
            dataIndex: 'qty',
            text: 'Qty',
            editor: {
                xtype: 'numberfield',
                allowBlank: true
            }
        },
        {
            xtype: 'numbercolumn',
            text: 'Unit Price',
            dataIndex: 'unitprice',
            editor: {
                xtype: 'numberfield',
                allowBlank: true
            }
        },
        {
            xtype: 'numbercolumn',
            width: 103,
            dataIndex: 'itemprice',
            text: 'Item Price',
            id: 'itemprice'
        },{
            xtype: 'actioncolumn',
            width: 50,
            items: [{
                icon: '../../resources/img/edit.png',  // Use a URL in the icon config
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
                iconCls: 'icon-add',/*
                handler: function() {
                    var newDrug;
                    drugStore = Ext.getStore('orderStore');
                    // add blank item to store -- will automatically add new row to grid
                    newDrug = drugStore.add({
                        drugname: '',
                        dosage: '',
                        duration: '',
                        unitprice: '',
                        itemprice: ''
                    })[0];
                    this.rowEditor.startEdit(newDrug, this.drugsEditor.columns[0]);
                }*/
            }]
        }];
        this.callParent(arguments);
    }
});