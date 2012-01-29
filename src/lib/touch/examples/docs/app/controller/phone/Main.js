Ext.define('Docs.controller.phone.Main', {
    extend: 'Docs.controller.Main',
    
    getMainPanel: function() {
        return Ext.getCmp('mainPanel');
    },
    
    showHome: function() {
        this.getMainPanel().setActiveItem(0);
    }
});