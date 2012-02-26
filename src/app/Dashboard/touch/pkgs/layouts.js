/**
 * @class Ext.LayoutManager
 * <p>Provides a registry of all Layouts (instances of {@link Ext.layout.Layout} or any subclass
 * thereof) on a page.
 * @singleton
 */
Ext.layout.LayoutManager = new Ext.AbstractManager({
    /**
     * Creates a new Component from the specified config object using the
     * config object's {@link Ext.component#xtype xtype} to determine the class to instantiate.
     * @param {Object} config A configuration object for the Component you wish to create.
     * @param {Constructor} defaultType The constructor to provide the default Component type if
     * the config object does not contain a <code>xtype</code>. (Optional if the config contains a <code>xtype</code>).
     * @return {Ext.Component} The newly instantiated Component.
     */
    create : function(config, defaultType) {
        if (!config) {
            config = defaultType;
        }
        if (Ext.isString(config)) {
            return new this.types[config || defaultType];
        }
        else if (Ext.isObject(config)) {
            if (config.isLayout) {
                return config;
            }
            else {
                return new this.types[config.type || defaultType](config);
            }
        }
    }
});

/**
 * Shorthand for {@link Ext.layout.LayoutManager#registerType}
 * @param {String} type The {@link Ext.layout.Layout#type mnemonic string} by which the Layout class
 * may be looked up.
 * @param {Constructor} cls The new Layout class.
 * @member Ext
 * @method regLayout
 */
Ext.regLayout = function() {
    return Ext.layout.LayoutManager.registerType.apply(Ext.layout.LayoutManager, arguments);
};
/**
 * @class Ext.layout.Layout
 * @extends Object
 * Base Layout class - extended by ComponentLayout and ContainerLayout
 */

Ext.layout.Layout = Ext.extend(Object, {
    isLayout: true,
    initialized: false,

    constructor : function(config) {
        this.id = Ext.id(null, 'ext-layout-' + this.type + '-');
        Ext.apply(this, config);
    },

    /**
     * @private
     */
    layout : function() {
        var me = this;
        me.layoutBusy = true;
        me.initLayout();

        if (me.beforeLayout.apply(me, arguments) !== false) {
            me.onLayout.apply(me, arguments);
            me.afterLayout();
            me.owner.needsLayout = false;
            me.layoutBusy = false;
        }
    },

    beforeLayout : function() {
        this.renderItems(this.getLayoutItems(), this.getTarget());
        return true;
    },

    /**
     * @private
     * Iterates over all passed items, ensuring they are rendered.  If the items are already rendered,
     * also determines if the items are in the proper place dom.
     */
    renderItems : function(items, target) {
        var ln = items.length,
            i = 0,
            item;

        for (; i < ln; i++) {
            item = items[i];
            if (item && !item.rendered) {
                this.renderItem(item, i, target);
            }
            else if (!this.isValidParent(item, target)) {
                this.moveItem(item, i, target);
            }
        }
    },

    /**
     * @private
     * Renders the given Component into the target Element.
     * @param {Ext.Component} c The Component to render
     * @param {Number} position The position within the target to render the item to
     * @param {Ext.Element} target The target Element
     */
    renderItem : function(item, position, target) {
        if (!item.rendered) {
            item.render(target, position);
            this.configureItem(item, position);
            this.childrenChanged = true;
        }
    },

    /**
     * @private
     * Moved Component to the provided target instead.
     */
    moveItem : function(item, position, target) {
        if (typeof position == 'number') {
            position = target.dom.childNodes[position];
        }
        // Make sure target is a dom element
        target = target.dom || target;
        target.insertBefore(item.el.dom, position || null);
        item.container = target;
        this.configureItem(item, position);
        this.childrenChanged = true;
    },

    /**
     * @private
     * Adds the layout's targetCls if necessary and sets
     * initialized flag when complete.
     */
    initLayout : function() {
        if (!this.initialized && !Ext.isEmpty(this.targetCls)) {
            this.getTarget().addCls(this.targetCls);
        }
        this.initialized = true;
    },

    // @private Sets the layout owner
    setOwner : function(owner) {
        this.owner = owner;
    },

    // @private - Returns empty array
    getLayoutItems : function() {
        return [];
    },

    // @private - Validates item is in the proper place in the dom.
    isValidParent : function(item, target) {
        var dom = item.el ? item.el.dom : Ext.getDom(item);
        return target && (dom.parentNode == (target.dom || target));
    },

    /**
     * @private
     * Applies itemCls
     */
    configureItem: function(item, position) {
        if (this.itemCls) {
            item.el.addCls(this.itemCls);
        }
    },
    
    // Placeholder empty functions for subclasses to extend
    onLayout : Ext.emptyFn,
    afterLayout : Ext.emptyFn,
    onRemove : Ext.emptyFn,
    onDestroy : Ext.emptyFn,

    /**
     * @private
     * Removes itemCls
     */
    afterRemove : function(item) {
        if (this.itemCls && item.rendered) {
            item.el.removeCls(this.itemCls);
        }
    },

    /*
     * Destroys this layout. This is a template method that is empty by default, but should be implemented
     * by subclasses that require explicit destruction to purge event handlers or remove DOM nodes.
     * @protected
     */
    destroy : function() {
        if (!Ext.isEmpty(this.targetCls)) {
            var target = this.getTarget();
            if (target) {
                target.removeCls(this.targetCls);
            }
        }
        this.onDestroy();
    }
});
/**
* @class Ext.layout.ComponentLayout
* @extends Ext.layout.Layout
* <p>This class is intended to be extended or created via the <tt><b>{@link Ext.Component#componentLayout layout}</b></tt>
* configuration property.  See <tt><b>{@link Ext.Component#componentLayout}</b></tt> for additional details.</p>
*/
Ext.layout.ComponentLayout = Ext.extend(Ext.layout.Layout, {
    type: 'component',

    monitorChildren: true,

    beforeLayout : function(width, height) {
        Ext.layout.ComponentLayout.superclass.beforeLayout.call(this);
        var owner = this.owner,
            isVisible = owner.isVisible(),
            layoutCollection;
        // If an ownerCt is hidden, add my reference onto the layoutOnShow stack.  Set the needsLayout flag.
        if (!isVisible && owner.hiddenOwnerCt) {
            layoutCollection = owner.hiddenOwnerCt.layoutOnShow;
            layoutCollection.remove(owner);
            layoutCollection.add(owner);
            owner.needsLayout = {
                width: width,
                height: height,
                isSetSize: false
            };
        }

        return isVisible && this.needsLayout(width, height);
    },

    /**
    * Check if the new size is different from the current size and only
    * trigger a layout if it is necessary.
    * @param {Mixed} width The new width to set.
    * @param {Mixed} height The new height to set.
    */
    needsLayout : function(width, height) {
        this.lastComponentSize = this.lastComponentSize || {
            width: -Infinity,
            height: -Infinity
        };

        var childrenChanged = this.childrenChanged;
        this.childrenChanged = false;

        return (childrenChanged || this.lastComponentSize.width !== width || this.lastComponentSize.height !== height);
    },

    /**
    * Set the size of any element supporting undefined, null, and values.
    * @param {Mixed} width The new width to set.
    * @param {Mixed} height The new height to set.
    */
    setElementSize: function(el, width, height) {
        if (width !== undefined && height !== undefined) {
            el.setSize(width, height);
        }
        else if (height !== undefined) {
            el.setHeight(height);
        }
        else if (width !== undefined) {
            el.setWidth(width);
        }
    },

    /**
    * Returns the owner component's resize element.
    * @return {Ext.Element}
    */
    getTarget : function() {
        return this.owner.el;
    },

    /**
    * Set the size of the target element.
    * @param {Mixed} width The new width to set.
    * @param {Mixed} height The new height to set.
    */
    setTargetSize : function(width, height) {
        this.setElementSize(this.owner.el, width, height);
        this.lastComponentSize = {
            width: width,
            height: height
        };
    },

    afterLayout : function() {
        var owner = this.owner,
            layout = owner.layout,
            ownerCt = owner.ownerCt,
            ownerCtSize, activeSize, ownerSize, width, height;

        owner.afterComponentLayout(this);

        // Run the container layout if it exists (layout for child items)
        if (layout && layout.isLayout) {
            layout.layout();
        }

        if (ownerCt && ownerCt.componentLayout && ownerCt.componentLayout.monitorChildren && !ownerCt.componentLayout.layoutBusy) {
            ownerCt.componentLayout.childrenChanged = true;

            // If the ownerCt isn't running a containerLayout, run doComponentLayout now.
            if (ownerCt.layout && !ownerCt.layout.layoutBusy) {
                if (ownerCt.layout.type == 'autocontainer') {
                    ownerCt.doComponentLayout(width, height);
                }
                else {
                    ownerCt.layout.layout();
                }
            }
        }
    }
});

