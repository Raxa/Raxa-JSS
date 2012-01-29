Ext.define('Player.view.phone.MediaList', {
    extend : 'Ext.Sheet',
    xtype  : 'phone-medialist',

    requires : [
        'Ext.List',
        'Ext.XTemplate',
        'Player.store.Media'
    ],

    config : {
        stretchY      : true,
        stretchX      : true,
        enter         : 'left',
        exit          : 'left',
        layout        : 'fit',
        hideOnMaskTap : true,
        items : [
            {
                xtype            : 'list',
                onItemDisclosure : true,
                store            : 'Media',
                itemTpl          : new Ext.XTemplate(
                    '<div class="media-list-name">{name}</div>',
                    '<div class="media-list-detail">{type} {[Player.util.Format.timeRenderer(values.duration)]}</div>'
                )
            },
            {
                xtype            : 'toolbar',
                docked           : 'bottom',
                items            : [
                    {
                        xtype  : 'spacer'
                    },
                    {
                        text   : 'Close',
                        ui     : 'decline',
                        action : 'close'
                    }
                ]
            }
        ],

        control : {
            'button' : {
                tap      : 'fireButton'
            },
            'list'   : {
                disclose : 'fireDisclose'
            }
        }
    },

    fireButton   : function(btn) {
        this.fireEvent('button' + btn.action, this, btn);
    },

    fireDisclose : function(list, rec) {
        this.fireEvent('disclose', list, rec);
    }
});