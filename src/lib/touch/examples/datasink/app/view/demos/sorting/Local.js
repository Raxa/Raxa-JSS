Ext.define('DataSink.view.demos.sorting.Local', {
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
                    {
                        text: 'sort("firstName", "ASC")',
                        ui: 'decline',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.sort("firstName", "ASC");
                            // @bug if you call this again, it will toggle. it should not. only one argument toggles
                        }
                    },
                    {
                        text: 'sort("firstName", "DESC")',
                        ui: 'decline',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.sort("firstName", "DESC");
                            // @bug if you call this again, it will toggle. it should not. only one argument toggles
                        }
                    },
                    { xtype: 'spacer' }
                ]
            },
            {
                xtype: 'toolbar',
                ui: 'light',
                docked: 'top',
                items: [
                    { xtype: 'spacer' },
                    {
                        text: 'sort({ property: "firstName", direction: "ASC" })',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.sort({
                                property: 'firstName',
                                direction: 'ASC'
                            });
                        }
                    },
                    {
                        text: 'sort({ property: "firstName", direction: "DESC" })',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.sort({
                                property: 'firstName',
                                direction: 'DESC'
                            });
                        }
                    },
                    { xtype: 'spacer' }
                ]
            },
            {
                xtype: 'toolbar',
                ui: 'light',
                docked: 'top',
                items: [
                    { xtype: 'spacer' },
                    {
                        text: 'sort([{ property: "firstName", direction: "ASC" }, { property: "lastName", direction: "ASC" }])',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.sort([
                                {
                                    property: 'firstName',
                                    direction: 'ASC'
                                },
                                {
                                    property: 'lastName',
                                    direction: 'ASC'
                                }
                            ]);
                        }
                    },
                    {
                        text: 'sort([{ property: "firstName", direction: "ASC" }, { property: "lastName", direction: "DESC" }])',
                        handler: function() {
                            var store = this.getParent().getParent().getStore();
                            store.sort([
                                {
                                    property: 'firstName',
                                    direction: 'ASC'
                                },
                                {
                                    property: 'lastName',
                                    direction: 'DESC'
                                }
                            ]);
                        }
                    },
                    { xtype: 'spacer' }
                ]
            },
            {
                xtype: 'list',
                store: 'sorting.Local',
                itemTpl: '<b>{firstName}</b> {lastName}'
            }
        ]
    }
});