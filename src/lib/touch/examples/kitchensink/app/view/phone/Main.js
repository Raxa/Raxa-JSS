Ext.define('Kitchensink.view.phone.Main', {
    extend: 'Ext.dataview.NestedList',
    requires: ['Ext.TitleBar'],
    
    id: 'mainNestedList',
    
    config: {
        fullscreen: true,
        title: 'Kitchen Sink',
        useTitleAsBackText: false,
        
        store: {
            type: 'Demos'
        },
        
        toolbar: {
            id: 'mainNavigationBar',
            xtype : 'titlebar',
            docked: 'top',
            title : 'Kitchen Sink',
            
            items: {
                xtype : 'button',
                id: 'viewSourceButton',
                hidden: true,
                align : 'right',
                ui    : 'action',
                action: 'viewSource',
                text  : 'Source'
            }
        }
    }
});