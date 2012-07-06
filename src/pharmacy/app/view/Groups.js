//grid view for the groups created
Ext.define('RaxaEmr.Pharmacy.view.Groups', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.groups',
    height: 300,
    title: 'Drug Groups',
    store: 'groupstore',
    width:807,
    fields: ['groupname', 'regimen'],
    
    columns: [{
        header: 'Group Name',
        dataIndex: 'groupname',
        width: 400,
        hideable :false
    },{
        header: 'Regimen',
        dataIndex: 'regimen',
        width: 400,
        hideable: false,
        sortable: false
    }] 
});