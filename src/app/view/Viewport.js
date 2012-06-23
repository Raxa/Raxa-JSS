Ext.define('RaxaEmr.view.Viewport', {
    extend: 'Ext.Carousel',
    xtype: 'smartDash',
    config: {
        title: 'Dashboard',
        iconCls: 'star',

        items: [{
            xclass: 'RaxaEmr.view.AppGrid'
        }, {
            xclass: 'RaxaEmr.view.smartApp'
        }]
    }
});