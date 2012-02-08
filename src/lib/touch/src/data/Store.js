/**
 * @author Ed Spencer
 * @class Ext.data.Store
 *
 * The Store class encapsulates a client side cache of {@link Ext.data.Model Model} objects. Stores load
 * data via a {@link Ext.data.proxy.Proxy Proxy}, and also provide functions for {@link #sort sorting},
 * {@link #filter filtering} and querying the {@link Ext.data.Model model} instances contained within it.
 *
 * Creating a Store is easy - we just tell it the Model and the Proxy to use to load and save its data:
 *
 *     // Set up a {@link Ext.data.Model model} to use in our Store
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             {name: 'firstName', type: 'string'},
 *             {name: 'lastName',  type: 'string'},
 *             {name: 'age',       type: 'int'},
 *             {name: 'eyeColor',  type: 'string'}
 *         ]
 *     });
 *
 *     var myStore = Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         proxy: {
 *             type: 'ajax',
 *             url : '/users.json',
 *             reader: {
 *                 type: 'json',
 *                 root: 'users'
 *             }
 *         },
 *         autoLoad: true
 *     });
 *
 * In the example above we configured an AJAX proxy to load data from the url '/users.json'. We told our Proxy
 * to use a {@link Ext.data.reader.Json JsonReader} to parse the response from the server into Model object -
 * {@link Ext.data.reader.Json see the docs on JsonReader} for details.
 *
 * ## Inline data
 *
 * Stores can also load data inline. Internally, Store converts each of the objects we pass in as {@link #cfg-data}
 * into Model instances:
 *
 *     Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         data : [
 *             {firstName: 'Ed',    lastName: 'Spencer'},
 *             {firstName: 'Tommy', lastName: 'Maintz'},
 *             {firstName: 'Aaron', lastName: 'Conran'},
 *             {firstName: 'Jamie', lastName: 'Avins'}
 *         ]
 *     });
 *
 * Loading inline data using the method above is great if the data is in the correct format already (e.g. it doesn't need
 * to be processed by a {@link Ext.data.reader.Reader reader}). If your inline data requires processing to decode the data structure,
 * use a {@link Ext.data.proxy.Memory MemoryProxy} instead (see the {@link Ext.data.proxy.Memory MemoryProxy} docs for an example).
 *
 * Additional data can also be loaded locally using {@link #method-add}.
 *
 * ## Loading Nested Data
 *
 * Applications often need to load sets of associated data - for example a CRM system might load a User and her Orders.
 * Instead of issuing an AJAX request for the User and a series of additional AJAX requests for each Order, we can load a nested dataset
 * and allow the Reader to automatically populate the associated models. Below is a brief example, see the {@link Ext.data.reader.Reader} intro
 * docs for a full explanation:
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         autoLoad: true,
 *         model: "User",
 *         proxy: {
 *             type: 'ajax',
 *             url : 'users.json',
 *             reader: {
 *                 type: 'json',
 *                 root: 'users'
 *             }
 *         }
 *     });
 *
 * Which would consume a response like this:
 *
 *     {
 *         "users": [
 *             {
 *                 "id": 1,
 *                 "name": "Ed",
 *                 "orders": [
 *                     {
 *                         "id": 10,
 *                         "total": 10.76,
 *                         "status": "invoiced"
 *                     },
 *                     {
 *                         "id": 11,
 *                         "total": 13.45,
 *                         "status": "shipped"
 *                     }
 *                 ]
 *             }
 *         ]
 *     }
 *
 * See the {@link Ext.data.reader.Reader} intro docs for a full explanation.
 *
 * ## Filtering and Sorting
 *
 * Stores can be sorted and filtered - in both cases either remotely or locally. The {@link #sorters} and {@link #filters} are
 * held inside {@link Ext.util.MixedCollection MixedCollection} instances to make them easy to manage. Usually it is sufficient to
 * either just specify sorters and filters in the Store configuration or call {@link #sort} or {@link #filter}:
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         sorters: [
 *             {
 *                 property : 'age',
 *                 direction: 'DESC'
 *             },
 *             {
 *                 property : 'firstName',
 *                 direction: 'ASC'
 *             }
 *         ],
 *
 *         filters: [
 *             {
 *                 property: 'firstName',
 *                 value   : /Ed/
 *             }
 *         ]
 *     });
 *
 * The new Store will keep the configured sorters and filters in the MixedCollection instances mentioned above. By default, sorting
 * and filtering are both performed locally by the Store - see {@link #remoteSort} and {@link #remoteFilter} to allow the server to
 * perform these operations instead.
 *
 * Filtering and sorting after the Store has been instantiated is also easy. Calling {@link #filter} adds another filter to the Store
 * and automatically filters the dataset (calling {@link #filter} with no arguments simply re-applies all existing filters). Note that by
 * default your sorters are automatically reapplied if using local sorting.
 *
     store.filter('eyeColor', 'Brown');
 *
 * Change the sorting at any time by calling {@link #sort}:
 *
     store.sort('height', 'ASC');
 *
 * Note that all existing sorters will be removed in favor of the new sorter data (if {@link #sort} is called with no arguments,
 * the existing sorters are just reapplied instead of being removed). To keep existing sorters and add new ones, just add them
 * to the MixedCollection:
 *
 *     store.sorters.add(new Ext.util.Sorter({
 *         property : 'shoeSize',
 *         direction: 'ASC'
 *     }));
 *
 *     store.sort();
 *
 * ## Registering with StoreManager
 *
 * Any Store that is instantiated with a {@link #storeId} will automatically be registed with the {@link Ext.data.StoreManager StoreManager}.
 * This makes it easy to reuse the same store in multiple views:
 *
 *     //this store can be used several times
 *     Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         storeId: 'usersStore'
 *     });
 *
 *     new Ext.List({
 *         store: 'usersStore',
 *
 *         //other config goes here
 *     });
 *
 *     new Ext.view.View({
 *         store: 'usersStore',
 *
 *         //other config goes here
 *     });
 *
 * ## Further Reading
 *
 * Stores are backed up by an ecosystem of classes that enables their operation. To gain a full understanding of these
 * pieces and how they fit together, see:
 *
 * <ul style="list-style-type: disc; padding-left: 25px">
 *     <li>{@link Ext.data.proxy.Proxy Proxy} - overview of what Proxies are and how they are used</li>
 *     <li>{@link Ext.data.Model Model} - the core class in the data package</li>
 *     <li>{@link Ext.data.reader.Reader Reader} - used by any subclass of {@link Ext.data.proxy.Server ServerProxy} to read a response</li>
 * </ul>
 *
 */
