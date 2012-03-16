/**
 * @class Ext.form.Checkbox
 * @extends Ext.form.Field
 * Simple Checkbox class. Can be used as a direct replacement for traditional checkbox fields.
 * @constructor
 * @param {Object} config Optional config object
 * @xtype checkboxfield
 * @xtype checkbox
 */
Ext.form.Checkbox = Ext.extend(Ext.form.Field, {
    ui: 'checkbox',
    
    inputType: 'checkbox',

    /**
     * @cfg {Boolean} checked <tt>true</tt> if the checkbox should render initially checked (defaults to <tt>false</tt>)
     */
    checked: false,
    
    /**
     * @cfg {String} value The string value to submit if the item is in a checked state.
     */
    value: '',

    // @private
    constructor: function(config) {
        this.addEvents(
            /**
             * @event check
             * Fires when the checkbox is checked.
             * @param {Ext.form.Checkbox} this This checkbox
             */
            'check',

            /**
             * @event uncheck
             * Fires when the checkbox is unchecked.
             * @param {Ext.form.Checkbox} this This checkbox
             */
            'uncheck'
        );

        Ext.form.Checkbox.superclass.constructor.call(this, config);
    },
    
    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}" tabIndex="-1" ',
            '<tpl if="checked"> checked </tpl>',
            '<tpl if="style">style="{style}" </tpl> value="{inputValue}" />',
        '</tpl>'
    ],

    // @private
    onRender: function() {
        var isChecked = this.getBooleanIsChecked(this.checked);

        Ext.apply(this.renderData, {
            inputValue  : String(this.value),
            checked     : isChecked
        });

        Ext.form.Checkbox.superclass.onRender.apply(this, arguments);

        if (this.fieldEl) {
            this.mon(this.fieldEl, {
                click: this.onChange,
                scope: this
            });

            this.setChecked(isChecked);
            this.originalState = this.isChecked();
        }
    },
    
    // @private
    onChange: function(e) {
        if (e) {
            if (e.browserEvent) {
                e = e.browserEvent;
            }

            if (Ext.supports.Touch && !e.isSimulated) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }
        
        if (this.isChecked()) {
            this.fireEvent('check', this);
        } else {
            this.fireEvent('uncheck', this);
        }
    },

    /**
     * Returns the checked state of the checkbox.
     * @return {Boolean} True if checked, else otherwise
     */
    isChecked: function() {
        if (this.rendered) {
            return this.fieldEl.dom.checked || false;
        } else {
            return !!this.checked;
        }
    },

    /**
     * Set the checked state of the checkbox.
     * @return {Ext.form.Checkbox} this This checkbox
     */
    setChecked: function(checked) {
        var newState = this.getBooleanIsChecked(checked),
            rendered = this.rendered,
            currentState,
            field;
    
        if (rendered) {
            field = this.fieldEl.dom;
            currentState = field.checked;
        } else {
            currentState = !!this.checked;
        }

        if (currentState != newState) {
            if (rendered) {
                field.checked = newState;
            } else {
                this.checked = newState;
            }
            this.onChange();
        }
        return this;
    },

    /**
     * Set the checked state of the checkbox to true
     * @return {Ext.form.Checkbox} this This checkbox
     */
    check: function() {
        return this.setChecked(true);
    },

    /**
     * Set the checked state of the checkbox to false
     * @return {Ext.form.Checkbox} this This checkbox
     */
    uncheck: function() {
        return this.setChecked(false);
    },

    // Inherited
    reset: function() {
        Ext.form.Checkbox.superclass.reset.apply(this, arguments);
        
        this.setChecked(this.originalState);

        return this;
    },

    //@private
    getBooleanIsChecked: function(value) {
        return /^(true|1|on)/i.test(String(value));
    },

    getSameGroupFields: function() {
        var parent = this.el.up('form'),
            formComponent = Ext.getCmp(parent.id),
            fields = [];

        if (formComponent) {
            fields = formComponent.getFields(this.getName());
        }

        return fields;
    },

    /**
     * Returns an array of values from the checkboxes in the group that are checked,
     * @return {Array}
     */
    getGroupValues: function() {
        var values = [];

        this.getSameGroupFields().forEach(function(field) {
            if (field.isChecked()) {
                values.push(field.getValue());
            }
        });

        return values;
    },

    /**
     * Set the status of all matched checkboxes in the same group to checked
     * @param {Array} values An array of values
     * @return {Ext.form.Checkbox} This checkbox
     */
    setGroupValues: function(values) {
        this.getSameGroupFields().forEach(function(field) {
            field.setChecked((values.indexOf(field.getValue()) !== -1));
        });
        
        return this;
    },

    //Inherited docs
    setValue: function(value) {
        value = String(value);

        Ext.form.Checkbox.superclass.setValue.call(this, value);
    }
});

Ext.reg('checkboxfield', Ext.form.Checkbox);

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('checkbox', Ext.form.Checkbox);
//</deprecated>