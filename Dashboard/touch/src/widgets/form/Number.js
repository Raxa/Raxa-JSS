/**
 * @class Ext.form.Number
 * @extends Ext.form.Text
 * <p>Wraps an HTML5 number field. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype numberfield
 * @alternateClassName Ext.form.NumberField
 */
Ext.form.Number = Ext.extend(Ext.form.Text, {
    ui: 'number',

    inputType: 'number',
    
    /**
     * @cfg {Number} minValue The minimum value that this Number field can accept (defaults to undefined, e.g. no minimium)
     */
    minValue : undefined,
    
    /**
     * @cfg {Number} minValue The maximum value that this Number field can accept (defaults to undefined, e.g. no maximum)
     */
    maxValue : undefined,
    
    /**
     * @cfg {Number} stepValue The amount by which the field is incremented or decremented each time the spinner is tapped.
     * Defaults to undefined, which means that the field goes up or down by 1 each time the spinner is tapped
     */
    stepValue : undefined,

    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><div class="x-form-field-container">',
            '<input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}"',
                '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                '<tpl if="style">style="{style}" </tpl>',
                '<tpl if="minValue != undefined">min="{minValue}" </tpl>',
                '<tpl if="maxValue != undefined">max="{maxValue}" </tpl>',
                '<tpl if="stepValue != undefined">step="{stepValue}" </tpl>',
                '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
                '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
            '/>',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
            '</div></tpl>',
        '<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div><div></tpl>'
    ],
    
    // @private
    onRender : function() {
        Ext.apply(this.renderData, {
            maxValue : this.maxValue,
            minValue : this.minValue,
            stepValue : this.stepValue 
        });
        
        Ext.form.Number.superclass.onRender.apply(this, arguments);
    }
});

Ext.reg('numberfield', Ext.form.Number);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.NumberField = Ext.extend(Ext.form.Number, {

    constructor: function() {
        console.warn("Ext.form.NumberField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Number instead");
        Ext.form.NumberField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>
