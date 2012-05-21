//<debug>
Ext.Loader.setPath({
    'Ext': '../../sencha/src'
});
//</debug>

Ext.application({
    name: 'AddressBook',

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    glossOnIcon: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@114.png'
    },

    models: ['Contact'],
    stores: ['Contacts'],
    views: ['Main'],
    controllers: ['Application'],

    launch: function() {
        Ext.Viewport.add({
            xclass: 'AddressBook.view.Main'
        });
    }
});
