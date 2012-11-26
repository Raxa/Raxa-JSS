Ext.define('RaxaEmr.Pharmacy.view.alertGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.alertGrid',
    styleHtmlContent: false,
    height: 200,
    width: 400,
    store: 'Alerts',
    selType: 'cellmodel',
    cellEditor: Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    }),
    viewConfig: {
        stripeRows: false
    },
    hideHeaders: true,
    initComponent: function () {
        var alertEditor = this;
        this.addEvents(['deleteAlert']);
        this.columns= [
        {
            xtype: 'gridcolumn',
            width: 278,
            dataIndex: 'name'
        },
        {
            xtype: 'gridcolumn',
            width: 100,
            dataIndex: 'description',
            hidden: true
        },
        {
            xtype: 'actioncolumn',
            width: 22,
            items: [{
                    icon: '../resources/img/delete.png',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        alertEditor.fireEvent('deleteAlert', {
                            rowIndex: rowIndex,
                            colIndex: colIndex
                        });
                    }
                }]
        }],
        this.plugins = [this.cellEditor];
        this.callParent(arguments);
    }
});
