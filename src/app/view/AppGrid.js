Ext.define('RaxaEmr.view.Dashboard', {
    extend: 'Ext.Panel',	
    alias: 'widget.simplelist',
    layout: 'vbox',
    config : {
        items: [ 	
        {
            xtype: 'list', 
            layout: 'fit', //fullscreen: true, 
            height: '200',
            store: 'Stations',
            itemTpl: '{id} :: {name}'
        }
        ]		
    }, 
    initialize: function() {
        console.log('initialize simplelist view');	    
        this.callParent();
    }
});