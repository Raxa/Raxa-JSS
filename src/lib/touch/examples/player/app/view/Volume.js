Ext.define('Player.view.Volume', {
    extend : 'Ext.Panel',
    xtype  : 'volume',

    config : {
        layout        : 'fit',
        centered      : true,
        height        : 75,
        width         : 300,
        modal         : true,
        hideOnMaskTap : true,
        lastVolume    : 1,
        volume        : 1,
        muted         : false,
        items         : [
            {
                xtype     : 'sliderfield',
                minValue  : 0,
                maxValue  : 1,
                increment : 0.1
            }
        ],

        control       : {
            'sliderfield' : {
                change : 'fireChange'
            }
        }
    },

    initialize : function() {
        this.callParent(arguments);

        this.setLastVolume(this.getVolume());
    },

    fireChange : function(field, volume) {
        this.fireEvent('change', this, volume[0], field);
    }
});