Ext.define('RaxaEmr.Pharmacy.view.drugs', {
    extend: 'Ext.grid.Panel',
    height: 315,
    alias: 'widget.drug',
    //store: 'drugstore',
    title: 'Name Of Group Should Be Here',
    fields: ['name','tablets','days'],
    columns:[{
        header: 'Drug Name',
        dataIndex: 'name',
        width: '600',
        sortable: true,
        hideable: false
    },
    {
        header: 'No. Of Tablets',
        dataIndex: 'tablets',
        width: '300',
        sortable: true,
        hideable: false
    },
    {
        header: 'No. Of Days',
        dataIndex: 'days',
        width: '300',
        sortable: false,
        hideable: false
    }]
});