Ext.define('RaxaEmr.Outpatient.view.patient.drugpanel', {
    extend: 'Ext.ux.touch.grid.View',
    xtype: 'Drug-Panel',

    requires: ['Ext.ux.touch.grid.feature.Feature'],

    config: {
        title: 'Medication History',
        store: 'drugpanel',
        columns: [{
            header: 'Drug Name',
            dataIndex: 'drugname',
            width: '20%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + '</span>';
            }
        }, {
            header: 'Strength',
            dataIndex: 'strength',
            width: '20%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + ' mg' + '</span>';
            }
        }, {
            header: 'Dosage',
            dataIndex: 'dosage',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Instruction',
            dataIndex: 'instruction',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Route of Administration',
            dataIndex: 'routeofadministration',
            width: '20.3%',
            cls: 'centered-cell',
        }]
    }
});