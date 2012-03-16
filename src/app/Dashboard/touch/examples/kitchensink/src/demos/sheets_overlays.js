demos.SheetsOverlays = new Ext.Panel({
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },
    defaults: {
        xtype: 'button',
        cls: 'demobtn',
        ui: 'round'
    },
    items: [{
        text: 'Action Sheet',
        handler: function() {
            if (!this.actions) {
                this.actions = new Ext.ActionSheet({
                    items: [{
                        text: 'Delete draft',
                        ui: 'decline',
                        handler : Ext.emptyFn
                    },{
                        text : 'Save draft',
                        handler : Ext.emptyFn
                    },{
                        text : 'Cancel',
                        scope : this,
                        handler : function(){
                            this.actions.hide();
                        }
                    }]
                });
            }
            this.actions.show();
        }
    }, {
        text: 'Overlay',
        handler: function() {
            if (!this.popup) {
                this.popup = new Ext.Panel({
                    floating: true,
                    modal: true,
                    centered: true,
                    width: 300,
                    height: 200,
                    styleHtmlContent: true,
                    scroll: 'vertical',
                    html: '<p>This is a modal, centered and floating panel. hideOnMaskTap is true by default so ' +
                          'we can tap anywhere outside the overlay to hide it.</p>',
                    dockedItems: [{
                        dock: 'top',
                        xtype: 'toolbar',
                        title: 'Overlay Title'
                    }]
                });
            }
            this.popup.show('pop');
        }
    },{
        text: 'Alert',
        handler: function() {
            Ext.Msg.alert('Title', 'The quick brown fox jumped over the lazy dog.', Ext.emptyFn);
        }
    },{
        text: 'Prompt',
        handler: function() {
            Ext.Msg.prompt("Welcome!", "What's your first name?", Ext.emptyFn);
        }
    },{
        text: 'Confirm',
        handler: function() {
            Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", Ext.emptyFn);
        }
    }]
});