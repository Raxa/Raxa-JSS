/**
 * @class Ext.form.Email
 * @extends Ext.form.Text
 * <p>Wraps an HTML5 email field. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype emailfield
 * @alternateClassName Ext.form.EmailField
 */
Ext.form.Email = Ext.extend(Ext.form.Text, {
    inputType: 'email',
    
    autoCapitalize: false
});

Ext.reg('emailfield', Ext.form.Email);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.EmailField = Ext.extend(Ext.form.Email, {

    constructor: function() {
        console.warn("Ext.form.EmailField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Email instead");
        Ext.form.EmailField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>