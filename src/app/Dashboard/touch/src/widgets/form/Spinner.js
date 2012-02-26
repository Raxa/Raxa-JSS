/**
 * @class Ext.form.Spinner
 * @extends Ext.form.Number
 * <p>Wraps an HTML5 number field. Example usage:
 * <pre><code>
new Ext.form.Spinner({
    minValue: 0,
    maxValue: 100,
    incrementValue: 2,
    cycle: true
});
</code></pre>
 * @xtype spinnerfield
 * @alternateClassName Ext.form.SpinnerField
 */
Ext.form.Spinner = Ext.extend(Ext.form.Number, {

    /**
     * @cfg {Boolean} useClearIcon @hide
     */
    componentCls: 'x-spinner',
    
    /**
     * @cfg {Number} minValue The minimum allowed value (defaults to Number.NEGATIVE_INFINITY)
     */
    minValue: Number.NEGATIVE_INFINITY,
    /**
     * @cfg {Number} maxValue The maximum allowed value (defaults to Number.MAX_VALUE)
     */
    maxValue: Number.MAX_VALUE,
    /**
     * @cfg {Number} incrementValue Value that is added or subtracted from the current value when a spinner is used.
     * Defaults to <tt>1</tt>.
     */
    incrementValue: 1,
    /**
     * @cfg {Boolean} accelerateOnTapHold True if autorepeating should start slowly and accelerate.
     * Defaults to <tt>true</tt>.
     */
    accelerateOnTapHold: true,

    // @private
    defaultValue: 0,

    /**
     * @cfg {Boolean} cycle When set to true, it will loop the values of a minimum or maximum is reached.
     * If the maximum value is reached, the value will be set to the minimum.
     * If the minimum value is reached, the value will be set to the maximum.
     * Defaults to <tt>false</tt>.
     */
    cycle: false,
    
    /**
     * @cfg {Boolean} disableInput True to disable the input field, meaning that only the spinner buttons
     * can be used. Defaults to <tt>false</tt>.
     */
    disableInput: false,

    /**
     * @cfg {Boolean} useClearIcon @hide
     */
    useClearIcon: false,

    /**
     * @cfg {Boolean} autoCapitalize @hide
     */
    autoCapitalize: false,

    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl">',
            '<div class="{componentCls}-body">',
                '<div class="{componentCls}-down"><span>-</span></div>',
                '<div class="x-form-field-container">',
                    '<input id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"',
                        '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                        '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                        '<tpl if="style">style="{style}" </tpl>',
                        '<tpl if="minValue != undefined">min="{minValue}" </tpl>',
                        '<tpl if="maxValue != undefined">max="{maxValue}" </tpl>',
                        '<tpl if="stepValue != undefined">step="{stepValue}" </tpl>',
                        '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                        '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
                    '/>',
                    '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
                '</div>',
                '<div class="{componentCls}-up"><span>+</span></div>',
            '</div>',
        '</tpl>'
    ],
    
    initComponent: function() {
        //<deprecated since=0.99>
        if (Ext.isDefined(this.accelerate)) {
            console.warn("Spinner: accelerate has been removed. Please use accelerateOnTapHold.");
            this.accelerate = this.accelerateOnTapHold;
        }
        //</deprecated>
        
        this.addEvents(
            /**
             * @event spin
             * Fires when the value is changed via either spinner buttons
             * @param {Ext.form.Spinner} this
             * @param {Number} value
             * @param {String} direction 'up' or 'down'
             */
            'spin',
            /**
             * @event spindown
             * Fires when the value is changed via the spinner down button
             * @param {Ext.form.Spinner} this
             * @param {Number} value
             */
            'spindown',
            /**
             * @event spinup
             * Fires when the value is changed via the spinner up button
             * @param {Ext.form.Spinner} this
             * @param {Number} value
             */
            'spinup'
        );

        Ext.form.Spinner.superclass.initComponent.call(this);    
    },

    // @private
    onRender: function() {
        this.renderData.disableInput = this.disableInput;

        Ext.applyIf(this.renderSelectors, {
            spinUpEl: '.x-spinner-up',
            spinDownEl: '.x-spinner-down'
        });

        Ext.form.Spinner.superclass.onRender.apply(this, arguments);
        
        this.downRepeater = this.createRepeater(this.spinDownEl, this.onSpinDown);
        this.upRepeater = this.createRepeater(this.spinUpEl, this.onSpinUp);
    },

    initValue: function() {
        if (isNaN(this.defaultValue)) {
            this.defaultValue = 0;
        }

        if (!this.value) {
            this.value = this.defaultValue;
        }

        Ext.form.Spinner.superclass.initValue.apply(this, arguments);
    },
    
    // @private
    createRepeater: function(el, fn){
        var repeat = new Ext.util.TapRepeater(el, {
            accelerate: this.accelerateOnTapHold
        });

        this.mon(repeat, {
            tap: fn,
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            preventDefault: true,
            scope: this
        });
        
        return repeat;
    },

    // @private
    onSpinDown: function() {
        if (!this.disabled) {
            this.spin(true);
        }
    },

    // @private
    onSpinUp: function() {
        if (!this.disabled) {
            this.spin(false);
        }
    },

    onKeyUp: function(e) {
//        var value = parseInt(this.getValue());
//
//        if (isNaN(value)) {
//            value = this.defaultValue;
//        }
//
//        this.setValue(value);

        Ext.form.Spinner.superclass.onKeyUp.apply(this, arguments);
    },

    // @private
    onTouchStart: function(btn) {
        if (!this.disabled) {
            btn.el.addCls('x-button-pressed');
        }
    },

    // @private
    onTouchEnd: function(btn) {
        btn.el.removeCls('x-button-pressed');
    },

    setValue: function(value) {
        value = parseFloat(value);

        if (isNaN(value)) {
            value = this.defaultValue;
        }

        Ext.form.Spinner.superclass.setValue.call(this, value);
    },

    // @private
    spin: function(down) {
        var value = parseFloat(this.getValue()),
            increment = this.incrementValue,
            cycle = this.cycle,
            min = this.minValue,
            max = this.maxValue,
            direction = down ? 'down': 'up';

        if (down){
            value -= increment;
        }
        else{
            value += increment;
        }

        value = (isNaN(value)) ? this.defaultValue: value;

        if (value < min) {
            value = cycle ? max: min;
        }
        else if (value > max) {
            value = cycle ? min: max;
        }

        this.setValue(value);

        this.fireEvent('spin' + direction, this, value);
        this.fireEvent('spin', this, value, direction);
    },

    // @private
    destroy: function() {
        Ext.destroy(this.downRepeater, this.upRepeater);
        Ext.form.Spinner.superclass.destroy.call(this, arguments);
    }
});

Ext.reg('spinnerfield', Ext.form.Spinner);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.SpinnerField = Ext.extend(Ext.form.Spinner, {

    constructor: function() {
        console.warn("Ext.form.SpinnerField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Spinner instead");
        Ext.form.SpinnerField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>