/**
 * @class Ext.layout.AutoComponentLayout
 * @extends Ext.layout.ComponentLayout
 *
 * <p>The AutoLayout is the default layout manager delegated by {@link Ext.Component} to
 * render any child Elements when no <tt>{@link Ext.Component#layout layout}</tt> is configured.</p>
 */
Ext.layout.AutoComponentLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: 'autocomponent',

    onLayout : function(width, height) {
        this.setTargetSize(width, height);
    }
});

Ext.regLayout('autocomponent', Ext.layout.AutoComponentLayout);

/**
 * @class Ext.layout.DockLayout
 * @extends Ext.layout.ComponentLayout
 * This ComponentLayout handles docking for Panels. It takes care of panels that are
 * part of a ContainerLayout that sets this Panel's size and Panels that are part of
 * an AutoContainerLayout in which this panel get his height based of the CSS or
 * or its content.
 */
Ext.layout.DockLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: 'dock',

    /**
     * @property itemCls
     * @type String
     * This class is automatically added to each docked item within this layout.
     * We also use this as a prefix for the position class e.g. x-docked-bottom
     */
    itemCls: 'x-docked',

    /**
     * @protected
     * @param {Ext.Component} owner The Panel that owns this DockLayout
     * @param {Ext.Element} target The target in which we are going to render the docked items
     * @param {Array} args The arguments passed to the ComponentLayout.layout method
     */
    onLayout: function(width, height) {
        var me = this,
            owner = me.owner,
            body = owner.body,
            ownerCt = owner.ownerCt,
            layout = owner.layout,
            collapsed = owner.collapsed,
            contracted = owner.contracted,
            expanded = owner.expanded,
            headerItem = me.headerItem,
            target = me.getTarget(),
            autoWidth = false,
            autoHeight = false,
            animTo;

        // We start of by resetting all the layouts info
        var info = me.info = {
            boxes: [],
            size: {
                width: width,
                height: height
            },
            padding: {
                top: target.getPadding('t'),
                right: target.getPadding('r'),
                bottom: target.getPadding('b'),
                left: target.getPadding('l')
            },
            border: {
                top: target.getBorderWidth('t'),
                right: target.getBorderWidth('r'),
                bottom: target.getBorderWidth('b'),
                left: target.getBorderWidth('l')
            },
            bodyMargin: {
                top: body.getMargin('t'),
                right: body.getMargin('r'),
                bottom: body.getMargin('b'),
                left: body.getMargin('l')
            },
            bodyBox: {}
        };

        // Determine if we have an autoHeight or autoWidth.
        if (height === undefined || height === null || width === undefined || width === null || contracted) {
            // Auto-everything, clear out any style height/width and read from css
            if ((height === undefined || height === null) && (width === undefined || width === null)) {
                autoHeight = true;
                autoWidth = true;
                if (!owner.animCollapse || (!expanded && !contracted)) {
                    me.setTargetSize(null, null);
                }
                me.setBodyBox({width: null, height: null});
            }
            // Auto-height
            else if (height === undefined || height === null) {
                autoHeight = true;
                // Clear any sizing that we already set in a previous layout
                if (!owner.animCollapse || (!expanded && !contracted)) {
                    me.setTargetSize(width, null);
                }
                me.setBodyBox({width: width, height: null});
            // Auto-width
            }
            else {
                autoWidth = true;
                // Clear any sizing that we already set in a previous layout
                if (!owner.animCollapse || (!expanded && !contracted)) {
                    me.setTargetSize(null, height);
                }
                me.setBodyBox({width: null, height: height});
            }

            // Run the container
            if (!collapsed && layout && layout.isLayout) {
                layout.layout();
            }

            // The dockItems method will add all the top and bottom docked items height
            // to the info.panelSize height. Thats why we have to call setSize after
            // we dock all the items to actually set the panel's width and height.
            // We have to do this because the panel body and docked items will be position
            // absolute which doesnt stretch the panel.
            me.dockItems(autoWidth, autoHeight);
            if (collapsed) {
                if (headerItem) {
                    if (headerItem.dock == 'top' || headerItem.dock == 'bottom') {
                        info.size.height = headerItem.getHeight();
                    }
                    else {
                        info.size.width = headerItem.getWidths();
                    }
                } else {
                    info.size.height = 0;
                }
            }
            if (expanded || contracted) {
                if (owner.animCollapse) {
                    Ext.createDelegate(owner.animCollapseFn, owner, [info.size.width, info.size.height])();
                }
                else {
                    Ext.createDelegate(owner['after' + (expanded ? 'Expand' : 'Collapse')], owner)();
                    me.setTargetSize(info.size.width, info.size.height);
                }
            }
            else {
                me.setTargetSize(info.size.width, info.size.height);
            }
        }
        else {
            // If we get inside this else statement, it means that the Panel has been
            // given a size by its parents container layout. In this case we want to
            // actualy set the Panel's dimensions and dock all the items.
            if (expanded || contracted) {
                if (owner.animCollapse) {
                    Ext.createDelegate(owner.animCollapseFn, owner, [width, height])();
                }
                else {
                    Ext.createDelegate(owner['after' + (expanded ? 'Expand' : 'Collapse')], owner)();
                    me.setTargetSize(width, height);
                }
            }
            else {
                me.setTargetSize(width, height);
                me.dockItems();
            }
        }
        Ext.layout.DockLayout.superclass.onLayout.call(me, width, height);
    },

    afterLayout : function() {
        Ext.layout.DockLayout.superclass.afterLayout.call(this);
    },

    /**
     * @protected
     * This method will first update all the information about the docked items,
     * body dimensions and position, the panel's total size. It will then
     * set all these values on the docked items and panel body.
     * @param {Array} items Array containing all the docked items
     * @param {Boolean} autoBoxes Set this to true if the Panel is part of an
     * AutoContainerLayout
     */
    dockItems : function(autoWidth, autoHeight) {
        this.calculateDockBoxes(autoWidth, autoHeight);

        // Both calculateAutoBoxes and calculateSizedBoxes are changing the
        // information about the body, panel size, and boxes for docked items
        // inside a property called info.
        var info = this.info,
            collapsed = this.owner.collapsed,
            boxes = info.boxes,
            ln = boxes.length,
            dock, i;

        // We are going to loop over all the boxes that were calculated
        // and set the position of each item the box belongs to.
        for (i = 0; i < ln; i++) {
            dock = boxes[i];
            if (collapsed === true && !dock.isHeader) {
                continue;
            }
            dock.item.setPosition(dock.x, dock.y);
        }

        // If the bodyBox has been adjusted because of the docked items
        // we will update the dimensions and position of the panel's body.
        if (autoWidth) {
            info.bodyBox.width = null;
        }
        if (autoHeight) {
            info.bodyBox.height = null;
        }
        this.setBodyBox(info.bodyBox);
    },

    /**
     * @protected
     * This method will set up some initial information about the panel size and bodybox
     * and then loop over all the items you pass it to take care of stretching, aligning,
     * dock position and all calculations involved with adjusting the body box.
     * @param {Array} items Array containing all the docked items we have to layout
     */
    calculateDockBoxes : function(autoWidth, autoHeight) {
        // We want to use the Panel's el width, and the Panel's body height as the initial
        // size we are going to use in calculateDockBoxes. We also want to account for
        // the border of the panel.
        var me = this,
            target = me.getTarget(),
            items = me.getLayoutItems(),
            owner = me.owner,
            contracted = owner.contracted,
            expanded = owner.expanded,
            bodyEl = owner.body,
            info = me.info,
            size = info.size,
            ln = items.length,
            padding = info.padding,
            border = info.border,
            item, i, box, w, h, itemEl, vis;

        // If this Panel is inside an AutoContainerLayout, we will base all the calculations
        // around the height of the body and the width of the panel.
        if (autoHeight) {
            size.height = bodyEl.getHeight() + padding.top + border.top + padding.bottom + border.bottom;
        }
        else {
            size.height = target.getHeight() - target.getMargin('tb');
        }
        
        if (autoWidth) {
            size.width = bodyEl.getWidth() + padding.left + border.left + padding.right + border.right;
        }
        else {
            size.width = target.getWidth() - target.getMargin('lr');
        }

        info.bodyBox = {
            x: border.left + padding.left,
            y: border.top + padding.top,
            width: size.width - padding.left - border.left - padding.right - border.right,
            height: size.height - border.top - padding.top - border.bottom - padding.bottom
        };

        // Loop over all the docked items
        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.isHeader) {
                me.headerItem = item;
            }
            // The initBox method will take care of stretching and alignment
            // In some cases it will also layout the dock items to be able to
            // get a width or height measurement
            box = me.initBox(item);

            if (autoHeight === true) {
                box = me.adjustAutoBox(box, i);
            }
            else {
                box = me.adjustSizedBox(box, i);
            }

            // Save our box. This allows us to loop over all docked items and do all
            // calculations first. Then in one loop we will actually size and position
            // all the docked items that have changed.
            info.boxes.push(box);
        }
    },

    /**
     * @protected
     * This method will adjust the position of the docked item and adjust the body box
     * accordingly.
     * @param {Object} box The box containing information about the width and height
     * of this docked item
     * @param {Number} index The index position of this docked item
     * @return {Object} The adjusted box
     */
    adjustSizedBox : function(box, index) {
        var bodyBox = this.info.bodyBox;
        switch (box.type) {
            case 'top':
                box.y = bodyBox.y;
                break;

            case 'left':
                box.x = bodyBox.x;
                break;

            case 'bottom':
                box.y = (bodyBox.y + bodyBox.height) - box.height;
                break;

            case 'right':
                box.x = (bodyBox.x + bodyBox.width) - box.width;
                break;
        }

        // If this is not an overlaying docked item, we have to adjust the body box
        if (!box.overlay) {
            switch (box.type) {
                case 'top':
                    bodyBox.y += box.height;
                    bodyBox.height -= box.height;
                    break;

                case 'left':
                    bodyBox.x += box.width;
                    bodyBox.width -= box.width;
                    break;

                case 'bottom':
                    bodyBox.height -= box.height;
                    break;

                case 'right':
                    bodyBox.width -= box.width;
                    break;
            }
        }
        return box;
    },

    /**
     * @protected
     * This method will adjust the position of the docked item inside an AutoContainerLayout
     * and adjust the body box accordingly.
     * @param {Object} box The box containing information about the width and height
     * of this docked item
     * @param {Number} index The index position of this docked item
     * @return {Object} The adjusted box
     */
    adjustAutoBox : function (box, index) {
        var info = this.info,
            bodyBox = info.bodyBox,
            size = info.size,
            boxes = info.boxes,
            pos = box.type,
            i, adjustBox;

        if (pos == 'top' || pos == 'bottom') {
            // This can affect the previously set left and right and bottom docked items
            for (i = 0; i < index; i++) {
                adjustBox = boxes[i];
                if (adjustBox.stretched && adjustBox.type == 'left' || adjustBox.type == 'right') {
                    adjustBox.height += box.height;
                }
                else if (adjustBox.type == 'bottom') {
                    adjustBox.y += box.height;
                }
            }
        }

        switch (pos) {
            case 'top':
                box.y = bodyBox.y;
                if (!box.overlay) {
                    bodyBox.y += box.height;
                }
                size.height += box.height;
                break;

            case 'bottom':
                box.y = (bodyBox.y + bodyBox.height);
                size.height += box.height;
                break;

            case 'left':
                box.x = bodyBox.x;
                if (!box.overlay) {
                    bodyBox.x += box.width;
                    bodyBox.width -= box.width;
                }
                break;

            case 'right':
                if (!box.overlay) {
                    bodyBox.width -= box.width;
                }
                box.x = (bodyBox.x + bodyBox.width);
                break;
        }
        return box;
    },

    /**
     * @protected
     * This method will create a box object, with a reference to the item, the type of dock
     * (top, left, bottom, right). It will also take care of stretching and aligning of the
     * docked items.
     * @param {Ext.Component} item The docked item we want to initialize the box for
     * @return {Object} The initial box containing width and height and other useful information
     */
    initBox : function(item) {
        var bodyBox = this.info.bodyBox,
            horizontal = (item.dock == 'top' || item.dock == 'bottom'),
            box = {
                item: item,
                overlay: item.overlay,
                type: item.dock
            };
        // First we are going to take care of stretch and align properties for all four dock scenarios.
        if (item.stretch !== false) {
            box.stretched = true;
            if (horizontal) {
                box.x = bodyBox.x;
                box.width = bodyBox.width;
                item.doComponentLayout(box.width - item.el.getMargin('lr'));
            }
            else {
                box.y = bodyBox.y;
                box.height = bodyBox.height;
                item.doComponentLayout(undefined, box.height - item.el.getMargin('tb'));
            }
        }
        else {
            item.doComponentLayout();
            box.width = item.getWidth();
            box.height = item.getHeight();
            if (horizontal) {
                box.x = (item.align == 'right') ? bodyBox.width - box.width : bodyBox.x;
            }
        }

        // If we havent calculated the width or height of the docked item yet
        // do so, since we need this for our upcoming calculations
        if (box.width == undefined) {
            box.width = item.getWidth() + item.el.getMargin('lr');
        }
        if (box.height == undefined) {
            box.height = item.getHeight() + item.el.getMargin('tb');
        }

        return box;
    },

    /**
     * @protected
     * Returns an array containing all the docked items inside this layout's owner panel
     * @return {Array} An array containing all the docked items of the Panel
     */
    getLayoutItems : function() {
        return this.owner.getDockedItems();
    },

    /**
     * @protected
     * This function will be called by the dockItems method. Since the body is positioned absolute,
     * we need to give it dimensions and a position so that it is in the middle surrounded by
     * docked items
     * @param {Object} box An object containing new x, y, width and height values for the
     * Panel's body
     */
    setBodyBox : function(box) {
        var me = this,
            owner = me.owner,
            body = owner.body,
            contracted = owner.contracted,
            expanded = owner.expanded,
            info = me.info,
            bodyMargin = info.bodyMargin,
            padding = info.padding,
            border = info.border;

        if (Ext.isNumber(box.width)) {
            box.width -= bodyMargin.left + bodyMargin.right;
        }
        if (Ext.isNumber(box.height)) {
            box.height -= bodyMargin.top + bodyMargin.bottom;
        }

        me.setElementSize(body, box.width, box.height);
        body.setLeft(box.x - padding.left - border.left);
        body.setTop(box.y - padding.top - border.top);
    },

    /**
     * @protected
     * We are overriding the Ext.layout.Layout configureItem method to also add a class that
     * indicates the position of the docked item. We use the itemCls (x-docked) as a prefix.
     * An example of a class added to a dock: right item is x-docked-right
     * @param {Ext.Component} item The item we are configuring
     */
    configureItem : function(item, pos) {
        Ext.layout.DockLayout.superclass.configureItem.call(this, item, pos);

        var el = item.el || Ext.get(item);
        if (this.itemCls) {
            el.addCls(this.itemCls + '-' + item.dock);
        }
    },

    afterRemove : function(item) {
        Ext.layout.DockLayout.superclass.afterRemove.call(this, item);
        if (this.itemCls) {
            item.el.removeCls(this.itemCls + '-' + item.dock);
        }
        var dom = item.el.dom;
        
        if (dom) {
            dom.parentNode.removeChild(dom);
        }
        
        this.childrenChanged = true;
    }
});

