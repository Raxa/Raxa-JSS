Ext.define('Laboratory.view.PaperEntry3', {
    extend: 'Ext.container.Container',
    alias: 'widget.PaperEntry3',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        autoScroll: true,
        title: 'Search Result Grid Panel',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Lab Order Number'
        }, {
            xtype: 'datecolumn',
            dataIndex: 'date',
            text: 'Date'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Provider'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Patient Name'
        }],
        viewConfig: {

        }
    }]

});
