Ext.define('RaxaEmr.Pharmacy.view.alertGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.alertGrid',
    styleHtmlContent: false,
    height: 200,
    width: 300,
    store: Ext.create('RaxaEmr.Pharmacy.store.Alerts',{
        autoLoad: true,
        storeId: 'alerts'
    }),
    selType: 'cellmodel',
    cellEditor: Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    }),
    viewConfig: {
        stripeRows: false
    },
    hideHeaders: true,
    initComponent: function () {
        var receiptEditor = this;
        this.columns= [
        {
            xtype: 'gridcolumn',
            width: 25,
            text: ''
        },
        {
            xtype: 'gridcolumn',
            width: 250,
            dataIndex: 'name'
        },
        {
            xtype: 'gridcolumn',
            width: 100,
            dataIndex: 'description',
            hidden: true
        },
        //THIS is still in progress. I hope to finish it soon
//        {
//            xtype: 'checkcolumn',
//            width: 20,
//            dataIndex: 'seen'
//        }
        ],
        this.plugins = [this.cellEditor];
        this.callParent(arguments);
    }
});
