/*
 * @class Ext.util.Translatable
 *
 * The utility class to abstract different implementations to have the best performance when applying 2D translation
 * on any DOM element.
 *
 * @private
 */
Ext.define('Ext.util.Translatable', {
    requires: [
        'Ext.util.translatable.CssTransform',
        'Ext.util.translatable.ScrollPosition'
    ],

    constructor: function(config) {
        if (Ext.os.is.Android2) {
            return new Ext.util.translatable.ScrollPosition(config);
        }

        return new Ext.util.translatable.CssTransform(config);
    }
});
