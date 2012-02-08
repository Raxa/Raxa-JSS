/**
 * @private
 */
Ext.define('Ext.util.Grouper', {

    /* Begin Definitions */

    extend: 'Ext.util.Sorter',

    isGrouper: true,
    
    config: {
        groupFn: null,

        sorterFn: function(item1, item2) {
            var groupFn = this.getGroupFn(),
                group1 = groupFn.call(this, item1),
                group2 = groupFn.call(this, item2);

            return (group1 > group2) ? 1 : ((group1 < group2) ? -1 : 0);
        }
    },

    updateProperty: function(property) {
        this.setGroupFn(this.standardGroupFn);
    },

    standardGroupFn: function(item) {
        var root = this.getRoot(),
            property = this.getProperty(),
            data = item;

        if (root) {
            data = item[root];
        }

        return data[property];
    },

    getGroupString: function(item) {
        var group = this.getGroupFn().call(this, item);
        return typeof group != 'undefined' ? group.toString() : '';
    }
});