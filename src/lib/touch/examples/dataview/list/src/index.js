Ext.Loader.setPath({
    'Ext.data': '../../../src/data'
});

Ext.require([
    'Ext.data.Store',
    'Ext.List'
]);

Ext.define('Contact', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['firstName', 'lastName']
    }
});

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    viewport: {
        autoMaximize: false
    },
    onReady : function() {
        var store = Ext.create('Ext.data.Store', {
            model: 'Contact',

            sorters: 'firstName',
            grouper: function(record) {
                return record.get('firstName')[0];
            },

            data: [
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Ape', lastName: 'Evilias'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Ape', lastName: 'Evilias'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Ape', lastName: 'Evilias'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Ape', lastName: 'Evilias'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'},
                {firstName: 'Zed', lastName: 'Zacharias'}
            ]
        });

        Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: 'fit',
            items: {
                xtype: 'list',
                store: store,
                onItemDisclosure: function(record, item) {
                    alert('Disclose: ' + record.getId());
                },
                emptyText: 'No more records',
                preventSelectionOnDisclose: true,
                grouped: true,
                itemTpl: '<div class="contact2"><strong>{firstName}</strong> {lastName}</div>'
            }
        });
    }
});
