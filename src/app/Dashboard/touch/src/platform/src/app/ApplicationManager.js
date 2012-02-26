/**
 * @class Ext.ApplicationManager
 * @extends Ext.AbstractManager
 * @singleton
 * @ignore
 */
Ext.ApplicationManager = new Ext.AbstractManager({
    register: function(name, options) {
        if (Ext.isObject(name)) {
            options = name;
        } else {
            options.name = name;
        }
        
        var application = new Ext.Application(options);
        
        this.all.add(application);
        
        this.currentApplication = application;
        
        return application;
    }
});

/**
 * Shorthand for {@link Ext.ApplicationManager#register}
 * Creates a new Application class from the specified config object. See {@link Ext.Application} for full examples.
 * 
 * @param {Object} config A configuration object for the Model you wish to create.
 * @return {Ext.Application} The newly created Application
 * @member Ext
 * @method regApplication
 */
Ext.regApplication = function() {
    return Ext.ApplicationManager.register.apply(Ext.ApplicationManager, arguments);
};