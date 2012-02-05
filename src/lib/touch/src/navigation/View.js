/**
 * NavigationView is basically a {@link Ext.Container} with a {@link Ext.layout.Card card} layout, so only one view
 * can be visible at a time. However, NavigationView also adds extra functionality on top of this to allow
 * you to `push` and `pop` views at any time. When you do this, your NavigationView will automatically animate
 * between your current active view, and the new view you want to `push`, or the previous view you want to `pop`.
 *
 * Using the NavigationView is very simple. Here is a basic example of it in action:
 *
 *     var view = Ext.create('Ext.NavigationView', {
 *         fullscreen: true,
 *
 *         items: [{
 *             title: 'First',
 *             items: [{
 *                 xtype: 'button',
 *                 text: 'Push a new view!',
 *                 handler: function() {
 *                     //use the push() method to push another view. It works much like
 *                     //add() or setActiveItem(). it accepts a view instance, or you can give it
 *                     //a view config.
 *                     view.push({
 *                         title: 'Second',
 *                         html: 'Second view!'
 *                     });
 *                 }
 *             }]
 *         }]
 *     });
 *
 * Now, here comes the fun part: you can push any view/item into the NavigationView, at any time, and it will
 * automatically handle the animations between the two views, including adding a back button (if necessary)
 * and showing the new title.
 *
 *     view.push({
 *         title: 'A new view',
 *         html: 'Some new content'
 *     });
 *
 * As you can see, it is as simple as calling the {@link #method-push} method, with a new view (instance or object). Done.
 *
 * You can also `pop` a view at any time. This will remove the top-most view from the NavigationView, and animate back
 * to the previous view. You can do this using the {@link #method-pop} method (which requires no arguments).
 *
 *     view.pop();
 *
 */
