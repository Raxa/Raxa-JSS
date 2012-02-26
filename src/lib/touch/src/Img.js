/**
 * This is a simple way to add an image of any size to your application and have it participate in the layout system
 * like any other component. This component typically takes between 1 and 3 configurations - a {@link #src}, and
 * optionally a {@link #height} and a {@link #width}:
 *
 *     Ext.create('Ext.Img', {
 *         src: 'path/to/my/image.jpg',
 *         height: 300,
 *         width: 400
 *     });
 *
 * It's also easy to add an image into a panel or other container using its xtype:
 *
 *     Ext.create('Ext.Panel', {
 *         layout: '{@link Ext.layout.HBox hbox}',
 *         items: [
 *             {
 *                 xtype: 'image',
 *                 src: 'path/to/my/profilePicture.jpg',
 *                 flex: 1
 *             },
 *             {
 *                 xtype: 'textareafield',
 *                 flex: 2,
 *                 label: {
 *                     text: 'My Profile',
 *                     align: 'top'
 *                 }
 *             }
 *         ]
 *     });
 *
 * Here we created a panel which contains an image (a profile picture in this case) and a text area to allow the user
 * to enter profile information about themselves. In this case we used an {@link Ext.layout.HBox hbox layout} and
 * flexed the image to take up one third of the width and the text area to take two thirds of the width. See the
 * {@link Ext.layout.HBox hbox docs} for more information on flexing items.
 */
Ext.define('Ext.Img', {
    extend: 'Ext.Component',
    xtype: ['image', 'img'],

    /**
     * @event tap
     * Fires whenever the component is tapped
     * @param {Ext.Img} this The Image instance
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event load
     * Fires when the image is loaded
     * @param {Ext.Img} this The Image instance
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event error
     * Fires if an error occured when trying to load the image
     * @param {Ext.Img} this The Image instance
     * @param {Ext.EventObject} e The event object
     */

    config: {
        /**
         * @cfg {String} src The source of this image
         * @accessor
         */
        src: null,

        // @inherit
        baseCls: Ext.baseCSSPrefix + 'img',

        mode: 'background'
    },

    beforeInitialize: function() {
        var me = this;
        me.onLoad = Ext.Function.bind(me.onLoad, me);
        me.onError = Ext.Function.bind(me.onError, me);
    },

    initialize: function() {
        var me = this;
        me.callParent();

        me.relayEvents(me.renderElement, '*');

        me.element.on({
            tap: 'onTap',
            scope: me
        });
    },

    hide: function() {
        this.callParent();
        this.hiddenSrc = this.hiddenSrc || this.getSrc();
        this.setSrc(null);
    },

    show: function() {
        this.callParent();
        if (this.hiddenSrc) {
            this.setSrc(this.hiddenSrc);
            delete this.hiddenSrc;
        }
    },

    updateMode: function(mode) {
        if (mode === 'background') {
            if (this.imageElement) {
                this.imageElement.destroy();
                delete this.imageElement;
                this.updateSrc(this.getSrc());
            }
        }
        else {
            this.imageElement = this.element.createChild({ tag: 'img' });
        }
    },

    onTap: function(e) {
        this.fireEvent('tap', this, e);
    },

    onAfterRender: function() {
        this.updateSrc(this.getSrc());
    },

    /**
     * @private
     */
    updateSrc: function(newSrc) {
        var me = this,
            dom;

        if (me.getMode() === 'background') {
            dom = this.imageObject || new Image();
        }
        else {
            dom = me.imageElement.dom;
        }

        this.imageObject = dom;

        dom.setAttribute('src', newSrc);
        dom.addEventListener('load', me.onLoad, false);
        dom.addEventListener('error', me.onError, false);
    },

    detachListeners: function() {
        var dom = this.imageObject;

        dom.removeEventListener('load', this.onLoad, false);
        dom.removeEventListener('error', this.onError, false);
    },

    onLoad : function(e) {
        this.detachListeners();

        if (this.getMode() === 'background') {
            this.element.dom.style.backgroundImage = 'url("' + this.imageObject.src + '")';
        }

        this.fireEvent('load', this, e);
    },

    onError : function(e) {
        this.detachListeners();
        this.fireEvent('error', this, e);
    },

    doSetWidth: function(width) {
        var sizingElement = (this.getMode() === 'background') ? this.element : this.imageElement;

        sizingElement.setWidth(width);

        this.callParent(arguments);
    },

    doSetHeight: function(height) {
        var sizingElement = (this.getMode() === 'background') ? this.element : this.imageElement;

        sizingElement.setHeight(height);

        this.callParent(arguments);
    },

    destroy: function() {
        this.detachListeners();

        Ext.destroy(this.imageElement);
        delete this.imageObject;

        this.callParent();
    }
});
