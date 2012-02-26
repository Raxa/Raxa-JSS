/**
 * @class Ext.Picker
 * @extends Ext.Sheet
 *
 * <p>A general picker class.  Slots are used to organize multiple scrollable slots into a single picker. {@link #slots} is 
 * the only necessary property</p>
 * 
 * <h2>Example usage:</h2>
 * <pre><code>
var picker = new Ext.Picker({
    slots: [
        {
            name : 'limit_speed',
            title: 'Speed',
            data : [
                {text: '50 KB/s', value: 50},
                {text: '100 KB/s', value: 100},
                {text: '200 KB/s', value: 200},
                {text: '300 KB/s', value: 300}
            ]
        }
    ]
});
picker.show();
 * </code></pre>
 * 
 * @constructor
 * Create a new List
 * @param {Object} config The config object
 * @xtype picker
 */
Ext.Picker = Ext.extend(Ext.Sheet, {
    /**
     * @cfg {String} componentCls
     * The main component class
     */
    componentCls: 'x-picker',
    
    stretchX: true,
    stretchY: true,
    hideOnMaskTap: false,
    
    /**
     * @cfg {String/Mixed} doneButton
     * Can be either:<ul>
     * <li>A {String} text to be used on the Done button</li>
     * <li>An {Object} as config for {@link Ext.Button}</li>
     * <li>false or null to hide it</li></ul>
     *
     * Defaults to 'Done'.
     */
    doneButton: 'Done',
    
    /**
     * @cfg {String/Mixed} doneButton
     * Can be either:<ul>
     * <li>A {String} text to be used on the Done button</li>
     * <li>An {Object} as config for {@link Ext.Button}</li>
     * <li>false or null to hide it</li></ul>
     *
     * Defaults to 'Done'.
     */
    cancelButton: 'Cancel',

    /**
     * @cfg {Number} height
     * The height of the picker.
     * Defaults to 220
     */
    height: 220,
    
    /**
     * @cfg {Boolean} useTitles
     * Generate a title header for each individual slot and use
     * the title configuration of the slot.
     * Defaults to false.
     */
    useTitles: false,

    /**
     * @cfg {String} activeCls
     * CSS class to be applied to individual list items when they have
     * been chosen.
     */
    // activeCls: 'x-picker-active-item',

    /**
     * @cfg {Array} slots
     * An array of slot configurations.
     * <ul>
     *  <li>name - {String} - Name of the slot</li>
     *  <li>align - {String} - Alignment of the slot. left, right, or center</li>
     *  <li>items - {Array} - An array of text/value pairs in the format {text: 'myKey', value: 'myValue'}</li>
     *  <li>title - {String} - Title of the slot. This is used in conjunction with useTitles: true.</li>
     * </ul>
     */
    //
    // chosenCls: 'x-picker-chosen-item',
    
    // private
    defaultType: 'pickerslot',
    
    // private
    initComponent : function() {
        //<deprecated since="0.99">
        if (Ext.isDefined(this.showDoneButton)) {
            console.warn("[Ext.Picker] showDoneButton config is deprecated. Please use doneButton instead");
        }

        if (Ext.isDefined(this.doneText)) {
            console.warn("[Ext.Picker] doneText config is deprecated. Please use doneButton instead");
            this.doneButton = this.doneText;
        }
        //</deprecated>

        this.addEvents(
            /**
             * @event pick
             * Fired when a slot has been picked
             * @param {Ext.Picker} this This Picker
             * @param {Object} The values of this picker's slots, in {name:'value'} format
             * @param {Ext.Picker.Slot} slot An instance of Ext.Picker.Slot that has been picked
             */
            'pick',

            /**
             * @event change
             * Fired when the picked value has changed
             * @param {Ext.Picker} this This Picker
             * @param {Object} The values of this picker's slots, in {name:'value'} format
             */
            'change',

            /**
             * @event cancel
             * Fired when the cancel button is tapped and the values are reverted back to
             * what they were
             * @param {Ext.Picker} this This Picker
             */
            'cancel'
        );
            
        this.layout = {
            type: 'hbox',
            align: 'stretch'
        };

        if (this.slots) {
            this.items = this.items ? (Ext.isArray(this.items) ? this.items : [this.items]) : [];
            this.items = this.items.concat(this.slots);
        }
        
        if (this.useTitles) {
            this.defaults = Ext.applyIf(this.defaults || {}, {
                title: ''
            });            
        }

        this.on('slotpick', this.onSlotPick, this);

        if (this.doneButton || this.cancelButton) {
            var toolbarItems = [];

            if (this.cancelButton) {
                toolbarItems.push(
                    Ext.apply(
                        {
                            handler: this.onCancelButtonTap,
                            scope: this
                        },
                        ((Ext.isObject(this.cancelButton) ? this.cancelButton : { text: String(this.cancelButton) }))
                    )
                );
            }

            toolbarItems.push({xtype: 'spacer'});

            if (this.doneButton) {
                toolbarItems.push(
                    Ext.apply(
                        {
                            ui: 'action',
                            handler: this.onDoneButtonTap,
                            scope: this
                        },
                        ((Ext.isObject(this.doneButton) ? this.doneButton : { text: String(this.doneButton) }))
                    )
                );
            }

            this.toolbar = new Ext.Toolbar(Ext.applyIf(this.buttonBar || {
                dock: 'top',
                items: toolbarItems,
                defaults: {
                    xtype: 'button'
                }
            }));
           
            this.dockedItems = this.dockedItems ? (Ext.isArray(this.dockedItems) ? this.dockedItems : [this.dockedItems]) : [];
            this.dockedItems.push(this.toolbar);
        }

        Ext.Picker.superclass.initComponent.call(this);
    },

    // @private
    afterRender: function() {
        Ext.Picker.superclass.afterRender.apply(this, arguments);

        if (this.value) {
            this.setValue(this.value, false);
        }
    },

    /**
     * @private
     * Called when the done button has been tapped.
     */
    onDoneButtonTap : function() {
        var anim = this.animSheet('exit');
        Ext.apply(anim, {
            after: function() {
                this.fireEvent('change', this, this.getValue());
            },
            scope: this
        });
        this.hide(anim);
    },

    /**
     * @private
     * Called when the cancel button has been tapped.
     */
    onCancelButtonTap : function() {
        var anim = this.animSheet('exit');
        Ext.apply(anim, {
            after: function() {
                // Set the value back to what it was previously
                this.setValue(this.values);
                this.fireEvent('cancel', this);
            },
            scope: this
        });
        this.hide(anim);
    },
    
    /**
     * @private
     * Called when a slot has been picked.
     */
    onSlotPick: function(slot, value, node) {
        this.fireEvent('pick', this, this.getValue(), slot);
        return false;
    },
    
    /**
     * Sets the values of the pickers slots
     * @param {Object} values The values in a {name:'value'} format
     * @param {Boolean} animated True to animate setting the values
     * @return {Ext.Picker} this This picker
     */
    setValue: function(values, animated) {
        var slot,
            items = this.items.items,
            ln = items.length;

        // Value is an object with keys mapping to slot names
        if (!values) {
            for (var i = 0; i < ln; i++) {
                items[i].setSelectedNode(0);
            }
            
            return this;
        }

        Ext.iterate(values, function(key, value) {
            slot = this.child('[name=' + key + ']');
            
            if (slot) {
                slot.setValue(value, animated);
            }
        }, this);

        this.values = values;
       
        return this;
    },
    
    /**
     * Returns the values of each of the pickers slots
     * @return {Object} The values of the pickers slots
     */
    getValue: function() {
        var values = {},
            items = this.items.items,
            ln = items.length, item, i;

        for (i = 0; i < ln; i++) {
            item = items[i];
            values[item.name] = item.getValue();
        }

        return values;
    }
});

