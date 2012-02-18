Ext.gesture.Gesture = Ext.extend(Object, {    
    listenForStart: true,
    listenForEnd: true,
    listenForMove: true,
    
    disableLocking: false,
    
    touches: 1,
    
    constructor: function(config) {
        config = config || {};
        Ext.apply(this, config);
        
        this.target = Ext.getDom(this.target);
        this.listeners = {};
        
        // <debug>
        if (!this.target) {
            throw new Error('Trying to bind a ' + this.type + ' event to element that does\'nt exist: ' + this.target);
        }
        // </debug>
        
        this.id = this.target.id + '-' + this.type;
        
        Ext.gesture.Gesture.superclass.constructor.call(this);
        Ext.gesture.Manager.register(this);
    },
    
    addListener: function(name, listener) {
        this.listeners[name] = this.listeners[name] || [];
        this.listeners[name].push(listener);
    },
    
    removeListener: function(name, listener) {
        var listeners = this.listeners[name];
            
        if (listeners) {
            listeners.remove(listener);

            if (listeners.length == 0) {
                delete this.listeners[name];
            }

            for (name in this.listeners) {
                if (this.listeners.hasOwnProperty(name)) {
                    return;
                }
            }
            
            this.listeners = {};
        }
    },
    
    fire: function(type, e, args) {
        var listeners = this.listeners && this.listeners[type],
            ln = listeners && listeners.length,
            i;

        if (!this.disableLocking && this.isLocked(type)) {
            return false;
        }
        
        if (ln) {
            args = Ext.apply(args || {}, {
                time: e.timeStamp,
                type: type,
                gesture: this,
                target: (e.target.nodeType == 3) ? e.target.parentNode: e.target
            });
            
            for (i = 0; i < ln; i++) {
                listeners[i](e, args);
            }
        }
        
        return true;
    },
    
    stop: function() {
        Ext.gesture.Manager.stopGesture(this);
    },
    
    lock: function() {
        if (!this.disableLocking) {
            var args = arguments,
                ln = args.length,
                i;

            for (i = 0; i < ln; i++) {
                Ext.gesture.Manager.locks[args[i]] = this.id;
            }            
        }
    },
    
    unlock: function() {
        if (!this.disableLocking) {
            var args = arguments,
                ln = args.length,
                i;

            for (i = 0; i < ln; i++) {
                if (Ext.gesture.Manager.locks[args[i]] == this.id) {
                    delete Ext.gesture.Manager.locks[args[i]]; 
                }
            }            
        }
    },
    
    isLocked : function(type) {
        var lock = Ext.gesture.Manager.locks[type];
        return !!(lock && lock !== this.id);
    },
    
    getLockingGesture : function(type) {
        var lock = Ext.gesture.Manager.locks[type];
        if (lock) {
            return Ext.gesture.Manager.get(lock) || null;
        }
        return null;
    },
    
    onTouchStart: Ext.emptyFn,
    onTouchMove: Ext.emptyFn,
    onTouchEnd: Ext.emptyFn,
    
    destroy: function() {
        this.stop();
        this.listeners = null;
        Ext.gesture.Manager.unregister(this);
    }
});