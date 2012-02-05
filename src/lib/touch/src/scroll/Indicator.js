Ext.define('Ext.scroll.Indicator', {
    requires: [
        'Ext.scroll.indicator.ScrollPosition',
        'Ext.scroll.indicator.CssTransform'
    ],
    
    alternateClassName: 'Ext.util.Indicator',

    constructor: function(config) {
        if (Ext.os.is.Android2) {
            return new Ext.scroll.indicator.ScrollPosition(config);
        }
        else {
            return new Ext.scroll.indicator.CssTransform(config);
        }
    }
});
