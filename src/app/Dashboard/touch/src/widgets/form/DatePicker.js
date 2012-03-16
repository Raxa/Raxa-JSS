/**
 * @class Ext.form.DatePicker
 * @extends Ext.form.Field
 * <p>Specialized field which has a button which when pressed, shows a {@link Ext.DatePicker}.</p>
 * @xtype datepickerfield
 * @alternateClassName Ext.form.DatePickerField
 */
Ext.form.DatePicker = Ext.extend(Ext.form.Field, {
    ui: 'select',
    
    /**
     * @cfg {Object/Ext.DatePicker} picker
     * An object that is used when creating the internal {@link Ext.DatePicker} component or a direct instance of {@link Ext.DatePicker}
     * Defaults to null
     */
    picker: null,

    /**
     * @cfg {Object/Date} value
     * Default value for the field and the internal {@link Ext.DatePicker} component. Accepts an object of 'year', 
     * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
     * 
     * Example: {year: 1989, day: 1, month: 5} = 1st May 1989 or new Date()
     */

    /**
     * @cfg {Boolean} destroyPickerOnHide
     * Whether or not to destroy the picker widget on hide. This save memory if it's not used frequently, 
     * but increase delay time on the next show due to re-instantiation. Defaults to false
     */
    destroyPickerOnHide: false,

    // @cfg {Number} tabIndex @hide

    // @cfg {Boolean} useMask @hide
    
    // @private
    initComponent: function() {
        this.addEvents(
            /**
             * @event change
             * Fires when a date is selected
             * @param {Ext.form.DatePicker} this
             * @param {Date} date The new date
             */
            'change'
        );

        this.tabIndex = -1;
        this.useMask = true;

        Ext.form.Text.superclass.initComponent.apply(this, arguments);
    },

    /**
     * Get an instance of the internal date picker; will create a new instance if not exist.
     * @return {Ext.DatePicker} datePicker
     */
    getDatePicker: function() {
        if (!this.datePicker) {
            if (this.picker instanceof Ext.DatePicker) {
                this.datePicker = this.picker;
            } else {
                this.datePicker = new Ext.DatePicker(Ext.apply(this.picker || {}));
            }

            this.datePicker.setValue(this.value || null);

            this.datePicker.on({
                scope : this,
                change: this.onPickerChange,
                hide  : this.onPickerHide
            });
        }

        return this.datePicker;
    },

    /**
     * @private
     * Listener to the tap event of the mask element. Shows the internal {@link #datePicker} component when the button has been tapped.
     */
    onMaskTap: function() {
        if (Ext.form.DatePicker.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false;
        }
        
        this.getDatePicker().show();
    },
    
    /**
     * Called when the picker changes its value
     * @param {Ext.DatePicker} picker The date picker
     * @param {Object} value The new value from the date picker
     * @private
     */
    onPickerChange : function(picker, value) {
        this.setValue(value);
        this.fireEvent('change', this, this.getValue());
    },
    
    /**
     * Destroys the picker when it is hidden, if
     * {@link Ext.form.DatePicker#destroyPickerOnHide destroyPickerOnHide} is set to true
     * @private
     */
    onPickerHide: function() {
        if (this.destroyPickerOnHide && this.datePicker) {
            this.datePicker.destroy();
        }
    },

    // inherit docs
    setValue: function(value, animated) {
        if (this.datePicker) {
            this.datePicker.setValue(value, animated);
            this.value = (value != null) ? this.datePicker.getValue() : null;
        } else {
            if (!Ext.isDate(value) && !Ext.isObject(value)) {
                value = null;
            }

            if (Ext.isObject(value)) {
                this.value = new Date(value.year, value.month-1, value.day);
            } else {
                this.value = value;
            }
        }

        if (this.rendered) {
            this.fieldEl.dom.value = this.getValue(true);
        }
        
        return this;
    },
    
    /**
     * Returns the value of the field, which will be a {@link Date} unless the <tt>format</tt> parameter is true.
     * @param {Boolean} format True to format the value with <tt>Ext.util.Format.defaultDateFormat</tt>
     */
    getValue: function(format) {
        var value = this.value || null;
        return (format && Ext.isDate(value)) ? value.format(Ext.util.Format.defaultDateFormat) : value;
    },
    
    // @private
    onDestroy: function() {
        if (this.datePicker) {
            this.datePicker.destroy();
        }
        
        Ext.form.DatePicker.superclass.onDestroy.call(this);
    }
});

Ext.reg('datepickerfield', Ext.form.DatePicker);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.DatePickerField = Ext.extend(Ext.form.DatePicker, {

    constructor: function() {
        console.warn("Ext.form.DatePickerField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.DatePicker instead");
        Ext.form.DatePickerField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>