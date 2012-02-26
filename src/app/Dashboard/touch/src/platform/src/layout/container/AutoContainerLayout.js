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