Ext.regLayout('dock', Ext.layout.DockLayout);
/**
 * @class Ext.layout.FieldLayout
 * @extends Ext.layout.ComponentLayout
 *
 * <p>The FieldLayout is the default layout manager delegated by {@link Ext.Field} to
 * render field Elements.</p>
 */
Ext.layout.FieldLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: 'field',

    // @private
    onLayout: function(width, height) {
        Ext.layout.FieldLayout.superclass.onLayout.call(this, owner, target);

        this.setTargetSize(width, height);
        //this.handleLabel();
    },

    // @private - Set width of the label
    handleLabel : function() {
        this.owner.labelEl.setWidth(this.owner.labelWidth);
    }
});

Ext.regLayout('field', Ext.layout.FieldLayout);

/**
* @class Ext.layout.ContainerLayout
* @extends Ext.layout.Layout
* <p>This class is intended to be extended or created via the <tt><b>{@link Ext.Container#layout layout}</b></tt>
* configuration property.  See <tt><b>{@link Ext.Container#layout}</b></tt> for additional details.</p>
*/
Ext.layout.ContainerLayout = Ext.extend(Ext.layout.Layout, {
    type: 'container',
        
    /**
     * @cfg {String} itemCls
     * <p>An optional extra CSS class that will be added to the container. This can be useful for adding
     * customized styles to the container or any of its children using standard CSS rules. See
     * {@link Ext.Component}.{@link Ext.Component#ctCls ctCls} also.</p>
     * </p>
     */
     
    /**
     * Returns an array of child components.
     * @return {Array} of child components
     */
    getLayoutItems : function() {
        return this.owner && this.owner.items && this.owner.items.items || [];
    },
    
    afterLayout : function() {
        this.owner.afterLayout(this);
    },    
    /**
    * Returns the owner component's resize element.
    * @return {Ext.Element}
    */
    getTarget : function() {
        return this.owner.getTargetEl();
    }
});

