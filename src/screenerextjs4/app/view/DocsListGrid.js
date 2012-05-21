Ext.define('RaxaEmr.Screener.view.DocsListGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.docslistgrid',
    store: 'DocsList',
    title: 'OPD Status',
    stateful: true,
    stateId: 'stateGrid',
    forcefit: true,
    layout: {
        type: 'anchor'
    },
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            columns: [{
                text: 'Patient Name',
                flex: 1,
                sortable: true,
                align: 'center',
                dataIndex: 'patientname'
            }, {
                text: 'Doctor Name',
                flex: 1,
                sortable: false,
                align: 'center',
                dataIndex: 'docname'
            }],
            tbar: [{
                text: 'Remove',
            }, {
                xtype: 'tbfill'
            }, {
                text: 'Save Details',
                handler: function () {
                    var l = Ext.getCmp('mainregarea').getLayout();
                    l.setActiveItem(0); //redirect to home
                }
            }],
            features: [
            Ext.create('Ext.grid.feature.Grouping', {
                groupHeaderTpl: 'Doctor Name: {name} ({rows.length} Patient{[values.rows.length > 1 ? "s" : ""]})'
            })]
        });

        me.callParent(arguments);
    }
});