Ext.define('RaxaEmr.Outpatient.view.Grid', {
    extend: 'Ext.ux.touch.grid.View',
    xtype: 'grid-grid',

    requires: ['Ext.ux.touch.grid.feature.Feature', 'Ext.field.Number', 'RaxaEmr.Outpatient.store.Grid'],

    config: {
        title: 'Grid',
        store: 'Grid',
        columns: [{
            header: 'Height',
            dataIndex: 'height',
            width: '10%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + ' cm' + '</span>';
            }
        }, {
            header: 'Weight',
            dataIndex: 'weight',
            width: '10%',
            cls: 'centered-cell',
            renderer: function (value, values) {
                return '<span>' + value + ' kg' + '</span>';
            }
        }, {
            header: 'BMI',
            dataIndex: 'bmi',
            width: '10%',
            cls: 'centered-cell',
        }, {
            header: 'Blood Pressure',
            dataIndex: 'bp',
            width: '15%',
            cls: 'centered-cell',
            renderer: function (value) {
                var bmi = 68;
                return Ext.String.format('{0}/{1}', value, bmi);
            }
        }, {
            header: 'Pulse',
            dataIndex: 'pulse',
            width: '10%',
            cls: 'centered-cell',
        }, {
            header: 'Respiratory Rate',
            dataIndex: 'resrate',
            width: '15%',
            cls: 'centered-cell',
        }, {
            header: 'Temperature',
            dataIndex: 'temp',
            width: '15%',
            cls: 'centered-cell',
        }, {
            header: 'Oxygen Saturation',
            dataIndex: 'oxysat',
            width: '15%',
            cls: 'centered-cell',
        }]
    }
});