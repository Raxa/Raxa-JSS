Ext.define('RaxaEmr.Outpatient.view.patient.refertodoc', {
    extend: 'Ext.ux.touch.grid.View',
    xtype: 'Refer-To-Doc',

    requires: ['Ext.ux.touch.grid.feature.Feature', 'Ext.field.Number', 'RaxaEmr.Outpatient.store.Grid'],

    config: {
        title: 'Refer to Doctor',
        store: 'refertodoc',
        columns: [{
            header: 'Doctor Name',
            dataIndex: 'docname',
            width: '50%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + '</span>';
            }
        }, {
            header: 'OPD Number',
            dataIndex: 'opdno',
            width: '50%',
            cls: 'centered-cell'
        }]
    }
});