Ext.regModel('x-textvalue', {
    fields: ['text', 'value']
});

/**
 * @private
 * @class Ext.Picker.Slot
 * @extends Ext.DataView
 *
 * <p>A general picker slot class.  Slots are used to organize multiple scrollable slots into a single picker
 * See also: {@link Ext.Picker}</p>
 * 
 * @constructor
 * Create a new Picker Slot
 * @param {Object} config The config object
 * @xtype pickerslot
 */
Ext.Picker.Slot = Ext.extend(Ext.DataView, {
    isSlot: true,
    
    flex: 1,

    /**
     * @cfg {String} name
     * The name of this slot. This config option is required.
     */
    name: null,

    /**
     * @cfg {String} displayField
     * The display field in the store.
     * Defaults to 'text'.
     */
    displayField: 'text',

    /**
     * @cfg {String} valueField
     * The value field in the store.
     * Defaults to 'value'.
     */
    valueField: 'value',

    /**
     * @cfg {String} align
     * The alignment of this slot.
     * Defaults to 'center'
     */
    align: 'center',
    
    /**
     * @hide
     * @cfg {String} itemSelector
     */
    itemSelector: 'div.x-picker-item',
    
    /**
     * @private
     * @cfg {String} componentCls
     * The main component class
     */
    componentCls: 'x-picker-slot',
    
    /**
     * @private
     * @cfg {Ext.Template/Ext.XTemplate/Array} renderTpl
     * The renderTpl of the slot.
     */
    renderTpl : [
        '<div class="x-picker-mask">',
            '<div class="x-picker-bar"></div>',
        '</div>'
    ],
    
    /**
     * @private
     * The current selectedIndex of the picker slot
     */
    selectedIndex: 0,
    
    /**
     * @private
     */
    getElConfig: function() {
        return {
            tag: 'div',
            id: this.id,
            cls: 'x-picker-' + this.align
        };
    },
    
    /**
     * @private
     */
    initComponent : function() {
        // <debug>
        if (!this.name) {
            throw new Error('Each picker slot is required to have a name.');
        }
        // </debug>

        Ext.apply(this.renderSelectors, {
            mask: '.x-picker-mask',
            bar: '.x-picker-bar'
        });

        this.scroll = {
            direction: 'vertical',
            useIndicators: false,
            friction: 0.7,
            acceleration: 25,
            snapDuration: 200,
            animationDuration: 200
        };

        this.tpl = new Ext.XTemplate([
            '<tpl for=".">',
                '<div class="x-picker-item {cls} <tpl if="extra">x-picker-invalid</tpl>">{' + this.displayField + '}</div>',
            '</tpl>'
        ]);

        var data = this.data,
            parsedData = [],
            ln = data && data.length,
            i, item, obj;

        if (data && Ext.isArray(data) && ln) {
            for (i = 0; i < ln; i++) {
                item = data[i];
                obj = {};
                if (Ext.isArray(item)) {
                    obj[this.valueField] = item[0];
                    obj[this.displayField] = item[1];
                }
                else if (Ext.isString(item)) {
                    obj[this.valueField] = item;
                    obj[this.displayField] = item;
                }
                else if (Ext.isObject(item)) {
                    obj = item;
                }
                parsedData.push(obj);
            }

            this.store = new Ext.data.Store({
                model: 'x-textvalue',
                data: parsedData
            });
            
            this.tempStore = true;
        }
        else if (this.store) {
            this.store = Ext.StoreMgr.lookup(this.store);
        }

        this.enableBubble('slotpick');

        if (this.title) {
            this.title = new Ext.Component({
                dock: 'top',
                componentCls: 'x-picker-slot-title',
                html: this.title
            });
            this.dockedItems = this.title;
        }

        Ext.Picker.Slot.superclass.initComponent.call(this);

        if (this.value !== undefined) {
            this.setValue(this.value, false);
        }
    },
    
    /**
     * @private
     */
    setupBar: function() {
        this.el.setStyle({padding: ''});

        var padding = this.bar.getY() - this.el.getY();
        this.barHeight = this.bar.getHeight();

        this.el.setStyle({
            padding: padding + 'px 0'
        });
        this.slotPadding = padding;
        this.scroller.updateBoundary();
        this.scroller.setSnap(this.barHeight);
        this.setSelectedNode(this.selectedIndex, false);
    },
    
    /**
     * @private
     */
    afterComponentLayout: function() {
        // Dont call superclass afterComponentLayout since we dont want
        // the scroller to get a min-height
        Ext.defer(this.setupBar, 200, this);
    },
    
    /**
     * @private
     */
    initEvents: function() {
        this.mon(this.scroller, {
            scrollend: this.onScrollEnd,
            scope: this
        });
    },
    
    /**
     * @private
     */
    onScrollEnd: function(scroller, offset) {
        this.selectedNode = this.getNode(Math.round(offset.y / this.barHeight));
        this.selectedIndex = this.indexOf(this.selectedNode);
        this.fireEvent('slotpick', this, this.getValue(), this.selectedNode);
    },
    
    /**
     * @private
     */
    scrollToNode: function(node, animate) {
        var offsetsToBody = Ext.fly(node).getOffsetsTo(this.scrollEl)[1];
        this.scroller.scrollTo({
            y: offsetsToBody
        }, animate !== false ? true : false);
    },
    
    /**
     * @private
     * Called when an item has been tapped
     */
    onItemTap: function(node) {
        Ext.Picker.Slot.superclass.onItemTap.apply(this, arguments);
        this.setSelectedNode(node);

        this.selectedNode = node;
        this.selectedIndex = this.indexOf(node);
        this.fireEvent('slotpick', this, this.getValue(), this.selectedNode);
    },
    
    /**
     * 
     */
    getSelectedNode: function() {
        return this.selectedNode;
    },
    
    /**
     * 
     */
    setSelectedNode: function(selected, animate) {
        // If it is a number, we assume we are dealing with an index
        if (Ext.isNumber(selected)) {
            selected = this.getNode(selected);
        }
        else if (selected.isModel) {
            selected = this.getNode(this.store.indexOf(selected));
        }

        // If its not a model or a number, we assume its a node
        if (selected) {
            this.selectedNode = selected;
            this.selectedIndex = this.indexOf(selected);
            this.scrollToNode(selected, animate);
        }
    },
    
    /**
     * 
     */
    getValue: function() {
        var record = this.store.getAt(this.selectedIndex);
        return record ? record.get(this.valueField) : null;
    },

    /**
     * 
     */
    setValue: function(value, animate) {
        var index = this.store.find(this.valueField, value);
        if (index != -1) {
            if (!this.rendered) {
                this.selectedIndex = index;
                return;
            }
            this.setSelectedNode(index, animate);
        }
    },

    onDestroy: function() {
        if (this.tempStore) {
            this.store.destroyStore();
            this.store = null;
        }
        Ext.Picker.Slot.superclass.onDestroy.call(this);
    }
});

Ext.reg('pickerslot', Ext.Picker.Slot);
