Ext.define('DataSink.view.demos.filtering.Local', {
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
                        text: 'clearFilter()',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.clearFilter();
                        }
                    },
                    {
                        text: 'filter("firstName", "Tommy")',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.filter("firstName", "Tommy");
                        }
                    },
                    {
                        text: 'filter("firstName", "Robert")',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.filter("firstName", "Robert");
                        }
                    },
                    { xtype: 'spacer' }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',
                items: [
                    { xtype: 'spacer' },
                    {
                        text: 'filter([{ property: "firstName", value: "Tommy" }, { property: "lastName", value: "Maintz" }])',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.filter([
                                { property: 'firstName', value: 'Tommy' },
                                { property: 'lastName', value: 'Maintz' }
                            ]);
                        }
                    },
                    { xtype: 'spacer' }
                ]
            },
            {
                xtype: 'list',
                store: 'filtering.Local',
                itemTpl: '<b>{firstName}</b> {lastName}'
            }
        ]
    }
});