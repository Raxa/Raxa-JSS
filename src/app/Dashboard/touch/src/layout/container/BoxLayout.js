/**
 * @class Ext.layout.BoxLayout
 * @extends Ext.layout.ContainerLayout
 * <p>Base Class for HBoxLayout and VBoxLayout Classes. Generally it should not need to be used directly.</p>
 */
Ext.layout.BoxLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: 'box',

    targetCls: 'x-layout-box',
    //wrapCls: 'x-layout-box-wrap',
    innerCls: 'x-layout-box-inner',

    // document these properties on their subclasses
    pack : 'start',
    align: 'center',

    notifyOwnerCtContainer: true,

    fixedLayout: false,

    /**
     * @cfg {String} direction Specifies the direction in which child components are laid out. Defaults
     * to <tt>'normal'</tt>, which means they are laid out in the order they are added. You can use the
     * <tt>'reverse'</tt> option to have them laid out in reverse.
     */
    direction: 'normal',

    /**
     * @private
     * Runs the child box calculations and caches them in childBoxCache. Subclasses can used these cached values
     * when laying out
     */
    onLayout: function() {
        Ext.layout.BoxLayout.superclass.onLayout.call(this);
        
        if (this.pack === 'left' || this.pack === 'top') {
            this.pack = 'start';
        } else if (this.pack === 'right' || this.pack === 'bottom') {
            this.pack = 'end';
        }

        var target = this.getTarget(),
            ct = target.parent(),
            targetWidth = (ct.getWidth() - ct.getPadding('lr') - ct.getBorderWidth('lr')) + 'px',
            targetHeight = (ct.getHeight() - ct.getPadding('tb') - ct.getBorderWidth('tb')) + 'px';
            
        target.setStyle({
            '-webkit-box-orient': this.orientation,
            '-webkit-box-direction': this.direction,
            '-webkit-box-pack': this.pack,
            '-webkit-box-align': this.align
        });
        
        if (this.orientation == 'horizontal') {
            target.setStyle({
                'min-width': targetWidth,
                'height': targetHeight
            });
        } else {
            target.setStyle({
                'min-height': targetHeight,
                'width': targetWidth
            });
        }

        this.prepareFlexedItems();
        this.setFlexedItems();
    },
    
    prepareFlexedItems : function() {        
        var items = this.getLayoutItems(),
            ln = items.length,
            item, i;

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.flex != undefined) {
                item.el.setStyle('position', 'absolute');
                item.boxEl = this.createBoxEl(item);
            } else {
                item.doComponentLayout();
            }
        }
    },    
        
    setFlexedItems : function() {
        var items = this.getLayoutItems(),
            ln = items.length,
            item, i;
            
        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.flex != undefined) {
                item.boxSize = item.boxEl.getSize();
            }
        }

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.flex != undefined) {
                item.el.setStyle('position', '');
                if (this.align == 'stretch') {
                    item.setSize(item.boxSize);
                } else {
                    if (this.orientation == 'horizontal') {
                        item.setWidth(item.boxSize.width);
                    } else {
                        item.setHeight(item.boxSize.height);
                    }
                }                
                item.boxEl.remove();
                delete item.boxEl;
                delete item.boxSize;
            }
        }
    },
    
    getTarget : function() {
        var owner = this.owner,
            innerCt = this.innerCt;
        
        if (!innerCt) {
            if (owner.scrollEl) {
                innerCt = owner.scrollEl.addCls(this.innerCls);
            } else {
                innerCt = owner.getTargetEl().createChild({cls: this.innerCls});
            }
            this.innerCt = innerCt;
        }

        return innerCt;
    },
    
    createBoxEl : function(item) {
        var el = item.el;
        return el.insertSibling({
            style: 'margin-top: ' + el.getMargin('tb') + 'px; margin-left: ' + el.getMargin('lr') + 'px; -webkit-box-flex: ' + item.flex
        });
    }
});

/**
 * @class Ext.layout.HBoxLayout
 * @extends Ext.layout.BoxLayout
 * <p>A layout that arranges items horizontally across a Container. This layout optionally divides available horizontal
 * space between child items containing a numeric <code>flex</code> configuration. The flex option is a ratio that
 * distributes width after any items with explicit widths have been accounted for. In the code below, the width is calculated
 * as follows:
 * <ul>
 *     <li>The fixed width item is subtracted, leaving us with 300 width</li>
 *     <li>The total flex number is counted, in this case, it is 3</li>
 *     <li>The ratio is then calculated, 300 / 3 = 100</li>
 *     <li>The first item has a flex of 2, so it is set to 2 * 100</li>
 *     <li>The other remaining item is set to 1 * 100</li>
 * </ul></p>
 * <pre><code>
new Ext.Container({
    width: 400,
    height: 300,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        flex: 2,
        html: 'First'
    },{
        width: 100,
        html: 'Second'
    },{
        flex: 1,
        html: 'Third'
    }]
});
 * </code></pre>
 * This layout may also be used to set the heights of child items by configuring it with the {@link #align} option.
 */
