/**
 * @class kiva.views.Main
 * @extends Ext.Panel
 * 
 * Simple wrapper for the List and the Filter panel. At the moment, Ext.List does not support dockedItems, so we need to
 * wrap it in this panel to attach the Filter bar to the top. This class has no other function, and may be removed in the
 * future if List is given the ability to dock items
 */
kiva.views.Main = Ext.extend(Ext.Panel, {
    layout: 'fit',
    fullscreen: true,

    initComponent: function() {
        Ext.apply(this, {
            items: {
                xtype: 'loansList'
            },
            
            dockedItems: {
                dock : 'top',
                xtype: 'loanFilter'
            }
        });
        
        kiva.views.Main.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('kivaMain', kiva.views.Main);