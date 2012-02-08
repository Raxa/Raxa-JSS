/**
 * Represents a single sorter that can be used as part of the sorters configuration in Ext.mixin.Sortable.
 */
Ext.define('Ext.util.Sorter', {
    isSorter: true,

    config: {
        /**
         * @cfg {String} property The property to sort by. Required unless `sorterFn` is provided
         */
        property: null,

        /**
         * @cfg {Function} sorterFn A specific sorter function to execute. Can be passed instead of {@link #property}
         */
        sorterFn: null,

        /**
         * @cfg {String} root Optional root property. This is mostly useful when sorting a Store, in which case we set the
         * root to 'data' to make the filter pull the {@link #property} out of the data object of each item
         */
        root: null,

        /**
         * @cfg {Function} transform A function that will be run on each value before
         * it is compared in the sorter. The function will receive a single argument,
         * the value.
         */
        transform: null,

        /**
         * @cfg {String} direction The direction to sort by.
         */
        direction: "ASC",

        /**
         * @cfg {Mixed} id An optional id this sorter can be keyed by in Collections. If
         * no id is specified it will use the property name used in this Sorter. If no
         * property is specified, e.g. when adding a custom sorter function we will generate
         * a random id.
         */
        id: undefined
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    // <debug>
    applySorterFn: function(sorterFn) {
        if (!sorterFn && !this.getProperty()) {
            Ext.Logger.error("A Sorter requires either a property or a sorterFn.");
        }
        return sorterFn;
    },

    applyProperty: function(property) {
        if (!property && !this.getSorterFn()) {
            Ext.Logger.error("A Sorter requires either a property or a sorterFn.");
        }
        return property;
    },
    // </debug>

    applyId: function(id) {
        if (!id) {
            id = this.getProperty();
            if (!id) {
                id = Ext.id(null, 'ext-sorter-');
            }
        }

        return id;
    },

    /**
     * @private
     * Creates and returns a function which sorts an array by the given property and direction
     * @return {Function} A function which sorts by the property/direction combination provided
     */
    createSortFunction: function(sorterFn) {
        var me        = this,
            modifier  = me.getDirection().toUpperCase() == "DESC" ? -1 : 1;

        //create a comparison function. Takes 2 objects, returns 1 if object 1 is greater,
        //-1 if object 2 is greater or 0 if they are equal
        return function(o1, o2) {
            return modifier * sorterFn.call(me, o1, o2);
        };
    },

    /**
     * @private
     * Basic default sorter function that just compares the defined property of each object
     */
    defaultSortFn: function(item1, item2) {
        var me = this,
            transform = me._transform,
            root = me._root,
            value1, value2,
            property = me._property;

        if (root !== null) {
            item1 = item1[root];
            item2 = item2[root];
        }

        value1 = item1[property];
        value2 = item2[property];

        if (transform) {
            value1 = transform(value1);
            value2 = transform(value2);
        }

        return value1 > value2 ? 1 : (value1 < value2 ? -1 : 0);
    },

    updateDirection: function() {
        this.updateSortFn();
    },

    updateSortFn: function() {
        this.sort = this.createSortFunction(this.getSorterFn() || this.defaultSortFn);
    },

    /**
     * Toggles the direction of this Sorter. Note that when you call this function,
     * the Collection this Sorter is part of does not get refreshed automatically.
     */
    toggle: function() {
        this.setDirection(Ext.String.toggle(this.getDirection(), "ASC", "DESC"));
    }
});
