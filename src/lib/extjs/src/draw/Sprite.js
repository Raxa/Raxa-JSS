/**
 * A Sprite is an object rendered in a Drawing surface.
 *
 * # Translation
 *
 * For translate, the configuration object contains x and y attributes that indicate where to
 * translate the object. For example:
 *
 *     sprite.setAttributes({
 *       translate: {
 *        x: 10,
 *        y: 10
 *       }
 *     }, true);
 *
 *
 * # Rotation
 *
 * For rotation, the configuration object contains x and y attributes for the center of the rotation (which are optional),
 * and a `degrees` attribute that specifies the rotation in degrees. For example:
 *
 *     sprite.setAttributes({
 *       rotate: {
 *        degrees: 90
 *       }
 *     }, true);
 *
 * That example will create a 90 degrees rotation using the centroid of the Sprite as center of rotation, whereas:
 *
 *     sprite.setAttributes({
 *       rotate: {
 *        x: 0,
 *        y: 0,
 *        degrees: 90
 *       }
 *     }, true);
 *
 * will create a rotation around the `(0, 0)` axis.
 *
 *
 * # Scaling
 *
 * For scaling, the configuration object contains x and y attributes for the x-axis and y-axis scaling. For example:
 *
 *     sprite.setAttributes({
 *       scale: {
 *        x: 10,
 *        y: 3
 *       }
 *     }, true);
 *
 * You can also specify the center of scaling by adding `cx` and `cy` as properties:
 *
 *     sprite.setAttributes({
 *       scale: {
 *        cx: 0,
 *        cy: 0,
 *        x: 10,
 *        y: 3
 *       }
 *     }, true);
 *
 * That last example will scale a sprite taking as centers of scaling the `(0, 0)` coordinate.
 *
 *
 * # Creating and adding a Sprite to a Surface
 *
 * Sprites can be created with a reference to a {@link Ext.draw.Surface}
 *
 *     var drawComponent = Ext.create('Ext.draw.Component', options here...);
 *
 *     var sprite = Ext.create('Ext.draw.Sprite', {
 *         type: 'circle',
 *         fill: '#ff0',
 *         surface: drawComponent.surface,
 *         radius: 5
 *     });
 *
 * Sprites can also be added to the surface as a configuration object:
 *
 *     var sprite = drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#ff0',
 *         radius: 5
 *     });
 *
 * In order to properly apply properties and render the sprite we have to
 * `show` the sprite setting the option `redraw` to `true`:
 *
 *     sprite.show(true);
 *
 * The constructor configuration object of the Sprite can also be used and passed into the {@link Ext.draw.Surface}
 * add method to append a new sprite to the canvas. For example:
 *
 *     drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#ffc',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 */
