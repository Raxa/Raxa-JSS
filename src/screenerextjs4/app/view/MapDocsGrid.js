Ext.define('RaxaEmr.Screener.view.MapDocsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mapdocsgrid',
    store: 'MapDocsList',
    id: 'mapdocsgrid',
    margin: '2 2 2 2',
    columnWidth: 0.5,
    stateful: true,
    stateId: 'stateGrid',
    forcefit: true,
    layout: {
        type: 'anchor'
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            columns: [{
                text: 'Doctor Name',
                flex: 1,
                sortable: false,
                align: 'center',
                dataIndex: 'docname'
            }, {
                text: 'No. of Patients',
                id: 'noofpatients',
                flex: 1,
                sortable: true,
                align: 'center',
                dataIndex: 'noofpatients'
            }]
        });

        me.callParent(arguments);
    }
});