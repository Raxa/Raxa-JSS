Ext.define('Topbar.view.UrlSettingsPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.urlSettingsPanel',

    config: {
        itemId: 'UrlSettingsPanel',
        left: 0,
        top: 0,
        hideOnMaskTap: true,
        modal: true,
        scrollable: false,
        items: [{
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                placeHolder: 'Host URL',
                name: 'hostField',
                listeners: {
                    blur: function (field, event, options) {
                        HOST = field.getValue();
                        localStorage.setItem("host", HOST);
                    }
                },
                width: 450,
                style: 'background-color: white;',
                value: HOST
            }]
        }]
    }
});