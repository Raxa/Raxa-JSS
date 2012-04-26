/**
 * Component layout for Ext.form.FieldSet components
 * @private
 */
Ext.define('Ext.layout.component.FieldSet', {
    extend: 'Ext.layout.component.Body',
    alias: ['layout.fieldset'],

    type: 'fieldset',

    /*beginLayout: function (ownerContext) {
        this.callParent(arguments);

        var legend = this.owner.legend;
        if (legend) {
            ownerContext.legendContext = ownerContext.context.getCmp(legend);
        }
    },*/

    beginLayoutCycle: function (ownerContext) {
        var target = ownerContext.target,
            lastSize;

        this.callParent(arguments);

        // Each time we begin (2nd+ would be due to invalidate) we need to publish the
        // known contentHeight if we are collapsed:
        //
        if (target.collapsed) {
            ownerContext.heightModel = this.sizeModels.shrinkWrap;
            ownerContext.setContentHeight(0);

            // If we are also shrinkWrap width, we must provide a contentWidth (since the
            // container layout is not going to run).
            //
            if (ownerContext.widthModel.shrinkWrap) {
                lastSize = target.lastComponentSize;
                ownerContext.setContentWidth((lastSize && lastSize.contentWidth) || 100);
            }
        }
    },

    calculateOwnerHeightFromContentHeight: function (ownerContext, contentHeight) {
        // Height of fieldset is content height plus top border width (which is either the legend height or top border width) plus bottom border width
        return ownerContext.getProp('contentHeight') + ownerContext.getPaddingInfo().height + (ownerContext.target.legend ? ownerContext.target.legend.getHeight() : ownerContext.getBorderInfo().top) + ownerContext.getBorderInfo().bottom;
    },

    publishInnerHeight: function (ownerContext, height) {
        this.callParent(arguments);
        if (ownerContext.target.legend) {
            ownerContext.bodyContext.setHeight(ownerContext.bodyContext.getProp('height') - ownerContext.target.legend.getHeight(), !ownerContext.heightModel.natural);
        }
    },

    getLayoutItems : function() {
        var legend = this.owner.legend;
        if (legend) {
            return [ legend ];
        }
        return [];
    }
});