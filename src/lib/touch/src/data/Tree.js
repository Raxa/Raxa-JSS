/**
 * @class Ext.data.Tree
 *
 * This class is used as a container for a series of nodes. The nodes themselves maintain
 * the relationship between parent/child. The tree itself acts as a manager. It gives functionality
 * to retrieve a node by its identifier: {@link #getNodeById}.
 *
 * The tree also relays events from any of it's child nodes, allowing them to be handled in a
 * centralized fashion. In general this class is not used directly, rather used internally
 * by other parts of the framework.
 *
 */
Ext.define('Ext.data.Tree', {
    alias: 'data.tree',

    mixins: {
        observable: "Ext.mixin.Observable"
    },

    config: {
        /**
         * @property {Ext.data.NodeInterface}
         * The root node for this tree
         */
        rootNode: null
    },

    relayNodeEvents: [
        /**
         * @event append
         * @alias Ext.data.NodeInterface#append
         */
        "append",

        /**
         * @event remove
         * @alias Ext.data.NodeInterface#remove
         */
        "remove",

        /**
         * @event move
         * @alias Ext.data.NodeInterface#move
         */
        "move",

        /**
         * @event insert
         * @alias Ext.data.NodeInterface#insert
         */
        "insert",

        /**
         * @event beforeappend
         * @alias Ext.data.NodeInterface#beforeappend
         */
        "beforeappend",

        /**
         * @event beforeremove
         * @alias Ext.data.NodeInterface#beforeremove
         */
        "beforeremove",

        /**
         * @event beforemove
         * @alias Ext.data.NodeInterface#beforemove
         */
        "beforemove",

        /**
         * @event beforeinsert
         * @alias Ext.data.NodeInterface#beforeinsert
         */
        "beforeinsert",

        /**
         * @event expand
         * @alias Ext.data.NodeInterface#expand
         */
        "expand",

        /**
         * @event collapse
         * @alias Ext.data.NodeInterface#collapse
         */
        "collapse",

        /**
         * @event beforeexpand
         * @alias Ext.data.NodeInterface#beforeexpand
         */
        "beforeexpand",

        /**
         * @event beforecollapse
         * @alias Ext.data.NodeInterface#beforecollapse
         */
        "beforecollapse" ,

        /**
         * @event rootchange
         * Fires whenever the root node is changed in the tree.
         * @param {Ext.data.Model} root The new root
         */
        "rootchange"
    ],

    /**
     * Creates new Tree object.
     * @param {Ext.data.NodeInterface} root (optional) The root node
     */
    constructor: function(root) {
        var config = {};
        if (root) {
            config.rootNode = root;
        }

        this.nodeHash = {};

        this.initConfig(config);
    },

    applyRootNode: function(node) {
        if (node) {
            node = Ext.data.NodeInterface.decorate(node);
        }
        return node;
    },

    updateRootNode: function(node, oldNode) {
        if (oldNode) {
            node.un(this.nodeEventListeners);
        }

        if (node) {
            if (this.fireEvent('beforeappend', null, node) !== false) {
                node.set('root', true);
                node.updateInfo();

                this.relayEvents(node, this.relayNodeEvents);
                node.on({
                    scope: this,
                    insert: 'onNodeInsert',
                    append: 'onNodeAppend',
                    remove: 'onNodeRemove'
                });

                this.registerNode(node);

                this.fireEvent('append', null, node);
            }
        }
        
        this.fireEvent('rootchange', node, oldNode);
    },

    /**
     * Flattens all the nodes in the tree into an array.
     * @private
     * @return {Ext.data.NodeInterface[]} The flattened nodes.
     */
    flatten: function(){
        var nodes = [],
            hash = this.nodeHash,
            key;

        for (key in hash) {
            if (hash.hasOwnProperty(key)) {
                nodes.push(hash[key]);
            }
        }
        return nodes;
    },

    /**
     * Fired when a node is inserted into the root or one of it's children
     * @private
     * @param {Ext.data.NodeInterface} parent The parent node
     * @param {Ext.data.NodeInterface} node The inserted node
     */
    onNodeInsert: function(parent, node) {
        this.registerNode(node);
    },

    /**
     * Fired when a node is appended into the root or one of it's children
     * @private
     * @param {Ext.data.NodeInterface} parent The parent node
     * @param {Ext.data.NodeInterface} node The appended node
     */
    onNodeAppend: function(parent, node) {
        this.registerNode(node);
    },

    /**
     * Fired when a node is removed from the root or one of it's children
     * @private
     * @param {Ext.data.NodeInterface} parent The parent node
     * @param {Ext.data.NodeInterface} node The removed node
     */
    onNodeRemove: function(parent, node) {
        this.unregisterNode(node);
    },

    /**
     * Gets a node in this tree by its id.
     * @param {String} id
     * @return {Ext.data.NodeInterface} The match node.
     */
    getNodeById : function(id) {
        return this.nodeHash[id];
    },

    /**
     * Registers a node with the tree
     * @private
     * @param {Ext.data.NodeInterface} The node to register
     */
    registerNode : function(node) {
        this.nodeHash[node.getId()] = node;
    },

    /**
     * Unregisters a node with the tree
     * @private
     * @param {Ext.data.NodeInterface} The node to unregister
     */
    unregisterNode : function(node) {
        delete this.nodeHash[node.getId()];
    },

    /**
     * Sorts this tree
     * @private
     * @param {Function} sorterFn The function to use for sorting
     * @param {Boolean} recursive True to perform recursive sorting
     */
    sort: function(sorterFn, recursive) {
        this.getRootNode().sort(sorterFn, recursive);
    },

     /**
     * Filters this tree
     * @private
     * @param {Function} filterFn The function to use for filtering
     * @param {Boolean} recursive True to perform recursive filtering
     */
    filter: function(filterFn, recursive) {
        this.getRootNode().filter(filterFn, recursive);
    }
});