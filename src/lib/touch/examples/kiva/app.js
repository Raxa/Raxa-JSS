Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('Ext.data.proxy.Kiva', 'lib/KivaProxy.js');
Ext.ClassManager.setAlias('Ext.data.proxy.Kiva', 'proxy.kiva');

Ext.application({
    name: 'Kiva',
    
    controllers: ['Loans'],
    models     : ['Loan']
});
