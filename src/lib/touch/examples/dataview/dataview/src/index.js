Ext.Loader.setPath({
    'Ext.data': '../../../src/data'
});

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {
        var myStore = Ext.create('Ext.data.JsonStore', {
            id: 'myStore',
            fields: ['firstName', 'lastName'],
            data: [
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Tommy', lastName: 'Maintz'},
                {firstName: 'Ed', lastName: 'Spencer'},
                {firstName: 'Jamie', lastName: 'Avins'},
                {firstName: 'Aaron', lastName: 'Conran'},
                {firstName: 'Dave', lastName: 'Kaneda'},
                {firstName: 'Michael', lastName: 'Mullany'},
                {firstName: 'Abraham', lastName: 'Elias'},
                {firstName: 'Jay', lastName: 'Robinson'}
            ]
        });

        Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: 'fit',
            items: {
                xtype: 'dataview',
                store: myStore,
                useComponents: true,
                itemConfig: {
                    tpl: '{lastName}, {firstName}'
                }
            }
        });
    }
});
