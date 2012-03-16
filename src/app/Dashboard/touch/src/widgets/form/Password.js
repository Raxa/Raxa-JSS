/**
 * @class Ext.form.Password
 * @extends Ext.form.Text
 * <p>Wraps an HTML5 password field. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype passwordfield
 * @alternateClassName Ext.form.PasswordField
 */
Ext.form.Password = Ext.extend(Ext.form.Text, {
    inputType: 'password',
    autoCapitalize : false
});

Ext.reg('passwordfield', Ext.form.Password);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.PasswordField = Ext.extend(Ext.form.Password, {

    constructor: function() {
        console.warn("Ext.form.PasswordField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Password instead");
        Ext.form.PasswordField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>