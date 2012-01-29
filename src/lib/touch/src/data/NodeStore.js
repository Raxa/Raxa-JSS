/**
 * @class Ext.data.NodeStore
 * @extends Ext.data.AbstractStore
 * Node Store
 * @ignore
 */
Ext.define('Ext.data.NodeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.node',
    requires: ['Ext.data.NodeInterface'],

    config: {
        /**
         * @cfg {Ext.data.Model} node The Record you want to bind this Store to. Note that
         * this record will be decorated with the Ext.data.NodeInterface if this is not the
         * case yet.
         * @accessor
         */
        node: null,

        /**
         * @cfg {Boolean} recursive Set this to true if you want this NodeStore to represent
         * all the descendents of the node in its flat data collection. This is useful for
         * rendering a tree structure to a DataView and is being used internally by
         * the TreeView. Any records that are moved, removed, inserted or appended to the
         * node at any depth below the node this store is bound to will be automatically
         * updated in this Store's internal flat data structure.
         * @accessor
         */
        recursive: false,

        /**
         * @cfg {Boolean} rootVisible False to not include the root node in this Stores collection.
         * @accessor
         */
        rootVisible: false,

        sorters: undefined,
        filters: undefined
    },

    afterEdit: function(record, modifiedFields) {
        if (modifiedFields) {
            if (modifiedFields.indexOf('loaded') !== -1) {
                this.add(this.retrieveChildNodes(record));
            }
            if (modifiedFields.indexOf('expanded') !== -1) {
                this.filter();
            }
        }
        this.callParent(arguments);
    },

    onNodeAppend: function(parent, node) {
        this.add([node].concat(this.retrieveChildNodes(node)));
    },

    onNodeInsert: function(parent, node) {
        this.add([node].concat(this.retrieveChildNodes(node)));
    },

    onNodeRemove: function(parent, node) {
        this.remove([node].concat(this.retrieveChildNodes(node)));
    },

    onNodeSort: function() {
        this.sort();
    },

    applySorters: function(sorters) {
        return function(node1, node2) {
            // A shortcut for siblings
            if (node1.parentNode === node2.parentNode) {
                return (node1.data.index < node2.data.index) ? -1 : 1;
            }

            // @NOTE: with the following algorithm we can only go 80 levels deep in the tree
            // and each node can contain 10000 direct children max

            var weight1 = 0,
                weight2 = 0,
                parent1 = node1,
                parent2 = node2;

            while (parent1) {
                weight1 += (Math.pow(10, (parent1.data.depth+1) * -4) * (parent1.data.index+1));
                parent1 = parent1.parentNode;
            }
            while (parent2) {
                weight2 += (Math.pow(10, (parent2.data.depth+1) * -4) * (parent2.data.index+1));
                parent2 = parent2.parentNode;
            }

            if (weight1 > weight2) {
                return 1;
            } else if (weight1 < weight2) {
                return -1;
            }
            return (node1.data.index > node2.data.index) ? 1 : -1;
        };
    },

    applyFilters: function(filters) {
        var me = this;
        return function(item) {
            return me.isVisible(item);
        };
    },

    applyProxy: function(proxy) {
        //<debug>
        if (proxy) {
            Ext.Logger.warn("A NodeStore cannot be bound to a proxy. Instead bind it to a record " +
                            "decorated with the NodeInterface by setting the node config.");
        }
        //</debug>
    },

    applyNode: function(node) {
        if (node) {
            node = Ext.data.NodeInterface.decorate(node);
        }
        return node;
    },

    updateNode: function(node, oldNode) {
        if (oldNode) {
            oldNode.un({
                append  : 'onNodeAppend',
                insert  : 'onNodeInsert',
                remove  : 'onNodeRemove',
                sort    : 'onNodeSort',
                load    : 'onNodeLoad',
                scope: this
            });
            oldNode.unjoin(this);
        }

        if (node) {
            node.on({
                scope   : this,
                append  : 'onNodeAppend',
                insert  : 'onNodeInsert',
                remove  : 'onNodeRemove',
                sort    : 'onNodeSort',
                load    : 'onNodeLoad'
            });

            var data = [];
            if (node.childNodes.length) {
                data = data.concat(this.retrieveChildNodes(node));
            }
            if (this.getRootVisible()) {
                data.push(node);
            } else if (node.isLoaded() || node.isLoading()) {
                node.set('expanded', true);
            }

            this.setData(data);

            node.join(this);
        }
    },

    /**
     * Private method used to deeply retrieve the children of a record without recursion.
     * @private
     * @param parent
     */
    retrieveChildNodes: function(root) {
        var node = this.getNode(),
            recursive = this.getRecursive(),
            added = [],
            child = root;

        if (!root.childNodes.length || (!recursive && root !== node)) {
            return added;
        }

        if (!recursive) {
            return root.childNodes;
        }

        while (child) {
            if (child._added) {
                delete child._added;
                if (child === root) {
                    break;
                } else {
                    child = child.nextSibling || child.parentNode;
                }
            } else {
                if (child !== root) {
                    added.push(child);
                }
                if (child.firstChild) {
                    child._added = true;
                    child = child.firstChild;
                } else {
                    child = child.nextSibling || child.parentNode;
                }
            }
        }

        return added;
    },

    isVisible: function(node) {
        var parent = node.parentNode;
        while (parent) {
            if (!parent.isExpanded()) {
                return false;
            }
            parent = parent.parentNode;
        }
        return true;
    }
});