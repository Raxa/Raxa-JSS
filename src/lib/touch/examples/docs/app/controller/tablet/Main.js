Ext.define('Docs.controller.tablet.Main', {
    extend: 'Docs.controller.Main',
    
    init: function() {
        if (this.getApplication().getCurrentProfile().getName() == 'tablet') {
            console.log('booting tablet');
            var viewport = Ext.create('Ext.viewport.Viewport');
        
            Ext.create('Docs.view.tablet.Main');            
        }
    }
});