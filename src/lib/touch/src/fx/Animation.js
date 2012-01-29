/**
 * @author Jacky Nguyen <jacky@sencha.com>
 */
Ext.define('Ext.fx.Animation', {

    requires: [
        'Ext.fx.animation.Slide',
        'Ext.fx.animation.Fade',
        'Ext.fx.animation.Flip',
        'Ext.fx.animation.Pop',
        'Ext.fx.animation.Cube'
    ],

    constructor: function(config) {
        var defaultClass = Ext.fx.animation.Abstract,
            type;

        if (typeof config == 'string') {
            type = config;
            config = {};
        }
        else if (config.type) {
            type = config.type;
        }

        if (type) {
            defaultClass = Ext.ClassManager.getByAlias('animation.' + type);

            //<debug error>
            if (!defaultClass) {
                Ext.Logger.error("Invalid animation type of: '" + type + "'");
            }
            //</debug>
        }

        return Ext.factory(config, defaultClass);
    }
});
