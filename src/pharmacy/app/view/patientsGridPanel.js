Ext.define('RaxaEmr.Pharmacy.view.patientsGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.patientsgridpanel',
    layout: 'fit',
    columns: [
    {
        xtype: 'gridcolumn',
        width: 120,
        text: 'Patient Name',
        dataIndex : 'display'
    },
    {
        xtype: 'gridcolumn',
        width: 40,
        dataIndex: 'age',
        text: 'Age'
    }
    ]
});
