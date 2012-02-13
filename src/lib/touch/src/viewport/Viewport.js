/*
 * This class acts as a factory for environment-specific viewport implementations.
 *
 * Please refer to the {@link Ext.Viewport} documentation about using the global instance.
 * @private
 */
Ext.define('Ext.viewport.Viewport', {
    requires: [
        'Ext.viewport.Ios',
        'Ext.viewport.Android'
    ],

    constructor: function(config) {
        var osName = Ext.os.name,
            viewportName, viewport;

        switch (osName) {
            case 'Android':
                viewportName = 'Android';
                break;

            case 'iOS':
                viewportName = 'Ios';
                break;

            default:
                viewportName = 'Default';
        }

        viewport = Ext.create('Ext.viewport.' + viewportName, config);

        return viewport;
    }
});