Ext.define('Player.view.Seeker', {
    extend : 'Ext.form.Slider',
    xtype  : 'seeker',

    config : {
        locked    : false,
        minValue  : 0,
        maxValue  : 1,
        increment : 0.001
    },

    initialize : function() {
        this.callParent(arguments);

        this.getComponent().on({
            scope          : this,
            userchange     : 'bubbleUserChange',
            thumbdragstart : 'bubbleThumbDragStart',
            thumbdragend   : 'bubbleThumbDragEnd'
        });
    },

    bubbleUserChange : function(slider, value) {
        this.fireEvent('userchange', this, value);
    },

    bubbleThumbDragStart : function() {
        this.fireEvent('thumbdragstart', this);
    },

    bubbleThumbDragEnd : function() {
        this.fireEvent('thumbdragend', this);
    }
});