/**
 * @class Ext.layout.AutoContainerLayout
 * @extends Ext.layout.ContainerLayout
 *
 * <p>The AutoLayout is the default layout manager delegated by {@link Ext.Container} to
 * render any child Components when no <tt>{@link Ext.Container#layout layout}</tt> is configured into
 * a <tt>{@link Ext.Container Container}.</tt>.  AutoLayout provides only a passthrough of any layout calls
 * to any child containers.</p>
 */
Ext.layout.AutoContainerLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: 'autocontainer',

    // @private
    onLayout : function(owner, target) {
        var items = this.getLayoutItems(),
            ln = items.length, i;
        for (i = 0; i < ln; i++) {
            items[i].doComponentLayout();
        }
    }
});

Ext.regLayout('auto', Ext.layout.AutoContainerLayout);
Ext.regLayout('autocontainer', Ext.layout.AutoContainerLayout);
/**
 * @class Ext.layout.FitLayout
 * @extends Ext.layout.ContainerLayout
 * <p>This is a base class for layouts that contain <b>a single item</b> that automatically expands to fill the layout's
 * container.  This class is intended to be extended or created via the <tt>layout:'fit'</tt> {@link Ext.Container#layout}
 * config, and should generally not need to be created directly via the new keyword.</p>
 * <p>FitLayout does not have any direct config options (other than inherited ones).  To fit a panel to a container
 * using FitLayout, simply set layout:'fit' on the container and add a single panel to it.  If the container has
 * multiple panels, only the first one will be displayed.</p>
 */
