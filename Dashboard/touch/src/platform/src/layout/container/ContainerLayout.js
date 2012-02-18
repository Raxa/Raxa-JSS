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
