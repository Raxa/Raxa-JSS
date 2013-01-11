Ext.define("Screener.view.VitalViewListener", {
    xtype: 'vitalsListenerForm',
    extend: 'Ext.field.Number',
    config: {
        listeners: [
        {
            event: 'blur',
            fn: function(obj) {
                if(obj._value !== null && obj._value !== "") {
                    if( obj.config.maxValue < obj._value || obj._value < obj.config.minValue) {
                        alert("Error","Value should be in between "+obj.config.minValue+" and "+obj.config.maxValue);
                        this.reset();
                    }
                }
            }
        }
        ]
    }
});