Ext.layout.FitLayout = Ext.extend(Ext.layout.ContainerLayout, {
    itemCls: 'x-fit-item',
    targetCls: 'x-layout-fit',
    type: 'fit',
    
    // @private
    onLayout : function() {
        Ext.layout.FitLayout.superclass.onLayout.call(this);

        if (this.owner.items.length) {
            var box = this.getTargetBox(),
                item = this.owner.items.get(0);
            
            this.setItemBox(item, box);
            item.cancelAutoSize = true;
        }
    },

    getTargetBox : function() {
        var target = this.getTarget(),
            size = target.getSize(),
            padding = {
                left: target.getPadding('l'),
                right: target.getPadding('r'),
                top: target.getPadding('t'),
                bottom: target.getPadding('b')
            }, 
            border = {
                left: target.getBorderWidth('l'),
                right: target.getBorderWidth('r'),
                top: target.getBorderWidth('t'),
                bottom: target.getBorderWidth('b')
            };
            
        return {
            width: size.width- padding.left - padding.right - border.left - border.right,
            height: size.height - padding.top - padding.bottom - border.top - border.bottom,
            x: padding.left + border.left,
            y: padding.top + border.top
        };        
    },
    
    // @private
    setItemBox : function(item, box) {
        if (item && box.height > 0) {
            // copy the target box because it gets used again in the card layout
            box = Ext.apply({}, box);
            box.width -= item.el.getMargin('lr');
            box.height -= item.el.getMargin('tb');
            item.setCalculatedSize(box);
            item.setPosition(box);
        }
    }
});

