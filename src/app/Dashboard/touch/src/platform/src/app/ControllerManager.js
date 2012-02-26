/**
 * @author Ed Spencer
 * @class Ext.ControllerManager
 * @extends Ext.AbstractManager
 * @singleton
 * 
 * <p>Keeps track of all of the registered controllers. This should very rarely need to be used by developers. This 
 * is simply an {@link Ext.AbstractManager AbstractManager} with a custom {@link #register} function which sets up
 * the controller and its linked {@link Ext.Application application}.</p>
 */
Ext.ControllerManager = new Ext.AbstractManager({
    register: function(id, options) {
        options.id = id;
        
        Ext.applyIf(options, {
            application: Ext.ApplicationManager.currentApplication
        });
        
        var controller = new Ext.Controller(options);
        
        if (controller.init) {
            controller.init();
        }
        
        this.all.add(controller);
        
        return controller;
    }
});

/**
 * Shorthand for {@link Ext.ControllerMgr#register}
 * Creates a new Controller class from the specified config object. See {@link Ext.Controller} for full examples.
 * 
 * @param {Object} config A configuration object for the Controller you wish to create.
 * @return {Ext.Controller} The newly registered Controller
 * @member Ext
 * @method regController
 */
Ext.regController = function() {
    return Ext.ControllerManager.register.apply(Ext.ControllerManager, arguments);
};