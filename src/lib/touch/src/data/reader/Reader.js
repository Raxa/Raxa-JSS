/**
 * @author Ed Spencer
 *
 * Readers are used to interpret data to be loaded into a {@link Ext.data.Model Model} instance or a {@link
 * Ext.data.Store Store} - often in response to an AJAX request. In general there is usually no need to create
 * a Reader instance directly, since a Reader is almost always used together with a {@link Ext.data.proxy.Proxy Proxy},
 * and is configured using the Proxy's {@link Ext.data.proxy.Proxy#cfg-reader reader} configuration property:
 *
 *     Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         proxy: {
 *             type: 'ajax',
 *             url : 'users.json',
 *             reader: {
 *                 type: 'json',
 *                 root: 'users'
 *             }
 *         },
 *     });
 *
 * The above reader is configured to consume a JSON string that looks something like this:
 *
 *     {
 *         "success": true,
 *         "users": [
 *             { "name": "User 1" },
 *             { "name": "User 2" }
 *         ]
 *     }
 *
 *
 * # Loading Nested Data
 *
 * Readers have the ability to automatically load deeply-nested data objects based on the {@link Ext.data.association.Association
 * associations} configured on each Model. Below is an example demonstrating the flexibility of these associations in a
 * fictional CRM system which manages a User, their Orders, OrderItems and Products. First we'll define the models:
 *
 *     Ext.define("User", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'name'
 *         ],
 *
 *         hasMany: {model: 'Order', name: 'orders'},
 *
 *         proxy: {
 *             type: 'rest',
 *             url : 'users.json',
 *             reader: {
 *                 type: 'json',
 *                 root: 'users'
 *             }
 *         }
 *     });
 *
 *     Ext.define("Order", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'total'
 *         ],
 *
 *         hasMany  : {model: 'OrderItem', name: 'orderItems', associationKey: 'order_items'},
 *         belongsTo: 'User'
 *     });
 *
 *     Ext.define("OrderItem", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'price', 'quantity', 'order_id', 'product_id'
 *         ],
 *
 *         belongsTo: ['Order', {model: 'Product', associationKey: 'product'}]
 *     });
 *
 *     Ext.define("Product", {
 *         extend: 'Ext.data.Model',
 *         fields: [
 *             'id', 'name'
 *         ],
 *
 *         hasMany: 'OrderItem'
 *     });
 *
 * This may be a lot to take in - basically a User has many Orders, each of which is composed of several OrderItems.
 * Finally, each OrderItem has a single Product. This allows us to consume data like this:
 *
 *     {
 *         "users": [
 *             {
 *                 "id": 123,
 *                 "name": "Ed",
 *                 "orders": [
 *                     {
 *                         "id": 50,
 *                         "total": 100,
 *                         "order_items": [
 *                             {
 *                                 "id"      : 20,
 *                                 "price"   : 40,
 *                                 "quantity": 2,
 *                                 "product" : {
 *                                     "id": 1000,
 *                                     "name": "MacBook Pro"
 *                                 }
 *                             },
 *                             {
 *                                 "id"      : 21,
 *                                 "price"   : 20,
 *                                 "quantity": 3,
 *                                 "product" : {
 *                                     "id": 1001,
 *                                     "name": "iPhone"
 *                                 }
 *                             }
 *                         ]
 *                     }
 *                 ]
 *             }
 *         ]
 *     }
 *
 * The JSON response is deeply nested - it returns all Users (in this case just 1 for simplicity's sake), all of the
 * Orders for each User (again just 1 in this case), all of the OrderItems for each Order (2 order items in this case),
 * and finally the Product associated with each OrderItem. Now we can read the data and use it as follows:
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         model: "User"
 *     });
 *
 *     store.load({
 *         callback: function() {
 *             //the user that was loaded
 *             var user = store.first();
 *
 *             console.log("Orders for " + user.get('name') + ":")
 *
 *             //iterate over the Orders for each User
 *             user.orders().each(function(order) {
 *                 console.log("Order ID: " + order.getId() + ", which contains items:");
 *
 *                 //iterate over the OrderItems for each Order
 *                 order.orderItems().each(function(orderItem) {
 *                     //we know that the Product data is already loaded, so we can use the synchronous getProduct
 *                     //usually, we would use the asynchronous version (see {@link Ext.data.association.BelongsTo})
 *                     var product = orderItem.getProduct();
 *
 *                     console.log(orderItem.get('quantity') + ' orders of ' + product.get('name'));
 *                 });
 *             });
 *         }
 *     });
 *
 * Running the code above results in the following:
 *
 *     Orders for Ed:
 *     Order ID: 50, which contains items:
 *     2 orders of MacBook Pro
 *     3 orders of iPhone
 */
