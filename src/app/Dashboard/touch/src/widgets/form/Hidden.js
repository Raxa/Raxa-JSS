/**
 * @class Ext.form.Hidden
 * @extends Ext.form.Field
 * <p>Wraps a hidden field. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype hiddenfield
 * @xtype hidden
 * @alternateClassName Ext.form.HiddenField
 */
Ext.form.Hidden = Ext.extend(Ext.form.Field, {
    ui: 'hidden',
    
    inputType: 'hidden',

    tabIndex: -1
});

Ext.reg('hiddenfield', Ext.form.Hidden);


// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.HiddenField = Ext.extend(Ext.form.Hidden, {

    constructor: function() {
        console.warn("Ext.form.HiddenField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Hidden instead");
        Ext.form.HiddenField.superclass.constructor.apply(this, arguments);
    }
});

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('hidden', Ext.form.Hidden);
//</deprecated>