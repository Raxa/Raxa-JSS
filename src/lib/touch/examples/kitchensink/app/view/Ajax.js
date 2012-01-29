Ext.define('Kitchensink.view.Ajax', {
    extend: 'Ext.Container',
    config: {
        scrollable: true,
        items: [
            {
                xtype: 'panel',
                id: 'Ajax',
                styleHtmlContent: true
            },
            {
                docked: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        text: 'Load using Ajax',
                        handler: function() {
                            var panel = Ext.getCmp('Ajax');

                            panel.getParent().setMasked({
                                message: 'Loading...'
                            });

                            Ext.Ajax.request({
                                url: 'test.json',
                                success: function(response) {
                                    panel.update(response.responseText);
                                    panel.getParent().unmask();
                                }
                            });
                        }
                    }
                ]
            }
        ]
    }
});
