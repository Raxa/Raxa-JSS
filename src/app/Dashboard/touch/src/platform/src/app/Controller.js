/**
 * @author Ed Spencer
 * @class Ext.Controller
 * @extends Ext.util.Observable
 * 
 * @constructor
 */
Ext.Controller = Ext.extend(Ext.util.Observable, {
    constructor: function(config) {
        this.addEvents(
            /**
             * @event instance-created
             * Fired when a new model instance has been successfully created by this controller
             * @param {Ext.data.Model} instance The newly-created model instance
             */
            'instance-created',
            
            /**
             * @event instance-creation-failed
             * Fired when an attempt at saving a new instance failed
             * @param {Ext.data.Model} instance The instance that could not be saved
             * @param {Object} errors The set of errors (if any) that caused the failure
             */
            'instance-creation-failed',
            
            /**
             * @event instance-updated
             * Fired when an existing model instance has been successfully updated by this controller
             * @param {Ext.data.Model} instance The instance that was updated
             */
            'instance-updated',
            
            /**
             * @event instance-update-failed
             * Fired when an update to existing model instance could not be successfully completed
             * @param {Ext.data.Model} instance The instance that could not be updated
             * @param {Object} errors The set of errors (if any) that caused the failure
             */
            'instance-update-failed',
            
            /**
             * @event instance-destroyed
             * Fired when an existing instance has been successfully destroyed by this controller
             * @param {Ext.data.Model} instance The instance that was destroyed
             */
            'instance-destroyed',
            
            /**
             * @event instance-destruction-failed
             * Fired when an existing instance could not be destroyed
             * @param {Ext.data.Model} instance The instance that could not be destroyed
             * @param {Object} errors The set of errors (if any) that caused the failure
             */
            'instance-destruction-failed'
        );
        
        Ext.Controller.superclass.constructor.call(this, config);
        
        Ext.apply(this, config || {});
        
        if (typeof this.model == 'string') {
            this.model = Ext.ModelMgr.getModel(this.model);
        }
    },
    
    index: function() {
        this.render('index', {
            listeners: {
                scope  : this,
                edit   : this.edit,
                build  : this.build,
                create : this.onCreateInstance,
                destroy: this.onDestroyInstance
            }
        });
    },
    
    /**
     * Renders the edit form for a given model instance
     * @param {Ext.data.Model} instance The instance to edit
     */
    edit: function(instance) {
        var view = this.render('edit', {
            listeners: this.getEditListeners()
        });
        
        view.loadModel(instance);
    },
    
    /**
     * Callback automatically tied to the index view's 'build' event. By default this just renders the registered
     * 'build' view
     */
    build: function() {
        this.render('build', {
            listeners: this.getBuildListeners()
        });
    },
    
    /**
     * Saves a phantom Model instance via its configured Proxy. Fires the 'instance-created' event if successful,
     * the 'instance-creation-failed' event if not.
     * @param {Object} data The data to create the instance from
     * @param {Object} options Optional options object containing callbacks for success and failure plus optional scope
     */
    create: function(data, options) {
        options = options || {};
        
        var model     = this.getModel(),
            instance  = new model(data),
            successCb = options.success,
            failureCb = options.failure,
            scope     = options.scope || this;
        
        instance.save({
            scope  : this,
            success: function(instance) {
                if (typeof successCb == 'function') {
                    successCb.call(scope, instance);
                }
                
                this.fireEvent('instance-created', instance);
            },
            failure: function(instance, errors) {                
                if (typeof failureCb == 'function') {
                    failureCb.call(scope, instance, errors);
                }
                
                this.fireEvent('instance-creation-failed', instance, errors);
            }
        });
    },
    
    /**
     * Updates an existing model instance by applying optional updates to it and attempting to save
     * @param {Ext.data.Model} instance The existing instance
     * @param {Object} updates Optional additional updates to apply to the instance before saving
     * @param {Object} options success and failure callback functions
     */
    update: function(instance, updates, options) {
        options = options || {};
        
        var successCb = options.success,
            failureCb = options.failure,
            scope     = options.scope || this;
        
        if (Ext.isObject(updates)) {
            instance.set(updates);
        }
        
        instance.save({
            scope  : this,
            success: function(instance) {
                if (typeof successCb == 'function') {
                    successCb.call(scope, instance);
                }
                
                this.fireEvent('instance-updated', instance);
            },
            failure: function(instance, errors) {
                if (typeof failureCb == 'function') {
                    failureCb.call(scope, instance, errors);
                }
                
                this.fireEvent('instance-update-failed', instance, errors);
            }
        });
    },
    
    /**
     * Destroys one or more existing, previously saved model instances
     * @param {Ext.data.Model} instance The model instance to destroy
     * @param {Object} options success and failure callbacks
     */
    destroy: function(instance, options) {
        options = options || {};
        
        var successCb = options.success,
            failureCb = options.failure,
            scope     = options.scope || this;
        
        instance.destroy({
            scope  : this,
            success: function(instance) {
                if (typeof successCb == 'function') {
                    successCb.call(scope, instance);
                }
                
                this.fireEvent('instance-destroyed', instance);
            },
            failure: function(instance, errors) {
                if (typeof failureCb == 'function') {
                    failureCb.call(scope, instance, errors);
                }
                
                this.fireEvent('instance-destruction-failed', instance, errors);
            }
        });
    },
    
    /**
     * Returns the listeners to attach to the view rendered by the {@link #build} action. By default this returns listeners
     * for save and cancel, but this can be overridden
     * @return {Object} listeners
     */
    getBuildListeners: function() {
        return {
            scope : this,
            save  : this.onCreateInstance,
            cancel: this.onCancelBuild
        };
    },
    
    /**
     * Returns the listeners to attach to the view rendered by the {@link #edit} action. By default this returns listeners
     * for save and cancel, but this can be overridden
     * @return {Object} listeners
     */
    getEditListeners: function() {
        return {
            scope : this,
            save  : this.onUpdateInstance,
            cancel: this.onCancelEdit
        };
    },
    
    /**
     * Handler for the 'cancel' event fired by an {@link #edit} view. By default this just closes the view
     * @param {Ext.Component} view The edit form
     */
    onCancelEdit: function(view) {
        return this.closeView(view);
    },
    
    /**
     * Handler for the 'cancel' event fired by an {@link #build} view. By default this just closes the view
     * @param {Ext.Component} view The build form
     */
    onCancelBuild: function(view) {
        return this.closeView(view);
    },
    
    /**
     * Callback automatically tied to the index view's 'create' event. By default this just calls the controller's
     * create function with the data and some basic callbacks to handle errors or show success. Can be overridden
     * to provide custom behavior
     * @param {Ext.View} view The view instance that fired the event
     */
    onCreateInstance: function(view) {
        this.create(view.getValues(), {
            scope  : this,
            success: function(instance) {
                this.closeView(view);
            },
            failure: function(instance, errors) {
                console.log('fail');
            }
        });
    },
    
    /**
     * Callback automatically tied to the index view's 'update' event. By default this just calls the controller's
     * update function with the data and some basic callbacks to handle errors or show success. Can be overridden
     * to provide custom behavior
     * @param {Ext.Component} view The view instance that fired the event
     */
    onUpdateInstance: function(view) {
        this.update(view.getRecord(), view.getValues(), {
            scope  : this,
            success: function(instance) {
                this.closeView(view);
            },
            failure: function(instance, errors) {
                
            }
        });
    },
    
    /**
     * Callback automatically tied to the index view's 'destroy' event. By default that just calls the controller's
     * destroy function with the model instance and some basic callbacks to handle errors or show success. Can be
     * overridden to provide custom behavior.
     * @param {Ext.data.Model} instance The instance to destroy
     * @param {Ext.View} view The view instance that fired the event
     */
    onDestroyInstance: function(instance, view) {
        this.destroy(instance, {
            scope  : this,
            success: function(instance) {
                
            },
            failure: function(instance, errors) {
                
            }
        });
    },
    
    /**
     * Sets the default container that components rendered using {@link #render} will be added to.
     * In many applications there is a fixed navigation panel and a content panel - the content
     * panel would usually form the render target in this type of setup.
     * @param {Ext.Container} target The container to add rendered components to
     */
    setRenderTarget: function(target) {
        /**
         * @property renderTarget
         * @type Ext.Container
         * The current {@link #setRenderTarget render target}. Read only
         */
        Ext.Controller.renderTarget = target;
    },
    
    /**
     * Renders a given view based on a registered name
     * @param {String} viewName The name of the view to render
     * @param {Object} config Optional config object
     * @return {Ext.View} The view instance
     */
    render: function(config, target) {
        var Controller  = Ext.Controller,
            application = this.application,
            profile     = application ? application.currentProfile : undefined,
            profileTarget, view;
        
        Ext.applyIf(config, {
            profile: profile
        });
        
        view = Ext.ComponentMgr.create(config);
        
        if (target !== false) {
            //give the current Ext.Profile a chance to set the target
            profileTarget = profile ? profile.getRenderTarget(config, application) : target;
            
            if (target == undefined) {
                target = profileTarget || (application ? application.defaultTarget : undefined);
            }

            if (typeof target == 'string') {
                target = Ext.getCmp(target);
            }

            if (target != undefined && target.add) {
                if (profile) {
                    profile.beforeLayout(view, target, application);
                }
                
                target.add(view);

                if (target.layout && target.layout.setActiveItem) {
                    target.layout.setActiveItem(view);
                }

                target.doComponentLayout();
                
                if (profile) {
                    profile.afterLayout(view, target, application);
                }
            }
        }
        
        return view;
    },
    
    /**
     * This function allows you to add listeners to a view
     * in a convenient way
     */    
    control : function(view, actions, itemName) {
        if (!view || !view.isView) {
            throw 'Trying to control a view that doesnt exist';
        }

        var item = itemName ? view.refs[itemName] : view,
            key, value, name, child, listener;
    
        if (!item) {
            throw "No item called " + itemName + " found inside the " + view.name + " view.";
        }        
    	
        for (key in actions) {
            value = actions[key];
    	
            // If it is an object, it can either be a listener with a handler defined
            // in which case the key is the event name, or it can be an object containing
            // listener(s), in which case key will be the items name
            if (Ext.isObject(value) && !value.fn) {
                this.control(view, value, key);
            }
            else {
                // Now hopefully we can be sure that key is an event name. We will loop over all
                // child items and enable bubbling for this event
                if (item.refs) {
                    for (name in item.refs) {
                        child = item.refs[name];
                        if (child.isObservable && child.events[key]) {
                            child.enableBubble(key);
                        }
                    }
                }
    
                if (!value.fn) {
                    listener = {};
                    listener[key] = value;
                    listener.scope = this;
                }
                else {
                    listener = value;
                    if (listener.scope === undefined) {
                        listener.scope = this;
                    }
                }

                // Finally we bind the listener on this item
                item.addListener(listener);
            }
        }

        return view;
    },
    
    /**
     * Returns the constructor for the model type linked to this controller
     * @return {Ext.data.Model} The model constructor
     */
    getModel: function() {
        return Ext.ModelMgr.getModel(this.model);
    },
    
    /**
     * @private
     * Used internally whenever we want to remove a component from its parent container. See onCancelEdit and onCancelBuild
     * @param {Ext.Component} view The component to close
     */
    closeView: function(view) {
        var ownerCt = view.ownerCt;
        
        if (ownerCt) {
            ownerCt.remove(view);
            ownerCt.doLayout();
            ownerCt.setActiveItem(ownerCt.items.last());
        }
    }
});