Ext.define('RaxaEmr.Pharmacy.view.prescribedDrugs', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.prescribedDrugs',
    height: 300,
    styleHtmlContent: false,
    width: 780,
    store: 'orderStore',
    autoScroll: true,
    columnLines: true,
    selType: 'cellmodel',
    viewConfig: {
        stripeRows: false
    },
    initComponent: function () {
        this.columns = [{
            xtype: 'numbercolumn',
            width: 50,
            datIndex: 'no',
            text: 'S No'
        },
        {
            xtype: 'gridcolumn',
            width: 117,
            datIndex: 'drugname',
            text: 'Name Of drug'
        },
        {
            xtype: 'gridcolumn',
            width: 67,
            datIndex: 'dosage',
            text: 'Dosage'
        },
        {
            xtype: 'gridcolumn',
            width: 73,
            datIndex: 'duration',
            text: 'Duration'
        },
        {
            xtype: 'numbercolumn',
            width: 38,
            datIndex: 'qty',
            text: 'Qty'
        },
        {
            xtype: 'numbercolumn',
            text: 'Unit Price',
            datIndex: 'unitprice'
        },
        {
            xtype: 'numbercolumn',
            width: 103,
            datIndex: 'itemprice',
            text: 'Item Price'
        }];
        this.plugins = [
        Ext.create('Ext.grid.plugin.CellEditing', {
           // ptype: 'cellediting',
            clicksToEdit: 1
        })];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
            '->',
            {
                text: 'Add Drug',
                iconCls: 'icon-add',
                handler: function() {
                    var newDrug;
                    drugStore = Ext.getStore('orderStore');
                    // add blank item to store -- will automatically add new row to grid
                    newDrug = drugStore.add({
                        no: '',
                        drugname: '',
                        dosage: '',
                        duration: '',
                        unitprice: '',
                        itemprice: ''
                    })[0];
                    this.cellEditor.startEdit(newDrug, this.moviesEditor.columns[0]);
                }
            }]
        }];
        this.callParent(arguments);
    }
});