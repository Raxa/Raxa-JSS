Ext.define('RaxaEmr.Pharmacy2.view.groups', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.groupgrid',
    height: 300,
    id: 'groups',
    title: 'Drug Groups',
    width:807,
    store: 'allgroups',
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