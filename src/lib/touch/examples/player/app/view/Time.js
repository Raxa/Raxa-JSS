Ext.define('Player.view.Time', {
    extend : 'Ext.Component',
    xtype  : 'time',

    config : {
        cls      : 'white-text',
        duration : 0,
        width    : 50,
        tpl      : new Ext.XTemplate(
            '{[Player.util.Format.timeRenderer(values.duration)]}'
        )
    },

    updateDuration : function(time) {
        this.setData({
            duration : time
        });
    }
});