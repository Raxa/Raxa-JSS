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
 * ## Example:
 *
 *     @example miniphone preview
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
    extend: 'Ext.Container',
    requires: ['Ext.util.LineSegment'],

    alternateClassName: 'Ext.lib.Panel',

    xtype: 'panel',

    isPanel: true,

    config: {
        baseCls: Ext.baseCSSPrefix + 'panel',

        /**
         * @cfg {Number/Boolean/String} bodyPadding
         * A shortcut for setting a padding style on the body element. The value can either be
         * a number to be applied to all sides, or a normal css string describing padding.
         * @deprecated 2.0.0
         */
        bodyPadding: null,

        /**
         * @cfg {Number/Boolean/String} bodyMargin
         * A shortcut for setting a margin style on the body element. The value can either be
         * a number to be applied to all sides, or a normal css string describing margins.
         * @deprecated 2.0.0
         */
        bodyMargin: null,

        /**
         * @cfg {Number/Boolean/String} bodyBorder
         * A shortcut for setting a border style on the body element. The value can either be
         * a number to be applied to all sides, or a normal css string describing borders.
         * @deprecated 2.0.0
         */
        bodyBorder: null
    },

    getElementConfig: function() {
        var config = this.callParent();

        config.children.push({
            reference: 'tipElement',
            className: 'x-anchor',
            hidden: true
        });

        return config;
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
    },

    alignTo: function(component) {
        var tipElement = this.tipElement;

        tipElement.hide();

        if (this.currentTipPosition) {
            tipElement.removeCls('x-anchor-' + this.currentTipPosition);
        }

        this.callParent(arguments);

        var LineSegment = Ext.util.LineSegment,
            alignToElement = component.isComponent ? component.renderElement : component,
            element = this.renderElement,
            alignToBox = alignToElement.getPageBox(),
            box = element.getPageBox(),
            left = box.left,
            top = box.top,
            right = box.right,
            bottom = box.bottom,
            centerX = left + (box.width / 2),
            centerY = top + (box.height / 2),
            leftTopPoint = { x: left, y: top },
            rightTopPoint = { x: right, y: top },
            leftBottomPoint = { x: left, y: bottom },
            rightBottomPoint = { x: right, y: bottom },
            boxCenterPoint = { x: centerX, y: centerY },
            alignToCenterX = alignToBox.left + (alignToBox.width / 2),
            alignToCenterY = alignToBox.top + (alignToBox.height / 2),
            alignToBoxCenterPoint = { x: alignToCenterX, y: alignToCenterY },
            centerLineSegment = new LineSegment(boxCenterPoint, alignToBoxCenterPoint),
            offsetLeft = 0,
            offsetTop = 0,
            tipSize, tipWidth, tipHeight, tipPosition, tipX, tipY;

        tipElement.setVisibility(false);
        tipElement.show();
        tipSize = tipElement.getSize();
        tipWidth = tipSize.width;
        tipHeight = tipSize.height;

        if (centerLineSegment.intersects(new LineSegment(leftTopPoint, rightTopPoint))) {
            tipX = Math.min(Math.max(alignToCenterX, left), right - (tipWidth / 2));
            tipY = top;
            offsetTop = tipHeight + 10;
            tipPosition = 'top';
        }
        else if (centerLineSegment.intersects(new LineSegment(leftTopPoint, leftBottomPoint))) {
            tipX = left;
            tipY = Math.min(Math.max(alignToCenterY + (tipWidth / 2), top), bottom);
            offsetLeft = tipHeight + 10;
            tipPosition = 'left';
        }
        else if (centerLineSegment.intersects(new LineSegment(leftBottomPoint, rightBottomPoint))) {
            tipX = Math.min(Math.max(alignToCenterX, left), right - (tipWidth / 2));
            tipY = bottom;
            offsetTop = -tipHeight - 10;
            tipPosition = 'bottom';
        }
        else if (centerLineSegment.intersects(new LineSegment(rightTopPoint, rightBottomPoint))) {
            tipX = right;
            tipY = Math.min(Math.max(alignToCenterY - (tipWidth / 2), top), bottom);
            offsetLeft = -tipHeight - 10;
            tipPosition = 'right';
        }

        if (tipX || tipY) {
            this.currentTipPosition = tipPosition;
            tipElement.addCls('x-anchor-' + tipPosition);
            tipElement.setLeft(tipX - left);
            tipElement.setTop(tipY - top);
            tipElement.setVisibility(true);

            this.setLeft(this.getLeft() + offsetLeft);
            this.setTop(this.getTop() + offsetTop);
        }
    }
});
