Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        var overlayTb = new Ext.Toolbar({
            dock: 'top'
        });
        
        var overlay = new Ext.Panel({
            floating: true,
            modal: true,
            centered: false,
            width: Ext.is.Phone ? 260 : 400,
            height: Ext.is.Phone ? 220 : 400,
            styleHtmlContent: true,
            dockedItems: overlayTb,
            scroll: 'vertical',
            contentEl: 'lipsum',
            cls: 'htmlcontent'
        });

        var showOverlay = function(btn, event) {
            overlay.setCentered(false);
            overlayTb.setTitle('Attached Overlay');
            overlay.showBy(btn);
        };
        
        var showCenteredOverlay = function(btn, event) {
            overlay.setCentered(true);
            overlayTb.setTitle('Centered Overlay');
            overlay.show();
        };

        if (Ext.is.Phone) {
            var dockedItems = [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    text: 'showBy',
                    handler: showOverlay                    
                }]
            }, {
                dock: 'bottom',
                xtype: 'toolbar',
                items: [{
                    text: 'show (centered)',
                    handler: showCenteredOverlay             
                }, {xtype: 'spacer'}, {
                    text: 'showBy',
                    handler: showOverlay
                }]
            }];
        }
        else {
            var dockedItems = [{
                dock: 'bottom',
                xtype: 'toolbar',
                items: [{
                    text: 'showBy',
                    handler: showOverlay
                }, {xtype: 'spacer'}, {
                    text: 'show (centered)',
                    handler: showCenteredOverlay
                }, {xtype: 'spacer'}, {
                    text: 'showBy',
                    handler: showOverlay
                }]
            }];
        }
        
        new Ext.Panel({
            fullscreen: true,
            dockedItems: dockedItems,
            html: "Test the overlay by using the buttons below."
        });
    }
});