Ext.regLayout('fit', Ext.layout.FitLayout);

/**
 * @class Ext.layout.CardLayout
 * @extends Ext.layout.FitLayout
 * <p>This layout manages multiple child Components, each is fit to the Container, where only a single child Component
 * can be visible at any given time.  This layout style is most commonly used for wizards, tab implementations, etc.
 * This class is intended to be extended or created via the layout:'card' {@link Ext.Container#layout} config,
 * and should generally not need to be created directly via the new keyword.</p>
 * <p>The CardLayout's focal method is {@link #setActiveItem}.  Since only one panel is displayed at a time,
 * the only way to move from one Component to the next is by calling setActiveItem, passing the id or index of
 * the next panel to display.  The layout itself does not provide a user interface for handling this navigation,
 * so that functionality must be provided by the developer.</p>
 * <p>Containers that are configured with a card layout will have a method setActiveItem dynamically added to it. 
 * <pre><code>
      var p = new Ext.Panel({
          fullscreen: true,
          layout: 'card',
          items: [{
              html: 'Card 1'
          },{
              html: 'Card 2'
          }]
      });
      p.setActiveItem(1);
   </code></pre>
 * </p>
 */

Ext.layout.CardLayout = Ext.extend(Ext.layout.FitLayout, {
    type: 'card',

    sizeAllCards: false,
    hideInactive: true,

    beforeLayout: function() {
        this.activeItem = this.getActiveItem();
        return Ext.layout.CardLayout.superclass.beforeLayout.apply(this, arguments);
    },

    onLayout: function() {
        Ext.layout.FitLayout.superclass.onLayout.apply(this, arguments);

        var activeItem = this.activeItem,
            items = this.getLayoutItems(),
            ln = items.length,
            targetBox = this.getTargetBox(),
            i,
            item;

        for (i = 0; i < ln; i++) {
            item = items[i];
            this.setItemBox(item, targetBox);
        }

        if (!this.firstActivated && activeItem) {
            if (activeItem.fireEvent('beforeactivate', activeItem) !== false) {
                activeItem.fireEvent('activate', activeItem);
            }
            this.firstActivated = true;
        }
    },

    /**
     * Return the active (visible) component in the layout.
     * @returns {Ext.Component}
     */
    getActiveItem: function() {
        if (!this.activeItem && this.owner) {
            this.activeItem = this.parseActiveItem(this.owner.activeItem);
        }

        if (this.activeItem && this.owner.items.items.indexOf(this.activeItem) != -1) {
            return this.activeItem;
        }

        return null;
    },

    // @private
    parseActiveItem: function(item) {
        if (item && item.isComponent) {
            return item;
        }
        else if (typeof item == 'number' || item == undefined) {
            return this.getLayoutItems()[item || 0];
        }
        else {
            return this.owner.getComponent(item);
        }
    },

    // @private
    configureItem: function(item, position) {
        Ext.layout.FitLayout.superclass.configureItem.call(this, item, position);
        if (this.hideInactive && this.activeItem !== item) {
            item.hide();
        }
        else {
            item.show();
        }
    },

    onRemove: function(component) {
        if (component === this.activeItem) {
            this.activeItem = null;
            if (this.owner.items.getCount() == 0) {
                this.firstActivated = false;
            }
        }
    },

    // @private
    getAnimation: function(newCard, owner) {
        var newAnim = (newCard || {}).cardSwitchAnimation;
        if (newAnim === false) {
            return false;
        }
        return newAnim || owner.cardSwitchAnimation;
    },

    /**
     * Sets the active (visible) item in the layout.
     * @param {String/Number} item The string component id or numeric index of the item to activate
     */
    setActiveItem: function(newCard, animation) {
        var me = this,
            owner = me.owner,
            doc = Ext.getDoc(),
            oldCard = me.activeItem,
            newIndex;
        
        animation = (animation == undefined) ? this.getAnimation(newCard, owner) : animation;

        newCard = me.parseActiveItem(newCard);
        newIndex = owner.items.indexOf(newCard);


        // If the card is not a child of the owner, then add it
        if (newIndex == -1) {
            owner.add(newCard);
        }

        // Is this a valid, different card?
        if (newCard && oldCard != newCard && owner.onBeforeCardSwitch(newCard, oldCard, newIndex, !!animation) !== false) {
            // If the card has not been rendered yet, now is the time to do so.
            if (!newCard.rendered) {
                this.layout();
            }

            // Fire the beforeactivate and beforedeactivate events on the cards
            if (newCard.fireEvent('beforeactivate', newCard, oldCard) === false) {
                return false;
            }
            if (oldCard && oldCard.fireEvent('beforedeactivate', oldCard, newCard) === false) {
                return false;
            }
                        
            // Make sure the new card is shown
            if (newCard.hidden) {
                newCard.show();
            }

            me.activeItem = newCard;

            if (animation) {
                doc.on('click', Ext.emptyFn, me, {
                    single: true,
                    preventDefault: true
                });

                Ext.Anim.run(newCard, animation, {
                    out: false,
                    autoClear: true,
                    scope: me,
                    after: function() {
                        Ext.defer(function() {
                            doc.un('click', Ext.emptyFn, me);
                        },
                        50, me);

                        newCard.fireEvent('activate', newCard, oldCard);

                        if (!oldCard) {
                            // If there is no old card, the we have to make sure that we fire
                            // onCardSwitch here.
                            owner.onCardSwitch(newCard, oldCard, newIndex, true);
                        }
                    }
                });

                if (oldCard) {
                    Ext.Anim.run(oldCard, animation, {
                        out: true,
                        autoClear: true,
                        after: function() {
                            oldCard.fireEvent('deactivate', oldCard, newCard);
                            if (me.hideInactive && me.activeItem != oldCard) {
                                oldCard.hide();
                            }

                            // We fire onCardSwitch in the after of the oldCard animation
                            // because that is the last one to fire, and we want to make sure
                            // both animations are finished before firing it.
                            owner.onCardSwitch(newCard, oldCard, newIndex, true);
                        }
                    });
                }
            }
            else {
                newCard.fireEvent('activate', newCard, oldCard);
                if (oldCard) {
                    oldCard.fireEvent('deactivate', oldCard, newCard);
                    if (me.hideInactive) {
                        oldCard.hide();
                    }
                }
                owner.onCardSwitch(newCard, oldCard, newIndex, false);
            }

            return newCard;
        }

        return false;
    },

    /**
     * Return the active (visible) component in the layout to the next card, optional wrap parameter to wrap to the first
     * card when the end of the stack is reached.
     * @param {boolean} wrap Wrap to the first card when the end of the stack is reached.
     * @returns {Ext.Component}
     */
    getNext: function(wrap) {
        var items = this.getLayoutItems(),
            index = items.indexOf(this.activeItem);
        return items[index + 1] || (wrap ? items[0] : false);
    },

    /**
     * Sets the active (visible) component in the layout to the next card, optional wrap parameter to wrap to the first
     * card when the end of the stack is reached.
     * @param {Mixed} anim Animation to use for the card transition
     * @param {boolean} wrap Wrap to the first card when the end of the stack is reached.
     */
    next: function(anim, wrap) {
        return this.setActiveItem(this.getNext(wrap), anim);
    },

    /**
     * Return the active (visible) component in the layout to the previous card, optional wrap parameter to wrap to
     * the last card when the beginning of the stack is reached.
     * @param {boolean} wrap Wrap to the first card when the end of the stack is reached.
     * @returns {Ext.Component}
     */
    getPrev: function(wrap) {
        var items = this.getLayoutItems(),
            index = items.indexOf(this.activeItem);
        return items[index - 1] || (wrap ? items[items.length - 1] : false);
    },

    /**
     * Sets the active (visible) component in the layout to the previous card, optional wrap parameter to wrap to
     * the last card when the beginning of the stack is reached.
     * @param {Mixed} anim Animation to use for the card transition
     * @param {boolean} wrap Wrap to the first card when the end of the stack is reached.
     */
    prev: function(anim, wrap) {
        return this.setActiveItem(this.getPrev(wrap), anim);
    }
});

