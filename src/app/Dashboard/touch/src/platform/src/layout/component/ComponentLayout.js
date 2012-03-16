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