Ext.define('Ext.navigation.View', {
    extend: 'Ext.Container',
    alternateClassName: 'Ext.NavigationView',
    xtype: 'navigationview',
    requires: ['Ext.navigation.Bar'],

    config: {
        // @inherit
        baseCls: Ext.baseCSSPrefix + 'navigationview',

        /**
         * @cfg {Boolean/Object} navigationBar
         * The NavigationBar used in this navigation view. It defaults to be docked to the top.
         *
         * You can just pass in a normal object if you want to customize the NavigationBar. For example:
         *
         *     navigationBar: {
         *         ui: 'dark',
         *         docked: 'bottom'
         *     }
         *
         * You **cannot** specify a *title* property in this configuration. The title of the navigationBar is taken
         * from the configuration of this views children:
         *
         *     view.push({
         *         title: 'This views title which will be shown in the navigation bar',
         *         html: 'Some HTML'
         *     });
         *
         * @accessor
         */
        navigationBar: {
            docked: 'top'
        },

        /**
         * @cfg {String} defaultBackButtonText
         * The text to be displayed on the back button if:
         * a) The previous view does not have a title
         * b) The {@link #useTitleForBackButtonText} configuration is true.
         * @accessor
         */
        defaultBackButtonText: 'Back',

        /**
         * @cfg {Boolean} useTitleForBackButtonText
         * Set to false if you always want to display the {@link #defaultBackButtonText} as the text
         * on the back button. True if you want to use the previous views title.
         * @accessor
         */
        useTitleForBackButtonText: false,

        /**
         * @cfg {Array/Object} items The child items to add to this NavigationView. This is usually an array of Component
         * configurations or instances, for example:
         *
         *    Ext.create('Ext.Container', {
         *        items: [
         *            {
         *                xtype: 'panel',
         *                title: 'My title',
         *                html: 'This is an item'
         *            }
         *        ]
         *    });
         *
         * If you want a title to be displayed in the {@link #navigationBar}, you must specify a `title` configuration in your
         * view, like above.
         *
         * Note: only one view will be visible at a time. If you want to change to another view, use the {@link #method-push} or
         * {@link #setActiveItem} methods.
         * @accessor
         */

        /**
         * @hide
         */
        layout: {
            type: 'card',
            animation: {
                duration: 300,
                easing: 'ease-in-out',
                type: 'slide',
                direction: 'left'
            }
        }

        // See https://sencha.jira.com/browse/TOUCH-1568
        // If you do, add to #navigationBar config docs:
        //
        //     If you want to add a button on the right of the NavigationBar,
        //     use the {@link #rightButton} configuration.
    },

    /**
     * @event push
     * Fires when a view is pushed into this navigation view
     * @param {Ext.navigation.View} this The component instance
     * @param {Mixed} view The view that has been pushed
     */

    /**
     * @event pop
     * Fires when a view is popped from this navigation view
     * @param {Ext.navigation.View} this The component instance
     * @param {Mixed} view The view that has been popped
     */

    /**
     * A stack array of all views in this navigation view.
     * @cfg {Array} stack
     * @private
     */

    /**
     * True of we are popping a view from the NavigationView
     * @cfg {Boolean} popping
     * @private
     */

    beforeInitialize: function() {
        this.stack = [];
    },

    // @private
    initialize: function() {
        //add a listener onto the back button in the navigationbar
        this.getNavigationBar().on({
            scope: this,
            back: this.onBackButtonTap
        });
    },

    /**
     * @private
     * Called when the user taps on the back button
     */
    onBackButtonTap: function() {
        this.popAnimated();
    },

    /**
     * Pushes a new view into this navigation view using the default animation that this view has.
     * @param {Object} view The view to push
     * @return {Ext.Component} The new item you just pushed
     */
    push: function(view) {
        if (!this.canPush()) {
            return;
        }

        this.popping = false;

        return this.setActiveItem(view);
    },

    /**
     * Pushes a new view into this navigation view using a animation passed as a configuration.
     * @param {Object} view The view to push
     * @param {Boolean/Object} config The animation configuration.
     * @return {Ext.Component} The new item you just pushed
     */
    pushAnimated: function(view, config) {
        if (!this.canPush()) {
            return;
        }

        this.popping = false;

        var layout = this.getLayout(),
            animation = layout.getAnimation(),
            item;

        //merge the new animation configuration with the existing one
        if (Ext.isObject(config)) {
            config = Ext.Object.merge({}, animation.getInitialConfig(), config);
        }

        layout.setAnimation(config);
        item = this.setActiveItem(view);
        layout.getAnimation().disable();
        layout.setAnimation(animation);
        layout.getAnimation().enable();

        return item;
    },

    /**
     * Removes the current active view from the stack and sets the previous view using the default animation
     * of this view.
     * @param {Number} count The number of views you want to pop
     * @return {Ext.Component} The new active item
     */
    pop: function(count) {
        if (this.onBeforePop(count)) {
            return this.doPop();
        }
    },

    /**
     * Removes the current active view from the stack and animates it to the previous view using the specified config.
     * @param {Number} count The number of views you want to pop
     * @param {Boolean/Object} config The animation configuration.
     * @return {Ext.Component} The new active item
     */
    popAnimated: function(count, config) {
        if (this.onBeforePop(count)) {
            return this.doPop(config);
        }
    },

    /**
     * @private
     * Calculates whether it needs to remove any items from the stack when you are popping more than 1
     * item. If it does, it removes those views from the stack and returns `true`.
     * @return {Boolean} True if it has removed views
     */
    onBeforePop: function(count) {
        var me = this,
            stack = me.stack,
            newStack = [],
            ln = stack.length,
            last, i;

        //default to 1 pop
        if (!Ext.isNumber(count) || count < 1) {
            count = 1;
        }

        //check if we are trying to remove more items than we have
        count = Math.min(count, stack.length - 1);

        if (count) {
            //we need to reset the backButtonStack in the navigation bar
            me.getNavigationBar().onBeforePop(count);

            //we dont want count to take into account the last item, as we need to keep it for animations
            count--;

            //we only want to keep the first and last views because we are going from the last view, to the first view
            newStack.push(stack.shift());
            last = stack.pop();

            //loop through all other views in the stack and remove them from the view
            for (i = 0; i < count; i++) {
                stack.pop();
            }

            newStack = newStack.concat(stack);
            newStack.push(last);

            //update the stack and pop back to the first view
            me.stack = newStack;

            return true;
        }

        return false;
    },

    /**
     * @private
     */
    doPop: function(config) {
        var me = this,
            layout = me.getLayout(),
            animation = layout.getAnimation();

        if (!this.canPop()) {
            //<debug>
            Ext.Logger.warn('Ext.navigation.View#pop: Trying to pop a view, but there are no views to pop.');
            //</debug>
            return;
        }

        //remove the last item in the stack
        me.stack.pop();

        if (Ext.isDefined(config)) {
            //merge the new animation configuration with the existing one
            if (Ext.isObject(config)) {
                config = Ext.Object.merge({}, animation.getInitialConfig(), config);
            }

            //set the animation configuration
            layout.setAnimation(config);
            layout.getAnimation().enable();
        } else {
            //reverse the animation
            if (animation && animation.isAnimation) {
                animation.setReverse(true);
            }
        }

        //set the new active item to be the new last item of the stack
        me.popping = true;
        me.setActiveItem(me.stack[me.stack.length - 1]);
        me.popping = false;

        if (Ext.isDefined(config)) {
            //revert the animation
            layout.setAnimation(animation);
            layout.getAnimation().enable();
        } else {
            //unreverse the animation
            if (animation && animation.isAnimation) {
                animation.setReverse(false);
            }
        }

        return this.getActiveItem();
    },

    /**
     * Simply returns true if this navigation view can purrently push a new item.
     * @return {Boolean} True if you can push
     */
    canPush: function() {
        var navigationBar = this.getNavigationBar();

        if (navigationBar && navigationBar.animating) {
            return false;
        }

        return true;
    },

    /**
     * Simply returns true if this navigation view can currently pop and item. False if there is only one view
     * in the stack.
     * @return {Boolean} True if you can pop
     */
    canPop: function() {
        var canPop = this.stack.length > 1,
            navigationBar = this.getNavigationBar();

        if (navigationBar && navigationBar.animating) {
            return false;
        }

        return canPop;
    },

    /**
     * Returns the previous item, if one exists.
     * @return {Mixed} The previous view
     */
    getPreviousItem: function() {
        var stack = this.stack;
        return stack[stack.length - 1];
    },

    /**
     * Updates the backbutton text accordingly in the {@link #navigationBar}
     * @private
     */
    updateUseTitleForBackButtonText: function(useTitleForBackButtonText) {
        var navigationBar = this.getNavigationBar();
        if (navigationBar) {
            navigationBar.setUseTitleForBackButtonText(useTitleForBackButtonText);
        }
    },

    // @private
    applyNavigationBar: function(config) {
        if (!config) {
            config = {
                hidden: true,
                docked: 'top'
            };
        }

        if (config.title) {
            delete config.title;
            //<debug>
            Ext.Logger.warn("Ext.navigation.View: The 'navigationBar' configuration does not accept a 'title' property. You " +
                            "set the title of the navigationBar by giving this navigation view's children a 'title' property.");
            //</debug>
        }

        return Ext.factory(config, Ext.navigation.Bar, this.getNavigationBar());
    },

    // @private
    updateNavigationBar: function(newNavigationBar, oldNavigationBar) {
        if (oldNavigationBar) {
            this.remove(oldNavigationBar);
        }

        if (newNavigationBar) {
            var layout = this.getLayout(),
                animation = (layout && layout.isLayout) ? layout.getAnimation() : false;

            if (animation && animation.isAnimation) {
                newNavigationBar.setAnimation(animation.config);
            }
            this.add(newNavigationBar);
        }
    },

    // @private
    doSetActiveItem: function(activeItem, oldActiveItem) {
        var me = this,
            navigationBar = me.getNavigationBar(),
            stack = me.stack,
            layout = me.getLayout(),
            animation = layout.getAnimation(),
            useAnimation = animation && animation.isAnimation && this.isPainted(),
            pushFn = (useAnimation) ? 'pushAnimated' : 'push',
            popFn = (useAnimation) ? 'popAnimated' : 'pop',
            title;

        if (!activeItem) {
            return;
        }

        title = activeItem.getInitialConfig().title;

        //if we are not popping a view, then add it to the stack
        if (!me.popping) {
            stack.push(activeItem);
            me.fireEvent('push', this, activeItem);
        } else {
            me.fireEvent('pop', this, oldActiveItem);
        }

        if (navigationBar) {
            //if there is a previous item in the stack, then we must show the backbutton
            //else we should just hide it
            if (stack.length > 1) {
                if (me.popping) {
                    navigationBar[popFn](title, animation.config);
                } else {
                    navigationBar[pushFn](title, animation.config);
                }
            } else {
                if (me.isPainted()) {
                    navigationBar[popFn](title, animation.config);
                } else {
                    navigationBar.setTitle(title);
                    navigationBar.backButtonStack.push(title);
                }
            }
        }

        me.callParent(arguments);
    },

    /**
     * Resets the view by removing all items between the first and last item.
     * @return {Ext.Component} The view that is now active
     */
    reset: function() {
        this.pop(this.stack.length);
    },

    /**
     * Resets the view by removing all items between the first and last item, and animates to that view
     * @return {Ext.Component} The view that is now active
     */
    resetAnimated: function() {
        this.popAnimated(this.stack.length);
    }
});
