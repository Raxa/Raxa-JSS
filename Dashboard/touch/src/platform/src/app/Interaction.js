/**
 * @author Ed Spencer
 * @class Ext.Interaction
 * @extends Ext.util.Observable
 * 
 * <p>Interactions are very simple objects that represent an action performed by specific {@link Ext.Controller} 
 * action. The must consist of the {@link #controller} and {@link #action} to be called, but can contain any other
 * data too. See {@link Ext.Dispatcher} for more details on how Interactions fit into the application ecosystem.</p>
 * 
 * <p>Interactions are an internal representation that most developers will not have much direct use for. They 
 * help provide a normalized API for controller actions - each action should simply be set up to receive an Interaction
 * object. Because Interaction objects are always created when dispatching to a controller action, it is possible to 
 * store the Interaction objects that were created in a session to perform simple analytics on how the application 
 * is used. This is not built into the framework at the moment, but is left open for custom development if needed.</p>
 * 
 * @constructor
 * @param {Object} config Options object containing at least a controller/action pair
 */
Ext.Interaction = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {String} controller The controller to dispatch to
     */
    controller: '',
    
    /**
     * @cfg {String} action The controller action to invoke
     */
    action: '',
    
    /**
     * @cfg {Array} args Any arguments to pass to the action
     */
    
    /**
     * @cfg {Object} scope Optional scope to execute the controller action in
     */
    
    /**
     * True if this Interaction has already been dispatched
     * @property dispatched
     * @type Boolean
     */
    dispatched: false,
    
    constructor: function(config) {
        Ext.Interaction.superclass.constructor.apply(this, arguments);
        
        config = config || {};
              
        Ext.applyIf(config, {
            scope: this
        });
        
        Ext.apply(this, config);
        
        if (typeof this.controller == 'string') {
            this.controller = Ext.ControllerManager.get(this.controller);
        }
    }
});