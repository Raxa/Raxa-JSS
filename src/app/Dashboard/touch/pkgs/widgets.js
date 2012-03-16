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

/**
 * @class Ext.Component
 * @extends Ext.lib.Component
 * <p>Base class for all Ext components.  All subclasses of Component may participate in the automated
 * Ext component lifecycle of creation, rendering and destruction which is provided by the {@link Ext.Container Container} class.
 * Components may be added to a Container through the {@link Ext.Container#items items} config option at the time the Container is created,
 * or they may be added dynamically via the {@link Ext.Container#add add} method.</p>
 * <p>The Component base class has built-in support for basic hide/show and enable/disable behavior.</p>
 * <p>All Components are registered with the {@link Ext.ComponentMgr} on construction so that they can be referenced at any time via
 * {@link Ext#getCmp}, passing the {@link #id}.</p>
 * <p>All user-developed visual widgets that are required to participate in automated lifecycle and size management should subclass Component (or
 * {@link Ext.BoxComponent} if managed box model handling is required, ie height and width management).</p>
 * <p>See the <a href="http://extjs.com/learn/Tutorial:Creating_new_UI_controls">Creating new UI controls</a> tutorial for details on how
 * and to either extend or augment ExtJs base classes to create custom Components.</p>
 * <p>Every component has a specific xtype, which is its Ext-specific type name, along with methods for checking the
 * xtype like {@link #getXType} and {@link #isXType}. This is the list of all valid xtypes:</p>
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #fullscreen}</li>
 * </ul>
 * <pre>
xtype            Class
-------------    ------------------
button           {@link Ext.Button}
component        {@link Ext.Component}
container        {@link Ext.Container}
dataview         {@link Ext.DataView}
panel            {@link Ext.Panel}
slider           {@link Ext.form.Slider}
toolbar          {@link Ext.Toolbar}
spacer           {@link Ext.Spacer}
tabpanel         {@link Ext.TabPanel}

Form components
---------------------------------------
formpanel        {@link Ext.form.FormPanel}
checkboxfield    {@link Ext.form.Checkbox}
selectfield      {@link Ext.form.Select}
field            {@link Ext.form.Field}
fieldset         {@link Ext.form.FieldSet}
hiddenfield      {@link Ext.form.Hidden}
numberfield      {@link Ext.form.Number}
radiofield       {@link Ext.form.Radio}
textareafield    {@link Ext.form.TextArea}
textfield        {@link Ext.form.Text}
togglefield      {@link Ext.form.Toggle}
</pre>
 * @constructor
 * @param {Ext.Element/String/Object} config The configuration options may be specified as either:
 * <div class="mdetail-params"><ul>
 * <li><b>an element</b> :
 * <p class="sub-desc">it is set as the internal element and its id used as the component id</p></li>
 * <li><b>a string</b> :
 * <p class="sub-desc">it is assumed to be the id of an existing element and is used as the component id</p></li>
 * <li><b>anything else</b> :
 * <p class="sub-desc">it is assumed to be a standard config object and is applied to the component</p></li>
 * </ul></div>
 * @xtype component
 */
Ext.Component = Ext.extend(Ext.lib.Component, {
    /**
    * @cfg {Object/String/Boolean} showAnimation
    * The type of animation you want to use when this component is shown. If you set this
    * this hide animation will automatically be the opposite.
    */
    showAnimation: null,

    /**
     * @cfg {Boolean} monitorOrientation
     * Monitor Orientation change
     */
    monitorOrientation: false,

    /**
     * @cfg {Boolean} floatingCls
     * The class that is being added to this component when its floating.
     * (defaults to x-floating)
     */
    floatingCls: 'x-floating',

    /**
    * @cfg {Boolean} hideOnMaskTap
    * True to automatically bind a tap listener to the mask that hides the window.
    * Defaults to true. Note: if you set this property to false you have to programmaticaly
    * hide the overlay.
    */
    hideOnMaskTap: true,
    
    /**
    * @cfg {Boolean} stopMaskTapEvent
    * True to stop the event that fires when you click outside the floating component.
    * Defalts to true.
    */    
    stopMaskTapEvent: true,

    /**
     * @cfg {Boolean} centered
     * Center the Component. Defaults to false.
     */
    centered: false,

    /**
     * @cfg {Boolean} modal
     * True to make the Component modal and mask everything behind it when displayed, false to display it without
     * restricting access to other UI elements (defaults to false).
     */
    modal: false,

    /**
     * @cfg {Mixed} scroll
     * Configure the component to be scrollable. Acceptable values are:
     * <ul>
     * <li>'horizontal', 'vertical', 'both' to enabling scrolling for that direction.</li>
     * <li>A {@link Ext.util.Scroller Scroller} configuration.</li>
     * <li>false to explicitly disable scrolling.</li>
     * </ul>
     * 
     * Enabling scrolling immediately sets the monitorOrientation config to true (for {@link Ext.Panel Panel})
     */
     
     /**
      * @cfg {Boolean} fullscreen
      * Force the component to take up 100% width and height available. Defaults to false.
      * Setting this configuration immediately sets the monitorOrientation config to true.
      * Setting this to true will render the component instantly.
      */
    fullscreen: false,

    /**
     * @cfg {Boolean} layoutOnOrientationChange
     * Set this to true to automatically relayout this component on orientation change.
     * This property is set to true by default if a component is floating unless you specifically
     * set this to false. Also note that you dont have to set this property to true if this component
     * is a child of a fullscreen container, since fullscreen components are also laid out automatically
     * on orientation change.
     * Defaults to <tt>null</tt>
     */
    layoutOnOrientationChange: null,
    
    // @private
    initComponent : function() {
        this.addEvents(
            /**
             * @event beforeorientationchange
             * Fires before the orientation changes, if the monitorOrientation
             * configuration is set to true. Return false to stop the orientation change.
             * @param {Ext.Panel} this
             * @param {String} orientation 'landscape' or 'portrait'
             * @param {Number} width
             * @param {Number} height
             */
            'beforeorientationchange',
            /**
             * @event orientationchange
             * Fires when the orientation changes, if the monitorOrientation
             * configuration is set to true.
             * @param {Ext.Panel} this
             * @param {String} orientation 'landscape' or 'portrait'
             * @param {Number} width
             * @param {Number} height
             */
            'orientationchange'
        );

        if (this.fullscreen || this.floating) {
            this.monitorOrientation = true;
            this.autoRender = true;
        }

        if (this.fullscreen) {
            var viewportSize = Ext.Viewport.getSize();
            this.width = viewportSize.width;
            this.height = viewportSize.height;
            this.cls = (this.cls || '') + ' x-fullscreen';
            this.renderTo = document.body;
        }
    },

    onRender : function() {
        Ext.Component.superclass.onRender.apply(this, arguments);

        if (this.monitorOrientation) {
            this.el.addCls('x-' + Ext.Viewport.orientation);
        }

        if (this.floating) {
            this.setFloating(true);
        }

        if (this.draggable) {
            this.setDraggable(this.draggable);
        }

        if (this.scroll) {
            this.setScrollable(this.scroll);
        }
    },

    afterRender : function() {
        if (this.fullscreen) {
            this.layoutOrientation(Ext.Viewport.orientation, this.width, this.height);
        }
        Ext.Component.superclass.afterRender.call(this);
    },

    initEvents : function() {
        Ext.Component.superclass.initEvents.call(this);

        if (this.monitorOrientation) {
            Ext.EventManager.onOrientationChange(this.setOrientation, this);
        }
    },

    // Template method that can be overriden to perform logic after the panel has layed out itself
    // e.g. Resized the body and positioned all docked items.
    afterComponentLayout : function() {
        var scrollEl = this.scrollEl,
            scroller = this.scroller,
            parentEl;

        if (scrollEl) {
            parentEl = scrollEl.parent();

            if (scroller.horizontal) {
                scrollEl.setStyle('min-width', parentEl.getWidth(true) + 'px');
                scrollEl.setHeight(parentEl.getHeight(true) || null);
            }
            if (scroller.vertical) {
                scrollEl.setStyle('min-height', parentEl.getHeight(true) + 'px');
                scrollEl.setWidth(parentEl.getWidth(true) || null);
            }
            scroller.updateBoundary(true);
        }

        if (this.fullscreen && Ext.is.iPad) {
            Ext.repaint();
        }
    },

    layoutOrientation: Ext.emptyFn,

    // Inherit docs
    update: function(){
        // We override this here so we can call updateBoundary once the update happens.
        Ext.Component.superclass.update.apply(this, arguments);
        var scroller = this.scroller;
        if (scroller && scroller.updateBoundary){
            scroller.updateBoundary(true);
        }
    },

    /**
     * Show the component.
     * @param {Object/String/Boolean} animation (optional) Defaults to false.
     */
    show : function(animation) {
        var rendered = this.rendered;
        if ((this.hidden || !rendered) && this.fireEvent('beforeshow', this) !== false) {
            if (this.anchorEl) {
                this.anchorEl.hide();
            }
            if (!rendered && this.autoRender) {
                this.render(Ext.isBoolean(this.autoRender) ? Ext.getBody() : this.autoRender);
            }
            this.hidden = false;
            if (this.rendered) {
                this.onShow(animation);
                this.fireEvent('show', this);
            }
        }
        return this;
    },

    /**
     * Show this component relative another component or element.
     * @param {Mixed} alignTo Element or Component
     * @param {Object/String/Boolean} animation
     * @param {Boolean} allowOnSide true to allow this element to be aligned on the left or right.
     * @returns {Ext.Component} this
     */
    showBy : function(alignTo, animation, allowSides, anchor) {
        if (!this.floating) {
            return this;
        }
        
        if (alignTo.isComponent) {
            alignTo = alignTo.el;
        }
        else {
            alignTo = Ext.get(alignTo);
        }

        this.x = 0;
        this.y = 0;

        this.show(animation);

        if (anchor !== false) {
            if (!this.anchorEl) {
                this.anchorEl = this.el.createChild({
                    cls: 'x-anchor'
                });
            }
            this.anchorEl.show();            
        }
        
        this.alignTo(alignTo, allowSides, 20);
    },
    
    alignTo : function(alignTo, allowSides, offset) {
        // We are going to try and position this component to the alignTo element.
        var alignBox = alignTo.getPageBox(),
            constrainBox = {
                width: window.innerWidth,
                height: window.innerHeight
            },
            size = this.getSize(),
            newSize = {
                width: Math.min(size.width, constrainBox.width),
                height: Math.min(size.height, constrainBox.height)
            },
            position,
            index = 2,
            positionMap = [
                'tl-bl',
                't-b',
                'tr-br',
                'l-r',
                'l-r',
                'r-l',
                'bl-tl',
                'b-t',
                'br-tr'
            ],
            anchorEl = this.anchorEl,
            offsets = [0, offset],
            targetBox, cls,
            onSides = false,
            arrowOffsets = [0, 0],
            alignCenterX = alignBox.left + (alignBox.width / 2),
            alignCenterY = alignBox.top + (alignBox.height / 2);

        if (alignCenterX <= constrainBox.width * (1/3)) {
            index = 1;
            arrowOffsets[0] = 25;
        }
        else if (alignCenterX >= constrainBox.width * (2/3)) {
            index = 3;
            arrowOffsets[0] = -30;
        }
        
        if (alignCenterY >= constrainBox.height * (2/3)) {
            index += 6;
            offsets = [0, -offset];
            arrowOffsets[1] = -10;
        }
        // If the alignTo element is vertically in the middle part of the screen
        // we position it left or right.
        else if (allowSides !== false && alignCenterY >= constrainBox.height * (1/3)) {
            index += 3;
            offsets = (index <= 5) ? [offset, 0] : [-offset, 0];
            arrowOffsets = (index <= 5) ? [10, 0] : [-10, 0];
            onSides = true;
        }
        else {
            arrowOffsets[1] = 10;
        }
        
        position = positionMap[index-1];
        targetBox = this.el.getAlignToXY(alignTo, position, offsets);

        // If the window is going to be aligned on the left or right of the alignTo element
        // we make sure the height is smaller then the window height, and the width
        if (onSides) {
            if (targetBox[0] < 0) {
                newSize.width = alignBox.left - offset;
            }
            else if (targetBox[0] + newSize.width > constrainBox.width) {
                newSize.width = constrainBox.width - alignBox.right - offset;
            }
        }
        else {
            if (targetBox[1] < 0) {
                newSize.height = alignBox.top - offset;
            }
            else if (targetBox[1] + newSize.height > constrainBox.height) {
                newSize.height = constrainBox.height - alignBox.bottom - offset;
            }
        }
        
        if (newSize.width != size.width) {
            this.setSize(newSize.width);
        }
        else if (newSize.height != size.height) {
            this.setSize(undefined, newSize.height);
        }

        targetBox = this.el.getAlignToXY(alignTo, position, offsets);                
        this.setPosition(targetBox[0], targetBox[1]);
        
        if (anchorEl) {
            // we are at the top
            anchorEl.removeCls(['x-anchor-bottom', 'x-anchor-left', 'x-anchor-right', 'x-anchor-top']);
            if (offsets[1] == offset) {
                cls = 'x-anchor-top';
            }
            else if (offsets[1] == -offset) {
                cls = 'x-anchor-bottom';
            }
            else if (offsets[0] == offset) {
                cls = 'x-anchor-left';
            }
            else {
                cls = 'x-anchor-right';
            }
            targetBox = anchorEl.getAlignToXY(alignTo, position, arrowOffsets);
            anchorEl.setXY(targetBox);
            anchorEl.addCls(cls);
        }
        
        return position;
    },

    /**
     * Show this component centered of its parent or the window
     * This only applies when the component is floating.
     * @param {Boolean} centered True to center, false to remove centering
     * @returns {Ext.Component} this
     */
    setCentered : function(centered, update) {
        this.centered = centered;

        if (this.rendered && update) {
            var x, y;
            if (!this.ownerCt) {
                x = (Ext.Element.getViewportWidth() / 2) - (this.getWidth() / 2);
                y = (Ext.Element.getViewportHeight() / 2) - (this.getHeight() / 2);
            }
            else {
                x = (this.ownerCt.getTargetEl().getWidth() / 2) - (this.getWidth() / 2);
                y = (this.ownerCt.getTargetEl().getHeight() / 2) - (this.getHeight() / 2);
            }
            this.setPosition(x, y);
        }

        return this;
    },

    /**
     * Hide the component
     * @param {Object/String/Boolean} animation (optional) Defaults to false.
     */
    hide : function(animation) {
        if (!this.hidden && this.fireEvent('beforehide', this) !== false) {
            this.hidden = true;
            if (this.rendered) {
                this.onHide(animation, true);
            }
        }
        return this;
    },

    // @private
    onShow : function(animation) {
        this.el.show();
        
        Ext.Component.superclass.onShow.call(this, animation);
        
        if (animation === undefined || animation === true) {
            animation = this.showAnimation;
        }

        if (this.floating) {
            this.el.dom.parentNode || this.el.appendTo(document.body);

            if (animation) {
                this.el.setStyle('opacity', 0.01);
            }

            if (this.centered) {
                this.setCentered(true, true);
            }
            else {
                this.setPosition(this.x, this.y);
            }

            if (this.modal) {
                this.el.parent().mask(null, 'x-mask-gray');
            }

            if (this.hideOnMaskTap) {
                Ext.getDoc().on('touchstart', this.onFloatingTouchStart, this, {capture: true, subsequent: true});
            }
        }
        
        if (animation) {
            //this.el.setStyle('opacity', 0.01);

            Ext.Anim.run(this, animation, {
                out: false,
                autoClear: true
            });

            this.showAnimation = animation;
        }
    },

    // @private
    onFloatingTouchStart: function(e) {
        if (!this.el.contains(e.target)) {
            this.hide();
            if (this.stopMaskTapEvent || Ext.fly(e.target).hasCls('x-mask')) {
                e.stopEvent();
            }
        }
    },

    // @private
    onHide : function(animation, fireHideEvent) {
        if (animation === undefined || animation === true) {
            animation = this.showAnimation;
        }

        if (this.hideOnMaskTap && this.floating) {
            Ext.getDoc().un('touchstart', this.onFloatingTouchStart, this, {capture: true, subsequent: true});
        }

        if (animation) {
            Ext.Anim.run(this, animation, {
                out: true,
                reverse: true,
                autoClear: true,
                scope: this,
                fireHideEvent: fireHideEvent,
                after: this.doHide
            });
        } else {
            this.doHide(null, {fireHideEvent: fireHideEvent});
        }
    },

    // private
    doHide : function(el, options) {
        var parent = this.el.parent();

        this.el.hide();
        
        if (parent && this.floating && this.modal) {
            parent.unmask();
        }
        if (options && options.fireHideEvent) {
            this.fireEvent('hide', this);
        }
    },

    /**
     * Sets a Component as scrollable.
     * @param {Mixed} config
     * Acceptable values are a Ext.Scroller configuration, 'horizontal', 'vertical', 'both', and false
     */
    setScrollable : function(config) {
        var me = this,
            direction;
            
        if (!me.rendered) {
            me.scroll = config;
            return;
        }

        Ext.destroy(me.scroller);
        me.scroller = null;
        
        // Always reset getTargetEl. It will be changedb below if needed.
        if (me.originalGetTargetEl) {
            me.getTargetEl = me.originalGetTargetEl;
        }
        
        if (config !== false) {
            direction = Ext.isObject(config) ? config.direction: config;
            config = Ext.apply({},
            Ext.isObject(config) ? config: {}, {
//                momentum: true,
                direction: direction
            });

            if (!me.scrollEl) {
                me.scrollEl = me.getTargetEl().createChild();
            }
            me.originalGetTargetEl = me.getTargetEl;
            me.getTargetEl = function() {
                return me.scrollEl;
            };
            me.scroller = (new Ext.util.ScrollView(me.scrollEl, config)).scroller;
        }
    },

    /**
     * Sets a Component as floating.
     * @param {Boolean} floating
     * @param {Boolean} autoShow
     */
    setFloating : function(floating, autoShow) {
        this.floating = !!floating;
        this.hidden = true;
        if (this.rendered) {
            if (floating !== false) {
                this.el.addCls(this.floatingCls);
                if (autoShow) {
                    this.show();
                }
            }
            else {
                this.el.removeCls(this.floatingCls);
                Ext.getDoc().un('touchstart', this.onFloatingTouchStart, this);
            }
        }
        else if (floating !== false) {
            if (this.layoutOnOrientationChange !== false) {
                this.layoutOnOrientationChange = true;
            }
            this.autoRender = true;
        }
    },

    /**
     * Sets a Component as draggable.
     * @param {Boolean/Mixed} draggable On first call, this can be a config object for {@link Ext.util.Draggable}.
     * Afterwards, if set to false, the existing draggable object will be disabled
     * @param {Boolean} autoShow
     */
    setDraggable : function(draggable, autoShow) {
        this.isDraggable = draggable;

        if (this.rendered) {
            if (draggable === false) {
                if (this.dragObj) {
                    this.dragObj.disable();
                }
            } else {
                if (autoShow) {
                    this.show();
                }
                if (this.dragObj) {
                    this.dragObj.enable();
                } else {
                    this.dragObj = new Ext.util.Draggable(this.el, Ext.apply({}, this.draggable || {}));
                    this.relayEvents(this.dragObj, ['dragstart', 'beforedragend' ,'drag', 'dragend']);
                }
            }
        }
    },

    /**
     * Sets the orientation for the Panel.
     * @param {String} orientation 'landscape' or 'portrait'
     * @param {Number/String} width New width of the Panel.
     * @param {Number/String} height New height of the Panel.
     */
    setOrientation : function(orientation, w, h) {
        if (this.fireEvent('beforeorientationchange', this, orientation, w, h) !== false) {
            if (this.orientation != orientation) {
                this.el.removeCls('x-' + this.orientation);
                this.el.addCls('x-' + orientation);
            }

            this.orientation = orientation;
            this.layoutOrientation(orientation, w, h);

            if (this.fullscreen) {
                this.setSize(w, h);
            }
            else if (this.layoutOnOrientationChange) {
                this.doComponentLayout();
            }

            if (this.floating && this.centered) {
                this.setCentered(true, true);
            }

            this.onOrientationChange(orientation, w, h);
            this.fireEvent('orientationchange', this, orientation, w, h);
        }
    },

    // @private
    onOrientationChange : Ext.emptyFn,

    beforeDestroy : function() {
        if (this.floating && this.modal && !this.hidden) {
            this.el.parent().unmask();
        }
        Ext.destroy(this.scroller);
        Ext.Component.superclass.beforeDestroy.call(this);
    },
    
    onDestroy : function() {
        if (this.monitorOrientation && Ext.EventManager.orientationEvent) {
            Ext.EventManager.orientationEvent.removeListener(this.setOrientation, this);
        }
        
        Ext.Component.superclass.onDestroy.call(this);
    }
});

// @xtype box
Ext.BoxComponent = Ext.Component;

Ext.reg('component', Ext.Component);
Ext.reg('box', Ext.BoxComponent);
/**
 * @class Ext.lib.Container
 * @extends Ext.Component
 * Shared Container class
 */
Ext.lib.Container = Ext.extend(Ext.Component, {
    /**
     * @cfg {String/Object} layout
     * <p><b>*Important</b>: In order for child items to be correctly sized and
     * positioned, typically a layout manager <b>must</b> be specified through
     * the <code>layout</code> configuration option.</p>
     * <br><p>The sizing and positioning of child {@link items} is the responsibility of
     * the Container's layout manager which creates and manages the type of layout
     * you have in mind.  For example:</p>
     * <p>If the {@link #layout} configuration is not explicitly specified for
     * a general purpose container (e.g. Container or Panel) the
     * {@link Ext.layout.AutoContainerLayout default layout manager} will be used
     * which does nothing but render child components sequentially into the
     * Container (no sizing or positioning will be performed in this situation).</p>
     * <br><p><b><code>layout</code></b> may be specified as either as an Object or
     * as a String:</p><div><ul class="mdetail-params">
     *
     * <li><u>Specify as an Object</u></li>
     * <div><ul class="mdetail-params">
     * <li>Example usage:</li>
     * <pre><code>
layout: {
    type: 'vbox',
    align: 'left'
}
       </code></pre>
     *
     * <li><code><b>type</b></code></li>
     * <br/><p>The layout type to be used for this container.  If not specified,
     * a default {@link Ext.layout.ContainerLayout} will be created and used.</p>
     * <br/><p>Valid layout <code>type</code> values are:</p>
     * <div class="sub-desc"><ul class="mdetail-params">
     * <li><code><b>{@link Ext.layout.ContainerLayout auto}</b></code> &nbsp;&nbsp;&nbsp; <b>Default</b></li>
     * <li><code><b>{@link Ext.layout.CardLayout card}</b></code></li>
     * <li><code><b>{@link Ext.layout.FitLayout fit}</b></code></li>
     * <li><code><b>{@link Ext.layout.HBoxLayout hbox}</b></code></li>
     * <li><code><b>{@link Ext.layout.VBoxLayout vbox}</b></code></li>
     * </ul></div>
     *
     * <li>Layout specific configuration properties</li>
     * <br/><p>Additional layout specific configuration properties may also be
     * specified. For complete details regarding the valid config options for
     * each layout type, see the layout class corresponding to the <code>type</code>
     * specified.</p>
     *
     * </ul></div>
     *
     * <li><u>Specify as a String</u></li>
     * <div><ul class="mdetail-params">
     * <li>Example usage:</li>
     * <pre><code>
layout: {
    type: 'vbox',
    padding: '5',
    align: 'left'
}
       </code></pre>
     * <li><code><b>layout</b></code></li>
     * <br/><p>The layout <code>type</code> to be used for this container (see list
     * of valid layout type values above).</p><br/>
     * <br/><p>Additional layout specific configuration properties. For complete
     * details regarding the valid config options for each layout type, see the
     * layout class corresponding to the <code>layout</code> specified.</p>
     * </ul></div></ul></div>
     */
     
    /**
     * @cfg {String/Number} activeItem
     * A string component id or the numeric index of the component that should be initially activated within the
     * container's layout on render.  For example, activeItem: 'item-1' or activeItem: 0 (index 0 = the first
     * item in the container's collection).  activeItem only applies to layout styles that can display
     * items one at a time (like {@link Ext.layout.CardLayout} and
     * {@link Ext.layout.FitLayout}).  Related to {@link Ext.layout.ContainerLayout#activeItem}.
     */
    /**
     * @cfg {Object/Array} items
     * <pre><b>** IMPORTANT</b>: be sure to <b>{@link #layout specify a <code>layout</code>} if needed ! **</b></pre>
     * <p>A single item, or an array of child Components to be added to this container,
     * for example:</p>
     * <pre><code>
// specifying a single item
items: {...},
layout: 'fit',    // specify a layout!

// specifying multiple items
items: [{...}, {...}],
layout: 'hbox', // specify a layout!
       </code></pre>
     * <p>Each item may be:</p>
     * <div><ul class="mdetail-params">
     * <li>any type of object based on {@link Ext.Component}</li>
     * <li>a fully instanciated object or</li>
     * <li>an object literal that:</li>
     * <div><ul class="mdetail-params">
     * <li>has a specified <code>{@link Ext.Component#xtype xtype}</code></li>
     * <li>the {@link Ext.Component#xtype} specified is associated with the Component
     * desired and should be chosen from one of the available xtypes as listed
     * in {@link Ext.Component}.</li>
     * <li>If an <code>{@link Ext.Component#xtype xtype}</code> is not explicitly
     * specified, the {@link #defaultType} for that Container is used.</li>
     * <li>will be "lazily instanciated", avoiding the overhead of constructing a fully
     * instanciated Component object</li>
     * </ul></div></ul></div>
     * <p><b>Notes</b>:</p>
     * <div><ul class="mdetail-params">
     * <li>Ext uses lazy rendering. Child Components will only be rendered
     * should it become necessary. Items are automatically laid out when they are first
     * shown (no sizing is done while hidden), or in response to a {@link #doLayout} call.</li>
     * <li>Do not specify <code>{@link Ext.Panel#contentEl contentEl}</code>/
     * <code>{@link Ext.Panel#html html}</code> with <code>items</code>.</li>
     * </ul></div>
     */
    /**
     * @cfg {Object|Function} defaults
     * <p>This option is a means of applying default settings to all added items whether added through the {@link #items}
     * config or via the {@link #add} or {@link #insert} methods.</p>
     * <p>If an added item is a config object, and <b>not</b> an instantiated Component, then the default properties are
     * unconditionally applied. If the added item <b>is</b> an instantiated Component, then the default properties are
     * applied conditionally so as not to override existing properties in the item.</p>
     * <p>If the defaults option is specified as a function, then the function will be called using this Container as the
     * scope (<code>this</code> reference) and passing the added item as the first parameter. Any resulting object
     * from that call is then applied to the item as default properties.</p>
     * <p>For example, to automatically apply padding to the body of each of a set of
     * contained {@link Ext.Panel} items, you could pass: <code>defaults: {bodyStyle:'padding:15px'}</code>.</p>
     * <p>Usage:</p><pre><code>
defaults: {               // defaults are applied to items, not the container
    autoScroll:true
},
items: [
    {
        xtype: 'panel',   // defaults <b>do not</b> have precedence over
        id: 'panel1',     // options in config objects, so the defaults
        autoScroll: false // will not be applied here, panel1 will be autoScroll:false
    },
    new Ext.Panel({       // defaults <b>do</b> have precedence over options
        id: 'panel2',     // options in components, so the defaults
        autoScroll: false // will be applied here, panel2 will be autoScroll:true.
    })
]
       </code></pre>
     */


    /** @cfg {Boolean} autoDestroy
     * If true the container will automatically destroy any contained component that is removed from it, else
     * destruction must be handled manually (defaults to true).
     */
    autoDestroy : true,

     /** @cfg {String} defaultType
      * <p>The default {@link Ext.Component xtype} of child Components to create in this Container when
      * a child item is specified as a raw configuration object, rather than as an instantiated Component.</p>
      * <p>Defaults to <code>'panel'</code>.</p>
      */
    defaultType: 'panel',

    isContainer : true,

    baseCls: 'x-container',

    /**
     * @cfg {Array} bubbleEvents
     * <p>An array of events that, when fired, should be bubbled to any parent container.
     * See {@link Ext.util.Observable#enableBubble}.
     * Defaults to <code>['add', 'remove']</code>.
     */
    bubbleEvents: ['add', 'remove'],

    // @private
    initComponent : function(){
        this.addEvents(
            /**
             * @event afterlayout
             * Fires when the components in this container are arranged by the associated layout manager.
             * @param {Ext.Container} this
             * @param {ContainerLayout} layout The ContainerLayout implementation for this container
             */
            'afterlayout',
            /**
             * @event beforeadd
             * Fires before any {@link Ext.Component} is added or inserted into the container.
             * A handler can return false to cancel the add.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component being added
             * @param {Number} index The index at which the component will be added to the container's items collection
             */
            'beforeadd',
            /**
             * @event beforeremove
             * Fires before any {@link Ext.Component} is removed from the container.  A handler can return
             * false to cancel the remove.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component being removed
             */
            'beforeremove',
            /**
             * @event add
             * @bubbles
             * Fires after any {@link Ext.Component} is added or inserted into the container.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component that was added
             * @param {Number} index The index at which the component was added to the container's items collection
             */
            'add',
            /**
             * @event remove
             * @bubbles
             * Fires after any {@link Ext.Component} is removed from the container.
             * @param {Ext.Container} this
             * @param {Ext.Component} component The component that was removed
             */
            'remove',
            /**
             * @event beforecardswitch
             * Fires before this container switches the active card. This event
             * is only available if this container uses a CardLayout. Note that
             * TabPanel and Carousel both get a CardLayout by default, so both
             * will have this event.
             * A handler can return false to cancel the card switch.
             * @param {Ext.Container} this
             * @param {Ext.Component} newCard The card that will be switched to
             * @param {Ext.Component} oldCard The card that will be switched from
             * @param {Number} index The index of the card that will be switched to
             * @param {Boolean} animated True if this cardswitch will be animated
             */
            'beforecardswitch',
            /**
             * @event cardswitch
             * Fires after this container switches the active card. If the card
             * is switched using an animation, this event will fire after the
             * animation has finished. This event is only available if this container
             * uses a CardLayout. Note that TabPanel and Carousel both get a CardLayout
             * by default, so both will have this event.
             * @param {Ext.Container} this
             * @param {Ext.Component} newCard The card that has been switched to
             * @param {Ext.Component} oldCard The card that has been switched from
             * @param {Number} index The index of the card that has been switched to
             * @param {Boolean} animated True if this cardswitch was animated
             */
            'cardswitch'
        );

        // layoutOnShow stack
        this.layoutOnShow = new Ext.util.MixedCollection();
        Ext.lib.Container.superclass.initComponent.call(this);
        this.initItems();
    },

    // @private
    initItems : function() {
        var items = this.items;
        
        /**
         * The MixedCollection containing all the child items of this container.
         * @property items
         * @type Ext.util.MixedCollection
         */
        this.items = new Ext.util.MixedCollection(false, this.getComponentId);

        if (items) {
            if (!Ext.isArray(items)) {
                items = [items];
            }

            this.add(items);
        }
    },

    // @private
    afterRender : function() {
        this.getLayout();
        Ext.lib.Container.superclass.afterRender.apply(this, arguments);
    },

    // @private
    setLayout : function(layout) {
        var currentLayout = this.layout;
        
        if (currentLayout && currentLayout.isLayout && currentLayout != layout) {
            currentLayout.setOwner(null);
        }
        
        this.layout = layout;
        layout.setOwner(this);
    },

    /**
     * Returns the {@link Ext.layout.ContainerLayout layout} instance currently associated with this Container.
     * If a layout has not been instantiated yet, that is done first
     * @return {Ext.layout.ContainerLayout} The layout
     */
    getLayout : function() {
        if (!this.layout || !this.layout.isLayout) {
            this.setLayout(Ext.layout.LayoutManager.create(this.layout, 'autocontainer'));
        }
        
        return this.layout;
    },

    /**
     * Force this container's layout to be recalculated. A call to this function is required after adding a new component
     * to an already rendered container, or possibly after changing sizing/position properties of child components.
     * @return {Ext.Container} this
     */
    doLayout : function() {
        var layout = this.getLayout();
        
        if (this.rendered && layout) {
            layout.layout();
        }
        
        return this;
    },

    // @private
    afterLayout : function(layout) {
        this.fireEvent('afterlayout', this, layout);
    },

    // @private
    prepareItems : function(items, applyDefaults) {
        if (!Ext.isArray(items)) {
            items = [items];
        }
        
        // Make sure defaults are applied and item is initialized
        var item, i, ln;
        
        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            
            if (applyDefaults) {
                item = this.applyDefaults(item);
            }
            
            items[i] = this.lookupComponent(item);
        }
        
        return items;
    },

    // @private
    applyDefaults : function(config) {
        var defaults = this.defaults;
        
        if (defaults) {
            if (Ext.isFunction(defaults)) {
                defaults = defaults.call(this, config);
            }
            
            if (Ext.isString(config)) {
                config = Ext.ComponentMgr.get(config);
                Ext.apply(config, defaults);
            } else if (!config.isComponent) {
                Ext.applyIf(config, defaults);
            } else {
                Ext.apply(config, defaults);
            }
        }
        
        return config;
    },

    // @private
    lookupComponent : function(comp) {
        if (Ext.isString(comp)) {
            return Ext.ComponentMgr.get(comp);
        } else {
            return this.createComponent(comp);
        }
        return comp;
    },

    // @private
    createComponent : function(config, defaultType) {
        if (config.isComponent) {
            return config;
        }

        // // add in ownerCt at creation time but then immediately
        // // remove so that onBeforeAdd can handle it
        // var component = Ext.create(Ext.apply({ownerCt: this}, config), defaultType || this.defaultType);
        //
        // delete component.initialConfig.ownerCt;
        // delete component.ownerCt;

        return Ext.create(config, defaultType || this.defaultType);
    },

    // @private - used as the key lookup function for the items collection
    getComponentId : function(comp) {
        return comp.getItemId();
    },

    /**
     * <p>Adds {@link Ext.Component Component}(s) to this Container.</p>
     * <br><p><b>Description</b></u> :
     * <div><ul class="mdetail-params">
     * <li>Fires the {@link #beforeadd} event before adding</li>
     * <li>The Container's {@link #defaults default config values} will be applied
     * accordingly (see <code>{@link #defaults}</code> for details).</li>
     * <li>Fires the {@link #add} event after the component has been added.</li>
     * </ul></div>
     * <br><p><b>Notes</b></u> :
     * <div><ul class="mdetail-params">
     * <li>If the Container is <i>already rendered</i> when <code>add</code>
     * is called, you may need to call {@link #doLayout} to refresh the view which causes
     * any unrendered child Components to be rendered. This is required so that you can
     * <code>add</code> multiple child components if needed while only refreshing the layout
     * once. For example:<pre><code>
var tb = new {@link Ext.Toolbar}();
tb.render(document.body);  // toolbar is rendered
tb.add({text:'Button 1'}); // add multiple items ({@link #defaultType} for {@link Ext.Toolbar Toolbar} is 'button')
tb.add({text:'Button 2'});
tb.{@link #doLayout}();             // refresh the layout
     * </code></pre></li>
     * <li><i>Warning:</i> Containers directly managed by the BorderLayout layout manager
     * may not be removed or added.  See the Notes for {@link Ext.layout.BorderLayout BorderLayout}
     * for more details.</li>
     * </ul></div>
     * @param {...Object/Array} component
     * <p>Either one or more Components to add or an Array of Components to add.  See
     * <code>{@link #items}</code> for additional information.</p>
     * @return {Ext.Component/Array} The Components that were added.
     */
    add : function() {
        var args = Array.prototype.slice.call(arguments),
            index = -1;

        if (typeof args[0] == 'number') {
            index = args.shift();
        }

        var hasMultipleArgs = args.length > 1;
        
        if (hasMultipleArgs || Ext.isArray(args[0])) {
            var items = hasMultipleArgs ? args : args[0],
                results = [],
                i, ln, item;

            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                if (!item) {
                    throw "Trying to add a null item as a child of Container with itemId/id: " + this.getItemId();
                }
                
                if (index != -1) {
                    item = this.add(index + i, item);
                } else {
                    item = this.add(item);
                }
                results.push(item);
            }

            return results;
        }

        var cmp = this.prepareItems(args[0], true)[0];
        index = (index !== -1) ? index : this.items.length;

        if (this.fireEvent('beforeadd', this, cmp, index) !== false && this.onBeforeAdd(cmp) !== false) {
            this.items.insert(index, cmp);
            cmp.onAdded(this, index);
            this.onAdd(cmp, index);
            this.fireEvent('add', this, cmp, index);
        }

        return cmp;
    },

    onAdd : Ext.emptyFn,
    onRemove : Ext.emptyFn,

    /**
     * Inserts a Component into this Container at a specified index. Fires the
     * {@link #beforeadd} event before inserting, then fires the {@link #add} event after the
     * Component has been inserted.
     * @param {Number} index The index at which the Component will be inserted
     * into the Container's items collection
     * @param {Ext.Component} component The child Component to insert.<br><br>
     * Ext uses lazy rendering, and will only render the inserted Component should
     * it become necessary.<br><br>
     * A Component config object may be passed in order to avoid the overhead of
     * constructing a real Component object if lazy rendering might mean that the
     * inserted Component will not be rendered immediately. To take advantage of
     * this 'lazy instantiation', set the {@link Ext.Component#xtype} config
     * property to the registered type of the Component wanted.<br><br>
     * For a list of all available xtypes, see {@link Ext.Component}.
     * @return {Ext.Component} component The Component (or config object) that was
     * inserted with the Container's default config values applied.
     */
    insert : function(index, comp){
        return this.add(index, comp);
    },

    // @private
    onBeforeAdd : function(item) {
        if (item.ownerCt) {
            item.ownerCt.remove(item, false);
        }
        
        if (this.hideBorders === true){
            item.border = (item.border === true);
        }
    },

    /**
     * Removes a component from this container.  Fires the {@link #beforeremove} event before removing, then fires
     * the {@link #remove} event after the component has been removed.
     * @param {Component/String} component The component reference or id to remove.
     * @param {Boolean} autoDestroy (optional) True to automatically invoke the removed Component's {@link Ext.Component#destroy} function.
     * Defaults to the value of this Container's {@link #autoDestroy} config.
     * @return {Ext.Component} component The Component that was removed.
     */
    remove : function(comp, autoDestroy) {
        var c = this.getComponent(comp);
        //<debug>
			if (!c) {
            	console.warn("Attempted to remove a component that does not exist. Ext.Container: remove takes an argument of the component to remove. cmp.remove() is incorrect usage.");				
			}
        //</debug>
        
        if (c && this.fireEvent('beforeremove', this, c) !== false) {
            this.doRemove(c, autoDestroy);
            this.fireEvent('remove', this, c);
        }
        
        return c;
    },

    // @private
    doRemove : function(component, autoDestroy) {
        var layout = this.layout,
            hasLayout = layout && this.rendered;

        this.items.remove(component);
        component.onRemoved();
        
        if (hasLayout) {
            layout.onRemove(component);
        }
        
        this.onRemove(component, autoDestroy);

        if (autoDestroy === true || (autoDestroy !== false && this.autoDestroy)) {
            component.destroy();
        }

        if (hasLayout && !autoDestroy) {
            layout.afterRemove(component);
        }
    },

    /**
     * Removes all components from this container.
     * @param {Boolean} autoDestroy (optional) True to automatically invoke the removed Component's {@link Ext.Component#destroy} function.
     * Defaults to the value of this Container's {@link #autoDestroy} config.
     * @return {Array} Array of the destroyed components
     */
    removeAll : function(autoDestroy) {
        var item,
            removeItems = this.items.items.slice(),
            items = [],
            ln = removeItems.length,
            i;
        
        for (i = 0; i < ln; i++) {
            item = removeItems[i];
            this.remove(item, autoDestroy);
            
            if (item.ownerCt !== this) {
                items.push(item);
            }
        }
        
        return items;
    },

    // Used by ComponentQuery to retrieve all of the items
    // which can potentially be considered a child of this Container.
    // This should be overriden by components which have child items
    // that are not contained in items. For example dockedItems, menu, etc
    getRefItems : function(deep) {
        var items = this.items.items.slice(),
            ln = items.length,
            i, item;

        if (deep) {
            for (i = 0; i < ln; i++) {
                item = items[i];
                
                if (item.getRefItems) {
                    items = items.concat(item.getRefItems(true));
                }
            }
        }

        return items;
    },

    /**
     * Examines this container's <code>{@link #items}</code> <b>property</b>
     * and gets a direct child component of this container.
     * @param {String/Number} comp This parameter may be any of the following:
     * <div><ul class="mdetail-params">
     * <li>a <b><code>String</code></b> : representing the <code>{@link Ext.Component#itemId itemId}</code>
     * or <code>{@link Ext.Component#id id}</code> of the child component </li>
     * <li>a <b><code>Number</code></b> : representing the position of the child component
     * within the <code>{@link #items}</code> <b>property</b></li>
     * </ul></div>
     * <p>For additional information see {@link Ext.util.MixedCollection#get}.
     * @return Ext.Component The component (if found).
     */
    getComponent : function(comp) {
        if (Ext.isObject(comp)) {
            comp = comp.getItemId();
        }
        
        return this.items.get(comp);
    },

    /**
     * Retrieves all descendant components which match the passed selector.
     * Executes an Ext.ComponentQuery.query using this container as its root.
     * @param {String} selector Selector complying to an Ext.ComponentQuery selector
     * @return {Array} Ext.Component's which matched the selector
     */
    query : function(selector) {
        return Ext.ComponentQuery.query(selector, this);
    },

    /**
     * Retrieves the first direct child of this container which matches the passed selector.
     * The passed in selector must comply with an Ext.ComponentQuery selector.
     * @param {String} selector An Ext.ComponentQuery selector
     * @return Ext.Component
     */
    child : function(selector) {
        return this.query('> ' + selector)[0] || null;
    },
    
    
    /**
     * Retrieves the first descendant of this container which matches the passed selector.
     * The passed in selector must comply with an Ext.ComponentQuery selector.
     * @param {String} selector An Ext.ComponentQuery selector
     * @return Ext.Component
     */
    down : function(selector) {
        return this.query(selector)[0] || null;
    },

    // inherit docs
    show : function() {
        Ext.lib.Container.superclass.show.apply(this, arguments);
        
        var layoutCollection = this.layoutOnShow,
            ln = layoutCollection.getCount(),
            i = 0,
            needsLayout,
            item;
            
        for (; i < ln; i++) {
            item = layoutCollection.get(i);
            needsLayout = item.needsLayout;
            
            if (Ext.isObject(needsLayout)) {
                item.doComponentLayout(needsLayout.width, needsLayout.height, needsLayout.isSetSize);
            }
        }
        
        layoutCollection.clear();
    },

    // @private
    beforeDestroy : function() {
        var items = this.items,
            c;
            
        if (items) {
            while ((c = items.first())) {
                this.doRemove(c, true);
            }
        }
        
        Ext.destroy(this.layout);
        Ext.lib.Container.superclass.beforeDestroy.call(this);
    }
});

// Declare here so we can test
Ext.Container = Ext.extend(Ext.lib.Container, {});
Ext.reg('container', Ext.Container);

/**
 * @class Ext.Container
 * @extends Ext.lib.Container
 * <p>Base class for any {@link Ext.BoxComponent} that may contain other Components. Containers handle the
 * basic behavior of containing items, namely adding, inserting and removing items.</p>
 *
 * <p><u><b>Layout</b></u></p>
 * <p>Container classes delegate the rendering of child Components to a layout
 * manager class which must be configured into the Container using the
 * <code><b>{@link #layout}</b></code> configuration property.</p>
 * <p>When either specifying child <code>{@link #items}</code> of a Container,
 * or dynamically {@link #add adding} Components to a Container, remember to
 * consider how you wish the Container to arrange those child elements, and
 * whether those child elements need to be sized using one of Ext's built-in
 * <b><code>{@link #layout}</code></b> schemes. By default, Containers use the
 * {@link Ext.layout.AutoContainerLayout AutoContainerLayout} scheme which only
 * renders child components, appending them one after the other inside the
 * Container, and <b>does not apply any sizing</b> at all.</p>
 * <p>A common mistake is when a developer neglects to specify a
 * <b><code>{@link #layout}</code></b>. If a Container is left to use the default
 * {@link Ext.layout.AutoContainerLayout AutoContainerLayout} scheme, none of its
 * child components will be resized, or changed in any way when the Container
 * is resized.</p>
 * @xtype container
 */
Ext.Container = Ext.extend(Ext.lib.Container, {
    /**
     * @cfg {String/Mixed} cardSwitchAnimation
     * Animation to be used during transitions of cards. Note this only works when this container has a CardLayout.
     * Any valid value from Ext.anims can be used ('fade', 'slide', 'flip', 'cube', 'pop', 'wipe').
     * Defaults to <tt>null</tt>.
     */
    cardSwitchAnimation: null,

    initComponent: function() {
        if (this.scroll) {
            this.fields = new Ext.util.MixedCollection();

            if (!Ext.is.Blackberry) {
                this.fields.on({
                    add: this.onFieldAdd,
                    remove: this.onFieldRemove,
                    scope: this
                });
            }

            this.on({
                add: this.onItemAdd,
                remove: this.onItemRemove,
                scope: this
            });
        }

        //<deprecated since="0.99">
        if (Ext.isDefined(this.animation)) {
            console.warn("Container: animation has been removed. Please use cardSwitchAnimation.");
            this.cardSwitchAnimation = this.animation;
        }
        //</deprecated>

        Ext.Container.superclass.initComponent.apply(this, arguments);
    },

    afterRender: function() {
        Ext.Container.superclass.afterRender.apply(this, arguments);

        if (this.scroller) {
            if ((Ext.is.Android) && this.containsFormFields) {
                this.scroller.setUseCssTransform(false);
            }

            this.scroller.on('scrollstart', this.onFieldScrollStart, this);
        }
    },

    onFieldScrollStart: function() {
        var focusedField = this.focusedField;

        if (focusedField && Ext.is.iOS) {
            focusedField.blur();
//            Ext.Viewport.scrollToTop();
        }
    },

    onItemAdd: function(me, item) {
        this.fields.addAll(Ext.ComponentQuery.query('[isField]', item));
    },

    onItemRemove: function(me, item) {
        this.fields.removeAll(Ext.ComponentQuery.query('[isField]', item));
    },

    onFieldAdd: function(key, field) {
        this.handleFieldEventListener(true, field);
    },

    onFieldRemove: function(key, field) {
        this.handleFieldEventListener(false, field);
    },

    handleFieldEventListener: function(isAdding, item) {
        if (!this.fieldEventWrap)
            this.fieldEventWrap = {};

        if (['textfield', 'passwordfield', 'emailfield',
             //<deprecated since=0.99>
             'textarea',
             //</deprecated>
             'textareafield', 'searchfield', 'urlfield',
             'numberfield', 'spinnerfield'].indexOf(item.xtype) !== -1) {
            if (isAdding) {
                this.fieldEventWrap[item.id] = {
                    beforefocus: function(e) {this.onFieldBeforeFocus(item, e);},
                    focus: function(e) {this.onFieldFocus(item, e);},
                    blur: function(e) {this.onFieldBlur(item, e);},
                    keyup: function(e) {this.onFieldKeyUp(item, e);},
                    scope: this
                };

                this.containsFormFields = true;
            }

            item[isAdding ? 'on' : 'un'](this.fieldEventWrap[item.id]);

            if (!isAdding) {
                delete this.fieldEventWrap[item.id];
            }
        }
    },

    onFieldKeyUp: function(field, e) {
        if (Ext.is.iOS || Ext.is.Desktop) {
            this.resetLastWindowScroll();
        }
    },

    onFieldBeforeFocus: function(field, e) {
        this.focusingField = field;
    },

    getLastWindowScroll: function() {
        if (!this.lastWindowScroll) {
            this.resetLastWindowScroll();
        }

        return {x: this.lastWindowScroll.x, y: this.lastWindowScroll.y};
    },

    resetLastWindowScroll: function() {
        this.lastWindowScroll = {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    },

    adjustScroller: function(offset) {
        var scroller = this.getClosestScroller(),
            windowScroll = this.getLastWindowScroll();

        scroller.setOffset(offset);

        // Keep the window in the previous scroll position
        if (Ext.is.iOS) {
            window.scrollTo(windowScroll.x, windowScroll.y);
        }

        this.resetLastWindowScroll();
    },

    onFieldFocus: function(field, e) {
        if (!Ext.is.iOS && !Ext.is.Desktop) {
            var dom = field.fieldEl.dom;

            if (dom.scrollIntoViewIfNeeded) {
                dom .scrollIntoViewIfNeeded(true);
            }
        }
        else {
             var scroller = this.getClosestScroller(),
                containerRegion = Ext.util.Region.from(scroller.containerBox),
                fieldRegion = field.fieldEl.getPageBox(true);

            // Focus by mouse click or finger tap, or not iOS
            if (this.focusingField == field || !Ext.is.iOS) {
                if (Ext.is.iOS && window.pageYOffset == 0) {
                    window.scrollTo(0, 0);
                }

                var adjustment = new Ext.util.Offset();

                if (fieldRegion.left < containerRegion.left) {
                    adjustment.x = containerRegion.left - fieldRegion.left;
                }

                if (fieldRegion.top < containerRegion.top) {
                    adjustment.y = containerRegion.top - fieldRegion.top;
                }

                if (!adjustment.isZero()) {
                    var windowScroll = this.getLastWindowScroll();

                    scroller.scrollBy(adjustment);

                    if (Ext.is.iOS) {
                        window.scrollTo(windowScroll.x, windowScroll.y);
                    }

                    this.resetLastWindowScroll();
                }
            }
            // Focus by next / previous / tab
            else {
                if (this.lastFocusedField) {
                    var deltaY = fieldRegion.top - this.lastFocusedField.fieldEl.getY(),
                        offsetY = scroller.offset.y - deltaY,
                        selfHandling = false;

                    if (!containerRegion.contains(fieldRegion) &&
                        (offsetY != 0 || (offsetY == 0 && scroller.offset.y != 0))) {
                        selfHandling = true;
                    }

                    if (offsetY > 0) {
                        offsetY = 0;
                    }

                    if (selfHandling) {
                        this.adjustScroller(new Ext.util.Offset(
                            scroller.offset.x, offsetY
                        ));
                    }
                }
            }

            this.resetLastWindowScroll();
        }

        this.lastFocusedField = field;
        this.focusedField = field;
        this.focusingField = null;
    },

    getClosestScroller: function() {
        if (!this.closestScroller) {
            this.closestScroller = this.scroller || this.el.getScrollParent();
        }

        return this.closestScroller;
    },

    onFieldBlur: function(field, e) {
        if (this.focusingField == field) {
            this.focusingField = null;
        }

        if (this.focusedField == field) {
            this.focusedField = null;
        }
    },

    // @private
    afterLayout : function(layout) {
        if (this.floating && this.centered) {
            this.setCentered(true, true);
        }

        if (this.scroller) {
            this.scroller.updateBoundary();
        }
        Ext.Container.superclass.afterLayout.call(this, layout);
    },

    /**
     * Returns the current activeItem for the layout (only for a card layout)
     * @return {activeItem} activeItem Current active component
     */
    getActiveItem : function() {
        if (this.layout && this.layout.type == 'card') {
            return this.layout.activeItem;
        }
        else {
            return null;
        }
    },

    /**
     * Allows you to set the active card in this container. This
     * method is only available if the container uses a CardLayout.
     * Note that a Carousel and TabPanel both get a CardLayout
     * automatically, so both of those components are able to use this method.
     * @param {Ext.Component/Number/Object} card The card you want to be made active. A number
     * is interpreted as a card index. An object will be converted to a Component using the
     * objects xtype property, then added to the container and made active. Passing a Component
     * will make sure the component is a child of this container, and then make it active.
     * @param {String/Object} cardSwitchAnimation (optional) The cardSwitchAnimation used to switch between the cards.
     * This can be an animation type string or an animation configuration object.
     * @return {Ext.Container} this
     */
    setActiveItem : function(card, animation) {
        this.layout.setActiveItem(card, animation);
        return this;
    },

    //<deprecated since=0.99>
    setCard: function() {
        console.warn("Container: setCard has been deprecated. Please use setActiveItem.");
        this.setActiveItem.apply(this, arguments);
    },
    //</deprecated>

    /**
     * A template method that can be implemented by subclasses of
     * Container. By returning false we can cancel the card switch.
     * @param {Ext.Component} newCard The card that will be switched to
     * @param {Ext.Component} oldCard The card that will be switched from
     * @param {Number} newIndex The Container index position of the selected card
     * @param {Boolean} animated True if this cardswitch will be animated
     * @private
     */
    onBeforeCardSwitch : function(newCard, oldCard, newIndex, animated) {
        return this.fireEvent('beforecardswitch', this, newCard, oldCard, newIndex, animated);
    },

    /**
     * A template method that can be implemented by subclasses of
     * Container. If the card is switched using an animation, this method
     * will be called after the animation has finished.
     * @param {Ext.Component} newCard The card that has been switched to
     * @param {Ext.Component} oldCard The card that has been switched from
     * @param {Number} newIndex The Container index position of the selected card
     * @param {Boolean} animated True if this cardswitch was animated
     * @private
     */
    onCardSwitch : function(newCard, oldCard, newIndex, animated) {
        return this.fireEvent('cardswitch', this, newCard, oldCard, newIndex, animated);
    },

    /**
     * Disable this container by masking out
     */
    disable: function() {
        Ext.Container.superclass.disable.call(this);
        this.el.mask(null, 'x-mask-gray');
    },

    /**
     * Enable this container by removing mask
     */
    enable: function() {
        Ext.Container.superclass.enable.call(this);
        this.el.unmask();
    }
});

Ext.reg('container', Ext.Container);

/**
 * @class Ext.lib.Panel
 * @extends Ext.Container
 * Shared Panel class
 */
Ext.lib.Panel = Ext.extend(Ext.Container, {
    /**
     * @cfg {String} baseCls
     * The base CSS class to apply to this panel's element (defaults to <code>'x-panel'</code>).
     */
    baseCls : 'x-panel',

    /**
     * @cfg {Number/Boolean} bodyPadding
     * A shortcut for setting a padding style on the body element. The value can either be
     * a number to be applied to all sides, or a normal css string describing padding.
     * Defaults to <tt>undefined</tt>.
     */

    /**
     * @cfg {Number/Boolean} bodyMargin
     * A shortcut for setting a margin style on the body element. The value can either be
     * a number to be applied to all sides, or a normal css string describing margins.
     * Defaults to <tt>undefined</tt>.
     */

    /**
     * @cfg {Number/Boolean} bodyBorder
     * A shortcut for setting a border style on the body element. The value can either be
     * a number to be applied to all sides, or a normal css string describing borders.
     * Defaults to <tt>undefined</tt>.
     */

    isPanel: true,

    componentLayout: 'dock',

    renderTpl: ['<div class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>></div>'],

    /**
     * @cfg {Object/Array} dockedItems
     * A component or series of components to be added as docked items to this panel.
     * The docked items can be docked to either the top, right, left or bottom of a panel.
     * This is typically used for things like toolbars or tab bars:
     * <pre><code>
var panel = new Ext.Panel({
    fullscreen: true,
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Docked to the bottom'
        }]
    }]
});</pre></code>
     */

    initComponent : function() {
        this.addEvents(
            /**
             * @event bodyresize
             * Fires after the Panel has been resized.
             * @param {Ext.Panel} p the Panel which has been resized.
             * @param {Number} width The Panel body's new width.
             * @param {Number} height The Panel body's new height.
             */
            'bodyresize'
            // // inherited
            // 'activate',
            // // inherited
            // 'deactivate'
        );

        Ext.applyIf(this.renderSelectors, {
            body: '.' + this.baseCls + '-body'
        });

        Ext.lib.Panel.superclass.initComponent.call(this);
    },

    // @private
    initItems : function() {
        Ext.lib.Panel.superclass.initItems.call(this);

        var items = this.dockedItems;
        this.dockedItems = new Ext.util.MixedCollection(false, this.getComponentId);
        if (items) {
            this.addDocked(items);
        }
    },

    /**
     * Finds a docked component by id, itemId or position
     * @param {String/Number} comp The id, itemId or position of the child component (see {@link #getComponent} for details)
     * @return {Ext.Component} The component (if found)
     */
    getDockedComponent: function(comp) {
        if (Ext.isObject(comp)) {
            comp = comp.getItemId();
        }
        return this.dockedItems.get(comp);
    },

    /**
     * Attempts a default component lookup (see {@link Ext.Container#getComponent}). If the component is not found in the normal
     * items, the dockedItems are searched and the matched component (if any) returned (see {@link #getDockedComponent}).
     * @param {String/Number} comp The docked component id or itemId to find
     * @return {Ext.Component} The docked component, if found
     */
    getComponent: function(comp) {
        var component = Ext.lib.Panel.superclass.getComponent.call(this, comp);
        if (component == undefined) {
            component = this.getDockedComponent(comp);
        }
        return component;
    },

    /**
     * Function description
     * @return {String} A CSS style string with style, padding, margin and border.
     * @private
     */
    initBodyStyles: function() {
        var bodyStyle = Ext.isString(this.bodyStyle) ? this.bodyStyle.split(';') : [],
            Element = Ext.Element;

        if (this.bodyPadding != undefined) {
            bodyStyle.push('padding: ' + Element.unitizeBox((this.bodyPadding === true) ? 5 : this.bodyPadding));
        }
        if (this.bodyMargin != undefined) {
            bodyStyle.push('margin: ' + Element.unitizeBox((this.bodyMargin === true) ? 5 : this.bodyMargin));
        }
        if (this.bodyBorder != undefined) {
            bodyStyle.push('border-width: ' + Element.unitizeBox((this.bodyBorder === true) ? 1 : this.bodyBorder));
        }
        delete this.bodyStyle;
        return bodyStyle.length ? bodyStyle.join(';') : undefined;
    },

    /**
     * Initialized the renderData to be used when rendering the renderTpl.
     * @return {Object} Object with keys and values that are going to be applied to the renderTpl
     * @private
     */
    initRenderData: function() {
        return Ext.applyIf(Ext.lib.Panel.superclass.initRenderData.call(this), {
            bodyStyle: this.initBodyStyles(),
            bodyCls: this.bodyCls
        });
    },

    /**
     * Adds docked item(s) to the panel.
     * @param {Object/Array} component. The Component or array of components to add. The components
     * must include a 'dock' paramater on each component to indicate where it should be docked ('top', 'right',
     * 'bottom', 'left').
     * @param {Number} pos (optional) The index at which the Component will be added
     */
    addDocked : function(items, pos) {
        items = this.prepareItems(items);

        var item, i, ln;
        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            item.dock = item.dock || 'top';
            if (pos !== undefined) {
                this.dockedItems.insert(pos+i, item);
            }
            else {
                this.dockedItems.add(item);
            }
            item.onAdded(this, i);
            this.onDockedAdd(item);
        }
        if (this.rendered) {
            this.doComponentLayout();
        }
    },

    // Placeholder empty functions
    onDockedAdd : Ext.emptyFn,
    onDockedRemove : Ext.emptyFn,

    /**
     * Inserts docked item(s) to the panel at the indicated position.
     * @param {Number} pos The index at which the Component will be inserted
     * @param {Object/Array} component. The Component or array of components to add. The components
     * must include a 'dock' paramater on each component to indicate where it should be docked ('top', 'right',
     * 'bottom', 'left').
     */
    insertDocked : function(pos, items) {
        this.addDocked(items, pos);
    },

    /**
     * Removes the docked item from the panel.
     * @param {Ext.Component} item. The Component to remove.
     * @param {Boolean} autoDestroy (optional) Destroy the component after removal.
     */
    removeDocked : function(item, autoDestroy) {
        if (!this.dockedItems.contains(item)) {
            return item;
        }

        var layout = this.componentLayout,
            hasLayout = layout && this.rendered;

        if (hasLayout) {
            layout.onRemove(item);
        }

        this.dockedItems.remove(item);
        item.onRemoved();
        this.onDockedRemove(item);

        if (autoDestroy === true || (autoDestroy !== false && this.autoDestroy)) {
            item.destroy();
        }

        if (hasLayout && !autoDestroy) {
            layout.afterRemove(item);
        }
        this.doComponentLayout();

        return item;
    },

    /**
     * Retrieve an array of all currently docked components.
     * @return {Array} An array of components.
     */
    getDockedItems : function() {
        if (this.dockedItems && this.dockedItems.items.length) {
            return this.dockedItems.items.slice();
        }
        return [];
    },

    // @private
    getTargetEl : function() {
        return this.body;
    },


    getRefItems: function(deep) {
        var refItems    = Ext.lib.Panel.superclass.getRefItems.call(this, deep),
            // deep does not account for dockedItems within dockedItems.
            dockedItems = this.getDockedItems(),
            ln          = dockedItems.length,
            i           = 0,
            item;

        refItems = refItems.concat(dockedItems);

        if (deep) {
            for (; i < ln; i++) {
                item = dockedItems[i];
                if (item.getRefItems) {
                    refItems = refItems.concat(item.getRefItems(true));
                }
            }
        }

        return refItems;
    },
    
    beforeDestroy: function(){
        var docked = this.dockedItems,
            c;
            
        if (docked) {
            while ((c = docked.first())) {
                this.removeDocked(c, true);
            }
        }
        Ext.lib.Panel.superclass.beforeDestroy.call(this);
    }
});

// Declare here so we can test
Ext.Panel = Ext.extend(Ext.lib.Panel, {});
Ext.reg('panel', Ext.Panel);

/**
 * @class Ext.Panel
 * @extends Ext.lib.Panel
 * <p>Panel is a container that has specific functionality and structural components that make
 * it the perfect building block for application-oriented user interfaces.</p>
 * <p>Panels are, by virtue of their inheritance from {@link Ext.Container}, capable
 * of being configured with a {@link Ext.Container#layout layout}, and containing child Components.</p>
 * <p>When either specifying child {@link Ext.Component#items items} of a Panel, or dynamically {@link Ext.Container#add adding} Components
 * to a Panel, remember to consider how you wish the Panel to arrange those child elements, and whether
 * those child elements need to be sized using one of Ext's built-in <code><b>{@link Ext.Container#layout layout}</b></code> schemes. By
 * default, Panels use the {@link Ext.layout.ContainerLayout ContainerLayout} scheme. This simply renders
 * child components, appending them one after the other inside the Container, and <b>does not apply any sizing</b>
 * at all.</p>
 * 
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #fullscreen}</li>
 *   <li>{@link #layout}</li>
 *   <li>{@link #items}</li>
 *   <li>{@link #dockedItems}</li>
 *   <li>{@link #html}</li>
 * </ul>
 * 
 * <h2>Useful Methods</h2>
 * <ul class="list">
 *   <li>{@link #show}</li>
 *   <li>{@link #hide}</li>
 *   <li>{@link #showBy}</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Panel/screenshot.png Ext.Panel screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
var panel = new Ext.Panel({
    fullscreen: true,
    
    dockedItems: [
        {
            dock : 'top',
            xtype: 'toolbar',
            title: 'Standard Titlebar'
        },
        {
            dock : 'top',
            xtype: 'toolbar',
            ui   : 'light',
            items: [
                {
                    text: 'Test Button'
                }
            ]
        }
    ],
    
    html: 'Testing'
});</code></pre>
 * 
 * @constructor
 * Create a new Panel
 * @param {Object} config The config object 
 * @xtype panel
 */
Ext.Panel = Ext.extend(Ext.lib.Panel, {
    // inherited
    scroll: false
});

Ext.reg('panel', Ext.Panel);
/**
 * @class Ext.Button
 * @extends Ext.Component
 *
 * <p>A simple class to display different styles of buttons.</p>
 *
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #ui} (defines the style of the button)</li>
 * </ul>
 *
 * <h2>Useful Methods</h2>
 * <ul class="list">
 *   <li>{@link #handler} (method to be called when the button is tapped)</li>
 * </ul>
 *
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Button/screenshot.png Ext.Button screenshot}
 *
 * <h2>Example code:</h2>
<pre><code>
// an array of buttons (using xtypes) to be included in the panel below
var buttons = [
    {
        text: 'Normal'
    },
    {
        ui  : 'round',
        text: 'Round'
    },
    {
        ui  : 'small',
        text: 'Small'
    }
];

var panel = new Ext.Panel({
    layout: {
        type : 'vbox',
        pack : 'center',
        align: 'stretch'
    },
    defaults: {
        layout: {
            type: 'hbox'
        },
        flex: 1,
        defaults: {
            xtype: 'button',
            cls  : 'demobtn',
            flex : 1
        }
    },
    items: [
        {
            items: buttons // buttons array defined above
        },
        {
            items: [
                new Ext.Button({
                    ui  : 'decline',
                    text: 'Drastic'
                }),
                {
                    ui  : 'decline-round',
                    text: 'Round'
                },
                {
                    ui  : 'decline-small',
                    text: 'Small'
                }
            ]
        },
        {
            items: [
                {
                    ui  : 'confirm',
                    text: 'Confirm'
                },
                {
                    ui  : 'confirm-round',
                    text: 'Round'
                },
                {
                    ui  : 'confirm-small',
                    text: 'Small'
                }
            ]
        }
    ]
});
</code></pre>
 */

/**
 * @constructor
 * Create a new button
 * @param {Object} config The config object
 * @xtype button
 */
Ext.Button = Ext.extend(Ext.Component, {
    /**
     * @cfg {String/Object} autoEvent If provided, a handler function is automatically created that fires
     * the given event in the configured {@link #scope}.
     */

    initComponent: function(){
        this.addEvents(
            /**
             * @event tap
             * Fires when the button is tapped.
             * @param {Ext.Button} this
             * @param {Ext.EventObject} e
             */
            'tap',

            /**
             * @event beforetap
             * Fires when the button is tapped but before we call the handler or fire the tap event.
             * Return false in a handler to prevent this.
             * @param {Ext.Button} this
             * @param {Ext.EventObject} e
             */
            'beforetap'
        );
        Ext.Button.superclass.initComponent.call(this);

        this.createAutoHandler();
    },

    /**
     * @cfg {String} iconCls
     * A css class which sets a background image to be used as the icon for this button
     */

    /**
     * @cfg {String} text The button text to be used as innerHTML (html tags are accepted)
     */

    /**
     * @cfg {String} icon The path to an image to display in the button (the image will be set as the background-image
     * CSS property of the button by default, so if you want a mixed icon/text button, set cls:'x-btn-text-icon')
     */

    /**
     * @cfg {String} iconAlign The alignment of the buttons icon if one has been defined. Valid options
     * are 'top', 'right', 'bottom', 'left' (defaults to 'left').
     */
    iconAlign: 'left',

    /**
     * @cfg {Function} handler A function called when the button is clicked (can be used instead of click event).
     * The handler is passed the following parameters:<div class="mdetail-params"><ul>
     * <li><code>b</code> : Button<div class="sub-desc">This Button.</div></li>
     * <li><code>e</code> : EventObject<div class="sub-desc">The click event.</div></li>
     * </ul></div>
     */

    /**
     * @cfg {Object} scope The scope (<tt><b>this</b></tt> reference) in which the
     * <code>{@link #handler}</code> and <code>{@link #toggleHandler}</code> is
     * executed. Defaults to this Button.
     */

    /**
     * @cfg {Boolean} hidden True to start hidden (defaults to false)
     */

    /**
     * @cfg {Boolean} disabled True to start disabled (defaults to false)
     */

    /**
     * @cfg {String} baseCls Base CSS class
     * Defaults to <tt>'x-button'</tt>
     */
    baseCls: 'x-button',

    /**
     * @cfg {String} pressedCls CSS class when the button is in pressed state
     * Defaults to <tt>'x-button-pressed'</tt>
     */
    pressedCls: 'x-button-pressed',

    /**
     * @cfg {String} badgeText The text to be used for a small badge on the button.
     * Defaults to <tt>''</tt>
     */
    badgeText: '',

    /**
     * @cfg {String} badgeCls CSS class for badge
     * Defaults to <tt>'x-badge'</tt>
     */
    badgeCls: 'x-badge',

    hasBadgeCls: 'x-hasbadge',

    labelCls: 'x-button-label',

    /**
     * @cfg {String} ui
     * Determines the UI look and feel of the button. Valid options are 'normal', 'back', 'round', 'action', 'forward',
     * 'decline', 'confirm' and 'small'. The 'round' and 'small' UIs can also be appended to the other options - for
     * example 'confirm-small', 'action-round', 'forward-small' etc
     * Defaults to 'normal'.
     */
    ui: 'normal',

    isButton: true,

    /**
     * @cfg {String} cls
     * A CSS class string to apply to the button's main element.
     */

    /**
     * @cfg {Number} pressedDelay
     * The amount of delay between the tapstart and the moment we add the pressedCls.
     * Settings this to true defaults to 100ms
     */
    pressedDelay: 0,

    /**
     * @cfg {String} iconMaskCls
     * CSS class to be added to the iconEl when the iconMask config is set to true.
     * Defaults to 'x-icon-mask'
     */
    iconMaskCls: 'x-icon-mask',

    /**
     * @cfg {Boolean} iconMask
     * Whether or not to mask the icon with the iconMaskCls configuration. Defaults to false.
     */
    iconMask: false,

    // @private
    afterRender : function(ct, position) {
        var me = this;

        Ext.Button.superclass.afterRender.call(me, ct, position);

        var text = me.text,
            icon = me.icon,
            iconCls = me.iconCls,
            badgeText = me.badgeText;

        me.text = me.icon = me.iconCls = me.badgeText = null;

        me.setText(text);
        me.setIcon(icon);
        me.setIconClass(iconCls);

        if (me.iconMask && me.iconEl) {
            me.iconEl.addCls(me.iconMaskCls);
        }
        me.setBadge(badgeText);
    },

    // @private
    initEvents : function() {
        var me = this;

        Ext.Button.superclass.initEvents.call(me);

        me.mon(me.el, {
            scope: me,

            tap      : me.onPress,
            tapstart : me.onTapStart,
            tapcancel: me.onTapCancel
        });
    },

    // @private
    onTapStart : function() {
        var me = this;
        if (!me.disabled) {
            if (me.pressedDelay) {
                me.pressedTimeout = setTimeout(function() {
                    me.el.addCls(me.pressedCls);
                }, Ext.isNumber(me.pressedDelay) ? me.pressedDelay : 100);
            }
            else {
                me.el.addCls(me.pressedCls);
            }
        }
    },

    // @private
    onTapCancel : function() {
        var me = this;
        if (me.pressedTimeout) {
            clearTimeout(me.pressedTimeout);
            delete me.pressedTimeout;
        }
        me.el.removeCls(me.pressedCls);
    },

    /**
     * Assigns this Button's click handler
     * @param {Function} handler The function to call when the button is clicked
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the handler function is executed.
     * Defaults to this Button.
     * @return {Ext.Button} this
     */
    setHandler : function(handler, scope) {
        this.handler = handler;
        this.scope = scope;
        return this;
    },

    /**
     * Sets this Button's text
     * @param {String} text The button text. If you pass null or undefined the text will be removed.
     * @return {Ext.Button} this
     */
    setText: function(text) {
        var me = this;

        if (me.rendered) {
            if (!me.textEl && text) {
                me.textEl = me.el.createChild({
                    tag: 'span',
                    html: text,
                    cls: this.labelCls
                });
            }
            else if (me.textEl && text != me.text) {
                if (text) {
                    me.textEl.setHTML(text);
                }
                else {
                    me.textEl.remove();
                    me.textEl = null;
                }
            }
        }
        me.text = text;
        return me;
    },

    /**
     * Sets the background image (inline style) of the button.  This method also changes
     * the value of the {@link icon} config internally.
     * @param {String} icon The path to an image to display in the button. If you pass null or undefined the icon will be removed.
     * @return {Ext.Button} this
     */
    setIcon: function(icon) {
        var me = this;

        if (me.rendered) {
            if (!me.iconEl && icon) {
                me.iconEl = me.el.createChild({
                    tag: 'img',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'background-image: ' + (icon ? 'url(' + icon + ')' : '')
                });

                me.setIconAlign(me.iconAlign);
            }
            else if (me.iconEl && icon != me.icon) {
                if (icon) {
                    me.iconEl.setStyle('background-image', icon ? 'url(' + icon + ')' : '');
                    me.setIconAlign(me.iconAlign);
                }
                else {
                    me.setIconAlign(false);
                    me.iconEl.remove();
                    me.iconEl = null;
                }
            }
        }
        me.icon = icon;
        return me;
    },

    /**
     * Sets the CSS class that provides a background image to use as the button's icon.  This method also changes
     * the value of the {@link iconCls} config internally.
     * @param {String} cls The CSS class providing the icon image. If you pass null or undefined the iconCls will be removed.
     * @return {Ext.Button} this
     */
    setIconClass: function(cls) {
        var me = this;

        if (me.rendered) {
            if (!me.iconEl && cls) {
                me.iconEl = me.el.createChild({
                    tag: 'img',
                    src: Ext.BLANK_IMAGE_URL,
                    cls: cls
                });

                me.setIconAlign(me.iconAlign);
            }
            else if (me.iconEl && cls != me.iconCls) {
                if (cls) {
                    if (me.iconCls) {
                        me.iconEl.removeCls(me.iconCls);
                    }
                    me.iconEl.addCls(cls);
                    me.setIconAlign(me.iconAlign);
                }
                else {
                    me.setIconAlign(false);
                    me.iconEl.remove();
                    me.iconEl = null;
                }
            }
        }
        me.iconCls = cls;
        return me;
    },

    /**
     * Adds a CSS class to the button that changes the align of the button's icon (if one has been defined).  If no icon or iconClass has
     * been defined, it will only set the value of the {@link iconAlign} internal config.
     * @param {String} alignment The alignment you would like to align the button. Valid options are 'top', 'bottom', 'left', 'right'.
     *                           If you pass false, it will remove the current iconAlign. If you pass nothing or an invalid alignment,
     *                           it will default to the last used/default iconAlign.
     * @return {Ext.Button} this
     */
    setIconAlign: function(alignment) {
        var me         = this,
            alignments = ['top', 'right', 'bottom', 'left'],
            alignment  = ((alignments.indexOf(alignment) == -1 || !alignment) && alignment !== false) ? me.iconAlign : alignment,
            i;

        if (me.rendered && me.iconEl) {
            me.el.removeCls('x-iconalign-' + me.iconAlign);

            if (alignment) me.el.addCls('x-iconalign-' + alignment);
        }
        me.iconAlign = (alignment === false) ? me.iconAlign : alignment;
        return me;
    },

    /**
     * Creates a badge overlay on the button for displaying notifications.
     * @param {String} text The text going into the badge. If you pass null or undefined the badge will be removed.
     * @return {Ext.Button} this
     */
    setBadge : function(text) {
        var me = this;

        if (me.rendered) {
            if (!me.badgeEl && text) {
                me.badgeEl = me.el.createChild({
                    tag: 'span',
                    cls: me.badgeCls,
                    html: text
                });
                me.el.addCls(me.hasBadgeCls);
            }
            else if (me.badgeEl && text != me.badgeText) {
                if (text) {
                    me.badgeEl.setHTML(text);
                    me.el.addCls(me.hasBadgeCls);
                }
                else {
                    me.badgeEl.remove();
                    me.badgeEl = null;
                    me.el.removeCls(me.hasBadgeCls);
                }
            }
        }
        me.badgeText = text;
        return me;
    },

    /**
     * Gets the text for this Button
     * @return {String} The button text
     */
    getText : function() {
        return this.text;
    },

    /**
     * Gets the text for this Button's badge
     * @return {String} The button text
     */
    getBadgeText : function() {
        return this.badgeText;
    },

    // @private
    onDisable : function() {
        this.onDisableChange(true);
    },

    // @private
    onEnable : function() {
        this.onDisableChange(false);
    },

    // @private
    onDisableChange : function(disabled) {
        var me = this;
        if (me.el) {
            me.el[disabled ? 'addCls' : 'removeCls'](me.disabledCls);
            me.el.dom.disabled = disabled;
        }
        me.disabled = disabled;
    },

    // @private
    onPress : function(e) {
        var me = this;
        if (!me.disabled && this.fireEvent('beforetap') !== false) {
            setTimeout(function() {
                if (!me.preventCancel) {
                    me.onTapCancel();
                }
                me.callHandler(e);
                me.fireEvent('tap', me, e);
            }, 10);
        }
    },

    // @private
    callHandler: function(e) {
        var me = this;
        if (me.handler) {
            me.handler.call(me.scope || me, me, e);
        }
    },

    /**
     * @private
     * If {@link #autoEvent} is set, this creates a handler function that automatically fires that configured
     * event. This is called by initComponent and should never need to be called again.
     */
    createAutoHandler: function() {
        var me = this,
            autoEvent = me.autoEvent;

        if (autoEvent) {
            if (typeof autoEvent == 'string') {
                autoEvent = {
                    name: autoEvent,
                    scope: me.scope || me
                };
            }

            me.addEvents(autoEvent.name);

            me.setHandler(function() {
                autoEvent.scope.fireEvent(autoEvent.name, autoEvent.scope, me);
            }, autoEvent.scope);
        }
    }
});

Ext.reg('button', Ext.Button);

/**
 * @class Ext.SegmentedButton
 * @extends Ext.Container
 * <p>SegmentedButton is a container for a group of {@link Ext.Button}s. Generally a SegmentedButton would be 
 * a child of a {@link Ext.Toolbar} and would be used to switch between different views.</p>
 * 
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #allowMultiple}</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.SegmentedButton/screenshot.png Ext.SegmentedButton screenshot}
 * 
 * <h2>Example usage:</h2>
 * <pre><code>
var segmentedButton = new Ext.SegmentedButton({
    allowMultiple: true,
    items: [
        {
            text: 'Option 1'
        },
        {
            text   : 'Option 2',
            pressed: true,
            handler: tappedFn
        },
        {
            text: 'Option 3'
        }
    ],
    listeners: {
        toggle: function(container, button, pressed){
            console.log("User toggled the '" + button.text + "' button: " + (pressed ? 'on' : 'off'));
        }
    }
});</code></pre>
 * @constructor
 * @param {Object} config The config object
 * @xtype buttons
 */
Ext.SegmentedButton = Ext.extend(Ext.Container, {
    defaultType: 'button',
    componentCls: 'x-segmentedbutton',
    pressedCls: 'x-button-pressed',

    /**
     * @cfg {Boolean} allowMultiple
     * Allow multiple pressed buttons (defaults to false).
     */
    allowMultiple: false,

    /**
     * @cfg {Boolean} allowDepress
     * Allow to depress a pressed button. (defaults to true when allowMultiple is true)
     */
    
    // @private
    initComponent : function() {
        this.layout = Ext.apply({}, this.layout || {}, {
            type: 'hbox',
            align: 'stretch'
        });
        
        Ext.SegmentedButton.superclass.initComponent.call(this);
        
        if (this.allowDepress === undefined) {
            this.allowDepress = this.allowMultiple;
        }
        
        this.addEvents(
            /**
             * @event toggle
             * Fires when any child button's pressed state has changed.
             * @param {Ext.SegmentedButton} this
             * @param {Ext.Button} button The button whose state has changed  
             * @param {Boolean} pressed The new button state.
             */
            'toggle'
        );
    },

    // @private
    initEvents : function() {
        Ext.SegmentedButton.superclass.initEvents.call(this);

        this.mon(this.el, {
            tap: this.onTap,
            capture: true,
            scope: this
        });
    },

    // @private
    afterLayout : function(layout) {
        var me = this;
        
        Ext.SegmentedButton.superclass.afterLayout.call(me, layout);

        if (!me.initialized) {
            me.items.each(function(item, index) {
                me.setPressed(item, !!item.pressed, true); 
            });
            if (me.allowMultiple) {
                me.pressedButtons = me.getPressedButtons();
            }
            me.initialized = true;
        }
    },

    // @private
    onTap : function(e, t) {
        if (!this.disabled && (t = e.getTarget('.x-button'))) {
            this.setPressed(t.id, this.allowDepress ? undefined : true);
        }
    },
    
    /**
     * Gets the pressed button(s)
     * @returns {Array/Button} The pressed button or an array of pressed buttons (if allowMultiple is true)
     */
    getPressed : function() {
        return this.allowMultiple ? this.getPressedButtons() : this.pressedButton;
    },

    /**
     * Activates a button
     * @param {Number/String/Button} position/id/button. The button to activate.
     * @param {Boolean} pressed if defined, sets the pressed state of the button,
     *  otherwise the pressed state is toggled
     * @param {Boolean} suppressEvents true to suppress toggle events during the action.
     * If allowMultiple is true, then setPressed will toggle the button state.
     */
    setPressed : function(btn, pressed, suppressEvents) {
        var me = this;
        
        btn = me.getComponent(btn);
        if (!btn || !btn.isButton || btn.disabled) {
            if (!me.allowMultiple && me.pressedButton) {
                me.setPressed(me.pressedButton, false);
            }
            return;
        }
        
        if (!Ext.isBoolean(pressed)) {
            pressed = !btn.pressed;
        }
        
        if (pressed) {
            if (!me.allowMultiple) {
                if (me.pressedButton && me.pressedButton !== btn) {
                    me.pressedButton.el.removeCls(me.pressedCls);
                    me.pressedButton.pressed = false;
                    if (suppressEvents !== true) {
                        me.fireEvent('toggle', me, me.pressedButton, false);
                    }               
                }
                me.pressedButton = btn;
            }

            btn.el.addCls(me.pressedCls);
            btn.pressed = true;
            btn.preventCancel = true;
            if (me.initialized && suppressEvents !== true) {
                me.fireEvent('toggle', me, btn, true);
            }
        }
        else if (!pressed) {
            if (!me.allowMultiple && btn === me.pressedButton) {
                me.pressedButton = null;
            }
            
            if (btn.pressed) {
                btn.el.removeCls(me.pressedCls);
                btn.pressed = false;
                if (suppressEvents !== true) {
                    me.fireEvent('toggle', me, btn, false);
                }
            }
        }
        
        if (me.allowMultiple && me.initialized) {
            me.pressedButtons = me.getPressedButtons();
        }
    },
    
    // @private
    getPressedButtons : function(toggleEvents) {
        var pressed = this.items.filterBy(function(item) {
            return item.isButton && !item.disabled && item.pressed;
        });
        return pressed.items;
    },

    /**
     * Disables all buttons
     */
    disable : function() {
        this.items.each(function(item) {
            item.disable();
        });

        Ext.SegmentedButton.superclass.disable.apply(this, arguments);
    },

    /**
     * Enables all buttons
     */
    enable : function() {
        this.items.each(function(item) {
            item.enable();
        }, this);

        Ext.SegmentedButton.superclass.enable.apply(this, arguments);
    }
});

Ext.reg('segmentedbutton', Ext.SegmentedButton);
/**
 * @class Ext.AbstractStoreSelectionModel
 * @extends Ext.util.Observable
 *
 * Tracks what records are currently selected in a databound widget.
 *
 * This is an abstract class and is not meant to be directly used.
 *
 * DataBound UI widgets such as GridPanel, TreePanel, and ListView
 * should subclass AbstractStoreSelectionModel and provide a way
 * to binding to the component.
 *
 * The abstract methods onSelectChange and onLastFocusChanged should
 * be implemented in these subclasses to update the UI widget.
 */
Ext.AbstractStoreSelectionModel = Ext.extend(Ext.util.Observable, {
    // lastSelected

    /**
     * @cfg {String} mode
     * Modes of selection.
     * Valid values are SINGLE, SIMPLE, and MULTI. Defaults to 'SINGLE'
     */
    
    /**
     * @cfg {Boolean} allowDeselect
     * Allow users to deselect a record in a DataView, List or Grid. Only applicable when the SelectionModel's mode is 'SINGLE'. Defaults to false.
     */
    allowDeselect: false,

    /**
     * @property selected
     * READ-ONLY A MixedCollection that maintains all of the currently selected
     * records.
     */
    selected: null,

    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(this, cfg);

        this.modes = {
            SINGLE: true,
            SIMPLE: true,
            MULTI: true
        };

        // sets this.selectionMode
        this.setSelectionMode(cfg.mode);

        // maintains the currently selected records.
        this.selected = new Ext.util.MixedCollection();

        Ext.AbstractStoreSelectionModel.superclass.constructor.call(this, cfg);
    },

    // binds the store to the selModel.
    bind : function(store, initial){
        if(!initial && this.store){
            if(store !== this.store && this.store.autoDestroy){
                this.store.destroy();
            }else{
                this.store.un("add", this.onStoreAdd, this);
                this.store.un("clear", this.onStoreClear, this);
                this.store.un("remove", this.onStoreRemove, this);
                this.store.un("update", this.onStoreUpdate, this);
            }
        }
        if(store){
            store = Ext.StoreMgr.lookup(store);
            store.on({
                add: this.onStoreAdd,
                clear: this.onStoreClear,
                remove: this.onStoreRemove,
                update: this.onStoreUpdate,
                scope: this
            });
        }
        this.store = store;
        if(store && !initial) {
            this.refresh();
        }
    },

    selectAll: function(silent) {
        var selections = this.store.getRange();
        for (var i = 0, ln = selections.length; i < ln; i++) {
            this.doSelect(selections[i], true, silent);
        }
    },

    deselectAll: function() {
        var selections = this.getSelection();
        for (var i = 0, ln = selections.length; i < ln; i++) {
            this.doDeselect(selections[i]);
        }
    },

    // Provides differentiation of logic between MULTI, SIMPLE and SINGLE
    // selection modes. Requires that an event be passed so that we can know
    // if user held ctrl or shift.
    selectWithEvent: function(record, e) {
        switch (this.selectionMode) {
            case 'MULTI':
                if (e.ctrlKey && this.isSelected(record)) {
                    this.doDeselect(record, false);
                } else if (e.shiftKey && this.lastFocused) {
                    this.selectRange(this.lastFocused, record, e.ctrlKey);
                } else if (e.ctrlKey) {
                    this.doSelect(record, true, false);
                } else if (this.isSelected(record) && !e.shiftKey && !e.ctrlKey && this.selected.getCount() > 1) {
                    this.doSelect(record, false, false);
                } else {
                    this.doSelect(record, false);
                }
                break;
            case 'SIMPLE':
                if (this.isSelected(record)) {
                    this.doDeselect(record);
                } else {
                    this.doSelect(record, true);
                }
                break;
            case 'SINGLE':
                // if allowDeselect is on and this record isSelected, deselect it
                if (this.allowDeselect && this.isSelected(record)) {
                    this.doDeselect(record);
                // select the record and do NOT maintain existing selections
                } else {
                    this.doSelect(record, false);
                }
                break;
        }
    },

    /**
     * Selects a range of rows if the selection model
     * {@link Ext.grid.AbstractSelectionModel#isLocked is not locked}.
     * All rows in between startRow and endRow are also selected.
     * @param {Number} startRow The index of the first row in the range
     * @param {Number} endRow The index of the last row in the range
     * @param {Boolean} keepExisting (optional) True to retain existing selections
     */
    selectRange : function(startRecord, endRecord, keepExisting, dir){
        var i,
            startRow = this.store.indexOf(startRecord),
            endRow = this.store.indexOf(endRecord),
            tmp,
            selectedCount = 0,
            dontDeselect;

        if (this.isLocked()){
            return;
        }

        // swap values
        if (startRow > endRow){
            tmp = endRow;
            endRow = startRow;
            startRow = tmp;
        }

        for (i = startRow; i <= endRow; i++) {
            if (this.isSelected(this.store.getAt(i))) {
                selectedCount++;
            }
        }

        if (!dir) {
            dontDeselect = -1;
        } else {
            dontDeselect = (dir == 'up') ? startRow : endRow;
        }
        for (i = startRow; i <= endRow; i++){
            if (selectedCount == (endRow - startRow + 1)) {
                if (i != dontDeselect) {
                    this.doDeselect(i, true);
                }
            } else {
                this.doSelect(i, true);
            }

        }
    },
    
    /**
     * Selects a record instance by record instance or index.
     * @param {Ext.data.Record/Index} records An array of records or an index
     * @param {Boolean} keepExisting
     * @param {Boolean} suppressEvent Set to false to not fire a select event
     */
    select: function(records, keepExisting, suppressEvent) {
        this.doSelect(records, keepExisting, suppressEvent);
    },

    /**
     * Deselects a record instance by record instance or index.
     * @param {Ext.data.Record/Index} records An array of records or an index
     * @param {Boolean} suppressEvent Set to false to not fire a deselect event
     */
    deselect: function(records, suppressEvent) {
        this.doDeselect(records, suppressEvent);
    },
    
    doSelect: function(records, keepExisting, suppressEvent) {
        if (this.locked) {
            return;
        }
        if (typeof records === "number") {
            records = [this.store.getAt(records)];
        }
        if (this.selectionMode == "SINGLE" && records) {
            var record = records.length ? records[0] : records;
            this.doSingleSelect(record, suppressEvent);
        } else {
            this.doMultiSelect(records, keepExisting, suppressEvent);
        }
    },

    doMultiSelect: function(records, keepExisting, suppressEvent) {
        if (this.locked) {
            return;
        }
        var selected = this.selected,
            change = false,
            record;

        records = !Ext.isArray(records) ? [records] : records;
        if (!keepExisting && selected.getCount() > 0) {
            change = true;
            this.doDeselect(this.getSelection(), true);
        }

        for (var i = 0, ln = records.length; i < ln; i++) {
            record = records[i];
            if (keepExisting && this.isSelected(record)) {
                continue;
            }
            change = true;
            this.lastSelected = record;
            selected.add(record);
            if (!suppressEvent) {
                this.setLastFocused(record);
            }

            this.onSelectChange(record, true, suppressEvent);
        }
        // fire selchange if there was a change and there is no suppressEvent flag
        this.maybeFireSelectionChange(change && !suppressEvent);
    },

    // records can be an index, a record or an array of records
    doDeselect: function(records, suppressEvent) {
        if (this.locked) {
            return;
        }

        if (typeof records === "number") {
            records = [this.store.getAt(records)];
        }

        var change = false,
            selected = this.selected,
            record;

        records = !Ext.isArray(records) ? [records] : records;
        for (var i = 0, ln = records.length; i < ln; i++) {
            record = records[i];
            if (selected.remove(record)) {
                if (this.lastSelected == record) {
                    this.lastSelected = selected.last();
                }
                this.onSelectChange(record, false, suppressEvent);
                change = true;
            }
        }
        // fire selchange if there was a change and there is no suppressEvent flag
        this.maybeFireSelectionChange(change && !suppressEvent);
    },

    doSingleSelect: function(record, suppressEvent) {
        if (this.locked) {
            return;
        }
        // already selected.
        // should we also check beforeselect?
        if (this.isSelected(record)) {
            return;
        }
        var selected = this.selected;
        if (selected.getCount() > 0) {
            this.doDeselect(this.lastSelected, suppressEvent);
        }
        selected.add(record);
        this.lastSelected = record;
        this.onSelectChange(record, true, suppressEvent);
        this.setLastFocused(record);
        this.maybeFireSelectionChange(!suppressEvent);
    },

    /**
     * @param {Ext.data.Record} record
     * Set a record as the last focused record. This does NOT mean
     * that the record has been selected.
     */
    setLastFocused: function(record) {
        var recordBeforeLast = this.lastFocused;
        this.lastFocused = record;
        this.onLastFocusChanged(recordBeforeLast, record);
    },


    // fire selection change as long as true is not passed
    // into maybeFireSelectionChange
    maybeFireSelectionChange: function(fireEvent) {
        if (fireEvent) {
            this.fireEvent('selectionchange', this, this.getSelection());
        }
    },

    /**
     * Returns the last selected record.
     */
    getLastSelected: function() {
        return this.lastSelected;
    },
    
    getLastFocused: function() {
        return this.lastFocused;
    },

    /**
     * Returns an array of the currently selected records.
     */
    getSelection: function() {
        return this.selected.getRange();
    },

    /**
     * Returns the current selectionMode. SINGLE, MULTI or SIMPLE.
     */
    getSelectionMode: function() {
        return this.selectionMode;
    },

    /**
     * Sets the current selectionMode. SINGLE, MULTI or SIMPLE.
     */
    setSelectionMode: function(selMode) {
        selMode = selMode ? selMode.toUpperCase() : 'SINGLE';
        // set to mode specified unless it doesnt exist, in that case
        // use single.
        this.selectionMode = this.modes[selMode] ? selMode : 'SINGLE';
    },

    /**
     * Returns true if the selections are locked.
     * @return {Boolean}
     */
    isLocked: function() {
        return this.locked;
    },

    /**
     * Locks the current selection and disables any changes from
     * happening to the selection.
     * @param {Boolean} locked
     */
    setLocked: function(locked) {
        this.locked = !!locked;
    },

    /**
     * Returns <tt>true</tt> if the specified row is selected.
     * @param {Record/Number} record The record or index of the record to check
     * @return {Boolean}
     */
    isSelected: function(record) {
        record = Ext.isNumber(record) ? this.store.getAt(record) : record;
        return this.selected.indexOf(record) !== -1;
    },
    
    /**
     * Returns true if there is a selected record.
     * @return {Boolean}
     */
    hasSelection: function() {
        return this.selected.getCount() > 0;
    },

    refresh: function() {
        var toBeSelected = [],
            oldSelections = this.getSelection(),
            ln = oldSelections.length,
            selection,
            change,
            i = 0;

        // check to make sure that there are no records
        // missing after the refresh was triggered, prune
        // them from what is to be selected if so
        for (; i < ln; i++) {
            selection = oldSelections[i];
            if (this.store.indexOf(selection) != -1) {
                toBeSelected.push(selection);
            }
        }

        // there was a change from the old selected and
        // the new selection
        if (this.selected.getCount() != toBeSelected.length) {
            change = true;
        }

        this.clearSelections();

        if (toBeSelected.length) {
            // perform the selection again
            this.doSelect(toBeSelected, false, true);
        }
        
        this.maybeFireSelectionChange(change);
    },

    clearSelections: function() {
        // reset the entire selection to nothing
        this.selected.clear();
        this.lastSelected = null;
        this.setLastFocused(null);
    },

    // when a record is added to a store
    onStoreAdd: function() {

    },

    // when a store is cleared remove all selections
    // (if there were any)
    onStoreClear: function() {
        var selected = this.selected;
        if (selected.getCount > 0) {
            selected.clear();
            this.lastSelected = null;
            this.setLastFocused(null);
            this.maybeFireSelectionChange(true);
        }
    },

    // prune records from the SelectionModel if
    // they were selected at the time they were
    // removed.
    onStoreRemove: function(store, record) {
        if (this.locked) {
            return;
        }
        var selected = this.selected;
        if (selected.remove(record)) {
            if (this.lastSelected == record) {
                this.lastSelected = null;
            }
            if (this.getLastFocused() == record) {
                this.setLastFocused(null);
            }
            this.maybeFireSelectionChange(true);
        }
    },

    getCount: function() {
        return this.selected.getCount();
    },

    // cleanup.
    destroy: function() {

    },

    // if records are updated
    onStoreUpdate: function() {

    },

    // @abstract
    onSelectChange: function(record, isSelected, suppressEvent) {

    },

    // @abstract
    onLastFocusChanged: function(oldFocused, newFocused) {

    },

    // @abstract
    onEditorKey: function(field, e) {

    },

    // @abstract
    bindComponent: function(cmp) {

    }
});
Ext.DataViewSelectionModel = Ext.extend(Ext.AbstractStoreSelectionModel, {
    deselectOnContainerClick: true,
    bindComponent: function(view) {
        this.view = view;
        this.bind(view.getStore());
        var eventListeners = {
            refresh: this.refresh,
            scope: this,
            el: {
                scope: this
            }
        };
        eventListeners.el[view.triggerEvent] = this.onItemClick;
        eventListeners.el[view.triggerCtEvent] = this.onContainerClick;
        
        view.on(eventListeners);
    },


    onItemClick: function(e) {
        var view   = this.view,
            node   = view.findTargetByEvent(e);
        
        if (node) {
            this.selectWithEvent(view.getRecord(node), e);
        } else {
            return false;
        }
    },

    onContainerClick: function() {
        if (this.deselectOnContainerClick) {
            this.deselectAll();
        }
    },

    // Allow the DataView to update the ui
    onSelectChange: function(record, isSelected, suppressEvent) {
        var view = this.view;
        
        if (isSelected) {
            view.onItemSelect(record);
            if (!suppressEvent) {
                this.fireEvent('select', this, record);
            }
        } else {
            view.onItemDeselect(record);
            if (!suppressEvent) {
                this.fireEvent('deselect', this, record);
            }
        }
    }
});

/**
 * @class Ext.DataView
 * @extends Ext.Component
 * A mechanism for displaying data using custom layout templates and formatting. DataView uses an {@link Ext.XTemplate}
 * as its internal templating mechanism, and is bound to an {@link Ext.data.Store}
 * so that as the data in the store changes the view is automatically updated to reflect the changes.  The view also
 * provides built-in behavior for many common events that can occur for its contained items including click, doubleclick,
 * mouseover, mouseout, etc. as well as a built-in selection model. <b>In order to use these features, an {@link #itemSelector}
 * config must be provided for the DataView to determine what nodes it will be working with.</b>
 *
 * <p>The example below binds a DataView to a {@link Ext.data.Store} and renders it into an {@link Ext.Panel}.</p>
 * <pre><code>
var store = new Ext.data.JsonStore({
    url: 'get-images.php',
    root: 'images',
    fields: [
        'name', 'url',
        {name:'size', type: 'float'},
        {name:'lastmod', type:'date', dateFormat:'timestamp'}
    ]
});
store.load();

var tpl = new Ext.XTemplate(
    '&lt;tpl for="."&gt;',
        '&lt;div class="thumb-wrap" id="{name}"&gt;',
        '&lt;div class="thumb"&gt;&lt;img src="{url}" title="{name}"&gt;&lt;/div&gt;',
        '&lt;span class="x-editable"&gt;{shortName}&lt;/span&gt;&lt;/div&gt;',
    '&lt;/tpl&gt;',
    '&lt;div class="x-clear"&gt;&lt;/div&gt;'
);

var panel = new Ext.Panel({
    id:'images-view',
    frame:true,
    width:535,
    autoHeight:true,
    collapsible:true,
    layout:'fit',
    title:'Simple DataView',

    items: new Ext.DataView({
        store: store,
        tpl: tpl,
        autoHeight:true,
        multiSelect: true,
        overCls:'x-view-over',
        itemSelector:'div.thumb-wrap',
        emptyText: 'No images to display'
    })
});
panel.render(document.body);
</code></pre>
 * @constructor
 * Create a new DataView
 * @param {Object} config The config object
 * @xtype dataview
 */
// dataview will extend from DataPanel/BoundPanel
Ext.DataView = Ext.extend(Ext.Component, {
    /**
     * @cfg {String/Array} tpl
     * @required
     * The HTML fragment or an array of fragments that will make up the template used by this DataView.  This should
     * be specified in the same format expected by the constructor of {@link Ext.XTemplate}.
     */
    /**
     * @cfg {Ext.data.Store} store
     * @required
     * The {@link Ext.data.Store} to bind this DataView to.
     */

    /**
     * @cfg {String} itemSelector
     * @required
     * <b>This is a required setting</b>. A simple CSS selector (e.g. <tt>div.some-class</tt> or
     * <tt>span:first-child</tt>) that will be used to determine what nodes this DataView will be
     * working with.
     */
    

    /**
     * @cfg {String} overItemCls
     * A CSS class to apply to each item in the view on mouseover (defaults to undefined).
     */

    /**
     * @cfg {String} loadingText
     * A string to display during data load operations (defaults to undefined).  If specified, this text will be
     * displayed in a loading div and the view's contents will be cleared while loading, otherwise the view's
     * contents will continue to display normally until the new data is loaded and the contents are replaced.
     */
    loadingText: 'Loading...',

    /**
     * @cfg {String} selectedItemCls
     * A CSS class to apply to each selected item in the view (defaults to 'x-view-selected').
     */
    selectedItemCls: "x-item-selected",

    /**
     * @cfg {String} emptyText
     * The text to display in the view when there is no data to display (defaults to '').
     */
    emptyText: "",

    /**
     * @cfg {Boolean} deferEmptyText True to defer emptyText being applied until the store's first load
     */
    deferEmptyText: true,

    /**
     * @cfg {Boolean} trackOver True to enable mouseenter and mouseleave events
     */
    trackOver: false,

    /**
     * @cfg {Boolean} blockRefresh Set this to true to ignore datachanged events on the bound store. This is useful if
     * you wish to provide custom transition animations via a plugin (defaults to false)
     */
    blockRefresh: false,

    /**
     * @cfg {Boolean} disableSelection <p><tt>true</tt> to disable selection within the DataView. Defaults to <tt>false</tt>.
     * This configuration will lock the selection model that the DataView uses.</p>
     */


    //private
    last: false,
    
    triggerEvent: 'click',
    triggerCtEvent: 'containerclick',
    
    addCmpEvents: function() {
        
    },

    // private
    initComponent : function(){
        //<debug>
        var isDef = Ext.isDefined;
        if (!isDef(this.tpl) || !isDef(this.store) || !isDef(this.itemSelector)) {
            throw "DataView requires tpl, store and itemSelector configurations to be defined.";
        }
        //</debug>

        Ext.DataView.superclass.initComponent.call(this);
        if(Ext.isString(this.tpl) || Ext.isArray(this.tpl)){
            this.tpl = new Ext.XTemplate(this.tpl);
        }

        // backwards compat alias for overClass/selectedClass
        // TODO: Consider support for overCls generation Ext.Component config
        if (Ext.isDefined(this.overCls) || Ext.isDefined(this.overClass)) {
            this.overItemCls = this.overCls || this.overClass;
            delete this.overCls;
            delete this.overClass;
            //<debug>
            throw "Using the deprecated overCls or overClass configuration. Use overItemCls.";
            //</debug>
        }

        if (Ext.isDefined(this.selectedCls) || Ext.isDefined(this.selectedClass)) {
            this.selectedItemCls = this.selectedCls || this.selectedClass;
            delete this.selectedCls;
            delete this.selectedClass;
            //<debug>
            throw "Using the deprecated selectedCls or selectedClass configuration. Use selectedItemCls.";
            //</debug>
        }
        
        this.addEvents(
            /**
             * @event beforerefresh
             * Fires before the view is refreshed
             * @param {Ext.DataView} this The DataView object
             */
            'beforerefresh',
            /**
             * @event refresh
             * Fires when the view is refreshed
             * @param {Ext.DataView} this The DataView object
             */
            'refresh'
        );
        
        this.addCmpEvents();

        this.store = Ext.StoreMgr.lookup(this.store)
        this.all = new Ext.CompositeElementLite();
        this.getSelectionModel().bindComponent(this);
    },
    
    onRender : function() {
        Ext.DataView.superclass.onRender.apply(this, arguments);
        if (this.loadingText) {
            this.loadMask = new Ext.LoadMask(this.el, {
                msg: this.loadingText
            });
        }
    },

    getSelectionModel: function(){
        if (!this.selModel) {
            this.selModel = {};
        }

        var mode;
        switch(true) {
            case this.simpleSelect:
                mode = 'SIMPLE';
            break;
            
            case this.multiSelect:
                mode = 'MULTI';
            break;
            
            case this.singleSelect:
            default:
                mode = 'SINGLE';
            break;
        }
        
        Ext.applyIf(this.selModel, {
            allowDeselect: this.allowDeselect,
            mode: mode
        });        
        
        if (!this.selModel.events) {
            this.selModel = new Ext.DataViewSelectionModel(this.selModel);
        }
        
        if (!this.selModel.hasRelaySetup) {
            this.relayEvents(this.selModel, ['selectionchange', 'select', 'deselect']);
            this.selModel.hasRelaySetup = true;
        }

        // lock the selection model if user
        // has disabled selection
        if (this.disableSelection) {
            this.selModel.locked = true;
        }
        
        return this.selModel;
    },

    /**
     * Refreshes the view by reloading the data from the store and re-rendering the template.
     */
    refresh: function() {
        if (!this.rendered) {
            return;
        }
        
        this.fireEvent('beforerefresh', this);
        var el = this.getTargetEl(),
            records = this.store.getRange();

        el.update('');
        if (records.length < 1) {
            if (!this.deferEmptyText || this.hasSkippedEmptyText) {
                el.update(this.emptyText);
            }
            this.all.clear();
        } else {
            this.tpl.overwrite(el, this.collectData(records, 0));
            this.all.fill(Ext.query(this.itemSelector, el.dom));
            this.updateIndexes(0);
        }
        this.hasSkippedEmptyText = true;
        this.fireEvent('refresh', this);
    },

    /**
     * Function which can be overridden to provide custom formatting for each Record that is used by this
     * DataView's {@link #tpl template} to render each node.
     * @param {Array/Object} data The raw data object that was used to create the Record.
     * @param {Number} recordIndex the index number of the Record being prepared for rendering.
     * @param {Record} record The Record being prepared for rendering.
     * @return {Array/Object} The formatted data in a format expected by the internal {@link #tpl template}'s overwrite() method.
     * (either an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'}))
     */
    prepareData: function(data, index, record) {
        if (record) {    
            Ext.apply(data, this.prepareAssociatedData(record));            
        }
        return data;
    },
    
    /**
     * @private
     * This complex-looking method takes a given Model instance and returns an object containing all data from
     * all of that Model's *loaded* associations. It does this recursively - for example if we have a User which
     * hasMany Orders, and each Order hasMany OrderItems, it will return an object like this:
     * 
     * {
     *     orders: [
     *         {
     *             id: 123,
     *             status: 'shipped',
     *             orderItems: [
     *                 ...
     *             ]
     *         }
     *     ]
     * }
     * 
     * This makes it easy to iterate over loaded associations in a DataView.
     * 
     * @param {Ext.data.Model} record The Model instance
     * @param {Array} ids PRIVATE. The set of Model instance internalIds that have already been loaded
     * @return {Object} The nested data set for the Model's loaded associations
     */
    prepareAssociatedData: function(record, ids) {
        //we keep track of all of the internalIds of the models that we have loaded so far in here
        ids = ids || [];
        
        var associations     = record.associations.items,
            associationCount = associations.length,
            associationData  = {},
            associatedStore, associatedName, associatedRecords, associatedRecord,
            associatedRecordCount, association, internalId, i, j;
        
        for (i = 0; i < associationCount; i++) {
            association = associations[i];
            
            //this is the hasMany store filled with the associated data
            associatedStore = record[association.storeName];
            
            //we will use this to contain each associated record's data
            associationData[association.name] = [];
            
            //if it's loaded, put it into the association data
            if (associatedStore && associatedStore.data.length > 0) {
                associatedRecords = associatedStore.data.items;
                associatedRecordCount = associatedRecords.length;
            
                //now we're finally iterating over the records in the association. We do this recursively
                for (j = 0; j < associatedRecordCount; j++) {
                    associatedRecord = associatedRecords[j];
                    internalId = associatedRecord.internalId;
                    
                    //when we load the associations for a specific model instance we add it to the set of loaded ids so that
                    //we don't load it twice. If we don't do this, we can fall into endless recursive loading failures.
                    if (ids.indexOf(internalId) == -1) {
                        ids.push(internalId);
                        
                        associationData[association.name][j] = associatedRecord.data;
                        Ext.apply(associationData[association.name][j], this.prepareAssociatedData(associatedRecord, ids));
                    }
                }
            }
        }
        
        return associationData;
    },

    /**
     * <p>Function which can be overridden which returns the data object passed to this
     * DataView's {@link #tpl template} to render the whole DataView.</p>
     * <p>This is usually an Array of data objects, each element of which is processed by an
     * {@link Ext.XTemplate XTemplate} which uses <tt>'&lt;tpl for="."&gt;'</tt> to iterate over its supplied
     * data object as an Array. However, <i>named</i> properties may be placed into the data object to
     * provide non-repeating data such as headings, totals etc.</p>
     * @param {Array} records An Array of {@link Ext.data.Model}s to be rendered into the DataView.
     * @param {Number} startIndex the index number of the Record being prepared for rendering.
     * @return {Array} An Array of data objects to be processed by a repeating XTemplate. May also
     * contain <i>named</i> properties.
     */
    collectData : function(records, startIndex){
        var r = [],
            i = 0,
            len = records.length;

        for(; i < len; i++){
            r[r.length] = this.prepareData(records[i].data, startIndex + i, records[i]);
        }

        return r;
    },

    // private
    bufferRender : function(records, index){
        var div = document.createElement('div');
        this.tpl.overwrite(div, this.collectData(records, index));
        return Ext.query(this.itemSelector, div);
    },

    // private
    onUpdate : function(ds, record){
        var index = this.store.indexOf(record),
            original,
            node;

        if (index > -1){
            original = this.all.elements[index];
            node = this.bufferRender([record], index)[0];

            this.all.replaceElement(index, node, true);
            this.updateIndexes(index, index);

            // Maintain selection after update
            // TODO: Move to approriate event handler.
            this.selModel.refresh();
        }
    },

    // private
    onAdd : function(ds, records, index){
        if (this.all.getCount() === 0) {
            this.refresh();
            return;
        }

        var nodes = this.bufferRender(records, index), n, a = this.all.elements;
        if (index < this.all.getCount()) {
            n = this.all.item(index).insertSibling(nodes, 'before', true);
            a.splice.apply(a, [index, 0].concat(nodes));
        } else {
            n = this.all.last().insertSibling(nodes, 'after', true);
            a.push.apply(a, nodes);
        }
        this.updateIndexes(index);
    },

    // private
    onRemove : function(ds, record, index){
        this.all.removeElement(index, true);
        this.updateIndexes(index);
        if (this.store.getCount() === 0){
            this.refresh();
        }
    },

    /**
     * Refreshes an individual node's data from the store.
     * @param {Number} index The item's data index in the store
     */
    refreshNode : function(index){
        this.onUpdate(this.store, this.store.getAt(index));
    },

    // private
    updateIndexes : function(startIndex, endIndex){
        var ns = this.all.elements;
        startIndex = startIndex || 0;
        endIndex = endIndex || ((endIndex === 0) ? 0 : (ns.length - 1));
        for(var i = startIndex; i <= endIndex; i++){
            ns[i].viewIndex = i;
        }
    },

    /**
     * Returns the store associated with this DataView.
     * @return {Ext.data.Store} The store
     */
    getStore : function(){
        return this.store;
    },

    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Store} store The store to bind to this view
     */
    bindStore : function(store, initial) {
        if (!initial && this.store) {
            if (store !== this.store && this.store.autoDestroy) {
                this.store.destroy();
            } 
            else {
                this.mun(this.store, {
                    scope: this,
                    beforeload: this.onBeforeLoad,
                    datachanged: this.onDataChanged,
                    add: this.onAdd,
                    remove: this.onRemove,
                    update: this.onUpdate,
                    clear: this.refresh                    
                });
            }
            if (!store) {
                if (this.loadMask) {
                    this.loadMask.bindStore(null);
                }
                this.store = null;
            }
        }
        if (store) {
            store = Ext.StoreMgr.lookup(store);
            this.mon(store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                datachanged: this.onDataChanged,
                add: this.onAdd,
                remove: this.onRemove,
                update: this.onUpdate,
                clear: this.refresh                    
            });
            if (this.loadMask) {
                this.loadMask.bindStore(store);
            }
        }
        
        this.store = store;
        // Bind the store to our selection model
        this.getSelectionModel().bind(store);
        
        if (store) {
            this.refresh();
        }
    },

    /**
     * @private
     * Calls this.refresh if this.blockRefresh is not true
     */
    onDataChanged: function() {
        if (this.blockRefresh !== true) {
            this.refresh.apply(this, arguments);
        }
    },

    /**
     * Returns the template node the passed child belongs to, or null if it doesn't belong to one.
     * @param {HTMLElement} node
     * @return {HTMLElement} The template node
     */
    findItemByChild: function(node){
        return Ext.fly(node).findParent(this.itemSelector, this.getTargetEl());
    },
    
    /**
     * Returns the template node by the Ext.EventObject or null if it is not found.
     * @param {Ext.EventObject} e
     */
    findTargetByEvent: function(e) {
        return e.getTarget(this.itemSelector, this.getTargetEl());
    },


    /**
     * Gets the currently selected nodes.
     * @return {Array} An array of HTMLElements
     */
    getSelectedNodes: function(){
        var nodes   = [],
            records = this.selModel.getSelection(),
            ln = records.length,
            i  = 0;

        for (; i < ln; i++) {
            nodes.push(this.getNode(records[i]));
        }

        return nodes;
    },

    /**
     * Gets an array of the records from an array of nodes
     * @param {Array} nodes The nodes to evaluate
     * @return {Array} records The {@link Ext.data.Model} objects
     */
    getRecords: function(nodes) {
        var records = [],
            i = 0,
            len = nodes.length;

        for (; i < len; i++) {
            records[records.length] = this.store.getAt(nodes[i].viewIndex);
        }

        return r;
    },

    /**
     * Gets a record from a node
     * @param {HTMLElement} node The node to evaluate
     * @return {Record} record The {@link Ext.data.Model} object
     */
    getRecord: function(node){
        return this.store.getAt(node.viewIndex);
    },

    /**
     * Returns true if the passed node is selected, else false.
     * @param {HTMLElement/Number/Ext.data.Model} node The node, node index or record to check
     * @return {Boolean} True if selected, else false
     */
    isSelected : function(node) {
        // TODO: El/Idx/Record
        var r = this.getRecord(node);
        return this.selModel.isSelected(r);
    },
    
    /**
     * Selects a record instance by record instance or index.
     * @param {Ext.data.Record/Index} records An array of records or an index
     * @param {Boolean} keepExisting
     * @param {Boolean} suppressEvent Set to false to not fire a select event
     */
    select: function(records, keepExisting, suppressEvent) {
        this.selModel.select(records, keepExisting, suppressEvent);
    },

    /**
     * Deselects a record instance by record instance or index.
     * @param {Ext.data.Record/Index} records An array of records or an index
     * @param {Boolean} suppressEvent Set to false to not fire a deselect event
     */
    deselect: function(records, suppressEvent) {
        this.selModel.deselect(records, suppressEvent);
    },

    /**
     * Gets a template node.
     * @param {HTMLElement/String/Number/Ext.data.Model} nodeInfo An HTMLElement template node, index of a template node,
     * the id of a template node or the record associated with the node.
     * @return {HTMLElement} The node or null if it wasn't found
     */
    getNode : function(nodeInfo) {
        if (Ext.isString(nodeInfo)) {
            return document.getElementById(nodeInfo);
        } else if (Ext.isNumber(nodeInfo)) {
            return this.all.elements[nodeInfo];
        } else if (nodeInfo instanceof Ext.data.Model) {
            var idx = this.store.indexOf(nodeInfo);
            return this.all.elements[idx];
        }
        return nodeInfo;
    },

    /**
     * Gets a range nodes.
     * @param {Number} start (optional) The index of the first node in the range
     * @param {Number} end (optional) The index of the last node in the range
     * @return {Array} An array of nodes
     */
    getNodes: function(start, end) {
        var ns = this.all.elements,
            nodes = [],
            i;

        start = start || 0;
        end = !Ext.isDefined(end) ? Math.max(ns.length - 1, 0) : end;
        if (start <= end) {
            for (i = start; i <= end && ns[i]; i++) {
                nodes.push(ns[i]);
            }
        } else {
            for (i = start; i >= end && ns[i]; i--) {
                nodes.push(ns[i]);
            }
        }
        return nodes;
    },

    /**
     * Finds the index of the passed node.
     * @param {HTMLElement/String/Number/Record} nodeInfo An HTMLElement template node, index of a template node, the id of a template node
     * or a record associated with a node.
     * @return {Number} The index of the node or -1
     */
    indexOf: function(node) {
        node = this.getNode(node);
        if (Ext.isNumber(node.viewIndex)) {
            return node.viewIndex;
        }
        return this.all.indexOf(node);
    },

    // private
    onBeforeLoad: function() {
        if (this.loadingText) {
            this.getTargetEl().update('');
            this.all.clear();
        }
    },

    onDestroy : function() {
        this.all.clear();
        Ext.DataView.superclass.onDestroy.call(this);
        this.bindStore(null);
        this.selModel.destroy();
    },

    // invoked by the selection model to maintain visual UI cues
    onItemSelect: function(record) {
        var node = this.getNode(record);
        Ext.fly(node).addCls(this.selectedItemCls);
    },

    // invoked by the selection model to maintain visual UI cues
    onItemDeselect: function(record) {
        var node = this.getNode(record);
        Ext.fly(node).removeCls(this.selectedItemCls);
    },
    
    select: function(records, keepExisting, supressEvents) {
        console.warn("DataView: select will be removed, please access select through a DataView's SelectionModel, ie: view.getSelectionModel().select()");
        var sm = this.getSelectionModel();
        return sm.select.apply(sm, arguments);
    },
    clearSelections: function() {
        console.warn("DataView: clearSelections will be removed, please access deselectAll through DataView's SelectionModel, ie: view.getSelectionModel().deselectAll()");
        var sm = this.getSelectionModel();
        return sm.deselectAll();
    }
});
Ext.reg('dataview', Ext.DataView);


// all of this information is available directly
// from the SelectionModel itself, the only added methods
// to DataView regarding selection will perform some transformation/lookup
// between HTMLElement/Nodes to records and vice versa.
Ext.DataView.override({
    /**
     * @cfg {Boolean} multiSelect
     * True to allow selection of more than one item at a time, false to allow selection of only a single item
     * at a time or no selection at all, depending on the value of {@link #singleSelect} (defaults to false).
     */
    /**
     * @cfg {Boolean} singleSelect
     * True to allow selection of exactly one item at a time, false to allow no selection at all (defaults to false).
     * Note that if {@link #multiSelect} = true, this value will be ignored.
     */
    /**
     * @cfg {Boolean} simpleSelect
     * True to enable multiselection by clicking on multiple items without requiring the user to hold Shift or Ctrl,
     * false to force the user to hold Ctrl or Shift to select more than on item (defaults to false).
     */

    /**
     * Gets the number of selected nodes.
     * @return {Number} The node count
     */
    getSelectionCount : function(){
        return this.selModel.getSelection().length;
    },

    /**
     * Gets an array of the selected records
     * @return {Array} An array of {@link Ext.data.Model} objects
     */
    getSelectedRecords : function(){
        return this.selModel.getSelection();
    }
});
/**
 * @class Ext.DataView
 * @extends Ext.Component
 * A mechanism for displaying data using custom layout templates and formatting. DataView uses an {@link Ext.XTemplate}
 * as its internal templating mechanism, and is bound to an {@link Ext.data.Store}
 * so that as the data in the store changes the view is automatically updated to reflect the changes.  The view also
 * provides built-in behavior for many common events that can occur for its contained items including itemtap, itemdoubletap, itemswipe, containertap,
 * etc. as well as a built-in selection model. <b>In order to use these features, an {@link #itemSelector}
 * config must be provided for the DataView to determine what nodes it will be working with.</b>
 *
 * <p>The example below binds a DataView to a {@link Ext.data.Store} and renders it into an {@link Ext.Panel}.</p>
 * <pre><code>
var store = new Ext.data.JsonStore({
    url: 'get-images.php',
    root: 'images',
    fields: [
        'name', 'url',
        {name:'size', type: 'float'},
        {name:'lastmod', type:'date', dateFormat:'timestamp'}
    ]
});
store.load();

var tpl = new Ext.XTemplate(
    '&lt;tpl for="."&gt;',
        '&lt;div class="thumb-wrap" id="{name}"&gt;',
        '&lt;div class="thumb"&gt;&lt;img src="{url}" title="{name}"&gt;&lt;/div&gt;',
        '&lt;span class="x-editable"&gt;{shortName}&lt;/span&gt;&lt;/div&gt;',
    '&lt;/tpl&gt;',
    '&lt;div class="x-clear"&gt;&lt;/div&gt;'
);

var panel = new Ext.Panel({
    id:'images-view',
    frame:true,
    width:535,
    autoHeight:true,
    collapsible:true,
    layout:'fit',
    title:'Simple DataView',

    items: new Ext.DataView({
        store: store,
        tpl: tpl,
        autoHeight:true,
        multiSelect: true,
        overClass:'x-view-over',
        itemSelector:'div.thumb-wrap',
        emptyText: 'No images to display'
    })
});
panel.render(Ext.getBody());
   </code></pre>
 * @constructor
 * Create a new DataView
 * @param {Object} config The config object
 * @xtype dataview
 */
Ext.DataView.override({
    scroll: 'vertical',

    /**
     * @cfg {String} pressedCls
     * A CSS class to apply to an item on the view while it is being pressed (defaults to 'x-item-pressed').
     */
    pressedCls : "x-item-pressed",

    /**
     * @cfg {Number} pressedDelay
     * The amount of delay between the tapstart and the moment we add the pressedCls.
     * Settings this to true defaults to 100ms
     */
    pressedDelay: 100,
    
    /**
     * @cfg {Boolean} allowDeselect Only respected if {@link #singleSelect} is true. If this is set to false,
     * a selected item will not be deselected when tapped on, ensuring that once an item has been selected at
     * least one item will always be selected. Defaults to allowed (true).
     */
    allowDeselect: true,

    /**
     * @cfg {String} triggerEvent
     * Defaults to 'singletap'. Other valid options are 'tap'
     */
    triggerEvent: 'singletap',
    
    triggerCtEvent: 'containertap',
    
    
    // @private
    addCmpEvents: function() {
        //<deprecated since=0.99>
        if (Ext.isDefined(this.forceSelection)) {
            throw new Error("DataView: forceSelection has been replaced by allowDeselect.");
        }
        //</deprecated>

        this.addEvents(
            /**
             * @event itemtap
             * Fires when a node is tapped on
             * @param {Ext.DataView} this The DataView object
             * @param {Number} index The index of the item that was tapped
             * @param {Ext.Element} item The item element
             * @param {Ext.EventObject} e The event object
             */
            'itemtap',

            /**
             * @event itemdoubletap
             * Fires when a node is double tapped on
             * @param {Ext.DataView} this The DataView object
             * @param {Number} index The index of the item that was tapped
             * @param {Ext.Element} item The item element
             * @param {Ext.EventObject} e The event object
             */
            'itemdoubletap',

            /**
             * @event itemswipe
             * Fires when a node is swipped
             * @param {Ext.DataView} this The DataView object
             * @param {Number} index The index of the item that was tapped
             * @param {Ext.Element} item The item element
             * @param {Ext.EventObject} e The event object
             */
            'itemswipe',

            /**
             * @event containertap
             * Fires when a tap occurs and it is not on a template node.
             * @param {Ext.DataView} this
             * @param {Ext.EventObject} e The raw event object
             */
            "containertap",

            /**
             * @event selectionchange
             * Fires when the selected nodes change.
             * @param {Ext.DataViewSelectionModel} selectionModel The selection model of this DataView object
             * @param {Array} records Array of the selected records
             */
            "selectionchange",

            /**
             * @event beforeselect
             * Fires before a selection is made. If any handlers return false, the selection is cancelled.
             * @param {Ext.DataView} this
             * @param {HTMLElement} node The node to be selected
             * @param {Array} selections Array of currently selected nodes
             */
            "beforeselect"
        );

    },

    // @private
    afterRender: function() {
        var me = this;

        Ext.DataView.superclass.afterRender.call(me);

        var eventHandlers = {
            tapstart : me.onTapStart,
            tapcancel: me.onTapCancel,
            touchend : me.onTapCancel,
            doubletap: me.onDoubleTap,
            swipe    : me.onSwipe,
            scope    : me
        };
        eventHandlers[this.triggerEvent] = me.onTap;
        me.mon(me.getTargetEl(), eventHandlers);
        
        if (this.store) {
            this.bindStore(this.store, true);
        }
    },

    // @private
    onTap: function(e) {
        var item = this.findTargetByEvent(e);
        if (item) {
            Ext.fly(item).removeCls(this.pressedCls);
            var index = this.indexOf(item);
            if (this.onItemTap(item, index, e) !== false) {
                this.fireEvent("itemtap", this, index, item, e);
            }
        }
        else {
            if(this.fireEvent("containertap", this, e) !== false) {
                this.onContainerTap(e);
            }
        }
    },

    // @private
    onTapStart: function(e, t) {
        var me = this,
            item = this.findTargetByEvent(e);

        if (item) {
            if (me.pressedDelay) {
                if (me.pressedTimeout) {
                    clearTimeout(me.pressedTimeout);
                }
                me.pressedTimeout = setTimeout(function() {
                    Ext.fly(item).addCls(me.pressedCls);
                }, Ext.isNumber(me.pressedDelay) ? me.pressedDelay : 100);
            }
            else {
                Ext.fly(item).addCls(me.pressedCls);
            }
        }
    },

    // @private
    onTapCancel: function(e, t) {
        var me = this,
            item = this.findTargetByEvent(e);

        if (me.pressedTimeout) {
            clearTimeout(me.pressedTimeout);
            delete me.pressedTimeout;
        }

        if (item) {
            Ext.fly(item).removeCls(me.pressedCls);
        }
    },

    // @private
    onContainerTap: function(e) {
        //if (this.allowDeselect) {
        //    this.clearSelections();
        //}
    },

    // @private
    onDoubleTap: function(e) {
        var item = this.findTargetByEvent(e);
        if (item) {
            this.fireEvent("itemdoubletap", this, this.indexOf(item), item, e);
        }
    },

    // @private
    onSwipe: function(e) {
        var item = this.findTargetByEvent(e);
        if (item) {
            this.fireEvent("itemswipe", this, this.indexOf(item), item, e);
        }
    },

    // @private
    onItemTap: function(item, index, e) {
        if (this.pressedTimeout) {
            clearTimeout(this.pressedTimeout);
            delete this.pressedTimeout;
        }
        return true;
    }
});

/**
 * @class Ext.List
 * @extends Ext.DataView
 * <p>A mechanism for displaying data using a list layout template. List uses an {@link Ext.XTemplate}
 * as its internal templating mechanism, and is bound to an {@link Ext.data.Store} so that as the data 
 * in the store changes the view is automatically updated to reflect the changes.</p>
 * <p>The view also provides built-in behavior for many common events that can occur for its contained items
 * including itemtap, containertap, etc. as well as a built-in selection model. <b>In order to use these
 * features, an {@link #itemSelector} config must be provided for the DataView to determine what nodes it
 * will be working with.</b></p>
 * 
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #itemTpl}</li>
 *   <li>{@link #store}</li>
 *   <li>{@link #grouped}</li>
 *   <li>{@link #indexBar}</li>
 *   <li>{@link #singleSelect}</li>
 *   <li>{@link #multiSelect}</li>
 * </ul>
 * 
 * <h2>Useful Methods</h2>
 * <ul class="list">
 *   <li>{@link #bindStore}</li>
 *   <li>{@link #getRecord}</li>
 *   <li>{@link #getRecords}</li>
 *   <li>{@link #getSelectedRecords}</li>
 *   <li>{@link #getSelectedNodes}</li>
 *   <li>{@link #indexOf}</li>
 * </ul>
 * 
 * <h2>Useful Events</h2>
 * <ul class="list">
 *   <li>{@link #itemtap}</li>
 *   <li>{@link #itemdoubletap}</li>
 *   <li>{@link #itemswipe}</li>
 *   <li>{@link #selectionchange}</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.List/screenshot.png Ext.List screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
Ext.regModel('Contact', {
    fields: ['firstName', 'lastName']
});

var store = new Ext.data.JsonStore({
    model  : 'Contact',
    sorters: 'lastName',

    getGroupString : function(record) {
        return record.get('lastName')[0];
    },

    data: [
        {firstName: 'Tommy',   lastName: 'Maintz'},
        {firstName: 'Rob',     lastName: 'Dougan'},
        {firstName: 'Ed',      lastName: 'Spencer'},
        {firstName: 'Jamie',   lastName: 'Avins'},
        {firstName: 'Aaron',   lastName: 'Conran'},
        {firstName: 'Dave',    lastName: 'Kaneda'},
        {firstName: 'Michael', lastName: 'Mullany'},
        {firstName: 'Abraham', lastName: 'Elias'},
        {firstName: 'Jay',     lastName: 'Robinson'}
    ]
});

var list = new Ext.List({
    fullscreen: true,
    
    itemTpl : '{firstName} {lastName}',
    grouped : true,
    indexBar: true,
    
    store: store
});
list.show();
   </code></pre>
 * @constructor
 * Create a new List
 * @param {Object} config The config object
 * @xtype list
 */
Ext.List = Ext.extend(Ext.DataView, {
    componentCls: 'x-list',

    /**
     * @cfg {Boolean} pinHeaders
     * Whether or not to pin headers on top of item groups while scrolling for an iPhone native list experience.
     * Defaults to <tt>false</tt> on Android and Blackberry (for performance reasons)
     * Defaults to <tt>true</tt> on other devices.
     */
    pinHeaders: Ext.is.iOS || Ext.is.Desktop,

    /**
     * @cfg {Boolean/Object} indexBar
     * True to render an alphabet IndexBar docked on the right.
     * This can also be a config object that will be passed to {@link Ext.IndexBar}
     * (defaults to false)
     */
    indexBar: false,

    /**
     * @cfg {Boolean} grouped
     * True to group the list items together (defaults to false). When using grouping, you must specify a method getGroupString
     * on the store so that grouping can be maintained.
     * <pre><code>
Ext.regModel('Contact', {
    fields: ['firstName', 'lastName']
});

var store = new Ext.data.JsonStore({
    model  : 'Contact',
    sorters: 'lastName',

    getGroupString : function(record) {
        // Group by the last name
        return record.get('lastName')[0];
    },

    data: [
        {firstName: 'Tommy',   lastName: 'Maintz'},
        {firstName: 'Rob',     lastName: 'Dougan'},
        {firstName: 'Ed',      lastName: 'Spencer'},
        {firstName: 'Jamie',   lastName: 'Avins'},
        {firstName: 'Aaron',   lastName: 'Conran'},
        {firstName: 'Dave',    lastName: 'Kaneda'},
        {firstName: 'Michael', lastName: 'Mullany'},
        {firstName: 'Abraham', lastName: 'Elias'},
        {firstName: 'Jay',     lastName: 'Robinson'},
        {firstName: 'Tommy',   lastName: 'Maintz'},
        {firstName: 'Rob',     lastName: 'Dougan'},
        {firstName: 'Ed',      lastName: 'Spencer'},
        {firstName: 'Jamie',   lastName: 'Avins'},
        {firstName: 'Aaron',   lastName: 'Conran'},
        {firstName: 'Dave',    lastName: 'Kaneda'},
        {firstName: 'Michael', lastName: 'Mullany'},
        {firstName: 'Abraham', lastName: 'Elias'},
        {firstName: 'Jay',     lastName: 'Robinson'}
    ]
});
       </code></pre>
     */
    grouped: false,

    /**
     * @cfg {Boolean} clearSelectionOnDeactivate
     * True to clear any selections on the list when the list is deactivated (defaults to true).
     */
    clearSelectionOnDeactivate: true,

    renderTpl: [
        '<tpl if="grouped"><h3 class="x-list-header x-list-header-swap x-hidden-display"></h3></tpl>'
    ],

    groupTpl : [
        '<tpl for=".">',
            '<div class="x-list-group x-group-{id}">',
                '<h3 class="x-list-header">{group}</h3>',
                '<div class="x-list-group-items">',
                    '{items}',
                '</div>',
            '</div>',
        '</tpl>'
    ],
    
    /**
     * @cfg {String} itemSelector
     * @private
     * @ignore
     * Not to be used.
     */
    itemSelector: '.x-list-item',
    
    /**
     * @cfg {String} itemCls An additional class that will be added to each item in the List.
     * Defaults to ''.
     */
    itemCls: '',
    
    /**
     * @cfg {String/Array} itemTpl
     * The inner portion of the item template to be rendered. Follows an XTemplate
     * structure and will be placed inside of a tpl for in the tpl configuration.
     */

    /**
     * @cfg {Boolean/Function/Object} onItemDisclosure
     * True to display a disclosure icon on each list item.
     * This won't bind a listener to the tap event. The list
     * will still fire the disclose event though.
     * By setting this config to a function, it will automatically
     * add a tap event listeners to the disclosure buttons which
     * will fire your function.
     * Finally you can specify an object with a 'scope' and 'handler'
     * property defined. This will also be bound to the tap event listener
     * and is useful when you want to change the scope of the handler.
     */
    onItemDisclosure: false,
    
    /**
     * @cfg {Boolean} preventSelectionOnDisclose True to prevent the item selection when the user
     * taps a disclose icon. Defaults to <tt>true</tt>
     */
    preventSelectionOnDisclose: true,

    // @private
    initComponent : function() {
        //<deprecated since=0.99>
        if (Ext.isDefined(this.dockedItems)) {
            console.warn("List: List is not a Panel anymore so you can't dock items to it. Please put this list inside a Panel with layout 'fit'");
        }
        //</deprecated>
        
        //<deprecated since=0.99>
        if (Ext.isDefined(this.components)) {
            console.warn("List: The Experimental components configuration is not currently supported.");
        }
        //</deprecated>
        
        //<deprecated since=0.99>
        if (Ext.isDefined(this.disclosure)) {
            console.warn("List: The disclosure configuration has been renamed to onItemDisclosure and will be removed.");
            this.onItemDisclosure = this.disclosure;
        }
        //</deprecated>
        
        var memberFnsCombo = {};
        //<deprecated since=0.99>
        if (this.tpl) {
            console.warn('Ext.List: The tpl config has been removed and replaced by itemTpl. Please remove tpl and itemSelector from your Lists.');
            // convert from array to string
            if (Ext.isArray(this.tpl)) {
                this.tpl = this.tpl.join('');
            } else if (this.tpl.html) {
                Ext.apply(memberFnsCombo, this.tpl.initialConfig);
                this.tpl = this.tpl.html;
            }
            this.tpl = Ext.util.Format.trim(this.tpl);
            if (this.tpl.indexOf("\"x-list-item\"") !== -1) {
                throw new Error("Ext.List: Using a CSS class of x-list-item within your own tpl will break Ext.Lists. Remove the x-list-item from the tpl/itemTpl");
            }
            var tpl       = this.tpl,
                first     = '<tpl for=".">',
                firstLn   = first.length,
                end       = '</tpl>',
                tplFirst  = this.tpl.substr(0, firstLn),
                tplEndIdx = this.tpl.lastIndexOf(end),
                stripped;
                
            if (tplFirst === first &&  tplEndIdx !== -1) {
                this.itemTpl = tpl.substr(firstLn, tplEndIdx - firstLn);
                this.itemSelector = Ext.List.prototype.itemSelector;
            } else {
                throw new Error("Ext.List: tpl to itemTpl conversion failed.");
            }
        }
        //</deprecated>
        
        if (Ext.isArray(this.itemTpl)) {
            this.itemTpl = this.itemTpl.join('');
        } else if (this.itemTpl && this.itemTpl.html) {
            Ext.apply(memberFnsCombo, this.itemTpl.initialConfig);
            this.itemTpl = this.itemTpl.html;
        }
        
        //<debug>
        if (!Ext.isDefined(this.itemTpl)) {
            throw new Error("Ext.List: itemTpl is a required configuration.");
        }
        // this check is not enitrely fool proof, does not account for spaces or multiple classes
        // if the check is done without "s then things like x-list-item-entity would throw exceptions that shouldn't have.
        if (this.itemTpl && this.itemTpl.indexOf("\"x-list-item\"") !== -1) {
            throw new Error("Ext.List: Using a CSS class of x-list-item within your own tpl will break Ext.Lists. Remove the x-list-item from the tpl/itemTpl");
        }
        //</debug>
        
        this.tpl = '<tpl for="."><div class="x-list-item ' + this.itemCls + '"><div class="x-list-item-body">' + this.itemTpl + '</div>';
        if (this.onItemDisclosure) {
            this.tpl += '<div class="x-list-disclosure"></div>';
        }
        this.tpl += '</div></tpl>';
        this.tpl = new Ext.XTemplate(this.tpl, memberFnsCombo);
       

        if (this.grouped) {
            
            this.listItemTpl = this.tpl;
            if (Ext.isString(this.listItemTpl) || Ext.isArray(this.listItemTpl)) {
                // memberFns will go away after removal of tpl configuration for itemTpl
                // this copies memberFns by storing the original configuration.
                this.listItemTpl = new Ext.XTemplate(this.listItemTpl, memberFnsCombo);
            }
            if (Ext.isString(this.groupTpl) || Ext.isArray(this.groupTpl)) {
                this.tpl = new Ext.XTemplate(this.groupTpl);
            }
        }
        else {
            this.indexBar = false;
        }
        
        if (this.scroll !== false) {
            this.scroll = {
                direction: 'vertical',
                useIndicators: !this.indexBar
            };
        }

        // if (this.enableAutoPaging) {
        //     this.enablePaging = true;
        // }
        
        Ext.List.superclass.initComponent.call(this);

        if (this.onItemDisclosure) {
            // disclosure can be a function that will be called when
            // you tap the disclosure button
            if (Ext.isFunction(this.onItemDisclosure)) {
                this.onItemDisclosure = {
                    scope: this,
                    handler: this.onItemDisclosure
                };
            }
        }

        this.on('deactivate', this.onDeactivate, this);
        
        this.addEvents(
             /**
              * @event disclose
              * Fires when the user taps the disclosure icon on an item
              * @param {Ext.data.Record} record The record associated with the item
              * @param {Ext.Element} node The wrapping element of this node
              * @param {Number} index The index of this list item
              * @param {Ext.util.Event} e The tap event that caused this disclose to fire
              */
             'disclose',
             
             /**
              * @event update
              * Fires whenever the contents of the List is updated.
              * @param {Ext.List} list This list
              */
             'update'
         );
    },

    // @private
    onRender : function() {
        if (this.grouped) {
            Ext.applyIf(this.renderData, {
                grouped: true
            });

            if (this.scroll) {
                Ext.applyIf(this.renderSelectors, {
                    header: '.x-list-header-swap'
                });                
            }
        }
        
        Ext.List.superclass.onRender.apply(this, arguments);
    },

    // @private
    onDeactivate : function() {
        if (this.clearSelectionOnDeactivate) {
            this.getSelectionModel().deselectAll();
        }
    },

    // @private
    afterRender : function() {
        if (!this.grouped) {
            this.el.addCls('x-list-flat');
        }
        this.getTargetEl().addCls('x-list-parent');

        if (this.indexBar) {
            this.indexBar = new Ext.IndexBar(Ext.apply({}, Ext.isObject(this.indexBar) ? this.indexBar : {}, {
                xtype: 'indexbar',
                alphabet: true,
                renderTo: this.el
            }));
            this.addCls('x-list-indexed');
        }
        
        Ext.List.superclass.afterRender.call(this);
        
        if (this.onItemDisclosure) {
            this.mon(this.getTargetEl(), 'singletap', this.handleItemDisclosure, this, {delegate: '.x-list-disclosure'});
        }
    },

    // @private
    initEvents : function() {
        Ext.List.superclass.initEvents.call(this);

        if (this.grouped) {
            if (this.pinHeaders && this.scroll) {
                this.mon(this.scroller, {
                    scrollstart: this.onScrollStart,
                    scroll: this.onScroll,
                    scope: this
                });
            }

            if (this.indexBar) {
                this.mon(this.indexBar, {
                    index: this.onIndex,
                    scope: this
                });
            }
        }
    },

    //@private
    handleItemDisclosure : function(e, t) {
        var node = this.findItemByChild(t),
            record, index;
            
        if (node) {
            record = this.getRecord(node);
            index  = this.indexOf(node);
            if (this.preventSelectionOnDisclose) {
                e.stopEvent();
            }
            this.fireEvent('disclose', record, node, index, e);
     
            if (Ext.isObject(this.onItemDisclosure) && this.onItemDisclosure.handler) {
                this.onItemDisclosure.handler.call(this, record, node, index);
            }
        }
    },

    /**
     * Set the current active group
     * @param {Object} group The group to set active
     */
    setActiveGroup : function(group) {
        var me = this;
        if (group) {
            if (!me.activeGroup || me.activeGroup.header != group.header) {
                me.header.setHTML(group.header.getHTML());
                me.header.show();
            }            
        }
        else {
            me.header.hide();
        }

        this.activeGroup = group;
    },

    // @private
    getClosestGroups : function(pos) {
        // force update if not already done
        if (!this.groupOffsets) {
            this.updateOffsets();
        }
        var groups = this.groupOffsets,
            ln = groups.length,
            group, i,
            current, next;

        for (i = 0; i < ln; i++) {
            group = groups[i];
            if (group.offset > pos.y) {
                next = group;
                break;
            }
            current = group;
        }

        return {
            current: current,
            next: next
        };
    },

    updateIndexes : function() {
        Ext.List.superclass.updateIndexes.apply(this, arguments);
        this.updateList();
    },

    afterComponentLayout : function() {
        Ext.List.superclass.afterComponentLayout.apply(this, arguments);
        this.updateList();
    },

    updateList : function() {
        this.fireEvent('update', this);
        this.updateOffsets();
    },
    
    updateOffsets : function() {
        if (this.grouped) {
            this.groupOffsets = [];

            var headers = this.getTargetEl().query('h3.x-list-header'),
                ln = headers.length,
                header, i;

            for (i = 0; i < ln; i++) {
                header = Ext.get(headers[i]);
                header.setVisibilityMode(Ext.Element.VISIBILITY);
                this.groupOffsets.push({
                    header: header,
                    offset: header.dom.offsetTop
                });
            }
        }
    },

    // @private
    onScrollStart : function() {
        var offset = this.scroller.getOffset();
        this.closest = this.getClosestGroups(offset);
        this.setActiveGroup(this.closest.current);
    },

    // @private
    onScroll : function(scroller, pos, options) {
        if (!this.closest) {
            this.closest = this.getClosestGroups(pos);
        }

        if (!this.headerHeight) {
            this.headerHeight = this.header.getHeight();
        }

        if (pos.y <= 0) {
            if (this.activeGroup) {
                this.setActiveGroup(false);
                this.closest.next = this.closest.current;
            }
            return;
        }
        else if (
            (this.closest.next && pos.y > this.closest.next.offset) ||
            (pos.y < this.closest.current.offset)
        ) {
            this.closest = this.getClosestGroups(pos);
            this.setActiveGroup(this.closest.current);
        }
        if (this.closest.next && pos.y > 0 && this.closest.next.offset - pos.y <= this.headerHeight) {
            var transform = this.headerHeight - (this.closest.next.offset - pos.y);
            Ext.Element.cssTranslate(this.header, {x: 0, y: -transform});
            this.transformed = true;
        }
        else if (this.transformed) {
            this.header.setStyle('-webkit-transform', null);
            this.transformed = false;
        }
    },

    // @private
    onIndex : function(record, target, index) {
        var key = record.get('key').toLowerCase(),
            groups = this.store.getGroups(),
            ln = groups.length,
            group, i, closest, id;

        for (i = 0; i < ln; i++) {
            group = groups[i];
            id = this.getGroupId(group);

            if (id == key || id > key) {
                closest = id;
                break;
            }
            else {
                closest = id;
            }
        }

        closest = this.getTargetEl().down('.x-group-' + id);
        if (closest) {
            this.scroller.scrollTo({x: 0, y: closest.getOffsetsTo(this.scrollEl)[1]}, false, null, true);
        }
    },
    
    getGroupId : function(group) {
        return group.name.toLowerCase();
    },

    // @private
    collectData : function(records, startIndex) {
        if (!this.grouped) {
            return Ext.List.superclass.collectData.call(this, records, startIndex);
        }

        var results = [],
            groups = this.store.getGroups(),
            ln = groups.length,
            children, cln, c,
            group, i;

        for (i = 0, ln = groups.length; i < ln; i++) {
            group = groups[i];
            children = group.children;
            for (c = 0, cln = children.length; c < cln; c++) {
                children[c] = children[c].data;
            }
            results.push({
                group: group.name,
                id: this.getGroupId(group),
                items: this.listItemTpl.apply(children)
            });
        }

        return results;
    },

    // Because the groups might change by an update/add/remove we refresh the whole dataview
    // in each one of them
    // @private
    onUpdate : function(store, record) {
        if (this.grouped) {
            this.refresh();
        }
        else {
            Ext.List.superclass.onUpdate.apply(this, arguments);
        }
    },

    // @private
    onAdd : function(ds, records, index) {
        if (this.grouped) {
            this.refresh();
        }
        else {
            Ext.List.superclass.onAdd.apply(this, arguments);
        }
    },

    // @private
    onRemove : function(ds, record, index) {
        if (this.grouped) {
            this.refresh();
        }
        else {
            Ext.List.superclass.onRemove.apply(this, arguments);
        }
    }
});

Ext.reg('list', Ext.List);

/**
 * @class Ext.IndexBar
 * @extends Ext.DataPanel
 * <p>IndexBar is a component used to display a list of data (primarily an {@link #alphabet}) which can then be used to quickly
 * navigate through a list (see {@link Ext.List}) of data. When a user taps on an item in the {@link Ext.IndexBar}, it will fire
 * the <tt>{@link #index}</tt> event.</p>
 *
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.IndexBar/screenshot.png Ext.IndexBar screenshot}
 * 
 * <h2>Example code:</h2>
 * <p>Here is an example of the usage in a {@link Ext.List}:</p>
 * <pre><code>
Ext.regModel('Contact', {
    fields: ['firstName', 'lastName']
});

var store = new Ext.data.JsonStore({
    model  : 'Contact',
    sorters: 'lastName',

    getGroupString : function(record) {
        return record.get('lastName')[0];
    },

    data: [
        {firstName: 'Tommy',   lastName: 'Maintz'},
        {firstName: 'Rob',     lastName: 'Dougan'},
        {firstName: 'Ed',      lastName: 'Spencer'},
        {firstName: 'Jamie',   lastName: 'Avins'},
        {firstName: 'Aaron',   lastName: 'Conran'},
        {firstName: 'Dave',    lastName: 'Kaneda'},
        {firstName: 'Michael', lastName: 'Mullany'},
        {firstName: 'Abraham', lastName: 'Elias'},
        {firstName: 'Jay',     lastName: 'Robinson'},
        {firstName: 'Tommy',   lastName: 'Maintz'},
        {firstName: 'Rob',     lastName: 'Dougan'},
        {firstName: 'Ed',      lastName: 'Spencer'},
        {firstName: 'Jamie',   lastName: 'Avins'},
        {firstName: 'Aaron',   lastName: 'Conran'},
        {firstName: 'Dave',    lastName: 'Kaneda'},
        {firstName: 'Michael', lastName: 'Mullany'},
        {firstName: 'Abraham', lastName: 'Elias'},
        {firstName: 'Jay',     lastName: 'Robinson'}
    ]
});

var list = new Ext.List({
    tpl: '&lt;tpl for="."&gt;&lt;div class="contact"&gt;{firstName} &lt;strong&gt;{lastName}&lt;/strong&gt;&lt;/div&gt;&lt;/tpl&gt;',

    itemSelector: 'div.contact',
    singleSelect: true,
    grouped     : true,
    indexBar    : true,

    store: store,

    floating     : true,
    width        : 350,
    height       : 370,
    centered     : true,
    modal        : true,
    hideOnMaskTap: false
});
list.show();
   </code></pre>
 *
 * <p>Alternatively you can initate the {@link Ext.IndexBar} component manually in a custom component by using something
 * similar to the following example:<p>
 *
 * <code><pre>
var indexBar = new Ext.IndexBar({
    dock    : 'right',
    overlay : true,
    alphabet: true
});
 * </code></pre>
 * @constructor
 * Create a new IndexBar
 * @param {Object} config The config object
 * @xtype indexbar
 */
Ext.IndexBar = Ext.extend(Ext.DataView, {
    /**
     * @cfg {String} componentCls Base CSS class
     * Defaults to <tt>'x-indexbar'</tt>
     */
    componentCls: 'x-indexbar',

    /**
     * @cfg {String} direction Layout direction, can be either 'vertical' or 'horizontal'
     * Defaults to <tt>'vertical'</tt>
     */
    direction: 'vertical',

    /**
     * @cfg {String} tpl Template for items
     */
    tpl: '<tpl for="."><div class="x-indexbar-item">{value}</div></tpl>',

    /**
     * @cfg {String} itemSelector <b>Required</b>. A simple CSS selector (e.g. <tt>div.x-indexbar-item</tt> for items
     */
    itemSelector: 'div.x-indexbar-item',

    /**
     * @cfg {Array} letters
     * The letters to show on the index bar. Defaults to the English alphabet, A-Z.
     */
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

    /**
     * @cfg {String} listPrefix
     * The prefix string to be appended at the beginning of the list. E.g: useful to add a "#" prefix before numbers
     */
    listPrefix: '',

    /**
     * @cfg {Boolean} alphabet true to use the {@link #letters} property to show a list of the alphabet. Should <b>not</b> be used
     * in conjunction with {@link #store}.
     */

    /**
     * @cfg {Ext.data.Store} store
     * The store to be used for displaying data on the index bar. The store model must have a <tt>value</tt> field when using the
     * default {@link #tpl}. If no {@link #store} is defined, it will create a store using the <tt>IndexBarModel</tt> model.
     */

    // We dont want the body of this component to be sized by a DockLayout, thus we set the layout to be an autocomponent layout.
    componentLayout: 'autocomponent',

    scroll: false,
    
    // @private
    initComponent : function() {
        // No docking and no sizing of body!
        this.componentLayout = this.getComponentLayout();

        if (!this.store) {
            this.store = new Ext.data.Store({
                model: 'IndexBarModel'
            });
        }

        if (this.alphabet == true) {
            this.ui = this.ui || 'alphabet';
        }

        if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else {
            this.vertical = true;
        }

        this.addEvents(
          /**
           * @event index
           * Fires when an item in the index bar display has been tapped
           * @param {Ext.data.Model} record The record tapped on the indexbar
           * @param {HTMLElement} target The node on the indexbar that has been tapped
           * @param {Number} index The index of the record tapped on the indexbar
           */
          'index'
        );

        Ext.apply(this.renderData, {
            componentCls: this.componentCls
        });
        
        Ext.apply(this.renderSelectors, {
            body: '.' + this.componentCls + '-body'
        });
        
        Ext.IndexBar.superclass.initComponent.call(this);
    },

    renderTpl : ['<div class="{componentCls}-body"></div>'],
    
    getTargetEl : function() {
        return this.body;
    },
    
    // @private
    afterRender : function() {
        Ext.IndexBar.superclass.afterRender.call(this);

        if (this.alphabet === true) {
            this.loadAlphabet();
        }
        if (this.vertical) {
            this.el.addCls(this.componentCls + '-vertical');
        }
        else if (this.horizontal) {
            this.el.addCls(this.componentCls + '-horizontal');
        }
    },

    // @private
    loadAlphabet : function() {
        var letters = this.letters,
            len = letters.length,
            data = [],
            i, letter;

        for (i = 0; i < len; i++) {
            letter = letters[i];
            data.push({key: letter.toLowerCase(), value: letter});
        }

        this.store.loadData(data);
    },

    /**
     * Refreshes the view by reloading the data from the store and re-rendering the template.
     */
    refresh: function() {
        var el = this.getTargetEl(),
            records = this.store.getRange();

        el.update('');
        if (records.length < 1) {
            if (!this.deferEmptyText || this.hasSkippedEmptyText) {
                el.update(this.emptyText);
            }
            this.all.clear();
        } else {
            this.tpl.overwrite(el, this.collectData(records, 0));
            this.all.fill(Ext.query(this.itemSelector, el.dom));
            this.updateIndexes(0);
        }
        this.hasSkippedEmptyText = true;
        this.fireEvent('refresh');
    },
    
    collectData : function() {
        var data = Ext.IndexBar.superclass.collectData.apply(this, arguments);
        if (this.listPrefix.length > 0) {
            data.unshift({
                key: '',
                value: this.listPrefix
            });
        }
        return data;
    },

    // @private
    initEvents : function() {
        Ext.IndexBar.superclass.initEvents.call(this);

        this.mon(this.el, {
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            touchmove: this.onTouchMove,
            scope: this
        });
    },

    // @private
    onTouchStart : function(e, t) {
        e.stopEvent();
        this.el.addCls(this.componentCls + '-pressed');
        this.pageBox = this.el.getPageBox();
        this.onTouchMove(e);
    },

    // @private
    onTouchEnd : function(e, t) {
        e.stopEvent();
        this.el.removeCls(this.componentCls + '-pressed');
    },

    // @private
    onTouchMove : function(e) {
        e.stopPropagation();

        var point = Ext.util.Point.fromEvent(e),
            target,
            record,
            pageBox = this.pageBox;

        if (!pageBox) {
            pageBox = this.pageBox = this.el.getPageBox();
        }

        if (this.vertical) {
            if (point.y > pageBox.bottom || point.y < pageBox.top) {
                return;
            }
            target = Ext.Element.fromPoint(pageBox.left + (pageBox.width / 2), point.y);
        }
        else if (this.horizontal) {
            if (point.x > pageBox.right || point.x < pageBox.left) {
                return;
            }
            target = Ext.Element.fromPoint(point.x, pageBox.top + (pageBox.height / 2));
        }

        if (target) {
            record = this.getRecord(target.dom);
            if (record) {
                this.fireEvent('index', record, target, this.indexOf(target));
            }
        }
    },
    
    /**
     * Method to determine whether this Sortable is currently disabled.
     * @return {Boolean} the disabled state of this Sortable.
     */
    isVertical : function() {
        return this.vertical;
    },
    
    /**
     * Method to determine whether this Sortable is currently sorting.
     * @return {Boolean} the sorting state of this Sortable.
     */
    isHorizontal : function() {
        return this.horizontal;
    }
});

Ext.reg('indexbar', Ext.IndexBar);

Ext.regModel('IndexBarModel', {
    fields: ['key', 'value']
});

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
/**
 * @class Ext.Sheet
 * @extends Ext.Panel
 *
 * <p>A general sheet class.  This renderable container provides base support for orientation-aware
 * transitions for popup or side-anchored sliding Panels.</p>
 *
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Sheet/screenshot.png Ext.Sheet screenshot}
 * 
 * <h2>Example usage:</h2>
 * <pre><code>
var sheet = new Ext.Sheet({
    height  : 200,
    stretchX: true,
    stretchY: true,
    
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    dockedItems: [
        {
            dock : 'bottom',
            xtype: 'button',
            text : 'Click me'
        }
    ]
});
sheet.show();
 * </code></pre>
 * 
 * <p>See {@link Ext.Picker} and {@link Ext.DatePicker}</p>
 * @xtype sheet
 */
Ext.Sheet = Ext.extend(Ext.Panel, {
    baseCls : 'x-sheet',
    centered : false,
    floating : true,
    modal    : true,
    draggable : false,
    monitorOrientation : true,
    
    hidden    : true,
    
    /**
    * @cfg {Boolean} hideOnMaskTap
    * True to automatically bind a tap listener to the mask that hides the window.
    * Defaults to false. Note: if you don't set this property to false you have to programmaticaly
    * hide the overlay.
    */
    hideOnMaskTap : false,
    
    /**
     * @cfg {Boolean} stretchX
     * If true, the width of anchored Sheets are adjusted to fill the entire top/bottom axis width,
     * or false to center the Sheet along the same axis based upon the sheets current/calculated width.
     * This option is ignored when {link #centered} is true or x/y coordinates are specified for the Sheet.
     */

    /**
     * @cfg {Boolean} stretchY
     * If true, the height of anchored Sheets are adjusted to fill the entire right/left axis height,
     * or false to center the Sheet along the same axis based upon the sheets current/calculated height.
     * This option is ignored when {link #centered} is true or x/y coordinates are specified for the Sheet.
     */

    /**
     * @cfg {String} enter
     * The viewport side from which to anchor the sheet when made visible (top, bottom, left, right)
     * Defaults to 'bottom'
     */
    enter : 'bottom',

    /**
     * @cfg {String} exit
     * The viewport side used as the exit point when hidden (top, bottom, left, right)
     * Applies to sliding animation effects only. Defaults to 'bottom'
     */
    exit : 'bottom',


    /**
     * @cfg {String/Object} enterAnimation
     * the named Ext.anim effect or animation configuration object used for transitions
     * when the component is shown. Defaults to 'slide'
     */
    enterAnimation : 'slide',

    /**
     *
     * @cfg {String/Object} exitAnimation
     * the named Ext.anim effect or animation configuration object used for transitions
     * when the component is hidden. Defaults to 'slide'
     */
    exitAnimation : 'slide',

    // @private slide direction defaults
    transitions : {
        bottom : 'up',
        top    : 'down',
        right  : 'left',
        left   : 'right'
    },

    //@private
    animSheet : function(animate) {
      var anim = null,
          me = this,
          tr = me.transitions,
          opposites = Ext.Anim.prototype.opposites || {};

      if (animate && this[animate]) {
         if (animate == 'enter') {
             anim = (typeof me.enterAnimation == 'string') ?
                 {
                     type : me.enterAnimation || 'slide',
                     direction : tr[me.enter] || 'up'
                 } : me.enterAnimation;

         }
         else if (animate == 'exit') {
            anim = (typeof me.exitAnimation == 'string') ?
                 {
                     type : me.exitAnimation || 'slide',
                     direction : tr[me.exit] || 'down'
                 } :  me.exitAnimation;
         }
      }
      return anim;
    },

    // @private
    orient : function(orientation, w, h) {
        if(!this.container || this.centered || !this.floating){
            return this;
        }

        var me = this,
            cfg = me.initialConfig || {},
            //honor metrics (x, y, height, width) initialConfig
            size = {width : cfg.width, height : cfg.height},
            pos  = {x : cfg.x, y : cfg.y},
            box  = me.el.getPageBox(),
            pageBox, scrollTop = 0;

        if (me.container.dom == document.body) {
            pageBox = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            scrollTop = document.body.scrollTop;
        }
        else {
            pageBox = me.container.getPageBox();
        }

        pageBox.centerY = pageBox.height / 2;
        pageBox.centerX = pageBox.width / 2;

        if(pos.x != undefined || pos.y != undefined){
            pos.x = pos.x || 0;
            pos.y = pos.y || 0;
        }
        else {
            if (/^(bottom|top)/i.test(me.enter)) {
                size.width  = me.stretchX ? pageBox.width : Math.min(200,Math.max(size.width || box.width || pageBox.width, pageBox.width));
                size.height = Math.min(size.height || 0, pageBox.height) || undefined;
                size = me.setSize(size).getSize();
                pos.x = pageBox.centerX - size.width / 2;
                pos.y = me.enter == 'top' ? 0 : pageBox.height - size.height + scrollTop;

            } else if (/^(left|right)/i.test(me.enter)) {
                size.height = me.stretchY ? pageBox.height : Math.min(200, Math.max(size.height || box.height || pageBox.height, pageBox.height));
                size.width  = Math.min(size.width || 0, pageBox.width) || undefined;
                size = me.setSize(size).getSize();
                pos.y = 0;
                pos.x = me.enter == 'left' ? 0 : pageBox.width - size.width;
            }
        }
        me.setPosition(pos);
        return this;
    },

     // @private
    afterRender : function() {
        Ext.Sheet.superclass.afterRender.apply(this, arguments);
        this.el.setVisibilityMode(Ext.Element.OFFSETS);
    },

    // @private
    onShow : function(animation) {
        this.orient();
        return Ext.Sheet.superclass.onShow.call(this, animation || this.animSheet('enter'));
    },

    // @private
    onOrientationChange : function(orientation, w, h) {
        this.orient();
        Ext.Sheet.superclass.onOrientationChange.apply(this, arguments);
    },

    // @private
    beforeDestroy : function() {
        delete this.showAnimation;
        this.hide(false);
        Ext.Sheet.superclass.beforeDestroy.call(this);
    }
});

Ext.reg('sheet', Ext.Sheet);

/**
 * @class Ext.ActionSheet
 * @extends Ext.Sheet
 *
 * <p>A Button Sheet class designed to popup or slide/anchor a series of buttons.</p>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.ActionSheet/screenshot.png Ext.ActionSheet screenshot}
 *
 * <h2>Example code:</h2>
 * <pre><code>
var actionSheet = new Ext.ActionSheet({
    items: [
        {
            text: 'Delete draft',
            ui  : 'decline'
        },
        {
            text: 'Save draft'
        },
        {
            text: 'Cancel',
            ui  : 'confirm'
        }
    ]
});
actionSheet.show();</code></pre>
 * @xtype sheet
 */

Ext.ActionSheet = Ext.extend(Ext.Sheet, {
    componentCls: 'x-sheet-action',

    stretchY: true,
    stretchX: true,

    defaultType: 'button',

    constructor : function(config) {
        config = config || {};

        Ext.ActionSheet.superclass.constructor.call(this, Ext.applyIf({
            floating : true
        }, config));
    }
});

Ext.reg('actionsheet', Ext.ActionSheet);
/**
 * @class Ext.TabBar
 * @extends Ext.Panel
 * 
 * <p>Used in the {@link Ext.TabPanel} component to display {@link Ext.Tab} components.</p>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.TabBar/screenshot.png Ext.TabBar screenshot}
 * 
 * <h2>Example code:</h2>
<pre><code>
var bar = new Ext.TabBar({
    dock : 'top',
    ui   : 'dark',
    items: [
        {
            text: '1st Button'
        },
        {
            text: '2nd Button'
        }
    ]
});

var myPanel = new Ext.Panel({
    dockedItems: [bar],
    fullscreen : true,
    html       : 'Test Panel'
});
</code></pre>
 * 
 * @xtype tabbar
 */
Ext.TabBar = Ext.extend(Ext.Panel, {
    componentCls: 'x-tabbar',

    /**
     * @type {Ext.Tab}
     * Read-only property of the currently active tab.
     */
    activeTab: null,

    // @private
    defaultType: 'tab',

    /**
     * @cfg {Boolean} sortable
     * Enable sorting functionality for the TabBar.
     */
    sortable: false,

    /**
     * @cfg {Number} sortHoldThreshold
     * Duration in milliseconds that a user must hold a tab
     * before dragging. The sortable configuration must be set for this setting
     * to be used.
     */
    sortHoldThreshold: 350,

    // @private
    initComponent : function() {
        /**
         * @event change
         * @param {Ext.TabBar} this
         * @param {Ext.Tab} tab The Tab button
         * @param {Ext.Component} card The component that has been activated
         */
        this.addEvents('change');

        this.layout = Ext.apply({}, this.layout || {}, {
            type: 'hbox',
            align: 'middle'
        });

        Ext.TabBar.superclass.initComponent.call(this);

    },

    // @private
    initEvents : function() {
        if (this.sortable) {
            this.sortable = new Ext.util.Sortable(this.el, {
                itemSelector: '.x-tab',
                direction: 'horizontal',
                delay: this.sortHoldThreshold,
                constrain: true
            });
            this.mon(this.sortable, 'sortchange', this.onSortChange, this);
        }

        this.mon(this.el, {
            touchstart: this.onTouchStart,
            scope: this
        });

        Ext.TabBar.superclass.initEvents.call(this);
    },

    // @private
    onTouchStart : function(e, t) {
        t = e.getTarget('.x-tab');
        if (t) {
            this.onTabTap(Ext.getCmp(t.id));
        }
    },

    // @private
    onSortChange : function(sortable, el, index) {
    },

    // @private
    onTabTap : function(tab) {
        if (!tab.disabled) {
            if (this.cardLayout) {
                if (this.cardSwitchAnimation) {
                    var animConfig = {
                        reverse: (this.items.indexOf(tab) < this.items.indexOf(this.activeTab)) ? true : false
                    };

                    if (Ext.isObject(this.cardSwitchAnimation)) {
                        Ext.apply(animConfig, this.cardSwitchAnimation);
                    } else {
                        Ext.apply(animConfig, {
                            type: this.cardSwitchAnimation
                        });
                    }
                }
                
                this.cardLayout.setActiveItem(tab.card, animConfig || this.cardSwitchAnimation);
            }
            this.activeTab = tab;
            this.fireEvent('change', this, tab, tab.card);
        }
    },

    /**
     * Returns a reference to the TabPanel's layout that wraps around the TabBar.
     * @private
     */
    getCardLayout : function() {
        return this.cardLayout;
    }
});

Ext.reg('tabbar', Ext.TabBar);

/**
 * @class Ext.Tab
 * @extends Ext.Button
 * 
 * <p>Used in the {@link Ext.TabBar} component. This shouldn't be used directly, instead use {@link Ext.TabBar} or {@link Ext.TabPanel}.</p>
 * 
 * @xtype tab
 */
Ext.Tab = Ext.extend(Ext.Button, {
    isTab: true,
    baseCls: 'x-tab',

    /**
     * @cfg {String} pressedCls
     * The CSS class to be applied to a Tab when it is pressed. Defaults to 'x-tab-pressed'.
     * Providing your own CSS for this class enables you to customize the pressed state.
     */
    pressedCls: 'x-tab-pressed',

    /**
     * @cfg {String} activeCls
     * The CSS class to be applied to a Tab when it is active. Defaults to 'x-tab-active'.
     * Providing your own CSS for this class enables you to customize the active state.
     */
    activeCls: 'x-tab-active',

    /**
     * @property Boolean
     * Read-only property indicating that this tab is currently active.
     * This is NOT a public configuration.
     */
    active: false,

    // @private
    initComponent : function() {
        this.addEvents(
            /**
             * @event activate
             * @param {Ext.Tab} this
             */
            'activate',
            /**
             * @event deactivate
             * @param {Ext.Tab} this
             */
            'deactivate'
        );

        Ext.Tab.superclass.initComponent.call(this);

        var card = this.card;
        if (card) {
            this.card = null;
            this.setCard(card);
        }
    },

    /**
     * Sets the card associated with this tab
     */
    setCard : function(card) {
        if (this.card) {
            this.mun(this.card, {
                activate: this.activate,
                deactivate: this.deactivate,
                scope: this
            });
        }
        this.card = card;
        if (card) {
            Ext.apply(this, card.tab || {});
            this.setText(this.title || card.title || this.text );
            this.setIconClass(this.iconCls || card.iconCls);
            this.setBadge(this.badgeText || card.badgeText);

            this.mon(card, {
                beforeactivate: this.activate,
                beforedeactivate: this.deactivate,
                scope: this
            });
        }
    },

    onRender: function() {
        Ext.Tab.superclass.onRender.apply(this, arguments);
        if (this.active) {
            this.el.addCls(this.activeCls);
        }
    },

    /**
     * Retrieves a reference to the card associated with this tab
     * @returns {Mixed} card
     */
    getCard : function() {
        return this.card;
    },

    // @private
    activate : function() {
        this.active = true;
        if (this.el) {
            this.el.addCls(this.activeCls);
        }
        this.fireEvent('activate', this);
    },

    // @private
    deactivate : function() {
        this.active = false;
        if (this.el) {
            this.el.removeCls(this.activeCls);
        }
        this.fireEvent('deactivate', this);
    }
});

Ext.reg('tab', Ext.Tab);

/**
 * @class Ext.TabPanel
 * @extends Ext.Panel
 *
 * TabPanel is a Container which can hold other components to be accessed in a tabbed
 * interface. It uses a {@link Ext.TabBar} to display a {@link Ext.Tab} for each item defined.
 *
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #ui}</li>
 *   <li>{@link #tabBarDock}</li>
 *   <li>{@link #cardSwitchAnimation}</li>
 *   <li>{@link #sortable}</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.TabPanel/screenshot.png Ext.TabPanel screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
new Ext.TabPanel({
    fullscreen: true,
    ui        : 'dark',
    sortable  : true,
    items: [
        {
            title: 'Tab 1',
            html : '1',
            cls  : 'card1'
        },
        {
            title: 'Tab 2',
            html : '2',
            cls  : 'card2'
        },
        {
            title: 'Tab 3',
            html : '3',
            cls  : 'card3'
        }
    ]
});</code></pre>
 * @xtype tabpanel
 */
Ext.TabPanel = Ext.extend(Ext.Panel, {
    /**
     * @cfg {String} cardSwitchAnimation
     * Animation to be used during transitions of cards.
     * Any valid value from Ext.anims can be used ('fade', 'slide', 'flip', 'cube', 'pop', 'wipe'), or false.
     * Defaults to <tt>'slide'</tt>.
     */
    cardSwitchAnimation: 'slide',

    /**
     * @cfg {String} tabBarDock
     * Where to dock the Ext.TabPanel. Valid values are 'top' and 'bottom'.
     */
    tabBarDock: 'top',
    componentCls: 'x-tabpanel',

    /**
     * @cfg {String} ui
     * Defaults to 'dark'.
     */
    ui: 'dark',

    /**
     * @cfg {Object} layout
     * @hide
     */

    /**
     * @cfg {Object} tabBar
     * An Ext.TabBar configuration
     */

    /**
     * @cfg {Boolean} sortable
     * Enable sorting functionality for the TabBar.
     */

    // @private
    initComponent : function() {
        //<deprecated since=0.99>
        if (Ext.isDefined(this.tabBarPosition)) {
            throw new Error("TabPanel: tabBarPosition has been removed. Please use tabBarDock.");
        }
        //</deprecated>

        
        var layout = new Ext.layout.CardLayout(this.layout || {});
        this.layout = null;
        this.setLayout(layout);

        this.tabBar = new Ext.TabBar(Ext.apply({}, this.tabBar || {}, {
            cardLayout: layout,
            cardSwitchAnimation: this.cardSwitchAnimation,
            dock: this.tabBarDock,
            ui: this.ui,
            sortable: this.sortable
        }));

        if (this.dockedItems && !Ext.isArray(this.dockedItems)) {
            this.dockedItems = [this.dockedItems];
        }
        else if (!this.dockedItems) {
            this.dockedItems = [];
        }
        this.dockedItems.push(this.tabBar);

        Ext.TabPanel.superclass.initComponent.call(this);
    },

    /**
     * Retrieves a reference to the Ext.TabBar associated with the TabPanel.
     * @returns {Ext.TabBar} tabBar
     */
    getTabBar : function() {
        return this.tabBar;
    },
    
    // whenever a component is added to the TabPanel, add a
    // tab into the tabBar
    onAdd: function(cmp, idx) {
        var tabBar = this.tabBar;
        // maintain cross reference between tab and card
        cmp.tab = tabBar.insert(idx, {
            xtype: 'tab',
            card: cmp
        });
        tabBar.doLayout();
    },
    
    
    onRemove: function(cmp, autoDestroy) {
        // remove the tab from the tabBar
        if (!this.destroying) {
            this.tabBar.remove(cmp.tab, autoDestroy);
            this.tabBar.doLayout();
        }
    }
});

Ext.reg('tabpanel', Ext.TabPanel);

/**
 * @class Ext.Carousel
 * @extends Ext.Panel
 *
 * <p>A customized Panel which provides the ability to slide back and forth between
 * different child items.</p>
 * 
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #ui} (defines the style of the carousel)</li>
 *   <li>{@link #direction} (defines the direction of the carousel)</li>
 *   <li>{@link #indicator} (defines if the indicator show be shown)</li>
 * </ul>
 * 
 * <h2>Useful Methods</h2>
 * <ul class="list">
 *   <li>{@link #next} (moves to the next card)</li>
 *   <li>{@link #prev} (moves to the previous card)</li>
 *   <li>{@link #setActiveItem} (moves to the passed card)</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Carousel/screenshot.png Ext.Carousel screenshot}
 * 
 * <h2>Example code:</h2>
<pre><code>
var carousel = new Ext.Carousel({
    items: [
        {
            html: '&lt;p&gt;Navigate the carousel on this page by swiping left/right.&lt;/p&gt;',
            cls : 'card card1'
        },
        {
            html: '&lt;p&gt;Clicking on either side of the indicators below&lt;/p&gt;',
            cls : 'card card2'
        },
        {
            html: 'Card #3',
            cls : 'card card3'
        }
    ]
});

var panel = new Ext.Panel({
    cls: 'cards',
    layout: {
        type : 'vbox',
        align: 'stretch'
    },
    defaults: {
        flex: 1
    },
    items: [
        carousel,
        {
            xtype    : 'carousel',
            ui       : 'light',
            direction: 'vertical',
            
            items: [
            {
                    html: '&lt;p&gt;Carousels can be vertical and given a ui of "light" or "dark".&lt;/p&gt;',
                    cls : 'card card1'
                },
                {
                    html: 'Card #2',
                    cls : 'card card2'
                },
                {
                    html: 'Card #3',
                    cls : 'card card3'
                }
            ]
        }
    ]
});
</code></pre>
 * @xtype carousel
 */
Ext.Carousel = Ext.extend(Ext.Panel, {
    /**
     * @cfg {String} baseCls
     * The base CSS class to apply to the Carousel's element (defaults to <code>'x-carousel'</code>).
     */
    baseCls: 'x-carousel',

    /**
     * @cfg {Boolean} indicator
     * Provides an indicator while toggling between child items to let the user
     * know where they are in the card stack.
     */
    indicator: true,

    /**
     * @cfg {String} ui
     * Style options for Carousel. Default is 'dark'. 'light' is also available.
     */
    ui: 'dark',

    /**
     * @cfg {String} direction
     * The direction of the Carousel. Default is 'horizontal'. 'vertical' also available.
     */
    direction: 'horizontal',

    // @private
    horizontal: false,
    // @private
    vertical: false,
    
    // @private
    initComponent: function() {
        this.layout = {
            type: 'card',
            // This will set the size of all cards in this container on each layout
            sizeAllCards: true,
            // This will prevent the hiding of items on card switch
            hideInactive: false,
            itemCls: 'x-carousel-item',
            targetCls: 'x-carousel-body',
            setOwner : function(owner) {
                Ext.layout.CardLayout.superclass.setOwner.call(this, owner);
            }
        };
         
        if (this.indicator) {
            var cfg = Ext.isObject(this.indicator) ? this.indicator : {};
            this.indicator = new Ext.Carousel.Indicator(Ext.apply({}, cfg, {
                direction: this.direction,
                carousel: this,
                ui: this.ui
            }));
        }

        if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else {
            this.vertical = true;
        }
        
        Ext.Carousel.superclass.initComponent.call(this);
    },

    // @private
    afterRender: function() {
        Ext.Carousel.superclass.afterRender.call(this);

        // Bind the required listeners
        this.mon(this.body, {
            drag: this.onDrag,
            dragThreshold: 5,
            dragend: this.onDragEnd,
            direction: this.direction,
            scope: this
        });
        
        this.el.addCls(this.baseCls + '-' + this.direction);
    },
    
    // private, inherit docs
    onAdd: function(){
        Ext.Carousel.superclass.onAdd.apply(this, arguments);
        var indicator = this.indicator;
        if (indicator) {
            indicator.onCardAdd();
        }    
    },
    
    // private, inherit docs
    onRemove: function(){
        Ext.Carousel.superclass.onRemove.apply(this, arguments);
        var indicator = this.indicator;
        if (indicator) {
            indicator.onCardRemove();
        }
    },
    
    /**
     * The afterLayout method on the carousel just makes sure the active card
     * is still into view. It also makes sure the indicator is pointing to
     * the right card.
     * @private
     */    
    afterLayout : function() {
        Ext.Carousel.superclass.afterLayout.apply(this, arguments);
        
        this.currentSize = this.body.getSize();
        this.currentScroll = {x: 0, y: 0};
        
        this.updateCardPositions();
        
        var activeItem = this.layout.getActiveItem();        
        if (activeItem && this.indicator) {  
            this.indicator.onBeforeCardSwitch(this, activeItem, null, this.items.indexOf(activeItem));
        }
    },

    /**
     * The onDrag method sets the currentScroll object. It also slows down the drag
     * if we are at the bounds of the carousel.
     * @private
     */    
    onDrag : function(e) {
        this.currentScroll = {
            x: e.deltaX,
            y: e.deltaY
        };
        
        // Slow the drag down in the bounce
        var activeIndex = this.items.items.indexOf(this.layout.activeItem);
        // If this is a horizontal carousel    
        if (this.horizontal) {
            if (
                // And we are on the first card and dragging left
                (activeIndex == 0 && e.deltaX > 0) || 
                // Or on the last card and dragging right
                (activeIndex == this.items.length - 1 && e.deltaX < 0)
            ) {
                // Then slow the drag down
                this.currentScroll.x = e.deltaX / 2;             
            }
        }
        // If this is a vertical carousel
        else if (this.vertical) {
            if (
                // And we are on the first card and dragging up
                (activeIndex == 0 && e.deltaY > 0) || 
                // Or on the last card and dragging down
                (activeIndex == this.items.length - 1 && e.deltaY < 0)
            ) {
                // Then slow the drag down
                this.currentScroll.y = e.deltaY / 2;
            }
        }
        // This will update all the cards to their correct position based on the current drag
        this.updateCardPositions();
    },

    /**
     * This will update all the cards to their correct position based on the current drag.
     * It can be passed true to animate the position updates.
     * @private
     */
    updateCardPositions : function(animate) {
        var cards = this.items.items,
            ln = cards.length,
            cardOffset,
            i, card, el, style;
        
        // Now we loop over the items and position the active item
        // in the middle of the strip, and the two items on either
        // side to the left and right.
        for (i = 0; i < ln; i++) {
            card = cards[i];  
            
            // This means the items is within 2 cards of the active item
            if (this.isCardInRange(card)) {
                if (card.hidden) {
                    card.show();
                }
                
                el = card.el;
                style = el.dom.style;
                
                if (animate) {
                    if (card === this.layout.activeItem) {
                        el.on('webkitTransitionEnd', this.onTransitionEnd, this, {single: true});
                    }
                    style.webkitTransitionDuration = '300ms';
                }
                else {
                    style.webkitTransitionDuration = '0ms';
                }

                cardOffset = this.getCardOffset(card);
                if (this.horizontal) {
                    Ext.Element.cssTransform(el, {translate: [cardOffset, 0]});
                }
                else {
                    Ext.Element.cssTransform(el, {translate: [0, cardOffset]});
                }
            }
            else if (!card.hidden) {
                // All other items we position far away
                card.hide();
            }
        }
    },

    /**
     * Returns the amount of pixels from the current drag to a card.
     * @private
     */    
    getCardOffset : function(card) {
        var cardOffset = this.getCardIndexOffset(card),
            currentSize = this.currentSize,
            currentScroll = this.currentScroll;
            
        return this.horizontal ?
            (cardOffset * currentSize.width) + currentScroll.x :
            (cardOffset * currentSize.height) + currentScroll.y;
    },

    /**
     * Returns the difference between the index of the active card and the passed card.
     * @private
     */        
    getCardIndexOffset : function(card) {
        return this.items.items.indexOf(card) - this.getActiveIndex();
    },

    /**
     * Returns true if the passed card is within 2 cards from the active card.
     * @private
     */    
    isCardInRange : function(card) {
        return Math.abs(this.getCardIndexOffset(card)) <= 2;
    },

    /**
     * Returns the index of the currently active card.
     * @return {Number} The index of the currently active card.
     */    
    getActiveIndex : function() {
        return this.items.indexOf(this.layout.activeItem);
    },

    /**
     * This determines if we are going to the next card, the previous card, or back to the active card.
     * @private
     */        
    onDragEnd : function(e, t) {
        var previousDelta, deltaOffset; 
            
        if (this.horizontal) {
            deltaOffset = e.deltaX;
            previousDelta = e.previousDeltaX;
        }
        else {
            deltaOffset = e.deltaY;
            previousDelta = e.previousDeltaY;
        }
            
        // We have gone to the right
        if (deltaOffset < 0 && Math.abs(deltaOffset) > 3 && previousDelta <= 0 && this.layout.getNext()) {
            this.next();
        }
        // We have gone to the left
        else if (deltaOffset > 0 && Math.abs(deltaOffset) > 3 && previousDelta >= 0 && this.layout.getPrev()) {
            this.prev();
        }
        else {
            // drag back to current active card
            this.scrollToCard(this.layout.activeItem);
        }
    },

    /**
     * Here we make sure that the card we are switching to is not translated
     * by the carousel anymore. This is only if we are switching card using
     * the setActiveItem of setActiveItem methods and thus customDrag is not set
     * to true.
     * @private
     */
    onBeforeCardSwitch : function(newCard) {
        if (!this.customDrag && this.items.indexOf(newCard) != -1) {
            var style = newCard.el.dom.style;
            style.webkitTransitionDuration = null;
            style.webkitTransform = null;
        }
        return Ext.Carousel.superclass.onBeforeCardSwitch.apply(this, arguments);
    },

    /**
     * This is an internal function that is called in onDragEnd that goes to
     * the next or previous card.
     * @private
     */    
    scrollToCard : function(newCard) {
        this.currentScroll = {x: 0, y: 0};
        this.oldCard = this.layout.activeItem;
        
        if (newCard != this.oldCard && this.isCardInRange(newCard) && this.onBeforeCardSwitch(newCard, this.oldCard, this.items.indexOf(newCard), true) !== false) {
            this.layout.activeItem = newCard;
            if (this.horizontal) {
                this.currentScroll.x = -this.getCardOffset(newCard);
            }
            else {
                this.currentScroll.y = -this.getCardOffset(newCard);
            }
        }
        
        this.updateCardPositions(true);
    },    

    // @private
    onTransitionEnd : function(e, t) {
        this.customDrag = false;
        this.currentScroll = {x: 0, y: 0};
        if (this.oldCard && this.layout.activeItem != this.oldCard) {
            this.onCardSwitch(this.layout.activeItem, this.oldCard, this.items.indexOf(this.layout.activeItem), true);
        }
        delete this.oldCard;
    },
        
    /**
     * This function makes sure that all the cards are in correct locations
     * after a card switch
     * @private
     */
    onCardSwitch : function(newCard, oldCard, index, animated) {
        this.currentScroll = {x: 0, y: 0};
        this.updateCardPositions();
        Ext.Carousel.superclass.onCardSwitch.apply(this, arguments);
        newCard.fireEvent('activate', newCard);
    },

    /**
     * Switches the next card
     */
    next: function() {
        var next = this.layout.getNext();
        if (next) {
            this.customDrag = true;
            this.scrollToCard(next);
        }
        return this;
    },

    /**
     * Switches the previous card
     */
    prev: function() {
        var prev = this.layout.getPrev();
        if (prev) {
            this.customDrag = true;
            this.scrollToCard(prev);
        }
        return this;
    },
    
    /**
     * Method to determine whether this Sortable is currently disabled.
     * @return {Boolean} the disabled state of this Sortable.
     */
    isVertical : function() {
        return this.vertical;
    },
    
    /**
     * Method to determine whether this Sortable is currently sorting.
     * @return {Boolean} the sorting state of this Sortable.
     */
    isHorizontal : function() {
        return this.horizontal;
    },
    
    // private, inherit docs
    beforeDestroy: function(){
        Ext.destroy(this.indicator);
        Ext.Carousel.superclass.beforeDestroy.call(this);
    }
});

Ext.reg('carousel', Ext.Carousel);

/**
 * @class Ext.Carousel.Indicator
 * @extends Ext.Component
 * @xtype carouselindicator
 * @private
 *
 * A private utility class used by Ext.Carousel to create indicators.
 */
Ext.Carousel.Indicator = Ext.extend(Ext.Component, {
    baseCls: 'x-carousel-indicator',

    initComponent: function() {
        if (this.carousel.rendered) {
            this.render(this.carousel.body);
            this.onBeforeCardSwitch(null, null, this.carousel.items.indexOf(this.carousel.layout.getActiveItem()));
        }
        else {
            this.carousel.on('render', function() {
                this.render(this.carousel.body);
            }, this, {single: true});
        }
        Ext.Carousel.Indicator.superclass.initComponent.call(this);
    },

    // @private
    onRender: function() {
        Ext.Carousel.Indicator.superclass.onRender.apply(this, arguments);

        for (var i = 0, ln = this.carousel.items.length; i < ln; i++) {
            this.createIndicator();
        }

        this.mon(this.carousel, {
            beforecardswitch: this.onBeforeCardSwitch,
            scope: this
        });

        this.mon(this.el, {
            tap: this.onTap,
            scope: this
        });
        
        this.el.addCls(this.baseCls + '-' + this.direction);
    },

    // @private
    onTap: function(e, t) {
        var box = this.el.getPageBox(),
            centerX = box.left + (box.width / 2),
            centerY = box.top + (box.height / 2),
            carousel = this.carousel;

        if ((carousel.isHorizontal() && e.pageX > centerX) || (carousel.isVertical() && e.pageY > centerY)) {
            this.carousel.next();
        } else {
            this.carousel.prev();
        }
    },

    // @private
    createIndicator: function() {
        this.indicators = this.indicators || [];
        this.indicators.push(this.el.createChild({
            tag: 'span'
        }));
    },

    // @private
    onBeforeCardSwitch: function(carousel, card, old, index) {
        if (Ext.isNumber(index) && index != -1 && this.indicators[index]) {
            this.indicators[index].radioCls('x-carousel-indicator-active');
        }
    },

    // @private
    onCardAdd: function() {
        if (this.rendered) {
            this.createIndicator();
        }
    },

    // @private
    onCardRemove: function() {
        if (this.rendered) {
            this.indicators.pop().remove();
        }
    }
});

Ext.reg('carouselindicator', Ext.Carousel.Indicator);
/**
 * @class Ext.Map
 * @extends Ext.Component
 *
 * <p>Wraps a Google Map in an Ext.Component.<br/>
 * http://code.google.com/apis/maps/documentation/v3/introduction.html</p>
 *
 * <p>To use this component you must include an additional JavaScript file from
 * Google:</p>
 * <pre><code>&lt;script type="text/javascript" src="http:&#47;&#47;maps.google.com/maps/api/js?sensor=true"&gt;&lt/script&gt;</code></pre>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Map/screenshot.png Ext.Map screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
var pnl = new Ext.Panel({
    fullscreen: true,
    items     : [
        {
            xtype             : 'map',
            useCurrentLocation: true
        }
    ]
});</code></pre>
 * @xtype map
 */
Ext.Map = Ext.extend(Ext.Component, {
    /**
     * @cfg {String} baseCls
     * The base CSS class to apply to the Maps's element (defaults to <code>'x-map'</code>).
     */
    baseCls: 'x-map',

    /**
     * @cfg {Boolean} useCurrentLocation
     * Pass in true to center the map based on the geolocation coordinates.
     */
    useCurrentLocation: false,
    
    monitorResize : true,

    /**
     * @cfg {Object} mapOptions
     * MapOptions as specified by the Google Documentation:
     * http://code.google.com/apis/maps/documentation/v3/reference.html
     */

    /**
     * @type {google.maps.Map}
     * The wrapped map.
     */
    map: null,

    /**
     * @type {Ext.util.GeoLocation}
     */
    geo: null,

    /**
     * @cfg {Boolean} maskMap
     * Masks the map (Defaults to false)
     */
    maskMap: false,
    /**
     * @cfg {Strng} maskMapCls
     * CSS class to add to the map when maskMap is set to true.
     */
    maskMapCls: 'x-mask-map',


    initComponent : function() {
        this.mapOptions = this.mapOptions || {};
        
        this.scroll = false;
        
        //<deprecated since="0.99">
        if (Ext.isDefined(this.getLocation)) {
            console.warn("SpinnerField: getLocation has been removed. Please use useCurrentLocation.");
            this.useCurrentLocation = this.getLocation;
        }
        //</deprecated>
        
        if(!(window.google || {}).maps){
            this.html = 'Google Maps API is required';   
        }
        else if (this.useCurrentLocation) {
            this.geo = this.geo || new Ext.util.GeoLocation({autoLoad: false});
            this.geo.on({
                locationupdate : this.onGeoUpdate,
                locationerror : this.onGeoError, 
                scope : this
            });
        }
        
        Ext.Map.superclass.initComponent.call(this);
                
        this.addEvents ( 
            /**
             * @event maprender
             * @param {Ext.Map} this
             * @param {google.maps.Map} map The rendered google.map.Map instance
             */     
            'maprender',
        
            /**
             * @event centerchange
             * @param {Ext.Map} this
             * @param {google.maps.Map} map The rendered google.map.Map instance
             * @param {google.maps.LatLong} center The current LatLng center of the map
             */     
            'centerchange',
            
            /**
             * @event typechange
             * @param {Ext.Map} this
             * @param {google.maps.Map} map The rendered google.map.Map instance
             * @param {Number} mapType The current display type of the map
             */     
            'typechange',
            
            /**
             * @event zoomchange
             * @param {Ext.Map} this
             * @param {google.maps.Map} map The rendered google.map.Map instance
             * @param {Number} zoomLevel The current zoom level of the map
             */     
            'zoomchange'
        );
        
        if (this.geo){
            this.on({
                activate: this.onUpdate,
                scope: this,
                single: true
            });
            this.geo.updateLocation();
        }
        
    },
    
    // @private    
    onRender : function(container, position) {
        Ext.Map.superclass.onRender.apply(this, arguments);
        this.el.setVisibilityMode(Ext.Element.OFFSETS);        
    },
    
     // @private
    afterRender : function() {
        Ext.Map.superclass.afterRender.apply(this, arguments);
        this.renderMap();
    },
    
    // @private
    onResize : function( w, h) {
        Ext.Map.superclass.onResize.apply(this, arguments);
        if (this.map) {
            google.maps.event.trigger(this.map, 'resize');
        }
    },
    
    afterComponentLayout : function() {
        if (this.maskMap && !this.mask) {
            this.el.mask(null, this.maskMapCls);
            this.mask = true;
        }
    },
    
    renderMap : function(){
        var me = this,
            gm = (window.google || {}).maps;
        
        if (gm) {
            if (Ext.is.iPad) {
                Ext.applyIf(me.mapOptions, {
                    navigationControlOptions: {
                        style: gm.NavigationControlStyle.ZOOM_PAN
                    }
                });
            }
                
            Ext.applyIf(me.mapOptions, {
                center: new gm.LatLng(37.381592, -122.135672), // Palo Alto
                zoom: 12,
                mapTypeId: gm.MapTypeId.ROADMAP
            });
            
            if (me.maskMap && !me.mask) {
                me.el.mask(null, this.maskMapCls);
                me.mask = true;
            }
    
            if (me.el && me.el.dom && me.el.dom.firstChild) {
                Ext.fly(me.el.dom.firstChild).remove();
            }
        
            if (me.map) {
                gm.event.clearInstanceListeners(me.map);
            }
            
            me.map = new gm.Map(me.el.dom, me.mapOptions);
            
            var event = gm.event;
            //Track zoomLevel and mapType changes
            event.addListener(me.map, 'zoom_changed', Ext.createDelegate(me.onZoom, me));
            event.addListener(me.map, 'maptypeid_changed', Ext.createDelegate(me.onTypeChange, me));
            event.addListener(me.map, 'center_changed', Ext.createDelegate(me.onCenterChange, me));
            
            me.fireEvent('maprender', me, me.map);
        }
        
    },

    onGeoUpdate : function(coords) {
        var center;
        if (coords) {
            center = this.mapOptions.center = new google.maps.LatLng(coords.latitude, coords.longitude);
        }
        
        if (this.rendered) {
            this.update(center);
        }
        else {
            this.on('activate', this.onUpdate, this, {single: true, data: center});
        }
    },
    
    onGeoError : function(geo){
          
    },

    onUpdate : function(map, e, options) {
        this.update((options || {}).data);
    },
    
    
    /**
     * Moves the map center to the designated coordinates hash of the form:
<code><pre>
 { latitude : 37.381592,
  longitude : -122.135672
  }</pre></code>
     * or a google.maps.LatLng object representing to the target location. 
     * @param {Object/google.maps.LatLng} coordinates Object representing the desired Latitude and
     * longitude upon which to center the map
     */
    update : function(coordinates) {
        var me = this, 
            gm = (window.google || {}).maps;

        if (gm) {
            coordinates = coordinates || me.coords || new gm.LatLng(37.381592, -122.135672);
            
            if (coordinates && !(coordinates instanceof gm.LatLng) && 'longitude' in coordinates) {
                coordinates = new gm.LatLng(coordinates.latitude, coordinates.longitude);
            }
            
            if (!me.hidden && me.rendered) {
                me.map || me.renderMap();
                if (me.map && coordinates instanceof gm.LatLng) {
                   me.map.panTo(coordinates);
                }
            }
            else {
                me.on('activate', me.onUpdate, me, {single: true, data: coordinates});
            }
        }
    },
    
    // @private
    onZoom  : function() {
        this.mapOptions.zoom = (this.map && this.map.getZoom 
            ? this.map.getZoom() 
            : this.mapOptions.zoom) || 10 ;
            
        this.fireEvent('zoomchange', this, this.map, this.mapOptions.zoom);
    },
    
    // @private
    onTypeChange  : function() {
        this.mapOptions.mapTypeId = this.map && this.map.getMapTypeId 
            ? this.map.getMapTypeId() 
            : this.mapOptions.mapTypeId;
        
        this.fireEvent('typechange', this, this.map, this.mapOptions.mapTypeId);
    },

    // @private
    onCenterChange : function(){
       this.mapOptions.center = this.map && this.map.getCenter 
            ? this.map.getCenter() 
            : this.mapOptions.center;
        
       this.fireEvent('centerchange', this, this.map, this.mapOptions.center);
       
    },
    
    getState : function(){
        return this.mapOptions;  
    },
    
    // @private    
    onDestroy : function() {
        Ext.destroy(this.geo);
        if (this.maskMap && this.mask) {
            this.el.unmask();
        }
        if (this.map && (window.google || {}).maps) {
            google.maps.event.clearInstanceListeners(this.map);
        }
        Ext.Map.superclass.onDestroy.call(this);
    }
});

Ext.reg('map', Ext.Map);
/**
 * @class Ext.NestedList
 * @extends Ext.Panel
 *
 * <p>NestedList provides a miller column interface to navigate between nested sets
 * and provide a clean interface with limited screen real-estate.</p>
 *
 * <pre><code>
// store with data
var data = {
    text: 'Groceries',
    items: [{
        text: 'Drinks',
        items: [{
            text: 'Water',
            items: [{
                text: 'Sparkling',
                leaf: true
            },{
                text: 'Still',
                leaf: true
            }]
        },{
            text: 'Coffee',
            leaf: true
        },{
            text: 'Espresso',
            leaf: true
        },{
            text: 'Redbull',
            leaf: true
        },{
            text: 'Coke',
            leaf: true
        },{
            text: 'Diet Coke',
            leaf: true
        }]
    },{
        text: 'Fruit',
        items: [{
            text: 'Bananas',
            leaf: true
        },{
            text: 'Lemon',
            leaf: true
        }]
    },{
        text: 'Snacks',
        items: [{
            text: 'Nuts',
            leaf: true
        },{
            text: 'Pretzels',
            leaf: true
        },{
            text: 'Wasabi Peas',
            leaf: true
        }]
    },{
        text: 'Empty Category',
        items: []
    }]
};
Ext.regModel('ListItem', {
    fields: [{name: 'text', type: 'string'}]
});
var store = new Ext.data.TreeStore({
    model: 'ListItem',
    root: data,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});
var nestedList = new Ext.NestedList({
    fullscreen: true,
    title: 'Groceries',
    displayField: 'text',
    store: store
});</code></pre>
 *
 * <u>Using a Detail Card</u>
 * 
 * Often it is useful to show a "details" card for each node - this is a card generated at runtime which is displayed
 * when the user taps on a leaf node. Here's how we can do this (using the same store as above):
 * 
<pre><code>
new Ext.NestedList({
    fullscreen: true,
    title: 'Groceries',
    displayField: 'text',
    store: store,

    getDetailCard: function(recordNode, parentNode) {
        return new Ext.Panel({
            title: 'Details about ' + recordNode.text,
            html: recordNode.text + ' is great'
        });
    }
});
</code></pre>
 * 
 * @xtype nestedlist
 */
Ext.NestedList = Ext.extend(Ext.Panel, {
    componentCls: 'x-nested-list',
    /**
     * @cfg {String} layout
     * @hide
     */
    layout: 'card',

    /**
     * @cfg {String} tpl
     * @hide
     */

    /**
     * @cfg {String} defaultType
     * @hide
     */

    // Putting this in getSubList otherwise users would have to explicitly
    // specify the xtype to create in getDetailCard
    //defaultType: 'list',

    /**
     * @cfg {String} cardSwitchAnimation
     * Animation to be used during transitions of cards.
     * Any valid value from Ext.anims can be used ('fade', 'slide', 'flip', 'cube', 'pop', 'wipe').
     * Defaults to 'slide'.
     */
    cardSwitchAnimation: 'slide',

    /**
     * @type Ext.Button
     */
    backButton: null,

    /**
     * @cfg {String} backText
     * The label to display for the back button. Defaults to "Back".
     */
    backText: 'Back',

    /**
     * @cfg {Boolean} useTitleAsBackText
     */
    useTitleAsBackText: true,

    /**
     * @cfg {Boolean} updateTitleText
     * Update the title with the currently selected category. Defaults to true.
     */
    updateTitleText: true,

    /**
     * @cfg {String} displayField
     * Display field to use when setting item text and title.
     * This configuration is ignored when overriding getItemTextTpl or
     * getTitleTextTpl for the item text or title. (Defaults to 'text')
     */
    displayField: 'text',

    /**
     * @cfg {String} loadingText
     * Loading text to display when a subtree is loading.
     */
    loadingText: 'Loading...',

    /**
     * @cfg {String} emptyText
     * Empty text to display when a subtree is empty.
     */
    emptyText: 'No items available.',

    /**
     * @cfg {Boolean/Function} onItemDisclosure
     * Maps to the Ext.List onItemDisclosure configuration for individual lists. (Defaults to false)
     */
    onItemDisclosure: false,

    /**
     * @cfg {Boolean/Number} clearSelectionDelay
     * Number of milliseconds to show the highlight when going back in a list. (Defaults to 200).
     * Passing false will keep the prior list selection.
     */
    clearSelectionDelay: 200,
    
    
    /**
     * @cfg {Boolean} allowDeselect
     * Set to true to alow the user to deselect leaf items via interaction.
     * Defaults to false.
     */
    allowDeselect: false,

    /**
     * Override this method to provide custom template rendering of individual
     * nodes. The template will receive all data within the Record and will also
     * receive whether or not it is a leaf node.
     * @param {Ext.data.Record} node
     */
    getItemTextTpl: function(node) {
        return '{' + this.displayField + '}';
    },

    /**
     * Override this method to provide custom template rendering of titles/back
     * buttons when useTitleAsBackText is enabled.
     * @param {Ext.data.Record} node
     */
    getTitleTextTpl: function(node) {
        return '{' + this.displayField + '}';
    },

    // private
    renderTitleText: function(node) {
        // caching this on the record/node
        // could store in an internal cache via id
        // so that we could clean it up
        if (!node.titleTpl) {
            node.titleTpl = new Ext.XTemplate(this.getTitleTextTpl(node));
        }
        var record = node.getRecord();
        if (record) {
            return node.titleTpl.applyTemplate(record.data);
        } else if (node.isRoot) {
            return this.title || this.backText;
        // <debug>
        } else {
            throw new Error("No RecordNode passed into renderTitleText");
        }
        // </debug>
    },

    /**
     * @property toolbar
     * Ext.Toolbar shared across each of the lists.
     * This will only exist when useToolbar is true which
     * is the default.
     */
    /**
     * @cfg {Boolean} useToolbar True to show the header toolbar. Defaults to true.
     */
    useToolbar: true,

    /**
     * @property store
     * Ext.data.TreeStore
     */

    /**
     * @cfg {Ext.data.TreeStore} store
     * The {@link Ext.data.TreeStore} to bind this NestedList to.
     */

    /**
     * Implement getDetailCard to provide a final card for leaf nodes. This is useful when you want to display details
     * about each node, instead of simply reaching the listing all of the nodes at the bottom level of the tree. See
     * the intro docs for sample usage.
     * The default implementation will return false, which means no detail card will be inserted
     * @param {Ext.data.Record} record
     * @param {Ext.data.Record} parentRecord
     */
    getDetailCard: function(recordNode, parentNode) {
        return false;
    },

    initComponent : function() {
        //<deprecated since=0.99>
        if (Ext.isDefined(this.clearSelectionDefer)) {
            console.warn("NestedList: clearSelectionDefer has been removed. Please use clearSelectionDelay.");
            this.clearSelectionDelay = this.clearSelectionDefer;
        }
        
        if (Ext.isDefined(this.disclosure)) {
            console.warn("NestedList: disclosure has been removed. Please use onItemDisclosure");
            this.onItemDisclosure = this.disclosure;
        }
        //</deprecated>
        
        var store    = Ext.StoreMgr.lookup(this.store),
            rootNode = store.getRootNode(),
            title    = rootNode.getRecord() ? this.renderTitleText(rootNode) : this.title || '';

        this.store = store;

        if (this.useToolbar) {
            // Add the back button
            this.backButton = new Ext.Button({
                text: this.backText,
                ui: 'back',
                handler: this.onBackTap,
                scope: this,
                // First stack doesn't show back
                hidden: true
            });
            if (!this.toolbar || !this.toolbar.isComponent) {
                /**
                 * @cfg {Object} toolbar
                 * Configuration for the Ext.Toolbar that is created within the Ext.NestedList.
                 */
                this.toolbar = Ext.apply({}, this.toolbar || {}, {
                    dock: 'top',
                    xtype: 'toolbar',
                    ui: 'light',
                    title: title,
                    items: []
                });
                this.toolbar.items.unshift(this.backButton);
                this.toolbar = new Ext.Toolbar(this.toolbar);

                this.dockedItems = this.dockedItems || [];
                this.dockedItems.push(this.toolbar);
            } else {
                this.toolbar.insert(0, this.backButton);
            }
        }

        this.items = [this.getSubList(rootNode)];

        Ext.NestedList.superclass.initComponent.call(this);
        this.on('itemtap', this.onItemTap, this);


        this.addEvents(
            /**
             * @event itemtap
             * Fires when a node is tapped on
             * @param {Ext.List} list The Ext.List that is currently active
             * @param {Number} index The index of the item that was tapped
             * @param {Ext.Element} item The item element
             * @param {Ext.EventObject} e The event object
             */

            /**
             * @event itemdoubletap
             * Fires when a node is double tapped on
             * @param {Ext.List} list The Ext.List that is currently active
             * @param {Number} index The index of the item that was tapped
             * @param {Ext.Element} item The item element
             * @param {Ext.EventObject} e The event object
             */

            /**
             * @event containertap
             * Fires when a tap occurs and it is not on a template node.
             * @param {Ext.List} list The Ext.List that is currently active
             * @param {Ext.EventObject} e The raw event object
             */

            /**
             * @event selectionchange
             * Fires when the selected nodes change.
             * @param {Ext.List} list The Ext.List that is currently active
             * @param {Array} selections Array of the selected nodes
             */

            /**
             * @event beforeselect
             * Fires before a selection is made. If any handlers return false, the selection is cancelled.
             * @param {Ext.List} list The Ext.List that is currently active
             * @param {HTMLElement} node The node to be selected
             * @param {Array} selections Array of currently selected nodes
             */

            // new events.
            /**
             * @event listchange
             * Fires when the user taps a list item
             * @param {Ext.NestedList} this
             * @param {Object} listitem
             */
            'listchange',

            /**
             * @event leafitemtap
             * Fires when the user taps a leaf list item
             * @param {Ext.List} subList The subList the item is on
             * @param {Number} subIdx The id of the item tapped
             * @param {Ext.Element} el The element of the item tapped
             * @param {Ext.EventObject} e The event
             * @param {Ext.Panel} card The next card to be shown
             */
            'leafitemtap'
        );
    },

    /**
     * @private
     * Returns the list config for a specified node.
     * @param {HTMLElement} node The node for the list config
     */
    getListConfig: function(node) {
        var itemId = node.internalId,
            emptyText = this.emptyText;

        return {
            itemId: itemId,
            xtype: 'list',
            autoDestroy: true,
            recordNode: node,
            store: this.store.getSubStore(node),
            loadingText: this.loadingText,
            onItemDisclosure: this.onItemDisclosure,
            displayField: this.displayField,
            singleSelect: true,
            clearSelectionOnDeactivate: false,
            bubbleEvents: [
                'itemtap',
                'containertap',
                'beforeselect',
                'itemdoubletap',
                'selectionchange'
            ],
            itemTpl: '<span<tpl if="leaf == true"> class="x-list-item-leaf"</tpl>>' + this.getItemTextTpl(node) + '</span>',
            deferEmptyText: true,
            allowDeselect: this.allowDeselect,
            refresh: function() {
                if (this.hasSkippedEmptyText) {
                    this.emptyText = emptyText;
                }
                Ext.List.prototype.refresh.apply(this, arguments);
            }
        };
    },

    /**
     * Returns the subList for a specified node
     * @param {HTMLElement} node The node for the subList
     */
    getSubList: function(node) {
        var items  = this.items,
            list,
            itemId = node.internalId;

        // can be invoked prior to items being transformed into
        // a MixedCollection
        if (items && items.get) {
            list = items.get(itemId);
        }

        if (list) {
            return list;
        } else {
            return this.getListConfig(node);
        }
    },

    addNextCard: function(recordNode, swapTo) {
        var nextList,
            parentNode   = recordNode ? recordNode.parentNode : null,
            card;

        if (recordNode.leaf) {
            card = this.getDetailCard(recordNode, parentNode);
            if (card) {
                nextList = this.add(card);
            }
        } else {
            nextList = this.getSubList(recordNode);
            nextList = this.add(nextList);
        }
        return nextList;
    },

    setActivePath: function(path) {
        // a forward leading slash indicates to go
        // to root, otherwise its relative to current
        // position
        var gotoRoot = path.substr(0, 1) === "/",
            j        = 0,
            ds       = this.store,
            tree     = ds.tree,
            node, card, lastCard,
            pathArr, pathLn;

        if (gotoRoot) {
            path = path.substr(1);
        }

        pathArr = Ext.toArray(path.split('/'));
        pathLn  = pathArr.length;


        if (gotoRoot) {
            // clear all but first item
            var items      = this.items,
                itemsArray = this.items.items,
                i          = items.length;

            for (; i > 1; i--) {
                this.remove(itemsArray[i - 1], true);
            }

            // verify last item left matches first item in pathArr
            // <debug>
            var rootNode = itemsArray[0].recordNode;
            if (rootNode.id !== pathArr[0]) {
                throw new Error("rootNode doesn't match!");
            }
            // </debug>

            // skip the 0 item rather than remove/add
            j = 1;
        }


        // loop through the path and add cards
        for (; j < pathLn; j++) {
            if (pathArr[j] !== "") {
                node = tree.getNodeById(pathArr[j]);

                // currently adding cards and not verifying
                // that they are true child nodes of the current parent
                // this would be some good debug tags.
                card = this.addNextCard(node);

                // leaf nodes may or may not have a card
                // therefore we need a temp var (lastCard)
                if (card) {
                    lastCard = card;
                }
            }
        }

        // <debug>
        if (!lastCard) {
            throw new Error("Card was not found when trying to add to NestedList.");
        }
        // </debug>

        this.setActiveItem(lastCard, false);
        this.fireEvent('listchange', this, lastCard);
        this.syncToolbar();
    },

    syncToolbar: function(card) {
        var list          = card || this.getActiveItem(),
            depth         = this.items.indexOf(list),
            recordNode    = list.recordNode,
            parentNode    = recordNode ? recordNode.parentNode : null,
            backBtn       = this.backButton,
            backBtnText   = this.useTitleAsBackText && parentNode ? this.renderTitleText(parentNode) : this.backText,
            backToggleMth = (depth !== 0) ? 'show' : 'hide';


            if (backBtn) {
                backBtn[backToggleMth]();
                if (parentNode) {
                    backBtn.setText(backBtnText);
                }
            }


            if (this.toolbar && this.updateTitleText) {
                this.toolbar.setTitle(recordNode && recordNode.getRecord() ? this.renderTitleText(recordNode) : this.title || '');
                this.toolbar.doLayout();
            }
    },

    /**
     * Called when an list item has been tapped
     * @param {Ext.List} subList The subList the item is on
     * @param {Number} subIdx The id of the item tapped
     * @param {Ext.Element} el The element of the item tapped
     * @param {Ext.EventObject} e The event
     */
    onItemTap: function(subList, subIdx, el, e) {
        var store        = subList.getStore(),
            record       = store.getAt(subIdx),
            recordNode   = record.node,
            parentNode   = recordNode ? recordNode.parentNode : null,
            displayField = this.displayField,
            backToggleMth,
            nextDepth,
            nextList;

        nextList = this.addNextCard(recordNode);

        if (recordNode.leaf) {
            this.fireEvent("leafitemtap", subList, subIdx, el, e, nextList);
        }

        if (nextList) {
            // depth should be based off record
            // and TreeStore rather than items.
            nextDepth = this.items.indexOf(nextList);

            this.setActiveItem(nextList, {
                type: this.cardSwitchAnimation
            });
            this.syncToolbar(nextList);
        }
    },

    /**
     * Called when the {@link #backButton} has been tapped
     */
    onBackTap: function() {
        var currList      = this.getActiveItem(),
            currIdx       = this.items.indexOf(currList);

        if (currIdx != 0) {
            var prevDepth     = currIdx - 1,
                prevList      = this.items.getAt(prevDepth),
                recordNode    = prevList.recordNode,
                record        = recordNode.getRecord(),
                parentNode    = recordNode ? recordNode.parentNode : null,
                backBtn       = this.backButton,
                backToggleMth = (prevDepth !== 0) ? 'show' : 'hide',
                backBtnText;

            this.on('cardswitch', function(newCard, oldCard) {
                var selModel = prevList.getSelectionModel();
                this.remove(currList);
                if (this.clearSelectionDelay) {
                    Ext.defer(selModel.deselectAll, this.clearSelectionDelay, selModel);
                }
            }, this, {single: true});
            
            this.setActiveItem(prevList, {
                type: this.cardSwitchAnimation,
                reverse: true,
                scope: this
            });
            this.syncToolbar(prevList);
        }
    }
});
Ext.reg('nestedlist', Ext.NestedList);
/**
 * @class Ext.Picker
 * @extends Ext.Sheet
 *
 * <p>A general picker class.  Slots are used to organize multiple scrollable slots into a single picker. {@link #slots} is 
 * the only necessary property</p>
 * 
 * <h2>Example usage:</h2>
 * <pre><code>
var picker = new Ext.Picker({
    slots: [
        {
            name : 'limit_speed',
            title: 'Speed',
            data : [
                {text: '50 KB/s', value: 50},
                {text: '100 KB/s', value: 100},
                {text: '200 KB/s', value: 200},
                {text: '300 KB/s', value: 300}
            ]
        }
    ]
});
picker.show();
 * </code></pre>
 * 
 * @constructor
 * Create a new List
 * @param {Object} config The config object
 * @xtype picker
 */
Ext.Picker = Ext.extend(Ext.Sheet, {
    /**
     * @cfg {String} componentCls
     * The main component class
     */
    componentCls: 'x-picker',
    
    stretchX: true,
    stretchY: true,
    hideOnMaskTap: false,
    
    /**
     * @cfg {String/Mixed} doneButton
     * Can be either:<ul>
     * <li>A {String} text to be used on the Done button</li>
     * <li>An {Object} as config for {@link Ext.Button}</li>
     * <li>false or null to hide it</li></ul>
     *
     * Defaults to 'Done'.
     */
    doneButton: 'Done',
    
    /**
     * @cfg {String/Mixed} doneButton
     * Can be either:<ul>
     * <li>A {String} text to be used on the Done button</li>
     * <li>An {Object} as config for {@link Ext.Button}</li>
     * <li>false or null to hide it</li></ul>
     *
     * Defaults to 'Done'.
     */
    cancelButton: 'Cancel',

    /**
     * @cfg {Number} height
     * The height of the picker.
     * Defaults to 220
     */
    height: 220,
    
    /**
     * @cfg {Boolean} useTitles
     * Generate a title header for each individual slot and use
     * the title configuration of the slot.
     * Defaults to false.
     */
    useTitles: false,

    /**
     * @cfg {String} activeCls
     * CSS class to be applied to individual list items when they have
     * been chosen.
     */
    // activeCls: 'x-picker-active-item',

    /**
     * @cfg {Array} slots
     * An array of slot configurations.
     * <ul>
     *  <li>name - {String} - Name of the slot</li>
     *  <li>align - {String} - Alignment of the slot. left, right, or center</li>
     *  <li>items - {Array} - An array of text/value pairs in the format {text: 'myKey', value: 'myValue'}</li>
     *  <li>title - {String} - Title of the slot. This is used in conjunction with useTitles: true.</li>
     * </ul>
     */
    //
    // chosenCls: 'x-picker-chosen-item',
    
    // private
    defaultType: 'pickerslot',
    
    // private
    initComponent : function() {
        //<deprecated since="0.99">
        if (Ext.isDefined(this.showDoneButton)) {
            console.warn("[Ext.Picker] showDoneButton config is deprecated. Please use doneButton instead");
        }

        if (Ext.isDefined(this.doneText)) {
            console.warn("[Ext.Picker] doneText config is deprecated. Please use doneButton instead");
            this.doneButton = this.doneText;
        }
        //</deprecated>

        this.addEvents(
            /**
             * @event pick
             * Fired when a slot has been picked
             * @param {Ext.Picker} this This Picker
             * @param {Object} The values of this picker's slots, in {name:'value'} format
             * @param {Ext.Picker.Slot} slot An instance of Ext.Picker.Slot that has been picked
             */
            'pick',

            /**
             * @event change
             * Fired when the picked value has changed
             * @param {Ext.Picker} this This Picker
             * @param {Object} The values of this picker's slots, in {name:'value'} format
             */
            'change',

            /**
             * @event cancel
             * Fired when the cancel button is tapped and the values are reverted back to
             * what they were
             * @param {Ext.Picker} this This Picker
             */
            'cancel'
        );
            
        this.layout = {
            type: 'hbox',
            align: 'stretch'
        };

        if (this.slots) {
            this.items = this.items ? (Ext.isArray(this.items) ? this.items : [this.items]) : [];
            this.items = this.items.concat(this.slots);
        }
        
        if (this.useTitles) {
            this.defaults = Ext.applyIf(this.defaults || {}, {
                title: ''
            });            
        }

        this.on('slotpick', this.onSlotPick, this);

        if (this.doneButton || this.cancelButton) {
            var toolbarItems = [];

            if (this.cancelButton) {
                toolbarItems.push(
                    Ext.apply(
                        {
                            handler: this.onCancelButtonTap,
                            scope: this
                        },
                        ((Ext.isObject(this.cancelButton) ? this.cancelButton : { text: String(this.cancelButton) }))
                    )
                );
            }

            toolbarItems.push({xtype: 'spacer'});

            if (this.doneButton) {
                toolbarItems.push(
                    Ext.apply(
                        {
                            ui: 'action',
                            handler: this.onDoneButtonTap,
                            scope: this
                        },
                        ((Ext.isObject(this.doneButton) ? this.doneButton : { text: String(this.doneButton) }))
                    )
                );
            }

            this.toolbar = new Ext.Toolbar(Ext.applyIf(this.buttonBar || {
                dock: 'top',
                items: toolbarItems,
                defaults: {
                    xtype: 'button'
                }
            }));
           
            this.dockedItems = this.dockedItems ? (Ext.isArray(this.dockedItems) ? this.dockedItems : [this.dockedItems]) : [];
            this.dockedItems.push(this.toolbar);
        }

        Ext.Picker.superclass.initComponent.call(this);
    },

    // @private
    afterRender: function() {
        Ext.Picker.superclass.afterRender.apply(this, arguments);

        if (this.value) {
            this.setValue(this.value, false);
        }
    },

    /**
     * @private
     * Called when the done button has been tapped.
     */
    onDoneButtonTap : function() {
        var anim = this.animSheet('exit');
        Ext.apply(anim, {
            after: function() {
                this.fireEvent('change', this, this.getValue());
            },
            scope: this
        });
        this.hide(anim);
    },

    /**
     * @private
     * Called when the cancel button has been tapped.
     */
    onCancelButtonTap : function() {
        var anim = this.animSheet('exit');
        Ext.apply(anim, {
            after: function() {
                // Set the value back to what it was previously
                this.setValue(this.values);
                this.fireEvent('cancel', this);
            },
            scope: this
        });
        this.hide(anim);
    },
    
    /**
     * @private
     * Called when a slot has been picked.
     */
    onSlotPick: function(slot, value, node) {
        this.fireEvent('pick', this, this.getValue(), slot);
        return false;
    },
    
    /**
     * Sets the values of the pickers slots
     * @param {Object} values The values in a {name:'value'} format
     * @param {Boolean} animated True to animate setting the values
     * @return {Ext.Picker} this This picker
     */
    setValue: function(values, animated) {
        var slot,
            items = this.items.items,
            ln = items.length;

        // Value is an object with keys mapping to slot names
        if (!values) {
            for (var i = 0; i < ln; i++) {
                items[i].setSelectedNode(0);
            }
            
            return this;
        }

        Ext.iterate(values, function(key, value) {
            slot = this.child('[name=' + key + ']');
            
            if (slot) {
                slot.setValue(value, animated);
            }
        }, this);

        this.values = values;
       
        return this;
    },
    
    /**
     * Returns the values of each of the pickers slots
     * @return {Object} The values of the pickers slots
     */
    getValue: function() {
        var values = {},
            items = this.items.items,
            ln = items.length, item, i;

        for (i = 0; i < ln; i++) {
            item = items[i];
            values[item.name] = item.getValue();
        }

        return values;
    }
});

Ext.regModel('x-textvalue', {
    fields: ['text', 'value']
});

/**
 * @private
 * @class Ext.Picker.Slot
 * @extends Ext.DataView
 *
 * <p>A general picker slot class.  Slots are used to organize multiple scrollable slots into a single picker
 * See also: {@link Ext.Picker}</p>
 * 
 * @constructor
 * Create a new Picker Slot
 * @param {Object} config The config object
 * @xtype pickerslot
 */
Ext.Picker.Slot = Ext.extend(Ext.DataView, {
    isSlot: true,
    
    flex: 1,

    /**
     * @cfg {String} name
     * The name of this slot. This config option is required.
     */
    name: null,

    /**
     * @cfg {String} displayField
     * The display field in the store.
     * Defaults to 'text'.
     */
    displayField: 'text',

    /**
     * @cfg {String} valueField
     * The value field in the store.
     * Defaults to 'value'.
     */
    valueField: 'value',

    /**
     * @cfg {String} align
     * The alignment of this slot.
     * Defaults to 'center'
     */
    align: 'center',
    
    /**
     * @hide
     * @cfg {String} itemSelector
     */
    itemSelector: 'div.x-picker-item',
    
    /**
     * @private
     * @cfg {String} componentCls
     * The main component class
     */
    componentCls: 'x-picker-slot',
    
    /**
     * @private
     * @cfg {Ext.Template/Ext.XTemplate/Array} renderTpl
     * The renderTpl of the slot.
     */
    renderTpl : [
        '<div class="x-picker-mask">',
            '<div class="x-picker-bar"></div>',
        '</div>'
    ],
    
    /**
     * @private
     * The current selectedIndex of the picker slot
     */
    selectedIndex: 0,
    
    /**
     * @private
     */
    getElConfig: function() {
        return {
            tag: 'div',
            id: this.id,
            cls: 'x-picker-' + this.align
        };
    },
    
    /**
     * @private
     */
    initComponent : function() {
        // <debug>
        if (!this.name) {
            throw new Error('Each picker slot is required to have a name.');
        }
        // </debug>

        Ext.apply(this.renderSelectors, {
            mask: '.x-picker-mask',
            bar: '.x-picker-bar'
        });

        this.scroll = {
            direction: 'vertical',
            useIndicators: false,
            friction: 0.7,
            acceleration: 25,
            snapDuration: 200,
            animationDuration: 200
        };

        this.tpl = new Ext.XTemplate([
            '<tpl for=".">',
                '<div class="x-picker-item {cls} <tpl if="extra">x-picker-invalid</tpl>">{' + this.displayField + '}</div>',
            '</tpl>'
        ]);

        var data = this.data,
            parsedData = [],
            ln = data && data.length,
            i, item, obj;

        if (data && Ext.isArray(data) && ln) {
            for (i = 0; i < ln; i++) {
                item = data[i];
                obj = {};
                if (Ext.isArray(item)) {
                    obj[this.valueField] = item[0];
                    obj[this.displayField] = item[1];
                }
                else if (Ext.isString(item)) {
                    obj[this.valueField] = item;
                    obj[this.displayField] = item;
                }
                else if (Ext.isObject(item)) {
                    obj = item;
                }
                parsedData.push(obj);
            }

            this.store = new Ext.data.Store({
                model: 'x-textvalue',
                data: parsedData
            });
            
            this.tempStore = true;
        }
        else if (this.store) {
            this.store = Ext.StoreMgr.lookup(this.store);
        }

        this.enableBubble('slotpick');

        if (this.title) {
            this.title = new Ext.Component({
                dock: 'top',
                componentCls: 'x-picker-slot-title',
                html: this.title
            });
            this.dockedItems = this.title;
        }

        Ext.Picker.Slot.superclass.initComponent.call(this);

        if (this.value !== undefined) {
            this.setValue(this.value, false);
        }
    },
    
    /**
     * @private
     */
    setupBar: function() {
        this.el.setStyle({padding: ''});

        var padding = this.bar.getY() - this.el.getY();
        this.barHeight = this.bar.getHeight();

        this.el.setStyle({
            padding: padding + 'px 0'
        });
        this.slotPadding = padding;
        this.scroller.updateBoundary();
        this.scroller.setSnap(this.barHeight);
        this.setSelectedNode(this.selectedIndex, false);
    },
    
    /**
     * @private
     */
    afterComponentLayout: function() {
        // Dont call superclass afterComponentLayout since we dont want
        // the scroller to get a min-height
        Ext.defer(this.setupBar, 200, this);
    },
    
    /**
     * @private
     */
    initEvents: function() {
        this.mon(this.scroller, {
            scrollend: this.onScrollEnd,
            scope: this
        });
    },
    
    /**
     * @private
     */
    onScrollEnd: function(scroller, offset) {
        this.selectedNode = this.getNode(Math.round(offset.y / this.barHeight));
        this.selectedIndex = this.indexOf(this.selectedNode);
        this.fireEvent('slotpick', this, this.getValue(), this.selectedNode);
    },
    
    /**
     * @private
     */
    scrollToNode: function(node, animate) {
        var offsetsToBody = Ext.fly(node).getOffsetsTo(this.scrollEl)[1];
        this.scroller.scrollTo({
            y: offsetsToBody
        }, animate !== false ? true : false);
    },
    
    /**
     * @private
     * Called when an item has been tapped
     */
    onItemTap: function(node) {
        Ext.Picker.Slot.superclass.onItemTap.apply(this, arguments);
        this.setSelectedNode(node);

        this.selectedNode = node;
        this.selectedIndex = this.indexOf(node);
        this.fireEvent('slotpick', this, this.getValue(), this.selectedNode);
    },
    
    /**
     * 
     */
    getSelectedNode: function() {
        return this.selectedNode;
    },
    
    /**
     * 
     */
    setSelectedNode: function(selected, animate) {
        // If it is a number, we assume we are dealing with an index
        if (Ext.isNumber(selected)) {
            selected = this.getNode(selected);
        }
        else if (selected.isModel) {
            selected = this.getNode(this.store.indexOf(selected));
        }

        // If its not a model or a number, we assume its a node
        if (selected) {
            this.selectedNode = selected;
            this.selectedIndex = this.indexOf(selected);
            this.scrollToNode(selected, animate);
        }
    },
    
    /**
     * 
     */
    getValue: function() {
        var record = this.store.getAt(this.selectedIndex);
        return record ? record.get(this.valueField) : null;
    },

    /**
     * 
     */
    setValue: function(value, animate) {
        var index = this.store.find(this.valueField, value);
        if (index != -1) {
            if (!this.rendered) {
                this.selectedIndex = index;
                return;
            }
            this.setSelectedNode(index, animate);
        }
    },

    onDestroy: function() {
        if (this.tempStore) {
            this.store.destroyStore();
            this.store = null;
        }
        Ext.Picker.Slot.superclass.onDestroy.call(this);
    }
});

Ext.reg('pickerslot', Ext.Picker.Slot);

/**
 * @class Ext.DatePicker
 * @extends Ext.Picker
 *
 * <p>A date picker component which shows a DatePicker on the screen. This class extends from {@link Ext.Picker} and {@link Ext.Sheet} so it is a popup.</p>
 * <p>This component has no required properties.</p>
 *
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #yearFrom}</li>
 *   <li>{@link #yearTo}</li>
 * </ul>
 *
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.DatePicker/screenshot.png Ext.DatePicker screenshot}
 *
 * <h2>Example code:</h2>
 *
 * <pre><code>
var datePicker = new Ext.DatePicker();
datePicker.show();
 * </code></pre>
 *
 * <p>you may want to adjust the {@link #yearFrom} and {@link #yearTo} properties:
 * <pre><code>
var datePicker = new Ext.DatePicker({
    yearFrom: 2000,
    yearTo  : 2015
});
datePicker.show();
 * </code></pre>
 *
 * @constructor
 * Create a new List
 * @param {Object} config The config object
 * @xtype datepicker
 */
Ext.DatePicker = Ext.extend(Ext.Picker, {
    /**
     * @cfg {Number} yearFrom
     * The start year for the date picker.  Defaults to 1980
     */
    yearFrom: 1980,

    /**
     * @cfg {Number} yearTo
     * The last year for the date picker.  Defaults to the current year.
     */
    yearTo: new Date().getFullYear(),

    /**
     * @cfg {String} monthText
     * The label to show for the month column. Defaults to 'Month'.
     */
    monthText: 'Month',

    /**
     * @cfg {String} dayText
     * The label to show for the day column. Defaults to 'Day'.
     */
    dayText: 'Day',

    /**
     * @cfg {String} yearText
     * The label to show for the year column. Defaults to 'Year'.
     */
    yearText: 'Year',

    /**
     * @cfg {Object/Date} value
     * Default value for the field and the internal {@link Ext.DatePicker} component. Accepts an object of 'year',
     * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
     *
     * Examples:
     * {year: 1989, day: 1, month: 5} = 1st May 1989.
     * new Date() = current date
     */

    /**
     * @cfg {Array} slotOrder
     * An array of strings that specifies the order of the slots. Defaults to <tt>['month', 'day', 'year']</tt>.
     */
    slotOrder: ['month', 'day', 'year'],

    initComponent: function() {
        var yearsFrom = this.yearFrom,
            yearsTo = this.yearTo,
            years = [],
            days = [],
            months = [],
            ln, tmp, i,
            daysInMonth;

        // swap values if user mixes them up.
        if (yearsFrom > yearsTo) {
            tmp = yearsFrom;
            yearsFrom = yearsTo;
            yearsTo = tmp;
        }

        for (i = yearsFrom; i <= yearsTo; i++) {
            years.push({
                text: i,
                value: i
            });
        }

        daysInMonth = this.getDaysInMonth(1, new Date().getFullYear());

        for (i = 0; i < daysInMonth; i++) {
            days.push({
                text: i + 1,
                value: i + 1
            });
        }

        for (i = 0, ln = Date.monthNames.length; i < ln; i++) {
            months.push({
                text: Date.monthNames[i],
                value: i + 1
            });
        }

        this.slots = [];

        this.slotOrder.forEach(function(item){
            this.slots.push(this.createSlot(item, days, months, years));
        }, this);

        Ext.DatePicker.superclass.initComponent.call(this);
    },

    afterRender: function() {
        Ext.DatePicker.superclass.afterRender.apply(this, arguments);

        this.setValue(this.value);
    },

    createSlot: function(name, days, months, years){
        switch (name) {
            case 'year':
                return {
                    name: 'year',
                    align: 'center',
                    data: years,
                    title: this.useTitles ? this.yearText : false,
                    flex: 3
                };
            case 'month':
                return {
                    name: name,
                    align: 'right',
                    data: months,
                    title: this.useTitles ? this.monthText : false,
                    flex: 4
                };
            case 'day':
                return {
                    name: 'day',
                    align: 'center',
                    data: days,
                    title: this.useTitles ? this.dayText : false,
                    flex: 2
                };
        }
    },

    // @private
    onSlotPick: function(slot, value) {
        var name = slot.name,
            date, daysInMonth, daySlot;

        if (name === "month" || name === "year") {
            daySlot = this.child('[name=day]');
            date = this.getValue();
            daysInMonth = this.getDaysInMonth(date.getMonth()+1, date.getFullYear());
            daySlot.store.clearFilter();
            daySlot.store.filter({
                fn: function(r) {
                    return r.get('extra') === true || r.get('value') <= daysInMonth;
                }
            });
            daySlot.scroller.updateBoundary(true);
        }

        Ext.DatePicker.superclass.onSlotPick.apply(this, arguments);
    },

    /**
     * Gets the current value as a Date object
     * @return {Date} value
     */
    getValue: function() {
        var value = Ext.DatePicker.superclass.getValue.call(this),
            daysInMonth = this.getDaysInMonth(value.month, value.year),
            day = Math.min(value.day, daysInMonth);

        return new Date(value.year, value.month-1, day);
    },

    /**
     * Sets the values of the DatePicker's slots
     * @param {Date/Object} value The value either in a {day:'value', month:'value', year:'value'} format or a Date
     * @param {Boolean} animated True for animation while setting the values
     * @return {Ext.DatePicker} this This DatePicker
     */
    setValue: function(value, animated) {
        if (!Ext.isDate(value) && !Ext.isObject(value)) {
            value = null;
        }

        if (Ext.isDate(value)) {
            this.value = {
                day : value.getDate(),
                year: value.getFullYear(),
                month: value.getMonth() + 1
            };
        } else {
            this.value = value;
        }

        return Ext.DatePicker.superclass.setValue.call(this, this.value, animated);
    },

    // @private
    getDaysInMonth: function(month, year) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return month == 2 && this.isLeapYear(year) ? 29 : daysInMonth[month-1];
    },

    // @private
    isLeapYear: function(year) {
        return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
    }
});

Ext.reg('datepicker', Ext.DatePicker);

/**
 * @class Ext.Media
 * @extends Ext.Container
 *
 * <p>Provides a base class for audio/visual controls. Should not be used directly.</p>
 * @xtype media
 */
Ext.Media = Ext.extend(Ext.Component, {
    /**
     * @constructor
     * @param {Object} config
     * Create a new Media component.
     */

    /**
     * @cfg {String} url
     * Location of the media to play.
     */
    url: '',

    /**
     * @cfg {Boolean} enableControls
     * Set this to false to turn off the native media controls 
     * (Defaults to true).
     */
    enableControls: true,
    
    /**
     * @cfg {Boolean} autoResume
     * Will automatically start playing the media when the container is activated.
     * (Defaults to false)
     */
    autoResume: false,

    /**
     * @cfg {Boolean} autoPause
     * Will automatically pause the media when the container is deactivated.
     * (Defaults to true)
     */
    autoPause: true,

    /**
     * @cfg {Boolean} preload
     * Will begin preloading the media immediately.
     * (Defaults to true)
     */
    preload: true,

    // @private
    playing: false,

    // @private
    afterRender : function() {
        var cfg = this.getConfiguration();
        Ext.apply(cfg, {
            src: this.url,
            preload: this.preload ? 'auto' : 'none'
        });
        if(this.enableControls){
            cfg.controls = 'controls';
        }
        if(this.loop){
            cfg.loop = 'loop';
        }
        /**
         * A reference to the underlying audio/video element.
         * @property media
         * @type Ext.Element
         */
        this.media = this.el.createChild(cfg);
        Ext.Media.superclass.afterRender.call(this);
        
        this.on({
            scope: this,
            activate: this.onActivate,
            beforedeactivate: this.onDeactivate
        });
    },
    
    // @private
    onActivate: function(){
        if (this.autoResume && !this.playing) {
            this.play();
        }
    },
    
    // @private
    onDeactivate: function(){
        if (this.autoPause && this.playing) {
            this.pause();
        }
    },

    /**
     * Starts or resumes media playback
     */
    play : function() {
        this.media.dom.play();
        this.playing = true;
    },

    /**
     * Pauses media playback
     */
    pause : function() {
        this.media.dom.pause();
        this.playing = false;
    },

    /**
     * Toggles the media playback state
     */
    toggle : function() {
        if(this.playing){
            this.pause();    
        }
        else {
            this.play();
        }
    }
});

Ext.reg('media', Ext.Media);
/**
 * @class Ext.Video
 * @extends Ext.Media
 *
 * <p>Provides a simple Container for HTML5 Video.</p>
 *
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #url}</li>
 *   <li>{@link #autoPause}</li>
 *   <li>{@link #autoResume}</li>
 * </ul>
 * 
 * <h2>Useful Methods</h2>
 * <ul class="list">
 *   <li>{@link #pause}</li>
 *   <li>{@link #play}</li>
 *   <li>{@link #toggle}</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Video/screenshot.png Ext.Video screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
var pnl = new Ext.Panel({
    fullscreen: true,
    items: [
        {
            xtype    : 'video',
            x        : 600,
            y        : 300,
            width    : 175,
            height   : 98,
            url      : "porsche911.mov",
            posterUrl: 'porsche.png'
        }
    ]
});</code></pre>
 * @xtype video
 */
Ext.Video = Ext.extend(Ext.Media, {
    /**
     * @constructor
     * @param {Object} config
     * Create a new Video Panel.
     */

    /**
     * @cfg {String} url
     * Location of the video to play. This should be in H.264 format and in a
     * .mov file format.
     */

    /**
     * @cfg {String} posterUrl
     * Location of a poster image to be shown before showing the video.
     */
    posterUrl: '',
    
    // private
    componentCls: 'x-video',

    afterRender : function() {
        Ext.Video.superclass.afterRender.call(this);
        if (this.posterUrl) {
            this.media.hide();
            this.ghost = this.el.createChild({
                cls: 'x-video-ghost',
                style: 'width: 100%; height: 100%; background: #000 url(' + this.posterUrl + ') center center no-repeat; -webkit-background-size: 100% auto;'
            });
            this.ghost.on('tap', this.onGhostTap, this, {single: true});
        }
    },
    
    onGhostTap: function(){
        this.media.show();
        this.ghost.hide();
        this.play();
    },
    
    // private
    getConfiguration: function(){
        return {
            tag: 'video',
            width: '100%',
            height: '100%'
        };
    }    
});

Ext.reg('video', Ext.Video);
/**
 * @class Ext.Audio
 * @extends Ext.Media
 *
 * <p>Provides a simple container for HTML5 Audio.</p>
 * <p><i>Recommended types: Uncompressed WAV and AIF audio, MP3 audio, and AAC-LC or HE-AAC audio</i></p>
 * 
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #url}</li>
 *   <li>{@link #autoPause}</li>
 *   <li>{@link #autoResume}</li>
 * </ul>
 * 
 * <h2>Useful Methods</h2>
 * <ul class="list">
 *   <li>{@link #pause}</li>
 *   <li>{@link #play}</li>
 *   <li>{@link #toggle}</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Audio/screenshot.png Ext.Audio screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
var pnl = new Ext.Panel({
    fullscreen: true,
    items: [
        {
            xtype: 'audio',
            url  : "who-goingmobile.mp3"
        }
    ]
});</code></pre>
 * @xtype audio
 */
Ext.Audio = Ext.extend(Ext.Media, {
    /**
     * @constructor
     * @param {Object} config
     * Create a new Audio container.
     */

    /**
     * @cfg {String} url
     * Location of the audio to play.
     */

    componentCls: 'x-audio',
    
    // @private
    onActivate: function(){
        Ext.Audio.superclass.onActivate.call(this);
        if (Ext.is.Phone) {
            this.media.show();
        }    
    },
    
    // @private
    onDeactivate: function(){
        Ext.Audio.superclass.onDeactivate.call(this);
        if (Ext.is.Phone) {
            this.media.hide();
        }
    },
    
    // @private
    getConfiguration: function(){
        var hidden = !this.enableControls;
        if (!Ext.supports.AudioTag) {
            return {
                tag: 'embed',
                type: 'audio/mpeg',
                target: 'myself',
                controls: 'true',
                hidden: hidden
            };
        } else {
            return {
                tag: 'audio',
                hidden: hidden
            };
        }    
    }
});

Ext.reg('audio', Ext.Audio);
/**
 * @class Ext.MessageBox
 * @extends Ext.Sheet
 * 
 * <p>Utility class for generating different styles of message boxes. The framework provides a global singleton {@link Ext.Msg} for common usage.<p/>
 * <p>Note that the MessageBox is asynchronous.  Unlike a regular JavaScript <code>alert</code> (which will halt
 * browser execution), showing a MessageBox will not cause the code to stop.  For this reason, if you have code
 * that should only run <em>after</em> some user feedback from the MessageBox, you must use a callback function
 * (see the <code>fn</code> configuration option parameter for the {@link #show show} method for more details).</p>
 * 
 * <h2>Screenshot</h2>
 *
 * {@img Ext.MessageBox/screenshot.png Ext.MessageBox screenshot}
 * 
 * <h2>Example usage:</h2>
 * <pre><code>
// Basic alert:
Ext.Msg.alert('Title', 'The quick brown fox jumped over the lazy dog.', Ext.emptyFn);

// Prompt for user data and process the result using a callback:
Ext.Msg.prompt('Name', 'Please enter your name:', function(text) {
    // process text value and close...
});

// Confirmation alert
Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", Ext.emptyFn);
 * </code></pre>
 * @xtype messagebox
 */
Ext.MessageBox = Ext.extend(Ext.Sheet, {
    // Inherited from Ext.Sheet
    centered: true,

    // Inherited
    renderHidden: true,

    // Inherited
    ui: 'dark',

    /**
     * @cfg {String} componentCls
     * Component's Base CSS class
     */
    componentCls: 'x-msgbox',

    /**
     * @cfg {String/Mixed} enterAnimation effect when the message box is being displayed (defaults to 'pop')
     */
    enterAnimation: 'pop',

    /**
     * @cfg {String/Mixed} exitAnimation effect when the message box is being hidden (defaults to 'pop')
     */
    exitAnimation: 'pop',

    autoHeight      : true,

    /**
     * The default height in pixels of the message box's multiline textarea if displayed (defaults to 75)
     * @cfg {Number} defaultTextHeight
     */
    defaultTextHeight : 75,

    constructor : function(config) {

        config = config || {};

        var ui = config.ui || this.ui || '',
            baseCls = config.componentCls || this.componentCls;

        delete config.html;

        this.titleBar = Ext.create({
            xtype : 'toolbar',
            ui    : ui,
            dock  : 'top',
            cls   : baseCls + '-title',
            title : '&#160;'
        });

        this.buttonBar = Ext.create({
            xtype : 'toolbar',
            ui    : ui,
            dock  : 'bottom',
            layout: { pack: 'center' },
            cls   : baseCls + '-buttons'
        });

        config = Ext.apply({
                    ui  : ui,
            dockedItems : [this.titleBar, this.buttonBar],
        renderSelectors : {
                           body : '.' + baseCls + '-body',
                         iconEl : '.' + baseCls + '-icon',
                   msgContentEl : '.' + baseCls + '-content',
                          msgEl : '.' + baseCls + '-text',
                       inputsEl : '.' + baseCls + '-inputs',
                        inputEl : '.' + baseCls + '-input-single',
                    multiLineEl : '.' + baseCls + '-input-textarea'
           }
         }, config || {});

        Ext.MessageBox.superclass.constructor.call(this, config);
    },

    renderTpl: [
        '<div class="{componentCls}-body"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
            '<div class="{componentCls}-icon x-hidden-display"></div>',
            '<div class="{componentCls}-content">',
                '<div class="{componentCls}-text"></div>',
                '<div class="{componentCls}-inputs x-hidden-display">',
                    '<input type="text" class="{componentCls}-input {componentCls}-input-single" />',
                    '<textarea class="{componentCls}-input {componentCls}-input-textarea"></textarea>',
                '</div>',
            '</div>',
        '</div>'
    ],

    // @private
    onClick : function(button) {
        if (button) {
            var config = button.config || {};

            if (typeof config.fn == 'function') {
                config.fn.call(
                    config.scope || null,
                    button.itemId || button.text,
                    config.input ? config.input.dom.value : null,
                    config
                );
            }

            if (config.cls) {
                    this.el.removeCls(config.cls);
                }

            if (config.input) {
                config.input.dom.blur();
            }
        }

        this.hide();
    },

    /**
     * Displays a new message box, or reinitializes an existing message box, based on the config options
     * passed in. All display functions (e.g. prompt, alert, etc.) on MessageBox call this function internally,
     * although those calls are basic shortcuts and do not support all of the config options allowed here.
     * @param {Object} config The following config options are supported: <ul>
     * <li><b>buttons</b> : Object/Array<div class="sub-desc">A button config object or Array of the same(e.g., Ext.MessageBox.OKCANCEL or {text:'Foo',
     * itemId:'cancel'}), or false to not show any buttons (defaults to false)</div></li>
     * <li><b>cls</b> : String<div class="sub-desc">A custom CSS class to apply to the message box's container element</div></li>
     * <li><b>defaultTextHeight</b> : Number<div class="sub-desc">The default height in pixels of the message box's multiline textarea
     * if displayed (defaults to 75)</div></li>
     * <li><b>fn</b> : Function<div class="sub-desc">A callback function which is called when the dialog is dismissed
     * by clicking on the configured buttons.
     * <p>Parameters passed:<ul>
     * <li><b>buttonId</b> : String<div class="sub-desc">The itemId of the button pressed, one of:<div class="sub-desc"><ul>
     * <li><tt>ok</tt></li>
     * <li><tt>yes</tt></li>
     * <li><tt>no</tt></li>
     * <li><tt>cancel</tt></li>
     * </ul></div></div></li>
     * <li><b>value</b> : String<div class="sub-desc">Value of the input field if either <tt><a href="#show-option-prompt" ext:member="show-option-prompt" ext:cls="Ext.MessageBox">prompt</a></tt>
     * or <tt><a href="#show-option-multiLine" ext:member="show-option-multiLine" ext:cls="Ext.MessageBox">multiLine</a></tt> is true</div></li>
     * <li><b>opt</b> : Object<div class="sub-desc">The config object passed to show.</div></li>
     * </ul></p></div></li>
     * <li><b>width</b> : Number<div class="sub-desc">A fixed width for the MessageBox (defaults to 'auto')</div></li>
     * <li><b>height</b> : Number<div class="sub-desc">A fixed height for the MessageBox (defaults to 'auto')</div></li>
     * <li><b>scope</b> : Object<div class="sub-desc">The scope of the callback function</div></li>
     * <li><b>icon</b> : String<div class="sub-desc">A CSS class that provides a background image to be used as the body icon for the
     * dialog (e.g. Ext.MessageBox.WARNING or 'custom-class') (defaults to '')</div></li>
     * <li><b>modal</b> : Boolean<div class="sub-desc">False to allow user interaction with the page while the message box is
     * displayed (defaults to true)</div></li>
     * <li><b>msg</b> : String<div class="sub-desc">A string that will replace the existing message box body text (defaults to the
     * XHTML-compliant non-breaking space character '&amp;#160;')</div></li>
     * <li><a id="show-option-multiline"></a><b>multiLine</b> : Boolean<div class="sub-desc">
     * True to prompt the user to enter multi-line text (defaults to false)</div></li>
     * <li><a id="show-option-prompt"></a><b>prompt</b> : Boolean<div class="sub-desc">True to prompt the user to enter single-line text (defaults to false)</div></li>
     * <li><b>title</b> : String<div class="sub-desc">The title text</div></li>
     * <li><b>value</b> : String<div class="sub-desc">The string value to set into the active textbox element if displayed</div></li>
     * </ul>
     * Example usage:
     * <pre><code>
Ext.Msg.show({
   title: 'Address',
   msg: 'Please enter your address:',
   width: 300,
   buttons: Ext.MessageBox.OKCANCEL,
   multiLine: true,
   prompt : { maxlength : 180, autocapitalize : true },
   fn: saveAddress,
   icon: Ext.MessageBox.INFO
});
</code></pre>
     * @return {Ext.MessageBox} this
     */
    show : function(config) {
        var attrib,
            attrName,
            attribs = {
                autocomplete : 'off',
                autocapitalize : 'off',
                autocorrect : 'off',
                maxlength : 0,
                autofocus : true,
                placeholder : '',
                type : 'text'
            },
            assert = /true|on/i;

        this.rendered || this.render(document.body);

        config = Ext.applyIf(
            config || {}, {
                multiLine : false,
                prompt  : false,
                value   : '',
                modal   : true
            }
        );

        if (config.title) {
            this.titleBar.setTitle(config.title);
            this.titleBar.show();
        } else {
            this.titleBar.hide();
        }

        if (this.inputsEl && (config.multiLine || config.prompt)) {
            this.inputsEl.show();

            if (this.multiLineEl && config.multiLine) {
                this.inputEl && this.inputEl.hide();
                this.multiLineEl.show().setHeight(Ext.isNumber(config.multiLine) ? parseFloat(config.multiLine) : this.defaultTextHeight);
                config.input = this.multiLineEl;
            } else if (this.inputEl) {
                this.inputEl.show();
                this.multiLineEl && this.multiLineEl.hide();
                config.input = this.inputEl;
            }

            // Assert/default HTML5 input attributes
            if (Ext.isObject(config.prompt)) {
                Ext.apply(attribs, config.prompt);
            }

            for (attrName in attribs) {
                if (attribs.hasOwnProperty(attrName)) {
                    attrib = attribs[attrName];
                    config.input.dom.setAttribute(
                        attrName.toLowerCase(),
                        /^auto/i.test(attrName) ? (assert.test(attrib+'') ? 'on' : 'off' ) : attrib
                    );
                }
            }

        } else {
            this.inputsEl && this.inputsEl.hide();
        }

        this.setIcon(config.icon || '', false);
        this.updateText(config.msg, false);

        if (config.cls) {
            this.el.addCls(config.cls);
        }

        this.modal = !!config.modal;

        var bbar = this.buttonBar,
            bs = [];

        bbar.removeAll();

        Ext.each([].concat(config.buttons || Ext.MessageBox.OK), function(button) {
            if (button) {
                bs.push(
                    Ext.applyIf({
                        config  : config,
                        scope   : this,
                        handler : this.onClick
                    }, button)
                );
            }
        }, this);

        bbar.add(bs);

        if (bbar.rendered) {
            bbar.doLayout();
        }

        Ext.MessageBox.superclass.show.call(this, config.animate);

        if (config.input) {
            config.input.dom.value = config.value || '';
            // For browsers without 'autofocus' attribute support
            if (assert.test(attribs.autofocus+'') && !('autofocus' in config.input.dom)) {
                config.input.dom.focus();
            }
        }

        return this;
    },

     // @private
    onOrientationChange : function() {
        this.doComponentLayout();

        Ext.MessageBox.superclass.onOrientationChange.apply(this, arguments);
    },

    // @private
    adjustScale : function(){
        Ext.apply(this,{
            maxWidth : window.innerWidth,
            maxHeight : window.innerHeight,
            minWidth : window.innerWidth * .5,
            minHeight : window.innerHeight * .5
        });
    },

    // @private
    doComponentLayout : function() {
        this.adjustScale();

        return Ext.MessageBox.superclass.doComponentLayout.apply(this, arguments);
    },

    /**
     * Displays a standard read-only message box with an OK button (comparable to the basic JavaScript alert prompt).
     * If a callback function is passed it will be called after the user clicks the button, and the
     * itemId of the button that was clicked will be passed as the only parameter to the callback
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {Function} fn (optional) The callback function invoked after the message box is closed
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the callback is executed. Defaults to the browser wnidow.
     * @return {Ext.MessageBox} this
     */
    alert : function(title, msg, fn, scope) {
        return this.show({
            title : title,
            msg   : msg,
            buttons: Ext.MessageBox.OK,
            fn    : fn,
            scope : scope,
            icon  : Ext.MessageBox.INFO
        });
    },

    /**
     * Displays a confirmation message box with Yes and No buttons (comparable to JavaScript's confirm).
     * If a callback function is passed it will be called after the user clicks either button,
     * and the id of the button that was clicked will be passed as the only parameter to the callback
     * (could also be the top-right close button).
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {Function} fn (optional) The callback function invoked when user taps on the OK/Cancel button.
     * The button is passed as the first argument.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the callback is executed. Defaults to the browser wnidow.
     * @return {Ext.MessageBox} this
     */
    confirm : function(title, msg, fn, scope) {
        return this.show({
            title : title,
            msg : msg,
            buttons: Ext.MessageBox.YESNO,
            fn: function(button) {
                fn.call(scope, button);
            },
            scope : scope,
            icon: Ext.MessageBox.QUESTION
        });
     },

    /**
     * Displays a message box with OK and Cancel buttons prompting the user to enter some text (comparable to JavaScript's prompt).
     * The prompt can be a single-line or multi-line textbox.  If a callback function is passed it will be called after the user
     * clicks either button, and the id of the button that was clicked (could also be the top-right
     * close button) and the text that was entered will be passed as the two parameters to the callback.
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {Function} fn (optional) The callback function invoked when the user taps on the OK/Cancel button,
     * the button is passed as the first argument, the entered string value is passed as the second argument
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the callback is executed. Defaults to the browser wnidow.
     * @param {Boolean/Number} multiLine (optional) True to create a multiline textbox using the defaultTextHeight
     * property, or the height in pixels to create the textbox (defaults to false / single-line)
     * @param {String} value (optional) Default value of the text input element (defaults to '')
     * @param {Object} promptConfig (optional) <div class="sub-desc">(optional) A hash collection of input attribute values.<div class="sub-desc">Specified values may include:<ul>
     * <li><tt>focus</tt> : Boolean <div class="sub-desc"><tt>true</tt> to assert initial input focus (defaults to false)</div></li>
     * <li><tt>placeholder</tt> : String <div class="sub-desc">String value rendered when the input field is empty (defaults to empty string)</div></li>
     * <li><tt>autocapitalize</tt> : String/Boolean <div class="sub-desc"><tt>true/on</tt> to capitalize the first letter of each word in the input value (defaults to 'off')</div></li>
     * <li><tt>autocorrect</tt> : String/Boolean <div class="sub-desc"><tt>true/on</tt> to enable spell-checking/autocorrect features if supported by the browser (defaults to 'off')</div></li>
     * <li><tt>autocomplete</tt> : String/Boolean <div class="sub-desc"><tt>true/on</tt> to enable autoCompletion of supplied text input values if supported by the browser (defaults to 'off')</div></li>
     * <li><tt>maxlength</tt> : Number <div class="sub-desc">Maximum number of characters allowed in the input if supported by the browser (defaults to 0)</div></li>
     * <li><tt>type</tt> : String <div class="sub-desc">The type of input field. Possible values (if supported by the browser) may include (text, search, number, range, color, tel, url, email, date, month, week, time, datetime) (defaults to 'text')</div></li>
     * </ul></div></div>
     * Example usage:
     * <pre><code>
    Ext.Msg.prompt(
        'Welcome!',
        'What\'s your name going to be today?',
        function(value){
            console.log(value)
        },
        null,
        false,
        null,
        { autocapitalize : true, placeholder : 'First-name please...' }
    );
     * </code></pre>
     * @return {Ext.MessageBox} this
     */
    prompt : function(title, msg, fn, scope, multiLine, value, promptConfig) {
        return this.show({
            title : title,
            msg : msg,
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function(button, inputValue) {
                fn.call(scope, button, inputValue);
            },
            scope : scope,
            icon  : Ext.MessageBox.QUESTION,
            prompt: promptConfig || true,
            multiLine: multiLine,
            value: value
        });
    },

    /**
     * Updates the message box body text
     * @param {String} text (optional) Replaces the message box element's innerHTML with the specified string (defaults to
     * the XHTML-compliant non-breaking space character '&amp;#160;')
     * @return {Ext.MessageBox} this
     */
    updateText : function(text, doLayout) {
        if(this.msgEl) {
            this.msgEl.update(text ? String(text) : '&#160;');
            if(doLayout !== false) {
                this.doComponentLayout();
            }
        }
        return this;
    },

    /**
     * Adds the specified icon to the dialog.  By default, the class 'x-msgbox-icon' is applied for default
     * styling, and the class passed in is expected to supply the background image url. Pass in empty string ('')
     * to clear any existing icon. This method must be called before the MessageBox is shown.
     * The following built-in icon classes are supported, but you can also pass in a custom class name:
     * <pre>
Ext.MessageBox.INFO
Ext.MessageBox.WARNING
Ext.MessageBox.QUESTION
Ext.MessageBox.ERROR
     *</pre>
     * @param {String} icon A CSS classname specifying the icon's background image url, or empty string to clear the icon
     * @return {Ext.MessageBox} this
     */
    setIcon : function(icon, doLayout) {
        if (icon) {
            this.iconEl.show();
            this.iconEl.replaceCls(this.iconCls, icon);
        } else {
            this.iconEl.replaceCls(this.iconCls, 'x-hidden-display');
        }

        if (doLayout !== false) {
            this.doComponentLayout();
        }

        this.iconCls = icon;
        return this;
    }
});

(function(){
    var B = Ext.MessageBox;

    Ext.apply(B, {
        OK     : {text : 'OK',     itemId : 'ok',  ui : 'action' },
        CANCEL : {text : 'Cancel', itemId : 'cancel'},
        YES    : {text : 'Yes',    itemId : 'yes', ui : 'action' },
        NO     : {text : 'No',     itemId : 'no'},
        // Add additional(localized) button configs here

        // ICON CSS Constants
        INFO     : 'x-msgbox-info',
        WARNING  : 'x-msgbox-warning',
        QUESTION : 'x-msgbox-question',
        ERROR    : 'x-msgbox-error'
    });

    Ext.apply(B, {
        OKCANCEL    : [B.CANCEL, B.OK],
        YESNOCANCEL : [B.CANCEL, B.NO, B.YES],
        YESNO       : [B.NO, B.YES]
        // Add additional button collections here
    });

})();

Ext.reg('messagebox', Ext.MessageBox);

//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('msgbox', Ext.MessageBox);

/**
 * @class Ext.Msg
 * 
 * <p>A global shared singleton instance of the {@link Ext.MessageBox} class. See {@link Ext.MessageBox} for documentation.</p>
 * 
 * @singleton
 */
Ext.Msg = new Ext.MessageBox();
/**
 * @class Ext.form.FormPanel
 * @extends Ext.Panel
 * <p>Simple form panel which enables easy getting and setting of field values. Can load model instances. Example usage:</p>
<pre><code>
var form = new Ext.form.FormPanel({
    items: [
        {
            xtype: 'textfield',
            name : 'first',
            label: 'First name'
        },
        {
            xtype: 'textfield',
            name : 'last',
            label: 'Last name'
        },
        {
            xtype: 'numberfield',
            name : 'age',
            label: 'Age'
        },
        {
            xtype: 'urlfield',
            name : 'url',
            label: 'Website'
        }
    ]
});
</code></pre>
 * <p>Loading model instances:</p>
<pre><code>
Ext.regModel('User', {
    fields: [
        {name: 'first', type: 'string'},
        {name: 'last',  type: 'string'},
        {name: 'age',   type: 'int'},
        {name: 'url',   type: 'string'}
    ]
});

var user = Ext.ModelMgr.create({
    first: 'Ed',
    last : 'Spencer',
    age  : 24,
    url  : 'http://extjs.com'
}, 'User');

form.load(user);
</code></pre>
 * @xtype formpanel
 * @xtype form
 */
Ext.form.FormPanel = Ext.extend(Ext.Panel, {
    /**
     * @cfg {Boolean} standardSubmit
     * Wether or not we want to perform a standard form submit. Defaults to false
     */
    standardSubmit: false,

    componentCls: 'x-form',
    
    /**
     * @cfg {String} url
     * The default Url for submit actions
     */
    url: undefined,
    
    /**
     * @cfg {Object} baseParams
     * Optional hash of params to be sent (when standardSubmit configuration is false) on every submit.
     */
    baseParams : undefined,
    
    /**
     * @cfg {Object} waitTpl
     * The defined {@link #waitMsg} template.  Used for precise control over the masking agent used
     * to mask the FormPanel (or other Element) during form Ajax/submission actions. For more options, see
     * {@link #showMask} method.
     */
    waitTpl: new Ext.XTemplate(
        '<div class="{cls}">{message}&hellip;</div>'
    ),
    
    /**
     * @cfg {Object} submitOnAction
     * When this is set to true, the form will automatically submit itself whenever the 'action'
     * event fires on a field in this form. The action event usually fires whenever you press
     * go or enter inside a textfield.
     */
    submitOnAction : true,    

    getElConfig: function() {
        return Ext.apply(Ext.form.FormPanel.superclass.getElConfig.call(this), {
            tag: 'form'
        });
    },
    
    // @private
    initComponent : function() {
        this.addEvents(
           /**
             * @event submit
             * Fires upon successful (Ajax-based) form submission
             * @param {Ext.FormPanel} this This FormPanel
             * @param {Object} result The result object as returned by the server
             */
            'submit', 
           /**
             * @event beforesubmit
             * Fires immediately preceding any Form submit action.
             * Implementations may adjust submitted form values or options prior to execution.
             * A return value of <tt>false</tt> from this listener will abort the submission 
             * attempt (regardless of standardSubmit configuration) 
             * @param {Ext.FormPanel} this This FormPanel
             * @param {Object} values A hash collection of the qualified form values about to be submitted
             * @param {Object} options Submission options hash (only available when standardSubmit is false) 
             */
             'beforesubmit', 
           /**
             * @event exception
             * Fires when either the Ajax HTTP request reports a failure OR the server returns a success:false
             * response in the result payload.
             * @param {Ext.FormPanel} this This FormPanel
             * @param {Object} result Either a failed Ext.data.Connection request object or a failed (logical) server
             * response payload.
             */
             'exception'
        );

        Ext.form.FormPanel.superclass.initComponent.call(this);
        
        this.on('action', this.onFieldAction, this);
    },
    
    // @private
    afterRender : function() {
        Ext.form.FormPanel.superclass.afterRender.call(this);
        this.el.on('submit', this.onSubmit, this);
    },

    // @private
    onSubmit : function(e, t) {
        if (!this.standardSubmit || this.fireEvent('beforesubmit', this, this.getValues(true)) === false) {
            if (e) {
                e.stopEvent();
            }       
        }
    },
    
    // @private
    onFieldAction : function(field) {
        if (this.submitOnAction) {
            field.blur();
            this.submit();
        }
    },
    
    /**
     * Performs a Ajax-based submission of form values (if standardSubmit is false) or otherwise 
     * executes a standard HTML Form submit action.
     * @param {Object} options Unless otherwise noted, options may include the following:
     * <ul>
     * <li><b>url</b> : String
     * <div class="sub-desc">
     * The url for the action (defaults to the form's {@link #url url}.)
     * </div></li>
     *
     * <li><b>method</b> : String
     * <div class="sub-desc">
     * The form method to use (defaults to the form's method, or POST if not defined)
     * </div></li>
     *
     * <li><b>params</b> : String/Object
     * <div class="sub-desc">
     * The params to pass
     * (defaults to the FormPanel's baseParams, or none if not defined)
     * Parameters are encoded as standard HTTP parameters using {@link Ext#urlEncode}.
     * </div></li>
     *
     * <li><b>headers</b> : Object
     * <div class="sub-desc">
     * Request headers to set for the action
     * (defaults to the form's default headers)
     * </div></li>
     * 
     * <li><b>autoAbort</b> : Boolean
     * <div class="sub-desc">
     * <tt>true</tt> to abort any pending Ajax request prior to submission (defaults to false)
     * Note: Has no effect when standardSubmit is enabled.
     * </div></li>
     * 
     * <li><b>submitDisabled</b> : Boolean
     * <div class="sub-desc">
     * <tt>true</tt> to submit all fields regardless of disabled state (defaults to false)
     * Note: Has no effect when standardSubmit is enabled.
     * </div></li>
     *
     * <li><b>waitMsg</b> : String/Config
     * <div class="sub-desc">
     * If specified, the value is applied to the {@link #waitTpl} if defined, and rendered to the
     * {@link #waitMsgTarget} prior to a Form submit action.
     * </div></li>
     * 
     * <li><b>success</b> : Function
     * <div class="sub-desc">
     * The callback that will be invoked after a successful response. A response is successful if
     * a response is received from the server and is a JSON object where the success property is set
     * to true, {"success": true} 
     * 
     *  The function is passed the following parameters:
     * <ul>
     * <li>form : Ext.FormPanel The form that requested the action</li>
     * <li>result : The result object returned by the server as a result of the submit request.</li>
     * </ul>
     * </div></li>
     *
     * <li><b>failure</b> : Function
     * <div class="sub-desc">
     * The callback that will be invoked after a
     * failed transaction attempt. The function is passed the following parameters:
     * <ul>
     * <li>form : The Ext.FormPanel that requested the submit.</li>
     * <li>result : The failed response or result object returned by the server which performed the operation.</li>
     * </ul>
     * </div></li>
     * 
     * <li><b>scope</b> : Object
     * <div class="sub-desc">
     * The scope in which to call the callback functions (The this reference for the callback functions).
     * </div></li>
     * </ul>
     *
     * @return {Ext.data.Connection} request Object
     */

    submit: function(options) {
        var form = this.el.dom || {},
            formValues

            options = Ext.apply({
               url : this.url || form.action,
               submitDisabled : false,
               method : form.method || 'post',
               autoAbort : false,
               params : null,
               waitMsg : null,
               headers : null,
               success : null,
               failure : null
            }, options || {});

            formValues = this.getValues(this.standardSubmit || !options.submitDisabled);
        
        if (this.standardSubmit) {
            if (form) {
                if (options.url && Ext.isEmpty(form.action)) {
                    form.action = options.url;
                }

                form.method = (options.method || form.method).toLowerCase();

                if (this.fireEvent('beforesubmit', this, formValues, options) !== false) {
                    form.submit();
                }
            }
            return null;
        }
        
        if (this.fireEvent('beforesubmit', this, formValues, options ) !== false) {
            if (options.waitMsg) {
                this.showMask(options.waitMsg);
            }
            
            return Ext.Ajax.request({
                url     : options.url,
                method  : options.method,
                rawData : Ext.urlEncode(Ext.apply(
                    Ext.apply({}, this.baseParams || {}),
                    options.params || {},
                    formValues
                )),
                autoAbort : options.autoAbort,
                headers  : Ext.apply(
                   {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    options.headers || {}),
                scope    : this,
                callback : function(callbackOptions, success, response) {
                    var responseText = response.responseText;
                    this.hideMask();
                        
                    if (success) {

                        response = Ext.decode(responseText);
                        success = !!response.success;

                        if (success) {
                            if (Ext.isFunction(options.success)) {
                                options.success.call(options.scope || this, this, response, responseText);
                            }

                            this.fireEvent('submit', this, response);
                            return;
                        }
                    }

                    if (Ext.isFunction(options.failure)) {
                        options.failure.call(options.scope || this, this, response, responseText);
                    }
                    
                    this.fireEvent('exception', this, response);
                }
            });
        }
    },

    /**
     * Loads matching fields from a model instance into this form
     * @param {Ext.data.Model} instance The model instance
     * @return {Ext.form.FormPanel} this
     */
    loadRecord: function(instance) {
        if (instance && instance.data) {
            this.setValues(instance.data);
            
            /**
             * The Model instance currently loaded into this form (if any). Read only
             * @property record
             * @type Ext.data.Model
             */
            this.record = instance;
        }
        
        return this;
    },
    
    /**
     * @private
     * Backwards-compatibility for a poorly-named function
     */
    loadModel: function() {
        return this.loadRecord.apply(this, arguments);
    },
    
    /**
     * Returns the Model instance currently loaded into this form (if any)
     * @return {Ext.data.Model} The Model instance
     */
    getRecord: function() {
        return this.record;
    },
    
    /**
     * Updates a model instance with the current values of this form
     * @param {Ext.data.Model} instance The model instance
     * @param {Boolean} enabled <tt>true</tt> to update the Model with values from enabled fields only
     * @return {Ext.form.FormPanel} this
     */
    updateRecord: function(instance, enabled) {
        var fields, values, name;
        
        if(instance && (fields = instance.fields)){
            values = this.getValues(enabled);
            for (name in values) {
                if(values.hasOwnProperty(name) && fields.containsKey(name)){
                   instance.set(name, values[name]);     
                }
            }
        }
        return this;
    },
    
    //<deprecated since="0.99">
    updateModel: function() {
        console.warn("FormPanel: updateModel has been deprecated. Please use updateRecord.");
        this.updateRecord.apply(this, arguments);
    },
    //</deprecated>

    /**
     * Sets the values of form fields in bulk. Example usage:
<pre><code>
myForm.setValues({
    name: 'Ed',
    crazy: true,
    username: 'edspencer'
});
</code></pre>
    If there groups of checkbox fields with the same name, pass their values in an array. For example:

<pre><code>
myForm.setValues({
    name: 'Jacky',
    crazy: false,
    hobbies: [
        'reading',
        'cooking',
        'gaming'
    ]
});
</code></pre>

     * @param {Object} values field name => value mapping object
     * @return {Ext.form.FormPanel} this
     */
    setValues: function(values) {
         var fields = this.getFields(),
             name,
             field,
             value;
             
        values = values || {};
        
        for (name in values) {
            if (values.hasOwnProperty(name)) {
                field = fields[name];
                value = values[name];
                if (field) {
                    if (Ext.isArray(field)) {
                        field.forEach(function(field){
                            if (Ext.isArray(values[name])) {
                                field.setChecked((value.indexOf(field.getValue()) != -1));
                            } else {
                                field.setChecked((value == field.getValue()));
                            }
                        });
                    } else {  
                        if (field.setChecked) {
                            field.setChecked(value);
                        } else {
                            field.setValue(value);
                        }
                    }
                }
            }       
        }
        
        return this;
    },

    /**
     * Returns an object containing the value of each field in the form, keyed to the field's name. 
     * For groups of checkbox fields with the same name, it will be arrays of values. For examples:

<pre><code>
     {
         name: "Jacky Nguyen", // From a TextField
         favorites: [
            'pizza',
            'noodle',
            'cake'
         ]
     }
</code></pre>

     * @param {Boolean} enabled <tt>true</tt> to return only enabled fields
     * @return {Object} Object mapping field name to its value
     */
    getValues: function(enabled) {
        var fields = this.getFields(),
            field,
            values = {},
            name;

        for (name in fields) {
            if (fields.hasOwnProperty(name)) {
                if (Ext.isArray(fields[name])) {
                    values[name] = [];

                    fields[name].forEach(function(field) {
                        if (field.isChecked() && !(enabled && field.disabled)) {
                            if (field instanceof Ext.form.Radio) {
                                values[name] = field.getValue();
                            } else {
                                values[name].push(field.getValue());
                            }
                        }
                    });
                } else {
                    field = fields[name];
                    
                    if (!(enabled && field.disabled)) {
                        if (field instanceof Ext.form.Checkbox) {
                            values[name] = (field.isChecked()) ? field.getValue() : null;
                        } else {
                            values[name] = field.getValue();
                        }
                    }
                }
            }
        }

        return values;
    },

    /**
     * Resets all fields in the form back to their original values
     * @return {Ext.form.FormPanel} this This form
     */
    reset: function() {
        this.getFieldsAsArray().forEach(function(field) {
            field.reset();
        });

        return this;
    },

    /**
     * A convenient method to enable all fields in this forms
     * @return {Ext.form.FormPanel} this This form
     */
    enable: function() {
        this.getFieldsAsArray().forEach(function(field) {
            field.enable();
        });

        return this;
    },

    /**
     * A convenient method to disable all fields in this forms
     * @return {Ext.form.FormPanel} this This form
     */
    disable: function() {
        this.getFieldsAsArray().forEach(function(field) {
            field.disable();
        });

        return this;
    },

    getFieldsAsArray: function() {
        var fields = [];

        var getFieldsFrom = function(item) {
            if (item.isField) {
                fields.push(item);
            }

            if (item.isContainer) {
                item.items.each(getFieldsFrom);
            }
        };

        this.items.each(getFieldsFrom);

        return fields;
    },

    /**
     * @private
     * Returns all {@link Ext.Field field} instances inside this form
     * @param byName return only fields that match the given name, otherwise return all fields.
     * @return {Object/Array} All field instances, mapped by field name; or an array if byName is passed
     */
    getFields: function(byName) {
        var fields = {},
            itemName;

        var getFieldsFrom = function(item) {
            if (item.isField) {
                itemName = item.getName();

                if ((byName && itemName == byName) || typeof byName == 'undefined') {
                    if (fields.hasOwnProperty(itemName)) {
                        if (!Ext.isArray(fields[itemName])) {
                            fields[itemName] = [fields[itemName]];
                        }

                        fields[itemName].push(item);
                    } else {
                        fields[itemName] = item;
                    }
                }

            }

            if (item.isContainer) {
                item.items.each(getFieldsFrom);
            }
        };

        this.items.each(getFieldsFrom);
        
        return (byName) ? (fields[byName] || []) : fields;
    },

    getFieldsFromItem: function() {

    },
    /**
     * Shows a generic/custom mask over a designated Element.
     * @param {String/Object} cfg Either a string message or a configuration object supporting
     * the following options:
<pre><code>
    {        
           message : 'Please Wait',
       transparent : false,
           target  : Ext.getBody(),  //optional target Element
               cls : 'form-mask',
    customImageUrl : 'trident.jpg'
    }
</code></pre>This object is passed to the {@link #waitTpl} for use with a custom masking implementation.
     * @param {String/Element} target The target Element instance or Element id to use
     * as the masking agent for the operation (defaults the container Element of the component)
     * @return {Ext.form.FormPanel} this
     */
    showMask : function(cfg, target) {
        cfg = Ext.isString(cfg) ? {message : cfg} : cfg; 
        
        if (cfg && this.waitTpl) {
            this.maskTarget = target = Ext.get(target || cfg.target) || this.el;
            target && target.mask(this.waitTpl.apply(cfg));
        }
        return this;
    },
    
    /**
     * Hides a previously shown wait mask (See {@link #showMask})
     * @return {Ext.form.FormPanel} this
     */
    hideMask : function(){
        if(this.maskTarget){
            this.maskTarget.unmask();
            delete this.maskTarget;
        }
        return this;
    }
});

/**
 * (Shortcut to {@link #loadRecord} method) Loads matching fields from a model instance into this form
 * @param {Ext.data.Model} instance The model instance
 * @return {Ext.form.FormPanel} this
 */
Ext.form.FormPanel.prototype.load = Ext.form.FormPanel.prototype.loadModel; 

Ext.reg('formpanel', Ext.form.FormPanel);

//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('form', Ext.form.FormPanel);

/**
 * @class Ext.form.FieldSet
 * @extends Ext.Container
 * <p>Simple FieldSet, can contain fields as items. FieldSets do not add any behavior, other than an optional title, and
 * are just used to group similar fields together. Example usage (within a form):</p>
<pre><code>
new Ext.form.FormPanel({
    items: [
        {
            xtype: 'fieldset',
            title: 'About Me',
            items: [
                {
                    xtype: 'textfield',
                    name : 'firstName',
                    label: 'First Name'
                },
                {
                    xtype: 'textfield',
                    name : 'lastName',
                    label: 'Last Name'
                }
            ]
        }
    ]
});
</code></pre>
 * @xtype fieldset
 */
Ext.form.FieldSet = Ext.extend(Ext.Panel, {
    componentCls: 'x-form-fieldset',

    // @private
    initComponent : function() {
        this.componentLayout = this.getLayout();
        Ext.form.FieldSet.superclass.initComponent.call(this);
    },
    

    /**
     * @cfg {String} title Optional fieldset title, rendered just above the grouped fields
     */

    /**
     * @cfg {String} instructions Optional fieldset instructions, rendered just below the grouped fields
     */

    // @private
    afterLayout : function(layout) {
        Ext.form.FieldSet.superclass.afterLayout.call(this, layout);
        
        if (this.title && !this.titleEl) {
            this.setTitle(this.title);
        } else if (this.titleEl) {
            this.el.insertFirst(this.titleEl);
        }

        if (this.instructions && !this.instructionsEl) {
            this.setInstructions(this.instructions);
        } else if (this.instructionsEl) {
            this.el.appendChild(this.instructionsEl);
        }
    },
    
    /**
     * Sets the title of the current fieldset.
     * @param {String} title The new title
     * @return {Ext.form.FieldSet} this 
     */
    setTitle: function(title){
        if (this.rendered) {
            if (!this.titleEl) {
                this.titleEl = this.el.insertFirst({
                    cls: this.componentCls + '-title'
                });
            }
            this.titleEl.setHTML(title);
        } else {
            this.title = title;
        }
        return this;
    },
    
    /**
     * Sets the instructions of the current fieldset.
     * @param {String} instructions The new instructions
     * @return {Ext.form.FieldSet} this 
     */
    setInstructions: function(instructions){
        if (this.rendered) {
            if (!this.instructionsEl) {
                this.instructionsEl = this.el.createChild({
                    cls: this.componentCls + '-instructions'
                });
            }
            this.instructionsEl.setHTML(instructions);
        } else {
            this.instructions = instructions;
        }
        return this;
    }
});

Ext.reg('fieldset', Ext.form.FieldSet);
/**
 * @class Ext.form.Field
 * @extends Ext.Container
 * <p>Base class for form fields that provides default event handling, sizing, value handling and other functionality. Ext.form.Field
 * is not used directly in applications, instead the subclasses such as {@link Ext.form.Text} should be used.</p>
 * @constructor
 * Creates a new Field
 * @param {Object} config Configuration options
 * @xtype field
 */
Ext.form.Field = Ext.extend(Ext.Component,  {
    /**
     * Set to true on all Ext.form.Field subclasses. This is used by {@link Ext.form.FormPanel#getValues} to determine which
     * components inside a form are fields.
     * @property isField
     * @type Boolean
     */
    isField: true,

    /**
     * <p>The label Element associated with this Field. <b>Only available if a {@link #label} is specified.</b></p>
     * @type Ext.Element
     * @property labelEl
     */

    /**
     * @cfg {Number} tabIndex The tabIndex for this field. Note this only applies to fields that are rendered,
     * not those which are built via applyTo (defaults to undefined).
     */

    /**
     * @cfg {Mixed} value A value to initialize this field with (defaults to undefined).
     */

    /**
     * @cfg {String} name The field's HTML name attribute (defaults to '').
     * <b>Note</b>: this property must be set if this field is to be automatically included with
     * {@link Ext.form.FormPanel#submit form submit()}.
     */

    /**
     * @cfg {String} cls A custom CSS class to apply to the field's underlying element (defaults to '').
     */

    /**
     * @cfg {String} fieldCls The default CSS class for the field (defaults to 'x-form-field')
     */
    fieldCls: 'x-form-field',

    baseCls: 'x-field',

    /**
     * @cfg {String} inputCls Optional CSS class that will be added to the actual <input> element (or whichever different element is
     * defined by {@link inputAutoEl}). Defaults to undefined.
     */
    inputCls: undefined,

    /**
     * @cfg {Boolean} disabled True to disable the field (defaults to false).
     * <p>Be aware that conformant with the <a href="http://www.w3.org/TR/html401/interact/forms.html#h-17.12.1">HTML specification</a>,
     * disabled Fields will not be {@link Ext.form.BasicForm#submit submitted}.</p>
     */
    disabled: false,

    renderTpl: [
        '<tpl if="label">',
            '<div class="x-form-label"><span>{label}</span></div>',
        '</tpl>',
        '<tpl if="fieldEl">',
            '<div class="x-form-field-container"><input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}"',
                '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                '<tpl if="style">style="{style}" </tpl>',
                '<tpl if="maxlength">maxlength="{maxlength}" </tpl>',
                '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
                '<tpl if="autoCorrect">autocorrect="{autoCorrect}" </tpl> />',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
            '</div>',
            '<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div></div></tpl>',
        '</tpl>'
    ],

    // @private
    isFormField: true,

    /**
     * @cfg {Boolean} autoCreateField True to automatically create the field input element on render.
     * This is true by default, but should be set to false for any Ext.Field subclasses that don't
     * need an HTML input (e.g. Ext.Slider and similar)
     */
    autoCreateField: true,

    /**
     * @cfg {String} inputType The type attribute for input fields -- e.g. radio, text, password, file (defaults
     * to 'text'). The types 'file' and 'password' must be used to render those field types currently -- there are
     * no separate Ext components for those. Note that if you use <tt>inputType:'file'</tt>, {@link #emptyText}
     * is not supported and should be avoided.
     */
    inputType: 'text',
    
    /**
     * @cfg {String} label The label to associate with this field. Defaults to <tt>null</tt>.
     */
    label: null,

    /**
     * @cfg {Mixed} labelWidth The width of the label, can be any valid CSS size. E.g '20%', '6em', '100px'.
     * Defaults to <tt>'30%'</tt>
     */
    labelWidth: '30%',

    /**
     * @cfg {String} labelAlign The location to render the label of the field. Acceptable values are 'top' and 'left'.
     * Defaults to <tt>'left'</tt>
     */
    labelAlign: 'left',

    /**
     * @cfg {Boolean} required True to make this field required. Note: this only causes a visual indication.
     * Doesn't prevent user from submitting the form.
     */
    required: false,

    // @private
    useMask: false,

    // @private
    initComponent: function() {
        //<deprecated since="0.99">
        if (Ext.isDefined(this.fieldLabel)) {
            console.warn("[Ext.form.Field] fieldLabel has been deprecated. Please use label instead.");
            this.label = this.fieldLabel;
        }

        if (Ext.isDefined(this.fieldClass)) {
            console.warn("[Ext.form.Field] fieldClass has been deprecated. Please use fieldCls instead.");
            this.fieldCls = this.fieldClass;
        }

        if (Ext.isDefined(this.focusClass)) {
            console.warn("[Ext.form.Field] focusClass has been deprecated. Please use focusCls instead.");
            this.focusCls = this.focusClass;
        }

        if (Ext.isDefined(this.inputValue)) {
            console.warn("[Ext.form.Field] inputValue has been deprecated. Please use value instead.");
            this.value = this.inputValue;
        }
        //</deprecated>

        Ext.form.Field.superclass.initComponent.call(this);
    },

    /**
     * Returns the {@link Ext.form.Field#name name} or {@link Ext.form.ComboBox#hiddenName hiddenName}
     * attribute of the field if available.
     * @return {String} name The field {@link Ext.form.Field#name name} or {@link Ext.form.ComboBox#hiddenName hiddenName}
     */
    getName: function() {
        return this.name || this.id || '';
    },

    /**
     * @private
     */
    applyRenderSelectors: function() {
        this.renderSelectors = Ext.applyIf(this.renderSelectors || {}, {
            mask: '.x-field-mask',
            labelEl: '.x-form-label',
            fieldEl: '.' + Ext.util.Format.trim(this.renderData.fieldCls).replace(/ /g, '.')
        });

        Ext.form.Field.superclass.applyRenderSelectors.call(this);
    },

    /**
     * @private
     */
    initRenderData: function() {
        Ext.form.Field.superclass.initRenderData.apply(this, arguments);
        
        Ext.applyIf(this.renderData, {
            disabled        :   this.disabled,
            fieldCls        :   'x-input-' + this.inputType + (this.inputCls ? ' ' + this.inputCls: ''),
            fieldEl         :   !this.fieldEl && this.autoCreateField,
            inputId         :   Ext.id(),
            label           :    this.label,
            labelAlign      :   'x-label-align-' + this.labelAlign,
            name            :   this.getName(),
            required        :   this.required,
            style           :   this.style,
            tabIndex        :   this.tabIndex,
            inputType       :   this.inputType,
            useMask         :   this.useMask
        });
        
        return this.renderData;
    },

    // @private
    initEvents: function() {
        Ext.form.Field.superclass.initEvents.apply(this, arguments);
        
        if (this.fieldEl) {
            if (this.useMask && this.mask) {
                this.mon(this.mask, {
                    click: this.onMaskTap,
                    scope: this
                });
            }
        }
    },

    /**
     * @private
     */
    onRender: function() {
        Ext.form.Field.superclass.onRender.apply(this, arguments);
        
        var cls = [];
        
        if (this.required) {
            cls.push('x-field-required');
        }
        if (this.label) {
            cls.push('x-label-align-' + this.labelAlign);
        }

        this.el.addCls(cls);
    },

    /**
     * @private
     */
    afterRender: function() {
        Ext.form.Field.superclass.afterRender.apply(this, arguments);

        if (this.label) {
            this.setLabelWidth(this.labelWidth);
        }

        this.initValue();
    },

    isDisabled: function() {
        return this.disabled;
    },

    // @private
    onEnable: function() {
        this.fieldEl.dom.disabled = false;
    },

    // @private
    onDisable: function() {
        this.fieldEl.dom.disabled = true;
    },

    // @private
    initValue: function() {
        this.setValue(this.value || '', true);

        /**
         * The original value of the field as configured in the {@link #value} configuration, or
         * as loaded by the last form load operation if the form's {@link Ext.form.BasicForm#trackResetOnLoad trackResetOnLoad}
         * setting is <code>true</code>.
         * @type mixed
         * @property originalValue
         */
        this.originalValue = this.getValue();
    },

    /**
     * <p>Returns true if the value of this Field has been changed from its original value.
     * Will return false if the field is disabled or has not been rendered yet.</p>
     * <p>Note that if the owning {@link Ext.form.BasicForm form} was configured with
     * {@link Ext.form.BasicForm}.{@link Ext.form.BasicForm#trackResetOnLoad trackResetOnLoad}
     * then the <i>original value</i> is updated when the values are loaded by
     * {@link Ext.form.BasicForm}.{@link Ext.form.BasicForm#setValues setValues}.</p>
     * @return {Boolean} True if this field has been changed from its original value (and
     * is not disabled), false otherwise.
     */
    isDirty: function() {
        if (this.disabled || !this.rendered) {
            return false;
        }
        
        return String(this.getValue()) !== String(this.originalValue);
    },

    // @private
    onMaskTap: function(e) {
        if (this.disabled) {
            return false;
        }

//        if (Ext.is.iOS && e.browserEvent && !e.browserEvent.isSimulated) {
//            console.log('onMaskTap prevented');
//            e.preventDefault();
//            e.stopPropagation();
//            return false;
//        }

        return true;
    },

    // @private
    showMask: function(e) {
        if (this.mask) {
            this.mask.setStyle('display', 'block');
        }
    },

    hideMask: function(e) {
        if (this.mask) {
            this.mask.setStyle('display', 'none');
        }
    },
    
    /**
     * Resets the current field value to the originally loaded value and clears any validation messages.
     * See {@link Ext.form.BasicForm}.{@link Ext.form.BasicForm#trackResetOnLoad trackResetOnLoad}
     */
    reset: function() {
        this.setValue(this.originalValue);
    },

    /**
     * Returns the field data value
     * @return {Mixed} value The field value
     */
    getValue: function(){
        if (!this.rendered || !this.fieldEl) {
            return this.value;
        }
        
        return this.fieldEl.getValue();
    },

    /**
     * Set the field data value
     * @param {Mixed} value The value to set
     * @return {Ext.form.Field} this
     */
    setValue: function(value){
        this.value = value;

        if (this.rendered && this.fieldEl) {
            this.fieldEl.dom.value = (Ext.isEmpty(value) ? '' : value);
        }

        return this;
    },

    /**
     * Set the label width
     * @param {Mixed} width The width of the label, can be any valid CSS size. E.g '20%', '6em', '100px'
     * @return {Ext.form.Field} this
     */
    setLabelWidth: function(width) {
        if (this.labelEl) {
            this.labelEl.setWidth(width);
        }

        return this;
    }
});

Ext.reg('field', Ext.form.Field);

/**
 * @class Ext.form.Slider
 * @extends Ext.form.Field
 * <p>Form component allowing a user to move a 'thumb' along a slider axis to choose a value. Sliders can equally be used outside
 * of the context of a form. Example usage:</p>
   <pre><code>
new Ext.form.FormPanel({
    items: [
        {
            xtype   : 'sliderfield',
            label   : 'Volume',
            value   : 5,
            minValue: 0,
            maxValue: 10
        }
    ]
});
   </code></pre>
 * Or as a standalone component:
   <pre><code>
var slider = new Ext.form.Slider({
    value: 5,
    minValue: 0,
    maxValue: 10
});

slider.setValue(8); //will update the value and move the thumb;
slider.getValue(); //returns 8
   </code></pre>
 * @xtype sliderfield
 * @xtype slider
 */
Ext.form.Slider = Ext.extend(Ext.form.Field, {
    ui: 'slider',
    /**
     * @cfg {Boolean} useClearIcon @hide
     */

    /**
     * @cfg {String} inputCls Overrides {@link Ext.form.Field}'s inputCls. Defaults to 'x-slider'
     */
    inputCls: 'x-slider',

    inputType: 'slider',

    /**
     * @cfg {Number} minValue The lowest value any thumb on this slider can be set to (defaults to 0)
     */
    minValue: 0,

    /**
     * @cfg {Number} maxValue The highest value any thumb on this slider can be set to (defaults to 100)
     */
    maxValue: 100,

    /**
     * @cfg {Number} animationDuration When set to a number greater than 0, it will be the animation duration in ms, defaults to 200
     */
    animationDuration: 200,

    /**
     * @cfg {Number} value The value to initialize the thumb at (defaults to 0)
     */
    value: 0,

    /**
     * @private
     * @cfg {Number} trackWidth The current track width. Used when the field is hidden so setValue will continue to work (needs
     * the fieldEls width).
     */
    trackWidth: null,

    monitorOrientation: true,

    renderTpl: [
        '<tpl if="label">',
            '<div class="x-form-label"><span>{label}</span></div>',
        '</tpl>',
        '<tpl if="fieldEl">',
            '<div id="{inputId}" name="{name}" class="{fieldCls}"',
            '<tpl if="tabIndex">tabIndex="{tabIndex}"</tpl>',
            '<tpl if="style">style="{style}" </tpl>',
        '/></tpl>'
    ],

    /**
     * @cfg {Number} increment The increment by which to snap each thumb when its value changes. Defaults to 1. Any thumb movement
     * will be snapped to the nearest value that is a multiple of the increment (e.g. if increment is 10 and the user tries to move
     * the thumb to 67, it will be snapped to 70 instead)
     */
    increment: 1,


    /**
     * @cfg {Array} values The values to initialize each thumb with. One thumb will be created for each value. This configuration
     * should always be defined but if it is not then it will be treated as though [0] was passed.
     *
     * This is intentionally doc'd as private and is not fully supported/implemented yet.
     * @private
     */

    /**
     * @cfg {Array} thumbs Optional array of Ext.form.Slider.Thumb instances. Usually {@link values} should be used instead
     */

    // @private
    constructor: function(config) {
        this.addEvents(
            /**
             * @event beforechange
             * Fires before the value of a thumb is changed. Return false to cancel the change
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} newValue The value that the thumb will be set to
             * @param {Number} oldValue The previous value
             */
            'beforechange',

            /**
             * @event change
             * Fires when the value of a thumb is changed.
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} newValue The value that the thumb will be set to
             * @param {Number} oldValue The previous value
             */
            'change',
            /**
             * @event drag
             * Fires while the thumb is actively dragging.
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} value The value of the thumb.
             */
            'drag',
            /**
             * @event dragend
             * Fires when the thumb is finished dragging.
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} value The value of the thumb.
             */
            'dragend'
        );

        Ext.form.Slider.superclass.constructor.call(this, config);
    },

    // @private
    initComponent: function() {
        this.tabIndex = -1;

        if (this.increment == 0) {
            this.increment = 1;
        }

        this.increment = Math.abs(this.increment);

        //TODO: This will be removed once multi-thumb support is in place - at that point a 'values' config will be accepted
        //to create the multiple thumbs
        this.values = [this.value];

        Ext.form.Slider.superclass.initComponent.apply(this, arguments);

        if (this.thumbs == undefined) {
            var thumbs = [],
                values = this.values,
                length = values.length,
                i,
                Thumb = this.getThumbClass();

            for (i = 0; i < length; i++) {
                thumbs[thumbs.length] = new Thumb({
                    value: values[i],
                    slider: this,

                    listeners: {
                        scope  : this,
                        drag   : this.onDrag,
                        dragend: this.onThumbDragEnd
                    }
                });
            }

            this.thumbs = thumbs;
        }
    },

    // @private
    initValue: function() {
        var thumb = this.getThumb();

        if (thumb.dragObj) {
            thumb.dragObj.updateBoundary();
        }

        Ext.form.Slider.superclass.initValue.apply(this, arguments);
    },

    onOrientationChange: function() {
        Ext.form.Slider.superclass.onOrientationChange.apply(this, arguments);

        var me = this,
            thumb = this.getThumb();

        if (thumb.dragObj) {
            setTimeout(function() {
                thumb.dragObj.updateBoundary();
                me.moveThumb(thumb, me.getPixelValue(thumb.getValue(), thumb), 0);
            }, 100);
        }
    },

    getThumbClass: function() {
        return Ext.form.Slider.Thumb;
    },

    /**
     * Sets the new value of the slider, constraining it within {@link minValue} and {@link maxValue}, and snapping to the nearest
     * {@link increment} if set
     * @param {Number} value The new value
     * @param {Number} animationDuration Animation duration, 0 for no animation
     * @param {Boolean} moveThumb Whether or not to move the thumb as well. Defaults to true
     * @return {Ext.form.Slider} this This Slider
     */
    setValue: function(value, animationDuration, moveThumb) {
        if (typeof moveThumb == 'undefined') {
            moveThumb = true;
        }

        moveThumb = !!moveThumb;

        //TODO: this should accept a second argument referencing which thumb to move
        var thumb    = this.getThumb(),
            oldValue = thumb.getValue(),
            newValue = this.constrain(value);

        if (this.fireEvent('beforechange', this, thumb, newValue, oldValue) !== false) {
            if (moveThumb) {
                this.moveThumb(thumb, this.getPixelValue(newValue, thumb), animationDuration);
            }

            thumb.setValue(newValue);
            this.doComponentLayout();

            this.fireEvent('change', this, thumb, newValue, oldValue);
        }

        return this;
    },

    /**
     * @private
     * Takes a desired value of a thumb and returns the nearest snap value. e.g if minValue = 0, maxValue = 100, increment = 10 and we
     * pass a value of 67 here, the returned value will be 70. The returned number is constrained within {@link minValue} and {@link maxValue},
     * so in the above example 68 would be returned if {@link maxValue} was set to 68.
     * @param {Number} value The value to snap
     * @return {Number} The snapped value
     */
    constrain: function(value) {
        var remainder = value % this.increment;

        value -= remainder;

        if (Math.abs(remainder) >= (this.increment / 2)) {
            value += (remainder > 0) ? this.increment : -this.increment;
        }

        value = Math.max(this.minValue, value);
        value = Math.min(this.maxValue, value);

        return value;
    },

    /**
     * Returns the current value of the Slider's thumb
     * @return {Number} The thumb value
     */
    getValue: function() {
        //TODO: should return values from multiple thumbs
        return this.getThumb().getValue();
    },

    /**
     * Returns the Thumb instance bound to this Slider
     * @return {Ext.form.Slider.Thumb} The thumb instance
     */
    getThumb: function() {
        //TODO: This function is implemented this way to make the addition of multi-thumb support simpler. This function
        //should be updated to accept a thumb index
        return this.thumbs[0];
    },

    /**
     * @private
     * Maps a pixel value to a slider value. If we have a slider that is 200px wide, where minValue is 100 and maxValue is 500,
     * passing a pixelValue of 38 will return a mapped value of 176
     * @param {Number} pixelValue The pixel value, relative to the left edge of the slider
     * @return {Number} The value based on slider units
     */
    getSliderValue: function(pixelValue, thumb) {
        var trackWidth = thumb.dragObj.offsetBoundary.right,
            range = this.maxValue - this.minValue,
            ratio;

        this.trackWidth = (trackWidth > 0) ? trackWidth : this.trackWidth;
        ratio = range / this.trackWidth;

        return this.minValue + (ratio * (pixelValue));
    },

    /**
     * @private
     * might represent), this returns the pixel on the rendered slider that the thumb should be positioned at
     * @param {Number} value The internal slider value
     * @return {Number} The pixel value, rounded and relative to the left edge of the scroller
     */
    getPixelValue: function(value, thumb) {
        var trackWidth = thumb.dragObj.offsetBoundary.right,
            range = this.maxValue - this.minValue,
            ratio;

        this.trackWidth = (trackWidth > 0) ? trackWidth : this.trackWidth;
        ratio = this.trackWidth / range;

        return (ratio * (value - this.minValue));
    },

    /**
     * @private
     * Creates an Ext.form.Slider.Thumb instance for each configured {@link values value}. Assumes that this.el is already present
     */
    renderThumbs: function() {
        var thumbs = this.thumbs,
            length = thumbs.length,
            i;

        for (i = 0; i < length; i++) {
            thumbs[i].render(this.fieldEl);
        }
    },

    /**
     * @private
     * Updates a thumb after it has been dragged
     */
    onThumbDragEnd: function(draggable) {
        var value = this.getThumbValue(draggable);

        this.setValue(value);
        this.fireEvent('dragend', this, draggable.thumb, this.constrain(value));
    },

    /**
     * @private
     * Get the value for a draggable thumb.
     */
    getThumbValue: function(draggable) {
        var thumb = draggable.thumb;

        return this.getSliderValue(-draggable.getOffset().x, thumb);
    },

    /**
     * @private
     * Fires drag events so the user can interact.
     */
    onDrag: function(draggable){
        var value = this.getThumbValue(draggable);
        this.fireEvent('drag', this, draggable.thumb, this.constrain(value));
    },

    /**
     * @private
     * Updates the value of the nearest thumb on tap events
     */
    onTap: function(e) {
        if (!this.disabled) {
            var sliderBox = this.fieldEl.getPageBox(),
                leftOffset = e.pageX - sliderBox.left,
                thumb = this.getNearest(leftOffset),
                halfThumbWidth = thumb.dragObj.size.width / 2;

            this.setValue(this.getSliderValue(leftOffset - halfThumbWidth, thumb), this.animationDuration, true);
        }
    },

    /**
     * @private
     * Moves the thumb element. Should only ever need to be called from within {@link setValue}
     * @param {Ext.form.Slider.Thumb} thumb The thumb to move
     * @param {Number} pixel The pixel the thumb should be centered on
     * @param {Boolean} animationDuration True to animationDuration the movement
     */
    moveThumb: function(thumb, pixel, animationDuration) {
        thumb.dragObj.setOffset(new Ext.util.Offset(pixel, 0), animationDuration);
    },

    // inherit docs
    afterRender: function(ct) {
        var me = this;

        me.renderThumbs();

        Ext.form.Slider.superclass.afterRender.apply(me, arguments);

        me.fieldEl.on({
            scope: me,
            tap  : me.onTap
        });
    },

    /**
     * @private
     * Finds and returns the nearest {@link Ext.form.Slider.Thumb thumb} to the given value.
     * @param {Number} value The value
     * @return {Ext.form.Slider.Thumb} The nearest thumb
     */
    getNearest: function(value) {
        //TODO: Implemented this way to enable multi-thumb support later
        return this.thumbs[0];
    },

    /**
     * @private
     * Loops through each of the sliders {@link #thumbs} and calls disable/enable on each of them depending
     * on the param specified.
     * @param {Boolean} disable True to disable, false to enable
     */
    setThumbsDisabled: function(disable) {
        var thumbs = this.thumbs,
            ln     = thumbs.length,
            i      = 0;

        for (; i < ln; i++) {
            thumbs[i].dragObj[disable ? 'disable' : 'enable']();
        }
    },

    /**
     * Disables the slider by calling the internal {@link #setThumbsDisabled} method
     */
    disable: function() {
        Ext.form.Slider.superclass.disable.call(this);
        this.setThumbsDisabled(true);
    },

    /**
     * Enables the slider by calling the internal {@link #setThumbsDisabled} method.
     */
    enable: function() {
        Ext.form.Slider.superclass.enable.call(this);
        this.setThumbsDisabled(false);
    }
});

Ext.reg('sliderfield', Ext.form.Slider);

//<deprecated since=1.0>
Ext.reg('slider', Ext.form.Slider);
//</deprecated>
/**
 * @class Ext.form.Slider.Thumb
 * @extends Ext.form.Field
 * @xtype sliderthumb
 * @xtype thumb
 * @ignore
 * Utility class used by Ext.form.Slider - should never need to be used directly.
 */
Ext.form.Slider.Thumb = Ext.extend(Ext.form.Field, {
    isField: false,
    baseCls: 'x-thumb',
    autoCreateField: false,
    draggable: true,

    /**
     * @cfg {Number} value The value to initialize this thumb with (defaults to 0)
     */
    value: 0,

    /**
     * @cfg {Ext.form.Slider} slider The Slider that this thumb is attached to. Required
     */

    // inherit docs
    onRender: function() {
        this.draggable = {
            direction: 'horizontal',
            constrain: this.slider.fieldEl,
            revert: false,
            thumb: this
        };

        Ext.form.Slider.Thumb.superclass.onRender.apply(this, arguments);
    },

    // inherit docs
    setValue: function(newValue) {
        this.value = newValue;

        return this;
    },

    // inherit docs
    getValue: function() {
        return this.value;
    }
});

Ext.reg('sliderthumb', Ext.form.Slider.Thumb);

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('thumb', Ext.form.Slider.Thumb);
//</deprecated>

/**
 * @class Ext.form.Toggle
 * @extends Ext.form.Slider
 * <p>Specialized Slider with a single thumb and only two values. By default the toggle component can
 * be switched between the values of 0 and 1.</p>
 * @xtype togglefield
 * @xtype toggle
 */
Ext.form.Toggle = Ext.extend(Ext.form.Slider, {
    minValue: 0,

    maxValue: 1,

    ui: 'toggle',
    
    inputType: 'toggle',

    /**
     * @cfg {Boolean} useClearIcon @hide
     */

    /**
     * @cfg {String} minValueCls CSS class added to the field when toggled to its minValue
     */
    minValueCls: 'x-toggle-off',

    /**
     * @cfg {String} maxValueCls CSS class added to the field when toggled to its maxValue
     */
    maxValueCls: 'x-toggle-on',

    // Inherited
    animationDuration: 70,
    
    /**
     * Toggles between the minValue (0 by default) and the maxValue (1 by default)
     */
    toggle: function() {
        var thumb = this.thumbs[0],
            value = thumb.getValue();

        this.setValue(value == this.minValue ? this.maxValue : this.minValue, this.animationDuration);
    },

    // inherit docs
    setValue: function(value) {
        Ext.form.Toggle.superclass.setValue.call(this, value, this.animationDuration);

        var fieldEl = this.fieldEl;
        
        if (this.constrain(value) === this.minValue) {
            fieldEl.addCls(this.minValueCls);
            fieldEl.removeCls(this.maxValueCls);
        }
        else {
            fieldEl.addCls(this.maxValueCls);
            fieldEl.removeCls(this.minValueCls);
        }
    },

    /**
     * @private
     * Listener to the tap event, just toggles the value
     */
    onTap: function() {
        if (!this.disabled) {
            this.toggle();
        }
    },

    getThumbClass: function() {
        return Ext.form.Toggle.Thumb;
    }
});

Ext.reg('togglefield', Ext.form.Toggle);

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('toggle', Ext.form.Toggle);
//</deprecated>

/**
 * @class Ext.form.Toggle.Thumb
 * @extends Ext.form.Slider.Thumb
 * @private
 * @ignore
 */
Ext.form.Toggle.Thumb = Ext.extend(Ext.form.Slider.Thumb, {
    onRender: function() {
        Ext.form.Toggle.Thumb.superclass.onRender.apply(this, arguments);
        Ext.DomHelper.append(this.el, [{
            cls: 'x-toggle-thumb-off',
            html: '<span>OFF</span>'
        },{
            cls: 'x-toggle-thumb-on',
            html: '<span>ON</span>'
        },{
            cls: 'x-toggle-thumb-thumb'
        }]);
    }
});
/**
 * @class Ext.form.Text
 * @extends Ext.form.Field
 * <p>Simple text input field. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype textfield
 * @alternateClassName Ext.form.TextField
 */
Ext.form.Text = Ext.extend(Ext.form.Field, {
    ui: 'text',

    /**
     * @cfg {String} focusCls The CSS class to use when the field receives focus (defaults to 'x-field-focus')
     */
    focusCls: 'x-field-focus',

    /**
     * @cfg {Integer} maxLength The maximum number of permitted input characters (defaults to 0).
     */
    maxLength: 0,

    /**
     * @cfg {String} placeHolder A string value displayed in the input (if supported) when the control is empty.
     */
    placeHolder: undefined,

    /**
     * True to set the field's DOM element autocomplete attribute to "on", false to set to "off". Defaults to undefined, leaving the attribute unset
     * @cfg {Boolean} autoComplete
     */
    autoComplete: undefined,

    /**
     * True to set the field's DOM element autocapitalize attribute to "on", false to set to "off". Defaults to undefined, leaving the attribute unset
     * @cfg {Boolean} autoCapitalize
     */
    autoCapitalize: undefined,

    /**
     * True to set the field DOM element autocorrect attribute to "on", false to set to "off". Defaults to undefined, leaving the attribute unset.
     * @cfg {Boolean} autoCorrect
     */
    autoCorrect: undefined,

    /**
     * @cfg {Integer} maxLength Maximum number of character permit by the input.
     */

    /**
     * @property {Boolean} <tt>True</tt> if the field currently has focus.
     */
    isFocused: false,

    // @private
    isClearIconVisible: false,

    useMask: Ext.is.iOS,

    initComponent: function() {
        this.addEvents(
            /**
             * @event focus
             * Fires when this field receives input focus.
             * @param {Ext.form.Text} this This field
             * @param {Ext.EventObject} e
             */
            'focus',
            /**
             * @event blur
             * Fires when this field loses input focus.
             * @param {Ext.form.Text} this This field
             * @param {Ext.EventObject} e
             */
            'blur',
            /**
             * @event keyup
             * Fires when a key is released on the input element.
             * @param {Ext.form.Text} this This field
             * @param {Ext.EventObject} e
             */
            'keyup',
            /**
             * @event change
             * Fires just before the field blurs if the field value has changed.
             * @param {Ext.form.Text} this This field
             * @param {Mixed} newValue The new value
             * @param {Mixed} oldValue The original value
             */
            'change',
            /**
             * @event action
             * Fires whenever the return key or go is pressed. FormPanel listeners
             * for this event, and submits itself whenever it fires. Also note
             * that this event bubbles up to parent containers.
             * @param {Ext.form.Text} this This field
             * @param {Mixed} e The key event object
             */
            'action'
        );
        
        this.enableBubble('action');

        Ext.form.Text.superclass.initComponent.apply(this, arguments);
    },

    applyRenderSelectors: function() {
        this.renderSelectors = Ext.applyIf(this.renderSelectors || {}, {
            clearIconEl: '.x-field-clear',
            clearIconContainerEl: '.x-field-clear-container'
        });
        
        Ext.form.Text.superclass.applyRenderSelectors.call(this);
    },

    initRenderData: function() {
        var renderData     = Ext.form.Text.superclass.initRenderData.call(this),
            autoComplete   = this.autoComplete,
            autoCapitalize = this.autoCapitalize,
            autoCorrect    = this.autoCorrect;

        Ext.applyIf(renderData, {
            placeHolder : this.placeHolder,
            maxlength   : this.maxLength,
            useClearIcon   : this.useClearIcon
        });

        var testArray = [true, 'on'];

        if (autoComplete !== undefined) {
            renderData.autoComplete = (testArray.indexOf(autoComplete) !== -1)  ? 'on': 'off';
        }

        if (autoCapitalize !== undefined) {
            renderData.autoCapitalize = (testArray.indexOf(autoCapitalize) !== -1) ? 'on': 'off';
        }

        if (autoCorrect !== undefined) {
            renderData.autoCorrect = (testArray.indexOf(autoCorrect) !== -1) ? 'on': 'off';
        }

        this.renderData = renderData;
        
        return renderData;
    },

    initEvents: function() {
        Ext.form.Text.superclass.initEvents.call(this);

        if (this.fieldEl) {
            this.mon(this.fieldEl, {
                focus: this.onFocus,
                blur: this.onBlur,
                keyup: this.onKeyUp,
                paste: this.updateClearIconVisibility,
                mousedown: this.onBeforeFocus,
                scope: this
            });

            if (this.clearIconEl){
                this.mon(this.clearIconContainerEl, {
                    scope: this,
                    tap: this.onClearIconTap
                });
            }
        }
    },

    // @private
    onEnable: function() {
        Ext.form.Text.superclass.onEnable.apply(this, arguments);

        this.disabled = false;
        
        this.updateClearIconVisibility();
    },

    // @private
    onDisable: function() {
        Ext.form.Text.superclass.onDisable.apply(this, arguments);

        this.blur();
        
        this.hideClearIcon();
    },

    // @private
    onClearIconTap: function() {
        if (!this.disabled) {
            this.setValue('');
        }
    },

    // @private
    updateClearIconVisibility: function() {
        var value = this.getValue();

        if (!value) {
            value = '';
        }
        
        if (value.length < 1){
            this.hideClearIcon();
        }
        else {
            this.showClearIcon();
        }

        return this;
    },

    // @private
    showClearIcon: function() {
        if (!this.disabled && this.fieldEl && this.clearIconEl && !this.isClearIconVisible) {
            this.isClearIconVisible = true;
            this.fieldEl.addCls('x-field-clearable');
            this.clearIconEl.removeCls('x-hidden-visibility');
        }

        return this;
    },

    // @private
    hideClearIcon: function() {
        if (this.fieldEl && this.clearIconEl && this.isClearIconVisible) {
            this.isClearIconVisible = false;
            this.fieldEl.removeCls('x-field-clearable');
            this.clearIconEl.addCls('x-hidden-visibility');
        }

        return this;
    },

    // @private
    afterRender: function() {
        Ext.form.Text.superclass.afterRender.call(this);
        this.updateClearIconVisibility();
    },
    // @private
    onBeforeFocus: function(e) {
        this.fireEvent('beforefocus', e);
    },

    // @private
    beforeFocus: Ext.emptyFn,

    // @private
    onMaskTap: function(e) {
        if (Ext.form.Text.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false;
        }
        
        this.maskCorrectionTimer = Ext.defer(this.showMask, 1000, this);
        this.hideMask();
    },

    // @private
    onFocus: function(e) {
        if (this.mask) {
            if (this.maskCorrectionTimer) {
                clearTimeout(this.maskCorrectionTimer);
            }
            
            this.hideMask();
        }

        this.beforeFocus();

        if (this.focusCls) {
            this.el.addCls(this.focusCls);
        }

        if (!this.isFocused) {
            this.isFocused = true;
            /**
             * <p>The value that the Field had at the time it was last focused. This is the value that is passed
             * to the {@link #change} event which is fired if the value has been changed when the Field is blurred.</p>
             * <p><b>This will be undefined until the Field has been visited.</b> Compare {@link #originalValue}.</p>
             * @type mixed
             * @property startValue
             */
            this.startValue = this.getValue();
            this.fireEvent('focus', this, e);
        }

        Ext.currentlyFocusedField = this;
    },

    // @private
    beforeBlur: Ext.emptyFn,

    // @private
    onBlur: function(e) {
        this.beforeBlur();

        if (this.focusCls) {
            this.el.removeCls(this.focusCls);
        }

        this.isFocused = false;

        var value = this.getValue();

        if (String(value) != String(this.startValue)){
            this.fireEvent('change', this, value, this.startValue);
        }

        this.fireEvent('blur', this, e);

        this.updateClearIconVisibility();

        this.showMask();

        this.afterBlur();

        Ext.currentlyFocusedField = null;
    },

    // @private
    afterBlur: Ext.emptyFn,

    /**
     * Attempts to set the field as the active input focus.
     * @return {Ext.form.Text} this
     */
    focus: function(){
        if (this.rendered && this.fieldEl && this.fieldEl.dom.focus) {
            this.fieldEl.dom.focus();
        }

        return this;
    },

    /**
     * Attempts to forcefully blur input focus for the field.
     * @return {Ext.form.Text} this
     */
    blur: function(){
        if(this.rendered && this.fieldEl && this.fieldEl.dom.blur) {
            this.fieldEl.dom.blur();
        }
        return this;
    },

    // Inherited docs
    setValue: function() {
        Ext.form.Text.superclass.setValue.apply(this, arguments);

        this.updateClearIconVisibility();
    },

    // @private
    onKeyUp: function(e) {
        this.updateClearIconVisibility();
        
        this.fireEvent('keyup', this, e);

        if (e.browserEvent.keyCode === 13) {
            this.blur();
            this.fireEvent('action', this, e);
        }
    }
});

Ext.reg('textfield', Ext.form.Text);

// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.TextField = Ext.extend(Ext.form.Text, {
    constructor: function() {
        console.warn("Ext.form.TextField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Text instead");
        Ext.form.TextField.superclass.constructor.apply(this, arguments);
    }
});

/**
 * @class Ext.form.Password
 * @extends Ext.form.Text
 * <p>Wraps an HTML5 password field. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype passwordfield
 * @alternateClassName Ext.form.PasswordField
 */
Ext.form.Password = Ext.extend(Ext.form.Text, {
    inputType: 'password',
    autoCapitalize : false
});

Ext.reg('passwordfield', Ext.form.Password);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.PasswordField = Ext.extend(Ext.form.Password, {

    constructor: function() {
        console.warn("Ext.form.PasswordField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Password instead");
        Ext.form.PasswordField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>
/**
 * @class Ext.form.Email
 * @extends Ext.form.Text
 * <p>Wraps an HTML5 email field. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype emailfield
 * @alternateClassName Ext.form.EmailField
 */
Ext.form.Email = Ext.extend(Ext.form.Text, {
    inputType: 'email',
    
    autoCapitalize: false
});

Ext.reg('emailfield', Ext.form.Email);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.EmailField = Ext.extend(Ext.form.Email, {

    constructor: function() {
        console.warn("Ext.form.EmailField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Email instead");
        Ext.form.EmailField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>
/**
 * @class Ext.form.Url
 * @extends Ext.form.Text
 * Wraps an HTML5 url field. See {@link Ext.form.FormPanel FormPanel} for example usage.
 * @xtype urlfield
 * @alternateClassName Ext.form.UrlField
 */
Ext.form.Url = Ext.extend(Ext.form.Text, {
    inputType: 'url',
    
    autoCapitalize: false
});

Ext.reg('urlfield', Ext.form.Url);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.UrlField = Ext.extend(Ext.form.Url, {

    constructor: function() {
        console.warn("Ext.form.UrlField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Url instead");
        Ext.form.UrlField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>
/**
 * @class Ext.form.Search
 * @extends Ext.form.Text
 * Wraps an HTML5 search field. See {@link Ext.form.FormPanel FormPanel} for example usage.
 * @xtype searchfield
 * @alternateClassName Ext.form.SearchField
 */
Ext.form.Search = Ext.extend(Ext.form.Text, {
    inputType: 'search'
    /**
     * @cfg {Boolean} useClearIcon @hide
     */
});

Ext.reg('searchfield', Ext.form.Search);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.SearchField = Ext.extend(Ext.form.Search, {

    constructor: function() {
        console.warn("Ext.form.SearchField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Search instead");
        Ext.form.SearchField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>
/**
 * @class Ext.form.Number
 * @extends Ext.form.Text
 * <p>Wraps an HTML5 number field. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype numberfield
 * @alternateClassName Ext.form.NumberField
 */
Ext.form.Number = Ext.extend(Ext.form.Text, {
    ui: 'number',

    inputType: 'number',
    
    /**
     * @cfg {Number} minValue The minimum value that this Number field can accept (defaults to undefined, e.g. no minimium)
     */
    minValue : undefined,
    
    /**
     * @cfg {Number} minValue The maximum value that this Number field can accept (defaults to undefined, e.g. no maximum)
     */
    maxValue : undefined,
    
    /**
     * @cfg {Number} stepValue The amount by which the field is incremented or decremented each time the spinner is tapped.
     * Defaults to undefined, which means that the field goes up or down by 1 each time the spinner is tapped
     */
    stepValue : undefined,

    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><div class="x-form-field-container">',
            '<input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}"',
                '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                '<tpl if="style">style="{style}" </tpl>',
                '<tpl if="minValue != undefined">min="{minValue}" </tpl>',
                '<tpl if="maxValue != undefined">max="{maxValue}" </tpl>',
                '<tpl if="stepValue != undefined">step="{stepValue}" </tpl>',
                '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
                '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
            '/>',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
            '</div></tpl>',
        '<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div><div></tpl>'
    ],
    
    // @private
    onRender : function() {
        Ext.apply(this.renderData, {
            maxValue : this.maxValue,
            minValue : this.minValue,
            stepValue : this.stepValue 
        });
        
        Ext.form.Number.superclass.onRender.apply(this, arguments);
    }
});

Ext.reg('numberfield', Ext.form.Number);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.NumberField = Ext.extend(Ext.form.Number, {

    constructor: function() {
        console.warn("Ext.form.NumberField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Number instead");
        Ext.form.NumberField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>

/**
 * @class Ext.form.Spinner
 * @extends Ext.form.Number
 * <p>Wraps an HTML5 number field. Example usage:
 * <pre><code>
new Ext.form.Spinner({
    minValue: 0,
    maxValue: 100,
    incrementValue: 2,
    cycle: true
});
</code></pre>
 * @xtype spinnerfield
 * @alternateClassName Ext.form.SpinnerField
 */
Ext.form.Spinner = Ext.extend(Ext.form.Number, {

    /**
     * @cfg {Boolean} useClearIcon @hide
     */
    componentCls: 'x-spinner',
    
    /**
     * @cfg {Number} minValue The minimum allowed value (defaults to Number.NEGATIVE_INFINITY)
     */
    minValue: Number.NEGATIVE_INFINITY,
    /**
     * @cfg {Number} maxValue The maximum allowed value (defaults to Number.MAX_VALUE)
     */
    maxValue: Number.MAX_VALUE,
    /**
     * @cfg {Number} incrementValue Value that is added or subtracted from the current value when a spinner is used.
     * Defaults to <tt>1</tt>.
     */
    incrementValue: 1,
    /**
     * @cfg {Boolean} accelerateOnTapHold True if autorepeating should start slowly and accelerate.
     * Defaults to <tt>true</tt>.
     */
    accelerateOnTapHold: true,

    // @private
    defaultValue: 0,

    /**
     * @cfg {Boolean} cycle When set to true, it will loop the values of a minimum or maximum is reached.
     * If the maximum value is reached, the value will be set to the minimum.
     * If the minimum value is reached, the value will be set to the maximum.
     * Defaults to <tt>false</tt>.
     */
    cycle: false,
    
    /**
     * @cfg {Boolean} disableInput True to disable the input field, meaning that only the spinner buttons
     * can be used. Defaults to <tt>false</tt>.
     */
    disableInput: false,

    /**
     * @cfg {Boolean} useClearIcon @hide
     */
    useClearIcon: false,

    /**
     * @cfg {Boolean} autoCapitalize @hide
     */
    autoCapitalize: false,

    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl">',
            '<div class="{componentCls}-body">',
                '<div class="{componentCls}-down"><span>-</span></div>',
                '<div class="x-form-field-container">',
                    '<input id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"',
                        '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                        '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                        '<tpl if="style">style="{style}" </tpl>',
                        '<tpl if="minValue != undefined">min="{minValue}" </tpl>',
                        '<tpl if="maxValue != undefined">max="{maxValue}" </tpl>',
                        '<tpl if="stepValue != undefined">step="{stepValue}" </tpl>',
                        '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                        '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
                    '/>',
                    '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
                '</div>',
                '<div class="{componentCls}-up"><span>+</span></div>',
            '</div>',
        '</tpl>'
    ],
    
    initComponent: function() {
        //<deprecated since=0.99>
        if (Ext.isDefined(this.accelerate)) {
            console.warn("Spinner: accelerate has been removed. Please use accelerateOnTapHold.");
            this.accelerate = this.accelerateOnTapHold;
        }
        //</deprecated>
        
        this.addEvents(
            /**
             * @event spin
             * Fires when the value is changed via either spinner buttons
             * @param {Ext.form.Spinner} this
             * @param {Number} value
             * @param {String} direction 'up' or 'down'
             */
            'spin',
            /**
             * @event spindown
             * Fires when the value is changed via the spinner down button
             * @param {Ext.form.Spinner} this
             * @param {Number} value
             */
            'spindown',
            /**
             * @event spinup
             * Fires when the value is changed via the spinner up button
             * @param {Ext.form.Spinner} this
             * @param {Number} value
             */
            'spinup'
        );

        Ext.form.Spinner.superclass.initComponent.call(this);    
    },

    // @private
    onRender: function() {
        this.renderData.disableInput = this.disableInput;

        Ext.applyIf(this.renderSelectors, {
            spinUpEl: '.x-spinner-up',
            spinDownEl: '.x-spinner-down'
        });

        Ext.form.Spinner.superclass.onRender.apply(this, arguments);
        
        this.downRepeater = this.createRepeater(this.spinDownEl, this.onSpinDown);
        this.upRepeater = this.createRepeater(this.spinUpEl, this.onSpinUp);
    },

    initValue: function() {
        if (isNaN(this.defaultValue)) {
            this.defaultValue = 0;
        }

        if (!this.value) {
            this.value = this.defaultValue;
        }

        Ext.form.Spinner.superclass.initValue.apply(this, arguments);
    },
    
    // @private
    createRepeater: function(el, fn){
        var repeat = new Ext.util.TapRepeater(el, {
            accelerate: this.accelerateOnTapHold
        });

        this.mon(repeat, {
            tap: fn,
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            preventDefault: true,
            scope: this
        });
        
        return repeat;
    },

    // @private
    onSpinDown: function() {
        if (!this.disabled) {
            this.spin(true);
        }
    },

    // @private
    onSpinUp: function() {
        if (!this.disabled) {
            this.spin(false);
        }
    },

    onKeyUp: function(e) {
//        var value = parseInt(this.getValue());
//
//        if (isNaN(value)) {
//            value = this.defaultValue;
//        }
//
//        this.setValue(value);

        Ext.form.Spinner.superclass.onKeyUp.apply(this, arguments);
    },

    // @private
    onTouchStart: function(btn) {
        if (!this.disabled) {
            btn.el.addCls('x-button-pressed');
        }
    },

    // @private
    onTouchEnd: function(btn) {
        btn.el.removeCls('x-button-pressed');
    },

    setValue: function(value) {
        value = parseFloat(value);

        if (isNaN(value)) {
            value = this.defaultValue;
        }

        Ext.form.Spinner.superclass.setValue.call(this, value);
    },

    // @private
    spin: function(down) {
        var value = parseFloat(this.getValue()),
            increment = this.incrementValue,
            cycle = this.cycle,
            min = this.minValue,
            max = this.maxValue,
            direction = down ? 'down': 'up';

        if (down){
            value -= increment;
        }
        else{
            value += increment;
        }

        value = (isNaN(value)) ? this.defaultValue: value;

        if (value < min) {
            value = cycle ? max: min;
        }
        else if (value > max) {
            value = cycle ? min: max;
        }

        this.setValue(value);

        this.fireEvent('spin' + direction, this, value);
        this.fireEvent('spin', this, value, direction);
    },

    // @private
    destroy: function() {
        Ext.destroy(this.downRepeater, this.upRepeater);
        Ext.form.Spinner.superclass.destroy.call(this, arguments);
    }
});

Ext.reg('spinnerfield', Ext.form.Spinner);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.SpinnerField = Ext.extend(Ext.form.Spinner, {

    constructor: function() {
        console.warn("Ext.form.SpinnerField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Spinner instead");
        Ext.form.SpinnerField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>
/**
 * @class Ext.form.Hidden
 * @extends Ext.form.Field
 * <p>Wraps a hidden field. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype hiddenfield
 * @xtype hidden
 * @alternateClassName Ext.form.HiddenField
 */
Ext.form.Hidden = Ext.extend(Ext.form.Field, {
    ui: 'hidden',
    
    inputType: 'hidden',

    tabIndex: -1
});

Ext.reg('hiddenfield', Ext.form.Hidden);


// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.HiddenField = Ext.extend(Ext.form.Hidden, {

    constructor: function() {
        console.warn("Ext.form.HiddenField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Hidden instead");
        Ext.form.HiddenField.superclass.constructor.apply(this, arguments);
    }
});

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('hidden', Ext.form.Hidden);
//</deprecated>
/**
 * @class Ext.form.Checkbox
 * @extends Ext.form.Field
 * Simple Checkbox class. Can be used as a direct replacement for traditional checkbox fields.
 * @constructor
 * @param {Object} config Optional config object
 * @xtype checkboxfield
 * @xtype checkbox
 */
Ext.form.Checkbox = Ext.extend(Ext.form.Field, {
    ui: 'checkbox',
    
    inputType: 'checkbox',

    /**
     * @cfg {Boolean} checked <tt>true</tt> if the checkbox should render initially checked (defaults to <tt>false</tt>)
     */
    checked: false,
    
    /**
     * @cfg {String} value The string value to submit if the item is in a checked state.
     */
    value: '',

    // @private
    constructor: function(config) {
        this.addEvents(
            /**
             * @event check
             * Fires when the checkbox is checked.
             * @param {Ext.form.Checkbox} this This checkbox
             */
            'check',

            /**
             * @event uncheck
             * Fires when the checkbox is unchecked.
             * @param {Ext.form.Checkbox} this This checkbox
             */
            'uncheck'
        );

        Ext.form.Checkbox.superclass.constructor.call(this, config);
    },
    
    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}" tabIndex="-1" ',
            '<tpl if="checked"> checked </tpl>',
            '<tpl if="style">style="{style}" </tpl> value="{inputValue}" />',
        '</tpl>'
    ],

    // @private
    onRender: function() {
        var isChecked = this.getBooleanIsChecked(this.checked);

        Ext.apply(this.renderData, {
            inputValue  : String(this.value),
            checked     : isChecked
        });

        Ext.form.Checkbox.superclass.onRender.apply(this, arguments);

        if (this.fieldEl) {
            this.mon(this.fieldEl, {
                click: this.onChange,
                scope: this
            });

            this.setChecked(isChecked);
            this.originalState = this.isChecked();
        }
    },
    
    // @private
    onChange: function(e) {
        if (e) {
            if (e.browserEvent) {
                e = e.browserEvent;
            }

            if (Ext.supports.Touch && !e.isSimulated) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }
        
        if (this.isChecked()) {
            this.fireEvent('check', this);
        } else {
            this.fireEvent('uncheck', this);
        }
    },

    /**
     * Returns the checked state of the checkbox.
     * @return {Boolean} True if checked, else otherwise
     */
    isChecked: function() {
        if (this.rendered) {
            return this.fieldEl.dom.checked || false;
        } else {
            return !!this.checked;
        }
    },

    /**
     * Set the checked state of the checkbox.
     * @return {Ext.form.Checkbox} this This checkbox
     */
    setChecked: function(checked) {
        var newState = this.getBooleanIsChecked(checked),
            rendered = this.rendered,
            currentState,
            field;
    
        if (rendered) {
            field = this.fieldEl.dom;
            currentState = field.checked;
        } else {
            currentState = !!this.checked;
        }

        if (currentState != newState) {
            if (rendered) {
                field.checked = newState;
            } else {
                this.checked = newState;
            }
            this.onChange();
        }
        return this;
    },

    /**
     * Set the checked state of the checkbox to true
     * @return {Ext.form.Checkbox} this This checkbox
     */
    check: function() {
        return this.setChecked(true);
    },

    /**
     * Set the checked state of the checkbox to false
     * @return {Ext.form.Checkbox} this This checkbox
     */
    uncheck: function() {
        return this.setChecked(false);
    },

    // Inherited
    reset: function() {
        Ext.form.Checkbox.superclass.reset.apply(this, arguments);
        
        this.setChecked(this.originalState);

        return this;
    },

    //@private
    getBooleanIsChecked: function(value) {
        return /^(true|1|on)/i.test(String(value));
    },

    getSameGroupFields: function() {
        var parent = this.el.up('form'),
            formComponent = Ext.getCmp(parent.id),
            fields = [];

        if (formComponent) {
            fields = formComponent.getFields(this.getName());
        }

        return fields;
    },

    /**
     * Returns an array of values from the checkboxes in the group that are checked,
     * @return {Array}
     */
    getGroupValues: function() {
        var values = [];

        this.getSameGroupFields().forEach(function(field) {
            if (field.isChecked()) {
                values.push(field.getValue());
            }
        });

        return values;
    },

    /**
     * Set the status of all matched checkboxes in the same group to checked
     * @param {Array} values An array of values
     * @return {Ext.form.Checkbox} This checkbox
     */
    setGroupValues: function(values) {
        this.getSameGroupFields().forEach(function(field) {
            field.setChecked((values.indexOf(field.getValue()) !== -1));
        });
        
        return this;
    },

    //Inherited docs
    setValue: function(value) {
        value = String(value);

        Ext.form.Checkbox.superclass.setValue.call(this, value);
    }
});

Ext.reg('checkboxfield', Ext.form.Checkbox);

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('checkbox', Ext.form.Checkbox);
//</deprecated>
/**
 * @class Ext.form.Radio
 * @extends Ext.form.Checkbox
 * <p>Single radio field.  Same as Checkbox, but provided as a convenience for automatically setting the input type.
 * Radio grouping is handled automatically by the browser if you give each radio in a group the same name.</p>
 * @constructor
 * Creates a new Radio
 * @param {Object} config Configuration options
 * @xtype radiofield
 * @xtype radio
 */
Ext.form.Radio = Ext.extend(Ext.form.Checkbox, {
    inputType: 'radio',
    
    ui: 'radio',
    
    /**
     * @cfg {Boolean} useClearIcon @hide
     */

    /**
     * Returns the selected value if this radio is part of a group (other radio fields with the same name, in the same FormPanel),
     * @return {String}
     */
    getGroupValue: function() {
        var field,
            fields = this.getSameGroupFields();

        for (var i=0; i<fields.length; i++) {
            field = fields[i];

            if (field.isChecked()) {
                return field.getValue();
            }
        }

        return null;
    },

    /**
     * Set the matched radio field's status (that has the same value as the given string) to checked
     * @param {String} value The value of the radio field to check
     * @return {String}
     */
    setGroupValue: function(value) {
        var field,
            fields = this.getSameGroupFields(),
            i = 0,
            len = fields.length;

        for (; i < len; i++) {
            field = fields[i];

            if (field.getValue() == value) {
                field.check();
                return;
            }
        }
    }
});

Ext.reg('radiofield', Ext.form.Radio);

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('radio', Ext.form.Radio);
//</deprecated>
/**
 * @class Ext.form.Select
 * @extends Ext.form.Text
 * Simple Select field wrapper. Example usage:
<pre><code>
new Ext.form.Select({
    options: [
        {text: 'First Option',  value: 'first'},
        {text: 'Second Option', value: 'second'},
        {text: 'Third Option',  value: 'third'}
    ]
});
</code></pre>
 * @xtype selectfield
 * @xtype select
 */
Ext.form.Select = Ext.extend(Ext.form.Text, {
    ui: 'select',
    /**
     * @cfg {Boolean} useClearIcon @hide
     */

    /**
     * @cfg {String/Integer} valueField The underlying {@link Ext.data.Field#name data value name} (or numeric Array index) to bind to this
     * Select control. (defaults to 'value')
     */
    valueField: 'value',

    /**
     * @cfg {String/Integer} displayField The underlying {@link Ext.data.Field#name data value name} (or numeric Array index) to bind to this
     * Select control. This resolved value is the visibly rendered value of the available selection options.
     * (defaults to 'text')
     */
    displayField: 'text',

    /**
     * @cfg {Ext.data.Store} store (Optional) store instance used to provide selection options data.
     */

    /**
     * @cfg {Array} options (Optional) An array of select options.
<pre><code>
    [
        {text: 'First Option',  value: 'first'},
        {text: 'Second Option', value: 'second'},
        {text: 'Third Option',  value: 'third'}
    ]
</code></pre>
     * Note: option object member names should correspond with defined {@link #valueField valueField} and {@link #displayField displayField} values.
     * This config will be ignore if a {@link #store store} instance is provided
     */
    
    /**
     * @cfg {String} hiddenName Specify a hiddenName if you're using the {@link Ext.form.FormPanel#standardSubmit standardSubmit} option.
     * This name will be used to post the underlying value of the select to the server.
     */
    
    // @cfg {Number} tabIndex @hide
    tabIndex: -1,

    // @cfg {Boolean} useMask @hide
    useMask: true,

    monitorOrientation: true,
    
    // @private
    initComponent: function() {
        var options = this.options;

        if (this.store) {
            this.store = Ext.StoreMgr.lookup(this.store);
        }
        else {
            this.store = new Ext.data.Store({
                fields: [this.valueField, this.displayField]
            });

            if (options && Ext.isArray(options) && options.length > 0) {
                this.setOptions(this.options);
            }
        }

        Ext.form.Select.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event change
             * Fires when an option selection has changed
             * @param {Ext.form.Select} this
             * @param {Mixed} value
             */
            'change'
        );
    },

    // @private
    onRender: function(){
        Ext.form.Select.superclass.onRender.apply(this, arguments);
        
        var name = this.hiddenName;
        if (name) {
            this.hiddenField = this.el.insertSibling({
                name: name,
                tag: 'input',
                type: 'hidden'
            }, 'after');
        }    
    },

    // @private
    getPicker: function() {
        if (!this.picker) {
            this.picker = new Ext.Picker({
                slots: [{
                    align       : 'center',
                    name        : this.name,
                    valueField  : this.valueField,
                    displayField: this.displayField,
                    value       : this.getValue(),
                    store       : this.store
                }],
                listeners: {
                    change: this.onPickerChange,
                    scope: this
                }
            });
        }

        return this.picker;
    },

    // @private
    getListPanel: function() {
        if (!this.listPanel) {
            this.listPanel = new Ext.Panel({
                floating         : true,
                stopMaskTapEvent : false,
                hideOnMaskTap    : true,
                cls              : 'x-select-overlay',
                scroll           : 'vertical',
                items: {
                    xtype: 'list',
                    store: this.store,
                    itemId: 'list',
                    scroll: false,
                    itemTpl : [
                        '<span class="x-list-label">{' + this.displayField + '}</span>',
                        '<span class="x-list-selected"></span>'
                    ],
                    listeners: {
                        select : this.onListSelect,
                        scope  : this
                    }
                }
            });
        }

        return this.listPanel;
    },

    // @private
    onOrientationChange: function() {
        if (this.listPanel && !this.listPanel.hidden && !Ext.is.Phone) {
            this.listPanel.showBy(this.el, false, false);
        }
    },

    // @private
    onMaskTap: function() {
        if (this.disabled) {
            return;
        }
        
        this.showComponent();
    },

    // @private
    showComponent: function() {
        if (Ext.is.Phone) {
            var picker = this.getPicker(),
                name   = this.name,
                value  = {};
                
            value[name] = this.getValue();
            picker.show();
            picker.setValue(value);
        }
        else {
            var listPanel = this.getListPanel(),
                index = this.store.findExact(this.valueField, this.value);

            listPanel.showBy(this.el, 'fade', false);
            listPanel.down('#list').getSelectionModel().select(index != -1 ? index: 0, false, true);
        }
    },

    // @private
    onListSelect: function(selModel, selected) {
        if (selected) {
            this.setValue(selected.get(this.valueField));
            this.fireEvent('change', this, this.getValue());
        }
        
        this.listPanel.hide({
            type: 'fade',
            out: true,
            scope: this
        });
    },

    // @private
    onPickerChange: function(picker, value) {
        var currentValue = this.getValue(),
            newValue = value[this.name];

        if (newValue != currentValue) {
            this.setValue(newValue);
            this.fireEvent('change', this, newValue);
        }
    },

    // Inherited docs
    setValue: function(value) {
        var idx = 0,
            hiddenField = this.hiddenField,
            record;

        if (value) {
            idx = this.store.findExact(this.valueField, value)
        } 
        record = this.store.getAt(idx);

        if (record && this.rendered) {
            this.fieldEl.dom.value = record.get(this.displayField);
            this.value = record.get(this.valueField);
            if (hiddenField) {
                hiddenField.dom.value = this.value;
            }
        } else {
            if (this.rendered) {
                this.fieldEl.dom.value = value;
            }
            this.value = value;
        }

        // Temporary fix, the picker should sync with the store automatically by itself
        if (this.picker) {
            var pickerValue = {};
            pickerValue[this.name] = this.value;
            this.picker.setValue(pickerValue);
        }
        
        return this;
    },

    // Inherited docs
    getValue: function(){
        return this.value;
    },

    /**
     * Updates the underlying &lt;options&gt; list with new values.
     * @param {Array} options An array of options configurations to insert or append.
     * @param {Boolean} append <tt>true</tt> to append the new options existing values.
<pre><code>
selectBox.setOptions(
    [   {text: 'First Option',  value: 'first'},
        {text: 'Second Option', value: 'second'},
        {text: 'Third Option',  value: 'third'}
    ]).setValue('third');
</code></pre>
     * Note: option object member names should correspond with defined {@link #valueField valueField} and
     * {@link #displayField displayField} values.
     * @return {Ext.form.Select} this
     */
    setOptions: function(options, append) {
        if (!options) {
            this.store.clearData();
            this.setValue(null);
        }
        else {
            this.store.loadData(options, append);
        }
    },

    destroy: function() {
        Ext.form.Select.superclass.destroy.apply(this, arguments);
        Ext.destroy(this.listPanel, this.picker, this.hiddenField);
    }
});

Ext.reg('selectfield', Ext.form.Select);

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('select', Ext.form.Select);
//</deprecated>
/**
 * @class Ext.form.TextArea
 * @extends Ext.form.Text
 * <p>Wraps a textarea. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype textareafield
 * @xtype textarea
 */
Ext.form.TextArea = Ext.extend(Ext.form.Text, {
    ui: 'textarea',

    /**
     * @cfg {Integer} maxRows The maximum number of lines made visible by the input. 
     */
    maxRows: undefined,
    
    autoCapitalize: false,

    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><div class="x-form-field-container">',
            '<textarea id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"',
            '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
            '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
            '<tpl if="style">style="{style}" </tpl>',
            '<tpl if="maxRows != undefined">rows="{maxRows}" </tpl>',
            '<tpl if="maxlength">maxlength="{maxlength}" </tpl>',
            '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
            '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
            '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
            '></textarea>',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
        '</div></tpl>'
    ],
    
    // @private
    onRender: function() {
        this.renderData.maxRows = this.maxRows;
        
        Ext.form.TextArea.superclass.onRender.apply(this, arguments);
    },

    onKeyUp: function(e) {
        this.fireEvent('keyup', this, e);
    }
});

Ext.reg('textareafield', Ext.form.TextArea);

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('textarea', Ext.form.TextArea);
//</deprecated>

/**
 * @class Ext.form.DatePicker
 * @extends Ext.form.Field
 * <p>Specialized field which has a button which when pressed, shows a {@link Ext.DatePicker}.</p>
 * @xtype datepickerfield
 * @alternateClassName Ext.form.DatePickerField
 */
Ext.form.DatePicker = Ext.extend(Ext.form.Field, {
    ui: 'select',
    
    /**
     * @cfg {Object/Ext.DatePicker} picker
     * An object that is used when creating the internal {@link Ext.DatePicker} component or a direct instance of {@link Ext.DatePicker}
     * Defaults to null
     */
    picker: null,

    /**
     * @cfg {Object/Date} value
     * Default value for the field and the internal {@link Ext.DatePicker} component. Accepts an object of 'year', 
     * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
     * 
     * Example: {year: 1989, day: 1, month: 5} = 1st May 1989 or new Date()
     */

    /**
     * @cfg {Boolean} destroyPickerOnHide
     * Whether or not to destroy the picker widget on hide. This save memory if it's not used frequently, 
     * but increase delay time on the next show due to re-instantiation. Defaults to false
     */
    destroyPickerOnHide: false,

    // @cfg {Number} tabIndex @hide

    // @cfg {Boolean} useMask @hide
    
    // @private
    initComponent: function() {
        this.addEvents(
            /**
             * @event change
             * Fires when a date is selected
             * @param {Ext.form.DatePicker} this
             * @param {Date} date The new date
             */
            'change'
        );

        this.tabIndex = -1;
        this.useMask = true;

        Ext.form.Text.superclass.initComponent.apply(this, arguments);
    },

    /**
     * Get an instance of the internal date picker; will create a new instance if not exist.
     * @return {Ext.DatePicker} datePicker
     */
    getDatePicker: function() {
        if (!this.datePicker) {
            if (this.picker instanceof Ext.DatePicker) {
                this.datePicker = this.picker;
            } else {
                this.datePicker = new Ext.DatePicker(Ext.apply(this.picker || {}));
            }

            this.datePicker.setValue(this.value || null);

            this.datePicker.on({
                scope : this,
                change: this.onPickerChange,
                hide  : this.onPickerHide
            });
        }

        return this.datePicker;
    },

    /**
     * @private
     * Listener to the tap event of the mask element. Shows the internal {@link #datePicker} component when the button has been tapped.
     */
    onMaskTap: function() {
        if (Ext.form.DatePicker.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false;
        }
        
        this.getDatePicker().show();
    },
    
    /**
     * Called when the picker changes its value
     * @param {Ext.DatePicker} picker The date picker
     * @param {Object} value The new value from the date picker
     * @private
     */
    onPickerChange : function(picker, value) {
        this.setValue(value);
        this.fireEvent('change', this, this.getValue());
    },
    
    /**
     * Destroys the picker when it is hidden, if
     * {@link Ext.form.DatePicker#destroyPickerOnHide destroyPickerOnHide} is set to true
     * @private
     */
    onPickerHide: function() {
        if (this.destroyPickerOnHide && this.datePicker) {
            this.datePicker.destroy();
        }
    },

    // inherit docs
    setValue: function(value, animated) {
        if (this.datePicker) {
            this.datePicker.setValue(value, animated);
            this.value = (value != null) ? this.datePicker.getValue() : null;
        } else {
            if (!Ext.isDate(value) && !Ext.isObject(value)) {
                value = null;
            }

            if (Ext.isObject(value)) {
                this.value = new Date(value.year, value.month-1, value.day);
            } else {
                this.value = value;
            }
        }

        if (this.rendered) {
            this.fieldEl.dom.value = this.getValue(true);
        }
        
        return this;
    },
    
    /**
     * Returns the value of the field, which will be a {@link Date} unless the <tt>format</tt> parameter is true.
     * @param {Boolean} format True to format the value with <tt>Ext.util.Format.defaultDateFormat</tt>
     */
    getValue: function(format) {
        var value = this.value || null;
        return (format && Ext.isDate(value)) ? value.format(Ext.util.Format.defaultDateFormat) : value;
    },
    
    // @private
    onDestroy: function() {
        if (this.datePicker) {
            this.datePicker.destroy();
        }
        
        Ext.form.DatePicker.superclass.onDestroy.call(this);
    }
});

Ext.reg('datepickerfield', Ext.form.DatePicker);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.DatePickerField = Ext.extend(Ext.form.DatePicker, {

    constructor: function() {
        console.warn("Ext.form.DatePickerField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.DatePicker instead");
        Ext.form.DatePickerField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>