Ext.regLayout('card', Ext.layout.CardLayout);
/**
 * @class Ext.layout.BoxLayout
 * @extends Ext.layout.ContainerLayout
 * <p>Base Class for HBoxLayout and VBoxLayout Classes. Generally it should not need to be used directly.</p>
 */
Ext.layout.BoxLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: 'box',

    targetCls: 'x-layout-box',
    //wrapCls: 'x-layout-box-wrap',
    innerCls: 'x-layout-box-inner',

    // document these properties on their subclasses
    pack : 'start',
    align: 'center',

    notifyOwnerCtContainer: true,

    fixedLayout: false,

    /**
     * @cfg {String} direction Specifies the direction in which child components are laid out. Defaults
     * to <tt>'normal'</tt>, which means they are laid out in the order they are added. You can use the
     * <tt>'reverse'</tt> option to have them laid out in reverse.
     */
    direction: 'normal',

    /**
     * @private
     * Runs the child box calculations and caches them in childBoxCache. Subclasses can used these cached values
     * when laying out
     */
    onLayout: function() {
        Ext.layout.BoxLayout.superclass.onLayout.call(this);
        
        if (this.pack === 'left' || this.pack === 'top') {
            this.pack = 'start';
        } else if (this.pack === 'right' || this.pack === 'bottom') {
            this.pack = 'end';
        }

        var target = this.getTarget(),
            ct = target.parent(),
            targetWidth = (ct.getWidth() - ct.getPadding('lr') - ct.getBorderWidth('lr')) + 'px',
            targetHeight = (ct.getHeight() - ct.getPadding('tb') - ct.getBorderWidth('tb')) + 'px';
            
        target.setStyle({
            '-webkit-box-orient': this.orientation,
            '-webkit-box-direction': this.direction,
            '-webkit-box-pack': this.pack,
            '-webkit-box-align': this.align
        });
        
        if (this.orientation == 'horizontal') {
            target.setStyle({
                'min-width': targetWidth,
                'height': targetHeight
            });
        } else {
            target.setStyle({
                'min-height': targetHeight,
                'width': targetWidth
            });
        }

        this.prepareFlexedItems();
        this.setFlexedItems();
    },
    
    prepareFlexedItems : function() {        
        var items = this.getLayoutItems(),
            ln = items.length,
            item, i;

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.flex != undefined) {
                item.el.setStyle('position', 'absolute');
                item.boxEl = this.createBoxEl(item);
            } else {
                item.doComponentLayout();
            }
        }
    },    
        
    setFlexedItems : function() {
        var items = this.getLayoutItems(),
            ln = items.length,
            item, i;
            
        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.flex != undefined) {
                item.boxSize = item.boxEl.getSize();
            }
        }

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.flex != undefined) {
                item.el.setStyle('position', '');
                if (this.align == 'stretch') {
                    item.setSize(item.boxSize);
                } else {
                    if (this.orientation == 'horizontal') {
                        item.setWidth(item.boxSize.width);
                    } else {
                        item.setHeight(item.boxSize.height);
                    }
                }                
                item.boxEl.remove();
                delete item.boxEl;
                delete item.boxSize;
            }
        }
    },
    
    getTarget : function() {
        var owner = this.owner,
            innerCt = this.innerCt;
        
        if (!innerCt) {
            if (owner.scrollEl) {
                innerCt = owner.scrollEl.addCls(this.innerCls);
            } else {
                innerCt = owner.getTargetEl().createChild({cls: this.innerCls});
            }
            this.innerCt = innerCt;
        }

        return innerCt;
    },
    
    createBoxEl : function(item) {
        var el = item.el;
        return el.insertSibling({
            style: 'margin-top: ' + el.getMargin('tb') + 'px; margin-left: ' + el.getMargin('lr') + 'px; -webkit-box-flex: ' + item.flex
        });
    }
});

