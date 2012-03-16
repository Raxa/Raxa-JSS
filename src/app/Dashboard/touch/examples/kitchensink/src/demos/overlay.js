demos.Overlay = new Ext.Panel({
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    items: [{
        xtype: 'button',
        text: 'Launch Overlay',
        handler: function() {
            if (!this.popup) {
                this.popup = new Ext.Panel({
                    floating: true,
                    modal: true,
                    centered: true,
                    width: 200,
                    styleHtmlContent: true,
                    html: '<p>This is a modal, centered and floating panel. hideOnMaskTap is true by default so ' +
                          'we can tap anywhere outside the overlay to hide it.</p>',
                    dockedItems: [{
                        dock: 'top',
                        xtype: 'toolbar',
                        title: 'Overlay Title'
                    }],
                    scroll: 'vertical'
                });
            }
            this.popup.show('pop');
        }
    }]
});