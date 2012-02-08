/**
 * The TreeStore is a store implementation that is backed by by an {@link Ext.data.Tree}.
 * It provides convenience methods for loading nodes, as well as the ability to use
 * the hierarchical tree structure combined with a store. This class also relays many events from
 * the Tree for convenience.
 *
 * # Using Models
 *
 * If no Model is specified, an implicit model will be created that implements {@link Ext.data.NodeInterface}.
 * The standard Tree fields will also be copied onto the Model for maintaining their state. These fields are listed
 * in the {@link Ext.data.NodeInterface} documentation.
 *
 * # Reading Nested Data
 *
 * For the tree to read nested data, the {@link Ext.data.reader.Reader} must be configured with a root property,
 * so the reader can find nested data for each node. If a root is not specified, it will default to
 * 'children'.
 */
Ext.define('Ext.data.TreeStore', {
    extend: 'Ext.data.NodeStore',
    alias: 'store.tree',

    config: {
        /**
         * @cfg {Ext.data.Model/Ext.data.NodeInterface/Object} root
         * The root node for this store. For example:
         *
         *     root: {
         *         expanded: true,
         *         text: "My Root",
         *         children: [
         *             { text: "Child 1", leaf: true },
         *             { text: "Child 2", expanded: true, children: [
         *                 { text: "GrandChild", leaf: true }
         *             ] }
         *         ]
         *     }
         *
         * Setting the `root` config option is the same as calling {@link #setRootNode}.
         * @accessor
         */
        root: undefined,

        /**
         * @cfg {Boolean} clearOnLoad
         * Remove previously existing child nodes before loading. Default to true.
         * @accessor
         */
        clearOnLoad : true,

        /**
         * @cfg {String} nodeParam
         * The name of the parameter sent to the server which contains the identifier of the node.
         * Defaults to 'node'.
         * @accessor
         */
        nodeParam: 'node',

        /**
         * @cfg {String} defaultRootId
         * The default root id. Defaults to 'root'
         * @accessor
         */
        defaultRootId: 'root',

        /**
         * @cfg {String} defaultRootProperty
         * The root property to specify on the reader if one is not explicitly defined.
         * @accessor
         */
        defaultRootProperty: 'children',

        /**
         * @cfg {Boolean} folderSort
         * Set to true to automatically prepend a leaf sorter. Defaults to `undefined`.
         * @accessor
         */
        folderSort: false,

        recursive: true
    },

    applyProxy: function() {
        return Ext.data.Store.prototype.applyProxy.apply(this, arguments);
    },

    applyRoot: function(root) {
        var me = this;
        root = root || {};
        root = Ext.apply({}, root);

        if (!root.isModel) {
            Ext.applyIf(root, {
                id: me.getDefaultRootId(),
                text: 'Root',
                allowDrag: false
            });

            root = Ext.data.ModelManager.create(root, me.getModel());
        }

        if (!root.isNode) {
            Ext.data.NodeInterface.decorate(root);
            root.set(root.raw);
        }

        return root;
    },

    updateRoot: function(root, oldRoot) {
        if (oldRoot) {
            oldRoot.unBefore({
                expand: 'onNodeBeforeExpand',
                scope: this
            });
            oldRoot.unjoin(this);
        }

        this.setNode(root);

        root.onBefore({
            expand: 'onNodeBeforeExpand',
            scope: this
        });
        root.join(this);

        this.onNodeAppend(null, root);

        if (!root.isLoaded() && !root.isLoading() && root.isExpanded()) {
            this.load({
                node: root
            });
        }
    },

    /**
     * Sets the root node for this tree.
     * @param {Ext.data.Model} node
     * @return {Ext.data.Model}
     */
    setRootNode: function(node) {
        return this.setNode(node);
    },

    /**
     * Returns the root node for this tree.
     * @return {Ext.data.Model}
     */
    getRootNode: function(node) {
        return this.getNode();
    },

    /**
     * Returns the record node by id
     * @return {Ext.data.NodeInterface}
     */
    getNodeById: function(id) {
        return this.data.getByKey(id);
    },

    onNodeBeforeExpand: function(node, options, e) {
        if (node.isLoading()) {
            e.pause();
            this.on('load', function() {
                e.resume();
            }, this, {single: true});
        }
        else if (!node.isLoaded()) {
            e.pause();
            this.load({
                node: node,
                callback: function() {
                    e.resume();
                }
            });
        }
    },

    onNodeAppend: function(parent, node) {
        var proxy = this.getProxy(),
            reader = proxy.getReader(),
            data = node.raw,
            records = [],
            rootProperty = reader.getRootProperty(),
            dataRoot, processedData, i, ln;

        if (!node.isLeaf()) {
            dataRoot = reader.getRoot(data);
            if (dataRoot) {
                processedData = reader.extractData(dataRoot);
                for (i = 0, ln = processedData.length; i < ln; i++) {
                    if (processedData[i].node[rootProperty]) {
                        processedData[i].data[rootProperty] = processedData[i].node[rootProperty];
                    }
                    records.push(processedData[i].data);
                }
                if (records.length) {
                    this.fillNode(node, records);
                }
                delete data[rootProperty];
            }
        }
    },

    updateAutoLoad: function(autoLoad) {
        if (autoLoad) {
            var root = this.getRoot();
            if (!root.isLoaded() && !root.isLoading()) {
                this.load({node: root});
            }
        }
    },

    /**
     * Loads the Store using its configured {@link #proxy}.
     * @param {Object} options (Optional) config object. This is passed into the {@link Ext.data.Operation Operation}
     * object that is created and then sent to the proxy's {@link Ext.data.proxy.Proxy#read} function.
     * The options can also contain a node, which indicates which node is to be loaded. If not specified, it will
     * default to the root node.
     */
    load: function(options) {
        options = options || {};
        options.params = options.params || {};

        var me = this,
            node = options.node = options.node || me.getRoot();

        options.params[me.getNodeParam()] = node.getId();

        if (me.getClearOnLoad()) {
            node.removeAll(true);
        }
        node.set('loading', true);

        return me.callParent([options]);
    },

    updateProxy: function(proxy) {
        var reader = proxy.getReader();
        if (!reader.getRootProperty()) {
            reader.setRootProperty(this.getDefaultRootProperty());
        }
    },

    // inherit docs
    removeAll: function() {
        this.getRootNode().removeAll(true);
        this.callParent(arguments);
    },

    // inherit docs
    onProxyLoad: function(operation) {
        var me = this,
            records = operation.getRecords(),
            successful = operation.wasSuccessful(),
            node = operation.getNode();

        node.beginEdit();
        node.set('loading', false);
        if (successful) {
            records = me.fillNode(node, records);
        }
        node.endEdit();

        node.fireEvent('load', node, records, successful);

        me.loading = false;
        me.fireEvent('load', this, records, successful);

        //this is a callback that would have been passed to the 'read' function and is optional
        Ext.callback(operation.getCallback(), operation.getScope() || me, [records, operation, successful]);
    },

    /**
     * Fills a node with a series of child records.
     * @private
     * @param {Ext.data.NodeInterface} node The node to fill
     * @param {Ext.data.Model[]} records The records to add
     */
    fillNode: function(node, records) {
        var ln = records ? records.length : 0,
            i, child;

        for (i = 0; i < ln; i++) {
            // true/true to suppress any events fired by the node, or the new child node
            child = node.appendChild(records[i], true, true);
            this.onNodeAppend(node, child);
        }
        node.set('loaded', true);

        return records;
    }

//
//    /**
//     * Called before a node is expanded.
//     * @private
//     * @param {Ext.data.NodeInterface} node The node being expanded.
//     * @param {Function} callback The function to run after the expand finishes
//     * @param {Object} scope The scope in which to run the callback function
//     */
//    onBeforeNodeExpand: function(node, callback, scope) {
//        if (node.isLoaded()) {
//            Ext.callback(callback, scope || node, [node.childNodes]);
//        }
//        else if (node.isLoading()) {
//            this.on('load', function() {
//                Ext.callback(callback, scope || node, [node.childNodes]);
//            }, this, {single: true});
//        }
//        else {
//            this.read({
//                node: node,
//                callback: function() {
//                    Ext.callback(callback, scope || node, [node.childNodes]);
//                }
//            });
//        }
//    },
//
//    //inherit docs
//    getNewRecords: function() {
//        return Ext.Array.filter(this.tree.flatten(), this.filterNew);
//    },
//
//    //inherit docs
//    getUpdatedRecords: function() {
//        return Ext.Array.filter(this.tree.flatten(), this.filterUpdated);
//    },
//
//    onNodeRemove: function(parent, node) {
//        var removed = this.removed;
//
//        if (!node.isReplace && Ext.Array.indexOf(removed, node) == -1) {
//            removed.push(node);
//        }
//    },
//
//    onNodeAdded: function(parent, node) {
//        var proxy = this.getProxy(),
//            reader = proxy.getReader(),
//            data = node.raw || node.data,
//            dataRoot, children;
//
//        Ext.Array.remove(this.removed, node);
//
//        if (!node.isLeaf() && !node.isLoaded()) {
//            dataRoot = reader.getRoot(data);
//            if (dataRoot) {
//                this.fillNode(node, reader.extractData(dataRoot));
//                delete data[reader.root];
//            }
//        }
//    },
//
//    /**
//     * Creates any new records when a write is returned from the server.
//     * @private
//     * @param {Ext.data.Model[]} records The array of new records
//     * @param {Ext.data.Operation} operation The operation that just completed
//     * @param {Boolean} success True if the operation was successful
//     */
//    onCreateRecords: function(records, operation, success) {
//        if (success) {
//            var i = 0,
//                length = records.length,
//                originalRecords = operation.records,
//                parentNode,
//                record,
//                original,
//                index;
//
//            /*
//             * Loop over each record returned from the server. Assume they are
//             * returned in order of how they were sent. If we find a matching
//             * record, replace it with the newly created one.
//             */
//            for (; i < length; ++i) {
//                record = records[i];
//                original = originalRecords[i];
//                if (original) {
//                    parentNode = original.parentNode;
//                    if (parentNode) {
//                        // prevent being added to the removed cache
//                        original.isReplace = true;
//                        parentNode.replaceChild(record, original);
//                        delete original.isReplace;
//                    }
//                    record.phantom = false;
//                }
//            }
//        }
//    },
//
//    /**
//     * Updates any records when a write is returned from the server.
//     * @private
//     * @param {Ext.data.Model[]} records The array of updated records
//     * @param {Ext.data.Operation} operation The operation that just completed
//     * @param {Boolean} success True if the operation was successful
//     */
//    onUpdateRecords: function(records, operation, success) {
//        if (success) {
//            var me = this,
//                i = 0,
//                length = records.length,
//                data = me.data,
//                original,
//                parentNode,
//                record;
//
//            for (; i < length; ++i) {
//                record = records[i];
//                original = me.tree.getNodeById(record.getId());
//                parentNode = original.parentNode;
//                if (parentNode) {
//                    // prevent being added to the removed cache
//                    original.isReplace = true;
//                    parentNode.replaceChild(record, original);
//                    original.isReplace = false;
//                }
//            }
//        }
//    },
//
//    /**
//     * Removes any records when a write is returned from the server.
//     * @private
//     * @param {Ext.data.Model[]} records The array of removed records
//     * @param {Ext.data.Operation} operation The operation that just completed
//     * @param {Boolean} success True if the operation was successful
//     */
//    onDestroyRecords: function(records, operation, success) {
//        if (success) {
//            this.removed = [];
//        }
//    },
//
//
//    // inherit docs
//    doSort: function(sorterFn) {
//        var me = this;
//        if (me.remoteSort) {
//            //the load function will pick up the new sorters and request the sorted data from the proxy
//            me.load();
//        } else {
//            me.tree.sort(sorterFn, true);
//            me.fireEvent('datachanged', me);
//        }
//        me.fireEvent('sort', me);
//    }
});