/**
 * @class Ext.Sheet
 * @extends Ext.Panel
 *
 * <p>A general sheet class.  This renderable container provides base support for orientation-aware
 * transitions for popup or side-anchored sliding Panels.</p>
 *
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Sheet/screenshot.png Ext.Sheet screenshot}
 * 
 * <h2>Example usage:</h2>
 * <pre><code>
var sheet = new Ext.Sheet({
    height  : 200,
    stretchX: true,
    stretchY: true,
    
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    dockedItems: [
        {
            dock : 'bottom',
            xtype: 'button',
            text : 'Click me'
        }
    ]
});
sheet.show();
 * </code></pre>
 * 
 * <p>See {@link Ext.Picker} and {@link Ext.DatePicker}</p>
 * @xtype sheet
 */
Ext.Sheet = Ext.extend(Ext.Panel, {
    baseCls : 'x-sheet',
    centered : false,
    floating : true,
    modal    : true,
    draggable : false,
    monitorOrientation : true,
    
    hidden    : true,
    
    /**
    * @cfg {Boolean} hideOnMaskTap
    * True to automatically bind a tap listener to the mask that hides the window.
    * Defaults to false. Note: if you don't set this property to false you have to programmaticaly
    * hide the overlay.
    */
    hideOnMaskTap : false,
    
    /**
     * @cfg {Boolean} stretchX
     * If true, the width of anchored Sheets are adjusted to fill the entire top/bottom axis width,
     * or false to center the Sheet along the same axis based upon the sheets current/calculated width.
     * This option is ignored when {link #centered} is true or x/y coordinates are specified for the Sheet.
     */

    /**
     * @cfg {Boolean} stretchY
     * If true, the height of anchored Sheets are adjusted to fill the entire right/left axis height,
     * or false to center the Sheet along the same axis based upon the sheets current/calculated height.
     * This option is ignored when {link #centered} is true or x/y coordinates are specified for the Sheet.
     */

    /**
     * @cfg {String} enter
     * The viewport side from which to anchor the sheet when made visible (top, bottom, left, right)
     * Defaults to 'bottom'
     */
    enter : 'bottom',

    /**
     * @cfg {String} exit
     * The viewport side used as the exit point when hidden (top, bottom, left, right)
     * Applies to sliding animation effects only. Defaults to 'bottom'
     */
    exit : 'bottom',


    /**
     * @cfg {String/Object} enterAnimation
     * the named Ext.anim effect or animation configuration object used for transitions
     * when the component is shown. Defaults to 'slide'
     */
    enterAnimation : 'slide',

    /**
     *
     * @cfg {String/Object} exitAnimation
     * the named Ext.anim effect or animation configuration object used for transitions
     * when the component is hidden. Defaults to 'slide'
     */
    exitAnimation : 'slide',

    // @private slide direction defaults
    transitions : {
        bottom : 'up',
        top    : 'down',
        right  : 'left',
        left   : 'right'
    },

    //@private
    animSheet : function(animate) {
      var anim = null,
          me = this,
          tr = me.transitions,
          opposites = Ext.Anim.prototype.opposites || {};

      if (animate && this[animate]) {
         if (animate == 'enter') {
             anim = (typeof me.enterAnimation == 'string') ?
                 {
                     type : me.enterAnimation || 'slide',
                     direction : tr[me.enter] || 'up'
                 } : me.enterAnimation;

         }
         else if (animate == 'exit') {
            anim = (typeof me.exitAnimation == 'string') ?
                 {
                     type : me.exitAnimation || 'slide',
                     direction : tr[me.exit] || 'down'
                 } :  me.exitAnimation;
         }
      }
      return anim;
    },

    // @private
    orient : function(orientation, w, h) {
        if(!this.container || this.centered || !this.floating){
            return this;
        }

        var me = this,
            cfg = me.initialConfig || {},
            //honor metrics (x, y, height, width) initialConfig
            size = {width : cfg.width, height : cfg.height},
            pos  = {x : cfg.x, y : cfg.y},
            box  = me.el.getPageBox(),
            pageBox, scrollTop = 0;

        if (me.container.dom == document.body) {
            pageBox = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            scrollTop = document.body.scrollTop;
        }
        else {
            pageBox = me.container.getPageBox();
        }

        pageBox.centerY = pageBox.height / 2;
        pageBox.centerX = pageBox.width / 2;

        if(pos.x != undefined || pos.y != undefined){
            pos.x = pos.x || 0;
            pos.y = pos.y || 0;
        }
        else {
            if (/^(bottom|top)/i.test(me.enter)) {
                size.width  = me.stretchX ? pageBox.width : Math.min(200,Math.max(size.width || box.width || pageBox.width, pageBox.width));
                size.height = Math.min(size.height || 0, pageBox.height) || undefined;
                size = me.setSize(size).getSize();
                pos.x = pageBox.centerX - size.width / 2;
                pos.y = me.enter == 'top' ? 0 : pageBox.height - size.height + scrollTop;

            } else if (/^(left|right)/i.test(me.enter)) {
                size.height = me.stretchY ? pageBox.height : Math.min(200, Math.max(size.height || box.height || pageBox.height, pageBox.height));
                size.width  = Math.min(size.width || 0, pageBox.width) || undefined;
                size = me.setSize(size).getSize();
                pos.y = 0;
                pos.x = me.enter == 'left' ? 0 : pageBox.width - size.width;
            }
        }
        me.setPosition(pos);
        return this;
    },

     // @private
    afterRender : function() {
        Ext.Sheet.superclass.afterRender.apply(this, arguments);
        this.el.setVisibilityMode(Ext.Element.OFFSETS);
    },

    // @private
    onShow : function(animation) {
        this.orient();
        return Ext.Sheet.superclass.onShow.call(this, animation || this.animSheet('enter'));
    },

    // @private
    onOrientationChange : function(orientation, w, h) {
        this.orient();
        Ext.Sheet.superclass.onOrientationChange.apply(this, arguments);
    },

    // @private
    beforeDestroy : function() {
        delete this.showAnimation;
        this.hide(false);
        Ext.Sheet.superclass.beforeDestroy.call(this);
    }
});

Ext.reg('sheet', Ext.Sheet);

/**
 * @class Ext.ActionSheet
 * @extends Ext.Sheet
 *
 * <p>A Button Sheet class designed to popup or slide/anchor a series of buttons.</p>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.ActionSheet/screenshot.png Ext.ActionSheet screenshot}
 *
 * <h2>Example code:</h2>
 * <pre><code>
var actionSheet = new Ext.ActionSheet({
    items: [
        {
            text: 'Delete draft',
            ui  : 'decline'
        },
        {
            text: 'Save draft'
        },
        {
            text: 'Cancel',
            ui  : 'confirm'
        }
    ]
});
actionSheet.show();</code></pre>
 * @xtype sheet
 */

Ext.ActionSheet = Ext.extend(Ext.Sheet, {
    componentCls: 'x-sheet-action',

    stretchY: true,
    stretchX: true,

    defaultType: 'button',

    constructor : function(config) {
        config = config || {};

        Ext.ActionSheet.superclass.constructor.call(this, Ext.applyIf({
            floating : true
        }, config));
    }
});

Ext.reg('actionsheet', Ext.ActionSheet);