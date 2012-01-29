Ext.Loader.setConfig({
    enabled : true,
    disableCaching: false,
    paths   : {
        'raxaemr': 'app'
    }
});

Ext.application({
    name: 'raxaemr',
    icon: 'resources/img/icon_s.png',
    tabletStartupScreen: 'resources/img/icon.png',
    
    models: [],    
    views: ['LoginForm'],
    controllers: [],
    stores: [],
    launch: function(){
        Ext.create('raxaemr.view.LoginForm');
    }
});