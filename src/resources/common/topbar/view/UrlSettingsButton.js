Ext.define('Topbar.view.UrlSettingsButton', {
    extend: 'Ext.Container',
    alias: 'widget.urlSettingsButton',

    config: {
        items: [{
            xtype: 'button',
//            iconCls: 'settings',
            text: 'URL',
            iconMask: true,
            ui: 'plain',
            itemId: 'urlButton',
        }],
        listeners: [{
            fn: 'onUrlButtonTap',
            event: 'tap',
            delegate: '#urlButton'
        }]
    },

    onUrlButtonTap: function (button, e, options) {
        var urlPanel = button.urlButton;
        if (!urlPanel) {
            urlPanel = button.urlPanel = Ext.widget('urlSettingsPanel');
        }
        urlPanel.showBy(button);
    }
});
