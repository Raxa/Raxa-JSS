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
