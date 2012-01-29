Ext.define('Override.slider.Slider', {
    override : 'Ext.slider.Slider',

    onThumbDrag : function() {
        this.callOverridden(arguments);

        this.fireUserChangeEvent();
    },

    onTap : function() {
        this.callOverridden(arguments);

        this.fireUserChangeEvent();
    },

    fireUserChangeEvent : function() {
        this.fireEvent('userchange', this, this.getValue());
    },

    onThumbDragStart : function() {
        this.fireEvent('thumbdragstart', this);

        this.callOverridden(arguments);
    },

    onThumbDragEnd : function() {
        this.callOverridden(arguments);

        this.fireEvent('thumbdragend', this);
    }
});