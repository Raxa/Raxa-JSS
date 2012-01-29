/**
 * Panel is a container that has specific functionality and structural components that make it the perfect building
 * block for application-oriented user interfaces.
 *
 * Panels are, by virtue of their inheritance from {@link Ext.Container}, capable of being configured with a {@link
 * Ext.Container#layout layout}, and containing child Components.
 *
 * When either specifying child {@link Ext.Container#cfg-items items} of a Panel, or dynamically {@link Ext.Container#method-add
 * adding} Components to a Panel, remember to consider how you wish the Panel to arrange those child elements, and
 * whether those child elements need to be sized using one of Ext's built-in `**{@link Ext.Container#layout layout}**`
 * schemes.
 *
 * # Example:
 *
 *     @example preview
 *     var panel = Ext.create('Ext.Panel', {
 *         fullscreen: true,
 *
 *         items: [
 *             {
 *                 docked: 'top',
 *                 xtype: 'toolbar',
 *                 title: 'Standard Titlebar'
 *             },
 *             {
 *                 docked: 'top',
 *                 xtype: 'toolbar',
 *                 ui   : 'light',
 *                 items: [
 *                     {
 *                         text: 'Test Button'
 *                     }
 *                 ]
 *             }
 *         ],
 *
 *         html: 'Testing'
 *     });
 *
 */
Ext.define('Ext.Panel', {
    isPanel: true,
    extend : 'Ext.Container',
    xtype  : 'panel',
    alternateClassName: 'Ext.lib.Panel',

    config: {
        baseCls: Ext.baseCSSPrefix + 'panel',

        /**
         * @cfg {Number/Boolean/String} bodyPadding
         * A shortcut for setting a padding style on the body element. The value can either be
         * a number to be applied to all sides, or a normal css string describing padding.
         * @deprecated 2.0 bodyPadding is deprecated and will be removed in a future version of Sencha Touch.
         */
        bodyPadding: null,

        /**
         * @cfg {Number/Boolean/String} bodyMargin
         * A shortcut for setting a margin style on the body element. The value can either be
         * a number to be applied to all sides, or a normal css string describing margins.
         * @deprecated 2.0 bodyMargin is deprecated and will be removed in a future version of Sencha Touch.
         */
        bodyMargin: null,

        /**
         * @cfg {Number/Boolean/String} bodyBorder
         * A shortcut for setting a border style on the body element. The value can either be
         * a number to be applied to all sides, or a normal css string describing borders.
         * @deprecated 2.0 bodyBorder is deprecated and will be removed in a future version of Sencha Touch.
         */
        bodyBorder: null
    },

    applyBodyPadding: function(bodyPadding) {
        if (bodyPadding === true) {
            bodyPadding = 5;
        }

        bodyPadding = Ext.dom.Element.unitizeBox(bodyPadding);

        return bodyPadding;
    },

    updateBodyPadding: function(newBodyPadding) {
        this.element.setStyle('padding', newBodyPadding);
    },

    applyBodyMargin: function(bodyMargin) {
        if (bodyMargin === true) {
            bodyMargin = 5;
        }

        bodyMargin = Ext.dom.Element.unitizeBox(bodyMargin);

        return bodyMargin;
    },

    updateBodyMargin: function(newBodyMargin) {
        this.element.setStyle('margin', newBodyMargin);
    },

    applyBodyBorder: function(bodyBorder) {
        if (bodyBorder === true) {
            bodyBorder = 1;
        }

        bodyBorder = Ext.dom.Element.unitizeBox(bodyBorder);

        return bodyBorder;
    },

    updateBodyBorder: function(newBodyBorder) {
        this.element.setStyle('border-width', newBodyBorder);
    }
});
