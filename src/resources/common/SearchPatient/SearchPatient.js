Ext.define('RaxaEmr.common.view.SearchPatient', {
    extend: 'Ext.Panel',
    requires: ['RaxaEmr.common.store.SearchPatientStore'],
    alias: 'widget.BillingSearchPatient',
    itemId: 'SearchPatient',
    title: 'Search a Patient',
    items:[
    {
        xtype: 'textfield',
        emptyText: 'Patient Name or ID',
        name:'patientName',
        itemId: 'patientNameSearch',
        listeners: ''
    },
    {
        xtype: 'panel',
        border: 0,
        layout: 'card',
        height: 300,
        width: 180,
        activeItem: 0,
        itemId: 'searchGrid',
        items: [{
            xtype: 'gridpanel',
            itemId: 'patientSearchGrid',
            border: true,
            height: 300,
            title: 'Search Results',
            store: Ext.create('RaxaEmr.common.store.SearchPatientStore'),
            columns: [
            {
                xtype: 'gridcolumn',
                width: 100,
                text: 'Patient Name',
                dataIndex : 'name'
            },
            {
                xtype: 'gridcolumn',
                width: 75,
                dataIndex: 'identifier',
                text: 'ID'
            }
            ]
        }]
    }]
});
