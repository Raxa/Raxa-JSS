Ext.define('DataSink.view.demos.filtering.Remote', {
    extend: 'DataSink.view.demos.AbstractList',

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',
                items: [
                    { xtype: 'spacer' },
                    {
                        text: 'sort("firstName")',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.sort("firstName");
                        }
                    },
                    { xtype: 'spacer' }
                ]
            },
            {
                xtype: 'list',
                store: 'filtering.Remote',
                itemTpl: '<b>{firstName}</b> {lastName}'
            }
        ]
    }
});