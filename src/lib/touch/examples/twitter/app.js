Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('Ext.data.proxy.Twitter', 'lib/TwitterProxy.js');
Ext.ClassManager.setAlias('Ext.data.proxy.Twitter', 'proxy.twitter');

Ext.application({
    name: 'Twitter',
    
    controllers: ['Search'],
    models     : ['Search', 'Tweet']
});
