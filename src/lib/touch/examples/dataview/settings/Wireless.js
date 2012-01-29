Ext.define('Settings.view.Wireless', {
    extend: 'container',
    
    config: {
        defaults: {
            xtype: 'list',
            ui: 'grouped',
            defaults: {
                disclosure: true
            }
        },
        
        items: [
            {
                title: 'Choose a Network...',
                store: 'Settings.store.Networks',
                listeners: {
                    itemtap: function() {
                        
                    },
                    disclosuretap: function() {
                        
                    }
                },
                itemTpl: [
                    '<h3 class="title">{title}</h3>',
                    '<span class="info">',
                        '<tpl if="secure"><img src="padlock.gif"></tpl>',
                        '<img src="{signalStrength}.gif">',
                    '</span>'
                ]
            },
            {
                description: 'Known networks will be joined automatically. If no known networks are available, you will have to manually select a network.',
                items: [
                    {
                        title: 'Ask to Join Networks',
                        
                        initComponent: function() {
                            this.add({
                                xtype: 'toggle'
                            });
                            
                            this.callParent();
                        }
                    }
                ]
            }
        ]
    }
});