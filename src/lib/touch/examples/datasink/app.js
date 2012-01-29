Ext.Loader.setPath({
    'Ext.data': '../../src/data'
});

Ext.application({
    name: 'DataSink',
    controllers: ['Main'],
    stores: ['Demos'],
    views: ['Viewport'],

    autoCreateViewport: true
});

CONTACTS = [
    {id: 1, firstName: 'Tommy', lastName: 'Maintz', group_id: 1},
    {id: 2, firstName: 'Tommy', lastName: 'Dougan', group_id: 1},
    {id: 3, firstName: 'Tommy', lastName: 'Avins', group_id: 1},
    {id: 4, firstName: 'Tommy', lastName: 'Conran', group_id: 1},
    {id: 5, firstName: 'Ed', lastName: 'Spencer', group_id: 2},
    {id: 6, firstName: 'Jamie', lastName: 'Avins', group_id: 2},
    {id: 7, firstName: 'Aaron', lastName: 'Conran', group_id: 2},
    {id: 8, firstName: 'Dave', lastName: 'Kaneda', group_id: 2},
    {id: 9, firstName: 'Robert', lastName: 'Dougan', group_id: 3},
    {id: 10, firstName: 'Abraham', lastName: 'Elias', group_id: 3},
    {id: 11, firstName: 'Tommy', lastName: 'Maintz', group_id: 3},
    {id: 12, firstName: 'Jay', lastName: 'Robinson', group_id: 3},
    {id: 13, firstName: 'Nico', lastName: 'Ferrero', group_id: 3}
];