/**
 * @class Ext.layout.HBoxLayout
 * @extends Ext.layout.BoxLayout
 * <p>A layout that arranges items horizontally across a Container. This layout optionally divides available horizontal
 * space between child items containing a numeric <code>flex</code> configuration. The flex option is a ratio that
 * distributes width after any items with explicit widths have been accounted for. In the code below, the width is calculated
 * as follows:
 * <ul>
 *     <li>The fixed width item is subtracted, leaving us with 300 width</li>
 *     <li>The total flex number is counted, in this case, it is 3</li>
 *     <li>The ratio is then calculated, 300 / 3 = 100</li>
 *     <li>The first item has a flex of 2, so it is set to 2 * 100</li>
 *     <li>The other remaining item is set to 1 * 100</li>
 * </ul></p>
 * <pre><code>
new Ext.Container({
    width: 400,
    height: 300,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        flex: 2,
        html: 'First'
    },{
        width: 100,
        html: 'Second'
    },{
        flex: 1,
        html: 'Third'
    }]
});
 * </code></pre>
 * This layout may also be used to set the heights of child items by configuring it with the {@link #align} option.
 */
Ext.layout.HBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: 'horizontal'
    
    /**
     * @cfg {String} pack
     * Specifies the horizontal alignment of child components. Defaults to <tt>'start'</tt>. Acceptable values are:
     * <ul>
     * <li><b>center</b> : <div class="sub-desc">
     * Aligned to the center of the container.
     * </div></li>
     * 
     * <li><b>end</b> : <div class="sub-desc">
     * Aligned to the right of the container.
     * </div></li>
     * 
     * <li><b>justify</b> : <div class="sub-desc">
     * Justified with both the left and right of the container.
     * </div></li>
     * 
     * <li><b>start</b> : <div class="sub-desc">
     * Aligned to the left of the container.
     * </div></li>
     * </ul>
     */
    
    /**
     * @cfg {String} align Specifies the vertical alignment of child components. Defaults to <tt>'center'</tt>. Acceptable values are:
     * <ul>
     * <li><b>center</b> : <div class="sub-desc">
     * Aligned to the center of the container.
     * </div></li>
     * 
     * <li><b>end</b> : <div class="sub-desc">
     * Aligned to the bottom of the container.
     * </div></li>
     * 
     * <li><b>start</b> : <div class="sub-desc">
     * Aligned to the top of the container.
     * </div></li>
     * 
     * <li><b>stretch</b> : <div class="sub-desc">
     * Components are stretched vertically to fill the container.
     * </div></li>
     * </ul>
     */
});

Ext.regLayout('hbox', Ext.layout.HBoxLayout);

/**
 * @class Ext.layout.VBoxLayout
 * @extends Ext.layout.BoxLayout
 * <p>A layout that arranges items vertically down a Container. This layout optionally divides available vertical
 * space between child items containing a numeric <code>flex</code> configuration. The flex option is a ratio that
 * distributes height after any items with explicit heights have been accounted for. In the code below, the height is calculated
 * as follows:
 * <ul>
 *   <li>The fixed height item is subtracted, leaving us with 300 height</li>
 *   <li>The total flex number is counted, in this case, it is 3</li>
 *   <li>The ratio is then calculated, 300 / 3 = 100</li>
 *   <li>The first item has a flex of 2, so it is set to 2 * 100</li>
 *   <li>The other remaining item is set to 1 * 100</li>
 * </ul></p>
 * <pre><code>
new Ext.Container({
    width: 300,
    height: 400,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        flex: 2,
        html: 'First'
    },{
        width: 100,
        html: 'Second'
    },{
        flex: 1,
        html: 'Third'
    }]
});
 * </code></pre>
 * This layout may also be used to set the widths of child items by configuring it with the {@link #align} option.
 */
Ext.layout.VBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: 'vertical'
    
    /**
     * @cfg {String} pack
     * Specifies the vertical alignment of child components. Defaults to <tt>'start'</tt>. Acceptable values are:
     * <ul>
     * <li><b>center</b> : <div class="sub-desc">
     * Aligned to the center of the container.
     * </div></li>
     * 
     * <li><b>end</b> : <div class="sub-desc">
     * Aligned to the bottom of the container.
     * </div></li>
     * 
     * <li><b>justify</b> : <div class="sub-desc">
     * Justified with both the top and bottom of the container.
     * </div></li>
     * 
     * <li><b>start</b> : <div class="sub-desc">
     * Aligned to the top of the container.
     * </div></li>
     * </ul>
     */
    
    /**
     * @cfg {String} align Specifies the horizontal alignignment of child components. Defaults to <tt>'center'</tt>. Acceptable values are:
     * <ul>
     * <li><b>center</b> : <div class="sub-desc">
     * Aligned to the center of the container.
     * </div></li>
     * 
     * <li><b>end</b> : <div class="sub-desc">
     * Aligned to the right of the container.
     * </div></li>
     * 
     * <li><b>start</b> : <div class="sub-desc">
     * Aligned to the left of the container.
     * </div></li>
     * 
     * <li><b>stretch</b> : <div class="sub-desc">
     * Components are stretched horizontally to fill the container.
     * </div></li>
     * </ul>
     */
    
});

Ext.regLayout('vbox', Ext.layout.VBoxLayout);

