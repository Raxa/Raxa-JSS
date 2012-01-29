/**
 * @private
 */
Ext.define('Ext.Validator', {
    singleton: true,

    number: function(value, name) {
        if (!name) {
            name = 'value';
        }

        if (typeof value != 'number') {
            Ext.Logger.error('Invalid ' + name + ', must be a valid number', 2);
        }
    },

    among: function(value, values, name) {
        if (!name) {
            name = 'value';
        }

        if (values.indexOf(value) === -1) {
            Ext.Logger.error('Invalid ' + name + ', must be either of these value: "' + values.join('", "') +'"', 2);
        }
    },

    element: function(value, name) {
        if (!name) {
            name = 'value';
        }

        if (typeof value != 'string' && !value.nodeType && !(value instanceof Ext.Element)) {
            Ext.Logger.error('Invalid ' + name + ', must be either a DOM element\'s id, a DOM element reference or an instance of Ext.Element', 2);
        }
    }
});
