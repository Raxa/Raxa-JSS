Ext.define('Kitchensink.view.TouchEvents', {
    extend: 'Ext.Container',

    requires: [
        'Kitchensink.view.touchevent.Info',
        'Kitchensink.view.touchevent.Logger',
        'Kitchensink.view.touchevent.Pad'
    ],
    
    initialize: function() {
        this.callParent(arguments);

        this.getEventDispatcher().addListener('element', '#touchpad', '*', this.onTouchPadEvent, this);
    },
    
    onTouchPadEvent: function(a, b, c, d) {
        var name = d.info.eventName;

        if (!name.match("mouse") && !name.match("click")) {
            this.down('toucheventlogger').addLog(name);
        }
    }
});