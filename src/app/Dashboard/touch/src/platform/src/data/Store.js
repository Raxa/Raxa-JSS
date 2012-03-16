/**
 * @author Ed Spencer
 * @class Ext.data.Store
 * @extends Ext.data.AbstractStore
 *
 * <p>The Store class encapsulates a client side cache of {@link Ext.data.Model Model} objects. Stores load
 * data via a {@link Ext.data.Proxy Proxy}, and also provide functions for {@link #sort sorting},
 * {@link #filter filtering} and querying the {@link Ext.data.Model model} instances contained within it.</p>
 *
 * <p>Creating a Store is easy - we just tell it the Model and the Proxy to use to load and save its data:</p>
 *
<pre><code>
// Set up a {@link Ext.data.Model model} to use in our Store
Ext.regModel('User', {
    fields: [
        {name: 'firstName', type: 'string'},
        {name: 'lastName',  type: 'string'},
        {name: 'age',       type: 'int'},
        {name: 'eyeColor',  type: 'string'}
    ]
});

var myStore = new Ext.data.Store({
    model: 'User',
    proxy: {
        type: 'ajax',
        url : '/users.json',
        reader: {
            type: 'json',
            root: 'users'
        }
    },
    autoLoad: true
});
</code></pre>

 * <p>In the example above we configured an AJAX proxy to load data from the url '/users.json'. We told our Proxy
 * to use a {@link Ext.data.JsonReader JsonReader} to parse the response from the server into Model object -
 * {@link Ext.data.JsonReader see the docs on JsonReader} for details.</p>
 * 
 * <p><u>Inline data</u></p>
 * 
 * <p>Stores can also load data inline. Internally, Store converts each of the objects we pass in as {@link #data}
 * into Model instances:</p>
 * 
<pre><code>
new Ext.data.Store({
    model: 'User',
    data : [
        {firstName: 'Ed',    lastName: 'Spencer'},
        {firstName: 'Tommy', lastName: 'Maintz'},
        {firstName: 'Aaron', lastName: 'Conran'},
        {firstName: 'Jamie', lastName: 'Avins'}
    ]
});
</code></pre>
 *
 * <p>Loading inline data using the method above is great if the data is in the correct format already (e.g. it doesn't need 
 * to be processed by a {@link Ext.data.Reader reader}). If your inline data requires processing to decode the data structure,
 * use a {@link Ext.data.MemoryProxy MemoryProxy} instead (see the {@link Ext.data.MemoryProxy MemoryProxy} docs for an example).</p>
 * 
 * <p>Additional data can also be loaded locally using {@link #add}.</p>
 * 
 * <p><u>Loading Nested Data</u></p>
 * 
 * <p>Applications often need to load sets of associated data - for example a CRM system might load a User and her Orders. 
 * Instead of issuing an AJAX request for the User and a series of additional AJAX requests for each Order, we can load a nested dataset
 * and allow the Reader to automatically populate the associated models. Below is a brief example, see the {@link Ext.data.Reader} intro
 * docs for a full explanation:</p>
 * 
<pre><code>
var store = new Ext.data.Store({
    autoLoad: true,
    model: "User",
    proxy: {
        type: 'ajax',
        url : 'users.json',
        reader: {
            type: 'json',
            root: 'users'
        }
    }
});
</code></pre>
 * 
 * <p>Which would consume a response like this:</p>
 * 
<pre><code>
{
    "users": [
        {
            "id": 1,
            "name": "Ed",
            "orders": [
                {
                    "id": 10,
                    "total": 10.76,
                    "status": "invoiced"
                },
                {
                    "id": 11,
                    "total": 13.45,
                    "status": "shipped"
                }
            ]
        }
    ]
}
</code></pre>
 * 
 * <p>See the {@link Ext.data.Reader} intro docs for a full explanation.</p>
 * 
 * <p><u>Filtering and Sorting</u></p>
 * 
 * <p>Stores can be sorted and filtered - in both cases either remotely or locally. The {@link #sorters} and {@link #filters} are 
 * held inside {@link Ext.util.MixedCollection MixedCollection} instances to make them easy to manage. Usually it is sufficient to
 * either just specify sorters and filters in the Store configuration or call {@link #sort} or {@link #filter}:
 * 
<pre><code>
var store = new Ext.data.Store({
    model: 'User',
    sorters: [
        {
            property : 'age',
            direction: 'DESC'
        },
        {
            property : 'firstName',
            direction: 'ASC'
        }
    ],
    
    filters: [
        {
            property: 'firstName',
            value   : /Ed/
        }
    ]
});
</code></pre>
 * 
 * <p>The new Store will keep the configured sorters and filters in the MixedCollection instances mentioned above. By default, sorting
 * and filtering are both performed locally by the Store - see {@link #remoteSort} and {@link #remoteFilter} to allow the server to 
 * perform these operations instead.</p>
 * 
 * <p>Filtering and sorting after the Store has been instantiated is also easy. Calling {@link #filter} adds another filter to the Store
 * and automatically filters the dataset (calling {@link #filter} with no arguments simply re-applies all existing filters). Note that by
 * default {@link #sortOnFilter} is set to true, which means that your sorters are automatically reapplied if using local sorting.</p>
 * 
<pre><code>
store.filter('eyeColor', 'Brown');
</code></pre>
 * 
 * <p>Change the sorting at any time by calling {@link #sort}:</p>
 * 
<pre><code>
store.sort('height', 'ASC');
</code></pre>
 * 
 * <p>Note that all existing sorters will be removed in favor of the new sorter data (if {@link #sort} is called with no arguments, 
 * the existing sorters are just reapplied instead of being removed). To keep existing sorters and add new ones, just add them
 * to the MixedCollection:</p>
 * 
<pre><code>
store.sorters.add(new Ext.util.Sorter({
    property : 'shoeSize',
    direction: 'ASC'
}));

store.sort();
</code></pre>
 * 
 * <p><u>Registering with StoreMgr</u></p>
 * 
 * <p>Any Store that is instantiated with a {@link #storeId} will automatically be registed with the {@link Ext.StoreMgr StoreMgr}.
 * This makes it easy to reuse the same store in multiple views:</p>
 * 
 <pre><code>
//this store can be used several times
new Ext.data.Store({
    model: 'User',
    storeId: 'usersStore'
});

new Ext.List({
    store: 'usersStore',

    //other config goes here
});

new Ext.DataView({
    store: 'usersStore',

    //other config goes here
});
</code></pre>
 * 
 * <p><u>Further Reading</u></p>
 * 
 * <p>Stores are backed up by an ecosystem of classes that enables their operation. To gain a full understanding of these
 * pieces and how they fit together, see:</p>
 * 
 * <ul style="list-style-type: disc; padding-left: 25px">
 * <li>{@link Ext.data.Proxy Proxy} - overview of what Proxies are and how they are used</li>
 * <li>{@link Ext.data.Model Model} - the core class in the data package</li>
 * <li>{@link Ext.data.Reader Reader} - used by any subclass of {@link Ext.data.ServerProxy ServerProxy} to read a response</li>
 * </ul>
 *
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.Store = Ext.extend(Ext.data.AbstractStore, {
    /**
     * @cfg {Boolean} remoteSort
     * True to defer any sorting operation to the server. If false, sorting is done locally on the client. Defaults to <tt>false</tt>.
     */
    remoteSort: false,

    /**
     * @cfg {Boolean} remoteFilter
     * True to defer any filtering operation to the server. If false, filtering is done locally on the client. Defaults to <tt>false</tt>.
     */
    remoteFilter: false,

    /**
     * @cfg {String/Ext.data.Proxy/Object} proxy The Proxy to use for this Store. This can be either a string, a config
     * object or a Proxy instance - see {@link #setProxy} for details.
     */

    /**
     * @cfg {Array} data Optional array of Model instances or data objects to load locally. See "Inline data" above for details.
     */

    /**
     * The (optional) field by which to group data in the store. Internally, grouping is very similar to sorting - the
     * groupField and {@link #groupDir} are injected as the first sorter (see {@link #sort}). Stores support a single
     * level of grouping, and groups can be fetched via the {@link #getGroups} method.
     * @property groupField
     * @type String
     */
    groupField: undefined,

    /**
     * The direction in which sorting should be applied when grouping. Defaults to "ASC" - the other supported value is "DESC"
     * @property groupDir
     * @type String
     */
    groupDir: "ASC",

    /**
     * The number of records considered to form a 'page'. This is used to power the built-in
     * paging using the nextPage and previousPage functions. Defaults to 25.
     * @property pageSize
     * @type Number
     */
    pageSize: 25,

    /**
     * The page that the Store has most recently loaded (see {@link #loadPage})
     * @property currentPage
     * @type Number
     */
    currentPage: 1,
    
    /**
     * @cfg {Boolean} clearOnPageLoad True to empty the store when loading another page via {@link #loadPage}, 
     * {@link #nextPage} or {@link #previousPage} (defaults to true). Setting to false keeps existing records, allowing
     * large data sets to be loaded one page at a time but rendered all together.
     */
    clearOnPageLoad: true,

    /**
     * True if a model was created implicitly for this Store. This happens if a fields array is passed to the Store's constructor
     * instead of a model constructor or name.
     * @property implicitModel
     * @type Boolean
     * @private
     */
    implicitModel: false,

    /**
     * True if the Store is currently loading via its Proxy
     * @property loading
     * @type Boolean
     * @private
     */
    loading: false,
    
    /**
     * @cfg {Boolean} sortOnFilter For local filtering only, causes {@link #sort} to be called whenever {@link #filter} is called,
     * causing the sorters to be reapplied after filtering. Defaults to true
     */
    sortOnFilter: true,

    isStore: true,

    //documented above
    constructor: function(config) {
        config = config || {};
        
        /**
         * The MixedCollection that holds this store's local cache of records
         * @property data
         * @type Ext.util.MixedCollection
         */
        this.data = new Ext.util.MixedCollection(false, function(record) {
            return record.internalId;
        });

        if (config.data) {
            this.inlineData = config.data;
            delete config.data;
        }

        Ext.data.Store.superclass.constructor.call(this, config);
        
        var proxy = this.proxy,
            data  = this.inlineData;
            
        if (data) {
            if (proxy instanceof Ext.data.MemoryProxy) {
                proxy.data = data;
                this.read();
            } else {
                this.add.apply(this, data);
            }
            
            this.sort();
            delete this.inlineData;
        } else if (this.autoLoad) {
            Ext.defer(this.load, 10, this, [typeof this.autoLoad == 'object' ? this.autoLoad : undefined]);
            // Remove the defer call, we may need reinstate this at some point, but currently it's not obvious why it's here.
            // this.load(typeof this.autoLoad == 'object' ? this.autoLoad : undefined);
        }
    },

    /**
     * Returns an object containing the result of applying grouping to the records in this store. See {@link #groupField},
     * {@link #groupDir} and {@link #getGroupString}. Example for a store containing records with a color field:
<pre><code>
var myStore = new Ext.data.Store({
    groupField: 'color',
    groupDir  : 'DESC'
});

myStore.getGroups(); //returns:
[
    {
        name: 'yellow',
        children: [
            //all records where the color field is 'yellow'
        ]
    },
    {
        name: 'red',
        children: [
            //all records where the color field is 'red'
        ]
    }
]
</code></pre>
     * @return {Array} The grouped data
     */
    getGroups: function() {
        var records  = this.data.items,
            length   = records.length,
            groups   = [],
            pointers = {},
            record, groupStr, group, i;

        for (i = 0; i < length; i++) {
            record = records[i];
            groupStr = this.getGroupString(record);
            group = pointers[groupStr];

            if (group == undefined) {
                group = {
                    name: groupStr,
                    children: []
                };

                groups.push(group);
                pointers[groupStr] = group;
            }

            group.children.push(record);
        }
        
        return groups;
    },

    /**
     * Returns the string to group on for a given model instance. The default implementation of this method returns the model's
     * {@link #groupField}, but this can be overridden to group by an arbitrary string. For example, to group by the first letter
     * of a model's 'name' field, use the following code:
<pre><code>
new Ext.data.Store({
    groupDir: 'ASC',
    getGroupString: function(instance) {
        return instance.get('name')[0];
    }
});
</code></pre>
     * @param {Ext.data.Model} instance The model instance
     * @return {String} The string to compare when forming groups
     */
    getGroupString: function(instance) {
        return instance.get(this.groupField);
    },
    
    /**
     * Convenience function for getting the first model instance in the store
     * @return {Ext.data.Model/undefined} The first model instance in the store, or undefined
     */
    first: function() {
        return this.data.first();
    },
    
    /**
     * Convenience function for getting the last model instance in the store
     * @return {Ext.data.Model/undefined} The last model instance in the store, or undefined
     */
    last: function() {
        return this.data.last();
    },

    /**
     * Inserts Model instances into the Store at the given index and fires the {@link #add} event.
     * See also <code>{@link #add}</code>.
     * @param {Number} index The start index at which to insert the passed Records.
     * @param {Ext.data.Model[]} records An Array of Ext.data.Model objects to add to the cache.
     */
    insert : function(index, records) {
        var i, record, len;

        records = [].concat(records);
        for (i = 0, len = records.length; i < len; i++) {
            record = this.createModel(records[i]);
            record.set(this.modelDefaults);

            this.data.insert(index + i, record);
            record.join(this);
        }

        if (this.snapshot) {
            this.snapshot.addAll(records);
        }

        this.fireEvent('add', this, records, index);
        this.fireEvent('datachanged', this);
    },

    /**
     * Adds Model instances to the Store by instantiating them based on a JavaScript object. When adding already-
     * instantiated Models, use {@link #insert} instead. The instances will be added at the end of the existing collection.
     * This method accepts either a single argument array of Model instances or any number of model instance arguments.
     * Sample usage:
     * 
<pre><code>
myStore.add({some: 'data'}, {some: 'other data'});
</code></pre>
     * 
     * @param {Object} data The data for each model
     * @return {Array} The array of newly created model instances
     */
    add: function(records) {
        //accept both a single-argument array of records, or any number of record arguments
        if (!Ext.isArray(records)) {
            records = Array.prototype.slice.apply(arguments);
        }
        
        var length  = records.length,
            record, i;

        for (i = 0; i < length; i++) {
            record = this.createModel(records[i]);

            if (record.phantom == false) {
                record.needsAdd = true;
            }
            
            records[i] = record;
        }

        this.insert(this.data.length, records);

        return records;
    },

    /**
     * Converts a literal to a model, if it's not a model already 
     * @private
     * @param record {Ext.data.Model/Object} The record to create
     * @return {Ext.data.Model}
     */
    createModel: function(record) {
        if (!(record instanceof Ext.data.Model)) {
            record = Ext.ModelMgr.create(record, this.model);
        }
        
        return record;
    },

    /**
     * Calls the specified function for each of the {@link Ext.data.Record Records} in the cache.
     * @param {Function} fn The function to call. The {@link Ext.data.Record Record} is passed as the first parameter.
     * Returning <tt>false</tt> aborts and exits the iteration.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed.
     * Defaults to the current {@link Ext.data.Record Record} in the iteration.
     */
    each : function(fn, scope) {
        this.data.each(fn, scope);
    },

    /**
     * Removes the given record from the Store, firing the 'remove' event for each instance that is removed, plus a single
     * 'datachanged' event after removal.
     * @param {Ext.data.Model/Array} records The Ext.data.Model instance or array of instances to remove
     */
    remove: function(records) {
        if (!Ext.isArray(records)) {
            records = [records];
        }

        var length = records.length,
            i, index, record;

        for (i = 0; i < length; i++) {
            record = records[i];
            index = this.data.indexOf(record);

            if (index > -1) {
                this.removed.push(record);

                if (this.snapshot) {
                    this.snapshot.remove(record);
                }

                record.unjoin(this);
                this.data.remove(record);

                this.fireEvent('remove', this, record, index);
            }
        }

        this.fireEvent('datachanged', this);
    },

    /**
     * Removes the model instance at the given index
     * @param {Number} index The record index
     */
    removeAt: function(index) {
        var record = this.getAt(index);

        if (record) {
            this.remove(record);
        }
    },

    /**
     * <p>Loads data into the Store via the configured {@link #proxy}. This uses the Proxy to make an
     * asynchronous call to whatever storage backend the Proxy uses, automatically adding the retrieved
     * instances into the Store and calling an optional callback if required. Example usage:</p>
     * 
<pre><code>
store.load({
    scope   : this,
    callback: function(records, operation, success) {
        //the {@link Ext.data.Operation operation} object contains all of the details of the load operation
        console.log(records);
    }
});
</code></pre>
     * 
     * <p>If the callback scope does not need to be set, a function can simply be passed:</p>
     * 
<pre><code>
store.load(function(records, operation, success) {
    console.log('loaded records');
});
</code></pre>
     * 
     * @param {Object/Function} options Optional config object, passed into the Ext.data.Operation object before loading.
     */
    load: function(options) {
        options = options || {};
        
        if (Ext.isFunction(options)) {
            options = {
                callback: options
            };
        }
        
        Ext.applyIf(options, {
            group : {field: this.groupField, direction: this.groupDir},
            start : 0,
            limit : this.pageSize,
            addRecords: false
        });
        
        return Ext.data.Store.superclass.load.call(this, options);
    },
    
    /**
     * Returns true if the Store is currently performing a load operation
     * @return {Boolean} True if the Store is currently loading
     */
    isLoading: function() {
        return this.loading;
    },

    /**
     * @private
     * Called internally when a Proxy has completed a load request
     */
    onProxyLoad: function(operation) {
        var records = operation.getRecords();
        
        this.loadRecords(records, operation.addRecords);
        this.loading = false;
        this.fireEvent('load', this, records, operation.wasSuccessful());
        
        //TODO: deprecate this event, it should always have been 'load' instead. 'load' is now documented, 'read' is not.
        //People are definitely using this so can't deprecate safely until 2.x
        this.fireEvent('read', this, records, operation.wasSuccessful());

        //this is a callback that would have been passed to the 'read' function and is optional
        var callback = operation.callback;
        
        if (typeof callback == 'function') {
            callback.call(operation.scope || this, records, operation, operation.wasSuccessful());
        }
    },

    /**
     * @private
     * Callback for any write Operation over the Proxy. Updates the Store's MixedCollection to reflect
     * the updates provided by the Proxy
     */
    onProxyWrite: function(operation) {
        var data     = this.data,
            action   = operation.action,
            records  = operation.getRecords(),
            length   = records.length,
            callback = operation.callback,
            record, i;

        if (operation.wasSuccessful()) {
            if (action == 'create' || action == 'update') {
                for (i = 0; i < length; i++) {
                    record = records[i];

                    record.phantom = false;
                    record.join(this);
                    data.replace(record);
                }
            }

            else if (action == 'destroy') {
                for (i = 0; i < length; i++) {
                    record = records[i];

                    record.unjoin(this);
                    data.remove(record);
                }

                this.removed = [];
            }

            this.fireEvent('datachanged');
        }

        //this is a callback that would have been passed to the 'create', 'update' or 'destroy' function and is optional
        if (typeof callback == 'function') {
            callback.call(operation.scope || this, records, operation, operation.wasSuccessful());
        }
    },

    //inherit docs
    getNewRecords: function() {
        return this.data.filterBy(this.filterNew).items;
    },

    //inherit docs
    getUpdatedRecords: function() {
        return this.data.filterBy(this.filterDirty).items;
    },

    /**
     * <p>Sorts the data in the Store by one or more of its properties. Example usage:</p>
<pre><code>
//sort by a single field
myStore.sort('myField', 'DESC');

//sorting by multiple fields
myStore.sort([
    {
        property : 'age',
        direction: 'ASC'
    },
    {
        property : 'name',
        direction: 'DESC'
    }
]);
</code></pre>
     * <p>Internally, Store converts the passed arguments into an array of {@link Ext.util.Sorter} instances, and delegates the actual
     * sorting to its internal {@link Ext.util.MixedCollection}.</p>
     * <p>When passing a single string argument to sort, Store maintains a ASC/DESC toggler per field, so this code:</p>
<pre><code>
store.sort('myField');
store.sort('myField');
     </code></pre>
     * <p>Is equivalent to this code, because Store handles the toggling automatically:</p>
<pre><code>
store.sort('myField', 'ASC');
store.sort('myField', 'DESC');
</code></pre>
     * @param {String|Array} sorters Either a string name of one of the fields in this Store's configured {@link Ext.data.Model Model},
     * or an Array of sorter configurations.
     * @param {String} direction The overall direction to sort the data by. Defaults to "ASC".
     */
    sort: function(sorters, direction) {
        if (Ext.isString(sorters)) {
            var property   = sorters,
                sortToggle = this.sortToggle,
                toggle     = Ext.util.Format.toggle;

            if (direction == undefined) {
                sortToggle[property] = toggle(sortToggle[property] || "", "ASC", "DESC");
                direction = sortToggle[property];
            }

            sorters = {
                property : property,
                direction: direction
            };
        }
        
        if (arguments.length != 0) {
            this.sorters.clear();
        }
        
        this.sorters.addAll(this.decodeSorters(sorters));

        if (this.remoteSort) {
            //the load function will pick up the new sorters and request the sorted data from the proxy
            this.load();
        } else {
            this.data.sort(this.sorters.items);

            this.fireEvent('datachanged', this);
        }
    },


    /**
     * Filters the loaded set of records by a given set of filters.
     * @param {Mixed} filters The set of filters to apply to the data. These are stored internally on the store,
     * but the filtering itself is done on the Store's {@link Ext.util.MixedCollection MixedCollection}. See
     * MixedCollection's {@link Ext.util.MixedCollection#filter filter} method for filter syntax. Alternatively,
     * pass in a property string
     * @param {String} value Optional value to filter by (only if using a property string as the first argument)
     */
    filter: function(filters, value) {
        if (Ext.isString(filters)) {
            filters = {
                property: filters,
                value   : value
            };
        }
        
        this.filters.addAll(this.decodeFilters(filters));

        if (this.remoteFilter) {
            //the load function will pick up the new filters and request the filtered data from the proxy
            this.load();
        } else {
            /**
             * A pristine (unfiltered) collection of the records in this store. This is used to reinstate
             * records when a filter is removed or changed
             * @property snapshot
             * @type Ext.util.MixedCollection
             */
            this.snapshot = this.snapshot || this.data.clone();

            this.data = this.data.filter(this.filters.items);
            
            if (this.sortOnFilter && !this.remoteSort) {
                this.sort();
            } else {
                this.fireEvent('datachanged', this);
            }
        }
    },

    /**
     * Revert to a view of the Record cache with no filtering applied.
     * @param {Boolean} suppressEvent If <tt>true</tt> the filter is cleared silently without firing the
     * {@link #datachanged} event.
     */
    clearFilter : function(suppressEvent) {
        this.filters.clear();
        
        if (this.isFiltered()) {
            this.data = this.snapshot.clone();
            delete this.snapshot;

            if (suppressEvent !== true) {
                this.fireEvent('datachanged', this);
            }
        }
    },

    /**
     * Returns true if this store is currently filtered
     * @return {Boolean}
     */
    isFiltered : function() {
        return !!this.snapshot && this.snapshot != this.data;
    },

    /**
     * Filter by a function. The specified function will be called for each
     * Record in this Store. If the function returns <tt>true</tt> the Record is included,
     * otherwise it is filtered out.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Record<p class="sub-desc">The {@link Ext.data.Record record}
     * to test for filtering. Access field values using {@link Ext.data.Record#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this Store.
     */
    filterBy : function(fn, scope) {
        this.snapshot = this.snapshot || this.data.clone();
        this.data = this.queryBy(fn, scope || this);
        this.fireEvent('datachanged', this);
    },

    /**
     * Query the cached records in this Store using a filtering function. The specified function
     * will be called with each record in this Store. If the function returns <tt>true</tt> the record is
     * included in the results.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Record<p class="sub-desc">The {@link Ext.data.Record record}
     * to test for filtering. Access field values using {@link Ext.data.Record#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this Store.
     * @return {MixedCollection} Returns an Ext.util.MixedCollection of the matched records
     **/
    queryBy : function(fn, scope) {
        var data = this.snapshot || this.data;
        return data.filterBy(fn, scope||this);
    },
    
    /**
     * Loads an array of data straight into the Store
     * @param {Array} data Array of data to load. Any non-model instances will be cast into model instances first
     * @param {Boolean} append True to add the records to the existing records in the store, false to remove the old ones first
     */
    loadData: function(data, append) {
        var model  = this.model,
            length = data.length,
            i, record;

        //make sure each data element is an Ext.data.Model instance
        for (i = 0; i < length; i++) {
            record = data[i];

            if (!(record instanceof Ext.data.Model)) {
                data[i] = Ext.ModelMgr.create(record, model);
            }
        }

        this.loadRecords(data, append);
    },

    /**
     * Loads an array of {@Ext.data.Model model} instances into the store, fires the datachanged event. This should only usually
     * be called internally when loading from the {@link Ext.data.Proxy Proxy}, when adding records manually use {@link #add} instead
     * @param {Array} records The array of records to load
     * @param {Boolean} add True to add these records to the existing records, false to remove the Store's existing records first
     */
    loadRecords: function(records, add) {
        if (!add) {
            this.data.clear();
        }
        
        this.data.addAll(records);
        
        //FIXME: this is not a good solution. Ed Spencer is totally responsible for this and should be forced to fix it immediately.
        for (var i = 0, length = records.length; i < length; i++) {
            records[i].needsAdd = false;
            records[i].join(this);
        }
        
        /*
         * this rather inelegant suspension and resumption of events is required because both the filter and sort functions
         * fire an additional datachanged event, which is not wanted. Ideally we would do this a different way. The first
         * datachanged event is fired by the call to this.add, above.
         */
        this.suspendEvents();

        if (this.filterOnLoad && !this.remoteFilter) {
            this.filter();
        }

        if (this.sortOnLoad && !this.remoteSort) {
            this.sort();
        }

        this.resumeEvents();
        this.fireEvent('datachanged', this, records);
    },

    // PAGING METHODS

    /**
     * Loads a given 'page' of data by setting the start and limit values appropriately. Internally this just causes a normal
     * load operation, passing in calculated 'start' and 'limit' params
     * @param {Number} page The number of the page to load
     */
    loadPage: function(page) {
        this.currentPage = page;

        this.read({
            page : page,
            start: (page - 1) * this.pageSize,
            limit: this.pageSize,
            addRecords: !this.clearOnPageLoad
        });
    },

    /**
     * Loads the next 'page' in the current data set
     */
    nextPage: function() {
        this.loadPage(this.currentPage + 1);
    },

    /**
     * Loads the previous 'page' in the current data set
     */
    previousPage: function() {
        this.loadPage(this.currentPage - 1);
    },

    // private
    clearData: function(){
        this.data.each(function(record) {
            record.unjoin();
        });

        this.data.clear();
    },

    /**
     * Finds the index of the first matching Record in this store by a specific field value.
     * @param {String} fieldName The name of the Record field to test.
     * @param {String/RegExp} value Either a string that the field value
     * should begin with, or a RegExp to test against the field.
     * @param {Number} startIndex (optional) The index to start searching at
     * @param {Boolean} anyMatch (optional) True to match any part of the string, not just the beginning
     * @param {Boolean} caseSensitive (optional) True for case sensitive comparison
     * @param {Boolean} exactMatch (optional) True to force exact match (^ and $ characters added to the regex). Defaults to false. 
     * @return {Number} The matched index or -1
     */
    find : function(property, value, start, anyMatch, caseSensitive, exactMatch) {
        var fn = this.createFilterFn(property, value, anyMatch, caseSensitive, exactMatch);
        return fn ? this.data.findIndexBy(fn, null, start) : -1;
    },

    /**
     * Finds the first matching Record in this store by a specific field value.
     * @param {String} fieldName The name of the Record field to test.
     * @param {String/RegExp} value Either a string that the field value
     * should begin with, or a RegExp to test against the field.
     * @param {Number} startIndex (optional) The index to start searching at
     * @param {Boolean} anyMatch (optional) True to match any part of the string, not just the beginning
     * @param {Boolean} caseSensitive (optional) True for case sensitive comparison
     * @param {Boolean} exactMatch (optional) True to force exact match (^ and $ characters added to the regex). Defaults to false.
     * @return {Ext.data.Record} The matched record or null
     */
    findRecord : function() {
        var index = this.find.apply(this, arguments);
        return index != -1 ? this.getAt(index) : null;
    },

    /**
     * @private
     * Returns a filter function used to test a the given property's value. Defers most of the work to
     * Ext.util.MixedCollection's createValueMatcher function
     * @param {String} property The property to create the filter function for
     * @param {String/RegExp} value The string/regex to compare the property value to
     * @param {Boolean} anyMatch True if we don't care if the filter value is not the full value (defaults to false)
     * @param {Boolean} caseSensitive True to create a case-sensitive regex (defaults to false)
     * @param {Boolean} exactMatch True to force exact match (^ and $ characters added to the regex). Defaults to false. 
     * Ignored if anyMatch is true.
     */
    createFilterFn : function(property, value, anyMatch, caseSensitive, exactMatch) {
        if(Ext.isEmpty(value)){
            return false;
        }
        value = this.data.createValueMatcher(value, anyMatch, caseSensitive, exactMatch);
        return function(r) {
            return value.test(r.data[property]);
        };
    },

    /**
     * Finds the index of the first matching Record in this store by a specific field value.
     * @param {String} fieldName The name of the Record field to test.
     * @param {Mixed} value The value to match the field against.
     * @param {Number} startIndex (optional) The index to start searching at
     * @return {Number} The matched index or -1
     */
    findExact: function(property, value, start) {
        return this.data.findIndexBy(function(rec){
            return rec.get(property) === value;
        }, this, start);
    },

    /**
     * Find the index of the first matching Record in this Store by a function.
     * If the function returns <tt>true</tt> it is considered a match.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Record<p class="sub-desc">The {@link Ext.data.Record record}
     * to test for filtering. Access field values using {@link Ext.data.Record#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this Store.
     * @param {Number} startIndex (optional) The index to start searching at
     * @return {Number} The matched index or -1
     */
    findBy : function(fn, scope, start) {
        return this.data.findIndexBy(fn, scope, start);
    },

    /**
     * Collects unique values for a particular dataIndex from this store.
     * @param {String} dataIndex The property to collect
     * @param {Boolean} allowNull (optional) Pass true to allow null, undefined or empty string values
     * @param {Boolean} bypassFilter (optional) Pass true to collect from all records, even ones which are filtered
     * @return {Array} An array of the unique values
     **/
    collect : function(dataIndex, allowNull, bypassFilter) {
        var values  = [],
            uniques = {},
            length, value, strValue, data, i;

        if (bypassFilter === true && this.snapshot) {
            data = this.snapshot.items;
        } else {
            data = this.data.items;
        }

        length = data.length;

        for (i = 0; i < length; i++) {
            value = data[i].data[dataIndex];
            strValue = String(value);

            if ((allowNull || !Ext.isEmpty(value)) && !uniques[strValue]) {
                uniques[strValue] = true;
                values[values.length] = value;
            }
        }

        return values;
    },

    /**
     * Sums the value of <tt>property</tt> for each {@link Ext.data.Record record} between <tt>start</tt>
     * and <tt>end</tt> and returns the result.
     * @param {String} property A field in each record
     * @param {Number} start (optional) The record index to start at (defaults to <tt>0</tt>)
     * @param {Number} end (optional) The last record index to include (defaults to length - 1)
     * @return {Number} The sum
     */
    sum : function(property, start, end) {
        var records = this.data.items,
            value   = 0,
            i;

        start = start || 0;
        end   = (end || end === 0) ? end : records.length - 1;

        for (i = start; i <= end; i++) {
            value += (records[i].data[property] || 0);
        }

        return value;
    },

    /**
     * Gets the number of cached records.
     * <p>If using paging, this may not be the total size of the dataset. If the data object
     * used by the Reader contains the dataset size, then the {@link #getTotalCount} function returns
     * the dataset size.  <b>Note</b>: see the Important note in {@link #load}.</p>
     * @return {Number} The number of Records in the Store's cache.
     */
    getCount : function() {
        return this.data.length || 0;
    },

    /**
     * Get the Record at the specified index.
     * @param {Number} index The index of the Record to find.
     * @return {Ext.data.Model} The Record at the passed index. Returns undefined if not found.
     */
    getAt : function(index) {
        return this.data.getAt(index);
    },

    /**
     * Returns a range of Records between specified indices.
     * @param {Number} startIndex (optional) The starting index (defaults to 0)
     * @param {Number} endIndex (optional) The ending index (defaults to the last Record in the Store)
     * @return {Ext.data.Model[]} An array of Records
     */
    getRange : function(start, end) {
        return this.data.getRange(start, end);
    },

    /**
     * Get the Record with the specified id.
     * @param {String} id The id of the Record to find.
     * @return {Ext.data.Record} The Record with the passed id. Returns undefined if not found.
     */
    getById : function(id) {
        return (this.snapshot || this.data).findBy(function(record) {
            return record.getId() === id;
        });
    },

    /**
     * Get the index within the cache of the passed Record.
     * @param {Ext.data.Model} record The Ext.data.Model object to find.
     * @return {Number} The index of the passed Record. Returns -1 if not found.
     */
    indexOf : function(record) {
        return this.data.indexOf(record);
    },

    /**
     * Get the index within the cache of the Record with the passed id.
     * @param {String} id The id of the Record to find.
     * @return {Number} The index of the Record. Returns -1 if not found.
     */
    indexOfId : function(id) {
        return this.data.indexOfKey(id);
    },

    removeAll: function(silent) {
        var items = [];
        this.each(function(rec){
            items.push(rec);
        });
        this.clearData();
        if(this.snapshot){
            this.snapshot.clear();
        }
        //if(this.pruneModifiedRecords){
        //    this.modified = [];
        //}
        if (silent !== true) {
            this.fireEvent('clear', this, items);
        }
    }
});