Ext.define('Ext.data.Store', {
    alias: 'store.store',

    extend: 'Ext.Evented',

    requires: [
        'Ext.util.Collection',
        'Ext.data.Operation',
        'Ext.data.proxy.Memory',
        'Ext.data.Model',
        'Ext.data.StoreManager',
        'Ext.util.Grouper'
    ],

    /**
     * @event addrecords
     * Fired when one or more new Model instances have been added to this Store. You should listen
     * for this event if you have to update a representation of the records in this store in your UI.
     * If you need the indices of the records that were added please use the store.indexOf(record) method.
     * @param {Ext.data.Store} store The store
     * @param {Ext.data.Model[]} records The Model instances that were added
     */

    /**
     * @event removerecords
     * Fired when one or more Model instances have been removed from this Store. You should listen
     * for this event if you have to update a representation of the records in this store in your UI.
     * @param {Ext.data.Store} store The Store object
     * @param {Ext.data.Model[]} records The Model instances that was removed
     * @param {Number[]} indices The indices of the records that were removed. These indices already
     * take into account any potential earlier records that you remove. This means that if you loop
     * over the records, you can get its current index in your data representation from this array.
     */

    /**
     * @event updaterecord
     * Fires when a Model instance has been updated
     * @param {Ext.data.Store} this
     * @param {Ext.data.Model} record The Model instance that was updated
     * @param {Number} newIndex If the update changed the index of the record (due to sorting for example), then
     * this gives you the new index in the store.
     * @param {Number} oldIndex If the update changed the index of the record (due to sorting for example), then
     * this gives you the old index in the store.
     */

    /**
     * @event update
     * @inheritdoc Ext.data.Store#updaterecord
     * @deprecated 2.0 Listen to #updaterecord instead.
     */

    /**
     * @event refresh
     * Fires whenever the records in the Store have changed in a way that your representation of the records
     * need to be entirely refreshed.
     * @param {Ext.data.Store} this The data store
     * @param {Ext.util.Collection} data The data collection containing all the records
     */

    /**
     * @event beforeload
     * Fires before a request is made for a new data object. If the beforeload handler returns false the load
     * action will be canceled. Note that you should not listen for this event in order to refresh the
     * data view. Use the {@link #refresh} event for this instead.
     * @param {Ext.data.Store} store This Store
     * @param {Ext.data.Operation} operation The Ext.data.Operation object that will be passed to the Proxy to
     * load the Store
     */

    /**
     * @event load
     * Fires whenever records have been loaded into the store. Note that you should not listen
     * for this event in order to refresh the data view. Use the {@link #refresh} event for this instead.
     * @param {Ext.data.Store} this
     * @param {Ext.util.Grouper[]} records An array of records
     * @param {Boolean} successful True if the operation was successful.
     * @param {Ext.data.Operation} operation The associated operation
     */

    /**
     * @event write
     * Fires whenever a successful write has been made via the configured {@link #proxy Proxy}
     * @param {Ext.data.Store} store This Store
     * @param {Ext.data.Operation} operation The {@link Ext.data.Operation Operation} object that was used in
     * the write
     */

    /**
     * @event beforesync
     * Fired before a call to {@link #sync} is executed. Return false from any listener to cancel the synv
     * @param {Object} options Hash of all records to be synchronized, broken down into create, update and destroy
     */

    /**
     * @event clear
     * Fired after the {@link #removeAll} method is called. Note that you should not listen for this event in order
     * to refresh the data view. Use the {@link #refresh} event for this instead.
     * @param {Ext.data.Store} this
     */

    statics: {
        create: function(store) {
            if (!store.isStore) {
                if (!store.type) {
                    store.type = 'store';
                }
                store = Ext.createByAlias('store.' + store.type, store);
            }
            return store;
        }
    },

    isStore: true,

    config: {
        /**
         * @cfg {String} storeId
         * Unique identifier for this store. If present, this Store will be registered with the {@link Ext.data.StoreManager},
         * making it easy to reuse elsewhere.
         * @accessor
         */
        storeId: undefined,

        /**
         * @cfg {Object[]/Ext.data.Model[]} data
         * Array of Model instances or data objects to load locally. See "Inline data" above for details.
         * @accessor
         */
        data: null,

        /**
         * @cfg {Boolean/Object} autoLoad
         * If data is not specified, and if autoLoad is true or an Object, this store's load method is automatically called
         * after creation. If the value of autoLoad is an Object, this Object will be passed to the store's load method.
         * Defaults to false.
         * @accessor
         */
        autoLoad: null,

        /**
         * @cfg {Boolean} autoSync
         * True to automatically sync the Store with its Proxy after every edit to one of its Records. Defaults to false.
         * @accessor
         */
        autoSync: false,

        /**
         * @cfg {String} model
         * Name of the {@link Ext.data.Model Model} associated with this store.
         * The string is used as an argument for {@link Ext.ModelManager#getModel}.
         * @accessor
         */
        model: undefined,

        /**
         * @cfg {String/Ext.data.proxy.Proxy/Object} proxy The Proxy to use for this Store. This can be either a string, a config
         * object or a Proxy instance - see {@link #setProxy} for details.
         * @accessor
         */
        proxy: undefined,

        /**
         * @cfg {Object[]} fields
         * This may be used in place of specifying a {@link #model} configuration. The fields should be a
         * set of {@link Ext.data.Field} configuration objects. The store will automatically create a {@link Ext.data.Model}
         * with these fields. In general this configuration option should be avoided, it exists for the purposes of
         * backwards compatibility. For anything more complicated, such as specifying a particular id property or
         * associations, a {@link Ext.data.Model} should be defined and specified for the {@link #model}
         * config.
         * @accessor
         */
        fields: null,

        /**
         * @cfg {Boolean} remoteSort
         * True to defer any sorting operation to the server. If false, sorting is done locally on the client. Defaults to <tt>false</tt>.
         * @accessor
         */
        remoteSort: false,

        /**
         * @cfg {Boolean} remoteFilter
         * True to defer any filtering operation to the server. If false, filtering is done locally on the client. Defaults to <tt>false</tt>.
         * @accessor
         */
        remoteFilter: false,

        /**
         * @cfg {Boolean} remoteGroup
         * True to defer any grouping operation to the server. If false, grouping is done locally on the client. Defaults to <tt>false</tt>
         * @accessor
         */
        remoteGroup: false,

        // See https://sencha.jira.com/browse/TOUCH-1585

        /**
         * @cfg {Object[]} filters
         * Array of {@link Ext.util.Filter Filters} for this store. This configuration is handled by the
         * {@link Ext.mixin.Filterable Filterable} mixin of the {@link Ext.util.Collection data} collection.
         * @accessor
         */
        filters: null,

        /**
         * @cfg {Object[]} sorters
         * Array of {@link Ext.util.Sorter Sorters} for this store. This configuration is handled by the
         * {@link Ext.mixin.Sortable Sortable} mixin of the {@link Ext.util.Collection data} collection.
         * @accessor
         */
        sorters: null,

        /**
         * @cfg {Object[]} grouper
         * A configuration object for this Store's grouper.
         * @accessor
         */
        grouper: null,

        /**
         * @cfg {String} groupField
         * The (optional) field by which to group data in the store. Internally, grouping is very similar to sorting - the
         * groupField and {@link #groupDir} are injected as the first sorter (see {@link #sort}). Stores support a single
         * level of grouping, and groups can be fetched via the {@link #getGroups} method.
         * @accessor
         */
        groupField: null,

        /**
         * @cfg {String} groupDir
         * The direction in which sorting should be applied when grouping. If you specify a grouper by using the {@link #groupField}
         * configuration, this will automatically default to "ASC" - the other supported value is "DESC"
         * @accessor
         */
        groupDir: null,

        /**
         * @cfg {Function} getGroupString This function will be passed to the {@link #grouper} configuration as it's groupFn.
         * Note that this configuration is deprecated and grouper: {groupFn: yourFunction}} is preferred.
         * @deprecated
         * @accessor
         */
        getGroupString: null,

        /**
         * @cfg {Number} pageSize
         * The number of records considered to form a 'page'. This is used to power the built-in
         * paging using the nextPage and previousPage functions. Defaults to 25.
         * @accessor
         */
        pageSize: 25,

        /**
         * @cfg {Number} totalCount The total number of records in the full dataset, as indicated by a server. If the
         * server-side dataset contains 5000 records but only returns pages of 50 at a time, totalCount will be set to
         * 5000 and {@link #getCount} will return 50
         */
        totalCount: null,

        /**
         * @cfg {Boolean} clearOnPageLoad True to empty the store when loading another page via {@link #loadPage},
         * {@link #nextPage} or {@link #previousPage} (defaults to true). Setting to false keeps existing records, allowing
         * large data sets to be loaded one page at a time but rendered all together.
         * @accessor
         */
        clearOnPageLoad: true,

        modelDefaults: {},

        /**
         * @cfg {Boolean} autoDestroy This is a private configuration used in the framework whether this Store
         * can be destroyed.
         * @private
         */
        autoDestroy: false
    },

    /**
     * @property
     * The page that the Store has most recently loaded (see {@link #loadPage})
     */
    currentPage: 1,

    constructor: function(config) {
        config = config || {};

        this.data = this._data = this.createDataCollection();

        this.data.setSortRoot('data');
        this.data.setFilterRoot('data');

        this.removed = [];

        if (config.id && !config.storeId) {
            config.storeId = config.id;
            delete config.id;
        }

        this.initConfig(config);
    },

    createDataCollection: function() {
        return new Ext.util.Collection(function(record) {
            return record.getId();
        });
    },

    applyStoreId: function(storeId) {
        if (storeId === undefined || storeId === null) {
            storeId = this.getUniqueId();
        }
        return storeId;
    },

    updateStoreId: function(storeId, oldStoreId) {
        if (oldStoreId) {
            Ext.data.StoreManager.unregister(this);
        }
        if (storeId) {
            Ext.data.StoreManager.register(this);
        }
    },

    applyModel: function(model) {
        if (typeof model == 'string') {
            model = Ext.data.ModelManager.getModel(model);

            if (!model) {
                Ext.Logger.error('Model with name ' + arguments[0] + ' doesnt exist.');
            }
        }

        if (model && !model.prototype.isModel && Ext.isObject(model)) {
            model = Ext.data.ModelManager.registerType(model.storeId || model.id || Ext.id(), model);
        }

        if (!model && this.getFields()) {
            model = Ext.define('Ext.data.Store.ImplicitModel-' + (this.getStoreId() || Ext.id()), {
                extend: 'Ext.data.Model',
                config: {
                    fields: this.getFields(),
                    proxy: this.getProxy()
                }
            });

            this.implicitModel = true;
        }

        if (!model && this.getProxy()) {
            model = this.getProxy().getModel();
        }

        // <debug>
        if (!model) {
            Ext.Logger.error('A store needs to have a model defined on either itself or on its proxy');
        }
        // </debug>

        return model;
    },

    updateModel: function(model) {
        var proxy = this.getProxy();

        if (proxy && !proxy.getModel()) {
            proxy.setModel(model);
        }

        if (proxy && !model.getProxy()) {
            model.setProxy(proxy);
        }
    },

    applyProxy: function(proxy, currentProxy) {
        proxy = Ext.factory(proxy, Ext.data.Proxy, currentProxy, 'proxy');

        if (!proxy && this.getModel()) {
            proxy = this.getModel().getProxy();

            if (!proxy) {
                proxy = new Ext.data.proxy.Memory({
                    model: this.getModel()
                });
            }
        }

        return proxy;
    },

    updateProxy: function(proxy) {
        if (proxy && !proxy.getModel()) {
            proxy.setModel(this.getModel());
        }
    },

    /**
     * We are using applyData so that we can return nothing and prevent the this.data
     * property to be overridden.
     * @param data
     */
    applyData: function(data) {
        if (data) {
            var proxy = this.getProxy();
            if (proxy instanceof Ext.data.proxy.Memory) {
                proxy.setData(data);
                this.load();
            } else {
                // We make it silent because we don't want to fire a refresh event
                this.removeAll(true);

                // This means we have to fire a clear event though
                this.fireEvent('clear', this);

                // We don't want to fire addrecords event since we will be firing
                // a refresh event later which will already take care of updating
                // any views bound to this store
                this.suspendEvents();
                this.add(data);
                this.resumeEvents();

                // We set this to true so isAutoLoading to try
                this.dataLoaded = true;
            }
        } else {
            this.removeAll(true);

            // This means we have to fire a clear event though
            this.fireEvent('clear', this);
        }

        this.fireEvent('refresh', this, this.data);
    },

    clearData: function() {
        this.setData(null);
    },

    addData: function(data) {
        var reader = this.getProxy().getReader(),
            resultSet = reader.read(data),
            records = resultSet.getRecords();

        this.add(records);
    },

    updateAutoLoad: function(autoLoad) {
        var proxy = this.getProxy();
        if (autoLoad && (proxy && !proxy.isMemoryProxy)) {
            this.load(Ext.isObject(autoLoad) ? autoLoad : null);
        }
    },

    /**
     * Returns true if the Store is set to autoLoad or is a type which loads upon instantiation.
     * @return {Boolean}
     */
    isAutoLoading: function() {
        var proxy = this.getProxy();
        return (this.getAutoLoad() || (proxy && proxy.isMemoryProxy) || this.dataLoaded);
    },

    updateGroupField: function(groupField) {
        var grouper = this.getGrouper();
        if (groupField) {
            if (!grouper) {
                this.setGrouper({
                    property: groupField,
                    direction: this.getGroupDir() || 'ASC'
                });
            } else {
                grouper.setProperty(groupField);
            }
        } else if (grouper) {
            this.setGrouper(null);
        }
    },

    updateGroupDir: function(groupDir) {
        var grouper = this.getGrouper();
        if (grouper) {
            grouper.setDirection(groupDir);
        }
    },

    applyGetGroupString: function(getGroupStringFn) {
        var grouper = this.getGrouper();
        if (getGroupStringFn) {
            // <debug>
            Ext.Logger.warn('Specifying getGroupString on a store has been deprecated. Please use grouper: {groupFn: yourFunction}');
            // </debug>

            if (grouper) {
                grouper.setGroupFn(getGroupStringFn);
            } else {
                this.setGrouper({
                    groupFn: getGroupStringFn
                });
            }
        } else if (grouper) {
            this.setGrouper(null);
        }
    },

    applyGrouper: function(grouper) {
        if (typeof grouper == 'string') {
            grouper = {
                property: grouper
            };
        }
        else if (typeof grouper == 'function') {
            grouper = {
                groupFn: grouper
            };
        }

        grouper = Ext.factory(grouper, Ext.util.Grouper, this.getGrouper());
        return grouper;
    },

    updateGrouper: function(grouper, oldGrouper) {
        var data = this.data;
        if (oldGrouper) {
            data.removeSorter(oldGrouper);
            if (!grouper) {
                data.getSorters().removeSorter('isGrouper');
            }
        }
        if (grouper) {
            data.insertSorter(0, grouper);
            if (!oldGrouper) {
                data.getSorters().addSorter({
                    direction: 'DESC',
                    property: 'isGrouper',
                    transform: function(value) {
                        return (value === true) ? 1 : -1;
                    }
                });
            }
        }
    },

    updateSorters: function(sorters) {
        var grouper = this.getGrouper(),
            data = this.data,
            autoSort = data.getAutoSort();

        // While we remove/add sorters we don't want to automatically sort because we still need
        // to apply any field sortTypes as transforms on the Sorters after we have added them.
        data.setAutoSort(false);

        data.setSorters(sorters);
        if (grouper) {
            data.insertSorter(0, grouper);
        }

        this.updateSortTypes();

        // Now we put back autoSort on the Collection to the value it had before. If it was
        // auto sorted, setting this back will cause it to sort right away.
        data.setAutoSort(autoSort);
    },

    updateSortTypes: function() {
        var model = this.getModel(),
            fields = model && model.getFields(),
            data = this.data;

        // We loop over each sorter and set it's transform method to the every field's sortType.
        if (fields) {
            data.getSorters().each(function(sorter) {
                var property = sorter.getProperty(),
                    field;

                if (!sorter.isGrouper && property && !sorter.getTransform()) {
                    field = fields.get(property);
                    if (field) {
                        sorter.setTransform(field.getSortType());
                    }
                }
            });
        }
    },

    updateFilters: function(filters) {
        this.data.setFilters(filters);
    },

    /**
     * Adds Model instance to the Store. This method accepts either:
     *
     * - An array of Model instances or Model configuration objects.
     * - Any number of Model instance or Model configuration object arguments.
     *
     * The new Model instances will be added at the end of the existing collection.
     *
     * Sample usage:
     *
     *     myStore.add({some: 'data2'}, {some: 'other data2'});
     *
     * @param {Ext.data.Model[]/Ext.data.Model...} model An array of Model instances
     * or Model configuration objects, or variable number of Model instance or config arguments.
     * @return {Ext.data.Model[]} The model instances that were added
     */
    add: function(records) {
        //accept both a single-argument array of records, or any number of record arguments
        if (!Ext.isArray(records)) {
            records = Array.prototype.slice.apply(arguments);
        }

        return this.insert(this.data.length, records);
    },

    /**
     * Inserts Model instances into the Store at the given index and fires the {@link #add} event.
     * See also <code>{@link #add}</code>.
     * @param {Number} index The start index at which to insert the passed Records.
     * @param {Ext.data.Model[]} records An Array of Ext.data.Model objects to add to the cache.
     */
    insert: function(index, records) {
        if (!Ext.isArray(records)) {
            records = Array.prototype.slice.call(arguments, 1);
        }

        // See https://sencha.jira.com/browse/TOUCH-1586

        var me = this,
            sync = false,
            ln = records.length,
            Model = this.getModel(),
            modelDefaults = me.getModelDefaults(),
            i, record, added = false;

        records = records.slice();

        for (i = 0; i < ln; i++) {
            record = records[i];
            if (!record.isModel) {
                record = new Model(record);
            }
            // If we are adding a record that is already an instance which was still in the
            // removed array, then we remove it from the removed array
            else if (this.removed.indexOf(record) != -1) {
                Ext.Array.remove(this.removed, record);
            }

            record.set(modelDefaults);

            // reassign the model in the array in case it wasn't created yet
            records[i] = record;
            record.join(me);

            // If this is a newly created record, then we might want to sync it later
            sync = sync || (record.phantom === true);
        }

        // Now we insert all these records in one go to the collection. Saves many function
        // calls to data.insert. Does however create two loops over the records we are adding.
        if (ln === 1) {
            added = this.data.insert(index, records[0]);
            if (added) {
                added = [added];
            }
        } else {
            added = this.data.insertAll(index, records);
        }

        if (added) {
            me.fireEvent('addrecords', me, added);
        }

        if (me.getAutoSync() && sync) {
            me.sync();
        }

        return records;
    },

    /**
     * Removes the given record from the Store, firing the 'remove' event for each instance that is removed, plus a single
     * 'datachanged' event after removal.
     * @param {Ext.data.Model/Ext.data.Model[]} records Model instance or array of instances to remove
     */
    remove: function(records) {
        if (records.isModel) {
            records = [records];
        }

        var me = this,
            sync = false,
            i = 0,
            autoSync = this.getAutoSync(),
            ln = records.length,
            indices = [],
            removed = [],
            isPhantom,
            items = me.data.items,
            record, index, j;

        for (; i < ln; i++) {
            record = records[i];

            if (me.data.contains(record)) {
                isPhantom = (record.phantom === true);

                index = items.indexOf(record);
                if (index !== -1) {
                    removed.push(record);
                    indices.push(index);
                }

                // See https://sencha.jira.com/browse/TOUCH-1589
                if (!isPhantom) {
                     // don't push phantom records onto removed
                     me.removed.push(record);
                }

                record.unjoin(me);

                me.data.remove(record);
                sync = sync || !isPhantom;
            }
        }

        me.fireEvent('removerecords', me, removed, indices);

        if (autoSync && sync) {
            me.sync();
        }
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
     * Remove all items from the store.
     * @param {Boolean} silent Prevent the `clear` event from being fired.
     */
    removeAll: function(silent) {
        if (silent !== true) {
            this.fireAction('clear', [this], 'doRemoveAll');
        } else {
            this.doRemoveAll(this, true);
        }
    },

    doRemoveAll: function(silent) {
        var me = this;
        me.data.each(function(record) {
            record.unjoin(me);
        });
        me.removed = me.removed.concat(me.data.items);
        me.data.clear();

        if (silent !== true) {
            me.fireEvent('refresh', me, me.data);
        }

        if (me.getAutoSync()) {
            this.sync();
        }
    },

    /**
     * Calls the specified function for each of the {@link Ext.data.Model Records} in the cache.
     * @param {Function} fn The function to call. The {@link Ext.data.Model Record} is passed as the first parameter.
     * Returning <tt>false</tt> aborts and exits the iteration.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed.
     * Defaults to the current {@link Ext.data.Model Record} in the iteration.
     */
    each: function(fn, scope) {
        this.data.each(fn, scope);
    },

    /**
     * Gets the number of cached records.
     * If using paging, this may not be the total size of the dataset.
     * @return {Number} The number of Records in the Store's cache.
     */
    getCount: function() {
        return this.data.length || 0;
    },

    /**
     * Get the Record at the specified index.
     * @param {Number} index The index of the Record to find.
     * @return {Ext.data.Model} The Record at the passed index. Returns undefined if not found.
     */
    getAt: function(index) {
        return this.data.getAt(index);
    },

    /**
     * Returns a range of Records between specified indices.
     * @param {Number} startIndex (optional) The starting index (defaults to 0)
     * @param {Number} endIndex (optional) The ending index (defaults to the last Record in the Store)
     * @return {Ext.data.Model[]} An array of Records
     */
    getRange: function(start, end) {
        return this.data.getRange(start, end);
    },

    /**
     * Get the Record with the specified id.
     * @param {String} id The id of the Record to find.
     * @return {Ext.data.Model} The Record with the passed id. Returns undefined if not found.
     */
    getById: function(id) {
        return this.data.findBy(function(record) {
            return record.getId() === id;
        });
    },

    /**
     * Get the index within the cache of the passed Record.
     * @param {Ext.data.Model} record The Ext.data.Model object to find.
     * @return {Number} The index of the passed Record. Returns -1 if not found.
     */
    indexOf: function(record) {
        return this.data.indexOf(record);
    },

    /**
     * Get the index within the cache of the Record with the passed id.
     * @param {String} id The id of the Record to find.
     * @return {Number} The index of the Record. Returns -1 if not found.
     */
    indexOfId: function(id) {
        return this.data.indexOfKey(id);
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to.
     * @param {Ext.data.Model} record The model instance that was edited
     * @param {String[]} modifiedFieldNames Array of field names changed during edit.
     */
    afterEdit: function(record, modifiedFieldNames, modified) {
        var me = this,
            data = me.data,
            currentId = modified[record.getIdProperty()] || record.getId(),
            currentIndex = data.keys.indexOf(currentId),
            newIndex;

        if (currentIndex === -1 && data.map[currentId] === undefined) {
            return;
        }

        if (me.getAutoSync()) {
            me.sync();
        }

        if (currentId !== record.getId()) {
            data.replace(currentId, record);
        } else {
            data.replace(record);
        }

        newIndex = data.indexOf(record);
        if (currentIndex === -1 && newIndex !== -1) {
            me.fireEvent('addrecords', me, [record]);
        }
        else if (currentIndex !== -1 && newIndex === -1) {
            me.fireEvent('removerecords', me, [record], [currentIndex]);
        }
        else if (newIndex !== -1) {
            me.fireEvent('updaterecord', me, record, newIndex, currentIndex);
        }
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to..
     * @param {Ext.data.Model} record The model instance that was edited
     */
    afterReject: function(record) {
        // Must pass the 5th param (modifiedFieldNames) as null, otherwise the
        // event firing machinery appends the listeners "options" object to the arg list
        // which may get used as the modified fields array by a handler.
        // This array is used for selective grid cell updating by Grid View.
        // Null will be treated as though all cells need updating.
        // See https://sencha.jira.com/browse/TOUCH-1591
        //this.fireEvent('update', this, record, Ext.data.Model.REJECT, null);
        var index = this.data.indexOf(record);
        this.fireEvent('updaterecord', this, record, index, index);
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to.
     * @param {Ext.data.Model} record The model instance that was edited
     */
    afterCommit: function(record, modified) {
        var me = this,
            data = me.data,
            currentId = modified[record.getIdProperty()] || record.getId(),
            currentIndex = data.keys.indexOf(currentId),
            newIndex;

        if (currentIndex === -1 && data.map[currentId] === undefined) {
            return;
        }

        if (currentId !== record.getId()) {
            data.replace(currentId, record);
        } else {
            data.replace(record);
        }

        newIndex = data.indexOf(record);
        if (currentIndex === -1 && newIndex !== -1) {
            me.fireEvent('addrecords', me, [record]);
        }
        else if (currentIndex !== -1 && newIndex === -1) {
            me.fireEvent('removerecords', me, [record], [currentIndex]);
        }
        else if (newIndex !== -1) {
            me.fireEvent('updaterecord', me, record, newIndex, currentIndex);
        }
    },

    /**
     * This gets called by a record after is gets erased from the server.
     * @param record
     * @private
     */
    afterErase: function(record) {
        var me = this,
            data = me.data,
            index = data.indexOf(record);

        if (index !== -1) {
            data.remove(record);
            me.fireEvent('removerecords', me, [record], [index]);
        }
    },

    updateRemoteFilter: function(remoteFilter) {
        this.data.setAutoFilter(!remoteFilter);
    },

    updateRemoteSort: function(remoteSort) {
        this.data.setAutoSort(!remoteSort);
    },

    /**
     * Sorts the data in the Store by one or more of its properties. Example usage:
     *
     *     // sort by a single field
     *     myStore.sort('myField', 'DESC');
     *
     *     // sorting by multiple fields
     *     myStore.sort([
     *         {
     *             property : 'age',
     *             direction: 'ASC'
     *         },
     *         {
     *             property : 'name',
     *             direction: 'DESC'
     *         }
     *     ]);
     *
     * Internally, Store converts the passed arguments into an array of {@link Ext.util.Sorter} instances, and delegates
     * the actual sorting to its internal {@link Ext.util.MixedCollection}.
     *
     * When passing a single string argument to sort, Store maintains a ASC/DESC toggler per field, so this code:
     *
     *     store.sort('myField');
     *     store.sort('myField');
     *
     * is equivalent to this code:
     *
     *     store.sort('myField', 'ASC');
     *     store.sort('myField', 'DESC');
     *
     * because Store handles the toggling automatically.
     *
     * @param {String/Ext.util.Sorter[]} sorters Either a string name of one of the fields in this Store's configured
     * {@link Ext.data.Model Model}, or an array of sorter configurations.
     * @param {String} defaultDirection The default overall direction to sort the data by. Defaults to "ASC".
     * @param {String} where (Optional) This can be either 'prepend' or 'append'. If you leave this undefined
     * it will clear the current sorters.
     */
    sort: function(sorters, defaultDirection, where) {
        var data = this.data,
            grouper = this.getGrouper(),
            autoSort = data.getAutoSort();

        if (sorters) {
            // While we are adding sorters we dont want to sort right away
            // since we need to update sortTypes on the sorters.
            data.setAutoSort(false);
            if (typeof where === 'string') {
                if (where == 'prepend') {
                    data.insertSorters(grouper ? 1 : 0, sorters, defaultDirection);
                } else {
                    data.addSorters(sorters, defaultDirection);
                }
            } else {
                data.setSorters(null);
                if (grouper) {
                    data.addSorters(grouper);
                }
                data.addSorters(sorters, defaultDirection);
            }
            this.updateSortTypes();
            // Setting back autoSort to true (if it was like that before) will
            // instantly sort the data again.
            data.setAutoSort(autoSort);
        }

        if (this.getRemoteSort()) {
            this.load();
        } else {
            // If we havent added any new sorters we have to manually call sort
            if (!sorters) {
                this.data.sort();
            }

            this.fireEvent('sort', this, this.data, this.data.getSorters());
            if (data.length) {
                this.fireEvent('refresh', this, this.data);
            }
        }
    },

    /**
     * Filters the loaded set of records by a given set of filters.
     *
     * Filtering by single field:
     *
     *     store.filter("email", /\.com$/);
     *
     * Using multiple filters:
     *
     *     store.filter([
     *         {property: "email", value: /\.com$/},
     *         {filterFn: function(item) { return item.get("age") > 10; }}
     *     ]);
     *
     * Using Ext.util.Filter instances instead of config objects
     * (note that we need to specify the {@link Ext.util.Filter#root root} config option in this case):
     *
     *     store.filter([
     *         Ext.create('Ext.util.Filter', {property: "email", value: /\.com$/, root: 'data'}),
     *         Ext.create('Ext.util.Filter', {filterFn: function(item) { return item.get("age") > 10; }, root: 'data'})
     *     ]);
     *
     * @param {Object[]/Ext.util.Filter[]/String} filters The set of filters to apply to the data.
     * These are stored internally on the store, but the filtering itself is done on the Store's
     * {@link Ext.util.MixedCollection MixedCollection}. See MixedCollection's
     * {@link Ext.util.MixedCollection#filter filter} method for filter syntax.
     * Alternatively, pass in a property string.
     * @param {String} [value] value to filter by (only if using a property string as the first argument).
     * @param {Boolean} [anyMatch=false] True to allow any match, false to anchor regex beginning with `^`.
     * @param {Boolean} [caseSensitive=false] True to make the filtering regex case sensitive.
     */
    filter: function(property, value, anyMatch, caseSensitive) {
        var data = this.data,
            ln = data.length;

        if (this.getRemoteFilter()) {
            if (property) {
                if (Ext.isString(property)) {
                    data.addFilters({
                        property     : property,
                        value        : value,
                        anyMatch     : anyMatch,
                        caseSensitive: caseSensitive
                    });
                }
                else if (Ext.isArray(property) || property.isFilter) {
                    data.addFilters(property);
                }
            }
            this.load();
        } else {
            data.filter(property, value);
            this.fireEvent('filter', this, data, data.getFilters());

            if (data.length !== ln) {
                this.fireEvent('refresh', this, data);
            }
        }
    },

    /**
     * Filter by a function. The specified function will be called for each
     * Record in this Store. If the function returns <tt>true</tt> the Record is included,
     * otherwise it is filtered out.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Model<p class="sub-desc">The {@link Ext.data.Model record}
     * to test for filtering. Access field values using {@link Ext.data.Model#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this Store.
     */
    filterBy: function(fn, scope) {
        var me = this,
            data = me.data,
            ln = data.length;

        data.filter({
            filterFn: fn,
            scope: scope
        });

        this.fireEvent('filter', this, data, data.getFilters());

        if (data.length !== ln) {
            this.fireEvent('refresh', this, data);
        }
    },

    /**
     * Query the cached records in this Store using a filtering function. The specified function
     * will be called with each record in this Store. If the function returns <tt>true</tt> the record is
     * included in the results.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Model<p class="sub-desc">The {@link Ext.data.Model record}
     * to test for filtering. Access field values using {@link Ext.data.Model#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this Store.
     * @return {Ext.util.MixedCollection} Returns an Ext.util.MixedCollection of the matched records
     **/
    queryBy: function(fn, scope) {
        return this.data.filterBy(fn, scope || this);
    },

    /**
     * Reverts to a view of the Record cache with no filtering applied.
     * @param {Boolean} [suppressEvent=false] True to clear silently without firing the `datachanged` event.
     */
    clearFilter: function(suppressEvent) {
        var ln = this.data.length;
        if (suppressEvent) {
            this.suspendEvents();
        }
        this.data.setFilters(null);
        if (suppressEvent) {
            this.resumeEvents();
        } else if (ln !== this.data.length) {
            this.fireEvent('refresh', this, this.data);
        }
    },

    /**
     * Returns true if this store is currently filtered
     * @return {Boolean}
     */
    isFiltered: function() {
        return this.data.filtered;
    },

    getSorters: function() {
        var sorters = this.data.getSorters();
        return (sorters) ? sorters.items : [];
    },

    getFilters: function() {
        var filters = this.data.getFilters();
        return (filters) ? filters.items : [];
    },

    /**
     * Returns an array containing the result of applying the grouper to the records in this store. See {@link #groupField},
     * {@link #groupDir} and {@link #grouper}. Example for a store containing records with a color field:
     *
     *     var myStore = Ext.create('Ext.data.Store', {
     *         groupField: 'color',
     *         groupDir  : 'DESC'
     *     });
     *
     *     myStore.getGroups(); //returns:
     *     [
     *        {
     *            name: 'yellow',
     *            children: [
     *                //all records where the color field is 'yellow'
     *            ]
     *        },
     *        {
     *            name: 'red',
     *            children: [
     *                //all records where the color field is 'red'
     *            ]
     *        }
     *     ]
     *
     * @param {String} groupName (Optional) Pass in an optional groupName argument to access a specific group as defined by {@link #grouper}
     * @return {Object/Object[]} The grouped data
     */
    getGroups: function(requestGroupString) {
        var records = this.data.items,
            length = records.length,
            grouper = this.getGrouper(),
            groups = [],
            pointers = {},
            record,
            groupStr,
            group,
            i;

        // <debug>
        if (!grouper) {
            Ext.Logger.error('Trying to get groups for a store that has no grouper');
        }
        // </debug>

        for (i = 0; i < length; i++) {
            record = records[i];
            groupStr = grouper.getGroupString(record);
            group = pointers[groupStr];

            if (group === undefined) {
                group = {
                    name: groupStr,
                    children: []
                };

                groups.push(group);
                pointers[groupStr] = group;
            }

            group.children.push(record);
        }

        return requestGroupString ? pointers[requestGroupString] : groups;
    },

    getGroupString: function(record) {
        var grouper = this.getGrouper();
        if (grouper) {
            return grouper.getGroupString(record);
        }
        return null;
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
    find: function(fieldName, value, startIndex, anyMatch, caseSensitive, exactMatch) {
        var filter = Ext.create('Ext.util.Filter', {
            property: fieldName,
            value: value,
            anyMatch: anyMatch,
            caseSensitive: caseSensitive,
            exactMatch: exactMatch,
            root: 'data'
        });
        return this.data.findIndexBy(filter.getFilterFn(), null, startIndex);
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
     * @return {Ext.data.Model} The matched record or null
     */
    findRecord: function() {
        var me = this,
            index = me.find.apply(me, arguments);
        return index !== -1 ? me.getAt(index) : null;
    },

    /**
     * Finds the index of the first matching Record in this store by a specific field value.
     * @param {String} fieldName The name of the Record field to test.
     * @param {Object} value The value to match the field against.
     * @param {Number} startIndex (optional) The index to start searching at
     * @return {Number} The matched index or -1
     */
    findExact: function(fieldName, value, startIndex) {
        return this.data.findIndexBy(function(record) {
            return record.get(fieldName) === value;
        }, this, startIndex);
    },

    /**
     * Find the index of the first matching Record in this Store by a function.
     * If the function returns <tt>true</tt> it is considered a match.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Model<p class="sub-desc">The {@link Ext.data.Model record}
     * to test for filtering. Access field values using {@link Ext.data.Model#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this Store.
     * @param {Number} startIndex (optional) The index to start searching at
     * @return {Number} The matched index or -1
     */
    findBy: function(fn, scope, startIndex) {
        return this.data.findIndexBy(fn, scope, startIndex);
    },

    /**
     * Loads data into the Store via the configured {@link #proxy}. This uses the Proxy to make an
     * asynchronous call to whatever storage backend the Proxy uses, automatically adding the retrieved
     * instances into the Store and calling an optional callback if required. Example usage:
     *
     *     store.load({
     *         callback: function(records, operation, success) {
     *             // the {@link Ext.data.Operation operation} object contains all of the details of the load operation
     *             console.log(records);
     *         },
     *         scope: this
     *     });
     *
     * If only the callback and scope options need to be specified, then one can call it simply like so:
     *
     *     store.load(function(records, operation, success) {
     *         console.log('loaded records');
     *     }, this);
     *
     * @param {Object/Function} [options] config object, passed into the Ext.data.Operation object before loading.
     * @param {Object} [scope] Scope for the function.
     */
    load: function(options, scope) {
        var me = this,
            operation,
            currentPage = me.currentPage,
            pageSize = me.getPageSize();

        options = options || {};

        if (Ext.isFunction(options)) {
            options = {
                callback: options,
                scope: scope || this
            };
        }

        if (me.getRemoteSort()) {
            options.sorters = options.sorters || this.getSorters();
        }

        if (me.getRemoteFilter()) {
            options.filters = options.filters || this.getFilters();
        }

        if (me.getRemoteGroup()) {
            options.grouper = options.grouper || this.getGrouper();
        }

        Ext.applyIf(options, {
            page: currentPage,
            start: (currentPage - 1) * pageSize,
            limit: pageSize,
            addRecords: false,
            action: 'read',
            model: this.getModel()
        });

        operation = Ext.create('Ext.data.Operation', options);

        if (me.fireEvent('beforeload', me, operation) !== false) {
            me.loading = true;
            me.getProxy().read(operation, me.onProxyLoad, me);
        }

        return me;
    },

    /**
     * Returns true if the Store is currently performing a load operation
     * @return {Boolean} True if the Store is currently loading
     */
    isLoading: function() {
        return this.loading;
    },

    /**
     * Synchronizes the Store with its Proxy. This asks the Proxy to batch together any new, updated
     * and deleted records in the store, updating the Store's internal representation of the records
     * as each operation completes.
     */
    sync: function() {
        var me = this,
            operations = {},
            toCreate = me.getNewRecords(),
            toUpdate = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        if (toCreate.length > 0) {
            operations.create = toCreate;
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            operations.update = toUpdate;
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            operations.destroy = toDestroy;
            needsSync = true;
        }

        if (needsSync && me.fireEvent('beforesync', this, operations) !== false) {
            me.getProxy().batch({
                operations: operations,
                listeners: me.getBatchListeners()
            });
        }

        return {
            added: toCreate,
            updated: toUpdate,
            removed: toDestroy
        };
    },

    /**
     * Returns the first Model instance in this Store
     * @return {Ext.data.Model} The first Model instance
     */
    first: function() {
        return this.getAt(0);
    },

    /**
     * Returns the last Model instance in this Store
     * @return {Ext.data.Model} The last Model instance
     */
    last: function() {
        return this.getAt(this.getCount() - 1);
    },

    /**
     * @private
     * Returns an object which is passed in as the listeners argument to proxy.batch inside this.sync.
     * This is broken out into a separate function to allow for customisation of the listeners
     * @return {Object} The listeners object
     */
    getBatchListeners: function() {
        return {
            scope: this,
            exception: this.onBatchException,
            complete: this.onBatchComplete
        };
    },

    /**
     * @private
     * Attached as the 'complete' event listener to a proxy's Batch object. Iterates over the batch operations
     * and updates the Store's internal data MixedCollection.
     */
    onBatchComplete: function(batch) {
        var me = this,
            operations = batch.operations,
            length = operations.length,
            i;

        for (i = 0; i < length; i++) {
            me.onProxyWrite(operations[i]);
        }

        // See https://sencha.jira.com/browse/TOUCH-1593
        //me.fireEvent('datachanged', me);
    },

    onBatchException: function(batch, operation) {
        // //decide what to do... could continue with the next operation
        // batch.start();
        //
        // //or retry the last operation
        // batch.retry();
    },

    /**
     * @private
     * Called internally when a Proxy has completed a load request
     */
    onProxyLoad: function(operation) {
        var me = this,
            records = operation.getRecords(),
            resultSet = operation.getResultSet(),
            successful = operation.wasSuccessful();

        if (resultSet) {
            me.setTotalCount(resultSet.getTotal());
        }

        if (successful) {
            if (operation.getAddRecords() !== true) {
                // We make it silent cause we don't want a refresh event to be fired
                me.removeAll(true);

                // This means we have to fire a clear event though
                me.fireEvent('clear', this);
            }

            // Now lets add the records without firing an addrecords event
            me.suspendEvents();
            me.add(records);
            me.resumeEvents();

            // And finally fire a refresh event so any bound view can fully refresh itself
            me.fireEvent('refresh', this, this.data);
        }

        me.loading = false;
        me.fireEvent('load', this, records, successful);

        //this is a callback that would have been passed to the 'read' function and is optional
        Ext.callback(operation.getCallback(), operation.getScope() || me, [records, operation, successful]);
    },

    /**
     * @private
     * Callback for any write Operation over the Proxy. Updates the Store's MixedCollection to reflect
     * the updates provided by the Proxy
     */
    onProxyWrite: function(operation) {
        var me = this,
            success = operation.wasSuccessful(),
            records = operation.getRecords();

        switch (operation.getAction()) {
            case 'create':
                me.onCreateRecords(records, operation, success);
                break;
            case 'update':
                me.onUpdateRecords(records, operation, success);
                break;
            case 'destroy':
                me.onDestroyRecords(records, operation, success);
                break;
        }

        if (success) {
            me.fireEvent('write', me, operation);

            // See https://sencha.jira.com/browse/TOUCH-1593
            // me.fireEvent('datachanged', me);
        }
        //this is a callback that would have been passed to the 'create', 'update' or 'destroy' function and is optional
        Ext.callback(operation.getCallback(), operation.getScope() || me, [records, operation, success]);
    },

    // These methods are now just template methods since updating the records etc is all taken care of
    // by the operation itself.
    onCreateRecords: function(records, operation, success) {},
    onUpdateRecords: function(records, operation, success) {},

    onDestroyRecords: function(records, operation, success) {
        this.removed = [];
    },

    /**
     * Returns all Model instances that are either currently a phantom (e.g. have no id), or have an ID but have not
     * yet been saved on this Store (this happens when adding a non-phantom record from another Store into this one).
     * @return {Ext.data.Model[]} The Model instances.
     */
    getNewRecords: function() {
        return this.data.filterBy(function(item) {
            // only want phantom records that are valid
            return item.phantom === true && item.isValid();
        }).items;
    },

    /**
     * Returns all Model instances that have been updated in the Store but not yet synchronized with the Proxy.
     * @return {Ext.data.Model[]} The updated Model instances.
     */
    getUpdatedRecords: function() {
        return this.data.filterBy(function(item) {
            // only want dirty records, not phantoms that are valid
            return item.dirty === true && item.phantom !== true && item.isValid();
        }).items;
    },

    /**
     * Returns any records that have been removed from the store but not yet destroyed on the proxy.
     * @return {Ext.data.Model[]} The removed Model instances
     */
    getRemovedRecords: function() {
        return this.removed;
    },

    // PAGING METHODS
    /**
     * Loads a given 'page' of data by setting the start and limit values appropriately. Internally this just causes a normal
     * load operation, passing in calculated 'start' and 'limit' params
     * @param {Number} page The number of the page to load
     * @param {Object} options See options for {@link #method-load}
     */
    loadPage: function(page, options) {
        var me = this,
            pageSize = me.getPageSize(),
            clearOnPageLoad = me.getClearOnPageLoad();

        options = Ext.apply({}, options);

        me.currentPage = page;

        me.load(Ext.applyIf(options, {
            page: page,
            start: (page - 1) * pageSize,
            limit: pageSize,
            addRecords: !clearOnPageLoad
        }));
    },

    /**
     * Loads the next 'page' in the current data set
     * @param {Object} options See options for {@link #method-load}
     */
    nextPage: function(options) {
        this.loadPage(this.currentPage + 1, options);
    },

    /**
     * Loads the previous 'page' in the current data set
     * @param {Object} options See options for {@link #method-load}
     */
    previousPage: function(options) {
        this.loadPage(this.currentPage - 1, options);
    }

    // <deprecated product=touch since=2.0>
    ,onClassExtended: function(cls, data) {
        var prototype = this.prototype,
            defaultConfig = prototype.config,
            config = data.config || {},
            key;

        // Convert deprecated properties in application into a config object
        for (key in defaultConfig) {
            if (key != "control" && key in data) {
                config[key] = data[key];
                delete data[key];
                // <debug warn>
                // See https://sencha.jira.com/browse/TOUCH-1499
                console.warn(key + ' is deprecated as a property directly on the ' + this.$className + ' prototype. Please put it inside the config object.');
                // </debug>
            }
        }
        data.config = config;
    }
}, function() {
    /**
     * Loads an array of data straight into the Store
     * @param {Ext.data.Model[]/Object[]} data Array of data to load. Any non-model instances will be cast into model instances first
     * @param {Boolean} append True to add the records to the existing records in the store, false to remove the old ones first
     * @deprecated 2.0 Use #add or #setData instead.
     * @method loadData
     */
    this.override({
        loadData: function(data, append) {
            Ext.Logger.deprecate("loadData is deprecated, please use either add or setData");
            if (append) {
                this.add(data);
            } else {
                this.setData(data);
            }
        }
    });

    // @TODO: put back backwards compat version of the collect method, or just leave it out

    // @TODO: put back some of the other aggregation methods even though they seem to be useless

    // </deprecated>
});
