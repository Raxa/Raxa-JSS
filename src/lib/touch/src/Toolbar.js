/**
 * {@link Ext.Toolbar}s are most commonly used as docked items as within a {@link Ext.Container}. They can be docked either `top` or `bottom` using the {@link #docked} configuration.
 * 
 * The {@link #defaultType} of {@link Ext.Toolbar} is {@link Ext.Button}.
 * 
 * ## Notes
 * 
 * You must use a HTML5 doctype for {@link #docked} `bottom` to work. To do this, simply add the following code to the HTML file:
 * 
 *     <!doctype html>
 * 
 * So your index.html file should look a little like this:
 * 
 *     <!doctype html>
 *     <html>
 *         <head>
 *             <title>MY application title</title>
 *             ...
 * 
 * ## Examples
 * 
 *     @example miniphone preview
 *     Ext.create('Ext.Container', {
 *         fullscreen: true,
 *         layout: {
 *             type: 'vbox',
 *             pack: 'center'
 *         },
 *         items: [
 *             {
 *                 xtype : 'toolbar',
 *                 docked: 'top',
 *                 title: 'My Toolbar'
 *             },
 *             {
 *                 xtype: 'container',
 *                 layout: {
 *                     type: 'vbox',
 *                     pack: 'center'
 *                 },
 *                 defaults: {
 *                     xtype: 'button',
 *                     margin: '10 10 0 10'
 *                 },
 *                 items: [
 *                     {
 *                         text: 'Toggle docked',
 *                         handler: function() {
 *                             var toolbar = Ext.ComponentQuery.query('toolbar')[0],
 *                                 newDocked = (toolbar.getDocked() == 'top') ? 'bottom' : 'top';
 * 
 *                             toolbar.setDocked(newDocked);
 *                         }
 *                     },
 *                     {
 *                         text: 'Toggle UI',
 *                         handler: function() {
 *                             var toolbar = Ext.ComponentQuery.query('toolbar')[0],
 *                                 newUi = (toolbar.getUi() == 'light') ? 'dark' : 'light';
 * 
 *                             toolbar.setUi(newUi);
 *                         }
 *                     },
 *                     {
 *                         text: 'Change title',
 *                         handler: function() {
 *                             var toolbar = Ext.ComponentQuery.query('toolbar')[0],
 *                                 titles = ['My Toolbar', 'Ext.Toolbar', 'Configurations are awesome!', 'Beautiful.'],
                                   //internally, the title configuration gets converted into a {@link Ext.Title} component,
                                   //so you must get the title configuration of that component
 *                                 title = toolbar.getTitle().getTitle(),
 *                                 newTitle = titles[titles.indexOf(title) + 1] || titles[0];
 * 
 *                             toolbar.setTitle(newTitle);
 *                         }
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 */
Ext.define('Ext.Toolbar', {
    extend: 'Ext.Container',
    xtype : 'toolbar',

    requires: [
        'Ext.Button',
        'Ext.Title',
        'Ext.Spacer'
    ],

    // private
    isToolbar: true,

    config: {
        // @inherit
        baseCls: Ext.baseCSSPrefix + 'toolbar',

        /**
         * @cfg {String} ui
         * The ui for this {@link Ext.Toolbar}. Either 'light' or 'dark'. Cou can create more UIs by using using the CSS Mixin {@link #sencha-toolbar-ui}
         * @accessor
         */
        ui: 'dark',

        /**
         * @cfg {String} title
         * The title of the toolbar.
         * @accessor
         */
        title: null,

        /**
         * @cfg {String} defaultType
         * The default xtype to create.
         * @accessor
         */
        defaultType: 'button',

        /**
         * @cfg {String} docked
         * The docked position for this {@link Ext.Toolbar}. Must be either `top` or `bottom`.
         * @accessor
         */

        // @private
        layout: {
            type: 'hbox',
            align: 'center'
        }
    },

    // @private
    applyTitle: function(title) {
        if (typeof title == 'string') {
            title = {
                title: title,
                centered: true
            };
        }

        return Ext.factory(title, Ext.Title, this.getTitle());
    },

    // @private
    updateTitle: function(newTitle, oldTitle) {
        if (newTitle) {
            this.add(newTitle);
            this.getLayout().setItemFlex(newTitle, 1);
        }

        if (oldTitle) {
            oldTitle.destroy();
        }
    },

    /**
     * Shows the title if it exists.
     */
    showTitle: function() {
        var title = this.getTitle();

        if (title) {
            title.show();
        }
    },

    /**
     * Hides the title if it exists.
     */
    hideTitle: function() {
        var title = this.getTitle();

        if (title) {
            title.hide();
        }
    }

    /**
     * Returns an {@link Ext.Title} component.
     * @member Ext.Toolbar
     * @method getTitle
     * @return {Ext.Title}
     */
    
    /**
     * Use this to update the {@link #title} configuration.
     * @member Ext.Toolbar
     * @method setTitle
     * @param {String/Ext.Title} title You can either pass a String, or a config/instance of Ext.Title
     */
});
