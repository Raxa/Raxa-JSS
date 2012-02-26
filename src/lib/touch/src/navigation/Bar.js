/**
 * This component is used in {@link Ext.navigation.View} to control animations in the toolbar. You should never need to
 * interact with the component directly, unless you are subclassing it.
 * @private
 * @author Robert Dougan <rob@sencha.com>
 */
Ext.define('Ext.navigation.Bar', {
    extend: 'Ext.Container',

    requires: [
        'Ext.Button',
        'Ext.TitleBar',
        'Ext.Spacer',
        'Ext.util.SizeMonitor'
    ],

    // private
    isToolbar: true,

    config: {
        // @inherit
        baseCls: Ext.baseCSSPrefix + 'toolbar',

        // @inherit
        cls: Ext.baseCSSPrefix + 'navigation-bar',

        /**
         * @cfg {String} ui
         * Style options for Toolbar. Either 'light' or 'dark'.
         * @accessor
         */
        ui: 'dark',

        /**
         * @hide
         * The title of the toolbar. You should NEVER set this, it is used internally. You set the title of the
         * navigation bar by giving a navigation views children a title configuration.
         * @accessor
         */
        title: null,

        /**
         * @hide
         */
        defaultType: 'button',

        /**
         * @hide
         */
        layout: {
            type: 'hbox'
        },

        /**
         * @cfg {Array/Object} items The child items to add to this NavigationBar. The {@link #cfg-defaultType} of
         * a NavigationBar is {@link Ext.Button}, so you do not need to specify an `xtype` if you are adding
         * buttons.
         *
         * You can also give items a `align` configuration which will align the item to the `left` or `right` of
         * the NavigationBar.
         * @accessor
         * @hide
         */

        /**
         * @cfg {String} defaultBackButtonText
         * The text to be displayed on the back button if:
         * a) The previous view does not have a title
         * b) The {@link #useTitleForBackButtonText} configuration is true.
         * @hide
         */
        defaultBackButtonText: 'Back',

        /**
         * @cfg {Object} animations
         * @hide
         */
        animation: {
            duration: 300
        },

        /**
         * @cfg {Boolean} useTitleForBackButtonText
         * Set to false if you always want to display the {@link #defaultBackButtonText} as the text
         * on the back button. True if you want to use the previous views title.
         * @hide
         */
        useTitleForBackButtonText: null,

        /**
         * @private
         * @cfg {Ext.navigation.View} view A reference to the navigation view this bar is linked to.
         */
        view: null,

        /**
         * @private
         * @cfg {Ext.Button/Object} backButton The configuration for the back button
         */
        backButton: {
            align: 'left',
            ui: 'back',
            hidden: true
        }
    },

    /**
     * The minmum back button width allowed.
     * @private
     */
    minBackButtonWidth: 80,

    constructor: function(config) {
        config = config || {};

        if (!config.items) {
            config.items = [];
        }

        this.callParent([config]);
    },

    beforeInitialize: function() {
        this.backButtonStack = [];
        this.lastAnimationProperties = {};
        this.animating = false;

        this.onSizeMonitorChange = Ext.Function.createThrottled(this.onSizeMonitorChange, 50, this);
    },

    initialize: function() {
        var me = this;

        me.on({
            painted: 'onPainted',
            erased: 'onErased'
        });

        me.onSizeMonitorChange();
    },

    /**
     * @private
     */
    updateView: function(newView, oldView) {
        var backButton = this.getBackButton(),
            innerItems, i, backButtonText;

        this.getItems();

        if (newView) {
            this.backButtonStack = [];

            //update the back button stack with the current inner items of the view
            innerItems = newView.getInnerItems();
            for (i = 0; i < innerItems.length; i++) {
                this.backButtonStack.push(innerItems[i].config.title || this.getDefaultBackButtonText());
            }

            this.titleComponent.setTitle(this.getTitleText());

            backButtonText = this.getBackButtonText();
            if (backButtonText) {
                backButton.setText(this.getBackButtonText());
                backButton.show();
            }
        }
    },

    /**
     * @private
     */
    onViewAdd: function(view, item, index) {
        var animation = view.getLayout().getAnimation();

        this.endAnimation();

        this.backButtonStack.push(item.config.title || this.getDefaultBackButtonText());

        this.refreshNavigationBarProxy();

        if (animation && animation.isAnimation) {
            this.pushBackButtonAnimated(this.getBackButtonText());
            this.pushTitleAnimated(this.getTitleText());
        } else {
            this.pushBackButton(this.getBackButtonText());
            this.pushTitle(this.getTitleText());
        }
    },

    /**
     * @private
     */
    onViewRemove: function(view, item, index) {
        var animation = view.getLayout().getAnimation();

        this.endAnimation();

        this.backButtonStack.pop();

        this.refreshNavigationBarProxy();

        if (animation && animation.isAnimation) {
            this.popBackButtonAnimated(this.getBackButtonText());
            this.popTitleAnimated(this.getTitleText());
        } else {
            this.popBackButton(this.getBackButtonText());
            this.popTitle(this.getTitleText());
        }
    },

    endAnimation: function() {
        var lastAnimationProperties = this.lastAnimationProperties,
            animation, el, key;

        if (lastAnimationProperties) {
            for (animation in lastAnimationProperties) {
                el = Ext.get(animation);

                for (key in lastAnimationProperties[animation].to) {
                    el.setStyle(key, lastAnimationProperties[animation][key]);
                }

                if (lastAnimationProperties[animation].onEnd) {
                    lastAnimationProperties[animation].onEnd.call(this);
                }
            }
        }
    },

    /**
     * @private
     */
    applyBackButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getBackButton());
    },

    /**
     * @private
     */
    updateBackButton: function(newBackButton, oldBackButton) {
        if (oldBackButton) {
            this.remove(oldBackButton);
        }

        if (newBackButton) {
            this.add(newBackButton);

            newBackButton.on({
                scope: this,
                tap: this.onBackButtonTap
            });
        }
    },

    onBackButtonTap: function() {
        this.fireEvent('back', this);
    },

    updateUseTitleForBackButtonText: function(newUseTitleForBackButtonText) {
        var backButton = this.getBackButton();

        if (backButton) {
            backButton.setText(this.getBackButtonText());
        }

        this.onSizeMonitorChange();
    },

    onPainted: function() {
        this.painted = true;

        this.sizeMonitor.refresh();

        this.onSizeMonitorChange();
    },

    onErased: function() {
        this.painted = false;
    },

    applyItems: function(items) {
        var me = this;

        if (!me.initialized) {
            var defaults = me.getDefaults() || {},
                leftBox, rightBox, spacer;

            me.leftBox = leftBox = me.add({
                xtype: 'container',
                style: 'position: relative',
                layout: {
                    type: 'hbox',
                    align: 'center'
                }
            });
            me.spacer = spacer = me.add({
                xtype: 'component',
                style: 'position: relative',
                flex: 1
            });
            me.rightBox = rightBox = me.add({
                xtype: 'container',
                style: 'position: relative',
                layout: {
                    type: 'hbox',
                    align: 'center'
                }
            });
            me.titleComponent = me.add({
                xtype: 'title',
                hidden: defaults.hidden,
                centered: true
            });

            me.sizeMonitor = new Ext.util.SizeMonitor({
                element: me.renderElement,
                callback: me.onSizeMonitorChange,
                scope: me
            });

            me.doAdd = me.doBoxAdd;
            me.doInsert = me.doBoxInsert;
        }

        me.callParent(arguments);
    },

    doBoxAdd: function(item) {
        if (item.config.align == 'right') {
            this.rightBox.add(item);
        }
        else {
            this.leftBox.add(item);
        }
    },

    doBoxInsert: function(index, item) {
        if (item.config.align == 'right') {
            this.rightBox.add(item);
        }
        else {
            this.leftBox.add(item);
        }
    },

    /**
     * Called when any size of this component changes.
     * It refreshes the navigation bar proxy so that the title and back button is in the correct location.
     * @private
     */
    onSizeMonitorChange: function() {
        if (!this.rendered) {
            return;
        }

        var backButton = this.getBackButton(),
            titleComponent = this.titleComponent;

        if (backButton && backButton.rendered) {
            backButton.renderElement.setWidth(null);
        }

        this.refreshNavigationBarProxy();

        var properties = this.getNavigationBarProxyProperties();
        if (backButton && backButton.rendered) {
            backButton.renderElement.setWidth(properties.backButton.width);
        }

        titleComponent.renderElement.setStyle('-webkit-transform', null);
        titleComponent.renderElement.setWidth(properties.title.width);
        titleComponent.renderElement.setLeft(properties.title.left);
    },

    /**
     * Calculates and returns the position values needed for the back button when you are pushing a title.
     * @private
     */
    getBackButtonAnimationProperties: function() {
        var me = this,
            element = me.renderElement,
            backButtonElement = me.getBackButton().renderElement,
            titleElement = me.titleComponent.renderElement,
            minButtonOffset = Math.min(element.getWidth() / 3, 200),
            proxyProperties = this.getNavigationBarProxyProperties(),
            buttonOffset, buttonGhostOffset;

        buttonOffset = titleElement.getX() - element.getX();
        buttonGhostOffset = element.getX() - backButtonElement.getX() - backButtonElement.getWidth();

        buttonOffset = Math.min(buttonOffset, minButtonOffset);

        return {
            element: {
                from: {
                    left: buttonOffset,
                    width: proxyProperties.backButton.width,
                    opacity: 0
                },
                to: {
                    left: 0,
                    width: proxyProperties.backButton.width,
                    opacity: 1
                }
            },

            ghost: {
                from: null,
                to: {
                    left: buttonGhostOffset,
                    opacity: 0
                }
            }
        };
    },

    /**
     * Calculates and returns the position values needed for the back button when you are popping a title.
     * @private
     */
    getBackButtonAnimationReverseProperties: function() {
        var me = this,
            element = me.renderElement,
            backButtonElement = me.getBackButton().renderElement,
            titleElement = me.titleComponent.renderElement,
            minButtonGhostOffset = Math.min(element.getWidth() / 3, 200),
            proxyProperties = this.getNavigationBarProxyProperties(),
            buttonOffset, buttonGhostOffset;

        buttonOffset = element.getX() - backButtonElement.getX() - backButtonElement.getWidth();
        buttonGhostOffset = titleElement.getX() - backButtonElement.getWidth();

        buttonGhostOffset = Math.min(buttonGhostOffset, minButtonGhostOffset);

        return {
            element: {
                from: {
                    left: buttonOffset,
                    width: proxyProperties.backButton.width,
                    opacity: 0
                },
                to: {
                    left: 0,
                    width: proxyProperties.backButton.width,
                    opacity: 1
                }
            },

            ghost: {
                from: null,
                to: {
                    left: buttonGhostOffset,
                    opacity: 0
                }
            }
        };
    },

    /**
     * Calculates and returns the position values needed for the title when you are pushing a title.
     * @private
     */
    getTitleAnimationProperties: function() {
        var me = this,
            element = me.renderElement,
            titleElement = me.titleComponent.renderElement,
            proxyProperties = this.getNavigationBarProxyProperties(),
            titleOffset, titleGhostOffset;

        titleOffset = element.getWidth() - titleElement.getX();
        titleGhostOffset = element.getX() - titleElement.getX() + proxyProperties.backButton.width;

        if ((proxyProperties.backButton.left + titleElement.getWidth()) > titleElement.getX()) {
            titleGhostOffset = element.getX() - titleElement.getX() - titleElement.getWidth();
        }

        return {
            element: {
                from: {
                    left: titleOffset,
                    width: proxyProperties.title.width,
                    opacity: 0
                },
                to: {
                    left: proxyProperties.title.left,
                    width: proxyProperties.title.width,
                    opacity: 1
                }
            },
            ghost: {
                from: titleElement.getLeft(),
                to: {
                    left: titleGhostOffset,
                    opacity: 0
                }
            }
        };
    },

    /**
     * Calculates and returns the position values needed for the title when you are popping a title.
     * @private
     */
    getTitleAnimationReverseProperties: function() {
        var me = this,
            element = me.renderElement,
            titleElement = me.titleComponent.renderElement,
            proxyProperties = this.getNavigationBarProxyProperties(),
            ghostLeft = 0,
            titleOffset, titleGhostOffset;

        ghostLeft = titleElement.getLeft();
        titleElement.setLeft(0);

        titleOffset = element.getX() - titleElement.getX() + proxyProperties.backButton.width;
        titleGhostOffset = element.getX() + element.getWidth();

        if ((proxyProperties.backButton.left + titleElement.getWidth()) > titleElement.getX()) {
            titleOffset = element.getX() - titleElement.getX() - titleElement.getWidth();
        }

        return {
            element: {
                from: {
                    left: titleOffset,
                    width: proxyProperties.title.width,
                    opacity: 0
                },
                to: {
                    left: proxyProperties.title.left,
                    width: proxyProperties.title.width,
                    opacity: 1
                }
            },
            ghost: {
                from: ghostLeft,
                to: {
                    left: titleGhostOffset,
                    opacity: 0
                }
            }
        };
    },

    /**
     * Helper method used to animate elements.
     * You pass it an element, objects for the from and to positions an option onEnd callback called when the animation is over.
     * Normally this method is passed configurations returned from the methods such as {@link #getTitleAnimationReverseProperties} etc.
     * It is called from the {@link #pushBackButtonAnimated}, {@link #pushTitleAnimated}, {@link #popBackButtonAnimated} and {@link #popTitleAnimated}
     * methods.
     *
     * If the current device is Android, it will use top/left to animate.
     * If it is anything else, it will use transform.
     * @private
     */
    animate: function(element, from, to, onEnd) {
        var me = this,
            config = {
            element: element,
            easing: 'ease-in-out',
            duration: this.getAnimation().duration,
            replacePrevious: true
        };

        this.lastAnimationProperties[element.id] = {
            to: to,
            onEnd: onEnd
        };

        //reset the left of the element
        element.setLeft(0);

        if (Ext.os.is.Android) {
            if (from) {
                config.from = {
                    left: from.left,
                    opacity: from.opacity
                };

                if (from.width) {
                    config.from.width = from.width;
                }
            }

            if (to) {
                config.to = {
                    left: to.left,
                    opacity: to.opacity
                };

                if (to.width) {
                    config.to.width = to.width;
                }
            }
        } else {
            if (from) {
                config.from = {
                    transform: {
                        translateX: from.left
                    },
                    opacity: from.opacity
                };

                if (from.width) {
                    config.from.width = from.width;
                }
            }

            if (to) {
                config.to = {
                    transform: {
                        translateX: to.left
                    },
                    opacity: to.opacity
                };

                if (to.width) {
                    config.to.width = to.width;
                }
            }
        }

        fn = function() {
            if (onEnd) {
                onEnd.call(me);
            }

            me.lastAnimationProperties = {};
        };

        config.onEnd = fn;

        Ext.Animator.run(config);
    },

    /**
     * Returns the text needed for the current back button at anytime.
     * @private
     */
    getBackButtonText: function() {
        var text = this.backButtonStack[this.backButtonStack.length - 2],
            useTitleForBackButtonText = this.getUseTitleForBackButtonText();

        if (!useTitleForBackButtonText) {
            if (text) {
                text = this.getDefaultBackButtonText();
            }
        }

        return text;
    },

    /**
     * Returns the text needed for the current title at anytime.
     * @private
     */
    getTitleText: function() {
        return this.backButtonStack[this.backButtonStack.length - 1];
    },

    /**
     * Pushes a back button into the bar with no animations
     * @private
     */
    pushBackButton: function(title) {
        var backButton = this.getBackButton();
        backButton.setText(title);
        backButton.show();

        var properties = this.getBackButtonAnimationProperties(),
            to = properties.element.to;

        if (to.left) {
            backButton.setLeft(to.left);
        }

        if (to.width) {
            backButton.setWidth(to.width);
        }
    },

    /**
     * Pushes a new back button into the bar with animations
     * @private
     */
    pushBackButtonAnimated: function(title) {
        var me = this;

        var backButton = me.getBackButton(),
            previousTitle = backButton.getText(),
            backButtonElement = backButton.renderElement,
            properties = me.getBackButtonAnimationProperties(),
            buttonGhost;

        //if there is a previoustitle, there should be a buttonGhost. so create it.
        if (previousTitle) {
            buttonGhost = me.createProxy(backButton);
        }

        //update the back button, and make sure it is visible
        backButton.setText(this.getBackButtonText());
        backButton.show();

        //animate the backButton, which always has the new title
        me.animate(backButtonElement, properties.element.from, properties.element.to, function() {
            me.animating = false;
        });

        //if there is a buttonGhost, we must animate it too.
        if (buttonGhost) {
            me.animate(buttonGhost, properties.ghost.from, properties.ghost.to, function() {
                buttonGhost.destroy();
            });
        }
    },

    /**
     * Pops the back button with no animations
     * @private
     */
    popBackButton: function(title) {
        var backButton = this.getBackButton();

        backButton.setText(null);

        if (title) {
            backButton.setText(this.getBackButtonText());
        } else {
            backButton.hide();
        }

        var properties = this.getBackButtonAnimationReverseProperties(),
            to = properties.element.to;

        if (to.left) {
            backButton.setLeft(to.left);
        }

        if (to.width) {
            backButton.setWidth(to.width);
        }
    },

    /**
     * Pops the current back button with animations.
     * It will automatically know whether or not it should show the previous backButton or not. And proceed accordingly
     * @private
     */
    popBackButtonAnimated: function(title) {
        var me = this;

        var backButton = me.getBackButton(),
            previousTitle = backButton.getText(),
            backButtonElement = backButton.renderElement,
            properties = me.getBackButtonAnimationReverseProperties(),
            buttonGhost;

        //if there is a previoustitle, there should be a buttonGhost. so create it.
        if (previousTitle) {
            buttonGhost = me.createProxy(backButton);
        }

        //update the back button, and make sure it is visible
        if (title && me.backButtonStack.length) {
            backButton.setText(this.getBackButtonText());
            backButton.show();

            me.animate(backButtonElement, properties.element.from, properties.element.to);
        } else {
            backButton.hide();
        }

        //if there is a buttonGhost, we must animate it too.
        if (buttonGhost) {
            me.animate(buttonGhost, properties.ghost.from, properties.ghost.to, function() {
                buttonGhost.destroy();

                if (!title) {
                    backButton.setText(null);
                }
            });
        }
    },

    /**
     * Pushes a new title into the bar without any animations
     * @private
     */
    pushTitle: function(newTitle) {
        var title = this.titleComponent,
            titleElement = title.renderElement,
            properties = this.getTitleAnimationProperties(),
            to = properties.element.to;

        title.setTitle(newTitle);

        if (to.left) {
            titleElement.setLeft(to.left);
        }

        if (to.width) {
            titleElement.setWidth(to.width);
        }
    },

    /**
     * Pushs a new title into the navigation bar, animating as it goes.
     * @private
     */
    pushTitleAnimated: function(newTitle) {
        var me = this;

        var backButton = me.getBackButton(),
            previousTitle = (backButton) ? backButton.getText() : null,
            title = me.titleComponent,
            titleElement = title.renderElement,
            properties = me.getTitleAnimationProperties(),
            titleGhost;

        //if there is a previoustitle, there should be a buttonGhost. so create it.
        if (previousTitle) {
            titleGhost = me.createProxy(title, true);
        }

        title.setTitle(newTitle);

        //animate the new title
        me.animate(titleElement, properties.element.from, properties.element.to);

        //if there is a titleGhost, we must animate it too.
        if (titleGhost) {
            me.animate(titleGhost, properties.ghost.from, properties.ghost.to, function() {
                titleGhost.destroy();
            });
        }
    },

    /**
     * Pops the title without any animation.
     * Simply gets the correct positions for the title and sets it on the dom.
     * @private
     */
    popTitle: function(newTitle) {
        var title = this.titleComponent,
            titleElement = title.renderElement,
            properties = this.getTitleAnimationReverseProperties(),
            to = properties.element.to;

        title.setTitle(newTitle);

        if (to.left) {
            titleElement.setLeft(to.left);
        }

        if (to.width) {
            titleElement.setWidth(to.width);
        }
    },

    /**
     * Method which pops the current title and animates it. It will automatically know whether or not to use a titleGhost
     * element, and how to animate it.
     * @private
     */
    popTitleAnimated: function(newTitle) {
        var me = this;

        var backButton = me.getBackButton(),
            previousTitle = me.titleComponent.getTitle(),
            title = me.titleComponent,
            titleElement = title.renderElement,
            properties = me.getTitleAnimationReverseProperties(),
            titleGhost;

        //if there is a previoustitle, there should be a buttonGhost. so create it.
        if (previousTitle) {
            titleGhost = me.createProxy(title, true);
        }

        title.setTitle(newTitle || '');

        //animate the new title
        me.animate(titleElement, properties.element.from, properties.element.to, function() {
            me.animating = false;
        });

        //if there is a titleGhost, we must animate it too.
        if (titleGhost) {
            me.animate(titleGhost, properties.ghost.from, properties.ghost.to, function() {
                titleGhost.destroy();
            });
        }
    },

    /**
     * This creates a proxy of the whole navigation bar and positions it out of the view.
     * This is used so we know where the back button and title needs to be at any time, either if we are
     * animating, not animating, or resizing.
     * @private
     */
    createNavigationBarProxy: function() {
        var proxy = this.proxy;

        if (proxy) {
            return;
        }

        //create a titlebar for the proxy
        this.proxy = proxy = Ext.create('Ext.TitleBar', {
            items: [
                {
                    xtype: 'button',
                    ui: 'back',
                    text: ''
                }
            ],
            title: this.backButtonStack[0]
        });

        proxy.backButton = proxy.down('button[ui=back]');

        //add the proxy to the body
        Ext.getBody().appendChild(proxy.renderElement);

        proxy.renderElement.setStyle('position', 'absolute');
        proxy.element.setStyle('visibility', 'hidden');
        proxy.renderElement.setX(0);
        proxy.renderElement.setY(-1000);
    },

    /**
     * A Simple helper method which returns the current positions and sizes of the title and back button
     * in the navigation bar proxy.
     * @private
     */
    getNavigationBarProxyProperties: function() {
        return {
            title: {
                left: this.proxy.titleComponent.renderElement.getLeft(),
                width: this.proxy.titleComponent.renderElement.getWidth()
            },
            backButton: {
                left: this.proxy.backButton.renderElement.getLeft(),
                width: this.proxy.backButton.renderElement.getWidth()
            }
        };
    },

    /**
     * Refreshes the navigation bar proxy with the latest data available in the backButtonStack.
     * @private
     */
    refreshNavigationBarProxy: function() {
        var proxy = this.proxy,
            renderElement = this.renderElement,
            backButtonStack = this.backButtonStack,
            title = backButtonStack[backButtonStack.length - 1],
            oldTitle = this.getBackButtonText();

        if (!proxy) {
            this.createNavigationBarProxy();
            proxy = this.proxy;
        }

        proxy.renderElement.setWidth(renderElement.getWidth());
        proxy.renderElement.setHeight(renderElement.getHeight());

        proxy.setTitle(title);

        if (oldTitle) {
            proxy.backButton.setText(oldTitle);
            proxy.backButton.show();
        } else {
            proxy.backButton.hide();
        }

        proxy.refreshTitlePosition();
    },

    /**
     * Handles removing back button stacks from this bar
     * @private
     */
    onBeforePop: function(count) {
        count--;
        for (var i = 0; i < count; i++) {
            this.backButtonStack.pop();
        }
    },

    /**
     * We override the hidden method because we don't want to remove it from the view using display:none. Instead we just position it off
     * the scren, much like the navigation bar proxy. This means that all animations, pushing, popping etc. all still work when if you hide/show
     * this bar at any time.
     * @private
     */
    doSetHidden: function(hidden) {
        if (!hidden) {
            this.element.setStyle({
                position: 'relative',
                top: 'auto',
                left: 'auto',
                width: 'auto'
            });
        } else {
            this.element.setStyle({
                position: 'absolute',
                top: '-1000px',
                left: '-1000px',
                width: this.element.getWidth() + 'px'
            });
        }
    },

    /**
     * Creates a proxy element of the passed element, and positions it in the same position, using absolute positioning.
     * The createNavigationBarProxy method uses this to create proxies of the backButton and the title elements.
     * @private
     */
    createProxy: function(component, useParent) {
        var element = (useParent) ? component.element.getParent() : component.element,
            ghost = Ext.get(element.id + '-proxy');

        if (!ghost) {
            ghost = element.dom.cloneNode(true);
            ghost.id = element.id + '-proxy';

            //insert it into the toolbar
            element.getParent().dom.appendChild(ghost);

            //set the x/y
            ghost = Ext.get(ghost);
            ghost.setStyle('position', 'absolute');
            ghost.setY(element.getY());
            ghost.setX(element.getX());
        }

        return ghost;
    }
});
