Ext.define('RaxaEmr.Pharmacy.view.unassigned', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.unassigneddrugs',
    title: 'Unassigned Drugs',
    autoScroll: true,
    items: [{
        xtype: 'grid',
        store: 'drugstore',
        id: 'list',
        height: 600,
        fields: ['name', 'tablets', 'days',],
        columns:[{
            header: 'Drug Name',
            dataIndex: 'name',
            width: '600',
            sortable: true,
            hideable: false
        }, {
            header: 'No. Of Tablets',
            dataIndex: 'tablets',
            width: '350',
            sortable: true,
            hideable: false
        }, {
            header: 'No. Of Days',
            dataIndex: 'days',
            width: '350',
            sortable: false,
            hideable: false
        }]
    },{
        dockedItems: [{
            dock: 'bottom',
            height: 30,
            border: false,
            items: [{
                xtype: 'button',
                text: 'Back',
                action: 'back',
                width: 60
            }]
        }]
    }]
});