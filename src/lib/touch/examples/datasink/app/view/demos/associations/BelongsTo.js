Ext.define('DataSink.view.demos.associations.BelongsTo', {
    extend: 'DataSink.view.demos.AbstractList',

    config: {
        items: [
            {
                xtype: 'list',
                store: 'associations.Users',
                itemTpl: '<b>{firstName}</b> {lastName}<tpl if="group"><br>Group: <em>{group.name}</em></tpl>'
            }
        ]
    }
});