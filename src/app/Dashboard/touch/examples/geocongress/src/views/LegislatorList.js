/**
 * @class Geo.views.LegislatorList
 * @extends Ext.List
 *
 * Requires a textarea template to be in the dom to function.
 */
Geo.views.LegislatorList = Ext.extend(Ext.List, {
    initComponent: function() {
        this.store = Geo.stores.Legislators;
        this.itemTpl = Ext.XTemplate.from('legislator-list');
        Geo.views.LegislatorList.superclass.initComponent.call(this);
    }
});