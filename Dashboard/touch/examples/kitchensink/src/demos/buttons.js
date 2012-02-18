// wrapping in closure to avoid global var
(function() {

var cfg = {
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },
    cls: 'card1',
    scroll: 'vertical',
    defaults: {
        layout: {
            type: 'hbox'
        },
        flex: 1,
        defaults: {
            xtype: 'button',
            cls: 'demobtn',
            flex: 1
        }
    }
};

if (Ext.is.Phone) {
    cfg.items = [{
        items: [
            { text: 'Normal' },
            { ui: 'round', text: 'Round' }
        ]
    }, {
        items: [
            { ui: 'decline', text: 'Drastic' },
            { ui: 'decline-round', text: 'Round' }
            
        ]
    }, {
        items: [
            { ui: 'confirm', text: 'Confirm' },
            { ui: 'confirm-round', text: 'Round' }
        ]
    }, {
        items: [
            { ui: 'small', text: 'Small' },
            { ui: 'decline-small', text: 'Small' },
            { ui: 'confirm-small', text: 'Small' }
        ]
    }];
} else {
    cfg.items = [{
        items: [
            { text: 'Normal' },
            { ui: 'round', text: 'Round' },
            { ui: 'small', text: 'Small' }
        ]
    }, {
        items: [
            { ui: 'decline', text: 'Decline' },
            { ui: 'decline-round', text: 'Round' },
            { ui: 'decline-small', text: 'Small' }
        ]
    }, {
        items: [
            { ui: 'confirm', text: 'Confirm' },
            { ui: 'confirm-round', text: 'Round' },
            { ui: 'confirm-small', text: 'Small' },
            { ui: 'back', text: 'Back' }
        ]
    }];

    cfg.dockedItems = [{
        xtype: 'toolbar',
        dock: 'bottom',
        defaults: {
            xtype: 'button',
            text: 'Test',
            flex: 1
        },
        items: [{
            ui: 'round'
        }, {
            ui: 'drastic'
        }, {
            ui: 'action'
        }, {
            ui: 'decline-round'
        }, {
            ui: 'decline-small'
        }, {
            ui: 'confirm-round'
        }, {
            ui: 'confirm-small'
        }]
    }];
}

demos.Buttons = new Ext.Panel(cfg);

})();