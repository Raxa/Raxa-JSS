Ext.define('RaxaEmr.Outpatient.view.patient.medicationhistory', {
    extend: 'Ext.ux.touch.grid.View',
    xtype: 'Medication-History',

    requires: ['Ext.ux.touch.grid.feature.Feature', 'Ext.field.Number', 'RaxaEmr.Outpatient.store.Grid'],

    config: {
        title: 'Medication History',
        store: 'medicationhistory',
        columns: [{
            header: 'Drug Name',
            dataIndex: 'drugname',
            width: '10%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + '</span>';
            }
        }, {
            header: 'Duration',
            dataIndex: 'duration',
            width: '10%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + '</span>';
            }
        }, {
            header: 'Last Filled',
            dataIndex: 'lastfilled',
            width: '10%',
            cls: 'centered-cell',
        }, {
            header: 'Prescriber',
            dataIndex: 'prescriber',
            width: '15%',
            cls: 'centered-cell'
        }, {
            header: 'Drug Reaction',
            dataIndex: 'drugreaction',
            width: '20%',
            cls: 'centered-cell',
        }, {
            header: 'Dosage',
            dataIndex: 'dosage',
            width: '15%',
            cls: 'centered-cell',
        }, {
            header: 'Route of Administration',
            dataIndex: 'routeofadministration',
            width: '20%',
            cls: 'centered-cell',
        }]
    }
});