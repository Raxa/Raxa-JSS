Ext.define('RaxaEmr.Pharmacy.view.requisitionGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.requisitionGrid',
    id: 'requisitionGrid',
    height: 250,
    styleHtmlContent: false,
    width: 520,
    layout: {
        type: 'absolute'
    },
    x: 200,
    store: 'RequisitionItems',
    autoScroll: true,
    selType: 'cellmodel',
    cellEditor: Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    }),
    viewConfig: {
        stripeRows: false
    },
    initComponent: function () {    
        var requisitionEditor = this;
        this.addEvents(['requisitionDelete']);
        this.columns = [
            {
                xtype: 'gridcolumn',
                width: 400,
                dataIndex: 'drugname',
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
                            , scope: this
                        }
                    }
                }
            },
            {
                xtype: 'numbercolumn',
                width: 55,
                dataIndex: 'quantity',
                text: 'Quantity',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: true,
                    decimalPrecision: 0,
                    allowDecimals: false
                }
            },{
                xtype: 'actioncolumn',
                width: 45,
                items: [{
                        icon: '../../resources/img/delete.png',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex, colIndex) {
                            requisitionEditor.fireEvent('requisitionDelete', {
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
                        action: 'addRequisition'
                    }]
            }];
        Ext.getStore('PurchaseOrders').add({
            drugname: '',
            quantity: ''
        })[0];
        this.callParent(arguments);
    }
});