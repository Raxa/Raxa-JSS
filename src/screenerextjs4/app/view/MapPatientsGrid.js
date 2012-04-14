Ext.define('RaxaEmr.Screener.view.MapPatientsGrid', {
    id: 'mappatientsgrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.mappatientsgrid',
    store: 'MapPatientsList',
    margin: '2 0 2 2',
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
                text: 'Patient Name',
                flex: 1,
                sortable: false,
                align: 'center',
                dataIndex: 'patientname'
            }, {
                text: 'Waiting Time',
                flex: 1,
                sortable: true,
                align: 'center',
                dataIndex: 'waitingtime'
            }]
        });

        me.callParent(arguments);
    }
});