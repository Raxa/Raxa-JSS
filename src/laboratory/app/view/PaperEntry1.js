Ext.define('Laboratory.view.PaperEntry1', {
    extend: 'Ext.container.Container',
    alias: 'widget.PaperEntry1',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        height: 343,
        width: 275,
        title: 'Lab Orders waiting results',
        columns: [{
            xtype: 'gridcolumn',
            width: 273,
            dataIndex: 'string',
            text: 'Details'
        }],
        viewConfig: {

        }
    }]

});
