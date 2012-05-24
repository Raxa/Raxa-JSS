Ext.define('RaxaEmr.Pharmacy.view.group', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.groups',
    title: 'Drug Group',
    store: 'groupstore',
    height: 315,
    fields: ['name', 'type'],
    columns:[
    {
        header: 'Group Name',
        dataIndex: 'name',
        sortable: true,
        width: 600,
        hideable: false
    },
    {
        header: 'Regimen',
        dataIndex: 'type',
        sortable: false,
        width: 600,
        hideable: false
    }
    ],
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop'
        }
    }
});