Ext.define('Ext.draw.Sprite', {

    /* Begin Definitions */

    mixins: {
        observable: 'Ext.util.Observable',
        animate: 'Ext.util.Animate'
    },

    requires: ['Ext.draw.SpriteDD'],

    /* End Definitions */

    /**
     * @cfg {String} type The type of the sprite. Possible options are 'circle', 'path', 'rect', 'text', 'square', 'image'
     */

    /**
     * @cfg {Number} width Used in rectangle sprites, the width of the rectangle
     */

    /**
     * @cfg {Number} height Used in rectangle sprites, the height of the rectangle
     */

    /**
     * @cfg {Number} size Used in square sprites, the dimension of the square
     */

    /**
     * @cfg {Number} radius Used in circle sprites, the radius of the circle
     */

    /**
     * @cfg {Number} x The position along the x-axis
     */

    /**
     * @cfg {Number} y The position along the y-axis
     */

    /**
     * @cfg {String} path Used in path sprites, the path of the sprite written in SVG-like path syntax.
     */

    /**
     * @cfg {Number} opacity The opacity of the sprite. A number between 0 and 1.
     */

    /**
     * @cfg {String} fill The fill color
     */

    /**
     * @cfg {String} stroke The stroke color
     */

    /**
     * @cfg {Number} stroke-width The width of the stroke
     */

    /**
     * @cfg {String} font Used with text type sprites. The full font description. Uses the same syntax as the CSS font parameter
     */

    /**
     * @cfg {String} text Used with text type sprites. The text itself
     */

    /**
     * @cfg {String/String[]} group The group that this sprite belongs to, or an array of groups. Only relevant when added to a
     * {@link Ext.draw.Surface}
     */

    /**
     * @cfg {Boolean} draggable True to make the sprite draggable.
     */

    dirty: false,
    dirtyHidden: false,
    dirtyTransform: false,
    dirtyPath: true,
    dirtyFont: true,
    zIndexDirty: true,

    /**
     * @property {Boolean} isSprite
     * `true` in this class to identify an object as an instantiated Sprite, or subclass thereof.
     */
    isSprite: true,
    zIndex: 0,
    fontProperties: [
        'font',
        'font-size',
        'font-weight',
        'font-style',
        'font-family',
        'text-anchor',
        'text'
    ],
    pathProperties: [
        'x',
        'y',
        'd',
        'path',
        'height',
        'width',
        'radius',
        'r',
        'rx',
        'ry',
        'cx',
        'cy'
    ],
    constructor: function(config) {
        var me = this;
        config = Ext.merge({}, config || {});
        me.id = Ext.id(null, 'ext-sprite-');
        me.transformations = [];
        Ext.copyTo(this, config, 'surface,group,type,draggable');
        //attribute bucket
        me.bbox = {};
        me.attr = {
            zIndex: 0,
            translation: {
                x: null,
                y: null
            },
            rotation: {
                degrees: null,
                x: null,
                y: null
            },
            scaling: {
                x: null,
                y: null,
                cx: null,
                cy: null
            }
        };
        //delete not bucket attributes
        delete config.surface;
        delete config.group;
        delete config.type;
        delete config.draggable;
        me.setAttributes(config);
        me.addEvents(
            /**
             * @event
             * Fires before the sprite is destroyed. Return false from an event handler to stop the destroy.
             * @param {Ext.draw.Sprite} this
             */
            'beforedestroy',
            /**
             * @event
             * Fires after the sprite is destroyed.
             * @param {Ext.draw.Sprite} this
             */
            'destroy',
            /**
             * @event
             * Fires after the sprite markup is rendered.
             * @param {Ext.draw.Sprite} this
             */
            'render',
            /**
             * @event
             * @inheritdoc Ext.dom.Element#mousedown
             */
            'mousedown',
            /**
             * @event
             * @inheritdoc Ext.dom.Element#mouseup
             */
            'mouseup',
            /**
             * @event
             * @inheritdoc Ext.dom.Element#mouseover
             */
            'mouseover',
            /**
             * @event
             * @inheritdoc Ext.dom.Element#mouseout
             */
            'mouseout',
            /**
             * @event
             * @inheritdoc Ext.dom.Element#mousemove
             */
            'mousemove',
            /**
             * @event
             * @inheritdoc Ext.dom.Element#click
             */
            'click'
        );
        me.mixins.observable.constructor.apply(this, arguments);
    },

    /**
     * @property {Ext.dd.DragSource} dd
     * If this Sprite is configured {@link #draggable}, this property will contain
     * an instance of {@link Ext.dd.DragSource} which handles dragging the Sprite.
     *
     * The developer must provide implementations of the abstract methods of {@link Ext.dd.DragSource}
     * in order to supply behaviour for each stage of the drag/drop process. See {@link #draggable}.
     */

    initDraggable: function() {
        var me = this;
        me.draggable = true;
        //create element if it doesn't exist.
        if (!me.el) {
            me.surface.createSpriteElement(me);
        }
        me.dd = new Ext.draw.SpriteDD(me, Ext.isBoolean(me.draggable) ? null : me.draggable);
        me.on('beforedestroy', me.dd.destroy, me.dd);
    },

    /**
     * Change the attributes of the sprite.
     * @param {Object} attrs attributes to be changed on the sprite.
     * @param {Boolean} redraw Flag to immediatly draw the change.
     * @return {Ext.draw.Sprite} this
     */
    setAttributes: function(attrs, redraw) {
        var me = this,
            fontProps = me.fontProperties,
            fontPropsLength = fontProps.length,
            pathProps = me.pathProperties,
            pathPropsLength = pathProps.length,
            hasSurface = !!me.surface,
            custom = hasSurface && me.surface.customAttributes || {},
            spriteAttrs = me.attr,
            dirtyBBox = false,
            attr, i, newTranslation, translation, newRotate, rotation, newScaling, scaling;

        attrs = Ext.apply({}, attrs);
        for (attr in custom) {
            if (attrs.hasOwnProperty(attr) && typeof custom[attr] == "function") {
                Ext.apply(attrs, custom[attr].apply(me, [].concat(attrs[attr])));
            }
        }

        // Flag a change in hidden
        if (!!attrs.hidden !== !!spriteAttrs.hidden) {
            me.dirtyHidden = true;
        }

        // Flag path change
        for (i = 0; i < pathPropsLength; i++) {
            attr = pathProps[i];
            if (attr in attrs && attrs[attr] !== spriteAttrs[attr]) {
                me.dirtyPath = true;
                dirtyBBox = true;
                break;
            }
        }

        // Flag zIndex change
        if ('zIndex' in attrs) {
            me.zIndexDirty = true;
        }

        // Flag font/text change
        if ('text' in attrs) {
            me.dirtyFont = true;
            dirtyBBox = true;
        }

        for (i = 0; i < fontPropsLength; i++) {
            attr = fontProps[i];
            if (attr in attrs && attrs[attr] !== spriteAttrs[attr]) {
                me.dirtyFont = true;
                dirtyBBox = true;
                break;
            }
        }

        newTranslation = attrs.translation || attrs.translate;
        delete attrs.translate;
        delete attrs.translation;
        translation = spriteAttrs.translation;
        if (newTranslation) {
            if (('x' in newTranslation && newTranslation.x !== translation.x) ||
                ('y' in newTranslation && newTranslation.y !== translation.y)) {
                me.dirtyTransform = true;
                translation.x = newTranslation.x;
                translation.y = newTranslation.y;
            }
        }

        newRotate = attrs.rotation || attrs.rotate;
        rotation = spriteAttrs.rotation;
        delete attrs.rotate;
        delete attrs.rotation;
        if (newRotate) {
            if (('x' in newRotate && newRotate.x !== rotation.x) ||
                ('y' in newRotate && newRotate.y !== rotation.y) ||
                ('degrees' in newRotate && newRotate.degrees !== rotation.degrees)) {
                me.dirtyTransform = true;
                rotation.x = newRotate.x;
                rotation.y = newRotate.y;
                rotation.degrees = newRotate.degrees;
            }
        }

        newScaling = attrs.scaling || attrs.scale;
        scaling = spriteAttrs.scaling;
        delete attrs.scale;
        delete attrs.scaling;
        if (newScaling) {
            if (('x' in newScaling && newScaling.x !== scaling.x) ||
                ('y' in newScaling && newScaling.y !== scaling.y) ||
                ('cx' in newScaling && newScaling.cx !== scaling.cx) ||
                ('cy' in newScaling && newScaling.cy !== scaling.cy)) {
                me.dirtyTransform = true;
                scaling.x = newScaling.x;
                scaling.y = newScaling.y;
                scaling.cx = newScaling.cx;
                scaling.cy = newScaling.cy;
            }
        }

        // If the bbox is changed, then the bbox based transforms should be invalidated.
        if (!me.dirtyTransform && dirtyBBox) {
            if (spriteAttrs.scaling.x === null ||
                spriteAttrs.scaling.y === null ||
                spriteAttrs.rotation.y === null ||
                spriteAttrs.rotation.y === null) {
                me.dirtyTransform = true;
            }
        }
        
        Ext.apply(spriteAttrs, attrs);
        me.dirty = true;

        if (redraw === true && hasSurface) {
            me.redraw();
        }
        return this;
    },

    /**
     * Retrieves the bounding box of the sprite.
     * This will be returned as an object with x, y, width, and height properties.
     * @return {Object} bbox
     */
    getBBox: function() {
        return this.surface.getBBox(this);
    },

    setText: function(text) {
        return this.surface.setText(this, text);
    },

    /**
     * Hides the sprite.
     * @param {Boolean} redraw Flag to immediatly draw the change.
     * @return {Ext.draw.Sprite} this
     */
    hide: function(redraw) {
        this.setAttributes({
            hidden: true
        }, redraw);
        return this;
    },

    /**
     * Shows the sprite.
     * @param {Boolean} redraw Flag to immediatly draw the change.
     * @return {Ext.draw.Sprite} this
     */
    show: function(redraw) {
        this.setAttributes({
            hidden: false
        }, redraw);
        return this;
    },

    /**
     * Removes the sprite.
     * @return {Boolean} True if sprite was successfully removed.
     * False when there was no surface to remove it from.
     */
    remove: function() {
        if (this.surface) {
            this.surface.remove(this);
            return true;
        }
        return false;
    },

    onRemove: function() {
        this.surface.onRemove(this);
    },

    /**
     * Removes the sprite and clears all listeners.
     */
    destroy: function() {
        var me = this;
        if (me.fireEvent('beforedestroy', me) !== false) {
            me.remove();
            me.surface.onDestroy(me);
            me.clearListeners();
            me.fireEvent('destroy');
        }
    },

    /**
     * Redraws the sprite.
     * @return {Ext.draw.Sprite} this
     */
    redraw: function() {
        this.surface.renderItem(this);
        return this;
    },

    /**
     * Wrapper for setting style properties, also takes single object parameter of multiple styles.
     * @param {String/Object} property The style property to be set, or an object of multiple styles.
     * @param {String} value (optional) The value to apply to the given property, or null if an object was passed.
     * @return {Ext.draw.Sprite} this
     */
    setStyle: function() {
        this.el.setStyle.apply(this.el, arguments);
        return this;
    },

    /**
     * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.  Note this method
     * is severly limited in VML.
     * @param {String/String[]} className The CSS class to add, or an array of classes
     * @return {Ext.draw.Sprite} this
     */
    addCls: function(obj) {
        this.surface.addCls(this, obj);
        return this;
    },

    /**
     * Removes one or more CSS classes from the element.
     * @param {String/String[]} className The CSS class to remove, or an array of classes.  Note this method
     * is severly limited in VML.
     * @return {Ext.draw.Sprite} this
     */
    removeCls: function(obj) {
        this.surface.removeCls(this, obj);
        return this;
    }
});