Ext.layout.HBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: 'horizontal'
    
    /**
     * @cfg {String} pack
     * Specifies the horizontal alignment of child components. Defaults to <tt>'start'</tt>. Acceptable values are:
     * <ul>
     * <li><b>center</b> : <div class="sub-desc">
     * Aligned to the center of the container.
     * </div></li>
     * 
     * <li><b>end</b> : <div class="sub-desc">
     * Aligned to the right of the container.
     * </div></li>
     * 
     * <li><b>justify</b> : <div class="sub-desc">
     * Justified with both the left and right of the container.
     * </div></li>
     * 
     * <li><b>start</b> : <div class="sub-desc">
     * Aligned to the left of the container.
     * </div></li>
     * </ul>
     */
    
    /**
     * @cfg {String} align Specifies the vertical alignment of child components. Defaults to <tt>'center'</tt>. Acceptable values are:
     * <ul>
     * <li><b>center</b> : <div class="sub-desc">
     * Aligned to the center of the container.
     * </div></li>
     * 
     * <li><b>end</b> : <div class="sub-desc">
     * Aligned to the bottom of the container.
     * </div></li>
     * 
     * <li><b>start</b> : <div class="sub-desc">
     * Aligned to the top of the container.
     * </div></li>
     * 
     * <li><b>stretch</b> : <div class="sub-desc">
     * Components are stretched vertically to fill the container.
     * </div></li>
     * </ul>
     */
});

Ext.regLayout('hbox', Ext.layout.HBoxLayout);

/**
 * @class Ext.layout.VBoxLayout
 * @extends Ext.layout.BoxLayout
 * <p>A layout that arranges items vertically down a Container. This layout optionally divides available vertical
 * space between child items containing a numeric <code>flex</code> configuration. The flex option is a ratio that
 * distributes height after any items with explicit heights have been accounted for. In the code below, the height is calculated
 * as follows:
 * <ul>
 *   <li>The fixed height item is subtracted, leaving us with 300 height</li>
 *   <li>The total flex number is counted, in this case, it is 3</li>
 *   <li>The ratio is then calculated, 300 / 3 = 100</li>
 *   <li>The first item has a flex of 2, so it is set to 2 * 100</li>
 *   <li>The other remaining item is set to 1 * 100</li>
 * </ul></p>
 * <pre><code>
new Ext.Container({
    width: 300,
    height: 400,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        flex: 2,
        html: 'First'
    },{
        width: 100,
        html: 'Second'
    },{
        flex: 1,
        html: 'Third'
    }]
});
 * </code></pre>
 * This layout may also be used to set the widths of child items by configuring it with the {@link #align} option.
 */
Ext.layout.VBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: 'vertical'
    
    /**
     * @cfg {String} pack
     * Specifies the vertical alignment of child components. Defaults to <tt>'start'</tt>. Acceptable values are:
     * <ul>
     * <li><b>center</b> : <div class="sub-desc">
     * Aligned to the center of the container.
     * </div></li>
     * 
     * <li><b>end</b> : <div class="sub-desc">
     * Aligned to the bottom of the container.
     * </div></li>
     * 
     * <li><b>justify</b> : <div class="sub-desc">
     * Justified with both the top and bottom of the container.
     * </div></li>
     * 
     * <li><b>start</b> : <div class="sub-desc">
     * Aligned to the top of the container.
     * </div></li>
     * </ul>
     */
    
    /**
     * @cfg {String} align Specifies the horizontal alignignment of child components. Defaults to <tt>'center'</tt>. Acceptable values are:
     * <ul>
     * <li><b>center</b> : <div class="sub-desc">
     * Aligned to the center of the container.
     * </div></li>
     * 
     * <li><b>end</b> : <div class="sub-desc">
     * Aligned to the right of the container.
     * </div></li>
     * 
     * <li><b>start</b> : <div class="sub-desc">
     * Aligned to the left of the container.
     * </div></li>
     * 
     * <li><b>stretch</b> : <div class="sub-desc">
     * Components are stretched horizontally to fill the container.
     * </div></li>
     * </ul>
     */
    
});

Ext.regLayout('vbox', Ext.layout.VBoxLayout);
