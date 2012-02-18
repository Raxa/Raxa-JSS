/**
 * @class Ext.lib.Component
 * @extends Ext.util.Observable
 * Shared Component class
 */
Ext.lib.Component = Ext.extend(Ext.util.Observable, {
    isComponent: true,

    /**
     * @cfg {Mixed} renderTpl
     * <p>An {@link Ext.XTemplate XTemplate} used to create the internal structure inside this Component's
     * encapsulating {@link #getEl Element}.</p>
     * <p>You do not normally need to specify this. For the base classes {@link Ext.Component}
     * and {@link Ext.Container}, this defaults to <b><code>null</code></b> which means that they will be initially rendered
     * with no internal structure; they render their {@link #getEl Element} empty. The more specialized ExtJS and Touch classes
     * which use a more complex DOM structure, provide their own template definitions.</p>
     * <p>This is intended to allow the developer to create application-specific utility Components with customized
     * internal structure.</p>
     * <p>Upon rendering, any created child elements may be automatically imported into object properties using the
     * {@link #renderSelectors} option.</p>
     */
    renderTpl: null,

    /**
     * @cfg {Object} renderSelectors
     * An object containing properties specifying {@link Ext.DomQuery DomQuery} selectors which identify child elements
     * created by the render process.
     *
     * After the Component's internal structure is rendered according to the {@link renderTpl}, this object is iterated through,
     * and the found Elements are added as properties to the Component using the <code>renderSelector</code> property name.
     *
     * For example, a Component which rendered an image, and description into its element might use the following properties
     * coded into its prototype:
     *
     *     renderTpl: '<img src="{imageUrl}" class="x-image-component-img"><div class="x-image-component-desc">{description}</div>',
     *
     *     renderSelectors: {
     *         image: 'img.x-image-component-img',
     *         descEl: 'div.x-image-component-desc'
     *     }
     *
     * After rendering, the Component would have a property <code>image</code> referencing its child `img` Element,
     * and a property `descEl` referencing the `div` Element which contains the description.
     */

    /**
     * @cfg {Mixed} renderTo
     * <p>Specify the id of the element, a DOM element or an existing Element that this component
     * will be rendered into.</p><div><ul>
     * <li><b>Notes</b> : <ul>
     * <div class="sub-desc">Do <u>not</u> use this option if the Component is to be a child item of
     * a {@link Ext.Container Container}. It is the responsibility of the
     * {@link Ext.Container Container}'s {@link Ext.Container#layout layout manager}
     * to render and manage its child items.</div>
     * <div class="sub-desc">When using this config, a call to render() is not required.</div>
     * </ul></li>
     * </ul></div>
     * <p>See <code>{@link #render}</code> also.</p>
     */

    /**
     * @cfg {String/Object} componentLayout
     * <br><p>The sizing and positioning of the component Elements is the responsibility of
     * the Component's layout manager which creates and manages the type of layout specific to the component.
     * <p>If the {@link #layout} configuration is not explicitly specified for
     * a general purpose compopnent the
     * {@link Ext.layout.AutoComponentLayout default layout manager} will be used.
     */

    /**
     * @cfg {Mixed} tpl
     * An <bold>{@link Ext.Template}</bold>, <bold>{@link Ext.XTemplate}</bold>
     * or an array of strings to form an Ext.XTemplate.
     * Used in conjunction with the <code>{@link #data}</code> and
     * <code>{@link #tplWriteMode}</code> configurations.
     */

    /**
     * @cfg {Mixed} data
     * The initial set of data to apply to the <code>{@link #tpl}</code> to
     * update the content area of the Component.
     */

    /**
     * @cfg {String} tplWriteMode The Ext.(X)Template method to use when
     * updating the content area of the Component. Defaults to <code>'overwrite'</code>
     * (see <code>{@link Ext.XTemplate#overwrite}</code>).
     */
    tplWriteMode: 'overwrite',

    /**
     * @cfg {String} baseCls
     * The base CSS class to apply to this components's element. This will also be prepended to
     * elements within this component like Panel's body will get a class x-panel-body. This means
     * that if you create a subclass of Panel, and you want it to get all the Panels styling for the
     * element and the body, you leave the baseCls x-panel and use componentCls to add specific styling for this
     * component.
     */
    baseCls: 'x-component',

    /**
     * @cfg {String} componentCls
     * CSS Class to be added to a components root level element to give distinction to it
     * via styling.
     */

    /**
     * @cfg {String} cls
     * An optional extra CSS class that will be added to this component's Element (defaults to '').  This can be
     * useful for adding customized styles to the component or any of its children using standard CSS rules.
     */

    /**
     * @cfg {String} disabledCls
     * CSS class to add when the Component is disabled. Defaults to 'x-item-disabled'.
     */
    disabledCls: 'x-item-disabled',

    /**
     * @cfg {String} ui
     * A set of predefined ui styles for individual components.
     *
     * Most components support 'light' and 'dark'.
     *
     * Extra string added to the baseCls with an extra '-'.
     * <pre><code>
      new Ext.Panel({
          title: 'Some Title',
          baseCls: 'x-component'
          ui: 'green'
      });
       </code></pre>
     * <p>The ui configuration in this example would add 'x-component-green' as an additional class.</p>
     */

   /**
     * @cfg {String} style
     * A custom style specification to be applied to this component's Element.  Should be a valid argument to
     * {@link Ext.Element#applyStyles}.
     * <pre><code>
        new Ext.Panel({
            title: 'Some Title',
            renderTo: Ext.getBody(),
            width: 400, height: 300,
            layout: 'form',
            items: [{
                xtype: 'textareafield',
                style: {
                    width: '95%',
                    marginBottom: '10px'
                }
            },
            new Ext.Button({
                text: 'Send',
                minWidth: '100',
                style: {
                    marginBottom: '10px'
                }
            })
            ]
        });
     </code></pre>
     */

    /**
     * @cfg {Number} width
     * The width of this component in pixels.
     */

    /**
     * @cfg {Number} height
     * The height of this component in pixels.
     */

    /**
     * @cfg {Number/String} border
     * Specifies the border for this component. The border can be a single numeric value to apply to all sides or
     * it can be a CSS style specification for each style, for example: '10 5 3 10'.
     */

    /**
     * @cfg {Number/String} padding
     * Specifies the padding for this component. The padding can be a single numeric value to apply to all sides or
     * it can be a CSS style specification for each style, for example: '10 5 3 10'.
     */

    /**
     * @cfg {Number/String} margin
     * Specifies the margin for this component. The margin can be a single numeric value to apply to all sides or
     * it can be a CSS style specification for each style, for example: '10 5 3 10'.
     */

    /**
     * @cfg {Boolean} hidden
     * Defaults to false.
     */
    hidden: false,

    /**
     * @cfg {Boolean} disabled
     * Defaults to false.
     */
    disabled: false,

    /**
     * @cfg {Boolean} draggable
     * Allows the component to be dragged via the touch event.
     */

    /**
     * Read-only property indicating whether or not the component can be dragged
     * @property draggable
     * @type {Boolean}
     */
    draggable: false,

    /**
     * @cfg {Boolean} floating
     * Create the Component as a floating and use absolute positioning.
     * Defaults to false.
     */
    floating: false,

    /**
     * @cfg {String} contentEl
     * <p>Optional. Specify an existing HTML element, or the <code>id</code> of an existing HTML element to use as the content
     * for this component.</p>
     * <ul>
     * <li><b>Description</b> :
     * <div class="sub-desc">This config option is used to take an existing HTML element and place it in the layout element
     * of a new component (it simply moves the specified DOM element <i>after the Component is rendered</i> to use as the content.</div></li>
     * <li><b>Notes</b> :
     * <div class="sub-desc">The specified HTML element is appended to the layout element of the component <i>after any configured
     * {@link #html HTML} has been inserted</i>, and so the document will not contain this element at the time the {@link #render} event is fired.</div>
     * <div class="sub-desc">The specified HTML element used will not participate in any <code><b>{@link Ext.Container#layout layout}</b></code>
     * scheme that the Component may use. It is just HTML. Layouts operate on child <code><b>{@link Ext.Container#items items}</b></code>.</div>
     * <div class="sub-desc">Add either the <code>x-hidden</code> or the <code>x-hide-display</code> CSS class to
     * prevent a brief flicker of the content before it is rendered to the panel.</div></li>
     * </ul>
     */

    /**
     * @cfg {String/Object} html
     * An HTML fragment, or a {@link Ext.DomHelper DomHelper} specification to use as the layout element
     * content (defaults to ''). The HTML content is added after the component is rendered,
     * so the document will not contain this HTML at the time the {@link #render} event is fired.
     * This content is inserted into the body <i>before</i> any configured {@link #contentEl} is appended.
     */

    /**
     * @cfg {String} styleHtmlContent
     * True to automatically style the html inside the content target of this component (body for panels).
     * Defaults to false.
     */
    styleHtmlContent: false,

    /**
     * @cfg {String} styleHtmlCls
     * The class that is added to the content target when you set styleHtmlContent to true.
     * Defaults to 'x-html'
     */
    styleHtmlCls: 'x-html',

    /**
     * @cfg {Number} minHeight
     * <p>The minimum value in pixels which this Component will set its height to.</p>
     * <p><b>Warning:</b> This will override any size management applied by layout managers.</p>
     */
    /**
     * @cfg {Number} minWidth
     * <p>The minimum value in pixels which this Component will set its width to.</p>
     * <p><b>Warning:</b> This will override any size management applied by layout managers.</p>
     */
    /**
     * @cfg {Number} maxHeight
     * <p>The maximum value in pixels which this Component will set its height to.</p>
     * <p><b>Warning:</b> This will override any size management applied by layout managers.</p>
     */
    /**
     * @cfg {Number} maxWidth
     * <p>The maximum value in pixels which this Component will set its width to.</p>
     * <p><b>Warning:</b> This will override any size management applied by layout managers.</p>
     */

     // @private
     allowDomMove: true,
     autoShow: false,

     autoRender: false,

     needsLayout: false,

    /**
     * @cfg {Object/Array} plugins
     * An object or array of objects that will provide custom functionality for this component.  The only
     * requirement for a valid plugin is that it contain an init method that accepts a reference of type Ext.Component.
     * When a component is created, if any plugins are available, the component will call the init method on each
     * plugin, passing a reference to itself.  Each plugin can then call methods or respond to events on the
     * component as needed to provide its functionality.
     */

    /**
     * Read-only property indicating whether or not the component has been rendered.
     * @property rendered
     * @type {Boolean}
     */
    rendered: false,

    constructor : function(config) {
        config = config || {};
        this.initialConfig = config;
        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event beforeactivate
             * Fires before a Component has been visually activated.
             * Returning false from an event listener can prevent the activate
             * from occurring.
             * @param {Ext.Component} this
             */
             'beforeactivate',
            /**
             * @event activate
             * Fires after a Component has been visually activated.
             * @param {Ext.Component} this
             */
             'activate',
            /**
             * @event beforedeactivate
             * Fires before a Component has been visually deactivated.
             * Returning false from an event listener can prevent the deactivate
             * from occurring.
             * @param {Ext.Component} this
             */
             'beforedeactivate',
            /**
             * @event deactivate
             * Fires after a Component has been visually deactivated.
             * @param {Ext.Component} this
             */
             'deactivate',
            /**
             * @event added
             * Fires after a Component had been added to a Container.
             * @param {Ext.Component} this
             * @param {Ext.Container} container Parent Container
             * @param {Number} pos position of Component
             */
             'added',
            /**
             * @event disable
             * Fires after the component is disabled.
             * @param {Ext.Component} this
             */
             'disable',
            /**
             * @event enable
             * Fires after the component is enabled.
             * @param {Ext.Component} this
             */
             'enable',
            /**
             * @event beforeshow
             * Fires before the component is shown when calling the {@link #show} method.
             * Return false from an event handler to stop the show.
             * @param {Ext.Component} this
             */
             'beforeshow',
            /**
             * @event show
             * Fires after the component is shown when calling the {@link #show} method.
             * @param {Ext.Component} this
             */
             'show',
            /**
             * @event beforehide
             * Fires before the component is hidden when calling the {@link #hide} method.
             * Return false from an event handler to stop the hide.
             * @param {Ext.Component} this
             */
             'beforehide',
            /**
             * @event hide
             * Fires after the component is hidden.
             * Fires after the component is hidden when calling the {@link #hide} method.
             * @param {Ext.Component} this
             */
             'hide',
            /**
             * @event removed
             * Fires when a component is removed from an Ext.Container
             * @param {Ext.Component} this
             * @param {Ext.Container} ownerCt Container which holds the component
             */
             'removed',
            /**
             * @event beforerender
             * Fires before the component is {@link #rendered}. Return false from an
             * event handler to stop the {@link #render}.
             * @param {Ext.Component} this
             */
             'beforerender',
            /**
             * @event render
             * Fires after the component markup is {@link #rendered}.
             * @param {Ext.Component} this
             */
             'render',
            /**
             * @event afterrender
             * <p>Fires after the component rendering is finished.</p>
             * <p>The afterrender event is fired after this Component has been {@link #rendered}, been postprocesed
             * by any afterRender method defined for the Component, and, if {@link #stateful}, after state
             * has been restored.</p>
             * @param {Ext.Component} this
             */
             'afterrender',
            /**
             * @event beforedestroy
             * Fires before the component is {@link #destroy}ed. Return false from an event handler to stop the {@link #destroy}.
             * @param {Ext.Component} this
             */
             'beforedestroy',
            /**
             * @event destroy
             * Fires after the component is {@link #destroy}ed.
             * @param {Ext.Component} this
             */
             'destroy',
            /**
             * @event resize
             * Fires after the component is resized.
             * @param {Ext.Component} this
             * @param {Number} adjWidth The box-adjusted width that was set
             * @param {Number} adjHeight The box-adjusted height that was set
             * @param {Number} rawWidth The width that was originally specified
             * @param {Number} rawHeight The height that was originally specified
             */
             'resize',
            /**
             * @event move
             * Fires after the component is moved.
             * @param {Ext.Component} this
             * @param {Number} x The new x position
             * @param {Number} y The new y position
             */
             'move',

             'beforestaterestore',
             'staterestore',
             'beforestatesave',
             'statesave'
        );

        this.getId();

        this.mons = [];
        this.additionalCls = [];
        this.renderData = this.renderData || {};
        this.renderSelectors = this.renderSelectors || {};

        this.initComponent();

        // ititComponent gets a chance to change the id property before registering
        Ext.ComponentMgr.register(this);

        // Dont pass the config so that it is not applied to 'this' again
        Ext.lib.Component.superclass.constructor.call(this);

        // Move this into Observable?
        if (this.plugins) {
            this.plugins = [].concat(this.plugins);
            for (var i = 0, len = this.plugins.length; i < len; i++) {
                this.plugins[i] = this.initPlugin(this.plugins[i]);
            }
        }

        // This won't work in Touch
        if (this.applyTo) {
            this.applyToMarkup(this.applyTo);
            delete this.applyTo;
        }
        else if (this.renderTo) {
            this.render(this.renderTo);
            delete this.renderTo;
        }

        //<debug>
        if (Ext.isDefined(this.disabledClass)) {
            throw "Component: disabledClass has been deprecated. Please use disabledCls.";
        }
        //</debug>
    },

    initComponent: Ext.emptyFn,
    applyToMarkup: Ext.emptyFn,

    show: Ext.emptyFn,

    onShow : function() {
        // Layout if needed
        var needsLayout = this.needsLayout;
        if (Ext.isObject(needsLayout)) {
            this.doComponentLayout(needsLayout.width, needsLayout.height, needsLayout.isSetSize);
        }
    },

    // @private
    initPlugin : function(plugin) {
        if (plugin.ptype && typeof plugin.init != 'function') {
            plugin = Ext.PluginMgr.create(plugin);
        }
        else if (typeof plugin == 'string') {
            plugin = Ext.PluginMgr.create({
                ptype: plugin
            });
        }

        plugin.init(this);

        return plugin;
    },

    // @private
    render : function(container, position) {
        if (!this.rendered && this.fireEvent('beforerender', this) !== false) {
            // If this.el is defined, we want to make sure we are dealing with
            // an Ext Element.
            if (this.el) {
                this.el = Ext.get(this.el);
            }

            container = this.initContainer(container);

            this.onRender(container, position);
            this.fireEvent('render', this);

            this.initContent();

            this.afterRender(container);
            this.fireEvent('afterrender', this);

            this.initEvents();

            if (this.autoShow) {
                this.show();
            }

            if (this.hidden) {
                // call this so we don't fire initial hide events.
                this.onHide(false); // no animation after render
            }

            if (this.disabled) {
                // pass silent so the event doesn't fire the first time.
                this.disable(true);
            }
        }

        return this;
    },

    // @private
    onRender : function(container, position) {
        var el = this.el,
            renderTpl,
            renderData;

        position = this.getInsertPosition(position);

        if (!el) {
            if (position) {
                el = Ext.DomHelper.insertBefore(position, this.getElConfig(), true);
            }
            else {
                el = Ext.DomHelper.append(container, this.getElConfig(), true);
            }
        }
        else if (this.allowDomMove !== false) {
            container.dom.insertBefore(el.dom, position);
        }

        el.addCls(this.initCls());
        el.setStyle(this.initStyles());

        // Here we check if the component has a height set through style or css.
        // If it does then we set the this.height to that value and it won't be
        // considered an auto height component
        // if (this.height === undefined) {
        //     var height = el.getHeight();
        //     // This hopefully means that the panel has an explicit height set in style or css
        //     if (height - el.getPadding('tb') - el.getBorderWidth('tb') > 0) {
        //         this.height = height;
        //     }
        // }

        renderTpl = this.initRenderTpl();
        if (renderTpl) {
            renderData = this.initRenderData();
            renderTpl.append(el, renderData);
        }

        this.el = el;
        this.applyRenderSelectors();
        this.rendered = true;
    },

    /**
     * <p>Creates an array of class names from the configurations to add to this Component's <code>el</code> on render.</p>
     * <p>Private, but (possibly) used by ComponentQuery for selection by class name if Component is not rendered.</p>
     * @return {Array} An array of class names with which the Component's element will be rendered.
     * @private
     */
    initCls: function() {
        var cls = [ this.baseCls ];

        //<deprecated since=0.99>
        if (Ext.isDefined(this.cmpCls)) {
            throw "Ext.Component: cmpCls renamed to componentCls";
        }
        //</deprecated>
        if (this.componentCls) {
            cls.push(this.componentCls);
        }
        else {
            this.componentCls = this.baseCls;
        }
        if (this.cls) {
            cls.push(this.cls);
            delete this.cls;
        }
        if (this.ui) {
            cls.push(this.componentCls + '-' + this.ui);
        }
        return cls.concat(this.additionalCls);
    },

    // @private
    afterRender : function() {
        this.getComponentLayout();

        if (this.x || this.y) {
            this.setPosition(this.x, this.y);
        }

        if (this.styleHtmlContent) {
            this.getTargetEl().addCls(this.styleHtmlCls);
        }

        // If there is a width or height set on this component we will call
        // which will trigger the component layout
        if (!this.ownerCt) {
            this.setSize(this.width, this.height);
        }
    },

    getElConfig : function() {
        return {tag: 'div', id: this.id};
    },

    /**
     * This function takes the position argument passed to onRender and returns a
     * DOM element that you can use in the insertBefore.
     * @param {String/Number/Element/HTMLElement} position Index, element id or element you want
     * to put this component before.
     * @return {HTMLElement} DOM element that you can use in the insertBefore
     */
    getInsertPosition: function(position) {
        // Convert the position to an element to insert before
        if (position !== undefined) {
            if (Ext.isNumber(position)) {
                position = this.container.dom.childNodes[position];
            }
            else {
                position = Ext.getDom(position);
            }
        }

        return position;
    },

    /**
     * Adds ctCls to container.
     * @return {Ext.Element} The initialized container
     * @private
     */
    initContainer: function(container) {
        // If you render a component specifying the el, we get the container
        // of the el, and make sure we dont move the el around in the dom
        // during the render
        if (!container && this.el) {
            container = this.el.dom.parentNode;
            this.allowDomMove = false;
        }

        this.container = Ext.get(container);

        if (this.ctCls) {
            this.container.addCls(this.ctCls);
        }

        return this.container;
    },

    /**
     * Initialized the renderData to be used when rendering the renderTpl.
     * @return {Object} Object with keys and values that are going to be applied to the renderTpl
     * @private
     */
    initRenderData: function() {
        return Ext.applyIf(this.renderData, {
            baseCls: this.baseCls,
            componentCls: this.componentCls
        });
    },

    /**
     * Initializes the renderTpl.
     * @return {Ext.XTemplate} The renderTpl XTemplate instance.
     * @private
     */
    initRenderTpl: function() {
        var renderTpl = this.renderTpl;
        if (renderTpl) {
            if (this.proto.renderTpl !== renderTpl) {
                if (Ext.isArray(renderTpl) || typeof renderTpl === "string") {
                    renderTpl = new Ext.XTemplate(renderTpl);
                }
            }
            else if (Ext.isArray(this.proto.renderTpl)){
                renderTpl = this.proto.renderTpl = new Ext.XTemplate(renderTpl);
            }
        }
        return renderTpl;
    },

    /**
     * Function description
     * @return {String} A CSS style string with style, padding, margin and border.
     * @private
     */
    initStyles: function() {
        var style = {},
            Element = Ext.Element,
            i, ln, split, prop;

        if (Ext.isString(this.style)) {
            split = this.style.split(';');
            for (i = 0, ln = split.length; i < ln; i++) {
                if (!Ext.isEmpty(split[i])) {
                    prop = split[i].split(':');
                    style[Ext.util.Format.trim(prop[0])] = Ext.util.Format.trim(prop[1]);
                }
            }
        } else {
            style = Ext.apply({}, this.style);
        }

        // Convert the padding, margin and border properties from a space seperated string
        // into a proper style string
        if (this.padding != undefined) {
            style.padding = Element.unitizeBox((this.padding === true) ? 5 : this.padding);
        }

        if (this.margin != undefined) {
            style.margin = Element.unitizeBox((this.margin === true) ? 5 : this.margin);
        }

        if (this.border != undefined) {
            style.borderWidth = Element.unitizeBox((this.border === true) ? 1 : this.border);
        }

        delete this.style;
        return style;
    },

    /**
     * Initializes this components contents. It checks for the properties
     * html, contentEl and tpl/data.
     * @private
     */
    initContent: function() {
        var target = this.getTargetEl();

        if (this.html) {
            target.update(Ext.DomHelper.markup(this.html));
            delete this.html;
        }

        if (this.contentEl) {
            var contentEl = Ext.get(this.contentEl);
            contentEl.show();
            target.appendChild(contentEl.dom);
        }

        if (this.tpl) {
            // Make sure this.tpl is an instantiated XTemplate
            if (!this.tpl.isTemplate) {
                this.tpl = new Ext.XTemplate(this.tpl);
            }

            if (this.data) {
                this.tpl[this.tplWriteMode](target, this.data);
                delete this.data;
            }
        }
    },

    // @private
    initEvents : function() {
        var afterRenderEvents = this.afterRenderEvents,
            property, listeners;
        if (afterRenderEvents) {
            for (property in afterRenderEvents) {
                if (!afterRenderEvents.hasOwnProperty(property)) {
                    continue;
                }
                listeners = afterRenderEvents[property];
                if (this[property] && this[property].on) {
                    this.mon(this[property], listeners);
                }
            }
        }
    },

    /**
     * Sets references to elements inside the component. E.g body -> x-panel-body
     * @private
     */
    applyRenderSelectors: function() {
        var selectors = this.renderSelectors || {},
            el = this.el.dom,
            selector;

        for (selector in selectors) {
            if (!selectors.hasOwnProperty(selector)) {
                continue;
            }
            this[selector] = Ext.get(Ext.DomQuery.selectNode(selectors[selector], el));
        }
    },

    is: function(selector) {
        return Ext.ComponentQuery.is(this, selector);
    },

    /**
     * <p>Walks up the <code>ownerCt</code> axis looking for an ancestor Container which matches
     * the passed simple selector.</p>
     * <p>Example:<pre><code>
var owningTabContainer = grid.up('tabcontainer');
</code></pre>
     * @param {String} selector Optional. The simple selector to test.
     * @return {Ext.Container} The matching ancestor Container (or <code>undefined</code> if no match was found).
     */
    up: function(selector) {
        var result = this.ownerCt;
        if (selector) {
            for (; result; result = result.ownerCt) {
                if (Ext.ComponentQuery.is(result, selector)) {
                    return result;
                }
            }
        }
        return result;
    },

    /**
     * <p>Returns the next sibling of this Component.</p>
     * <p>Optionally selects the next sibling which matches the passed {@link Ext.ComponentQuery ComponentQuery} selector.</p>
     * <p>May also be refered to as <code><b>prev()</b></code></p>
     * @param selector Optional. A {@link Ext.ComponentQuery ComponentQuery} selector to filter the following items.
     * @returns The next sibling (or the next sibling which matches the selector). Returns null if there is no matching sibling.
     */
    nextSibling: function(selector) {
        var o = this.ownerCt, it, last, idx, c;
        if (o) {
            it = o.items;
            idx = it.indexOf(this) + 1;
            if (idx) {
                if (selector) {
                    for (last = it.getCount(); idx < last; idx++) {
                        if ((c = it.getAt(idx)).is(selector)) {
                            return c;
                        }
                    }
                } else {
                    if (idx < it.getCount()) {
                        return it.getAt(idx);
                    }
                }
            }
        }
        return null;
    },

    /**
     * <p>Returns the previous sibling of this Component.</p>
     * <p>Optionally selects the previous sibling which matches the passed {@link Ext.ComponentQuery ComponentQuery} selector.</p>
     * <p>May also be refered to as <code><b>prev()</b></code></p>
     * @param selector Optional. A {@link Ext.ComponentQuery ComponentQuery} selector to filter the preceding items.
     * @returns The previous sibling (or the previous sibling which matches the selector). Returns null if there is no matching sibling.
     */
    previousSibling: function(selector) {
        var o = this.ownerCt, it, idx, c;
        if (o) {
            it = o.items;
            idx = it.indexOf(this);
            if (idx != -1) {
                if (selector) {
                    for (--idx; idx >= 0; idx--) {
                        if ((c = it.getAt(idx)).is(selector)) {
                            return c;
                        }
                    }
                } else {
                    if (idx) {
                        return it.getAt(--idx);
                    }
                }
            }
        }
        return null;
    },

    /**
     * Retrieves the id of this component.
     * Will autogenerate an id if one has not already been set.
     */
    getId : function() {
        return this.id || (this.id = 'ext-comp-' + (++Ext.lib.Component.AUTO_ID));
    },

    getItemId : function() {
        return this.itemId || this.id;
    },

    /**
     * Retrieves the top level element representing this component.
     */
    getEl : function() {
        return this.el;
    },

    /**
     * This is used to determine where to insert the 'html', 'contentEl' and 'items' in this component.
     * @private
     */
    getTargetEl: function() {
        return this.el;
    },

    /**
     * <p>Tests whether or not this Component is of a specific xtype. This can test whether this Component is descended
     * from the xtype (default) or whether it is directly of the xtype specified (shallow = true).</p>
     * <p><b>If using your own subclasses, be aware that a Component must register its own xtype
     * to participate in determination of inherited xtypes.</b></p>
     * <p>For a list of all available xtypes, see the {@link Ext.Component} header.</p>
     * <p>Example usage:</p>
     * <pre><code>
var t = new Ext.form.Text();
var isText = t.isXType('textfield');        // true
var isBoxSubclass = t.isXType('field');       // true, descended from Ext.form.Field
var isBoxInstance = t.isXType('field', true); // false, not a direct Ext.form.Field instance
</code></pre>
     * @param {String} xtype The xtype to check for this Component
     * @param {Boolean} shallow (optional) False to check whether this Component is descended from the xtype (this is
     * the default), or true to check whether this Component is directly of the specified xtype.
     * @return {Boolean} True if this component descends from the specified xtype, false otherwise.
     */
    isXType: function(xtype, shallow) {
        //assume a string by default
        if (Ext.isFunction(xtype)) {
            xtype = xtype.xtype;
            //handle being passed the class, e.g. Ext.Component
        } else if (Ext.isObject(xtype)) {
            xtype = xtype.constructor.xtype;
            //handle being passed an instance
        }

        return !shallow ? ('/' + this.getXTypes() + '/').indexOf('/' + xtype + '/') != -1: this.constructor.xtype == xtype;
    },

    /**
     * <p>Returns this Component's xtype hierarchy as a slash-delimited string. For a list of all
     * available xtypes, see the {@link Ext.Component} header.</p>
     * <p><b>If using your own subclasses, be aware that a Component must register its own xtype
     * to participate in determination of inherited xtypes.</b></p>
     * <p>Example usage:</p>
     * <pre><code>
var t = new Ext.form.Text();
alert(t.getXTypes());  // alerts 'component/field/textfield'
</code></pre>
     * @return {String} The xtype hierarchy string
     */
    getXTypes: function() {
        var constructor = this.constructor,
            xtypes      = [],
            superclass  = this,
            xtype;

        if (!constructor.xtypes) {
            while (superclass) {
                xtype = superclass.constructor.xtype;

                if (xtype != undefined) {
                    xtypes.unshift(xtype);
                }

                superclass = superclass.constructor.superclass;
            }

            constructor.xtypeChain = xtypes;
            constructor.xtypes = xtypes.join('/');
        }

        return constructor.xtypes;
    },

    /**
     * Update the content area of a component.
     * @param {Mixed} htmlOrData
     * If this component has been configured with a template via the tpl config
     * then it will use this argument as data to populate the template.
     * If this component was not configured with a template, the components
     * content area will be updated via Ext.Element update
     * @param {Boolean} loadScripts
     * (optional) Only legitimate when using the html configuration. Defaults to false
     * @param {Function} callback
     * (optional) Only legitimate when using the html configuration. Callback to execute when scripts have finished loading
     */
    update : function(htmlOrData, loadScripts, cb) {
        if (this.tpl && !Ext.isString(htmlOrData)) {
            this.data = htmlOrData;
            if (this.rendered) {
                this.tpl[this.tplWriteMode](this.getTargetEl(), htmlOrData || {});
            }
        }
        else {
            this.html = Ext.isObject(htmlOrData) ? Ext.DomHelper.markup(htmlOrData) : htmlOrData;
            if (this.rendered) {
                this.getTargetEl().update(this.html, loadScripts, cb);
            }
        }

        if (this.rendered) {
            this.doComponentLayout();
        }
    },

    /**
     * Convenience function to hide or show this component by boolean.
     * @param {Boolean} visible True to show, false to hide
     * @return {Ext.Component} this
     */
    setVisible : function(visible) {
        return this[visible ? 'show': 'hide']();
    },

    /**
     * Returns true if this component is visible.
     * @return {Boolean} True if this component is visible, false otherwise.
     */
    isVisible: function() {
        var visible = !this.hidden,
            cmp     = this.ownerCt;

        // Clear hiddenOwnerCt property
        this.hiddenOwnerCt = false;
        if (this.destroyed) {
            return false;
        };

        if (visible && this.rendered && cmp) {
            while (cmp) {
                if (cmp.hidden || cmp.collapsed) {
                    // Store hiddenOwnerCt property if needed
                    this.hiddenOwnerCt = cmp;
                    visible = false;
                    break;
                }
                cmp = cmp.ownerCt;
            }
        }
        return visible;
    },

    /**
     * Enable the component
     * @param {Boolean} silent
     * Passing false will supress the 'enable' event from being fired.
     */
    enable : function(silent) {
        if (this.rendered) {
            this.el.removeCls(this.disabledCls);
            this.el.dom.disabled = false;
            this.onEnable();
        }

        this.disabled = false;

        if (silent !== true) {
            this.fireEvent('enable', this);
        }

        return this;
    },

    /**
     * Disable the component.
     * @param {Boolean} silent
     * Passing true, will supress the 'disable' event from being fired.
     */
    disable : function(silent) {
        if (this.rendered) {
            this.el.addCls(this.disabledCls);
            this.el.dom.disabled = true;
            this.onDisable();
        }

        this.disabled = true;

        if (silent !== true) {
            this.fireEvent('disable', this);
        }

        return this;
    },

    /**
     * Method to determine whether this Component is currently disabled.
     * @return {Boolean} the disabled state of this Component.
     */
    isDisabled : function() {
        return this.disabled;
    },

    /**
     * Enable or disable the component.
     * @param {Boolean} disabled
     */
    setDisabled : function(disabled) {
        return this[disabled ? 'disable': 'enable']();
    },

    /**
     * Method to determine whether this Component is currently set to hidden.
     * @return {Boolean} the hidden state of this Component.
     */
    isHidden : function() {
        return this.hidden;
    },

    /**
     * Adds a CSS class to the top level element representing this component.
     * @returns {Ext.Component} Returns the Component to allow method chaining.
     */
    addCls : function() {
        var me = this,
            args = Ext.toArray(arguments);
        if (me.rendered) {
            me.el.addCls(args);
        }
        else {
            me.additionalCls = me.additionalCls.concat(args);
        }
        return me;
    },

    //<debug>
    addClass : function() {
        throw "Component: addClass has been deprecated. Please use addCls.";
    },
    //</debug>

    /**
     * Removes a CSS class from the top level element representing this component.
     * @returns {Ext.Component} Returns the Component to allow method chaining.
     */
    removeCls : function() {
        var me = this,
            args = Ext.toArray(arguments);
        if (me.rendered) {
            me.el.removeCls(args);
        }
        else if (me.additionalCls.length) {
            Ext.each(args, function(cls) {
                me.additionalCls.remove(cls);
            });
        }
        return me;
    },

    //<debug>
    removeClass : function() {
        throw "Component: removeClass has been deprecated. Please use removeCls.";
    },
    //</debug>

    addListener : function(element, listeners, scope, options) {
        if (Ext.isString(element) && (Ext.isObject(listeners) || options && options.element)) {
            if (options.element) {
                var fn = listeners,
                    option;

                listeners = {};
                listeners[element] = fn;
                element = options.element;
                if (scope) {
                    listeners.scope = scope;
                }

                for (option in options) {
                    if (!options.hasOwnProperty(option)) {
                        continue;
                    }
                    if (this.eventOptionsRe.test(option)) {
                        listeners[option] = options[option];
                    }
                }
            }

            // At this point we have a variable called element,
            // and a listeners object that can be passed to on
            if (this[element] && this[element].on) {
                this.mon(this[element], listeners);
            }
            else {
                this.afterRenderEvents = this.afterRenderEvents || {};
                this.afterRenderEvents[element] = listeners;
            }
        }

        return Ext.lib.Component.superclass.addListener.apply(this, arguments);
    },

    // @TODO: implement removelistener to support the dom event stuff

    /**
     * Provides the link for Observable's fireEvent method to bubble up the ownership hierarchy.
     * @return {Ext.Container} the Container which owns this Component.
     */
    getBubbleTarget : function() {
        return this.ownerCt;
    },

    /**
     * Method to determine whether this Component is floating.
     * @return {Boolean} the floating state of this component.
     */
    isFloating : function() {
        return this.floating;
    },

    /**
     * Method to determine whether this Component is draggable.
     * @return {Boolean} the draggable state of this component.
     */
    isDraggable : function() {
        return !!this.draggable;
    },

    /**
     * Method to determine whether this Component is droppable.
     * @return {Boolean} the droppable state of this component.
     */
    isDroppable : function() {
        return !!this.droppable;
    },

    /**
     * @private
     * Method to manage awareness of when components are added to their
     * respective Container, firing an added event.
     * References are established at add time rather than at render time.
     * @param {Ext.Container} container Container which holds the component
     * @param {number} pos Position at which the component was added
     */
    onAdded : function(container, pos) {
        this.ownerCt = container;
        this.fireEvent('added', this, container, pos);
    },

    /**
     * @private
     * Method to manage awareness of when components are removed from their
     * respective Container, firing an removed event. References are properly
     * cleaned up after removing a component from its owning container.
     */
    onRemoved : function() {
        this.fireEvent('removed', this, this.ownerCt);
        delete this.ownerCt;
    },

    // @private
    onEnable : Ext.emptyFn,
    // @private
    onDisable : Ext.emptyFn,
    // @private
    beforeDestroy : Ext.emptyFn,
    // @private
    // @private
    onResize : Ext.emptyFn,

    /**
     * Sets the width and height of this Component. This method fires the {@link #resize} event. This method can accept
     * either width and height as separate arguments, or you can pass a size object like <code>{width:10, height:20}</code>.
     * @param {Mixed} width The new width to set. This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new width in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS width style.</li>
     * <li>A size object in the format <code>{width: widthValue, height: heightValue}</code>.</li>
     * <li><code>undefined</code> to leave the width unchanged.</li>
     * </ul></div>
     * @param {Mixed} height The new height to set (not required if a size object is passed as the first arg).
     * This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new height in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
     * <li><code>undefined</code> to leave the height unchanged.</li>
     * </ul></div>
     * @return {Ext.Component} this
     */
    setSize : function(width, height) {
        // support for standard size objects
        if (Ext.isObject(width)) {
            height = width.height;
            width  = width.width;
        }
        if (!this.rendered || !this.isVisible()) {
            // If an ownerCt is hidden, add my reference onto the layoutOnShow stack.  Set the needsLayout flag.
            if (this.hiddenOwnerCt) {
                var layoutCollection = this.hiddenOwnerCt.layoutOnShow;
                layoutCollection.remove(this);
                layoutCollection.add(this);
            }
            this.needsLayout = {
                width: width,
                height: height,
                isSetSize: true
            };
            if (!this.rendered) {
                this.width  = (width !== undefined) ? width : this.width;
                this.height = (height !== undefined) ? height : this.height;
            }
            return this;
        }
        this.doComponentLayout(width, height, true);

        return this;
    },

    setCalculatedSize : function(width, height) {
        // support for standard size objects
        if (Ext.isObject(width)) {
            height = width.height;
            width  = width.width;
        }
        if (!this.rendered || !this.isVisible()) {
            // If an ownerCt is hidden, add my reference onto the layoutOnShow stack.  Set the needsLayout flag.
            if (this.hiddenOwnerCt) {
                var layoutCollection = this.hiddenOwnerCt.layoutOnShow;
                layoutCollection.remove(this);
                layoutCollection.add(this);
            }
            this.needsLayout = {
                width: width,
                height: height,
                isSetSize: false
            };
            return this;
        }
        this.doComponentLayout(width, height);

        return this;
    },

    /**
     * This method needs to be called whenever you change something on this component that requires the components
     * layout to be recalculated. An example is adding, showing or hiding a docked item to a Panel, or changing the
     * label of a form field. After a component layout, the container layout will automatically be run. So you could
     * be on the safe side and always call doComponentLayout instead of doLayout.
     * @return {Ext.Container} this
     */
    doComponentLayout : function(width, height, isSetSize) {
        var componentLayout = this.getComponentLayout();
        if (this.rendered && componentLayout) {
            width = (width !== undefined || this.collapsed === true) ? width : this.width;
            height = (height !== undefined || this.collapsed === true) ? height : this.height;
            if (isSetSize) {
                this.width = width;
                this.height = height;
            }

            componentLayout.layout(width, height);
        }
        return this;
    },

    // @private
    setComponentLayout : function(layout) {
        var currentLayout = this.componentLayout;
        if (currentLayout && currentLayout.isLayout && currentLayout != layout) {
            currentLayout.setOwner(null);
        }
        this.componentLayout = layout;
        layout.setOwner(this);
    },

    getComponentLayout : function() {
        if (!this.componentLayout || !this.componentLayout.isLayout) {
            this.setComponentLayout(Ext.layout.LayoutManager.create(this.componentLayout, 'autocomponent'));
        }
        return this.componentLayout;
    },

    afterComponentLayout: Ext.emptyFn,

    /**
     * Sets the left and top of the component.  To set the page XY position instead, use {@link #setPagePosition}.
     * This method fires the {@link #move} event.
     * @param {Number} left The new left
     * @param {Number} top The new top
     * @return {Ext.Component} this
     */
    setPosition : function(x, y) {
        if (Ext.isObject(x)) {
            y = x.y;
            x = x.x;
        }

        if (!this.rendered) {

            return this;
        }

        if (x !== undefined || y !== undefined) {
            this.el.setBox(x, y);
            this.onPosition(x, y);
            this.fireEvent('move', this, x, y);
        }
        return this;
    },

    /* @private
     * Called after the component is moved, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a move occurs.
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     */
    onPosition: Ext.emptyFn,

    /**
     * Sets the width of the component.  This method fires the {@link #resize} event.
     * @param {Number} width The new width to setThis may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new width in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS width style.</li>
     * </ul></div>
     * @return {Ext.Component} this
     */
    setWidth : function(width) {
        return this.setSize(width);
    },

    /**
     * Sets the height of the component.  This method fires the {@link #resize} event.
     * @param {Number} height The new height to set. This may be one of:<div class="mdetail-params"><ul>
     * <li>A Number specifying the new height in the {@link #getEl Element}'s {@link Ext.Element#defaultUnit}s (by default, pixels).</li>
     * <li>A String used to set the CSS height style.</li>
     * <li><i>undefined</i> to leave the height unchanged.</li>
     * </ul></div>
     * @return {Ext.Component} this
     */
    setHeight : function(height) {
        return this.setSize(undefined, height);
    },

    /**
     * Gets the current size of the component's underlying element.
     * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
     */
    getSize : function() {
        return this.el.getSize();
    },

    /**
     * Gets the current width of the component's underlying element.
     * @return {Number}
     */
    getWidth : function() {
        return this.el.getWidth();
    },

    /**
     * Gets the current height of the component's underlying element.
     * @return {Number}
     */
    getHeight : function() {
        return this.el.getHeight();
    },

    /**
     * This method allows you to show or hide a LoadMask on top of this component.
     * @param {Boolean/Object} load True to show the default LoadMask or a config object
     * that will be passed to the LoadMask constructor. False to hide the current LoadMask.
     * @param {Boolean} targetEl True to mask the targetEl of this Component instead of the this.el.
     * For example, setting this to true on a Panel will cause only the body to be masked. (defaults to false)
     * @return {Ext.LoadMask} The LoadMask instance that has just been shown.
     */
    setLoading : function(load, targetEl) {
        if (this.rendered) {
            if (load) {
                this.loadMask = this.loadMask || new Ext.LoadMask(targetEl ? this.getTargetEl() : this.el, Ext.applyIf(Ext.isObject(load) ? load : {}));
                this.loadMask.show();
            } else {
                Ext.destroy(this.loadMask);
                this.loadMask = null;
            }
        }

        return this.loadMask;
    },

    /**
     * Sets the dock position of this component in its parent panel. Note that
     * this only has effect if this item is part of the dockedItems collection
     * of a parent that has a DockLayout (note that any Panel has a DockLayout
     * by default)
     * @return {Component} this
     */
    setDocked : function(dock, layoutParent) {
        this.dock = dock;
        if (layoutParent && this.ownerCt && this.rendered) {
            this.ownerCt.doComponentLayout();
        }
        return this;
    },

    onDestroy : function() {
        if (this.monitorResize && Ext.EventManager.resizeEvent) {
            Ext.EventManager.resizeEvent.removeListener(this.setSize, this);
        }
        Ext.destroy(this.componentLayout, this.loadMask);
    },

    /**
     * Destroys the Component.
     */
    destroy : function() {
        if (!this.isDestroyed) {
            if (this.fireEvent('beforedestroy', this) !== false) {
                this.destroying = true;
                this.beforeDestroy();

                if (this.ownerCt && this.ownerCt.remove) {
                    this.ownerCt.remove(this, false);
                }

                if (this.rendered) {
                    this.el.remove();
                }

                this.onDestroy();

                Ext.ComponentMgr.unregister(this);
                this.fireEvent('destroy', this);

                this.clearListeners();
                this.destroying = false;
                this.isDestroyed = true;
            }
        }
    }
});

Ext.lib.Component.prototype.on = Ext.lib.Component.prototype.addListener;
Ext.lib.Component.prototype.prev = Ext.lib.Component.prototype.previousSibling;
Ext.lib.Component.prototype.next = Ext.lib.Component.prototype.nextSibling;

// @private
Ext.lib.Component.AUTO_ID = 1000;

// Declare here so we can test
Ext.Component = Ext.extend(Ext.lib.Component, {});
Ext.reg('component', Ext.Component);
