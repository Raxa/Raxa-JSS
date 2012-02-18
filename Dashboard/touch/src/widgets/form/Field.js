/**
 * @class Ext.form.Field
 * @extends Ext.Container
 * <p>Base class for form fields that provides default event handling, sizing, value handling and other functionality. Ext.form.Field
 * is not used directly in applications, instead the subclasses such as {@link Ext.form.Text} should be used.</p>
 * @constructor
 * Creates a new Field
 * @param {Object} config Configuration options
 * @xtype field
 */
Ext.form.Field = Ext.extend(Ext.Component,  {
    /**
     * Set to true on all Ext.form.Field subclasses. This is used by {@link Ext.form.FormPanel#getValues} to determine which
     * components inside a form are fields.
     * @property isField
     * @type Boolean
     */
    isField: true,

    /**
     * <p>The label Element associated with this Field. <b>Only available if a {@link #label} is specified.</b></p>
     * @type Ext.Element
     * @property labelEl
     */

    /**
     * @cfg {Number} tabIndex The tabIndex for this field. Note this only applies to fields that are rendered,
     * not those which are built via applyTo (defaults to undefined).
     */

    /**
     * @cfg {Mixed} value A value to initialize this field with (defaults to undefined).
     */

    /**
     * @cfg {String} name The field's HTML name attribute (defaults to '').
     * <b>Note</b>: this property must be set if this field is to be automatically included with
     * {@link Ext.form.FormPanel#submit form submit()}.
     */

    /**
     * @cfg {String} cls A custom CSS class to apply to the field's underlying element (defaults to '').
     */

    /**
     * @cfg {String} fieldCls The default CSS class for the field (defaults to 'x-form-field')
     */
    fieldCls: 'x-form-field',

    baseCls: 'x-field',

    /**
     * @cfg {String} inputCls Optional CSS class that will be added to the actual <input> element (or whichever different element is
     * defined by {@link inputAutoEl}). Defaults to undefined.
     */
    inputCls: undefined,

    /**
     * @cfg {Boolean} disabled True to disable the field (defaults to false).
     * <p>Be aware that conformant with the <a href="http://www.w3.org/TR/html401/interact/forms.html#h-17.12.1">HTML specification</a>,
     * disabled Fields will not be {@link Ext.form.BasicForm#submit submitted}.</p>
     */
    disabled: false,

    renderTpl: [
        '<tpl if="label">',
            '<div class="x-form-label"><span>{label}</span></div>',
        '</tpl>',
        '<tpl if="fieldEl">',
            '<div class="x-form-field-container"><input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}"',
                '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                '<tpl if="style">style="{style}" </tpl>',
                '<tpl if="maxlength">maxlength="{maxlength}" </tpl>',
                '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
                '<tpl if="autoCorrect">autocorrect="{autoCorrect}" </tpl> />',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
            '</div>',
            '<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div></div></tpl>',
        '</tpl>'
    ],

    // @private
    isFormField: true,

    /**
     * @cfg {Boolean} autoCreateField True to automatically create the field input element on render.
     * This is true by default, but should be set to false for any Ext.Field subclasses that don't
     * need an HTML input (e.g. Ext.Slider and similar)
     */
    autoCreateField: true,

    /**
     * @cfg {String} inputType The type attribute for input fields -- e.g. radio, text, password, file (defaults
     * to 'text'). The types 'file' and 'password' must be used to render those field types currently -- there are
     * no separate Ext components for those. Note that if you use <tt>inputType:'file'</tt>, {@link #emptyText}
     * is not supported and should be avoided.
     */
    inputType: 'text',
    
    /**
     * @cfg {String} label The label to associate with this field. Defaults to <tt>null</tt>.
     */
    label: null,

    /**
     * @cfg {Mixed} labelWidth The width of the label, can be any valid CSS size. E.g '20%', '6em', '100px'.
     * Defaults to <tt>'30%'</tt>
     */
    labelWidth: '30%',

    /**
     * @cfg {String} labelAlign The location to render the label of the field. Acceptable values are 'top' and 'left'.
     * Defaults to <tt>'left'</tt>
     */
    labelAlign: 'left',

    /**
     * @cfg {Boolean} required True to make this field required. Note: this only causes a visual indication.
     * Doesn't prevent user from submitting the form.
     */
    required: false,

    // @private
    useMask: false,

    // @private
    initComponent: function() {
        //<deprecated since="0.99">
        if (Ext.isDefined(this.fieldLabel)) {
            console.warn("[Ext.form.Field] fieldLabel has been deprecated. Please use label instead.");
            this.label = this.fieldLabel;
        }

        if (Ext.isDefined(this.fieldClass)) {
            console.warn("[Ext.form.Field] fieldClass has been deprecated. Please use fieldCls instead.");
            this.fieldCls = this.fieldClass;
        }

        if (Ext.isDefined(this.focusClass)) {
            console.warn("[Ext.form.Field] focusClass has been deprecated. Please use focusCls instead.");
            this.focusCls = this.focusClass;
        }

        if (Ext.isDefined(this.inputValue)) {
            console.warn("[Ext.form.Field] inputValue has been deprecated. Please use value instead.");
            this.value = this.inputValue;
        }
        //</deprecated>

        Ext.form.Field.superclass.initComponent.call(this);
    },

    /**
     * Returns the {@link Ext.form.Field#name name} or {@link Ext.form.ComboBox#hiddenName hiddenName}
     * attribute of the field if available.
     * @return {String} name The field {@link Ext.form.Field#name name} or {@link Ext.form.ComboBox#hiddenName hiddenName}
     */
    getName: function() {
        return this.name || this.id || '';
    },

    /**
     * @private
     */
    applyRenderSelectors: function() {
        this.renderSelectors = Ext.applyIf(this.renderSelectors || {}, {
            mask: '.x-field-mask',
            labelEl: '.x-form-label',
            fieldEl: '.' + Ext.util.Format.trim(this.renderData.fieldCls).replace(/ /g, '.')
        });

        Ext.form.Field.superclass.applyRenderSelectors.call(this);
    },

    /**
     * @private
     */
    initRenderData: function() {
        Ext.form.Field.superclass.initRenderData.apply(this, arguments);
        
        Ext.applyIf(this.renderData, {
            disabled        :   this.disabled,
            fieldCls        :   'x-input-' + this.inputType + (this.inputCls ? ' ' + this.inputCls: ''),
            fieldEl         :   !this.fieldEl && this.autoCreateField,
            inputId         :   Ext.id(),
            label           :    this.label,
            labelAlign      :   'x-label-align-' + this.labelAlign,
            name            :   this.getName(),
            required        :   this.required,
            style           :   this.style,
            tabIndex        :   this.tabIndex,
            inputType       :   this.inputType,
            useMask         :   this.useMask
        });
        
        return this.renderData;
    },

    // @private
    initEvents: function() {
        Ext.form.Field.superclass.initEvents.apply(this, arguments);
        
        if (this.fieldEl) {
            if (this.useMask && this.mask) {
                this.mon(this.mask, {
                    click: this.onMaskTap,
                    scope: this
                });
            }
        }
    },

    /**
     * @private
     */
    onRender: function() {
        Ext.form.Field.superclass.onRender.apply(this, arguments);
        
        var cls = [];
        
        if (this.required) {
            cls.push('x-field-required');
        }
        if (this.label) {
            cls.push('x-label-align-' + this.labelAlign);
        }

        this.el.addCls(cls);
    },

    /**
     * @private
     */
    afterRender: function() {
        Ext.form.Field.superclass.afterRender.apply(this, arguments);

        if (this.label) {
            this.setLabelWidth(this.labelWidth);
        }

        this.initValue();
    },

    isDisabled: function() {
        return this.disabled;
    },

    // @private
    onEnable: function() {
        this.fieldEl.dom.disabled = false;
    },

    // @private
    onDisable: function() {
        this.fieldEl.dom.disabled = true;
    },

    // @private
    initValue: function() {
        this.setValue(this.value || '', true);

        /**
         * The original value of the field as configured in the {@link #value} configuration, or
         * as loaded by the last form load operation if the form's {@link Ext.form.BasicForm#trackResetOnLoad trackResetOnLoad}
         * setting is <code>true</code>.
         * @type mixed
         * @property originalValue
         */
        this.originalValue = this.getValue();
    },

    /**
     * <p>Returns true if the value of this Field has been changed from its original value.
     * Will return false if the field is disabled or has not been rendered yet.</p>
     * <p>Note that if the owning {@link Ext.form.BasicForm form} was configured with
     * {@link Ext.form.BasicForm}.{@link Ext.form.BasicForm#trackResetOnLoad trackResetOnLoad}
     * then the <i>original value</i> is updated when the values are loaded by
     * {@link Ext.form.BasicForm}.{@link Ext.form.BasicForm#setValues setValues}.</p>
     * @return {Boolean} True if this field has been changed from its original value (and
     * is not disabled), false otherwise.
     */
    isDirty: function() {
        if (this.disabled || !this.rendered) {
            return false;
        }
        
        return String(this.getValue()) !== String(this.originalValue);
    },

    // @private
    onMaskTap: function(e) {
        if (this.disabled) {
            return false;
        }

//        if (Ext.is.iOS && e.browserEvent && !e.browserEvent.isSimulated) {
//            console.log('onMaskTap prevented');
//            e.preventDefault();
//            e.stopPropagation();
//            return false;
//        }

        return true;
    },

    // @private
    showMask: function(e) {
        if (this.mask) {
            this.mask.setStyle('display', 'block');
        }
    },

    hideMask: function(e) {
        if (this.mask) {
            this.mask.setStyle('display', 'none');
        }
    },
    
    /**
     * Resets the current field value to the originally loaded value and clears any validation messages.
     * See {@link Ext.form.BasicForm}.{@link Ext.form.BasicForm#trackResetOnLoad trackResetOnLoad}
     */
    reset: function() {
        this.setValue(this.originalValue);
    },

    /**
     * Returns the field data value
     * @return {Mixed} value The field value
     */
    getValue: function(){
        if (!this.rendered || !this.fieldEl) {
            return this.value;
        }
        
        return this.fieldEl.getValue();
    },

    /**
     * Set the field data value
     * @param {Mixed} value The value to set
     * @return {Ext.form.Field} this
     */
    setValue: function(value){
        this.value = value;

        if (this.rendered && this.fieldEl) {
            this.fieldEl.dom.value = (Ext.isEmpty(value) ? '' : value);
        }

        return this;
    },

    /**
     * Set the label width
     * @param {Mixed} width The width of the label, can be any valid CSS size. E.g '20%', '6em', '100px'
     * @return {Ext.form.Field} this
     */
    setLabelWidth: function(width) {
        if (this.labelEl) {
            this.labelEl.setWidth(width);
        }

        return this;
    }
});

Ext.reg('field', Ext.form.Field);