Ext.define('Ext.data.reader.Reader', {
    requires: [
        'Ext.data.ResultSet'
    ],
    alternateClassName: ['Ext.data.Reader', 'Ext.data.DataReader'],
    
    mixins: ['Ext.mixin.Observable'],

    // private
    isReader: true,

    config: {
        /**
         * @cfg {String} idProperty
         * Name of the property within a row object that contains a record identifier value. Defaults to The id of the
         * model. If an idProperty is explicitly specified it will override that of the one specified on the model
         */
        idProperty: undefined,

        /**
         * @cfg {String} clientIdProperty
         * The name of the property with a response that contains the existing client side id for a record that we are reading.
         */
        clientIdProperty: 'clientId',

        /**
         * @cfg {String} totalProperty
         * Name of the property from which to retrieve the total number of records in the dataset. This is only needed if
         * the whole dataset is not passed in one go, but is being paged from the remote server. Defaults to total.
         */
        totalProperty: 'total',

        /**
         * @cfg {String} successProperty
         * Name of the property from which to retrieve the success attribute. Defaults to success. See
         * {@link Ext.data.proxy.Server}.{@link Ext.data.proxy.Server#exception exception} for additional information.
         */
        successProperty: 'success',

        /**
         * @cfg {String} messageProperty
         * The name of the property which contains a response message. This property is optional.
         */
        messageProperty: null,

        /**
         * @cfg {String} root
         * The name of the property which contains the Array of row objects.  For JSON reader it's dot-separated list
         * of property names.  For XML reader it's a CSS selector.  For array reader it's not applicable.
         *
         * By default the natural root of the data will be used.  The root Json array, the root XML element, or the array.
         *
         * The data packet value for this property should be an empty array to clear the data or show no data.
         */
        rootProperty: '',

        /**
         * @cfg {Boolean} implicitIncludes
         * True to automatically parse models nested within other models in a response object. See the
         * Ext.data.reader.Reader intro docs for full explanation. Defaults to true.
         */
        implicitIncludes: true,

        model: undefined
    },

    constructor: function(config) {
        config = config || {};

        if (config.root) {
            // <debug>
            console.warn('root has been deprecated as a configuration on Reader. Please use rootProperty instead.');
            // </debug>

            config.rootProperty = config.root;
            delete config.root;
        }

        this.initConfig(config);
    },

    /**
     * @property {Object} metaData
     * The raw meta data that was most recently read, if any. Meta data can include existing
     * Reader config options like {@link #idProperty}, {@link #totalProperty}, etc. that get
     * automatically applied to the Reader, and those can still be accessed directly from the Reader
     * if needed. However, meta data is also often used to pass other custom data to be processed
     * by application code. For example, it is common when reconfiguring the data model of a grid to
     * also pass a corresponding column model config to be applied to the grid. Any such data will
     * not get applied to the Reader directly (it just gets passed through and is ignored by Ext).
     * This metaData property gives you access to all meta data that was passed, including any such
     * custom data ignored by the reader.
     *
     * This is a read-only property, and it will get replaced each time a new meta data object is
     * passed to the reader.
     */

    fieldCount: 0,

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

        return model;
    },

    applyIdProperty: function(idProperty) {
        if (!idProperty && this.getModel()) {
            idProperty = this.getModel().getIdProperty();
        }
        return idProperty;
    },

    updateModel: function(model) {
        if (model) {
            if (!this.getIdProperty()) {
                this.setIdProperty(model.getIdProperty());
            }
            this.buildExtractors();
        }
    },

    createAccessor: Ext.emptyFn,

    /**
     * @private
     * This builds optimized functions for retrieving record data and meta data from an object.
     * Subclasses may need to implement their own getRoot function.
     */
    buildExtractors: function() {
        var me          = this,
            idProp      = me.getIdProperty(),
            totalProp   = me.getTotalProperty(),
            successProp = me.getSuccessProperty(),
            messageProp = me.getMessageProperty(),
            clientIdProp= me.getClientIdProperty(),
            idAccessor, clientIdAccessor;

        //build the extractors for all the meta data
        if (totalProp) {
            me.getTotal = me.createAccessor(totalProp);
        }

        if (successProp) {
            me.getSuccess = me.createAccessor(successProp);
        }

        if (messageProp) {
            me.getMessage = me.createAccessor(messageProp);
        }

        if (idProp) {
            idAccessor = me.createAccessor(idProp);
            me.getId = function(record) {
                var id = idAccessor.call(me, record);
                return (id === undefined || id === '') ? null : id;
            };
        } else {
            me.getId = function() {
                return null;
            };
        }

        if (clientIdProp) {
            clientIdAccessor = me.createAccessor(clientIdProp);
            me.getClientId = function(record) {
                var id = clientIdAccessor.call(me, record);
                return (id === undefined || id === '') ? null : id;
            };
        } else {
            me.getClientId = function() {
                return null;
            };
        }

        me.buildFieldExtractors();
    },

    /**
     * @private
     */
    buildFieldExtractors: function() {
        var me = this,
            fields = me.getFields(),
            ln = fields.length,
            i  = 0,
            extractorFunctions = [],
            field, mapping;

        for (; i < ln; i++) {
            field = fields[i];
            mapping = field.getMapping();
            if (mapping === undefined || mapping === null) {
                mapping = field.getName();
            }
            extractorFunctions.push(me.createAccessor(mapping));
        }

        me.fieldCount = ln;
        me.extractorFunctions = extractorFunctions;
    },

    getFields: function() {
        return this.getModel().getFields().items;
    },

    /**
     * @private
     * By default this function just returns what is passed to it. It can be overridden in a subclass
     * to return something else. See XmlReader for an example.
     * @param {Object} data The data object
     * @return {Object} The normalized data object
     */
    getData: function(data) {
        return data;
    },

    /**
     * @private
     * This will usually need to be implemented in a subclass. Given a generic data object (the type depends on the type
     * of data we are reading), this function should return the object as configured by the Reader's 'root' meta data config.
     * See XmlReader's getRoot implementation for an example. By default the same data object will simply be returned.
     * @param {Object} data The data object
     * @return {Object} The same data object
     */
    getRoot: function(data) {
        return data;
    },

    /**
     * Reads the given response object. This method normalizes the different types of response object that may be passed
     * to it, before handing off the reading of records to the {@link #readRecords} function.
     * @param {Object} response The response object. This may be either an XMLHttpRequest object or a plain JS object
     * @return {Ext.data.ResultSet} The parsed ResultSet object
     */
    read: function(response) {
        var data = response,
            Model = this.getModel(),
            resultSet, records, i, ln, record;

        if (response) {
            data = this.getResponseData(response);
        }

        if (data) {
            resultSet = this.readRecords(data);
            records = resultSet.getRecords();
            for (i = 0, ln = records.length; i < ln; i++) {
                record = records[i];
                records[i] = new Model(record.data, record.id, record.node);
            }
            return resultSet;
        } else {
            return this.nullResultSet;
        }
    },

    process: function(response) {
        var data = response;

        if (response) {
            data = this.getResponseData(response);
        }

        if (data) {
            return this.readRecords(data);
        } else {
            return this.nullResultSet;
        }
    },

    /**
     * Abstracts common functionality used by all Reader subclasses. Each subclass is expected to call this function
     * before running its own logic and returning the Ext.data.ResultSet instance. For most Readers additional
     * processing should not be needed.
     * @param {Object} data The raw data object
     * @return {Ext.data.ResultSet} A ResultSet object
     */
    readRecords: function(data) {
        var me  = this;

        /**
         * @property {Object} rawData
         * The raw data object that was last passed to readRecords. Stored for further processing if needed
         */
        me.rawData = data;

        data = me.getData(data);

        // If we pass an array as the data, we dont use getRoot on the data.
        // Instead the root equals to the data.
        var root    = Ext.isArray(data) ? data : me.getRoot(data),
            success = true,
            recordCount = 0,
            total, value, records, message;

        if (root) {
            total = root.length;
        }

        if (me.getTotalProperty()) {
            value = parseInt(me.getTotal(data), 10);
            if (!isNaN(value)) {
                total = value;
            }
        }

        if (me.getSuccessProperty()) {
            value = me.getSuccess(data);
            if (value === false || value === 'false') {
                success = false;
            }
        }

        if (me.getMessageProperty()) {
            message = me.getMessage(data);
        }

        if (root) {
            records = me.extractData(root);
            recordCount = records.length;
        } else {
            recordCount = 0;
            records = [];
        }

        return new Ext.data.ResultSet({
            total  : total || recordCount,
            count  : recordCount,
            records: records,
            success: success,
            message: message
        });
    },

    /**
     * Returns extracted, type-cast rows of data.
     * @param {Object[]/Object} root from server response
     * @private
     */
    extractData : function(root) {
        var me = this,
            records = [],
            length  = root.length,
            fields = me.getFields(),
            fieldLength = fields.length,
            fieldsCollection = me.getModel().getFields(),
            data, node, id, clientId, i, j, value;

        /*
         * We check here whether the fields are dirty since the last read.
         * This works around an issue when a Model is used for both a Tree and another
         * source, because the tree decorates the model with extra fields and it causes
         * issues because the readers aren't notified.
         */
        if (fieldsCollection.isDirty) {
            me.buildExtractors(true);
            delete fieldsCollection.isDirty;
        }

        if (!root.length && Ext.isObject(root)) {
            root = [root];
            length = 1;
        }

        for (i = 0; i < length; i++) {
            data = {};
            node = root[i];

            id = me.getId(node);
            clientId = me.getClientId(node);

            for (j = 0; j < fieldLength; j++) {
                value = me.extractorFunctions[j](node);
                if (value !== undefined) {
                    data[fields[j].getName()] = value;
                }
            }

            if (me.getImplicitIncludes()) {
                 me.readAssociated(data, node);
            }

            records.push({
                id: id,
                clientId: clientId,
                node: node,
                data: data
            });
        }

        return records;
    },

    /**
     * @private
     * Loads a record's associations from the data object. This prepopulates hasMany and belongsTo associations
     * on the record provided.
     * @param {Ext.data.Model} record The record to load associations for
     * @param {Object} data The data object
     * @return {String} Return value description
     */
    readAssociated: function(data, node) {
        var associations = this.getModel().associations.items,
            i            = 0,
            length       = associations.length,
            association, associationData, associationKey;

        for (; i < length; i++) {
            association     = associations[i];
            associationKey  = association.getAssociationKey();
            associationData = this.getAssociatedDataRoot(node, associationKey);

            if (associationData) {
                data[associationKey] = associationData;
            }
        }
    },

    /**
     * @private
     * Used internally by {@link #readAssociated}. Given a data object (which could be json, xml etc) for a specific
     * record, this should return the relevant part of that data for the given association name. This is only really
     * needed to support the XML Reader, which has to do a query to get the associated data object
     * @param {Object} data The raw data object
     * @param {String} associationName The name of the association to get data for (uses associationKey if present)
     * @return {Object} The root
     */
    getAssociatedDataRoot: function(data, associationName) {
        return data[associationName];
    }

//
//    /**
//     * @private
//     * Reconfigures the meta data tied to this Reader
//     */
//    onMetaChange : function(meta) {
//        var fields = meta.fields,
//            me = this,
//            newModel;
//
//        // save off the raw meta data
//        me.metaData = meta;
//
//        // set any reader-specific configs from meta if available
//        me.root = meta.root || me.root;
//        me.idProperty = meta.idProperty || me.idProperty;
//        me.totalProperty = meta.totalProperty || me.totalProperty;
//        me.successProperty = meta.successProperty || me.successProperty;
//        me.messageProperty = meta.messageProperty || me.messageProperty;
//
//        if (fields) {
//            if (me.model) {
//                me.model.setFields(fields);
//                me.setModel(me.model, true);
//            }
//            else {
//                newModel = Ext.define("Ext.data.reader.Json-Model" + Ext.id(), {
//                    extend: 'Ext.data.Model',
//                    fields: fields
//                });
//                if (me.idProperty) {
//                    // We only do this if the reader actually has a custom idProperty set,
//                    // otherwise let the model use its own default value. It is valid for
//                    // the reader idProperty to be undefined, in which case it will use the
//                    // model's idProperty (in getIdProperty()).
//                    newModel.idProperty = me.idProperty;
//                }
//                me.setModel(newModel, true);
//            }
//        }
//        else {
//            me.buildExtractors(true);
//        }
//    }
}, function() {
    Ext.apply(this.prototype, {
        // Private. Empty ResultSet to return when response is falsy (null|undefined|empty string)
        nullResultSet: new Ext.data.ResultSet({
            total  : 0,
            count  : 0,
            records: [],
            success: true
        })
    });
});
