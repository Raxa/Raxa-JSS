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
