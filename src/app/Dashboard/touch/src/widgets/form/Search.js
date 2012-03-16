/**
 * @class Ext.form.Search
 * @extends Ext.form.Text
 * Wraps an HTML5 search field. See {@link Ext.form.FormPanel FormPanel} for example usage.
 * @xtype searchfield
 * @alternateClassName Ext.form.SearchField
 */
Ext.form.Search = Ext.extend(Ext.form.Text, {
    inputType: 'search'
    /**
     * @cfg {Boolean} useClearIcon @hide
     */
});

Ext.reg('searchfield', Ext.form.Search);

//<deprecated since=0.99>
// DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.form.SearchField = Ext.extend(Ext.form.Search, {

    constructor: function() {
        console.warn("Ext.form.SearchField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Search instead");
        Ext.form.SearchField.superclass.constructor.apply(this, arguments);
    }
});
//</deprecated>