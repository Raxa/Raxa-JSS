/**
 * {@link Ext.Title} is used for the {@link Ext.Toolbar#title} configuration in the {@link Ext.Toolbar} component.
 */
Ext.define('Ext.Title', {
    extend: 'Ext.Component',
    xtype: 'title',
    
    config: {
        // @inherit
        baseCls: 'x-title',

        /**
         * @cfg {String} title The title text
         */
        title: ''
    },

    // @private
    updateTitle: function(newTitle) {
        this.setHtml(newTitle);
    }
});