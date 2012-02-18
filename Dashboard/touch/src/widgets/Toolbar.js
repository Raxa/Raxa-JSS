/**
 * @class Ext.Toolbar
 * @extends Ext.Container
 *
 * <p>Toolbars are most commonly used as dockedItems within an Ext.Panel. They can
 * be docked at the 'top' or 'bottom' of a Panel by specifying the dock config.</p>
 *
 * <p>The {@link #defaultType} of Toolbar's is '{@link Ext.Button button}'.</p>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Toolbar/screenshot.png Ext.Toolbar screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
var myToolbar = new Ext.Toolbar({
    dock : 'top',
    title: 'My Toolbar',
    items: [
        {
            text: 'My Button'
        }
    ]
});

var myPanel = new Ext.Panel({
    dockedItems: [myToolbar],
    fullscreen : true,
    html       : 'Test Panel'
});</code></pre>
 * @xtype toolbar
 */
Ext.Toolbar = Ext.extend(Ext.Container, {
    // private
    isToolbar: true,
    
    /**
     * @cfg {xtype} defaultType
     * The default xtype to create. (Defaults to 'button')
     */
    defaultType: 'button',

    /**
     * @cfg {String} baseCls
     * The base CSS class to apply to the Carousel's element (defaults to <code>'x-toolbar'</code>).
     */
    baseCls: 'x-toolbar',

    /**
     * @cfg {String} titleCls
     * The CSS class to apply to the titleEl (defaults to <code>'x-toolbar-title'</code>).
     */
    titleCls: 'x-toolbar-title',

    /**
     * @cfg {String} ui
     * Style options for Toolbar. Default is 'dark'. 'light' is also available.
     */
    ui: 'dark',

    /**
     * @cfg {Object} layout (optional)
     * A layout config object. A string is NOT supported here.
     */
    layout: null,

    /**
     * @cfg {String} title (optional)
     * The title of the Toolbar.
     */

    // properties

    /**
     * The title Element
     * @property titleEl
     * @type Ext.Element
     */
    titleEl: null,

    initComponent : function() {
        this.layout = Ext.apply({}, this.layout || {}, {
            type: 'hbox',
            align: 'center'
        });
        Ext.Toolbar.superclass.initComponent.call(this);
    },

    afterRender : function() {
        Ext.Toolbar.superclass.afterRender.call(this);

        if (this.title) {
            this.titleEl = this.el.createChild({
                cls: this.titleCls,
                html: this.title
            });
        }
    },

    /**
     * Set the title of the Toolbar
     * @param title {String} This can be arbitrary HTML.
     */
    setTitle : function(title) {
        this.title = title;
        if (this.rendered) {
            if (!this.titleEl) {
                this.titleEl = this.el.createChild({
                    cls: this.titleCls,
                    html: this.title
                });
            }
            this.titleEl.setHTML(title);
        }
    },

    /**
     * Show the title if it exists.
     */
    showTitle : function() {
        if (this.titleEl) {
            this.titleEl.show();
        }
    },

    /**
     * Hide the title if it exists.
     */
    hideTitle : function() {
        if (this.titleEl) {
            this.titleEl.hide();
        }
    }
});

Ext.reg('toolbar', Ext.Toolbar);


/**
 * @class Ext.Spacer
 * @extends Ext.Component
 * 
 * <p>By default the spacer component will take up a flex of 1 unless a width is set.</p>
 * 
 * <p>Example usage:</p>
 * <pre><code>
var toolbar = new Ext.Toolbar({
    title: 'Toolbar Title',
    
    items: [
        {xtype: 'spacer'},
        {
            xtype: 'Button',
            text : 'Button!'
        }
    ]
});
 * </code></pre>
 * 
 * @xtype spacer
 */
Ext.Spacer = Ext.extend(Ext.Component, {
    initComponent : function() {
        if (!this.width) {
            this.flex = 1;
        }

        Ext.Spacer.superclass.initComponent.call(this);
    },

    onRender : function() {
        Ext.Spacer.superclass.onRender.apply(this, arguments);

        if (this.flex) {
            this.el.setStyle('-webkit-box-flex', this.flex);
        }
    }
});

Ext.reg('spacer', Ext.Spacer);