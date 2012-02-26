/**
 * @author Ed Spencer
 * @class Ext.data.Batch
 * @extends Ext.util.Observable
 * 
 * <p>Provides a mechanism to run one or more {@link Ext.data.Operation operations} in a given order. Fires the 'operationcomplete' event
 * after the completion of each Operation, and the 'complete' event when all Operations have been successfully executed. Fires an 'exception'
 * event if any of the Operations encounter an exception.</p>
 * 
 * <p>Usually these are only used internally by {@link Ext.data.Proxy} classes</p>
 * 
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.Batch = Ext.extend(Ext.util.Observable, {
    /**
     * True to immediately start processing the batch as soon as it is constructed (defaults to false)
     * @property autoStart
     * @type Boolean
     */
    autoStart: false,
    
    /**
     * The index of the current operation being executed
     * @property current
     * @type Number
     */
    current: -1,
    
    /**
     * The total number of operations in this batch. Read only
     * @property total
     * @type Number
     */
    total: 0,
    
    /**
     * True if the batch is currently running
     * @property isRunning
     * @type Boolean
     */
    isRunning: false,
    
    /**
     * True if this batch has been executed completely
     * @property isComplete
     * @type Boolean
     */
    isComplete: false,
    
    /**
     * True if this batch has encountered an exception. This is cleared at the start of each operation
     * @property hasException
     * @type Boolean
     */
    hasException: false,
    
    /**
     * True to automatically pause the execution of the batch if any operation encounters an exception (defaults to true)
     * @property pauseOnException
     * @type Boolean
     */
    pauseOnException: true,
    
    constructor: function(config) {                
        this.addEvents(
          /**
           * @event complete
           * Fired when all operations of this batch have been completed
           * @param {Ext.data.Batch} batch The batch object
           * @param {Object} operation The last operation that was executed
           */
          'complete',
          
          /**
           * @event exception
           * Fired when a operation encountered an exception
           * @param {Ext.data.Batch} batch The batch object
           * @param {Object} operation The operation that encountered the exception
           */
          'exception',
          
          /**
           * @event operationcomplete
           * Fired when each operation of the batch completes
           * @param {Ext.data.Batch} batch The batch object
           * @param {Object} operation The operation that just completed
           */
          'operationcomplete',
          
          //TODO: Remove this once we deprecate this function in 1.0. See below for further details
          'operation-complete'
        );
        
        Ext.data.Batch.superclass.constructor.call(this, config);
        
        /**
         * Ordered array of operations that will be executed by this batch
         * @property operations
         * @type Array
         */
        this.operations = [];
    },
    
    /**
     * Adds a new operation to this batch
     * @param {Object} operation The {@link Ext.data.Operation Operation} object
     */
    add: function(operation) {
        this.total++;
        
        operation.setBatch(this);
        
        this.operations.push(operation);
    },
    
    /**
     * Kicks off the execution of the batch, continuing from the next operation if the previous
     * operation encountered an exception, or if execution was paused
     */
    start: function() {
        this.hasException = false;
        this.isRunning = true;
        
        this.runNextOperation();
    },
    
    /**
     * @private
     * Runs the next operation, relative to this.current.
     */
    runNextOperation: function() {
        this.runOperation(this.current + 1);
    },
    
    /**
     * Pauses execution of the batch, but does not cancel the current operation
     */
    pause: function() {
        this.isRunning = false;
    },
    
    /**
     * Executes a operation by its numeric index
     * @param {Number} index The operation index to run
     */
    runOperation: function(index) {
        var operations = this.operations,
            operation  = operations[index];
        
        if (operation == undefined) {
            this.isRunning  = false;
            this.isComplete = true;
            this.fireEvent('complete', this, operations[operations.length - 1]);
        } else {
            this.current = index;
            
            var onProxyReturn = function(operation) {
                var hasException = operation.hasException();
                
                if (hasException) {
                    this.hasException = true;
                    this.fireEvent('exception', this, operation);
                } else {
                    //TODO: deprecate the dashed version of this event name 'operation-complete' as it breaks convention
                    //to be removed in 1.0
                    this.fireEvent('operation-complete', this, operation);
                    
                    this.fireEvent('operationcomplete', this, operation);
                }

                if (hasException && this.pauseOnException) {
                    this.pause();
                } else {
                    operation.setCompleted();
                    
                    this.runNextOperation();
                }
            };
            
            operation.setStarted();
            
            this.proxy[operation.action](operation, onProxyReturn, this);
        }
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.Model
 * @extends Ext.util.Stateful
 * 
 * <p>A Model represents some object that your application manages. For example, one might define a Model for Users, Products,
 * Cars, or any other real-world object that we want to model in the system. Models are registered via the {@link Ext.ModelMgr model manager},
 * and are used by {@link Ext.data.Store stores}, which are in turn used by many of the data-bound components in Ext.</p>
 * 
 * <p>Models are defined as a set of fields and any arbitrary methods and properties relevant to the model. For example:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'age',   type: 'int'},
        {name: 'phone', type: 'string'},
        {name: 'alive', type: 'boolean', defaultValue: true}
    ],

    changeName: function() {
        var oldName = this.get('name'),
            newName = oldName + " The Barbarian";

        this.set('name', newName);
    }
});
</code></pre>
* 
* <p>The fields array is turned into a {@link Ext.util.MixedCollection MixedCollection} automatically by the {@link Ext.ModelMgr ModelMgr}, and all
* other functions and properties are copied to the new Model's prototype.</p>
* 
* <p>Now we can create instances of our User model and call any model logic we defined:</p>
* 
<pre><code>
var user = Ext.ModelMgr.create({
    name : 'Conan',
    age  : 24,
    phone: '555-555-5555'
}, 'User');

user.changeName();
user.get('name'); //returns "Conan The Barbarian"
</code></pre>
 * 
 * <p><u>Validations</u></p>
 * 
 * <p>Models have built-in support for validations, which are executed against the validator functions in 
 * {@link Ext.data.validations} ({@link Ext.data.validations see all validation functions}). Validations are easy to add to models:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: [
        {name: 'name',     type: 'string'},
        {name: 'age',      type: 'int'},
        {name: 'phone',    type: 'string'},
        {name: 'gender',   type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'alive',    type: 'boolean', defaultValue: true}
    ],

    validations: [
        {type: 'presence',  field: 'age'},
        {type: 'length',    field: 'name',     min: 2},
        {type: 'inclusion', field: 'gender',   list: ['Male', 'Female']},
        {type: 'exclusion', field: 'username', list: ['Admin', 'Operator']},
        {type: 'format',    field: 'username', matcher: /([a-z]+)[0-9]{2,3}/}
    ]
});
</code></pre>
 * 
 * <p>The validations can be run by simply calling the {@link #validate} function, which returns a {@link Ext.data.Errors}
 * object:</p>
 * 
<pre><code>
var instance = Ext.ModelMgr.create({
    name: 'Ed',
    gender: 'Male',
    username: 'edspencer'
}, 'User');

var errors = instance.validate();
</code></pre>
 * 
 * <p><u>Associations</u></p>
 * 
 * <p>Models can have associations with other Models via {@link Ext.data.BelongsToAssociation belongsTo} and 
 * {@link Ext.data.HasManyAssociation hasMany} associations. For example, let's say we're writing a blog administration
 * application which deals with Users, Posts and Comments. We can express the relationships between these models like this:</p>
 * 
<pre><code>
Ext.regModel('Post', {
    fields: ['id', 'user_id'],

    belongsTo: 'User',
    hasMany  : {model: 'Comment', name: 'comments'}
});

Ext.regModel('Comment', {
    fields: ['id', 'user_id', 'post_id'],

    belongsTo: 'Post'
});

Ext.regModel('User', {
    fields: ['id'],

    hasMany: [
        'Post',
        {model: 'Comment', name: 'comments'}
    ]
});
</code></pre>
 * 
 * <p>See the docs for {@link Ext.data.BelongsToAssociation} and {@link Ext.data.HasManyAssociation} for details on the usage
 * and configuration of associations. Note that associations can also be specified like this:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: ['id'],

    associations: [
        {type: 'hasMany', model: 'Post',    name: 'posts'},
        {type: 'hasMany', model: 'Comment', name: 'comments'}
    ]
});
</code></pre>
 * 
 * <p><u>Using a Proxy</u></p>
 * 
 * <p>Models are great for representing types of data and relationships, but sooner or later we're going to want to 
 * load or save that data somewhere. All loading and saving of data is handled via a {@link Ext.data.Proxy Proxy}, 
 * which can be set directly on the Model:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: ['id', 'name', 'email'],

    proxy: {
        type: 'rest',
        url : '/users'
    }
});
</code></pre>
 * 
 * <p>Here we've set up a {@link Ext.data.RestProxy Rest Proxy}, which knows how to load and save data to and from a 
 * RESTful backend. Let's see how this works:</p>
 * 
<pre><code>
var user = Ext.ModelMgr.create({name: 'Ed Spencer', email: 'ed@sencha.com'}, 'User');

user.save(); //POST /users
</code></pre>
 * 
 * <p>Calling {@link #save} on the new Model instance tells the configured RestProxy that we wish to persist this 
 * Model's data onto our server. RestProxy figures out that this Model hasn't been saved before because it doesn't
 * have an id, and performs the appropriate action - in this case issuing a POST request to the url we configured
 * (/users). We configure any Proxy on any Model and always follow this API - see {@link Ext.data.Proxy} for a full
 * list.</p>
 * 
 * <p>Loading data via the Proxy is equally easy:</p>
 * 
<pre><code>
//get a reference to the User model class
var User = Ext.ModelMgr.getModel('User');

//Uses the configured RestProxy to make a GET request to /users/123
User.load(123, {
    success: function(user) {
        console.log(user.getId()); //logs 123
    }
});
</code></pre>
 * 
 * <p>Models can also be updated and destroyed easily:</p>
 * 
<pre><code>
//the user Model we loaded in the last snippet:
user.set('name', 'Edward Spencer');

//tells the Proxy to save the Model. In this case it will perform a PUT request to /users/123 as this Model already has an id
user.save({
    success: function() {
        console.log('The User was updated');
    }
});

//tells the Proxy to destroy the Model. Performs a DELETE request to /users/123
user.destroy({
    success: function() {
        console.log('The User was destroyed!');
    }
});
</code></pre>
 * 
 * <p><u>Usage in Stores</u></p>
 * 
 * <p>It is very common to want to load a set of Model instances to be displayed and manipulated in the UI. We do this 
 * by creating a {@link Ext.data.Store Store}:</p>
 * 
<pre><code>
var store = new Ext.data.Store({
    model: 'User'
});

//uses the Proxy we set up on Model to load the Store data
store.load();
</code></pre>
 * 
 * <p>A Store is just a collection of Model instances - usually loaded from a server somewhere. Store can also maintain
 * a set of added, updated and removed Model instances to be synchronized with the server via the Proxy. See the
 * {@link Ext.data.Store Store docs} for more information on Stores.</p>
 * 
 * @constructor
 * @param {Object} data An object containing keys corresponding to this model's fields, and their associated values
 * @param {Number} id Optional unique ID to assign to this model instance
 */
Ext.data.Model = Ext.extend(Ext.util.Stateful, {
    evented: false,
    isModel: true,
    
    /**
     * <tt>true</tt> when the record does not yet exist in a server-side database (see
     * {@link #setDirty}).  Any record which has a real database pk set as its id property
     * is NOT a phantom -- it's real.
     * @property phantom
     * @type {Boolean}
     */
    phantom : false,
    
    /**
     * @cfg {String} idProperty The name of the field treated as this Model's unique id (defaults to 'id').
     */
    idProperty: 'id',
    
    constructor: function(data, id) {
        data = data || {};
        
        /**
         * An internal unique ID for each Model instance, used to identify Models that don't have an ID yet
         * @property internalId
         * @type String
         * @private
         */
        this.internalId = (id || id === 0) ? id : Ext.data.Model.id(this);
        
        Ext.data.Model.superclass.constructor.apply(this);
        
        //add default field values if present
        var fields = this.fields.items,
            length = fields.length,
            field, name, i;
        
        for (i = 0; i < length; i++) {
            field = fields[i];
            name  = field.name;
            
            if (data[name] == undefined) {
                data[name] = field.defaultValue;
            }
        }
        
        this.set(data);
        this.dirty = false;
        
        if (this.getId()) {
            this.phantom = false;
        }
        
        if (typeof this.init == 'function') {
            this.init();
        }
    },
    
    /**
     * Validates the current data against all of its configured {@link #validations} and returns an 
     * {@link Ext.data.Errors Errors} object
     * @return {Ext.data.Errors} The errors object
     */
    validate: function() {
        var errors      = new Ext.data.Errors(),
            validations = this.validations,
            validators  = Ext.data.validations,
            length, validation, field, valid, type, i;

        if (validations) {
            length = validations.length;
            
            for (i = 0; i < length; i++) {
                validation = validations[i];
                field = validation.field || validation.name;
                type  = validation.type;
                valid = validators[type](validation, this.get(field));
                
                if (!valid) {
                    errors.add({
                        field  : field,
                        message: validation.message || validators[type + 'Message']
                    });
                }
            }
        }
        
        return errors;
    },
    
    /**
     * Returns the configured Proxy for this Model
     * @return {Ext.data.Proxy} The proxy
     */
    getProxy: function() {
        return this.constructor.proxy;
    },
    
    /**
     * Saves the model instance using the configured proxy
     * @param {Object} options Options to pass to the proxy
     * @return {Ext.data.Model} The Model instance
     */
    save: function(options) {
        var me     = this,
            action = me.phantom ? 'create' : 'update';
        
        options = options || {};
        
        Ext.apply(options, {
            records: [me],
            action : action
        });
        
        var operation  = new Ext.data.Operation(options),
            successFn  = options.success,
            failureFn  = options.failure,
            callbackFn = options.callback,
            scope      = options.scope,
            record;
        
        var callback = function(operation) {
            record = operation.getRecords()[0];
            
            if (operation.wasSuccessful()) {
                //we need to make sure we've set the updated data here. Ideally this will be redundant once the
                //ModelCache is in place
                me.set(record.data);
                record.dirty = false;

                if (typeof successFn == 'function') {
                    successFn.call(scope, record, operation);
                }
            } else {
                if (typeof failureFn == 'function') {
                    failureFn.call(scope, record, operation);
                }
            }
            
            if (typeof callbackFn == 'function') {
                callbackFn.call(scope, record, operation);
            }
        };
        
        me.getProxy()[action](operation, callback, me);
        
        return me;
    },
    
    /**
     * Returns the unique ID allocated to this model instance as defined by {@link #idProperty}
     * @return {Number} The id
     */
    getId: function() {
        return this.get(this.idProperty);
    },
    
    /**
     * Sets the model instance's id field to the given id
     * @param {Number} id The new id
     */
    setId: function(id) {
        this.set(this.idProperty, id);
    },
    
    /**
     * Tells this model instance that it has been added to a store
     * @param {Ext.data.Store} store The store that the model has been added to
     */
    join : function(store) {
        /**
         * The {@link Ext.data.Store} to which this Record belongs.
         * @property store
         * @type {Ext.data.Store}
         */
        this.store = store;
    },
    
    /**
     * Tells this model instance that it has been removed from the store
     * @param {Ext.data.Store} store The store to unjoin
     */
    unjoin: function(store) {
        delete this.store;
    },
    
    /**
     * @private
     * If this Model instance has been {@link #join joined} to a {@link Ext.data.Store store}, the store's
     * afterEdit method is called
     */
    afterEdit : function() {
        this.callStore('afterEdit');
    },
    
    /**
     * @private
     * If this Model instance has been {@link #join joined} to a {@link Ext.data.Store store}, the store's
     * afterReject method is called
     */
    afterReject : function() {
        this.callStore("afterReject");
    },
    
    /**
     * @private
     * If this Model instance has been {@link #join joined} to a {@link Ext.data.Store store}, the store's
     * afterCommit method is called
     */
    afterCommit: function() {
        this.callStore('afterCommit');
    },
    
    /**
     * @private
     * Helper function used by afterEdit, afterReject and afterCommit. Calls the given method on the 
     * {@link Ext.data.Store store} that this instance has {@link #join joined}, if any. The store function
     * will always be called with the model instance as its single argument.
     * @param {String} fn The function to call on the store
     */
    callStore: function(fn) {
        var store = this.store;
        
        if (store != undefined && typeof store[fn] == "function") {
            store[fn](this);
        }
    }
});

Ext.apply(Ext.data.Model, {
    /**
     * Sets the Proxy to use for this model. Accepts any options that can be accepted by {@link Ext.data.ProxyMgr#create}
     * @param {String/Object/Ext.data.Proxy} proxy The proxy
     */
    setProxy: function(proxy) {
        //make sure we have an Ext.data.Proxy object
        proxy = Ext.data.ProxyMgr.create(proxy);
        
        proxy.setModel(this);
        this.proxy = proxy;
        
        return proxy;
    },
    
    /**
     * <b>Static</b>. Asynchronously loads a model instance by id. Sample usage:
<pre><code>
MyApp.User = Ext.regModel('User', {
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'}
    ]
});

MyApp.User.load(10, {
    scope: this,
    failure: function(record, operation) {
        //do something if the load failed
    },
    success: function(record, operation) {
        //do something if the load succeeded
    },
    callback: function(record, operation) {
        //do something whether the load succeeded or failed
    }
});
</code></pre>
     * @param {Number} id The id of the model to load
     * @param {Object} config Optional config object containing success, failure and callback functions, plus optional scope
     * @member Ext.data.Model
     * @method load
     * @static
     */
    load: function(id, config) {
        config = Ext.applyIf(config || {}, {
            action: 'read',
            id    : id
        });
        
        var operation  = new Ext.data.Operation(config),
            callbackFn = config.callback,
            successFn  = config.success,
            failureFn  = config.failure,
            scope      = config.scope,
            record, callback;
        
        callback = function(operation) {
            record = operation.getRecords()[0];
            
            if (operation.wasSuccessful()) {
                if (typeof successFn == 'function') {
                    successFn.call(scope, record, operation);
                }
            } else {
                if (typeof failureFn == 'function') {
                    failureFn.call(scope, record, operation);
                }
            }
            
            if (typeof callbackFn == 'function') {
                callbackFn.call(scope, record, operation);
            }
        };
        
        this.proxy.read(operation, callback, this);
    }
});

/**
 * Generates a sequential id. This method is typically called when a record is {@link #create}d
 * and {@link #Record no id has been specified}. The returned id takes the form:
 * <tt>&#123;PREFIX}-&#123;AUTO_ID}</tt>.<div class="mdetail-params"><ul>
 * <li><b><tt>PREFIX</tt></b> : String<p class="sub-desc"><tt>Ext.data.Model.PREFIX</tt>
 * (defaults to <tt>'ext-record'</tt>)</p></li>
 * <li><b><tt>AUTO_ID</tt></b> : String<p class="sub-desc"><tt>Ext.data.Model.AUTO_ID</tt>
 * (defaults to <tt>1</tt> initially)</p></li>
 * </ul></div>
 * @param {Record} rec The record being created.  The record does not exist, it's a {@link #phantom}.
 * @return {String} auto-generated string id, <tt>"ext-record-i++'</tt>;
 */
Ext.data.Model.id = function(rec) {
    rec.phantom = true;
    return [Ext.data.Model.PREFIX, '-', Ext.data.Model.AUTO_ID++].join('');
};


//[deprecated 5.0]
Ext.ns('Ext.data.Record');

//Backwards compat
Ext.data.Record.id = Ext.data.Model.id;
//[end]

Ext.data.Model.PREFIX = 'ext-record';
Ext.data.Model.AUTO_ID = 1;
Ext.data.Model.EDIT = 'edit';
Ext.data.Model.REJECT = 'reject';
Ext.data.Model.COMMIT = 'commit';

/**
 * @author Ed Spencer
 * @class Ext.data.Association
 * @extends Object
 * 
 * <p>Associations enable you to express relationships between different {@link Ext.data.Model Models}. Let's say we're
 * writing an ecommerce system where Users can make Orders - there's a relationship between these Models that we can
 * express like this:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: ['id', 'name', 'email'],

    hasMany: {model: 'Order', name: 'orders'}
});

Ext.regModel('Order', {
    fields: ['id', 'user_id', 'status', 'price'],

    belongsTo: 'User'
});
</code></pre>
 * 
 * <p>We've set up two models - User and Order - and told them about each other. You can set up as many associations on
 * each Model as you need using the two default types - {@link Ext.data.HasManyAssociation hasMany} and 
 * {@link Ext.data.BelongsToAssociation belongsTo}. There's much more detail on the usage of each of those inside their
 * documentation pages. If you're not familiar with Models already, {@link Ext.data.Model there is plenty on those too}.</p>
 * 
 * <p><u>Further Reading</u></p>
 * 
 * <ul style="list-style-type: disc; padding-left: 20px;">
 *   <li>{@link Ext.data.HasManyAssociation hasMany associations}
 *   <li>{@link Ext.data.BelongsToAssociation belongsTo associations}
 *   <li>{@link Ext.data.Model using Models}
 * </ul>
 * 
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.Association = Ext.extend(Object, {
    /**
     * @cfg {String} ownerModel The string name of the model that owns the association. Required
     */
    
    /**
     * @cfg {String} associatedModel The string name of the model that is being associated with. Required
     */
    
    /**
     * @cfg {String} primaryKey The name of the primary key on the associated model. Defaults to 'id'
     */
    primaryKey: 'id',
    
    constructor: function(config) {
        Ext.apply(this, config);
        
        var types           = Ext.ModelMgr.types,
            ownerName       = config.ownerModel,
            associatedName  = config.associatedModel,
            ownerModel      = types[ownerName],
            associatedModel = types[associatedName],
            ownerProto;
        
        if (ownerModel == undefined) {
            throw new Error("The configured ownerModel was not valid (you tried " + ownerName + ")");
        }
        
        if (associatedModel == undefined) {
            throw new Error("The configured associatedModel was not valid (you tried " + associatedName + ")");
        }
        
        this.ownerModel = ownerModel;
        this.associatedModel = associatedModel;
        
        /**
         * The name of the model that 'owns' the association
         * @property ownerName
         * @type String
         */
        
        /**
         * The name of the model is on the other end of the association (e.g. if a User model hasMany Orders, this is 'Order')
         * @property associatedName
         * @type String
         */
        
        Ext.applyIf(this, {
            ownerName : ownerName,
            associatedName: associatedName
        });
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.HasManyAssociation
 * @extends Ext.data.Association
 * 
 * <p>Represents a one-to-many relationship between two models. Usually created indirectly via a model definition:</p>
 * 
<pre><code>
Ext.regModel('Product', {
    fields: [
        {name: 'id',      type: 'int'},
        {name: 'user_id', type: 'int'},
        {name: 'name',    type: 'string'}
    ]
});

Ext.regModel('User', {
    fields: [
        {name: 'id',   type: 'int'},
        {name: 'name', type: 'string'}
    ],
    
    hasMany: {model: 'Product', name: 'products'}
});
</pre></code>
* 
 * <p>Above we created Product and User models, and linked them by saying that a User hasMany Products. This gives
 * us a new function on every User instance, in this case the function is called 'products' because that is the name
 * we specified in the association configuration above.</p>
 * 
 * <p>This new function returns a specialized {@link Ext.data.Store Store} which is automatically filtered to load
 * only Products for the given model instance:</p>
 * 
<pre><code>
//first, we load up a User with id of 1
var user = Ext.ModelMgr.create({id: 1, name: 'Ed'}, 'User');

//the user.products function was created automatically by the association and returns a {@link Ext.data.Store Store}
//the created store is automatically scoped to the set of Products for the User with id of 1
var products = user.products();

//we still have all of the usual Store functions, for example it's easy to add a Product for this User
products.add({
    name: 'Another Product'
});

//saves the changes to the store - this automatically sets the new Product's user_id to 1 before saving
products.sync();
</code></pre>
 * 
 * <p>The new Store is only instantiated the first time you call products() to conserve memory and processing time,
 * though calling products() a second time returns the same store instance.</p>
 * 
 * <p><u>Custom filtering</u></p>
 * 
 * <p>The Store is automatically furnished with a filter - by default this filter tells the store to only return
 * records where the associated model's foreign key matches the owner model's primary key. For example, if a User
 * with ID = 100 hasMany Products, the filter loads only Products with user_id == 100.</p>
 * 
 * <p>Sometimes we want to filter by another field - for example in the case of a Twitter search application we may
 * have models for Search and Tweet:</p>
 * 
<pre><code>
var Search = Ext.regModel('Search', {
    fields: [
        'id', 'query'
    ],

    hasMany: {
        model: 'Tweet',
        name : 'tweets',
        filterProperty: 'query'
    }
});

Ext.regModel('Tweet', {
    fields: [
        'id', 'text', 'from_user'
    ]
});

//returns a Store filtered by the filterProperty
var store = new Search({query: 'Sencha Touch'}).tweets();
</code></pre>
 * 
 * <p>The tweets association above is filtered by the query property by setting the {@link #filterProperty}, and is
 * equivalent to this:</p>
 * 
<pre><code>
var store = new Ext.data.Store({
    model: 'Tweet',
    filters: [
        {
            property: 'query',
            value   : 'Sencha Touch'
        }
    ]
});
</code></pre>
 */
Ext.data.HasManyAssociation = Ext.extend(Ext.data.Association, {
    /**
     * @cfg {String} foreignKey The name of the foreign key on the associated model that links it to the owner
     * model. Defaults to the lowercased name of the owner model plus "_id", e.g. an association with a where a
     * model called Group hasMany Users would create 'group_id' as the foreign key.
     */
    
    /**
     * @cfg {String} name The name of the function to create on the owner model. Required
     */
    
    /**
     * @cfg {Object} storeConfig Optional configuration object that will be passed to the generated Store. Defaults to 
     * undefined.
     */
    
    /**
     * @cfg {String} filterProperty Optionally overrides the default filter that is set up on the associated Store. If
     * this is not set, a filter is automatically created which filters the association based on the configured 
     * {@link #foreignKey}. See intro docs for more details. Defaults to undefined
     */
    
    constructor: function(config) {
        Ext.data.HasManyAssociation.superclass.constructor.apply(this, arguments);
        
        var ownerProto = this.ownerModel.prototype,
            name       = this.name;
        
        Ext.applyIf(this, {
            storeName : name + "Store",
            foreignKey: this.ownerName.toLowerCase() + "_id"
        });
        
        ownerProto[name] = this.createStore();
    },
    
    /**
     * @private
     * Creates a function that returns an Ext.data.Store which is configured to load a set of data filtered
     * by the owner model's primary key - e.g. in a hasMany association where Group hasMany Users, this function
     * returns a Store configured to return the filtered set of a single Group's Users.
     * @return {Function} The store-generating function
     */
    createStore: function() {
        var associatedModel = this.associatedModel,
            storeName       = this.storeName,
            foreignKey      = this.foreignKey,
            primaryKey      = this.primaryKey,
            filterProperty  = this.filterProperty,
            storeConfig     = this.storeConfig || {};
        
        return function() {
            var me = this,
                config, filter,
                modelDefaults = {};
                
            if (me[storeName] == undefined) {
                if (filterProperty) {
                    filter = {
                        property  : filterProperty,
                        value     : me.get(filterProperty),
                        exactMatch: true
                    };
                } else {
                    filter = {
                        property  : foreignKey,
                        value     : me.get(primaryKey),
                        exactMatch: true
                    };
                }
                
                modelDefaults[foreignKey] = me.get(primaryKey);
                
                config = Ext.apply({}, storeConfig, {
                    model        : associatedModel,
                    filters      : [filter],
                    remoteFilter : false,
                    modelDefaults: modelDefaults
                });
                
                me[storeName] = new Ext.data.Store(config);
            }
            
            return me[storeName];
        };
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.BelongsToAssociation
 * @extends Ext.data.Association
 * 
 * <p>Represents a many to one association with another model. The owner model is expected to have
 * a foreign key which references the primary key of the associated model:</p>
 * 
<pre><code>
var Category = Ext.regModel('Category', {
    fields: [
        {name: 'id',   type: 'int'},
        {name: 'name', type: 'string'}
    ]
});

var Product = Ext.regModel('Product', {
    fields: [
        {name: 'id',          type: 'int'},
        {name: 'category_id', type: 'int'},
        {name: 'name',        type: 'string'}
    ],

    associations: [
        {type: 'belongsTo', model: 'Category'}
    ]
});
</code></pre>
 * <p>In the example above we have created models for Products and Categories, and linked them together
 * by saying that each Product belongs to a Category. This automatically links each Product to a Category
 * based on the Product's category_id, and provides new functions on the Product model:</p>
 * 
 * <p><u>Generated getter function</u></p>
 * 
 * <p>The first function that is added to the owner model is a getter function:</p>
 * 
<pre><code>
var product = new Product({
    id: 100,
    category_id: 20,
    name: 'Sneakers'
});

product.getCategory(function(category, operation) {
    //do something with the category object
    alert(category.get('id')); //alerts 20
}, this);
</code></pre>
* 
 * <p>The getCategory function was created on the Product model when we defined the association. This uses the
 * Category's configured {@link Ext.data.Proxy proxy} to load the Category asynchronously, calling the provided
 * callback when it has loaded.</p>
 * 
 * <p>The new getCategory function will also accept an object containing success, failure and callback properties
 * - callback will always be called, success will only be called if the associated model was loaded successfully
 * and failure will only be called if the associatied model could not be loaded:</p>
 * 
<pre><code>
product.getCategory({
    callback: function(category, operation) {}, //a function that will always be called
    success : function(category, operation) {}, //a function that will only be called if the load succeeded
    failure : function(category, operation) {}, //a function that will only be called if the load did not succeed
    scope   : this //optionally pass in a scope object to execute the callbacks in
});
</code></pre>
 * 
 * <p>In each case above the callbacks are called with two arguments - the associated model instance and the 
 * {@link Ext.data.Operation operation} object that was executed to load that instance. The Operation object is
 * useful when the instance could not be loaded.</p>
 * 
 * <p><u>Generated setter function</u></p>
 * 
 * <p>The second generated function sets the associated model instance - if only a single argument is passed to
 * the setter then the following two calls are identical:</p>
 * 
<pre><code>
//this call
product.setCategory(10);

//is equivalent to this call:
product.set('category_id', 10);
</code></pre>
 * <p>If we pass in a second argument, the model will be automatically saved and the second argument passed to
 * the owner model's {@link Ext.data.Model#save save} method:</p>
<pre><code>
product.setCategory(10, function(product, operation) {
    //the product has been saved
    alert(product.get('category_id')); //now alerts 10
});

//alternative syntax:
product.setCategory(10, {
    callback: function(product, operation), //a function that will always be called
    success : function(product, operation), //a function that will only be called if the load succeeded
    failure : function(product, operation), //a function that will only be called if the load did not succeed
    scope   : this //optionally pass in a scope object to execute the callbacks in
})
</code></pre>
* 
 * <p><u>Customisation</u></p>
 * 
 * <p>Associations reflect on the models they are linking to automatically set up properties such as the
 * {@link #primaryKey} and {@link #foreignKey}. These can alternatively be specified:</p>
 * 
<pre><code>
var Product = Ext.regModel('Product', {
    fields: [...],

    associations: [
        {type: 'belongsTo', model: 'Category', primaryKey: 'unique_id', foreignKey: 'cat_id'}
    ]
});
 </code></pre>
 * 
 * <p>Here we replaced the default primary key (defaults to 'id') and foreign key (calculated as 'category_id')
 * with our own settings. Usually this will not be needed.</p>
 */
Ext.data.BelongsToAssociation = Ext.extend(Ext.data.Association, {
    /**
     * @cfg {String} foreignKey The name of the foreign key on the owner model that links it to the associated
     * model. Defaults to the lowercased name of the associated model plus "_id", e.g. an association with a
     * model called Product would set up a product_id foreign key.
     */
    
    /**
     * @cfg {String} getterName The name of the getter function that will be added to the local model's prototype. 
     * Defaults to 'get' + the name of the foreign model, e.g. getCategory
     */

    /**
     * @cfg {String} setterName The name of the setter function that will be added to the local model's prototype.
     * Defaults to 'set' + the name of the foreign model, e.g. setCategory
     */
    
    constructor: function(config) {
        Ext.data.BelongsToAssociation.superclass.constructor.apply(this, arguments);
        
        var me             = this,
            ownerProto     = me.ownerModel.prototype,
            associatedName = me.associatedName,
            getterName     = me.getterName || 'get' + associatedName,
            setterName     = me.setterName || 'set' + associatedName;

        Ext.applyIf(me, {
            name        : associatedName,
            foreignKey  : associatedName.toLowerCase() + "_id",
            instanceName: associatedName + 'BelongsToInstance'
        });
        
        ownerProto[getterName] = me.createGetter();
        ownerProto[setterName] = me.createSetter();
    },
    
    /**
     * @private
     * Returns a setter function to be placed on the owner model's prototype
     * @return {Function} The setter function
     */
    createSetter: function() {
        var me              = this,
            ownerModel      = me.ownerModel,
            associatedModel = me.associatedModel,
            foreignKey      = me.foreignKey,
            primaryKey      = me.primaryKey;
        
        //'this' refers to the Model instance inside this function
        return function(value, options, scope) {
            this.set(foreignKey, value);
            
            if (typeof options == 'function') {
                options = {
                    callback: options,
                    scope: scope || this
                };
            }
            
            if (Ext.isObject(options)) {
                return this.save(options);
            }
        };
    },
    
    /**
     * @private
     * Returns a getter function to be placed on the owner model's prototype. We cache the loaded instance
     * the first time it is loaded so that subsequent calls to the getter always receive the same reference.
     * @return {Function} The getter function
     */
    createGetter: function() {
        var me              = this,
            ownerModel      = me.ownerModel,
            associatedName  = me.associatedName,
            associatedModel = me.associatedModel,
            foreignKey      = me.foreignKey,
            primaryKey      = me.primaryKey,
            instanceName    = me.instanceName;
        
        //'this' refers to the Model instance inside this function
        return function(options, scope) {
            options = options || {};
            
            var foreignKeyId = this.get(foreignKey),
                instance, callbackFn;
                
            if (this[instanceName] == undefined) {
                instance = Ext.ModelMgr.create({}, associatedName);
                instance.set(primaryKey, foreignKeyId);

                if (typeof options == 'function') {
                    options = {
                        callback: options,
                        scope: scope || this
                    };
                }
                
                associatedModel.load(foreignKeyId, options);
            } else {
                instance = this[instanceName];
                
                //TODO: We're duplicating the callback invokation code that the instance.load() call above
                //makes here - ought to be able to normalize this - perhaps by caching at the Model.load layer
                //instead of the association layer.
                if (typeof options == 'function') {
                    options.call(scope || this, instance);
                }
                
                if (options.success) {
                    options.success.call(scope || this, instance);
                }
                
                if (options.callback) {
                    options.callback.call(scope || this, instance);
                }
                
                return instance;
            }
        };
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.PolymorphicAssociation
 * @extends Ext.data.Association
 * @ignore
 */
Ext.data.PolymorphicAssociation = Ext.extend(Ext.data.Association, {

    constructor: function(config) {
        Ext.data.PolymorphicAssociation.superclass.constructor.call(this, config);
        
        var ownerProto = this.ownerModel.prototype,
            name       = this.name;
        
        Ext.applyIf(this, {
            associationIdField: this.ownerName.toLowerCase() + "_id"
        });
        
        ownerProto[name] = this.createStore();
    },

    /**
     * @private
     * Creates the association function that will be injected on the ownerModel. Most of what this is doing
     * is filtering the dataset down to the appropriate model/id combination, and adding modelDefaults to
     * any model instances that are created/inserted into the generated store.
     * @return {Function} The store-generating function
     */
    createStore: function() {
        var association           = this,
            ownerName             = this.ownerName,
            storeName             = this.name + "Store",
            associatedModel       = this.associatedModel,
            primaryKey            = this.primaryKey,
            associationIdField    = 'associated_id',
            associationModelField = 'associated_model';
        
        return function() {
            var me = this,
                modelDefaults = {},
                config, filters;
                
            if (me[storeName] == undefined) {
                filters = [
                    {
                        property  : associationIdField,
                        value     : me.get(primaryKey),
                        exactMatch: true
                    },
                    {
                        property  : associationModelField,
                        value     : ownerName,
                        exactMatch: true
                    }
                ];
                
                modelDefaults[associationIdField] = me.get(primaryKey);
                modelDefaults[associationModelField] = ownerName;
                
                config = Ext.apply({}, association.storeConfig || {}, {
                    model        : associatedModel,
                    filters      : filters,
                    remoteFilter : false,
                    modelDefaults: modelDefaults
                });
                
                me[storeName] = new Ext.data.Store(config);
            }
            
            return me[storeName];
        };
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.validations
 * @extends Object
 * 
 * <p>This singleton contains a set of validation functions that can be used to validate any type
 * of data. They are most often used in {@link Ext.data.Model Models}, where they are automatically
 * set up and executed.</p>
 */
Ext.data.validations = {
    
    /**
     * The default error message used when a presence validation fails
     * @property presenceMessage
     * @type String
     */
    presenceMessage: 'must be present',
    
    /**
     * The default error message used when a length validation fails
     * @property lengthMessage
     * @type String
     */
    lengthMessage: 'is the wrong length',
    
    /**
     * The default error message used when a format validation fails
     * @property formatMessage
     * @type Boolean
     */
    formatMessage: 'is the wrong format',
    
    /**
     * The default error message used when an inclusion validation fails
     * @property inclusionMessage
     * @type String
     */
    inclusionMessage: 'is not included in the list of acceptable values',
    
    /**
     * The default error message used when an exclusion validation fails
     * @property exclusionMessage
     * @type String
     */
    exclusionMessage: 'is not an acceptable value',
    
    /**
     * Validates that the given value is present
     * @param {Object} config Optional config object
     * @param {Mixed} value The value to validate
     * @return {Boolean} True if validation passed
     */
    presence: function(config, value) {
        if (value == undefined) {
            value = config;
        }
        
        return !!value;
    },
    
    /**
     * Returns true if the given value is between the configured min and max values
     * @param {Object} config Optional config object
     * @param {String} value The value to validate
     * @return {Boolean} True if the value passes validation
     */
    length: function(config, value) {
        if (value == undefined) {
            return false;
        }
        
        var length = value.length,
            min    = config.min,
            max    = config.max;
        
        if ((min && length < min) || (max && length > max)) {
            return false;
        } else {
            return true;
        }
    },
    
    /**
     * Returns true if the given value passes validation against the configured {@link #matcher} regex
     * @param {Object} config Optional config object
     * @param {String} value The value to validate
     * @return {Boolean} True if the value passes the format validation
     */
    format: function(config, value) {
        return !!(config.matcher && config.matcher.test(value));
    },
    
    /**
     * Validates that the given value is present in the configured {@link #list}
     * @param {String} value The value to validate
     * @return {Boolean} True if the value is present in the list
     */
    inclusion: function(config, value) {
        return config.list && config.list.indexOf(value) != -1;
    },
    
    /**
     * Validates that the given value is present in the configured {@link #list}
     * @param {Object} config Optional config object
     * @param {String} value The value to validate
     * @return {Boolean} True if the value is not present in the list
     */
    exclusion: function(config, value) {
        return config.list && config.list.indexOf(value) == -1;
    }
};
/**
 * @author Ed Spencer
 * @class Ext.data.Errors
 * @extends Ext.util.MixedCollection
 * 
 * <p>Wraps a collection of validation error responses and provides convenient functions for
 * accessing and errors for specific fields.</p>
 * 
 * <p>Usually this class does not need to be instantiated directly - instances are instead created
 * automatically when {@link Ext.data.Model#validate validate} on a model instance:</p>
 * 
<pre><code>
//validate some existing model instance - in this case it returned 2 failures messages
var errors = myModel.validate();

errors.isValid(); //false

errors.length; //2
errors.getByField('name');  // [{field: 'name',  error: 'must be present'}]
errors.getByField('title'); // [{field: 'title', error: 'is too short'}]
</code></pre>
 */
Ext.data.Errors = Ext.extend(Ext.util.MixedCollection, {
    /**
     * Returns true if there are no errors in the collection
     * @return {Boolean} 
     */
    isValid: function() {
        return this.length == 0;
    },
    
    /**
     * Returns all of the errors for the given field
     * @param {String} fieldName The field to get errors for
     * @return {Array} All errors for the given field
     */
    getByField: function(fieldName) {
        var errors = [],
            error, field, i;
            
        for (i = 0; i < this.length; i++) {
            error = this.items[i];
            
            if (error.field == fieldName) {
                errors.push(error);
            }
        }
        
        return errors;
    }
});

/**
 * @author Ed Spencer
 * @class Ext.data.Field
 * @extends Object
 * 
 * <p>Fields are used to define what a Model is. They aren't instantiated directly - instead, {@link Ext#regModel} 
 * creates a Field instance for each field configured in a {@link Ext.data.Model Model}. For example, we might set up a
 * model like this:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: [
        'name', 'email',
        {name: 'age', type: 'int'},
        {name: 'gender', type: 'string', defaultValue: 'Unknown'}
    ]
});
</code></pre>
 * 
 * <p>Four fields will have been created for the User Model - name, email, age and gender. Note that we specified a
 * couple of different formats here; if we only pass in the string name of the field (as with name and email), the
 * field is set up with the 'auto' type. It's as if we'd done this instead:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: [
        {name: 'name', type: 'auto'},
        {name: 'email', type: 'auto'},
        {name: 'age', type: 'int'},
        {name: 'gender', type: 'string', defaultValue: 'Unknown'}
    ]
});
</code></pre>
 * 
 * <p><u>Types and conversion</u></p>
 * 
 * <p>The {@link #type} is important - it's used to automatically convert data passed to the field into the correct
 * format. In our example above, the name and email fields used the 'auto' type and will just accept anything that is
 * passed into them. The 'age' field had an 'int' type however, so if we passed 25.4 this would be rounded to 25.</p>
 * 
 * <p>Sometimes a simple type isn't enough, or we want to perform some processing when we load a Field's data. We can
 * do this using a {@link #convert} function. Here, we're going to create a new field based on another:</p>
 * 
<code><pre>
Ext.regModel('User', {
    fields: [
        'name', 'email',
        {name: 'age', type: 'int'},
        {name: 'gender', type: 'string', defaultValue: 'Unknown'},

        {
            name: 'firstName',
            convert: function(value, record) {
                var fullName  = record.get('name'),
                    splits    = fullName.split(" "),
                    firstName = splits[0];

                return firstName;
            }
        }
    ]
});
</code></pre>
 * 
 * <p>Now when we create a new User, the firstName is populated automatically based on the name:</p>
 * 
<code><pre>
var ed = Ext.ModelMgr.create({name: 'Ed Spencer'}, 'User');

console.log(ed.get('firstName')); //logs 'Ed', based on our convert function
</code></pre>
 * 
 * <p>In fact, if we log out all of the data inside ed, we'll see this:</p>
 * 
<code><pre>
console.log(ed.data);

//outputs this:
{
    age: 0,
    email: "",
    firstName: "Ed",
    gender: "Unknown",
    name: "Ed Spencer"
}
</code></pre>
 * 
 * <p>The age field has been given a default of zero because we made it an int type. As an auto field, email has
 * defaulted to an empty string. When we registered the User model we set gender's {@link #defaultValue} to 'Unknown'
 * so we see that now. Let's correct that and satisfy ourselves that the types work as we expect:</p>
 * 
<code><pre>
ed.set('gender', 'Male');
ed.get('gender'); //returns 'Male'

ed.set('age', 25.4);
ed.get('age'); //returns 25 - we wanted an int, not a float, so no decimal places allowed
</code></pre>
 * 
 */
Ext.data.Field = Ext.extend(Object, {
    
    constructor : function(config) {
        if (Ext.isString(config)) {
            config = {name: config};
        }
        Ext.apply(this, config);
        
        var types = Ext.data.Types,
            st = this.sortType,
            t;

        if (this.type) {
            if (Ext.isString(this.type)) {
                this.type = types[this.type.toUpperCase()] || types.AUTO;
            }
        } else {
            this.type = types.AUTO;
        }

        // named sortTypes are supported, here we look them up
        if (Ext.isString(st)) {
            this.sortType = Ext.data.SortTypes[st];
        } else if(Ext.isEmpty(st)) {
            this.sortType = this.type.sortType;
        }

        if (!this.convert) {
            this.convert = this.type.convert;
        }
    },
    
    /**
     * @cfg {String} name
     * The name by which the field is referenced within the Model. This is referenced by, for example,
     * the <code>dataIndex</code> property in column definition objects passed to {@link Ext.grid.ColumnModel}.
     * <p>Note: In the simplest case, if no properties other than <code>name</code> are required, a field
     * definition may consist of just a String for the field name.</p>
     */
    
    /**
     * @cfg {Mixed} type
     * (Optional) The data type for automatic conversion from received data to the <i>stored</i> value if <code>{@link Ext.data.Field#convert convert}</code>
     * has not been specified. This may be specified as a string value. Possible values are
     * <div class="mdetail-params"><ul>
     * <li>auto (Default, implies no conversion)</li>
     * <li>string</li>
     * <li>int</li>
     * <li>float</li>
     * <li>boolean</li>
     * <li>date</li></ul></div>
     * <p>This may also be specified by referencing a member of the {@link Ext.data.Types} class.</p>
     * <p>Developers may create their own application-specific data types by defining new members of the
     * {@link Ext.data.Types} class.</p>
     */
    
    /**
     * @cfg {Function} convert
     * (Optional) A function which converts the value provided by the Reader into an object that will be stored
     * in the Model. It is passed the following parameters:<div class="mdetail-params"><ul>
     * <li><b>v</b> : Mixed<div class="sub-desc">The data value as read by the Reader, if undefined will use
     * the configured <code>{@link Ext.data.Field#defaultValue defaultValue}</code>.</div></li>
     * <li><b>rec</b> : Ext.data.Model<div class="sub-desc">The data object containing the Model as read so far by the 
     * Reader. Note that the Model may not be fully populated at this point as the fields are read in the order that 
     * they are defined in your {@link #fields} array.</div></li>
     * </ul></div>
     * <pre><code>
// example of convert function
function fullName(v, record){
    return record.name.last + ', ' + record.name.first;
}

function location(v, record){
    return !record.city ? '' : (record.city + ', ' + record.state);
}

var Dude = Ext.regModel({
    fields: [
        {name: 'fullname',  convert: fullName},
        {name: 'firstname', mapping: 'name.first'},
        {name: 'lastname',  mapping: 'name.last'},
        {name: 'city', defaultValue: 'homeless'},
        'state',
        {name: 'location',  convert: location}
    ]
});

// create the data store
var store = new Ext.data.Store({
    reader: {
        type: 'json',
        model: 'Dude',
        idProperty: 'key',
        root: 'daRoot',
        totalProperty: 'total'
    }
});

var myData = [
    { key: 1,
      name: { first: 'Fat',    last:  'Albert' }
      // notice no city, state provided in data object
    },
    { key: 2,
      name: { first: 'Barney', last:  'Rubble' },
      city: 'Bedrock', state: 'Stoneridge'
    },
    { key: 3,
      name: { first: 'Cliff',  last:  'Claven' },
      city: 'Boston',  state: 'MA'
    }
];
     * </code></pre>
     */
    /**
     * @cfg {String} dateFormat
     * <p>(Optional) Used when converting received data into a Date when the {@link #type} is specified as <code>"date"</code>.</p>
     * <p>A format string for the {@link Date#parseDate Date.parseDate} function, or "timestamp" if the
     * value provided by the Reader is a UNIX timestamp, or "time" if the value provided by the Reader is a
     * javascript millisecond timestamp. See {@link Date}</p>
     */
    dateFormat: null,
    
    /**
     * @cfg {Boolean} useNull
     * <p>(Optional) Use when converting received data into a Number type (either int or float). If the value cannot be parsed,
     * null will be used if useNull is true, otherwise the value will be 0. Defaults to <tt>false</tt>
     */
    useNull: false,
    
    /**
     * @cfg {Mixed} defaultValue
     * (Optional) The default value used <b>when a Model is being created by a {@link Ext.data.Reader Reader}</b>
     * when the item referenced by the <code>{@link Ext.data.Field#mapping mapping}</code> does not exist in the data
     * object (i.e. undefined). (defaults to "")
     */
    defaultValue: "",
    /**
     * @cfg {String/Number} mapping
     * <p>(Optional) A path expression for use by the {@link Ext.data.DataReader} implementation
     * that is creating the {@link Ext.data.Model Model} to extract the Field value from the data object.
     * If the path expression is the same as the field name, the mapping may be omitted.</p>
     * <p>The form of the mapping expression depends on the Reader being used.</p>
     * <div class="mdetail-params"><ul>
     * <li>{@link Ext.data.JsonReader}<div class="sub-desc">The mapping is a string containing the javascript
     * expression to reference the data from an element of the data item's {@link Ext.data.JsonReader#root root} Array. Defaults to the field name.</div></li>
     * <li>{@link Ext.data.XmlReader}<div class="sub-desc">The mapping is an {@link Ext.DomQuery} path to the data
     * item relative to the DOM element that represents the {@link Ext.data.XmlReader#record record}. Defaults to the field name.</div></li>
     * <li>{@link Ext.data.ArrayReader}<div class="sub-desc">The mapping is a number indicating the Array index
     * of the field's value. Defaults to the field specification's Array position.</div></li>
     * </ul></div>
     * <p>If a more complex value extraction strategy is required, then configure the Field with a {@link #convert}
     * function. This is passed the whole row object, and may interrogate it in whatever way is necessary in order to
     * return the desired data.</p>
     */
    mapping: null,
    /**
     * @cfg {Function} sortType
     * (Optional) A function which converts a Field's value to a comparable value in order to ensure
     * correct sort ordering. Predefined functions are provided in {@link Ext.data.SortTypes}. A custom
     * sort example:<pre><code>
// current sort     after sort we want
// +-+------+          +-+------+
// |1|First |          |1|First |
// |2|Last  |          |3|Second|
// |3|Second|          |2|Last  |
// +-+------+          +-+------+

sortType: function(value) {
   switch (value.toLowerCase()) // native toLowerCase():
   {
      case 'first': return 1;
      case 'second': return 2;
      default: return 3;
   }
}
     * </code></pre>
     */
    sortType : null,
    /**
     * @cfg {String} sortDir
     * (Optional) Initial direction to sort (<code>"ASC"</code> or  <code>"DESC"</code>).  Defaults to
     * <code>"ASC"</code>.
     */
    sortDir : "ASC",
    /**
     * @cfg {Boolean} allowBlank
     * @private
     * (Optional) Used for validating a {@link Ext.data.Model model}, defaults to <code>true</code>.
     * An empty value here will cause {@link Ext.data.Model}.{@link Ext.data.Model#isValid isValid}
     * to evaluate to <code>false</code>.
     */
    allowBlank : true
});

/**
 * @class Ext.data.SortTypes
 * @ignore
 * @singleton
 * Defines the default sorting (casting?) comparison functions used when sorting data.
 */
Ext.data.SortTypes = {
    /**
     * Default sort that does nothing
     * @param {Mixed} s The value being converted
     * @return {Mixed} The comparison value
     */
    none : function(s) {
        return s;
    },

    /**
     * The regular expression used to strip tags
     * @type {RegExp}
     * @property
     */
    stripTagsRE : /<\/?[^>]+>/gi,

    /**
     * Strips all HTML tags to sort on text only
     * @param {Mixed} s The value being converted
     * @return {String} The comparison value
     */
    asText : function(s) {
        return String(s).replace(this.stripTagsRE, "");
    },

    /**
     * Strips all HTML tags to sort on text only - Case insensitive
     * @param {Mixed} s The value being converted
     * @return {String} The comparison value
     */
    asUCText : function(s) {
        return String(s).toUpperCase().replace(this.stripTagsRE, "");
    },

    /**
     * Case insensitive string
     * @param {Mixed} s The value being converted
     * @return {String} The comparison value
     */
    asUCString : function(s) {
        return String(s).toUpperCase();
    },

    /**
     * Date sorting
     * @param {Mixed} s The value being converted
     * @return {Number} The comparison value
     */
    asDate : function(s) {
        if(!s){
            return 0;
        }
        if(Ext.isDate(s)){
            return s.getTime();
        }
        return Date.parse(String(s));
    },

    /**
     * Float sorting
     * @param {Mixed} s The value being converted
     * @return {Float} The comparison value
     */
    asFloat : function(s) {
        var val = parseFloat(String(s).replace(/,/g, ""));
        return isNaN(val) ? 0 : val;
    },

    /**
     * Integer sorting
     * @param {Mixed} s The value being converted
     * @return {Number} The comparison value
     */
    asInt : function(s) {
        var val = parseInt(String(s).replace(/,/g, ""), 10);
        return isNaN(val) ? 0 : val;
    }
};
/**
 * @class Ext.data.Types
 * @ignore
 * <p>This is s static class containing the system-supplied data types which may be given to a {@link Ext.data.Field Field}.<p/>
 * <p>The properties in this class are used as type indicators in the {@link Ext.data.Field Field} class, so to
 * test whether a Field is of a certain type, compare the {@link Ext.data.Field#type type} property against properties
 * of this class.</p>
 * <p>Developers may add their own application-specific data types to this class. Definition names must be UPPERCASE.
 * each type definition must contain three properties:</p>
 * <div class="mdetail-params"><ul>
 * <li><code>convert</code> : <i>Function</i><div class="sub-desc">A function to convert raw data values from a data block into the data
 * to be stored in the Field. The function is passed the collowing parameters:
 * <div class="mdetail-params"><ul>
 * <li><b>v</b> : Mixed<div class="sub-desc">The data value as read by the Reader, if undefined will use
 * the configured <tt>{@link Ext.data.Field#defaultValue defaultValue}</tt>.</div></li>
 * <li><b>rec</b> : Mixed<div class="sub-desc">The data object containing the row as read by the Reader.
 * Depending on the Reader type, this could be an Array ({@link Ext.data.ArrayReader ArrayReader}), an object
 * ({@link Ext.data.JsonReader JsonReader}), or an XML element ({@link Ext.data.XMLReader XMLReader}).</div></li>
 * </ul></div></div></li>
 * <li><code>sortType</code> : <i>Function</i> <div class="sub-desc">A function to convert the stored data into comparable form, as defined by {@link Ext.data.SortTypes}.</div></li>
 * <li><code>type</code> : <i>String</i> <div class="sub-desc">A textual data type name.</div></li>
 * </ul></div>
 * <p>For example, to create a VELatLong field (See the Microsoft Bing Mapping API) containing the latitude/longitude value of a datapoint on a map from a JsonReader data block
 * which contained the properties <code>lat</code> and <code>long</code>, you would define a new data type like this:</p>
 *<pre><code>
// Add a new Field data type which stores a VELatLong object in the Record.
Ext.data.Types.VELATLONG = {
    convert: function(v, data) {
        return new VELatLong(data.lat, data.long);
    },
    sortType: function(v) {
        return v.Latitude;  // When sorting, order by latitude
    },
    type: 'VELatLong'
};
</code></pre>
 * <p>Then, when declaring a Record, use <pre><code>
var types = Ext.data.Types; // allow shorthand type access
UnitRecord = Ext.data.Record.create([
    { name: 'unitName', mapping: 'UnitName' },
    { name: 'curSpeed', mapping: 'CurSpeed', type: types.INT },
    { name: 'latitude', mapping: 'lat', type: types.FLOAT },
    { name: 'latitude', mapping: 'lat', type: types.FLOAT },
    { name: 'position', type: types.VELATLONG }
]);
</code></pre>
 * @singleton
 */
Ext.data.Types = new function() {
    var st = Ext.data.SortTypes;
    
    Ext.apply(this, {
        /**
         * @type Regexp
         * @property stripRe
         * A regular expression for stripping non-numeric characters from a numeric value. Defaults to <tt>/[\$,%]/g</tt>.
         * This should be overridden for localization.
         */
        stripRe: /[\$,%]/g,
        
        /**
         * @type Object.
         * @property AUTO
         * This data type means that no conversion is applied to the raw data before it is placed into a Record.
         */
        AUTO: {
            convert: function(v) {
                return v;
            },
            sortType: st.none,
            type: 'auto'
        },

        /**
         * @type Object.
         * @property STRING
         * This data type means that the raw data is converted into a String before it is placed into a Record.
         */
        STRING: {
            convert: function(v) {
                return (v === undefined || v === null) ? '' : String(v);
            },
            sortType: st.asUCString,
            type: 'string'
        },

        /**
         * @type Object.
         * @property INT
         * This data type means that the raw data is converted into an integer before it is placed into a Record.
         * <p>The synonym <code>INTEGER</code> is equivalent.</p>
         */
        INT: {
            convert: function(v) {
                return v !== undefined && v !== null && v !== '' ?
                    parseInt(String(v).replace(Ext.data.Types.stripRe, ''), 10) : (this.useNull ? null : 0);
            },
            sortType: st.none,
            type: 'int'
        },
        
        /**
         * @type Object.
         * @property FLOAT
         * This data type means that the raw data is converted into a number before it is placed into a Record.
         * <p>The synonym <code>NUMBER</code> is equivalent.</p>
         */
        FLOAT: {
            convert: function(v) {
                return v !== undefined && v !== null && v !== '' ?
                    parseFloat(String(v).replace(Ext.data.Types.stripRe, ''), 10) : (this.useNull ? null : 0);
            },
            sortType: st.none,
            type: 'float'
        },
        
        /**
         * @type Object.
         * @property BOOL
         * <p>This data type means that the raw data is converted into a boolean before it is placed into
         * a Record. The string "true" and the number 1 are converted to boolean <code>true</code>.</p>
         * <p>The synonym <code>BOOLEAN</code> is equivalent.</p>
         */
        BOOL: {
            convert: function(v) {
                return v === true || v === 'true' || v == 1;
            },
            sortType: st.none,
            type: 'bool'
        },
        
        /**
         * @type Object.
         * @property DATE
         * This data type means that the raw data is converted into a Date before it is placed into a Record.
         * The date format is specified in the constructor of the {@link Ext.data.Field} to which this type is
         * being applied.
         */
        DATE: {
            convert: function(v) {
                var df = this.dateFormat;
                if (!v) {
                    return null;
                }
                if (Ext.isDate(v)) {
                    return v;
                }
                if (df) {
                    if (df == 'timestamp') {
                        return new Date(v*1000);
                    }
                    if (df == 'time') {
                        return new Date(parseInt(v, 10));
                    }
                    return Date.parseDate(v, df);
                }
                
                var parsed = Date.parse(v);
                return parsed ? new Date(parsed) : null;
            },
            sortType: st.asDate,
            type: 'date'
        }
    });
    
    Ext.apply(this, {
        /**
         * @type Object.
         * @property BOOLEAN
         * <p>This data type means that the raw data is converted into a boolean before it is placed into
         * a Record. The string "true" and the number 1 are converted to boolean <code>true</code>.</p>
         * <p>The synonym <code>BOOL</code> is equivalent.</p>
         */
        BOOLEAN: this.BOOL,
        
        /**
         * @type Object.
         * @property INTEGER
         * This data type means that the raw data is converted into an integer before it is placed into a Record.
         * <p>The synonym <code>INT</code> is equivalent.</p>
         */
        INTEGER: this.INT,
        
        /**
         * @type Object.
         * @property NUMBER
         * This data type means that the raw data is converted into a number before it is placed into a Record.
         * <p>The synonym <code>FLOAT</code> is equivalent.</p>
         */
        NUMBER: this.FLOAT    
    });
};
/**
 * @author Ed Spencer
 * @class Ext.ModelMgr
 * @extends Ext.AbstractManager
 * @singleton
 * 
 * <p>Creates and manages the current set of models</p>
 */
Ext.ModelMgr = new Ext.AbstractManager({
    typeName: 'mtype',
    
    /**
     * The string type of the default Model Proxy. Defaults to 'ajax'
     * @property defaultProxyType
     * @type String
     */
    defaultProxyType: 'ajax',
    
    /**
     * @property associationStack
     * @type Array
     * Private stack of associations that must be created once their associated model has been defined
     */
    associationStack: [],
    
    /**
     * Registers a model definition. All model plugins marked with isDefault: true are bootstrapped
     * immediately, as are any addition plugins defined in the model config.
     */
    registerType: function(name, config) {
        /*
         * This function does a lot. In order, it normalizes the configured associations (see the belongsTo/hasMany if blocks)
         * then looks to see if we are extending another model, in which case it copies all of the fields, validations and 
         * associations from the superclass model. Once we have collected all of these configurations, the actual creation
         * is delegated to createFields and createAssociations. Finally we just link up a few convenience functions on the new model.
         */
        
        var PluginMgr    = Ext.PluginMgr,
            plugins      = PluginMgr.findByType('model', true),
            fields       = config.fields || [],
            associations = config.associations || [],
            belongsTo    = config.belongsTo,
            hasMany      = config.hasMany,
            extendName   = config.extend,
            modelPlugins = config.plugins || [],
            association, model, length, i,
            extendModel, extendModelProto, extendValidations, proxy;
        
        //associations can be specified in the more convenient format (e.g. not inside an 'associations' array).
        //we support that here
        if (belongsTo) {
            if (!Ext.isArray(belongsTo)) {
                belongsTo = [belongsTo];
            }
            
            for (i = 0; i < belongsTo.length; i++) {
                association = belongsTo[i];
                
                if (!Ext.isObject(association)) {
                    association = {model: association};
                }
                Ext.apply(association, {type: 'belongsTo'});
                
                associations.push(association);
            }
            
            delete config.belongsTo;
        }
        
        if (hasMany) {
            if (!Ext.isArray(hasMany)) {
                hasMany = [hasMany];
            }
            
            for (i = 0; i < hasMany.length; i++) {
                association = hasMany[i];
                
                if (!Ext.isObject(association)) {
                    association = {model: association};
                }
                
                Ext.apply(association, {type: 'hasMany'});
                
                associations.push(association);
            }
            
            delete config.hasMany;
        }
        
        //if we're extending another model, inject its fields, associations and validations
        if (extendName) {
            extendModel       = this.types[extendName];
            extendModelProto  = extendModel.prototype;
            extendValidations = extendModelProto.validations;
            
            proxy              = extendModel.proxy;
            fields             = extendModelProto.fields.items.concat(fields);
            associations       = extendModelProto.associations.items.concat(associations);
            config.validations = extendValidations ? extendValidations.concat(config.validations) : config.validations;
        } else {
            extendModel = Ext.data.Model;
            proxy = config.proxy;
        }
        
        model = Ext.extend(extendModel, config);
        
        for (i = 0, length = modelPlugins.length; i < length; i++) {
            plugins.push(PluginMgr.create(modelPlugins[i]));
        }
        
        this.types[name] = model;
        
        Ext.override(model, {
            plugins     : plugins,
            fields      : this.createFields(fields),
            associations: this.createAssociations(associations, name)
        });
        
        model.modelName = name;
        Ext.data.Model.setProxy.call(model, proxy || this.defaultProxyType);
        model.getProxy = model.prototype.getProxy;
        
        model.load = function() {
            Ext.data.Model.load.apply(this, arguments);
        };
        
        for (i = 0, length = plugins.length; i < length; i++) {
            plugins[i].bootstrap(model, config);
        }
        
        model.defined = true;
        this.onModelDefined(model);
        
        return model;
    },
    
    /**
     * @private
     * Private callback called whenever a model has just been defined. This sets up any associations
     * that were waiting for the given model to be defined
     * @param {Function} model The model that was just created
     */
    onModelDefined: function(model) {
        var stack  = this.associationStack,
            length = stack.length,
            create = [],
            association, i;
        
        for (i = 0; i < length; i++) {
            association = stack[i];
            
            if (association.associatedModel == model.modelName) {
                create.push(association);
            }
        }
        
        length = create.length;
        for (i = 0; i < length; i++) {
            this.addAssociation(create[i], this.types[create[i].ownerModel].prototype.associations);
            stack.remove(create[i]);
        }
    },
    
    /**
     * @private
     * Creates and returns a MixedCollection representing the associations on a model
     * @param {Array} associations The array of Association configs
     * @param {String} name The string name of the owner model
     * @return {Ext.util.MixedCollection} The Mixed Collection
     */
    createAssociations: function(associations, name) {
        var length = associations.length,
            i, associationsMC, association;
        
        associationsMC = new Ext.util.MixedCollection(false, function(association) {
            return association.name;
        });
        
        for (i = 0; i < length; i++) {
            association = associations[i];
            Ext.apply(association, {
                ownerModel: name,
                associatedModel: association.model
            });
            
            if (this.types[association.model] == undefined) {
                this.associationStack.push(association);
            } else {
                this.addAssociation(association, associationsMC);
            }
        }
        
        return associationsMC;
    },
    
    /**
     * @private
     * Creates an Association based on config and the supplied MixedCollection. TODO: this will
     * probably need to be refactored into a more elegant solution - it was initially pulled out
     * to support deferred Association creation when the associated model has not been defined yet.
     */
    addAssociation: function(association, associationsMC) {
        var type = association.type;
        
        if (type == 'belongsTo') {
            associationsMC.add(new Ext.data.BelongsToAssociation(association));
        }
        
        if (type == 'hasMany') {
            associationsMC.add(new Ext.data.HasManyAssociation(association));
        }
        
        if (type == 'polymorphic') {
            associationsMC.add(new Ext.data.PolymorphicAssociation(association));
        }
    },
    
    /**
     * @private
     * Creates and returns a MixedCollection representing the fields in a model
     * @param {Array} fields The array of field configurations
     * @return {Ext.util.MixedCollection} The Mixed Collection
     */
    createFields: function(fields) {
        var length = fields.length,
            i, fieldsMC;
        
        fieldsMC = new Ext.util.MixedCollection(false, function(field) {
            return field.name;
        });
        
        for (i = 0; i < length; i++) {
            fieldsMC.add(new Ext.data.Field(fields[i]));
        }
        
        return fieldsMC;
    },
    
    /**
     * Returns the {@link Ext.data.Model} for a given model name
     * @param {String/Object} id The id of the model or the model instance.
     */
    getModel: function(id) {
        var model = id;
        if (typeof model == 'string') {
            model = this.types[model];
        }
        return model;
    },
    
    /**
     * Creates a new instance of a Model using the given data.
     * @param {Object} data Data to initialize the Model's fields with
     * @param {String} name The name of the model to create
     * @param {Number} id Optional unique id of the Model instance (see {@link Ext.data.Model})
     */
    create: function(config, name, id) {
        var con = typeof name == 'function' ? name : this.types[name || config.name];
        
        return new con(config, id);
    }
});

/**
 * Shorthand for {@link Ext.ModelMgr#registerType}
 * Creates a new Model class from the specified config object. See {@link Ext.data.Model} for full examples.
 * 
 * @param {Object} config A configuration object for the Model you wish to create.
 * @return {Ext.data.Model} The newly registered Model
 * @member Ext
 * @method regModel
 */
Ext.regModel = function() {
    return Ext.ModelMgr.registerType.apply(Ext.ModelMgr, arguments);
};
/**
 * @author Ed Spencer
 * @class Ext.data.Operation
 * @extends Object
 * 
 * <p>Represents a single read or write operation performed by a {@link Ext.data.Proxy Proxy}.
 * Operation objects are used to enable communication between Stores and Proxies. Application
 * developers should rarely need to interact with Operation objects directly.</p>
 * 
 * <p>Several Operations can be batched together in a {@link Ext.data.Batch batch}.</p>
 * 
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.Operation = Ext.extend(Object, {
    /**
     * @cfg {Boolean} synchronous True if this Operation is to be executed synchronously (defaults to true). This
     * property is inspected by a {@link Ext.data.Batch Batch} to see if a series of Operations can be executed in
     * parallel or not.
     */
    synchronous: true,
    
    /**
     * @cfg {String} action The action being performed by this Operation. Should be one of 'create', 'read', 'update' or 'destroy'
     */
    action: undefined,
    
    /**
     * @cfg {Array} filters Optional array of filter objects. Only applies to 'read' actions.
     */
    filters: undefined,
    
    /**
     * @cfg {Array} sorters Optional array of sorter objects. Only applies to 'read' actions.
     */
    sorters: undefined,
    
    /**
     * @cfg {Object} group Optional grouping configuration. Only applies to 'read' actions where grouping is desired.
     */
    group: undefined,
    
    /**
     * @cfg {Number} start The start index (offset), used in paging when running a 'read' action.
     */
    start: undefined,
    
    /**
     * @cfg {Number} limit The number of records to load. Used on 'read' actions when paging is being used.
     */
    limit: undefined,
    
    /**
     * @cfg {Ext.data.Batch} batch The batch that this Operation is a part of (optional)
     */
    batch: undefined,
        
    /**
     * Read-only property tracking the start status of this Operation. Use {@link #isStarted}.
     * @property started
     * @type Boolean
     * @private
     */
    started: false,
    
    /**
     * Read-only property tracking the run status of this Operation. Use {@link #isRunning}.
     * @property running
     * @type Boolean
     * @private
     */
    running: false,
    
    /**
     * Read-only property tracking the completion status of this Operation. Use {@link #isComplete}.
     * @property complete
     * @type Boolean
     * @private
     */
    complete: false,
    
    /**
     * Read-only property tracking whether the Operation was successful or not. This starts as undefined and is set to true
     * or false by the Proxy that is executing the Operation. It is also set to false by {@link #setException}. Use
     * {@link #wasSuccessful} to query success status.
     * @property success
     * @type Boolean
     * @private
     */
    success: undefined,
    
    /**
     * Read-only property tracking the exception status of this Operation. Use {@link #hasException} and see {@link #getError}.
     * @property exception
     * @type Boolean
     * @private
     */
    exception: false,
    
    /**
     * The error object passed when {@link #setException} was called. This could be any object or primitive.
     * @property error
     * @type Mixed
     * @private
     */
    error: undefined,
    
    constructor: function(config) {
        Ext.apply(this, config || {});
    },
    
    /**
     * Marks the Operation as started
     */
    setStarted: function() {
        this.started = true;
        this.running = true;
    },
    
    /**
     * Marks the Operation as completed
     */
    setCompleted: function() {
        this.complete = true;
        this.running  = false;
    },
    
    /**
     * Marks the Operation as successful
     */
    setSuccessful: function() {
        this.success = true;
    },
    
    /**
     * Marks the Operation as having experienced an exception. Can be supplied with an option error message/object.
     * @param {Mixed} error Optional error string/object
     */
    setException: function(error) {
        this.exception = true;
        this.success = false;
        this.running = false;
        this.error = error;
    },
    
    /**
     * @private
     */
    markStarted: function() {
        console.warn("Operation: markStarted has been deprecated. Please use setStarted");
        return this.setStarted();
    },
    
    /**
     * @private
     */
    markCompleted: function() {
        console.warn("Operation: markCompleted has been deprecated. Please use setCompleted");
        return this.setCompleted();
    },
    
    /**
     * @private
     */
    markSuccessful: function() {
        console.warn("Operation: markSuccessful has been deprecated. Please use setSuccessful");
        return this.setSuccessful();
    },
    
    /**
     * @private
     */
    markException: function() {
        console.warn("Operation: markException has been deprecated. Please use setException");
        return this.setException();
    },
    
    /**
     * Returns true if this Operation encountered an exception (see also {@link #getError})
     * @return {Boolean} True if there was an exception
     */
    hasException: function() {
        return this.exception === true;
    },
    
    /**
     * Returns the error string or object that was set using {@link #setException}
     * @return {Mixed} The error object
     */
    getError: function() {
        return this.error;
    },
    
    /**
     * Returns an array of Ext.data.Model instances as set by the Proxy.
     * @return {Array} Any loaded Records
     */
    getRecords: function() {
        var resultSet = this.getResultSet();
        
        return (resultSet == undefined ? this.records : resultSet.records);
    },
    
    /**
     * Returns the ResultSet object (if set by the Proxy). This object will contain the {@link Ext.data.Model model} instances
     * as well as meta data such as number of instances fetched, number available etc
     * @return {Ext.data.ResultSet} The ResultSet object
     */
    getResultSet: function() {
        return this.resultSet;
    },
    
    /**
     * Returns true if the Operation has been started. Note that the Operation may have started AND completed,
     * see {@link #isRunning} to test if the Operation is currently running.
     * @return {Boolean} True if the Operation has started
     */
    isStarted: function() {
        return this.started === true;
    },
    
    /**
     * Returns true if the Operation has been started but has not yet completed.
     * @return {Boolean} True if the Operation is currently running
     */
    isRunning: function() {
        return this.running === true;
    },
    
    /**
     * Returns true if the Operation has been completed
     * @return {Boolean} True if the Operation is complete
     */
    isComplete: function() {
        return this.complete === true;
    },
    
    /**
     * Returns true if the Operation has completed and was successful
     * @return {Boolean} True if successful
     */
    wasSuccessful: function() {
        return this.isComplete() && this.success === true;
    },
    
    /**
     * @private
     * Associates this Operation with a Batch
     * @param {Ext.data.Batch} batch The batch
     */
    setBatch: function(batch) {
        this.batch = batch;
    },
    
    /**
     * Checks whether this operation should cause writing to occur.
     * @return {Boolean} Whether the operation should cause a write to occur.
     */
    allowWrite: function() {
        return this.action != 'read';
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.ProxyMgr
 * @extends Ext.AbstractManager
 * @singleton
 * @ignore
 */
Ext.data.ProxyMgr = new Ext.AbstractManager({
    create: function(config) {
        if (config == undefined || typeof config == 'string') {
            config = {
                type: config
            };
        }

        if (!(config instanceof Ext.data.Proxy)) {
            Ext.applyIf(config, {
                type : this.defaultProxyType,
                model: this.model
            });

            var type = config[this.typeName] || config.type,
                Constructor = this.types[type];

            if (Constructor == undefined) {
                throw new Error(Ext.util.Format.format("The '{0}' type has not been registered with this manager", type));
            }

            return new Constructor(config);
        } else {
            return config;
        }
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.ReaderMgr
 * @extends Ext.AbstractManager
 * @singleton
 * @ignore
 * 
 * <p>Maintains the set of all registered {@link Ext.data.Reader Reader} types.</p>
 */
Ext.data.ReaderMgr = new Ext.AbstractManager({
    typeName: 'rtype'
});
/**
 * @author Ed Spencer
 * @class Ext.data.Request
 * @extends Object
 * 
 * <p>Simple class that represents a Request that will be made by any {@link Ext.data.ServerProxy} subclass.
 * All this class does is standardize the representation of a Request as used by any ServerProxy subclass,
 * it does not contain any actual logic or perform the request itself.</p>
 * 
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.Request = Ext.extend(Object, {
    /**
     * @cfg {String} action The name of the action this Request represents. Usually one of 'create', 'read', 'update' or 'destroy'
     */
    action: undefined,
    
    /**
     * @cfg {Object} params HTTP request params. The Proxy and its Writer have access to and can modify this object.
     */
    params: undefined,
    
    /**
     * @cfg {String} method The HTTP method to use on this Request (defaults to 'GET'). Should be one of 'GET', 'POST', 'PUT' or 'DELETE'
     */
    method: 'GET',
    
    /**
     * @cfg {String} url The url to access on this Request
     */
    url: undefined,

    constructor: function(config) {
        Ext.apply(this, config);
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.ResultSet
 * @extends Object
 * 
 * <p>Simple wrapper class that represents a set of records returned by a Proxy.</p>
 * 
 * @constructor
 * Creates the new ResultSet
 */
Ext.data.ResultSet = Ext.extend(Object, {
    /**
     * @cfg {Boolean} loaded
     * True if the records have already been loaded. This is only meaningful when dealing with
     * SQL-backed proxies
     */
    loaded: true,
    
    /**
     * @cfg {Number} count
     * The number of records in this ResultSet. Note that total may differ from this number
     */
    count: 0,
    
    /**
     * @cfg {Number} total
     * The total number of records reported by the data source. This ResultSet may form a subset of
     * those records (see count)
     */
    total: 0,
    
    /**
     * @cfg {Boolean} success
     * True if the ResultSet loaded successfully, false if any errors were encountered
     */
    success: false,
    
    /**
     * @cfg {Array} records The array of record instances. Required
     */

    constructor: function(config) {
        Ext.apply(this, config);
        
        /**
         * DEPRECATED - will be removed in Ext JS 5.0. This is just a copy of this.total - use that instead
         * @property totalRecords
         * @type Mixed
         */
        this.totalRecords = this.total;
        
        if (config.count == undefined) {
            this.count = this.records.length;
        }
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.AbstractStore
 * @extends Ext.util.Observable
 *
 * <p>AbstractStore is a superclass of {@link Ext.data.Store} and {@link Ext.data.TreeStore}. It's never used directly,
 * but offers a set of methods used by both of those subclasses.</p>
 * 
 * <p>We've left it here in the docs for reference purposes, but unless you need to make a whole new type of Store, what
 * you're probably looking for is {@link Ext.data.Store}. If you're still interested, here's a brief description of what 
 * AbstractStore is and is not.</p>
 * 
 * <p>AbstractStore provides the basic configuration for anything that can be considered a Store. It expects to be 
 * given a {@link Ext.data.Model Model} that represents the type of data in the Store. It also expects to be given a 
 * {@link Ext.data.Proxy Proxy} that handles the loading of data into the Store.</p>
 * 
 * <p>AbstractStore provides a few helpful methods such as {@link #load} and {@link #sync}, which load and save data
 * respectively, passing the requests through the configured {@link #proxy}. Both built-in Store subclasses add extra
 * behavior to each of these functions. Note also that each AbstractStore subclass has its own way of storing data - 
 * in {@link Ext.data.Store} the data is saved as a flat {@link Ext.data.MixedCollection MixedCollection}, whereas in
 * {@link Ext.data.TreeStore TreeStore} we use a {@link Ext.data.Tree} to maintain the data's hierarchy.</p>
 * 
 * <p>Finally, AbstractStore provides an API for sorting and filtering data via its {@link #sorters} and {@link #filters}
 * {@link Ext.data.MixedCollection MixedCollections}. Although this functionality is provided by AbstractStore, there's a
 * good description of how to use it in the introduction of {@link Ext.data.Store}.
 * 
 */
Ext.data.AbstractStore = Ext.extend(Ext.util.Observable, {
    remoteSort  : false,
    remoteFilter: false,

    /**
     * @cfg {String/Ext.data.Proxy/Object} proxy The Proxy to use for this Store. This can be either a string, a config
     * object or a Proxy instance - see {@link #setProxy} for details.
     */

    /**
     * @cfg {Boolean/Object} autoLoad If data is not specified, and if autoLoad is true or an Object, this store's load method
     * is automatically called after creation. If the value of autoLoad is an Object, this Object will be passed to the store's
     * load method. Defaults to false.
     */
    autoLoad: false,

    /**
     * @cfg {Boolean} autoSave True to automatically sync the Store with its Proxy after every edit to one of its Records.
     * Defaults to false.
     */
    autoSave: false,

    /**
     * Sets the updating behavior based on batch synchronization. 'operation' (the default) will update the Store's
     * internal representation of the data after each operation of the batch has completed, 'complete' will wait until
     * the entire batch has been completed before updating the Store's data. 'complete' is a good choice for local
     * storage proxies, 'operation' is better for remote proxies, where there is a comparatively high latency.
     * @property batchUpdateMode
     * @type String
     */
    batchUpdateMode: 'operation',

    /**
     * If true, any filters attached to this Store will be run after loading data, before the datachanged event is fired.
     * Defaults to true, ignored if {@link #remoteFilter} is true
     * @property filterOnLoad
     * @type Boolean
     */
    filterOnLoad: true,

    /**
     * If true, any sorters attached to this Store will be run after loading data, before the datachanged event is fired.
     * Defaults to true, igored if {@link #remoteSort} is true
     * @property sortOnLoad
     * @type Boolean
     */
    sortOnLoad: true,

    /**
     * The default sort direction to use if one is not specified (defaults to "ASC")
     * @property defaultSortDirection
     * @type String
     */
    defaultSortDirection: "ASC",

    /**
     * True if a model was created implicitly for this Store. This happens if a fields array is passed to the Store's constructor
     * instead of a model constructor or name.
     * @property implicitModel
     * @type Boolean
     * @private
     */
    implicitModel: false,

    /**
     * The string type of the Proxy to create if none is specified. This defaults to creating a {@link Ext.data.MemoryProxy memory proxy}.
     * @property defaultProxyType
     * @type String
     */
    defaultProxyType: 'memory',

    /**
     * True if the Store has already been destroyed via {@link #destroyStore}. If this is true, the reference to Store should be deleted
     * as it will not function correctly any more.
     * @property isDestroyed
     * @type Boolean
     */
    isDestroyed: false,

    isStore: true,

    /**
     * @cfg {String} storeId Optional unique identifier for this store. If present, this Store will be registered with 
     * the {@link Ext.StoreMgr}, making it easy to reuse elsewhere. Defaults to undefined.
     */

    //documented above
    constructor: function(config) {
        this.addEvents(
            /**
             * @event add
             * Fired when a Model instance has been added to this Store
             * @param {Ext.data.Store} store The store
             * @param {Array} records The Model instances that were added
             * @param {Number} index The index at which the instances were inserted
             */
            'add',

            /**
             * @event remove
             * Fired when a Model instance has been removed from this Store
             * @param {Ext.data.Store} store The Store object
             * @param {Ext.data.Model} record The record that was removed
             * @param {Number} index The index of the record that was removed
             */
            'remove',
            
            /**
             * @event update
             * Fires when a Record has been updated
             * @param {Store} this
             * @param {Ext.data.Model} record The Model instance that was updated
             * @param {String} operation The update operation being performed. Value may be one of:
             * <pre><code>
               Ext.data.Model.EDIT
               Ext.data.Model.REJECT
               Ext.data.Model.COMMIT
             * </code></pre>
             */
            'update',

            /**
             * @event datachanged
             * Fires whenever the records in the Store have changed in some way - this could include adding or removing records,
             * or updating the data in existing records
             * @param {Ext.data.Store} this The data store
             */
            'datachanged',

            /**
             * @event beforeload
             * Event description
             * @param {Ext.data.Store} store This Store
             * @param {Ext.data.Operation} operation The Ext.data.Operation object that will be passed to the Proxy to load the Store
             */
            'beforeload',

            /**
             * @event load
             * Fires whenever the store reads data from a remote data source.
             * @param {Ext.data.store} this
             * @param {Array} records An array of records
             * @param {Boolean} successful True if the operation was successful.
             */
            'load',

            /**
             * @event beforesync
             * Called before a call to {@link #sync} is executed. Return false from any listener to cancel the synv
             * @param {Object} options Hash of all records to be synchronized, broken down into create, update and destroy
             */
            'beforesync'
        );
        
        Ext.apply(this, config);

        /**
         * Temporary cache in which removed model instances are kept until successfully synchronised with a Proxy,
         * at which point this is cleared.
         * @private
         * @property removed
         * @type Array
         */
        this.removed = [];

        /**
         * Stores the current sort direction ('ASC' or 'DESC') for each field. Used internally to manage the toggling
         * of sort direction per field. Read only
         * @property sortToggle
         * @type Object
         */
        this.sortToggle = {};

        Ext.data.AbstractStore.superclass.constructor.apply(this, arguments);

        this.model = Ext.ModelMgr.getModel(config.model);
        
        /**
         * @property modelDefaults
         * @type Object
         * @private
         * A set of default values to be applied to every model instance added via {@link #insert} or created via {@link #create}.
         * This is used internally by associations to set foreign keys and other fields. See the Association classes source code
         * for examples. This should not need to be used by application developers.
         */
        Ext.applyIf(this, {
            modelDefaults: {}
        });

        //Supports the 3.x style of simply passing an array of fields to the store, implicitly creating a model
        if (!this.model && config.fields) {
            this.model = Ext.regModel('ImplicitModel-' + this.storeId || Ext.id(), {
                fields: config.fields
            });

            delete this.fields;

            this.implicitModel = true;
        }

        //ensures that the Proxy is instantiated correctly
        this.setProxy(config.proxy || this.model.proxy);

        if (this.id && !this.storeId) {
            this.storeId = this.id;
            delete this.id;
        }

        if (this.storeId) {
            Ext.StoreMgr.register(this);
        }
        
        /**
         * The collection of {@link Ext.util.Sorter Sorters} currently applied to this Store. 
         * @property sorters
         * @type Ext.util.MixedCollection
         */
        this.sorters = new Ext.util.MixedCollection();
        this.sorters.addAll(this.decodeSorters(config.sorters));
        
        /**
         * The collection of {@link Ext.util.Filter Filters} currently applied to this Store
         * @property filters
         * @type Ext.util.MixedCollection
         */
        this.filters = new Ext.util.MixedCollection();
        this.filters.addAll(this.decodeFilters(config.filters));
    },


    /**
     * Sets the Store's Proxy by string, config object or Proxy instance
     * @param {String|Object|Ext.data.Proxy} proxy The new Proxy, which can be either a type string, a configuration object
     * or an Ext.data.Proxy instance
     * @return {Ext.data.Proxy} The attached Proxy object
     */
    setProxy: function(proxy) {
        if (proxy instanceof Ext.data.Proxy) {
            proxy.setModel(this.model);
        } else {
            Ext.applyIf(proxy, {
                model: this.model
            });
            
            proxy = Ext.data.ProxyMgr.create(proxy);
        }
        
        this.proxy = proxy;
        
        return this.proxy;
    },

    /**
     * Returns the proxy currently attached to this proxy instance
     * @return {Ext.data.Proxy} The Proxy instance
     */
    getProxy: function() {
        return this.proxy;
    },

    //saves any phantom records
    create: function(data, options) {
        var instance = Ext.ModelMgr.create(Ext.applyIf(data, this.modelDefaults), this.model.modelName),
            operation;
        
        options = options || {};

        Ext.applyIf(options, {
            action : 'create',
            records: [instance]
        });

        operation = new Ext.data.Operation(options);

        this.proxy.create(operation, this.onProxyWrite, this);
        
        return instance;
    },

    read: function() {
        return this.load.apply(this, arguments);
    },

    onProxyRead: Ext.emptyFn,

    update: function(options) {
        options = options || {};

        Ext.applyIf(options, {
            action : 'update',
            records: this.getUpdatedRecords()
        });

        var operation = new Ext.data.Operation(options);

        return this.proxy.update(operation, this.onProxyWrite, this);
    },

    onProxyWrite: Ext.emptyFn,


    //tells the attached proxy to destroy the given records
    destroy: function(options) {
        options = options || {};

        Ext.applyIf(options, {
            action : 'destroy',
            records: this.getRemovedRecords()
        });

        var operation = new Ext.data.Operation(options);

        return this.proxy.destroy(operation, this.onProxyWrite, this);
    },

    /**
     * @private
     * Attached as the 'operationcomplete' event listener to a proxy's Batch object. By default just calls through
     * to onProxyWrite.
     */
    onBatchOperationComplete: function(batch, operation) {
        return this.onProxyWrite(operation);
    },

    /**
     * @private
     * Attached as the 'complete' event listener to a proxy's Batch object. Iterates over the batch operations
     * and updates the Store's internal data MixedCollection.
     */
    onBatchComplete: function(batch, operation) {
        var operations = batch.operations,
            length = operations.length,
            i;

        this.suspendEvents();

        for (i = 0; i < length; i++) {
            this.onProxyWrite(operations[i]);
        }

        this.resumeEvents();

        this.fireEvent('datachanged', this);
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
     * Filter function for new records.
     */
    filterNew: function(item) {
        return item.phantom == true || item.needsAdd == true;
    },

    /**
     * Returns all Model instances that are either currently a phantom (e.g. have no id), or have an ID but have not
     * yet been saved on this Store (this happens when adding a non-phantom record from another Store into this one)
     * @return {Array} The Model instances
     */
    getNewRecords: function() {
        return [];
    },

    /**
     * Returns all Model instances that have been updated in the Store but not yet synchronized with the Proxy
     * @return {Array} The updated Model instances
     */
    getUpdatedRecords: function() {
        return [];
    },

    /**
     * @private
     * Filter function for dirty records.
     */
    filterDirty: function(item) {
        return item.dirty == true;
    },

    //returns any records that have been removed from the store but not yet destroyed on the proxy
    getRemovedRecords: function() {
        return this.removed;
    },


    sort: function(sorters, direction) {

    },

    /**
     * @private
     * Normalizes an array of sorter objects, ensuring that they are all Ext.util.Sorter instances
     * @param {Array} sorters The sorters array
     * @return {Array} Array of Ext.util.Sorter objects
     */
    decodeSorters: function(sorters) {
        if (!Ext.isArray(sorters)) {
            if (sorters == undefined) {
                sorters = [];
            } else {
                sorters = [sorters];
            }
        }

        var length = sorters.length,
            Sorter = Ext.util.Sorter,
            config, i;

        for (i = 0; i < length; i++) {
            config = sorters[i];

            if (!(config instanceof Sorter)) {
                if (Ext.isString(config)) {
                    config = {
                        property: config
                    };
                }
                
                Ext.applyIf(config, {
                    root     : 'data',
                    direction: "ASC"
                });

                //support for 3.x style sorters where a function can be defined as 'fn'
                if (config.fn) {
                    config.sorterFn = config.fn;
                }

                //support a function to be passed as a sorter definition
                if (typeof config == 'function') {
                    config = {
                        sorterFn: config
                    };
                }

                sorters[i] = new Sorter(config);
            }
        }

        return sorters;
    },

    filter: function(filters, value) {

    },

    /**
     * @private
     * Creates and returns a function which sorts an array by the given field and direction
     * @param {String} field The field to create the sorter for
     * @param {String} direction The direction to sort by (defaults to "ASC")
     * @return {Function} A function which sorts by the field/direction combination provided
     */
    createSortFunction: function(field, direction) {
        direction = direction || "ASC";
        var directionModifier = direction.toUpperCase() == "DESC" ? -1 : 1;

        var fields   = this.model.prototype.fields,
            sortType = fields.get(field).sortType;

        //create a comparison function. Takes 2 records, returns 1 if record 1 is greater,
        //-1 if record 2 is greater or 0 if they are equal
        return function(r1, r2) {
            var v1 = sortType(r1.data[field]),
                v2 = sortType(r2.data[field]);

            return directionModifier * (v1 > v2 ? 1 : (v1 < v2 ? -1 : 0));
        };
    },

    /**
     * @private
     * Normalizes an array of filter objects, ensuring that they are all Ext.util.Filter instances
     * @param {Array} filters The filters array
     * @return {Array} Array of Ext.util.Filter objects
     */
    decodeFilters: function(filters) {
        if (!Ext.isArray(filters)) {
            if (filters == undefined) {
                filters = [];
            } else {
                filters = [filters];
            }
        }

        var length = filters.length,
            Filter = Ext.util.Filter,
            config, i;

        for (i = 0; i < length; i++) {
            config = filters[i];

            if (!(config instanceof Filter)) {
                Ext.apply(config, {
                    root: 'data'
                });

                //support for 3.x style filters where a function can be defined as 'fn'
                if (config.fn) {
                    config.filterFn = config.fn;
                }

                //support a function to be passed as a filter definition
                if (typeof config == 'function') {
                    config = {
                        filterFn: config
                    };
                }

                filters[i] = new Filter(config);
            }
        }

        return filters;
    },

    clearFilter: function(supressEvent) {

    },

    isFiltered: function() {

    },

    filterBy: function(fn, scope) {

    },


    /**
     * Synchronizes the Store with its Proxy. This asks the Proxy to batch together any new, updated
     * and deleted records in the store, updating the Store's internal representation of the records
     * as each operation completes.
     */
    sync: function() {
        var me        = this,
            options   = {},
            toCreate  = me.getNewRecords(),
            toUpdate  = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        if (toCreate.length > 0) {
            options.create = toCreate;
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            options.update = toUpdate;
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            options.destroy = toDestroy;
            needsSync = true;
        }

        if (needsSync && me.fireEvent('beforesync', options) !== false) {
            me.proxy.batch(options, me.getBatchListeners());
        }
    },


    /**
     * @private
     * Returns an object which is passed in as the listeners argument to proxy.batch inside this.sync.
     * This is broken out into a separate function to allow for customisation of the listeners
     * @return {Object} The listeners object
     */
    getBatchListeners: function() {
        var listeners = {
            scope: this,
            exception: this.onBatchException
        };

        if (this.batchUpdateMode == 'operation') {
            listeners['operationcomplete'] = this.onBatchOperationComplete;
        } else {
            listeners['complete'] = this.onBatchComplete;
        }

        return listeners;
    },

    //deprecated, will be removed in 5.0
    save: function() {
        return this.sync.apply(this, arguments);
    },

    /**
     * Loads the Store using its configured {@link #proxy}.
     * @param {Object} options Optional config object. This is passed into the {@link Ext.data.Operation Operation}
     * object that is created and then sent to the proxy's {@link Ext.data.Proxy#read} function
     */
    load: function(options) {
        var me = this,
            operation;

        options = options || {};

        Ext.applyIf(options, {
            action : 'read',
            filters: me.filters.items,
            sorters: me.sorters.items
        });

        operation = new Ext.data.Operation(options);

        if (me.fireEvent('beforeload', me, operation) !== false) {
            me.loading = true;
            me.proxy.read(operation, me.onProxyLoad, me);
        }
        
        return me;
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to.
     * @param {Ext.data.Model} record The model instance that was edited
     */
    afterEdit : function(record) {
        this.fireEvent('update', this, record, Ext.data.Model.EDIT);
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to..
     * @param {Ext.data.Model} record The model instance that was edited
     */
    afterReject : function(record) {
        this.fireEvent('update', this, record, Ext.data.Model.REJECT);
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to.
     * @param {Ext.data.Model} record The model instance that was edited
     */
    afterCommit : function(record) {
        if (this.autoSave) {
            this.sync();
        }

        this.fireEvent('update', this, record, Ext.data.Model.COMMIT);
    },

    clearData: Ext.emptyFn,

    destroyStore: function() {
        if (!this.isDestroyed) {
            if (this.storeId) {
                Ext.StoreMgr.unregister(this);
            }
            this.clearData();
            this.data = null;
            this.tree = null;
            // Ext.destroy(this.proxy);
            this.reader = this.writer = null;
            this.clearListeners();
            this.isDestroyed = true;

            if (this.implicitModel) {
                Ext.destroy(this.model);
            }
        }
    },

    /**
     * Returns an object describing the current sort state of this Store.
     * @return {Object} The sort state of the Store. An object with two properties:<ul>
     * <li><b>field : String<p class="sub-desc">The name of the field by which the Records are sorted.</p></li>
     * <li><b>direction : String<p class="sub-desc">The sort order, 'ASC' or 'DESC' (case-sensitive).</p></li>
     * </ul>
     * See <tt>{@link #sortInfo}</tt> for additional details.
     */
    getSortState : function() {
        return this.sortInfo;
    },

    getCount: function() {

    },

    getById: function(id) {

    },

    // individual substores should implement a "fast" remove
    // and fire a clear event afterwards
    removeAll: function() {

    }
});

/**
 * @author Ed Spencer
 * @class Ext.data.Store
 * @extends Ext.data.AbstractStore
 *
 * <p>The Store class encapsulates a client side cache of {@link Ext.data.Model Model} objects. Stores load
 * data via a {@link Ext.data.Proxy Proxy}, and also provide functions for {@link #sort sorting},
 * {@link #filter filtering} and querying the {@link Ext.data.Model model} instances contained within it.</p>
 *
 * <p>Creating a Store is easy - we just tell it the Model and the Proxy to use to load and save its data:</p>
 *
<pre><code>
// Set up a {@link Ext.data.Model model} to use in our Store
Ext.regModel('User', {
    fields: [
        {name: 'firstName', type: 'string'},
        {name: 'lastName',  type: 'string'},
        {name: 'age',       type: 'int'},
        {name: 'eyeColor',  type: 'string'}
    ]
});

var myStore = new Ext.data.Store({
    model: 'User',
    proxy: {
        type: 'ajax',
        url : '/users.json',
        reader: {
            type: 'json',
            root: 'users'
        }
    },
    autoLoad: true
});
</code></pre>

 * <p>In the example above we configured an AJAX proxy to load data from the url '/users.json'. We told our Proxy
 * to use a {@link Ext.data.JsonReader JsonReader} to parse the response from the server into Model object -
 * {@link Ext.data.JsonReader see the docs on JsonReader} for details.</p>
 * 
 * <p><u>Inline data</u></p>
 * 
 * <p>Stores can also load data inline. Internally, Store converts each of the objects we pass in as {@link #data}
 * into Model instances:</p>
 * 
<pre><code>
new Ext.data.Store({
    model: 'User',
    data : [
        {firstName: 'Ed',    lastName: 'Spencer'},
        {firstName: 'Tommy', lastName: 'Maintz'},
        {firstName: 'Aaron', lastName: 'Conran'},
        {firstName: 'Jamie', lastName: 'Avins'}
    ]
});
</code></pre>
 *
 * <p>Loading inline data using the method above is great if the data is in the correct format already (e.g. it doesn't need 
 * to be processed by a {@link Ext.data.Reader reader}). If your inline data requires processing to decode the data structure,
 * use a {@link Ext.data.MemoryProxy MemoryProxy} instead (see the {@link Ext.data.MemoryProxy MemoryProxy} docs for an example).</p>
 * 
 * <p>Additional data can also be loaded locally using {@link #add}.</p>
 * 
 * <p><u>Loading Nested Data</u></p>
 * 
 * <p>Applications often need to load sets of associated data - for example a CRM system might load a User and her Orders. 
 * Instead of issuing an AJAX request for the User and a series of additional AJAX requests for each Order, we can load a nested dataset
 * and allow the Reader to automatically populate the associated models. Below is a brief example, see the {@link Ext.data.Reader} intro
 * docs for a full explanation:</p>
 * 
<pre><code>
var store = new Ext.data.Store({
    autoLoad: true,
    model: "User",
    proxy: {
        type: 'ajax',
        url : 'users.json',
        reader: {
            type: 'json',
            root: 'users'
        }
    }
});
</code></pre>
 * 
 * <p>Which would consume a response like this:</p>
 * 
<pre><code>
{
    "users": [
        {
            "id": 1,
            "name": "Ed",
            "orders": [
                {
                    "id": 10,
                    "total": 10.76,
                    "status": "invoiced"
                },
                {
                    "id": 11,
                    "total": 13.45,
                    "status": "shipped"
                }
            ]
        }
    ]
}
</code></pre>
 * 
 * <p>See the {@link Ext.data.Reader} intro docs for a full explanation.</p>
 * 
 * <p><u>Filtering and Sorting</u></p>
 * 
 * <p>Stores can be sorted and filtered - in both cases either remotely or locally. The {@link #sorters} and {@link #filters} are 
 * held inside {@link Ext.util.MixedCollection MixedCollection} instances to make them easy to manage. Usually it is sufficient to
 * either just specify sorters and filters in the Store configuration or call {@link #sort} or {@link #filter}:
 * 
<pre><code>
var store = new Ext.data.Store({
    model: 'User',
    sorters: [
        {
            property : 'age',
            direction: 'DESC'
        },
        {
            property : 'firstName',
            direction: 'ASC'
        }
    ],
    
    filters: [
        {
            property: 'firstName',
            value   : /Ed/
        }
    ]
});
</code></pre>
 * 
 * <p>The new Store will keep the configured sorters and filters in the MixedCollection instances mentioned above. By default, sorting
 * and filtering are both performed locally by the Store - see {@link #remoteSort} and {@link #remoteFilter} to allow the server to 
 * perform these operations instead.</p>
 * 
 * <p>Filtering and sorting after the Store has been instantiated is also easy. Calling {@link #filter} adds another filter to the Store
 * and automatically filters the dataset (calling {@link #filter} with no arguments simply re-applies all existing filters). Note that by
 * default {@link #sortOnFilter} is set to true, which means that your sorters are automatically reapplied if using local sorting.</p>
 * 
<pre><code>
store.filter('eyeColor', 'Brown');
</code></pre>
 * 
 * <p>Change the sorting at any time by calling {@link #sort}:</p>
 * 
<pre><code>
store.sort('height', 'ASC');
</code></pre>
 * 
 * <p>Note that all existing sorters will be removed in favor of the new sorter data (if {@link #sort} is called with no arguments, 
 * the existing sorters are just reapplied instead of being removed). To keep existing sorters and add new ones, just add them
 * to the MixedCollection:</p>
 * 
<pre><code>
store.sorters.add(new Ext.util.Sorter({
    property : 'shoeSize',
    direction: 'ASC'
}));

store.sort();
</code></pre>
 * 
 * <p><u>Registering with StoreMgr</u></p>
 * 
 * <p>Any Store that is instantiated with a {@link #storeId} will automatically be registed with the {@link Ext.StoreMgr StoreMgr}.
 * This makes it easy to reuse the same store in multiple views:</p>
 * 
 <pre><code>
//this store can be used several times
new Ext.data.Store({
    model: 'User',
    storeId: 'usersStore'
});

new Ext.List({
    store: 'usersStore',

    //other config goes here
});

new Ext.DataView({
    store: 'usersStore',

    //other config goes here
});
</code></pre>
 * 
 * <p><u>Further Reading</u></p>
 * 
 * <p>Stores are backed up by an ecosystem of classes that enables their operation. To gain a full understanding of these
 * pieces and how they fit together, see:</p>
 * 
 * <ul style="list-style-type: disc; padding-left: 25px">
 * <li>{@link Ext.data.Proxy Proxy} - overview of what Proxies are and how they are used</li>
 * <li>{@link Ext.data.Model Model} - the core class in the data package</li>
 * <li>{@link Ext.data.Reader Reader} - used by any subclass of {@link Ext.data.ServerProxy ServerProxy} to read a response</li>
 * </ul>
 *
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.Store = Ext.extend(Ext.data.AbstractStore, {
    /**
     * @cfg {Boolean} remoteSort
     * True to defer any sorting operation to the server. If false, sorting is done locally on the client. Defaults to <tt>false</tt>.
     */
    remoteSort: false,

    /**
     * @cfg {Boolean} remoteFilter
     * True to defer any filtering operation to the server. If false, filtering is done locally on the client. Defaults to <tt>false</tt>.
     */
    remoteFilter: false,

    /**
     * @cfg {String/Ext.data.Proxy/Object} proxy The Proxy to use for this Store. This can be either a string, a config
     * object or a Proxy instance - see {@link #setProxy} for details.
     */

    /**
     * @cfg {Array} data Optional array of Model instances or data objects to load locally. See "Inline data" above for details.
     */

    /**
     * The (optional) field by which to group data in the store. Internally, grouping is very similar to sorting - the
     * groupField and {@link #groupDir} are injected as the first sorter (see {@link #sort}). Stores support a single
     * level of grouping, and groups can be fetched via the {@link #getGroups} method.
     * @property groupField
     * @type String
     */
    groupField: undefined,

    /**
     * The direction in which sorting should be applied when grouping. Defaults to "ASC" - the other supported value is "DESC"
     * @property groupDir
     * @type String
     */
    groupDir: "ASC",

    /**
     * The number of records considered to form a 'page'. This is used to power the built-in
     * paging using the nextPage and previousPage functions. Defaults to 25.
     * @property pageSize
     * @type Number
     */
    pageSize: 25,

    /**
     * The page that the Store has most recently loaded (see {@link #loadPage})
     * @property currentPage
     * @type Number
     */
    currentPage: 1,
    
    /**
     * @cfg {Boolean} clearOnPageLoad True to empty the store when loading another page via {@link #loadPage}, 
     * {@link #nextPage} or {@link #previousPage} (defaults to true). Setting to false keeps existing records, allowing
     * large data sets to be loaded one page at a time but rendered all together.
     */
    clearOnPageLoad: true,

    /**
     * True if a model was created implicitly for this Store. This happens if a fields array is passed to the Store's constructor
     * instead of a model constructor or name.
     * @property implicitModel
     * @type Boolean
     * @private
     */
    implicitModel: false,

    /**
     * True if the Store is currently loading via its Proxy
     * @property loading
     * @type Boolean
     * @private
     */
    loading: false,
    
    /**
     * @cfg {Boolean} sortOnFilter For local filtering only, causes {@link #sort} to be called whenever {@link #filter} is called,
     * causing the sorters to be reapplied after filtering. Defaults to true
     */
    sortOnFilter: true,

    isStore: true,

    //documented above
    constructor: function(config) {
        config = config || {};
        
        /**
         * The MixedCollection that holds this store's local cache of records
         * @property data
         * @type Ext.util.MixedCollection
         */
        this.data = new Ext.util.MixedCollection(false, function(record) {
            return record.internalId;
        });

        if (config.data) {
            this.inlineData = config.data;
            delete config.data;
        }

        Ext.data.Store.superclass.constructor.call(this, config);
        
        var proxy = this.proxy,
            data  = this.inlineData;
            
        if (data) {
            if (proxy instanceof Ext.data.MemoryProxy) {
                proxy.data = data;
                this.read();
            } else {
                this.add.apply(this, data);
            }
            
            this.sort();
            delete this.inlineData;
        } else if (this.autoLoad) {
            Ext.defer(this.load, 10, this, [typeof this.autoLoad == 'object' ? this.autoLoad : undefined]);
            // Remove the defer call, we may need reinstate this at some point, but currently it's not obvious why it's here.
            // this.load(typeof this.autoLoad == 'object' ? this.autoLoad : undefined);
        }
    },

    /**
     * Returns an object containing the result of applying grouping to the records in this store. See {@link #groupField},
     * {@link #groupDir} and {@link #getGroupString}. Example for a store containing records with a color field:
<pre><code>
var myStore = new Ext.data.Store({
    groupField: 'color',
    groupDir  : 'DESC'
});

myStore.getGroups(); //returns:
[
    {
        name: 'yellow',
        children: [
            //all records where the color field is 'yellow'
        ]
    },
    {
        name: 'red',
        children: [
            //all records where the color field is 'red'
        ]
    }
]
</code></pre>
     * @return {Array} The grouped data
     */
    getGroups: function() {
        var records  = this.data.items,
            length   = records.length,
            groups   = [],
            pointers = {},
            record, groupStr, group, i;

        for (i = 0; i < length; i++) {
            record = records[i];
            groupStr = this.getGroupString(record);
            group = pointers[groupStr];

            if (group == undefined) {
                group = {
                    name: groupStr,
                    children: []
                };

                groups.push(group);
                pointers[groupStr] = group;
            }

            group.children.push(record);
        }
        
        return groups;
    },

    /**
     * Returns the string to group on for a given model instance. The default implementation of this method returns the model's
     * {@link #groupField}, but this can be overridden to group by an arbitrary string. For example, to group by the first letter
     * of a model's 'name' field, use the following code:
<pre><code>
new Ext.data.Store({
    groupDir: 'ASC',
    getGroupString: function(instance) {
        return instance.get('name')[0];
    }
});
</code></pre>
     * @param {Ext.data.Model} instance The model instance
     * @return {String} The string to compare when forming groups
     */
    getGroupString: function(instance) {
        return instance.get(this.groupField);
    },
    
    /**
     * Convenience function for getting the first model instance in the store
     * @return {Ext.data.Model/undefined} The first model instance in the store, or undefined
     */
    first: function() {
        return this.data.first();
    },
    
    /**
     * Convenience function for getting the last model instance in the store
     * @return {Ext.data.Model/undefined} The last model instance in the store, or undefined
     */
    last: function() {
        return this.data.last();
    },

    /**
     * Inserts Model instances into the Store at the given index and fires the {@link #add} event.
     * See also <code>{@link #add}</code>.
     * @param {Number} index The start index at which to insert the passed Records.
     * @param {Ext.data.Model[]} records An Array of Ext.data.Model objects to add to the cache.
     */
    insert : function(index, records) {
        var i, record, len;

        records = [].concat(records);
        for (i = 0, len = records.length; i < len; i++) {
            record = this.createModel(records[i]);
            record.set(this.modelDefaults);

            this.data.insert(index + i, record);
            record.join(this);
        }

        if (this.snapshot) {
            this.snapshot.addAll(records);
        }

        this.fireEvent('add', this, records, index);
        this.fireEvent('datachanged', this);
    },

    /**
     * Adds Model instances to the Store by instantiating them based on a JavaScript object. When adding already-
     * instantiated Models, use {@link #insert} instead. The instances will be added at the end of the existing collection.
     * This method accepts either a single argument array of Model instances or any number of model instance arguments.
     * Sample usage:
     * 
<pre><code>
myStore.add({some: 'data'}, {some: 'other data'});
</code></pre>
     * 
     * @param {Object} data The data for each model
     * @return {Array} The array of newly created model instances
     */
    add: function(records) {
        //accept both a single-argument array of records, or any number of record arguments
        if (!Ext.isArray(records)) {
            records = Array.prototype.slice.apply(arguments);
        }
        
        var length  = records.length,
            record, i;

        for (i = 0; i < length; i++) {
            record = this.createModel(records[i]);

            if (record.phantom == false) {
                record.needsAdd = true;
            }
            
            records[i] = record;
        }

        this.insert(this.data.length, records);

        return records;
    },

    /**
     * Converts a literal to a model, if it's not a model already 
     * @private
     * @param record {Ext.data.Model/Object} The record to create
     * @return {Ext.data.Model}
     */
    createModel: function(record) {
        if (!(record instanceof Ext.data.Model)) {
            record = Ext.ModelMgr.create(record, this.model);
        }
        
        return record;
    },

    /**
     * Calls the specified function for each of the {@link Ext.data.Record Records} in the cache.
     * @param {Function} fn The function to call. The {@link Ext.data.Record Record} is passed as the first parameter.
     * Returning <tt>false</tt> aborts and exits the iteration.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed.
     * Defaults to the current {@link Ext.data.Record Record} in the iteration.
     */
    each : function(fn, scope) {
        this.data.each(fn, scope);
    },

    /**
     * Removes the given record from the Store, firing the 'remove' event for each instance that is removed, plus a single
     * 'datachanged' event after removal.
     * @param {Ext.data.Model/Array} records The Ext.data.Model instance or array of instances to remove
     */
    remove: function(records) {
        if (!Ext.isArray(records)) {
            records = [records];
        }

        var length = records.length,
            i, index, record;

        for (i = 0; i < length; i++) {
            record = records[i];
            index = this.data.indexOf(record);

            if (index > -1) {
                this.removed.push(record);

                if (this.snapshot) {
                    this.snapshot.remove(record);
                }

                record.unjoin(this);
                this.data.remove(record);

                this.fireEvent('remove', this, record, index);
            }
        }

        this.fireEvent('datachanged', this);
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
     * <p>Loads data into the Store via the configured {@link #proxy}. This uses the Proxy to make an
     * asynchronous call to whatever storage backend the Proxy uses, automatically adding the retrieved
     * instances into the Store and calling an optional callback if required. Example usage:</p>
     * 
<pre><code>
store.load({
    scope   : this,
    callback: function(records, operation, success) {
        //the {@link Ext.data.Operation operation} object contains all of the details of the load operation
        console.log(records);
    }
});
</code></pre>
     * 
     * <p>If the callback scope does not need to be set, a function can simply be passed:</p>
     * 
<pre><code>
store.load(function(records, operation, success) {
    console.log('loaded records');
});
</code></pre>
     * 
     * @param {Object/Function} options Optional config object, passed into the Ext.data.Operation object before loading.
     */
    load: function(options) {
        options = options || {};
        
        if (Ext.isFunction(options)) {
            options = {
                callback: options
            };
        }
        
        Ext.applyIf(options, {
            group : {field: this.groupField, direction: this.groupDir},
            start : 0,
            limit : this.pageSize,
            addRecords: false
        });
        
        return Ext.data.Store.superclass.load.call(this, options);
    },
    
    /**
     * Returns true if the Store is currently performing a load operation
     * @return {Boolean} True if the Store is currently loading
     */
    isLoading: function() {
        return this.loading;
    },

    /**
     * @private
     * Called internally when a Proxy has completed a load request
     */
    onProxyLoad: function(operation) {
        var records = operation.getRecords();
        
        this.loadRecords(records, operation.addRecords);
        this.loading = false;
        this.fireEvent('load', this, records, operation.wasSuccessful());
        
        //TODO: deprecate this event, it should always have been 'load' instead. 'load' is now documented, 'read' is not.
        //People are definitely using this so can't deprecate safely until 2.x
        this.fireEvent('read', this, records, operation.wasSuccessful());

        //this is a callback that would have been passed to the 'read' function and is optional
        var callback = operation.callback;
        
        if (typeof callback == 'function') {
            callback.call(operation.scope || this, records, operation, operation.wasSuccessful());
        }
    },

    /**
     * @private
     * Callback for any write Operation over the Proxy. Updates the Store's MixedCollection to reflect
     * the updates provided by the Proxy
     */
    onProxyWrite: function(operation) {
        var data     = this.data,
            action   = operation.action,
            records  = operation.getRecords(),
            length   = records.length,
            callback = operation.callback,
            record, i;

        if (operation.wasSuccessful()) {
            if (action == 'create' || action == 'update') {
                for (i = 0; i < length; i++) {
                    record = records[i];

                    record.phantom = false;
                    record.join(this);
                    data.replace(record);
                }
            }

            else if (action == 'destroy') {
                for (i = 0; i < length; i++) {
                    record = records[i];

                    record.unjoin(this);
                    data.remove(record);
                }

                this.removed = [];
            }

            this.fireEvent('datachanged');
        }

        //this is a callback that would have been passed to the 'create', 'update' or 'destroy' function and is optional
        if (typeof callback == 'function') {
            callback.call(operation.scope || this, records, operation, operation.wasSuccessful());
        }
    },

    //inherit docs
    getNewRecords: function() {
        return this.data.filterBy(this.filterNew).items;
    },

    //inherit docs
    getUpdatedRecords: function() {
        return this.data.filterBy(this.filterDirty).items;
    },

    /**
     * <p>Sorts the data in the Store by one or more of its properties. Example usage:</p>
<pre><code>
//sort by a single field
myStore.sort('myField', 'DESC');

//sorting by multiple fields
myStore.sort([
    {
        property : 'age',
        direction: 'ASC'
    },
    {
        property : 'name',
        direction: 'DESC'
    }
]);
</code></pre>
     * <p>Internally, Store converts the passed arguments into an array of {@link Ext.util.Sorter} instances, and delegates the actual
     * sorting to its internal {@link Ext.util.MixedCollection}.</p>
     * <p>When passing a single string argument to sort, Store maintains a ASC/DESC toggler per field, so this code:</p>
<pre><code>
store.sort('myField');
store.sort('myField');
     </code></pre>
     * <p>Is equivalent to this code, because Store handles the toggling automatically:</p>
<pre><code>
store.sort('myField', 'ASC');
store.sort('myField', 'DESC');
</code></pre>
     * @param {String|Array} sorters Either a string name of one of the fields in this Store's configured {@link Ext.data.Model Model},
     * or an Array of sorter configurations.
     * @param {String} direction The overall direction to sort the data by. Defaults to "ASC".
     */
    sort: function(sorters, direction) {
        if (Ext.isString(sorters)) {
            var property   = sorters,
                sortToggle = this.sortToggle,
                toggle     = Ext.util.Format.toggle;

            if (direction == undefined) {
                sortToggle[property] = toggle(sortToggle[property] || "", "ASC", "DESC");
                direction = sortToggle[property];
            }

            sorters = {
                property : property,
                direction: direction
            };
        }
        
        if (arguments.length != 0) {
            this.sorters.clear();
        }
        
        this.sorters.addAll(this.decodeSorters(sorters));

        if (this.remoteSort) {
            //the load function will pick up the new sorters and request the sorted data from the proxy
            this.load();
        } else {
            this.data.sort(this.sorters.items);

            this.fireEvent('datachanged', this);
        }
    },


    /**
     * Filters the loaded set of records by a given set of filters.
     * @param {Mixed} filters The set of filters to apply to the data. These are stored internally on the store,
     * but the filtering itself is done on the Store's {@link Ext.util.MixedCollection MixedCollection}. See
     * MixedCollection's {@link Ext.util.MixedCollection#filter filter} method for filter syntax. Alternatively,
     * pass in a property string
     * @param {String} value Optional value to filter by (only if using a property string as the first argument)
     */
    filter: function(filters, value) {
        if (Ext.isString(filters)) {
            filters = {
                property: filters,
                value   : value
            };
        }
        
        this.filters.addAll(this.decodeFilters(filters));

        if (this.remoteFilter) {
            //the load function will pick up the new filters and request the filtered data from the proxy
            this.load();
        } else {
            /**
             * A pristine (unfiltered) collection of the records in this store. This is used to reinstate
             * records when a filter is removed or changed
             * @property snapshot
             * @type Ext.util.MixedCollection
             */
            this.snapshot = this.snapshot || this.data.clone();

            this.data = this.data.filter(this.filters.items);
            
            if (this.sortOnFilter && !this.remoteSort) {
                this.sort();
            } else {
                this.fireEvent('datachanged', this);
            }
        }
    },

    /**
     * Revert to a view of the Record cache with no filtering applied.
     * @param {Boolean} suppressEvent If <tt>true</tt> the filter is cleared silently without firing the
     * {@link #datachanged} event.
     */
    clearFilter : function(suppressEvent) {
        this.filters.clear();
        
        if (this.isFiltered()) {
            this.data = this.snapshot.clone();
            delete this.snapshot;

            if (suppressEvent !== true) {
                this.fireEvent('datachanged', this);
            }
        }
    },

    /**
     * Returns true if this store is currently filtered
     * @return {Boolean}
     */
    isFiltered : function() {
        return !!this.snapshot && this.snapshot != this.data;
    },

    /**
     * Filter by a function. The specified function will be called for each
     * Record in this Store. If the function returns <tt>true</tt> the Record is included,
     * otherwise it is filtered out.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Record<p class="sub-desc">The {@link Ext.data.Record record}
     * to test for filtering. Access field values using {@link Ext.data.Record#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this Store.
     */
    filterBy : function(fn, scope) {
        this.snapshot = this.snapshot || this.data.clone();
        this.data = this.queryBy(fn, scope || this);
        this.fireEvent('datachanged', this);
    },

    /**
     * Query the cached records in this Store using a filtering function. The specified function
     * will be called with each record in this Store. If the function returns <tt>true</tt> the record is
     * included in the results.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Record<p class="sub-desc">The {@link Ext.data.Record record}
     * to test for filtering. Access field values using {@link Ext.data.Record#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this Store.
     * @return {MixedCollection} Returns an Ext.util.MixedCollection of the matched records
     **/
    queryBy : function(fn, scope) {
        var data = this.snapshot || this.data;
        return data.filterBy(fn, scope||this);
    },
    
    /**
     * Loads an array of data straight into the Store
     * @param {Array} data Array of data to load. Any non-model instances will be cast into model instances first
     * @param {Boolean} append True to add the records to the existing records in the store, false to remove the old ones first
     */
    loadData: function(data, append) {
        var model  = this.model,
            length = data.length,
            i, record;

        //make sure each data element is an Ext.data.Model instance
        for (i = 0; i < length; i++) {
            record = data[i];

            if (!(record instanceof Ext.data.Model)) {
                data[i] = Ext.ModelMgr.create(record, model);
            }
        }

        this.loadRecords(data, append);
    },

    /**
     * Loads an array of {@Ext.data.Model model} instances into the store, fires the datachanged event. This should only usually
     * be called internally when loading from the {@link Ext.data.Proxy Proxy}, when adding records manually use {@link #add} instead
     * @param {Array} records The array of records to load
     * @param {Boolean} add True to add these records to the existing records, false to remove the Store's existing records first
     */
    loadRecords: function(records, add) {
        if (!add) {
            this.data.clear();
        }
        
        this.data.addAll(records);
        
        //FIXME: this is not a good solution. Ed Spencer is totally responsible for this and should be forced to fix it immediately.
        for (var i = 0, length = records.length; i < length; i++) {
            records[i].needsAdd = false;
            records[i].join(this);
        }
        
        /*
         * this rather inelegant suspension and resumption of events is required because both the filter and sort functions
         * fire an additional datachanged event, which is not wanted. Ideally we would do this a different way. The first
         * datachanged event is fired by the call to this.add, above.
         */
        this.suspendEvents();

        if (this.filterOnLoad && !this.remoteFilter) {
            this.filter();
        }

        if (this.sortOnLoad && !this.remoteSort) {
            this.sort();
        }

        this.resumeEvents();
        this.fireEvent('datachanged', this, records);
    },

    // PAGING METHODS

    /**
     * Loads a given 'page' of data by setting the start and limit values appropriately. Internally this just causes a normal
     * load operation, passing in calculated 'start' and 'limit' params
     * @param {Number} page The number of the page to load
     */
    loadPage: function(page) {
        this.currentPage = page;

        this.read({
            page : page,
            start: (page - 1) * this.pageSize,
            limit: this.pageSize,
            addRecords: !this.clearOnPageLoad
        });
    },

    /**
     * Loads the next 'page' in the current data set
     */
    nextPage: function() {
        this.loadPage(this.currentPage + 1);
    },

    /**
     * Loads the previous 'page' in the current data set
     */
    previousPage: function() {
        this.loadPage(this.currentPage - 1);
    },

    // private
    clearData: function(){
        this.data.each(function(record) {
            record.unjoin();
        });

        this.data.clear();
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
    find : function(property, value, start, anyMatch, caseSensitive, exactMatch) {
        var fn = this.createFilterFn(property, value, anyMatch, caseSensitive, exactMatch);
        return fn ? this.data.findIndexBy(fn, null, start) : -1;
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
     * @return {Ext.data.Record} The matched record or null
     */
    findRecord : function() {
        var index = this.find.apply(this, arguments);
        return index != -1 ? this.getAt(index) : null;
    },

    /**
     * @private
     * Returns a filter function used to test a the given property's value. Defers most of the work to
     * Ext.util.MixedCollection's createValueMatcher function
     * @param {String} property The property to create the filter function for
     * @param {String/RegExp} value The string/regex to compare the property value to
     * @param {Boolean} anyMatch True if we don't care if the filter value is not the full value (defaults to false)
     * @param {Boolean} caseSensitive True to create a case-sensitive regex (defaults to false)
     * @param {Boolean} exactMatch True to force exact match (^ and $ characters added to the regex). Defaults to false. 
     * Ignored if anyMatch is true.
     */
    createFilterFn : function(property, value, anyMatch, caseSensitive, exactMatch) {
        if(Ext.isEmpty(value)){
            return false;
        }
        value = this.data.createValueMatcher(value, anyMatch, caseSensitive, exactMatch);
        return function(r) {
            return value.test(r.data[property]);
        };
    },

    /**
     * Finds the index of the first matching Record in this store by a specific field value.
     * @param {String} fieldName The name of the Record field to test.
     * @param {Mixed} value The value to match the field against.
     * @param {Number} startIndex (optional) The index to start searching at
     * @return {Number} The matched index or -1
     */
    findExact: function(property, value, start) {
        return this.data.findIndexBy(function(rec){
            return rec.get(property) === value;
        }, this, start);
    },

    /**
     * Find the index of the first matching Record in this Store by a function.
     * If the function returns <tt>true</tt> it is considered a match.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Record<p class="sub-desc">The {@link Ext.data.Record record}
     * to test for filtering. Access field values using {@link Ext.data.Record#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this Store.
     * @param {Number} startIndex (optional) The index to start searching at
     * @return {Number} The matched index or -1
     */
    findBy : function(fn, scope, start) {
        return this.data.findIndexBy(fn, scope, start);
    },

    /**
     * Collects unique values for a particular dataIndex from this store.
     * @param {String} dataIndex The property to collect
     * @param {Boolean} allowNull (optional) Pass true to allow null, undefined or empty string values
     * @param {Boolean} bypassFilter (optional) Pass true to collect from all records, even ones which are filtered
     * @return {Array} An array of the unique values
     **/
    collect : function(dataIndex, allowNull, bypassFilter) {
        var values  = [],
            uniques = {},
            length, value, strValue, data, i;

        if (bypassFilter === true && this.snapshot) {
            data = this.snapshot.items;
        } else {
            data = this.data.items;
        }

        length = data.length;

        for (i = 0; i < length; i++) {
            value = data[i].data[dataIndex];
            strValue = String(value);

            if ((allowNull || !Ext.isEmpty(value)) && !uniques[strValue]) {
                uniques[strValue] = true;
                values[values.length] = value;
            }
        }

        return values;
    },

    /**
     * Sums the value of <tt>property</tt> for each {@link Ext.data.Record record} between <tt>start</tt>
     * and <tt>end</tt> and returns the result.
     * @param {String} property A field in each record
     * @param {Number} start (optional) The record index to start at (defaults to <tt>0</tt>)
     * @param {Number} end (optional) The last record index to include (defaults to length - 1)
     * @return {Number} The sum
     */
    sum : function(property, start, end) {
        var records = this.data.items,
            value   = 0,
            i;

        start = start || 0;
        end   = (end || end === 0) ? end : records.length - 1;

        for (i = start; i <= end; i++) {
            value += (records[i].data[property] || 0);
        }

        return value;
    },

    /**
     * Gets the number of cached records.
     * <p>If using paging, this may not be the total size of the dataset. If the data object
     * used by the Reader contains the dataset size, then the {@link #getTotalCount} function returns
     * the dataset size.  <b>Note</b>: see the Important note in {@link #load}.</p>
     * @return {Number} The number of Records in the Store's cache.
     */
    getCount : function() {
        return this.data.length || 0;
    },

    /**
     * Get the Record at the specified index.
     * @param {Number} index The index of the Record to find.
     * @return {Ext.data.Model} The Record at the passed index. Returns undefined if not found.
     */
    getAt : function(index) {
        return this.data.getAt(index);
    },

    /**
     * Returns a range of Records between specified indices.
     * @param {Number} startIndex (optional) The starting index (defaults to 0)
     * @param {Number} endIndex (optional) The ending index (defaults to the last Record in the Store)
     * @return {Ext.data.Model[]} An array of Records
     */
    getRange : function(start, end) {
        return this.data.getRange(start, end);
    },

    /**
     * Get the Record with the specified id.
     * @param {String} id The id of the Record to find.
     * @return {Ext.data.Record} The Record with the passed id. Returns undefined if not found.
     */
    getById : function(id) {
        return (this.snapshot || this.data).findBy(function(record) {
            return record.getId() === id;
        });
    },

    /**
     * Get the index within the cache of the passed Record.
     * @param {Ext.data.Model} record The Ext.data.Model object to find.
     * @return {Number} The index of the passed Record. Returns -1 if not found.
     */
    indexOf : function(record) {
        return this.data.indexOf(record);
    },

    /**
     * Get the index within the cache of the Record with the passed id.
     * @param {String} id The id of the Record to find.
     * @return {Number} The index of the Record. Returns -1 if not found.
     */
    indexOfId : function(id) {
        return this.data.indexOfKey(id);
    },

    removeAll: function(silent) {
        var items = [];
        this.each(function(rec){
            items.push(rec);
        });
        this.clearData();
        if(this.snapshot){
            this.snapshot.clear();
        }
        //if(this.pruneModifiedRecords){
        //    this.modified = [];
        //}
        if (silent !== true) {
            this.fireEvent('clear', this, items);
        }
    }
});

/**
 * @author Aaron Conran
 * @class Ext.data.TreeStore
 * @extends Ext.data.AbstractStore
 *
 * <p>A store class that allows the representation of hierarchical data.</p>
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.TreeStore = Ext.extend(Ext.data.AbstractStore, {
    /**
     * @cfg {Boolean} clearOnLoad (optional) Default to true. Remove previously existing
     * child nodes before loading.
     */
    clearOnLoad : true,

    /**
     * @cfg {String} nodeParam The name of the parameter sent to the server which contains
     * the identifier of the node. Defaults to <tt>'node'</tt>.
     */
    nodeParam: 'node',

    /**
     * @cfg {String} defaultRootId
     * The default root id. Defaults to 'root'
     */
    defaultRootId: 'root',

    constructor: function(config) {
        config = config || {};
        var rootCfg = config.root || {};
        rootCfg.id = rootCfg.id || this.defaultRootId;

        // create a default rootNode and create internal data struct.
        var rootNode = new Ext.data.RecordNode(rootCfg);
        this.tree = new Ext.data.Tree(rootNode);
        this.tree.treeStore = this;

        Ext.data.TreeStore.superclass.constructor.call(this, config);
        
        //<deprecated since=0.99>
        if (Ext.isDefined(this.nodeParameter)) {
            throw "Ext.data.TreeStore: nodeParameter has been renamed to nodeParam for consistency";
        }
        //</deprecated>

        if (config.root) {
            this.read({
                node: rootNode,
                doPreload: true
            });
        }
    },


    /**
     * Returns the root node for this tree.
     * @return {Ext.data.RecordNode}
     */
    getRootNode: function() {
        return this.tree.getRootNode();
    },

    /**
     * Returns the record node by id
     * @return {Ext.data.RecordNode}
     */
    getNodeById: function(id) {
        return this.tree.getNodeById(id);
    },


    // new options are
    // * node - a node within the tree
    // * doPreload - private option used to preload existing childNodes
    load: function(options) {
        options = options || {};
        options.params = options.params || {};

        var node = options.node || this.tree.getRootNode(),
            records,
            record,
            reader = this.proxy.reader,
            root;

        if (this.clearOnLoad) {
            while (node.firstChild){
                node.removeChild(node.firstChild);
            }
        }

        if (!options.doPreload) {
            Ext.applyIf(options, {
                node: node
            });
            record = node.getRecord();
            options.params[this.nodeParam] = record ? record.getId() : 'root';

            return Ext.data.TreeStore.superclass.load.call(this, options);
        } else {
            root = reader.getRoot(node.isRoot ? node.attributes : node.getRecord().raw);
            records = reader.extractData(root, true);
            this.fillNode(node, records);
            return true;
        }
    },

    // @private
    // fills an Ext.data.RecordNode with records
    fillNode: function(node, records) {
        node.loaded = true;
        var ln = records.length,
            recordNode,
            i = 0,
            raw,
            subStore = node.subStore;

        for (; i < ln; i++) {
            raw = records[i].raw;
            records[i].data.leaf = raw.leaf;
            recordNode = new Ext.data.RecordNode({
                id: records[i].getId(),
                leaf: raw.leaf,
                record: records[i],
                expanded: raw.expanded
            });
            node.appendChild(recordNode);
            if (records[i].doPreload) {
                this.load({
                    node: recordNode,
                    doPreload: true
                });
            }
        }

        // maintain the subStore if its already been created
        if (subStore) {
            if (this.clearOnLoad) {
                subStore.removeAll();
            }
            subStore.add.apply(subStore, records);
        }
    },


    onProxyLoad: function(operation) {
        var records = operation.getRecords();

        this.fillNode(operation.node, records);

        this.fireEvent('read', this, operation.node, records, operation.wasSuccessful());
        //this is a callback that would have been passed to the 'read' function and is optional
        var callback = operation.callback;
        if (typeof callback == 'function') {
            callback.call(operation.scope || this, records, operation, operation.wasSuccessful());
        }
    },


    /**
     * Returns a flat Ext.data.Store with the correct type of model.
     * @param {Ext.data.RecordNode/Ext.data.Record} record
     * @returns Ext.data.Store
     */
    getSubStore: function(node) {
        // Remap Record to RecordNode
        if (node && node.node) {
            node = node.node;
        }
        return node.getSubStore();
    },


    removeAll: function() {
        var rootNode = this.getRootNode();
        rootNode.destroy();
    }
});

/**
 * @class Ext.StoreMgr
 * @extends Ext.util.MixedCollection
 * The default global group of stores.
 * @singleton
 * TODO: Make this an AbstractMgr
 */
Ext.StoreMgr = Ext.apply(new Ext.util.MixedCollection(), {
    /**
     * @cfg {Object} listeners @hide
     */

    /**
     * Registers one or more Stores with the StoreMgr. You do not normally need to register stores
     * manually.  Any store initialized with a {@link Ext.data.Store#storeId} will be auto-registered. 
     * @param {Ext.data.Store...} stores Variable number of Store instances
     */
    register : function() {
        for (var i = 0, s; (s = arguments[i]); i++) {
            this.add(s);
        }
    },

    /**
     * Unregisters one or more Stores with the StoreMgr
     * @param {String/Object...} ids Variable number of Store ID-s or instances
     */
    unregister : function() {
        for (var i = 0, s; (s = arguments[i]); i++) {
            this.remove(this.lookup(s));
        }
    },

    /**
     * Gets a registered Store by id
     * @param {String/Object} id The id of the Store, or a Store instance
     * @return {Ext.data.Store}
     */
    lookup : function(id) {
        if (Ext.isArray(id)) {
            var fields = ['field1'], expand = !Ext.isArray(id[0]);
            if(!expand){
                for(var i = 2, len = id[0].length; i <= len; ++i){
                    fields.push('field' + i);
                }
            }
            return new Ext.data.ArrayStore({
                data  : id,
                fields: fields,
                expandData : expand,
                autoDestroy: true,
                autoCreated: true
            });
        }
        return Ext.isObject(id) ? (id.events ? id : Ext.create(id, 'store')) : this.get(id);
    },

    // getKey implementation for MixedCollection
    getKey : function(o) {
         return o.storeId;
    }
});

/**
 * <p>Creates a new store for the given id and config, then registers it with the {@link Ext.StoreMgr Store Mananger}. 
 * Sample usage:</p>
<pre><code>
Ext.regStore('AllUsers', {
    model: 'User'
});

//the store can now easily be used throughout the application
new Ext.List({
    store: 'AllUsers',
    ... other config
});
</code></pre>
 * @param {String} id The id to set on the new store
 * @param {Object} config The store config
 * @param {Constructor} cls The new Component class.
 * @member Ext
 * @method regStore
 */
Ext.regStore = function(name, config) {
    var store;

    if (Ext.isObject(name)) {
        config = name;
    } else {
        config.storeId = name;
    }

    if (config instanceof Ext.data.Store) {
        store = config;
    } else {
        store = new Ext.data.Store(config);
    }

    return Ext.StoreMgr.register(store);
};

/**
 * Gets a registered Store by id (shortcut to {@link #lookup})
 * @param {String/Object} id The id of the Store, or a Store instance
 * @return {Ext.data.Store}
 * @member Ext
 * @method getStore
 */
Ext.getStore = function(name) {
    return Ext.StoreMgr.lookup(name);
};

/**
 * @author Ed Spencer
 * @class Ext.data.WriterMgr
 * @extends Ext.AbstractManager
 * @ignore
 * 
 * <p>Keeps track of all of the registered {@link Ext.data.Writer Writers}</p>
 */
Ext.data.WriterMgr = new Ext.AbstractManager({
    
});
/**
 * @class Ext.data.Tree
 * @extends Ext.util.Observable
 * Represents a tree data structure and bubbles all the events for its nodes. The nodes
 * in the tree have most standard DOM functionality.
 * @constructor
 * @param {Node} root (optional) The root node
 */
Ext.data.Tree = Ext.extend(Ext.util.Observable, {
    
    constructor: function(root) {
        this.nodeHash = {};
        
        /**
         * The root node for this tree
         * @type Node
         */
        this.root = null;
        
        if (root) {
            this.setRootNode(root);
        }
        
        this.addEvents(
            /**
             * @event append
             * Fires when a new child node is appended to a node in this tree.
             * @param {Tree} tree The owner tree
             * @param {Node} parent The parent node
             * @param {Node} node The newly appended node
             * @param {Number} index The index of the newly appended node
             */
            "append",
            
            /**
             * @event remove
             * Fires when a child node is removed from a node in this tree.
             * @param {Tree} tree The owner tree
             * @param {Node} parent The parent node
             * @param {Node} node The child node removed
             */
            "remove",
            
            /**
             * @event move
             * Fires when a node is moved to a new location in the tree
             * @param {Tree} tree The owner tree
             * @param {Node} node The node moved
             * @param {Node} oldParent The old parent of this node
             * @param {Node} newParent The new parent of this node
             * @param {Number} index The index it was moved to
             */
            "move",
            
            /**
             * @event insert
             * Fires when a new child node is inserted in a node in this tree.
             * @param {Tree} tree The owner tree
             * @param {Node} parent The parent node
             * @param {Node} node The child node inserted
             * @param {Node} refNode The child node the node was inserted before
             */
            "insert",
            
            /**
             * @event beforeappend
             * Fires before a new child is appended to a node in this tree, return false to cancel the append.
             * @param {Tree} tree The owner tree
             * @param {Node} parent The parent node
             * @param {Node} node The child node to be appended
             */
            "beforeappend",
            
            /**
             * @event beforeremove
             * Fires before a child is removed from a node in this tree, return false to cancel the remove.
             * @param {Tree} tree The owner tree
             * @param {Node} parent The parent node
             * @param {Node} node The child node to be removed
             */
            "beforeremove",
            
            /**
             * @event beforemove
             * Fires before a node is moved to a new location in the tree. Return false to cancel the move.
             * @param {Tree} tree The owner tree
             * @param {Node} node The node being moved
             * @param {Node} oldParent The parent of the node
             * @param {Node} newParent The new parent the node is moving to
             * @param {Number} index The index it is being moved to
             */
            "beforemove",
            
            /**
             * @event beforeinsert
             * Fires before a new child is inserted in a node in this tree, return false to cancel the insert.
             * @param {Tree} tree The owner tree
             * @param {Node} parent The parent node
             * @param {Node} node The child node to be inserted
             * @param {Node} refNode The child node the node is being inserted before
             */
            "beforeinsert"
        );
        
        Ext.data.Tree.superclass.constructor.call(this);        
    },
    
    /**
     * @cfg {String} pathSeparator
     * The token used to separate paths in node ids (defaults to '/').
     */
    pathSeparator: "/",

    // private
    proxyNodeEvent : function(){
        return this.fireEvent.apply(this, arguments);
    },

    /**
     * Returns the root node for this tree.
     * @return {Node}
     */
    getRootNode : function() {
        return this.root;
    },

    /**
     * Sets the root node for this tree.
     * @param {Node} node
     * @return {Node}
     */
    setRootNode : function(node) {
        this.root = node;
        node.ownerTree = this;
        node.isRoot = true;
        this.registerNode(node);
        return node;
    },

    /**
     * Gets a node in this tree by its id.
     * @param {String} id
     * @return {Node}
     */
    getNodeById : function(id) {
        return this.nodeHash[id];
    },

    // private
    registerNode : function(node) {
        this.nodeHash[node.id] = node;
    },

    // private
    unregisterNode : function(node) {
        delete this.nodeHash[node.id];
    },

    toString : function() {
        return "[Tree"+(this.id?" "+this.id:"")+"]";
    }
});

/**
 * @class Ext.data.Node
 * @extends Ext.util.Observable
 * @cfg {Boolean} leaf true if this node is a leaf and does not have children
 * @cfg {String} id The id for this node. If one is not specified, one is generated.
 * @constructor
 * @param {Object} attributes The attributes/config for the node
 */
Ext.data.Node = Ext.extend(Ext.util.Observable, {

    constructor: function(attributes) {
        /**
         * The attributes supplied for the node. You can use this property to access any custom attributes you supplied.
         * @type {Object}
         */
        this.attributes = attributes || {};

        this.leaf = !!this.attributes.leaf;

        /**
         * The node id. @type String
         */
        this.id = this.attributes.id;

        if (!this.id) {
            this.id = Ext.id(null, "xnode-");
            this.attributes.id = this.id;
        }
        /**
         * All child nodes of this node. @type Array
         */
        this.childNodes = [];

        /**
         * The parent node for this node. @type Node
         */
        this.parentNode = null;

        /**
         * The first direct child node of this node, or null if this node has no child nodes. @type Node
         */
        this.firstChild = null;

        /**
         * The last direct child node of this node, or null if this node has no child nodes. @type Node
         */
        this.lastChild = null;

        /**
         * The node immediately preceding this node in the tree, or null if there is no sibling node. @type Node
         */
        this.previousSibling = null;

        /**
         * The node immediately following this node in the tree, or null if there is no sibling node. @type Node
         */
        this.nextSibling = null;

        this.addEvents({
            /**
             * @event append
             * Fires when a new child node is appended
             * @param {Tree} tree The owner tree
             * @param {Node} this This node
             * @param {Node} node The newly appended node
             * @param {Number} index The index of the newly appended node
             */
            "append" : true,

            /**
             * @event remove
             * Fires when a child node is removed
             * @param {Tree} tree The owner tree
             * @param {Node} this This node
             * @param {Node} node The removed node
             */
            "remove" : true,

            /**
             * @event move
             * Fires when this node is moved to a new location in the tree
             * @param {Tree} tree The owner tree
             * @param {Node} this This node
             * @param {Node} oldParent The old parent of this node
             * @param {Node} newParent The new parent of this node
             * @param {Number} index The index it was moved to
             */
            "move" : true,

            /**
             * @event insert
             * Fires when a new child node is inserted.
             * @param {Tree} tree The owner tree
             * @param {Node} this This node
             * @param {Node} node The child node inserted
             * @param {Node} refNode The child node the node was inserted before
             */
            "insert" : true,

            /**
             * @event beforeappend
             * Fires before a new child is appended, return false to cancel the append.
             * @param {Tree} tree The owner tree
             * @param {Node} this This node
             * @param {Node} node The child node to be appended
             */
            "beforeappend" : true,

            /**
             * @event beforeremove
             * Fires before a child is removed, return false to cancel the remove.
             * @param {Tree} tree The owner tree
             * @param {Node} this This node
             * @param {Node} node The child node to be removed
             */
            "beforeremove" : true,

            /**
             * @event beforemove
             * Fires before this node is moved to a new location in the tree. Return false to cancel the move.
             * @param {Tree} tree The owner tree
             * @param {Node} this This node
             * @param {Node} oldParent The parent of this node
             * @param {Node} newParent The new parent this node is moving to
             * @param {Number} index The index it is being moved to
             */
            "beforemove" : true,

             /**
              * @event beforeinsert
              * Fires before a new child is inserted, return false to cancel the insert.
              * @param {Tree} tree The owner tree
              * @param {Node} this This node
              * @param {Node} node The child node to be inserted
              * @param {Node} refNode The child node the node is being inserted before
              */
            "beforeinsert" : true
        });

        this.listeners = this.attributes.listeners;
        Ext.data.Node.superclass.constructor.call(this);
    },

    // private
    fireEvent : function(evtName) {
        // first do standard event for this node
        if (Ext.data.Node.superclass.fireEvent.apply(this, arguments) === false) {
            return false;
        }

        // then bubble it up to the tree if the event wasn't cancelled
        var ot = this.getOwnerTree();
        if (ot) {
            if (ot.proxyNodeEvent.apply(ot, arguments) === false) {
                return false;
            }
        }
        return true;
    },
    
    /**
     * Returns true if this node is a leaf
     * @return {Boolean}
     */
    isLeaf : function() {
        return this.leaf === true;
    },

    // private
    setFirstChild : function(node) {
        this.firstChild = node;
    },

    //private
    setLastChild : function(node) {
        this.lastChild = node;
    },


    /**
     * Returns true if this node is the last child of its parent
     * @return {Boolean}
     */
    isLast : function() {
       return (!this.parentNode ? true : this.parentNode.lastChild == this);
    },

    /**
     * Returns true if this node is the first child of its parent
     * @return {Boolean}
     */
    isFirst : function() {
       return (!this.parentNode ? true : this.parentNode.firstChild == this);
    },

    /**
     * Returns true if this node has one or more child nodes, else false.
     * @return {Boolean}
     */
    hasChildNodes : function() {
        return !this.isLeaf() && this.childNodes.length > 0;
    },

    /**
     * Returns true if this node has one or more child nodes, or if the <tt>expandable</tt>
     * node attribute is explicitly specified as true (see {@link #attributes}), otherwise returns false.
     * @return {Boolean}
     */
    isExpandable : function() {
        return this.attributes.expandable || this.hasChildNodes();
    },

    /**
     * Insert node(s) as the last child node of this node.
     * @param {Node/Array} node The node or Array of nodes to append
     * @return {Node} The appended node if single append, or null if an array was passed
     */
    appendChild : function(node) {
        var multi = false,
            i, len;

        if (Ext.isArray(node)) {
            multi = node;
        } else if (arguments.length > 1) {
            multi = arguments;
        }

        // if passed an array or multiple args do them one by one
        if (multi) {
            len = multi.length;

            for (i = 0; i < len; i++) {
                this.appendChild(multi[i]);
            }
        } else {
            if (this.fireEvent("beforeappend", this.ownerTree, this, node) === false) {
                return false;
            }

            var index = this.childNodes.length;
            var oldParent = node.parentNode;

            // it's a move, make sure we move it cleanly
            if (oldParent) {
                if (node.fireEvent("beforemove", node.getOwnerTree(), node, oldParent, this, index) === false) {
                    return false;
                }
                oldParent.removeChild(node);
            }

            index = this.childNodes.length;
            if (index === 0) {
                this.setFirstChild(node);
            }

            this.childNodes.push(node);
            node.parentNode = this;
            var ps = this.childNodes[index-1];
            if (ps) {
                node.previousSibling = ps;
                ps.nextSibling = node;
            } else {
                node.previousSibling = null;
            }

            node.nextSibling = null;
            this.setLastChild(node);
            node.setOwnerTree(this.getOwnerTree());
            this.fireEvent("append", this.ownerTree, this, node, index);

            if (oldParent) {
                node.fireEvent("move", this.ownerTree, node, oldParent, this, index);
            }

            return node;
        }
    },

    /**
     * Removes a child node from this node.
     * @param {Node} node The node to remove
     * @param {Boolean} destroy <tt>true</tt> to destroy the node upon removal. Defaults to <tt>false</tt>.
     * @return {Node} The removed node
     */
    removeChild : function(node, destroy) {
        var index = this.indexOf(node);

        if (index == -1) {
            return false;
        }
        if (this.fireEvent("beforeremove", this.ownerTree, this, node) === false) {
            return false;
        }

        // remove it from childNodes collection
        this.childNodes.splice(index, 1);

        // update siblings
        if (node.previousSibling) {
            node.previousSibling.nextSibling = node.nextSibling;
        }
        if (node.nextSibling) {
            node.nextSibling.previousSibling = node.previousSibling;
        }

        // update child refs
        if (this.firstChild == node) {
            this.setFirstChild(node.nextSibling);
        }
        if (this.lastChild == node) {
            this.setLastChild(node.previousSibling);
        }

        this.fireEvent("remove", this.ownerTree, this, node);
        if (destroy) {
            node.destroy(true);
        } else {
            node.clear();
        }

        return node;
    },

    // private
    clear : function(destroy) {
        // clear any references from the node
        this.setOwnerTree(null, destroy);
        this.parentNode = this.previousSibling = this.nextSibling = null;
        if (destroy) {
            this.firstChild = this.lastChild = null;
        }
    },

    /**
     * Destroys the node.
     */
    destroy : function(silent) {
        /*
         * Silent is to be used in a number of cases
         * 1) When setRootNode is called.
         * 2) When destroy on the tree is called
         * 3) For destroying child nodes on a node
         */
        if (silent === true) {
            this.clearListeners();
            this.clear(true);
            Ext.each(this.childNodes, function(n) {
                n.destroy(true);
            });
            this.childNodes = null;
        } else {
            this.remove(true);
        }
    },

    /**
     * Inserts the first node before the second node in this nodes childNodes collection.
     * @param {Node} node The node to insert
     * @param {Node} refNode The node to insert before (if null the node is appended)
     * @return {Node} The inserted node
     */
    insertBefore : function(node, refNode) {
        if (!refNode) { // like standard Dom, refNode can be null for append
            return this.appendChild(node);
        }
        // nothing to do
        if (node == refNode) {
            return false;
        }

        if (this.fireEvent("beforeinsert", this.ownerTree, this, node, refNode) === false) {
            return false;
        }

        var index     = this.indexOf(refNode),
            oldParent = node.parentNode,
            refIndex  = index;

        // when moving internally, indexes will change after remove
        if (oldParent == this && this.indexOf(node) < index) {
            refIndex--;
        }

        // it's a move, make sure we move it cleanly
        if (oldParent) {
            if (node.fireEvent("beforemove", node.getOwnerTree(), node, oldParent, this, index, refNode) === false) {
                return false;
            }
            oldParent.removeChild(node);
        }

        if (refIndex === 0) {
            this.setFirstChild(node);
        }

        this.childNodes.splice(refIndex, 0, node);
        node.parentNode = this;

        var ps = this.childNodes[refIndex-1];

        if (ps) {
            node.previousSibling = ps;
            ps.nextSibling = node;
        } else {
            node.previousSibling = null;
        }

        node.nextSibling = refNode;
        refNode.previousSibling = node;
        node.setOwnerTree(this.getOwnerTree());
        this.fireEvent("insert", this.ownerTree, this, node, refNode);

        if (oldParent) {
            node.fireEvent("move", this.ownerTree, node, oldParent, this, refIndex, refNode);
        }
        return node;
    },

    /**
     * Removes this node from its parent
     * @param {Boolean} destroy <tt>true</tt> to destroy the node upon removal. Defaults to <tt>false</tt>.
     * @return {Node} this
     */
    remove : function(destroy) {
        var parentNode = this.parentNode;

        if (parentNode) {
            parentNode.removeChild(this, destroy);
        }
        return this;
    },

    /**
     * Removes all child nodes from this node.
     * @param {Boolean} destroy <tt>true</tt> to destroy the node upon removal. Defaults to <tt>false</tt>.
     * @return {Node} this
     */
    removeAll : function(destroy) {
        var cn = this.childNodes,
            n;

        while ((n = cn[0])) {
            this.removeChild(n, destroy);
        }
        return this;
    },

    /**
     * Returns the child node at the specified index.
     * @param {Number} index
     * @return {Node}
     */
    getChildAt : function(index) {
        return this.childNodes[index];
    },

    /**
     * Replaces one child node in this node with another.
     * @param {Node} newChild The replacement node
     * @param {Node} oldChild The node to replace
     * @return {Node} The replaced node
     */
    replaceChild : function(newChild, oldChild) {
        var s = oldChild ? oldChild.nextSibling : null;

        this.removeChild(oldChild);
        this.insertBefore(newChild, s);
        return oldChild;
    },

    /**
     * Returns the index of a child node
     * @param {Node} node
     * @return {Number} The index of the node or -1 if it was not found
     */
    indexOf : function(child) {
        return this.childNodes.indexOf(child);
    },

    /**
     * Returns the tree this node is in.
     * @return {Tree}
     */
    getOwnerTree : function() {
        // if it doesn't have one, look for one
        if (!this.ownerTree) {
            var p = this;

            while (p) {
                if (p.ownerTree) {
                    this.ownerTree = p.ownerTree;
                    break;
                }
                p = p.parentNode;
            }
        }

        return this.ownerTree;
    },

    /**
     * Returns depth of this node (the root node has a depth of 0)
     * @return {Number}
     */
    getDepth : function() {
        var depth = 0,
            p     = this;

        while (p.parentNode) {
            ++depth;
            p = p.parentNode;
        }

        return depth;
    },

    // private
    setOwnerTree : function(tree, destroy) {
        // if it is a move, we need to update everyone
        if (tree != this.ownerTree) {
            if (this.ownerTree) {
                this.ownerTree.unregisterNode(this);
            }
            this.ownerTree = tree;

            // If we're destroying, we don't need to recurse since it will be called on each child node
            if (destroy !== true) {
                Ext.each(this.childNodes, function(n) {
                    n.setOwnerTree(tree);
                });
            }
            if (tree) {
                tree.registerNode(this);
            }
        }
    },

    /**
     * Changes the id of this node.
     * @param {String} id The new id for the node.
     */
    setId: function(id) {
        if (id !== this.id) {
            var t = this.ownerTree;
            if (t) {
                t.unregisterNode(this);
            }
            this.id = this.attributes.id = id;
            if (t) {
                t.registerNode(this);
            }
            this.onIdChange(id);
        }
    },

    // private
    onIdChange: Ext.emptyFn,

    /**
     * Returns the path for this node. The path can be used to expand or select this node programmatically.
     * @param {String} attr (optional) The attr to use for the path (defaults to the node's id)
     * @return {String} The path
     */
    getPath : function(attr) {
        attr = attr || "id";
        var p = this.parentNode,
            b = [this.attributes[attr]];

        while (p) {
            b.unshift(p.attributes[attr]);
            p = p.parentNode;
        }

        var sep = this.getOwnerTree().pathSeparator;
        return sep + b.join(sep);
    },

    /**
     * Bubbles up the tree from this node, calling the specified function with each node. The arguments to the function
     * will be the args provided or the current node. If the function returns false at any point,
     * the bubble is stopped.
     * @param {Function} fn The function to call
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the current Node.
     * @param {Array} args (optional) The args to call the function with (default to passing the current Node)
     */
    bubble : function(fn, scope, args) {
        var p = this;
        while (p) {
            if (fn.apply(scope || p, args || [p]) === false) {
                break;
            }
            p = p.parentNode;
        }
    },
    
    //<deprecated since=0.99>
    cascade: function() {
        throw "Ext.data.Node: cascade method renamed to cascadeBy.";
    },
    //</deprecated>

    /**
     * Cascades down the tree from this node, calling the specified function with each node. The arguments to the function
     * will be the args provided or the current node. If the function returns false at any point,
     * the cascade is stopped on that branch.
     * @param {Function} fn The function to call
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the current Node.
     * @param {Array} args (optional) The args to call the function with (default to passing the current Node)
     */
    cascadeBy : function(fn, scope, args) {
        if (fn.apply(scope || this, args || [this]) !== false) {
            var childNodes = this.childNodes,
                length     = childNodes.length,
                i;

            for (i = 0; i < length; i++) {
                childNodes[i].cascadeBy(fn, scope, args);
            }
        }
    },

    /**
     * Interates the child nodes of this node, calling the specified function with each node. The arguments to the function
     * will be the args provided or the current node. If the function returns false at any point,
     * the iteration stops.
     * @param {Function} fn The function to call
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the current Node in the iteration.
     * @param {Array} args (optional) The args to call the function with (default to passing the current Node)
     */
    eachChild : function(fn, scope, args) {
        var childNodes = this.childNodes,
            length     = childNodes.length,
            i;

        for (i = 0; i < length; i++) {
            if (fn.apply(scope || this, args || [childNodes[i]]) === false) {
                break;
            }
        }
    },

    /**
     * Finds the first child that has the attribute with the specified value.
     * @param {String} attribute The attribute name
     * @param {Mixed} value The value to search for
     * @param {Boolean} deep (Optional) True to search through nodes deeper than the immediate children
     * @return {Node} The found child or null if none was found
     */
    findChild : function(attribute, value, deep) {
        return this.findChildBy(function(){
            return this.attributes[attribute] == value;
        }, null, deep);
    },

    /**
     * Finds the first child by a custom function. The child matches if the function passed returns <code>true</code>.
     * @param {Function} fn A function which must return <code>true</code> if the passed Node is the required Node.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the Node being tested.
     * @param {Boolean} deep (Optional) True to search through nodes deeper than the immediate children
     * @return {Node} The found child or null if none was found
     */
    findChildBy : function(fn, scope, deep) {
        var cs = this.childNodes,
            len = cs.length,
            i = 0,
            n,
            res;

        for(; i < len; i++){
            n = cs[i];
            if(fn.call(scope || n, n) === true){
                return n;
            }else if (deep){
                res = n.findChildBy(fn, scope, deep);
                if(res != null){
                    return res;
                }
            }

        }

        return null;
    },

    /**
     * Sorts this nodes children using the supplied sort function.
     * @param {Function} fn A function which, when passed two Nodes, returns -1, 0 or 1 depending upon required sort order.
     * @param {Object} scope (optional)The scope (<code>this</code> reference) in which the function is executed. Defaults to the browser window.
     */
    sort : function(fn, scope) {
        var cs  = this.childNodes,
            len = cs.length,
            i, n;

        if (len > 0) {
            var sortFn = scope ? function(){return fn.apply(scope, arguments);} : fn;
            cs.sort(sortFn);
            for (i = 0; i < len; i++) {
                n = cs[i];
                n.previousSibling = cs[i-1];
                n.nextSibling = cs[i+1];

                if (i === 0){
                    this.setFirstChild(n);
                }
                if (i == len - 1) {
                    this.setLastChild(n);
                }
            }
        }
    },

    /**
     * Returns true if this node is an ancestor (at any point) of the passed node.
     * @param {Node} node
     * @return {Boolean}
     */
    contains : function(node) {
        return node.isAncestor(this);
    },

    /**
     * Returns true if the passed node is an ancestor (at any point) of this node.
     * @param {Node} node
     * @return {Boolean}
     */
    isAncestor : function(node) {
        var p = this.parentNode;
        while (p) {
            if (p == node) {
                return true;
            }
            p = p.parentNode;
        }
        return false;
    },

    toString : function() {
        return "[Node" + (this.id ? " " + this.id : "") + "]";
    }
});


Ext.data.RecordNode = Ext.extend(Ext.data.Node, {
    constructor: function(config) {
        config = config || {};
        if (config.record) {
            // provide back reference
            config.record.node = this;
        }
        Ext.data.RecordNode.superclass.constructor.call(this, config);
    },

    getChildRecords: function() {
        var cn = this.childNodes,
            ln = cn.length,
            i = 0,
            rs = [],
            r;

        for (; i < ln; i++) {
            r = cn[i].attributes.record;
            // Hack to inject leaf attribute into the
            // data portion of a record, this will be
            // removed once Record and Ext.data.Node have
            // been combined rather than aggregated.
            r.data.leaf = cn[i].leaf;
            rs.push(r);
        }
        return rs;
    },

    getRecord: function() {
        return this.attributes.record;
    },


    getSubStore: function() {

        // <debug>
        if (this.isLeaf()) {
            throw "Attempted to get a substore of a leaf node.";
        }
        // </debug>

        var treeStore = this.getOwnerTree().treeStore;
        if (!this.subStore) {
            this.subStore = new Ext.data.Store({
                model: treeStore.model
            });
            // if records have already been preLoaded, apply them
            // to the subStore, if not they will be loaded by the
            // read within the TreeStore itself.
            var children = this.getChildRecords();
            this.subStore.add.apply(this.subStore, children);
        }

        if (!this.loaded) {
            treeStore.load({
                node: this
            });
        }
        return this.subStore;
    },

    destroy : function(silent) {
        if (this.subStore) {
            this.subStore.destroyStore();
        }
        var attr = this.attributes;
        if (attr.record) {
            delete attr.record.node;
            delete attr.record;
        }

        return Ext.data.RecordNode.superclass.destroy.call(this, silent);
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.Proxy
 * @extends Ext.util.Observable
 * 
 * <p>Proxies are used by {@link Ext.data.Store Stores} to handle the loading and saving of {@link Ext.data.Model Model} data.
 * Usually developers will not need to create or interact with proxies directly.</p>
 * <p><u>Types of Proxy</u></p>
 * 
 * <p>There are two main types of Proxy - {@link Ext.data.ClientProxy Client} and {@link Ext.data.ServerProxy Server}. The Client proxies
 * save their data locally and include the following subclasses:</p>
 * 
 * <ul style="list-style-type: disc; padding-left: 25px">
 * <li>{@link Ext.data.LocalStorageProxy LocalStorageProxy} - saves its data to localStorage if the browser supports it</li>
 * <li>{@link Ext.data.SessionStorageProxy SessionStorageProxy} - saves its data to sessionStorage if the browsers supports it</li>
 * <li>{@link Ext.data.MemoryProxy MemoryProxy} - holds data in memory only, any data is lost when the page is refreshed</li>
 * </ul>
 * 
 * <p>The Server proxies save their data by sending requests to some remote server. These proxies include:</p>
 * 
 * <ul style="list-style-type: disc; padding-left: 25px">
 * <li>{@link Ext.data.AjaxProxy AjaxProxy} - sends requests to a server on the same domain</li>
 * <li>{@link Ext.data.ScriptTagProxy ScriptTagProxy} - uses JSON-P to send requests to a server on a different domain</li>
 * </ul>
 * 
 * <p>Proxies operate on the principle that all operations performed are either Create, Read, Update or Delete. These four operations 
 * are mapped to the methods {@link #create}, {@link #read}, {@link #update} and {@link #destroy} respectively. Each Proxy subclass 
 * implements these functions.</p>
 * 
 * <p>The CRUD methods each expect an {@link Ext.data.Operation Operation} object as the sole argument. The Operation encapsulates 
 * information about the action the Store wishes to perform, the {@link Ext.data.Model model} instances that are to be modified, etc.
 * See the {@link Ext.data.Operation Operation} documentation for more details. Each CRUD method also accepts a callback function to be 
 * called asynchronously on completion.</p>
 * 
 * <p>Proxies also support batching of Operations via a {@link Ext.data.Batch batch} object, invoked by the {@link #batch} method.</p>
 * 
 * @constructor
 * Creates the Proxy
 * @param {Object} config Optional config object
 */
Ext.data.Proxy = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {String} batchOrder
     * Comma-separated ordering 'create', 'update' and 'destroy' actions when batching. Override this
     * to set a different order for the batched CRUD actions to be executed in. Defaults to 'create,update,destroy'
     */
    batchOrder: 'create,update,destroy',
    
    /**
     * @cfg {String} defaultReaderType The default registered reader type. Defaults to 'json'
     * @private
     */
    defaultReaderType: 'json',
    
    /**
     * @cfg {String} defaultWriterType The default registered writer type. Defaults to 'json'
     * @private
     */
    defaultWriterType: 'json',
    
    /**
     * @cfg {String/Ext.data.Model} model The name of the Model to tie to this Proxy. Can be either the string name of
     * the Model, or a reference to the Model constructor. Required.
     */
    
    constructor: function(config) {
        config = config || {};
        
        if (config.model == undefined) {
            delete config.model;
        }

        Ext.data.Proxy.superclass.constructor.call(this, config);
        
        if (this.model != undefined && !(this.model instanceof Ext.data.Model)) {
            this.setModel(this.model);
        }
    },
    
    /**
     * Sets the model associated with this proxy. This will only usually be called by a Store
     * @param {String|Ext.data.Model} model The new model. Can be either the model name string,
     * or a reference to the model's constructor
     * @param {Boolean} setOnStore Sets the new model on the associated Store, if one is present
     */
    setModel: function(model, setOnStore) {
        this.model = Ext.ModelMgr.getModel(model);
        
        var reader = this.reader,
            writer = this.writer;
        
        this.setReader(reader);
        this.setWriter(writer);
        
        if (setOnStore && this.store) {
            this.store.setModel(this.model);
        }
    },
    
    /**
     * Returns the model attached to this Proxy
     * @return {Ext.data.Model} The model
     */
    getModel: function() {
        return this.model;
    },
    
    /**
     * Sets the Proxy's Reader by string, config object or Reader instance
     * @param {String|Object|Ext.data.Reader} reader The new Reader, which can be either a type string, a configuration object
     * or an Ext.data.Reader instance
     * @return {Ext.data.Reader} The attached Reader object
     */
    setReader: function(reader) {
        if (reader == undefined || typeof reader == 'string') {
            reader = {
                type: reader
            };
        }

        if (reader instanceof Ext.data.Reader) {
            reader.setModel(this.model);
        } else {
            Ext.applyIf(reader, {
                proxy: this,
                model: this.model,
                type : this.defaultReaderType
            });

            reader = Ext.data.ReaderMgr.create(reader);
        }
        
        this.reader = reader;
        
        return this.reader;
    },
    
    /**
     * Returns the reader currently attached to this proxy instance
     * @return {Ext.data.Reader} The Reader instance
     */
    getReader: function() {
        return this.reader;
    },
    
    /**
     * Sets the Proxy's Writer by string, config object or Writer instance
     * @param {String|Object|Ext.data.Writer} writer The new Writer, which can be either a type string, a configuration object
     * or an Ext.data.Writer instance
     * @return {Ext.data.Writer} The attached Writer object
     */
    setWriter: function(writer) {
        if (writer == undefined || typeof writer == 'string') {
            writer = {
                type: writer
            };
        }

        if (!(writer instanceof Ext.data.Writer)) {
            Ext.applyIf(writer, {
                model: this.model,
                type : this.defaultWriterType
            });

            writer = Ext.data.WriterMgr.create(writer);
        }
        
        this.writer = writer;
        
        return this.writer;
    },
    
    /**
     * Returns the writer currently attached to this proxy instance
     * @return {Ext.data.Writer} The Writer instance
     */
    getWriter: function() {
        return this.writer;
    },
    
    /**
     * Performs the given create operation.
     * @param {Ext.data.Operation} operation The Operation to perform
     * @param {Function} callback Callback function to be called when the Operation has completed (whether successful or not)
     * @param {Object} scope Scope to execute the callback function in
     */
    create: Ext.emptyFn,
    
    /**
     * Performs the given read operation.
     * @param {Ext.data.Operation} operation The Operation to perform
     * @param {Function} callback Callback function to be called when the Operation has completed (whether successful or not)
     * @param {Object} scope Scope to execute the callback function in
     */
    read: Ext.emptyFn,
    
    /**
     * Performs the given update operation.
     * @param {Ext.data.Operation} operation The Operation to perform
     * @param {Function} callback Callback function to be called when the Operation has completed (whether successful or not)
     * @param {Object} scope Scope to execute the callback function in
     */
    update: Ext.emptyFn,
    
    /**
     * Performs the given destroy operation.
     * @param {Ext.data.Operation} operation The Operation to perform
     * @param {Function} callback Callback function to be called when the Operation has completed (whether successful or not)
     * @param {Object} scope Scope to execute the callback function in
     */
    destroy: Ext.emptyFn,
    
    /**
     * Performs a batch of {@link Ext.data.Operation Operations}, in the order specified by {@link #batchOrder}. Used internally by
     * {@link Ext.data.Store}'s {@link Ext.data.Store#sync sync} method. Example usage:
     * <pre><code>
     * myProxy.batch({
     *     create : [myModel1, myModel2],
     *     update : [myModel3],
     *     destroy: [myModel4, myModel5]
     * });
     * </code></pre>
     * Where the myModel* above are {@link Ext.data.Model Model} instances - in this case 1 and 2 are new instances and have not been 
     * saved before, 3 has been saved previously but needs to be updated, and 4 and 5 have already been saved but should now be destroyed.
     * @param {Object} operations Object containing the Model instances to act upon, keyed by action name
     * @param {Object} listeners Optional listeners object passed straight through to the Batch - see {@link Ext.data.Batch}
     * @return {Ext.data.Batch} The newly created Ext.data.Batch object
     */
    batch: function(operations, listeners) {
        var batch = new Ext.data.Batch({
            proxy: this,
            listeners: listeners || {}
        });
        
        Ext.each(this.batchOrder.split(','), function(action) {
            if (operations[action]) {
                batch.add(new Ext.data.Operation({
                    action : action, 
                    records: operations[action]
                }));
            }
        }, this);
        
        batch.start();
        
        return batch;
    }
});

//backwards compatibility
Ext.data.DataProxy = Ext.data.Proxy;

Ext.data.ProxyMgr.registerType('proxy', Ext.data.Proxy);
/**
 * @author Ed Spencer
 * @class Ext.data.ServerProxy
 * @extends Ext.data.Proxy
 * 
 * <p>ServerProxy is a superclass of {@link Ext.data.ScriptTagProxy ScriptTagProxy} and {@link Ext.data.AjaxProxy AjaxProxy},
 * and would not usually be used directly.</p>
 * 
 * <p>ServerProxy should ideally be named HttpProxy as it is a superclass for all HTTP proxies - for Ext JS 4.x it has been 
 * called ServerProxy to enable any 3.x applications that reference the HttpProxy to continue to work (HttpProxy is now an 
 * alias of AjaxProxy).</p>
 */
Ext.data.ServerProxy = Ext.extend(Ext.data.Proxy, {
    /**
     * @cfg {String} url The URL from which to request the data object.
     */
    
    /**
     * @cfg {Object/String/Ext.data.Reader} reader The Ext.data.Reader to use to decode the server's response. This can
     * either be a Reader instance, a config object or just a valid Reader type name (e.g. 'json', 'xml').
     */
    
    /**
     * @cfg {Object/String/Ext.data.Writer} writer The Ext.data.Writer to use to encode any request sent to the server.
     * This can either be a Writer instance, a config object or just a valid Writer type name (e.g. 'json', 'xml').
     */
    
    /**
     * @cfg {String} pageParam The name of the 'page' parameter to send in a request. Defaults to 'page'. Set this to
     * undefined if you don't want to send a page parameter
     */
    pageParam: 'page',
    
    /**
     * @cfg {String} startParam The name of the 'start' parameter to send in a request. Defaults to 'start'. Set this
     * to undefined if you don't want to send a start parameter
     */
    startParam: 'start',

    /**
     * @cfg {String} limitParam The name of the 'limit' parameter to send in a request. Defaults to 'limit'. Set this
     * to undefined if you don't want to send a limit parameter
     */
    limitParam: 'limit',
    
    /**
     * @cfg {String} groupParam The name of the 'group' parameter to send in a request. Defaults to 'group'. Set this
     * to undefined if you don't want to send a group parameter
     */
    groupParam: 'group',
    
    /**
     * @cfg {String} sortParam The name of the 'sort' parameter to send in a request. Defaults to 'sort'. Set this
     * to undefined if you don't want to send a sort parameter
     */
    sortParam: 'sort',
    
    /**
     * @cfg {String} filterParam The name of the 'filter' parameter to send in a request. Defaults to 'filter'. Set 
     * this to undefined if you don't want to send a filter parameter
     */
    filterParam: 'filter',
    
    /**
     * @cfg {Boolean} noCache (optional) Defaults to true. Disable caching by adding a unique parameter
     * name to the request.
     */
    noCache : true,
    
    /**
     * @cfg {String} cacheString The name of the cache param added to the url when using noCache (defaults to "_dc")
     */
    cacheString: "_dc",
    
    /**
     * @cfg {Number} timeout (optional) The number of milliseconds to wait for a response. Defaults to 30 seconds.
     */
    timeout : 30000,
    
    /**
     * @ignore
     */
    constructor: function(config) {
        config = config || {};
        
        Ext.data.ServerProxy.superclass.constructor.call(this, config);
        
        /**
         * @cfg {Object} extraParams Extra parameters that will be included on every request. Individual requests with params
         * of the same name will override these params when they are in conflict.
         */
        this.extraParams = config.extraParams || {};
        
        //backwards compatibility, will be deprecated in 5.0
        this.nocache = this.noCache;
    },
    
    //in a ServerProxy all four CRUD operations are executed in the same manner, so we delegate to doRequest in each case
    create: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    read: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    update: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    destroy: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    /**
     * Creates and returns an Ext.data.Request object based on the options passed by the {@link Ext.data.Store Store}
     * that this Proxy is attached to.
     * @param {Ext.data.Operation} operation The {@link Ext.data.Operation Operation} object to execute
     * @return {Ext.data.Request} The request object
     */
    buildRequest: function(operation) {
        var params = Ext.applyIf(operation.params || {}, this.extraParams || {});
        
        //copy any sorters, filters etc into the params so they can be sent over the wire
        params = Ext.applyIf(params, this.getParams(params, operation));
        
        var request = new Ext.data.Request({
            params   : params,
            action   : operation.action,
            records  : operation.records,
            operation: operation
        });
        
        request.url = this.buildUrl(request);
        
        /*
         * Save the request on the Operation. Operations don't usually care about Request and Response data, but in the
         * ServerProxy and any of its subclasses we add both request and response as they may be useful for further processing
         */
        operation.request = request;
        
        return request;
    },
    
    /**
     * Encodes the array of {@link Ext.util.Sorter} objects into a string to be sent in the request url. By default, 
     * this simply JSON-encodes the sorter data
     * @param {Array} sorters The array of {@link Ext.util.Sorter Sorter} objects
     * @return {String} The encoded sorters
     */
    encodeSorters: function(sorters) {
        var min = [],
            length = sorters.length,
            i;
        
        for (i = 0; i < length; i++) {
            min[i] = {
                property : sorters[i].property,
                direction: sorters[i].direction
            };
        }
        
        return Ext.encode(min);
    },
    
    /**
     * Encodes the array of {@link Ext.util.Filter} objects into a string to be sent in the request url. By default, 
     * this simply JSON-encodes the filter data
     * @param {Array} sorters The array of {@link Ext.util.Filter Filter} objects
     * @return {String} The encoded filters
     */
    encodeFilters: function(filters) {
        var min = [],
            length = filters.length,
            i;
        
        for (i = 0; i < length; i++) {
            min[i] = {
                property: filters[i].property,
                value   : filters[i].value
            };
        }
        
        return Ext.encode(min);
    },
    
    /**
     * Encodes the grouping object (field and direction) into a string to be sent in the request url. Be default, this
     * simply JSON-encodes the grouping data
     * @param {Object} group The group configuration (field and direction)
     * @return {String} The encoded group string
     */
    encodeGroupers: function(group) {
        return Ext.encode(group);
    },
    
    /**
     * @private
     * Copy any sorters, filters etc into the params so they can be sent over the wire
     */
    getParams: function(params, operation) {
        params = params || {};
        
        var group       = operation.group,
            sorters     = operation.sorters,
            filters     = operation.filters,
            page        = operation.page,
            start       = operation.start,
            limit       = operation.limit,
            
            pageParam   = this.pageParam,
            startParam  = this.startParam,
            limitParam  = this.limitParam,
            groupParam  = this.groupParam,
            sortParam   = this.sortParam,
            filterParam = this.filterParam;
        
        if (pageParam && page) {
            params[pageParam] = page;
        }
        
        if (startParam && start) {
            params[startParam] = start;
        }
        
        if (limitParam && limit) {
            params[limitParam] = limit;
        }
        
        if (groupParam && group && group.field) {
            params[groupParam] = this.encodeGroupers(group);
        }
        
        if (sortParam && sorters && sorters.length > 0) {
            params[sortParam] = this.encodeSorters(sorters);
        }
        
        if (filterParam && filters && filters.length > 0) {
            params[filterParam] = this.encodeFilters(filters);
        }
        
        return params;
    },
    
    /**
     * Generates a url based on a given Ext.data.Request object. By default, ServerProxy's buildUrl will
     * add the cache-buster param to the end of the url. Subclasses may need to perform additional modifications
     * to the url.
     * @param {Ext.data.Request} request The request object
     * @return {String} The url
     */
    buildUrl: function(request) {
        var url = request.url || this.url;
        
        if (!url) {
            throw new Error("You are using a ServerProxy but have not supplied it with a url.");
        }
        
        if (this.noCache) {
            url = Ext.urlAppend(url, Ext.util.Format.format("{0}={1}", this.cacheString, (new Date().getTime())));
        }
        
        return url;
    },
    
    /**
     * In ServerProxy subclasses, the {@link #create}, {@link #read}, {@link #update} and {@link #destroy} methods all pass
     * through to doRequest. Each ServerProxy subclass must implement the doRequest method - see {@link Ext.data.ScriptTagProxy}
     * and {@link Ext.data.AjaxProxy} for examples. This method carries the same signature as each of the methods that delegate to it.
     * @param {Ext.data.Operation} operation The Ext.data.Operation object
     * @param {Function} callback The callback function to call when the Operation has completed
     * @param {Object} scope The scope in which to execute the callback
     */
    doRequest: function(operation, callback, scope) {
        throw new Error("The doRequest function has not been implemented on your Ext.data.ServerProxy subclass. See src/data/ServerProxy.js for details");
    },
    
    /**
     * Optional callback function which can be used to clean up after a request has been completed.
     * @param {Ext.data.Request} request The Request object
     * @param {Boolean} success True if the request was successful
     */
    afterRequest: Ext.emptyFn,
    
    onDestroy: function() {
        Ext.destroy(this.reader, this.writer);
        
        Ext.data.ServerProxy.superclass.destroy.apply(this, arguments);
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.AjaxProxy
 * @extends Ext.data.ServerProxy
 * 
 * <p>AjaxProxy is one of the most widely-used ways of getting data into your application. It uses AJAX requests to 
 * load data from the server, usually to be placed into a {@link Ext.data.Store Store}. Let's take a look at a typical
 * setup. Here we're going to set up a Store that has an AjaxProxy. To prepare, we'll also set up a 
 * {@link Ext.data.Model Model}:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: ['id', 'name', 'email']
});

//The Store contains the AjaxProxy as an inline configuration
var store = new Ext.data.Store({
    model: 'User',
    proxy: {
        type: 'ajax',
        url : 'users.json'
    }
});

store.load();
</code></pre>
 * 
 * <p>Our example is going to load user data into a Store, so we start off by defining a {@link Ext.data.Model Model}
 * with the fields that we expect the server to return. Next we set up the Store itself, along with a {@link #proxy}
 * configuration. This configuration was automatically turned into an Ext.data.AjaxProxy instance, with the url we
 * specified being passed into AjaxProxy's constructor. It's as if we'd done this:</p>
 * 
<pre><code>
new Ext.data.AjaxProxy({
    url: 'users.json',
    model: 'User',
    reader: 'json'
});
</code></pre>
 * 
 * <p>A couple of extra configurations appeared here - {@link #model} and {@link #reader}. These are set by default 
 * when we create the proxy via the Store - the Store already knows about the Model, and Proxy's default 
 * {@link Ext.data.Reader Reader} is {@link Ext.data.JsonReader JsonReader}.</p>
 * 
 * <p>Now when we call store.load(), the AjaxProxy springs into action, making a request to the url we configured
 * ('users.json' in this case). As we're performing a read, it sends a GET request to that url (see {@link #actionMethods}
 * to customize this - by default any kind of read will be sent as a GET request and any kind of write will be sent as a
 * POST request).</p>
 * 
 * <p><u>Limitations</u></p>
 * 
 * <p>AjaxProxy cannot be used to retrieve data from other domains. If your application is running on http://domainA.com
 * it cannot load data from http://domainB.com because browsers have a built-in security policy that prohibits domains
 * talking to each other via AJAX.</p>
 * 
 * <p>If you need to read data from another domain and can't set up a proxy server (some software that runs on your own
 * domain's web server and transparently forwards requests to http://domainB.com, making it look like they actually came
 * from http://domainA.com), you can use {@link Ext.data.ScriptTagProxy} and a technique known as JSON-P (JSON with 
 * Padding), which can help you get around the problem so long as the server on http://domainB.com is set up to support
 * JSON-P responses. See {@link Ext.data.ScriptTagProxy ScriptTagProxy}'s introduction docs for more details.</p>
 * 
 * <p><u>Readers and Writers</u></p>
 * 
 * <p>AjaxProxy can be configured to use any type of {@link Ext.data.Reader Reader} to decode the server's response. If
 * no Reader is supplied, AjaxProxy will default to using a {@link Ext.data.JsonReader JsonReader}. Reader configuration
 * can be passed in as a simple object, which the Proxy automatically turns into a {@link Ext.data.Reader Reader}
 * instance:</p>
 * 
<pre><code>
var proxy = new Ext.data.AjaxProxy({
    model: 'User',
    reader: {
        type: 'xml',
        root: 'users'
    }
});

proxy.getReader(); //returns an {@link Ext.data.XmlReader XmlReader} instance based on the config we supplied
</code></pre>
 * 
 * <p><u>Url generation</u></p>
 * 
 * <p>AjaxProxy automatically inserts any sorting, filtering, paging and grouping options into the url it generates for
 * each request. These are controlled with the following configuration options:</p>
 * 
 * <ul style="list-style-type: disc; padding-left: 20px;">
 *     <li>{@link #pageParam} - controls how the page number is sent to the server 
 *     (see also {@link #startParam} and {@link #limitParam})</li>
 *     <li>{@link #sortParam} - controls how sort information is sent to the server</li>
 *     <li>{@link #groupParam} - controls how grouping information is sent to the server</li>
 *     <li>{@link #filterParam} - controls how filter information is sent to the server</li>
 * </ul>
 * 
 * <p>Each request sent by AjaxProxy is described by an {@link Ext.data.Operation Operation}. To see how we can 
 * customize the generated urls, let's say we're loading the Proxy with the following Operation:</p>
 * 
<pre><code>
var operation = new Ext.data.Operation({
    action: 'read',
    page  : 2
});
</code></pre>
 * 
 * <p>Now we'll issue the request for this Operation by calling {@link #read}:</p>
 * 
<pre><code>
var proxy = new Ext.data.AjaxProxy({
    url: '/users'
});

proxy.read(operation); //GET /users?page=2
</code></pre>
 * 
 * <p>Easy enough - the Proxy just copied the page property from the Operation. We can customize how this page data is
 * sent to the server:</p>
 * 
<pre><code>
var proxy = new Ext.data.AjaxProxy({
    url: '/users',
    pagePage: 'pageNumber'
});

proxy.read(operation); //GET /users?pageNumber=2
</code></pre>
 * 
 * <p>Alternatively, our Operation could have been configured to send start and limit parameters instead of page:</p>
 * 
<pre><code>
var operation = new Ext.data.Operation({
    action: 'read',
    start : 50,
    limit : 25
});

var proxy = new Ext.data.AjaxProxy({
    url: '/users'
});

proxy.read(operation); //GET /users?start=50&limit=25
</code></pre>
 * 
 * <p>Again we can customize this url:</p>
 * 
<pre><code>
var proxy = new Ext.data.AjaxProxy({
    url: '/users',
    startParam: 'startIndex',
    limitParam: 'limitIndex'
});

proxy.read(operation); //GET /users?startIndex=50&limitIndex=25
</code></pre>
 * 
 * <p>AjaxProxy will also send sort and filter information to the server. Let's take a look at how this looks with a
 * more expressive Operation object:</p>
 * 
<pre><code>
var operation = new Ext.data.Operation({
    action: 'read',
    sorters: [
        new Ext.util.Sorter({
            property : 'name',
            direction: 'ASC'
        }),
        new Ext.util.Sorter({
            property : 'age',
            direction: 'DESC'
        })
    ],
    filters: [
        new Ext.util.Filter({
            property: 'eyeColor',
            value   : 'brown'
        })
    ]
});
</code></pre>
 * 
 * <p>This is the type of object that is generated internally when loading a {@link Ext.data.Store Store} with sorters
 * and filters defined. By default the AjaxProxy will JSON encode the sorters and filters, resulting in something like
 * this (note that the url is escaped before sending the request, but is left unescaped here for clarity):</p>
 * 
<pre><code>
var proxy = new Ext.data.AjaxProxy({
    url: '/users'
});

proxy.read(operation); //GET /users?sort=[{"property":"name","direction":"ASC"},{"property":"age","direction":"DESC"}]&filter=[{"property":"eyeColor","value":"brown"}]
</code></pre>
 * 
 * <p>We can again customize how this is created by supplying a few configuration options. Let's say our server is set 
 * up to receive sorting information is a format like "sortBy=name#ASC,age#DESC". We can configure AjaxProxy to provide
 * that format like this:</p>
 * 
 <pre><code>
 var proxy = new Ext.data.AjaxProxy({
     url: '/users',
     sortParam: 'sortBy',
     filterParam: 'filterBy',

     //our custom implementation of sorter encoding - turns our sorters into "name#ASC,age#DESC"
     encodeSorters: function(sorters) {
         var length   = sorters.length,
             sortStrs = [],
             sorter, i;

         for (i = 0; i < length; i++) {
             sorter = sorters[i];

             sortStrs[i] = sorter.property + '#' + sorter.direction
         }

         return sortStrs.join(",");
     }
 });

 proxy.read(operation); //GET /users?sortBy=name#ASC,age#DESC&filterBy=[{"property":"eyeColor","value":"brown"}]
 </code></pre>
 * 
 * <p>We can also provide a custom {@link #encodeFilters} function to encode our filters.</p>
 * 
 * @constructor
 * 
 * <p>Note that if this HttpProxy is being used by a {@link Ext.data.Store Store}, then the
 * Store's call to {@link #load} will override any specified <tt>callback</tt> and <tt>params</tt>
 * options. In this case, use the Store's {@link Ext.data.Store#events events} to modify parameters,
 * or react to loading events. The Store's {@link Ext.data.Store#baseParams baseParams} may also be
 * used to pass parameters known at instantiation time.</p>
 * 
 * <p>If an options parameter is passed, the singleton {@link Ext.Ajax} object will be used to make
 * the request.</p>
 */
Ext.data.AjaxProxy = Ext.extend(Ext.data.ServerProxy, {
    /**
     * @property actionMethods
     * Mapping of action name to HTTP request method. In the basic AjaxProxy these are set to 'GET' for 'read' actions and 'POST' 
     * for 'create', 'update' and 'destroy' actions. The {@link Ext.data.RestProxy} maps these to the correct RESTful methods.
     */
    actionMethods: {
        create : 'POST',
        read   : 'GET',
        update : 'POST',
        destroy: 'POST'
    },
    
    /**
     * @cfg {Object} headers Any headers to add to the Ajax request. Defaults to <tt>undefined</tt>.
     */
    
    constructor: function() {
        this.addEvents(
            /**
             * @event exception
             * Fires when the server returns an exception
             * @param {Ext.data.Proxy} this
             * @param {Object} response The response from the AJAX request
             * @param {Ext.data.Operation} operation The operation that triggered request
             */
            'exception'
        );
        
        Ext.data.AjaxProxy.superclass.constructor.apply(this, arguments);    
    },
    
    /**
     * @ignore
     */
    doRequest: function(operation, callback, scope) {
        var writer  = this.getWriter(),
            request = this.buildRequest(operation, callback, scope);
            
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        
        Ext.apply(request, {
            headers       : this.headers,
            timeout       : this.timeout,
            scope         : this,
            callback      : this.createRequestCallback(request, operation, callback, scope),
            method        : this.getMethod(request),
            disableCaching: false // explicitly set it to false, ServerProxy handles caching
        });
        
        Ext.Ajax.request(request);
        
        return request;
    },
    
    /**
     * Returns the HTTP method name for a given request. By default this returns based on a lookup on {@link #actionMethods}.
     * @param {Ext.data.Request} request The request object
     * @return {String} The HTTP method to use (should be one of 'GET', 'POST', 'PUT' or 'DELETE')
     */
    getMethod: function(request) {
        return this.actionMethods[request.action];
    },
    
    /**
     * @private
     * TODO: This is currently identical to the ScriptTagProxy version except for the return function's signature. There is a lot
     * of code duplication inside the returned function so we need to find a way to DRY this up.
     * @param {Ext.data.Request} request The Request object
     * @param {Ext.data.Operation} operation The Operation being executed
     * @param {Function} callback The callback function to be called when the request completes. This is usually the callback
     * passed to doRequest
     * @param {Object} scope The scope in which to execute the callback function
     * @return {Function} The callback function
     */
    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;
        
        return function(options, success, response) {
            if (success === true) {
                var reader  = me.getReader(),
                    result  = reader.read(response),
                    records = result.records,
                    length  = records.length,
                    mc      = new Ext.util.MixedCollection(true, function(r) {return r.getId();}),
                    record, i;
                
                mc.addAll(operation.records);
                for (i = 0; i < length; i++) {
                    record = mc.get(records[i].getId());
                    
                    if (record) {
                        record.set(record.data);
                    }
                }

                //see comment in buildRequest for why we include the response object here
                Ext.apply(operation, {
                    response : response,
                    resultSet: result
                });
                
                operation.setCompleted();
                operation.setSuccessful();
            } else {
                me.fireEvent('exception', this, response, operation);
                
                //TODO: extract error message from reader
                operation.setException();                
            }
            
            //this callback is the one that was passed to the 'read' or 'write' function above
            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }
            
            me.afterRequest(request, true);
        };
    }
});

Ext.data.ProxyMgr.registerType('ajax', Ext.data.AjaxProxy);

//backwards compatibility, remove in Ext JS 5.0
Ext.data.HttpProxy = Ext.data.AjaxProxy;
/**
 * @author Ed Spencer
 * @class Ext.data.RestProxy
 * @extends Ext.data.AjaxProxy
 * 
 * <p>RestProxy is a specialization of the {@link Ext.data.AjaxProxy AjaxProxy} which simply maps the four actions 
 * (create, read, update and destroy) to RESTful HTTP verbs. For example, let's set up a {@link Ext.data.Model Model}
 * with an inline RestProxy</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: ['id', 'name', 'email'],

    proxy: {
        type: 'rest',
        url : '/users'
    }
});
</code></pre>
 * 
 * <p>Now we can create a new User instance and save it via the RestProxy. Doing this will cause the Proxy to send a
 * POST request to '/users':
 * 
<pre><code>
var user = Ext.ModelMgr.create({name: 'Ed Spencer', email: 'ed@sencha.com'}, 'User');

user.save(); //POST /users
</code></pre>
 * 
 * <p>Let's expand this a little and provide a callback for the {@link Ext.data.Model#save} call to update the Model
 * once it has been created. We'll assume the creation went successfully and that the server gave this user an ID of 
 * 123:</p>
 * 
<pre><code>
user.save({
    success: function(user) {
        user.set('name', 'Khan Noonien Singh');

        user.save(); //PUT /users/123
    }
});
</code></pre>
 * 
 * <p>Now that we're no longer creating a new Model instance, the request method is changed to an HTTP PUT, targeting
 * the relevant url for that user. Now let's delete this user, which will use the DELETE method:</p>
 * 
<pre><code>
    user.destroy(); //DELETE /users/123
</code></pre>
 * 
 * <p>Finally, when we perform a load of a Model or Store, RestProxy will use the GET method:</p>
 * 
<pre><code>
//1. Load via Store

//the Store automatically picks up the Proxy from the User model
var store = new Ext.data.Store({
    model: 'User'
});

store.load(); //GET /users

//2. Load directly from the Model

//GET /users/123
Ext.ModelMgr.getModel('User').load(123, {
    success: function(user) {
        console.log(user.getId()); //outputs 123
    }
});
</code></pre>
 * 
 * <p><u>Url generation</u></p>
 * 
 * <p>RestProxy is able to automatically generate the urls above based on two configuration options - {@link #appendId}
 * and {@link #format}. If appendId is true (it is by default) then RestProxy will automatically append the ID of the 
 * Model instance in question to the configured url, resulting in the '/users/123' that we saw above.</p>
 * 
 * <p>If the request is not for a specific Model instance (e.g. loading a Store), the url is not appended with an id. 
 * RestProxy will automatically insert a '/' before the ID if one is not already present.</p>
 * 
<pre><code>
new Ext.data.RestProxy({
    url: '/users',
    appendId: true //default
});

// Collection url: /users
// Instance url  : /users/123
</code></pre>
 * 
 * <p>RestProxy can also optionally append a format string to the end of any generated url:</p>
 * 
<pre><code>
new Ext.data.RestProxy({
    url: '/users',
    format: 'json'
});

// Collection url: /users.json
// Instance url  : /users/123.json
</code></pre>
 * 
 * <p>If further customization is needed, simply implement the {@link #buildUrl} method and add your custom generated
 * url onto the {@link Ext.data.Request Request} object that is passed to buildUrl. See 
 * <a href="source/RestProxy.html#method-Ext.data.RestProxy-buildUrl">RestProxy's implementation</a> for an example of
 * how to achieve this.</p>
 * 
 * <p>Note that RestProxy inherits from {@link Ext.data.AjaxProxy AjaxProxy}, which already injects all of the sorter,
 * filter, group and paging options into the generated url. See the {@link Ext.data.AjaxProxy AjaxProxy docs} for more
 * details.</p>
 */
Ext.data.RestProxy = Ext.extend(Ext.data.AjaxProxy, {
    /**
     * @cfg {Boolean} appendId True to automatically append the ID of a Model instance when performing a request based
     * on that single instance. See RestProxy intro docs for more details. Defaults to true.
     */
    appendId: true,
    
    /**
     * @cfg {String} format Optional data format to send to the server when making any request (e.g. 'json'). See the
     * RestProxy intro docs for full details. Defaults to undefined.
     */
    
    /**
     * Mapping of action name to HTTP request method. These default to RESTful conventions for the 'create', 'read',
     * 'update' and 'destroy' actions (which map to 'POST', 'GET', 'PUT' and 'DELETE' respectively). This object should
     * not be changed except globally via {@link Ext.override} - the {@link #getMethod} function can be overridden instead.
     * @property actionMethods
     * @type Object
     */
    actionMethods: {
        create : 'POST',
        read   : 'GET',
        update : 'PUT',
        destroy: 'DELETE'
    },
    
    api: {
        create : 'create',
        read   : 'read',
        update : 'update',
        destroy: 'destroy'
    },
    
    /**
     * Specialized version of buildUrl that incorporates the {@link #appendId} and {@link #format} options into the
     * generated url. Override this to provide further customizations, but remember to call the superclass buildUrl
     * so that additional parameters like the cache buster string are appended
     */
    buildUrl: function(request) {
        var records = request.operation.records || [],
            record  = records[0],
            format  = this.format,
            url     = request.url || this.url;
        
        if (this.appendId && record) {
            if (!url.match(/\/$/)) {
                url += '/';
            }
            
            url += record.getId();
        }
        
        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }
            
            url += format;
        }
        
        request.url = url;
        
        return Ext.data.RestProxy.superclass.buildUrl.apply(this, arguments);
    }
});

Ext.data.ProxyMgr.registerType('rest', Ext.data.RestProxy);
Ext.apply(Ext, {
    /**
     * Returns the current document body as an {@link Ext.Element}.
     * @ignore
     * @member Ext
     * @return Ext.Element The document body
     */
    getHead : function() {
        var head;
        
        return function() {
            if (head == undefined) {
                head = Ext.get(document.getElementsByTagName("head")[0]);
            }
            
            return head;
        };
    }()
});

/**
 * @author Ed Spencer
 * @class Ext.data.ScriptTagProxy
 * @extends Ext.data.ServerProxy
 * 
 * <p>ScriptTagProxy is useful when you need to load data from a domain other than the one your application is running
 * on. If your application is running on http://domainA.com it cannot use {@link Ext.data.AjaxProxy Ajax} to load its
 * data from http://domainB.com because cross-domain ajax requests are prohibited by the browser.</p>
 * 
 * <p>We can get around this using a ScriptTagProxy. ScriptTagProxy injects a &lt;script&gt; tag into the DOM whenever
 * an AJAX request would usually be made. Let's say we want to load data from http://domainB.com/users - the script tag
 * that would be injected might look like this:</p>
 * 
<pre><code>
&lt;script src="http://domainB.com/users?callback=someCallback"&gt;&lt;/script&gt;
</code></pre>
 * 
 * <p>When we inject the tag above, the browser makes a request to that url and includes the response as if it was any
 * other type of JavaScript include. By passing a callback in the url above, we're telling domainB's server that we
 * want to be notified when the result comes in and that it should call our callback function with the data it sends 
 * back. So long as the server formats the response to look like this, everything will work:</p>
 * 
<pre><code>
someCallback({
    users: [
        {
            id: 1,
            name: "Ed Spencer",
            email: "ed@sencha.com"
        }
    ]
});
</code></pre>
 * 
 * <p>As soon as the script finishes loading, the 'someCallback' function that we passed in the url is called with the
 * JSON object that the server returned.</p>
 * 
 * <p>ScriptTagProxy takes care of all of this automatically. It formats the url you pass, adding the callback 
 * parameter automatically. It even creates a temporary callback function, waits for it to be called and then puts
 * the data into the Proxy making it look just like you loaded it through a normal {@link Ext.data.AjaxProxy AjaxProxy}.
 * Here's how we might set that up:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: ['id', 'name', 'email']
});

var store = new Ext.data.Store({
    model: 'User',
    proxy: {
        type: 'scripttag',
        url : 'http://domainB.com/users'
    }
});

store.load();
</code></pre>
 * 
 * <p>That's all we need to do - ScriptTagProxy takes care of the rest. In this case the Proxy will have injected a 
 * script tag like this:
 * 
<pre><code>
&lt;script src="http://domainB.com/users?callback=stcCallback001" id="stcScript001"&gt;&lt;/script&gt;
</code></pre>
 * 
 * <p><u>Customization</u></p>
 * 
 * <p>Most parts of this script tag can be customized using the {@link #callbackParam}, {@link #callbackPrefix} and 
 * {@link #scriptIdPrefix} configurations. For example:
 * 
<pre><code>
var store = new Ext.data.Store({
    model: 'User',
    proxy: {
        type: 'scripttag',
        url : 'http://domainB.com/users',
        callbackParam: 'theCallbackFunction',
        callbackPrefix: 'ABC',
        scriptIdPrefix: 'injectedScript'
    }
});

store.load();
</code></pre>
 * 
 * <p>Would inject a script tag like this:</p>
 * 
<pre><code>
&lt;script src="http://domainB.com/users?theCallbackFunction=ABC001" id="injectedScript001"&gt;&lt;/script&gt;
</code></pre>
 * 
 * <p><u>Implementing on the server side</u></p>
 * 
 * <p>The remote server side needs to be configured to return data in this format. Here are suggestions for how you 
 * might achieve this using Java, PHP and ASP.net:</p>
 * 
 * <p>Java:</p>
 * 
<pre><code>
boolean scriptTag = false;
String cb = request.getParameter("callback");
if (cb != null) {
    scriptTag = true;
    response.setContentType("text/javascript");
} else {
    response.setContentType("application/x-json");
}
Writer out = response.getWriter();
if (scriptTag) {
    out.write(cb + "(");
}
out.print(dataBlock.toJsonString());
if (scriptTag) {
    out.write(");");
}
</code></pre>
 * 
 * <p>PHP:</p>
 * 
<pre><code>
$callback = $_REQUEST['callback'];

// Create the output object.
$output = array('a' => 'Apple', 'b' => 'Banana');

//start output
if ($callback) {
    header('Content-Type: text/javascript');
    echo $callback . '(' . json_encode($output) . ');';
} else {
    header('Content-Type: application/x-json');
    echo json_encode($output);
}
</code></pre>
 * 
 * <p>ASP.net:</p>
 * 
<pre><code>
String jsonString = "{success: true}";
String cb = Request.Params.Get("callback");
String responseString = "";
if (!String.IsNullOrEmpty(cb)) {
    responseString = cb + "(" + jsonString + ")";
} else {
    responseString = jsonString;
}
Response.Write(responseString);
</code></pre>
 *
 */
Ext.data.ScriptTagProxy = Ext.extend(Ext.data.ServerProxy, {
    defaultWriterType: 'base',
    
    /**
     * @cfg {String} callbackParam (Optional) The name of the parameter to pass to the server which tells
     * the server the name of the callback function set up by the load call to process the returned data object.
     * Defaults to "callback".<p>The server-side processing must read this parameter value, and generate
     * javascript output which calls this named function passing the data object as its only parameter.
     */
    callbackParam : "callback",
    
    /**
     * @cfg {String} scriptIdPrefix
     * The prefix string that is used to create a unique ID for the injected script tag element (defaults to 'stcScript')
     */
    scriptIdPrefix: 'stcScript',
    
    /**
     * @cfg {String} callbackPrefix
     * The prefix string that is used to create a unique callback function name in the global scope. This can optionally
     * be modified to give control over how the callback string passed to the remote server is generated. Defaults to 'stcCallback'
     */
    callbackPrefix: 'stcCallback',
    
    /**
     * @cfg {String} recordParam
     * The param name to use when passing records to the server (e.g. 'records=someEncodedRecordString').
     * Defaults to 'records'
     */
    recordParam: 'records',
    
    /**
     * Reference to the most recent request made through this Proxy. Used internally to clean up when the Proxy is destroyed
     * @property lastRequest 
     * @type Ext.data.Request
     */
    lastRequest: undefined,
    
    /**
     * @cfg {Boolean} autoAppendParams True to automatically append the request's params to the generated url. Defaults to true
     */
    autoAppendParams: true,
    
    constructor: function(){
        this.addEvents(
            /**
             * @event exception
             * Fires when the server returns an exception
             * @param {Ext.data.Proxy} this
             * @param {Ext.data.Request} request The request that was sent
             * @param {Ext.data.Operation} operation The operation that triggered the request
             */
            'exception'
        );
        
        Ext.data.ScriptTagProxy.superclass.constructor.apply(this, arguments);    
    },

    /**
     * @private
     * Performs the read request to the remote domain. ScriptTagProxy does not actually create an Ajax request,
     * instead we write out a <script> tag based on the configuration of the internal Ext.data.Request object
     * @param {Ext.data.Operation} operation The {@link Ext.data.Operation Operation} object to execute
     * @param {Function} callback A callback function to execute when the Operation has been completed
     * @param {Object} scope The scope to execute the callback in
     */
    doRequest: function(operation, callback, scope) {
        //generate the unique IDs for this request
        var format     = Ext.util.Format.format,
            transId    = ++Ext.data.ScriptTagProxy.TRANS_ID,
            scriptId   = format("{0}{1}", this.scriptIdPrefix, transId),
            stCallback = format("{0}{1}", this.callbackPrefix, transId);
        
        var writer  = this.getWriter(),
            request = this.buildRequest(operation),
            //FIXME: ideally this would be in buildUrl, but we don't know the stCallback name at that point
            url     = Ext.urlAppend(request.url, format("{0}={1}", this.callbackParam, stCallback));
            
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        
        //apply ScriptTagProxy-specific attributes to the Request
        Ext.apply(request, {
            url       : url,
            transId   : transId,
            scriptId  : scriptId,
            stCallback: stCallback
        });
        
        //if the request takes too long this timeout function will cancel it
        request.timeoutId = Ext.defer(this.createTimeoutHandler, this.timeout, this, [request, operation]);
        
        //this is the callback that will be called when the request is completed
        window[stCallback] = this.createRequestCallback(request, operation, callback, scope);
        
        //create the script tag and inject it into the document
        var script = document.createElement("script");
        script.setAttribute("src", url);
        script.setAttribute("async", true);
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id", scriptId);
        
        Ext.getHead().appendChild(script);
        operation.setStarted();
        
        this.lastRequest = request;
        
        return request;
    },
    
    /**
     * @private
     * Creates and returns the function that is called when the request has completed. The returned function
     * should accept a Response object, which contains the response to be read by the configured Reader.
     * The third argument is the callback that should be called after the request has been completed and the Reader has decoded
     * the response. This callback will typically be the callback passed by a store, e.g. in proxy.read(operation, theCallback, scope)
     * theCallback refers to the callback argument received by this function.
     * See {@link #doRequest} for details.
     * @param {Ext.data.Request} request The Request object
     * @param {Ext.data.Operation} operation The Operation being executed
     * @param {Function} callback The callback function to be called when the request completes. This is usually the callback
     * passed to doRequest
     * @param {Object} scope The scope in which to execute the callback function
     * @return {Function} The callback function
     */
    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;
        
        return function(response) {
            var reader = me.getReader(),
                result = reader.read(response);
            
            //see comment in buildRequest for why we include the response object here
            Ext.apply(operation, {
                response : response,
                resultSet: result
            });
            
            operation.setCompleted();
            operation.setSuccessful();
            
            //this callback is the one that was passed to the 'read' or 'write' function above
            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }
            
            me.afterRequest(request, true);
        };
    },
    
    /**
     * Cleans up after a completed request by removing the now unnecessary script tag from the DOM. Also removes the 
     * global JSON-P callback function.
     * @param {Ext.data.Request} request The request object
     * @param {Boolean} isLoaded True if the request completed successfully
     */
    afterRequest: function() {
        var cleanup = function(functionName) {
            return function() {
                window[functionName] = undefined;
                
                try {
                    delete window[functionName];
                } catch(e) {}
            };
        };
        
        return function(request, isLoaded) {
            Ext.get(request.scriptId).remove();
            clearTimeout(request.timeoutId);
            
            var callbackName = request.stCallback;
            
            if (isLoaded) {
                cleanup(callbackName)();
                this.lastRequest.completed = true;
            } else {
                // if we haven't loaded yet, the callback might still be called in the future so don't unset it immediately
                window[callbackName] = cleanup(callbackName);
            }
        };
    }(),
    
    /**
     * Generates a url based on a given Ext.data.Request object. Adds the params and callback function name to the url
     * @param {Ext.data.Request} request The request object
     * @return {String} The url
     */
    buildUrl: function(request) {
        var url     = Ext.data.ScriptTagProxy.superclass.buildUrl.call(this, request),  
            params  = Ext.apply({}, request.params),
            filters = params.filters,
            filter, i;
            
        delete params.filters;
        
        if (this.autoAppendParams) {
            url = Ext.urlAppend(url, Ext.urlEncode(params));
        }
        
        if (filters && filters.length) {
            for (i = 0; i < filters.length; i++) {
                filter = filters[i];
                
                if (filter.value) {
                    url = Ext.urlAppend(url, filter.property + "=" + filter.value);
                }
            }
        }
        
        //if there are any records present, append them to the url also
        var records = request.records;
        
        if (Ext.isArray(records) && records.length > 0) {
            url = Ext.urlAppend(url, Ext.util.Format.format("{0}={1}", this.recordParam, this.encodeRecords(records)));
        }
        
        return url;
    },
    
    //inherit docs
    destroy: function() {
        this.abort();
        
        Ext.data.ScriptTagProxy.superclass.destroy.apply(this, arguments);
    },
        
    /**
     * @private
     * @return {Boolean} True if there is a current request that hasn't completed yet
     */
    isLoading : function(){
        var lastRequest = this.lastRequest;
        
        return (lastRequest != undefined && !lastRequest.completed);
    },
    
    /**
     * Aborts the current server request if one is currently running
     */
    abort: function() {
        if (this.isLoading()) {
            this.afterRequest(this.lastRequest);
        }
    },
        
    /**
     * Encodes an array of records into a string suitable to be appended to the script src url. This is broken
     * out into its own function so that it can be easily overridden.
     * @param {Array} records The records array
     * @return {String} The encoded records string
     */
    encodeRecords: function(records) {
        var encoded = "";
        
        for (var i = 0, length = records.length; i < length; i++) {
            encoded += Ext.urlEncode(records[i].data);
        }
        
        return encoded;
    },
    
    /**
     * @private
     * Starts a timer with the value of this.timeout - if this fires it means the request took too long so we
     * cancel the request. If the request was successful this timer is cancelled by this.afterRequest
     * @param {Ext.data.Request} request The Request to handle
     */
    createTimeoutHandler: function(request, operation) {
        this.afterRequest(request, false);

        this.fireEvent('exception', this, request, operation);
        
        if (typeof request.callback == 'function') {
            request.callback.call(request.scope || window, null, request.options, false);
        }        
    }
});

Ext.data.ScriptTagProxy.TRANS_ID = 1000;

Ext.data.ProxyMgr.registerType('scripttag', Ext.data.ScriptTagProxy);
/**
 * @author Ed Spencer
 * @class Ext.data.ClientProxy
 * @extends Ext.data.Proxy
 * 
 * <p>Base class for any client-side storage. Used as a superclass for {@link Ext.data.MemoryProxy Memory} and 
 * {@link Ext.data.WebStorageProxy Web Storage} proxies. Do not use directly, use one of the subclasses instead.</p>
 */
Ext.data.ClientProxy = Ext.extend(Ext.data.Proxy, {
    /**
     * Abstract function that must be implemented by each ClientProxy subclass. This should purge all record data
     * from the client side storage, as well as removing any supporting data (such as lists of record IDs)
     */
    clear: function() {
        throw new Error("The Ext.data.ClientProxy subclass that you are using has not defined a 'clear' function. See src/data/ClientProxy.js for details.");
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.MemoryProxy
 * @extends Ext.data.ClientProxy
 * 
 * <p>In-memory proxy. This proxy simply uses a local variable for data storage/retrieval, so its contents are lost on
 * every page refresh.</p>
 * 
 * <p>Usually this Proxy isn't used directly, serving instead as a helper to a {@link Ext.data.Store Store} where a 
 * reader is required to load data. For example, say we have a Store for a User model and have some inline data we want
 * to load, but this data isn't in quite the right format: we can use a MemoryProxy with a JsonReader to read it into 
 * our Store:</p>
 * 
<pre><code>
//this is the model we will be using in the store
Ext.regModel('User', {
    fields: [
        {name: 'id',    type: 'int'},
        {name: 'name',  type: 'string'},
        {name: 'phone', type: 'string', mapping: 'phoneNumber'}
    ]
});

//this data does not line up to our model fields - the phone field is called phoneNumber
var data = {
    users: [
        {
            id: 1,
            name: 'Ed Spencer',
            phoneNumber: '555 1234'
        },
        {
            id: 2,
            name: 'Abe Elias',
            phoneNumber: '666 1234'
        }
    ]
};

//note how we set the 'root' in the reader to match the data structure above
var store = new Ext.data.Store({
    autoLoad: true,
    model: 'User',
    data : data,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'users'
        }
    }
});
</code></pre>
 */
Ext.data.MemoryProxy = Ext.extend(Ext.data.ClientProxy, {
    /**
     * @cfg {Array} data Optional array of Records to load into the Proxy
     */
    
    constructor: function(config) {
        Ext.data.MemoryProxy.superclass.constructor.call(this, config);
        
        //ensures that the reader has been instantiated properly
        this.setReader(this.reader);
    },
    
    /**
     * Reads data from the configured {@link #data} object. Uses the Proxy's {@link #reader}, if present
     * @param {Ext.data.Operation} operation The read Operation
     * @param {Function} callback The callback to call when reading has completed
     * @param {Object} scope The scope to call the callback function in
     */
    read: function(operation, callback, scope) {
        var reader = this.getReader(),
            result = reader.read(this.data);

        Ext.apply(operation, {
            resultSet: result
        });
        
        operation.setCompleted();
        
        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },
    
    clear: Ext.emptyFn
});

Ext.data.ProxyMgr.registerType('memory', Ext.data.MemoryProxy);
/**
 * @author Ed Spencer
 * @class Ext.data.WebStorageProxy
 * @extends Ext.data.ClientProxy
 * 
 * <p>WebStorageProxy is simply a superclass for the {@link Ext.data.LocalStorageProxy localStorage} and 
 * {@link Ext.data.SessionStorageProxy sessionStorage} proxies. It uses the new HTML5 key/value client-side storage 
 * objects to save {@link Ext.data.Model model instances} for offline use.</p>
 * 
 * @constructor
 * Creates the proxy, throws an error if local storage is not supported in the current browser
 * @param {Object} config Optional config object
 */
Ext.data.WebStorageProxy = Ext.extend(Ext.data.ClientProxy, {
    /**
     * @cfg {String} id The unique ID used as the key in which all record data are stored in the local storage object
     */
    id: undefined,

    /**
     * @ignore
     */
    constructor: function(config) {
        Ext.data.WebStorageProxy.superclass.constructor.call(this, config);
        
        /**
         * Cached map of records already retrieved by this Proxy - ensures that the same instance is always retrieved
         * @property cache
         * @type Object
         */
        this.cache = {};

        if (this.getStorageObject() == undefined) {
            throw "Local Storage is not supported in this browser, please use another type of data proxy";
        }

        //if an id is not given, try to use the store's id instead
        this.id = this.id || (this.store ? this.store.storeId : undefined);

        if (this.id == undefined) {
            throw "No unique id was provided to the local storage proxy. See Ext.data.LocalStorageProxy documentation for details";
        }

        this.initialize();
    },

    //inherit docs
    create: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            ids     = this.getIds(),
            id, record, i;
        
        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];

            if (record.phantom) {
                record.phantom = false;
                id = this.getNextId();
            } else {
                id = record.getId();
            }

            this.setRecord(record, id);
            ids.push(id);
        }

        this.setIds(ids);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    //inherit docs
    read: function(operation, callback, scope) {
        //TODO: respect sorters, filters, start and limit options on the Operation

        var records = [],
            ids     = this.getIds(),
            length  = ids.length,
            i, recordData, record;
        
        //read a single record
        if (operation.id) {
            record = this.getRecord(operation.id);
            
            if (record) {
                records.push(record);
                operation.setSuccessful();
            }
        } else {
            for (i = 0; i < length; i++) {
                records.push(this.getRecord(ids[i]));
            }
            operation.setSuccessful();
        }
        
        operation.setCompleted();

        operation.resultSet = new Ext.data.ResultSet({
            records: records,
            total  : records.length,
            loaded : true
        });

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    //inherit docs
    update: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            ids     = this.getIds(),
            record, id, i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record);
            
            //we need to update the set of ids here because it's possible that a non-phantom record was added
            //to this proxy - in which case the record's id would never have been added via the normal 'create' call
            id = record.getId();
            if (id !== undefined && ids.indexOf(id) == -1) {
                ids.push(id);
            }
        }
        this.setIds(ids);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    //inherit
    destroy: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            ids     = this.getIds(),

            //newIds is a copy of ids, from which we remove the destroyed records
            newIds  = [].concat(ids),
            i;

        for (i = 0; i < length; i++) {
            newIds.remove(records[i].getId());
            this.removeRecord(records[i], false);
        }

        this.setIds(newIds);

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    /**
     * @private
     * Fetches a model instance from the Proxy by ID. Runs each field's decode function (if present) to decode the data
     * @param {String} id The record's unique ID
     * @return {Ext.data.Model} The model instance
     */
    getRecord: function(id) {
        if (this.cache[id] == undefined) {
            var rawData = Ext.decode(this.getStorageObject().getItem(this.getRecordKey(id))),
                data    = {},
                Model   = this.model,
                fields  = Model.prototype.fields.items,
                length  = fields.length,
                i, field, name, record;

            for (i = 0; i < length; i++) {
                field = fields[i];
                name  = field.name;

                if (typeof field.decode == 'function') {
                    data[name] = field.decode(rawData[name]);
                } else {
                    data[name] = rawData[name];
                }
            }

            record = new Model(data, id);
            record.phantom = false;

            this.cache[id] = record;
        }
        
        return this.cache[id];
    },

    /**
     * Saves the given record in the Proxy. Runs each field's encode function (if present) to encode the data
     * @param {Ext.data.Model} record The model instance
     * @param {String} id The id to save the record under (defaults to the value of the record's getId() function)
     */
    setRecord: function(record, id) {
        if (id) {
            record.setId(id);
        } else {
            id = record.getId();
        }

        var rawData = record.data,
            data    = {},
            model   = this.model,
            fields  = model.prototype.fields.items,
            length  = fields.length,
            i, field, name;

        for (i = 0; i < length; i++) {
            field = fields[i];
            name  = field.name;

            if (typeof field.encode == 'function') {
                data[name] = field.encode(rawData[name], record);
            } else {
                data[name] = rawData[name];
            }
        }

        var obj = this.getStorageObject(),
            key = this.getRecordKey(id);
        
        //keep the cache up to date
        this.cache[id] = record;
        
        //iPad bug requires that we remove the item before setting it
        obj.removeItem(key);
        obj.setItem(key, Ext.encode(data));
    },

    /**
     * @private
     * Physically removes a given record from the local storage. Used internally by {@link #destroy}, which you should
     * use instead because it updates the list of currently-stored record ids
     * @param {String|Number|Ext.data.Model} id The id of the record to remove, or an Ext.data.Model instance
     */
    removeRecord: function(id, updateIds) {
        if (id instanceof Ext.data.Model) {
            id = id.getId();
        }

        if (updateIds !== false) {
            var ids = this.getIds();
            ids.remove(id);
            this.setIds(ids);
        }

        this.getStorageObject().removeItem(this.getRecordKey(id));
    },

    /**
     * @private
     * Given the id of a record, returns a unique string based on that id and the id of this proxy. This is used when
     * storing data in the local storage object and should prevent naming collisions.
     * @param {String|Number|Ext.data.Model} id The record id, or a Model instance
     * @return {String} The unique key for this record
     */
    getRecordKey: function(id) {
        if (id instanceof Ext.data.Model) {
            id = id.getId();
        }

        return Ext.util.Format.format("{0}-{1}", this.id, id);
    },

    /**
     * @private
     * Returns the unique key used to store the current record counter for this proxy. This is used internally when
     * realizing models (creating them when they used to be phantoms), in order to give each model instance a unique id.
     * @return {String} The counter key
     */
    getRecordCounterKey: function() {
        return Ext.util.Format.format("{0}-counter", this.id);
    },

    /**
     * @private
     * Returns the array of record IDs stored in this Proxy
     * @return {Array} The record IDs. Each is cast as a Number
     */
    getIds: function() {
        var ids    = (this.getStorageObject().getItem(this.id) || "").split(","),
            length = ids.length,
            i;

        if (length == 1 && ids[0] == "") {
            ids = [];
        } else {
            for (i = 0; i < length; i++) {
                ids[i] = parseInt(ids[i], 10);
            }
        }

        return ids;
    },

    /**
     * @private
     * Saves the array of ids representing the set of all records in the Proxy
     * @param {Array} ids The ids to set
     */
    setIds: function(ids) {
        var obj = this.getStorageObject(),
            str = ids.join(",");
        
        obj.removeItem(this.id);
        
        if (!Ext.isEmpty(str)) {
            obj.setItem(this.id, str);
        }
    },

    /**
     * @private
     * Returns the next numerical ID that can be used when realizing a model instance (see getRecordCounterKey). Increments
     * the counter.
     * @return {Number} The id
     */
    getNextId: function() {
        var obj  = this.getStorageObject(),
            key  = this.getRecordCounterKey(),
            last = obj[key],
            ids, id;
        
        if (last == undefined) {
            ids = this.getIds();
            last = ids[ids.length - 1] || 0;
        }
        
        id = parseInt(last, 10) + 1;
        obj.setItem(key, id);
        
        return id;
    },

    /**
     * @private
     * Sets up the Proxy by claiming the key in the storage object that corresponds to the unique id of this Proxy. Called
     * automatically by the constructor, this should not need to be called again unless {@link #clear} has been called.
     */
    initialize: function() {
        var storageObject = this.getStorageObject();
        storageObject.setItem(this.id, storageObject.getItem(this.id) || "");
    },

    /**
     * Destroys all records stored in the proxy and removes all keys and values used to support the proxy from the storage object
     */
    clear: function() {
        var obj = this.getStorageObject(),
            ids = this.getIds(),
            len = ids.length,
            i;

        //remove all the records
        for (i = 0; i < len; i++) {
            this.removeRecord(ids[i]);
        }

        //remove the supporting objects
        obj.removeItem(this.getRecordCounterKey());
        obj.removeItem(this.id);
    },

    /**
     * @private
     * Abstract function which should return the storage object that data will be saved to. This must be implemented
     * in each subclass.
     * @return {Object} The storage object
     */
    getStorageObject: function() {
        throw new Error("The getStorageObject function has not been defined in your Ext.data.WebStorageProxy subclass");
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.LocalStorageProxy
 * @extends Ext.data.WebStorageProxy
 * 
 * <p>The LocalStorageProxy uses the new HTML5 localStorage API to save {@link Ext.data.Model Model} data locally on
 * the client browser. HTML5 localStorage is a key-value store (e.g. cannot save complex objects like JSON), so
 * LocalStorageProxy automatically serializes and deserializes data when saving and retrieving it.</p>
 * 
 * <p>localStorage is extremely useful for saving user-specific information without needing to build server-side 
 * infrastructure to support it. Let's imagine we're writing a Twitter search application and want to save the user's
 * searches locally so they can easily perform a saved search again later. We'd start by creating a Search model:</p>
 * 
<pre><code>
Ext.regModel('Search', {
    fields: ['id', 'query'],

    proxy: {
        type: 'localstorage',
        id  : 'twitter-Searches'
    }
});
</code></pre>
 * 
 * <p>Our Search model contains just two fields - id and query - plus a Proxy definition. The only configuration we
 * need to pass to the LocalStorage proxy is an {@link #id}. This is important as it separates the Model data in this
 * Proxy from all others. The localStorage API puts all data into a single shared namespace, so by setting an id we
 * enable LocalStorageProxy to manage the saved Search data.</p>
 * 
 * <p>Saving our data into localStorage is easy and would usually be done with a {@link Ext.data.Store Store}:</p>
 * 
<pre><code>
//our Store automatically picks up the LocalStorageProxy defined on the Search model
var store = new Ext.data.Store({
    model: "Search"
});

//loads any existing Search data from localStorage
store.load();

//now add some Searches
store.add({query: 'Sencha Touch'});
store.add({query: 'Ext JS'});

//finally, save our Search data to localStorage
store.sync();
</code></pre>
 * 
 * <p>The LocalStorageProxy automatically gives our new Searches an id when we call store.sync(). It encodes the Model
 * data and places it into localStorage. We can also save directly to localStorage, bypassing the Store altogether:</p>
 * 
<pre><code>
var search = Ext.ModelMgr.create({query: 'Sencha Animator'}, 'Search');

//uses the configured LocalStorageProxy to save the new Search to localStorage
search.save();
</code></pre>
 * 
 * <p><u>Limitations</u></p>
 * 
 * <p>If this proxy is used in a browser where local storage is not supported, the constructor will throw an error.
 * A local storage proxy requires a unique ID which is used as a key in which all record data are stored in the
 * local storage object.</p>
 * 
 * <p>It's important to supply this unique ID as it cannot be reliably determined otherwise. If no id is provided
 * but the attached store has a storeId, the storeId will be used. If neither option is presented the proxy will
 * throw an error.</p>
 */
Ext.data.LocalStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    //inherit docs
    getStorageObject: function() {
        return window.localStorage;
    }
});

Ext.data.ProxyMgr.registerType('localstorage', Ext.data.LocalStorageProxy);
/**
 * @author Ed Spencer
 * @class Ext.data.SessionStorageProxy
 * @extends Ext.data.WebStorageProxy
 * 
 * <p>Proxy which uses HTML5 session storage as its data storage/retrieval mechanism.
 * If this proxy is used in a browser where session storage is not supported, the constructor will throw an error.
 * A session storage proxy requires a unique ID which is used as a key in which all record data are stored in the
 * session storage object.</p>
 * 
 * <p>It's important to supply this unique ID as it cannot be reliably determined otherwise. If no id is provided
 * but the attached store has a storeId, the storeId will be used. If neither option is presented the proxy will
 * throw an error.</p>
 * 
 * <p>Proxies are almost always used with a {@link Ext.data.Store store}:<p>
 * 
<pre><code>
new Ext.data.Store({
    proxy: {
        type: 'sessionstorage',
        id  : 'myProxyKey'
    }
});
</code></pre>
 * 
 * <p>Alternatively you can instantiate the Proxy directly:</p>
 * 
<pre><code>
new Ext.data.SessionStorageProxy({
    id  : 'myOtherProxyKey'
});
 </code></pre>
 * 
 * <p>Note that session storage is different to local storage (see {@link Ext.data.LocalStorageProxy}) - if a browser
 * session is ended (e.g. by closing the browser) then all data in a SessionStorageProxy are lost. Browser restarts
 * don't affect the {@link Ext.data.LocalStorageProxy} - the data are preserved.</p>
 */
Ext.data.SessionStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    //inherit docs
    getStorageObject: function() {
        return window.sessionStorage;
    }
});

Ext.data.ProxyMgr.registerType('sessionstorage', Ext.data.SessionStorageProxy);
/**
 * @author Ed Spencer
 * @class Ext.data.Reader
 * @extends Object
 * 
 * <p>Readers are used to interpret data to be loaded into a {@link Ext.data.Model Model} instance or a {@link Ext.data.Store Store}
 * - usually in response to an AJAX request. This is normally handled transparently by passing some configuration to either the 
 * {@link Ext.data.Model Model} or the {@link Ext.data.Store Store} in question - see their documentation for further details.</p>
 * 
 * <p><u>Loading Nested Data</u></p>
 * 
 * <p>Readers have the ability to automatically load deeply-nested data objects based on the {@link Ext.data.Association associations}
 * configured on each Model. Below is an example demonstrating the flexibility of these associations in a fictional CRM system which
 * manages a User, their Orders, OrderItems and Products. First we'll define the models:
 * 
<pre><code>
Ext.regModel("User", {
    fields: [
        'id', 'name'
    ],

    hasMany: {model: 'Order', name: 'orders'},

    proxy: {
        type: 'rest',
        url : 'users.json',
        reader: {
            type: 'json',
            root: 'users'
        }
    }
});

Ext.regModel("Order", {
    fields: [
        'id', 'total'
    ],

    hasMany  : {model: 'OrderItem', name: 'orderItems', associationKey: 'order_items'},
    belongsTo: 'User'
});

Ext.regModel("OrderItem", {
    fields: [
        'id', 'price', 'quantity', 'order_id', 'product_id'
    ],

    belongsTo: ['Order', {model: 'Product', associationKey: 'product'}]
});

Ext.regModel("Product", {
    fields: [
        'id', 'name'
    ],

    hasMany: 'OrderItem'
});
</code></pre>
 * 
 * <p>This may be a lot to take in - basically a User has many Orders, each of which is composed of several OrderItems. Finally,
 * each OrderItem has a single Product. This allows us to consume data like this:</p>
 * 
<pre><code>
{
    "users": [
        {
            "id": 123,
            "name": "Ed",
            "orders": [
                {
                    "id": 50,
                    "total": 100,
                    "order_items": [
                        {
                            "id"      : 20,
                            "price"   : 40,
                            "quantity": 2,
                            "product" : {
                                "id": 1000,
                                "name": "MacBook Pro"
                            }
                        },
                        {
                            "id"      : 21,
                            "price"   : 20,
                            "quantity": 3,
                            "product" : {
                                "id": 1001,
                                "name": "iPhone"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
</code></pre>
 * 
 * <p>The JSON response is deeply nested - it returns all Users (in this case just 1 for simplicity's sake), all of the Orders
 * for each User (again just 1 in this case), all of the OrderItems for each Order (2 order items in this case), and finally
 * the Product associated with each OrderItem. Now we can read the data and use it as follows:
 * 
<pre><code>
var store = new Ext.data.Store({
    model: "User"
});

store.load({
    callback: function() {
        //the user that was loaded
        var user = store.first();

        console.log("Orders for " + user.get('name') + ":")

        //iterate over the Orders for each User
        user.orders().each(function(order) {
            console.log("Order ID: " + order.getId() + ", which contains items:");

            //iterate over the OrderItems for each Order
            order.orderItems().each(function(orderItem) {
                //we know that the Product data is already loaded, so we can use the synchronous getProduct
                //usually, we would use the asynchronous version (see {@link Ext.data.BelongsToAssociation})
                var product = orderItem.getProduct();

                console.log(orderItem.get('quantity') + ' orders of ' + product.get('name'));
            });
        });
    }
});
</code></pre>
 * 
 * <p>Running the code above results in the following:</p>
 * 
<pre><code>
Orders for Ed:
Order ID: 50, which contains items:
2 orders of MacBook Pro
3 orders of iPhone
</code></pre>
 * 
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.Reader = Ext.extend(Object, {
    /**
     * @cfg {String} idProperty Name of the property within a row object
     * that contains a record identifier value.  Defaults to <tt>id</tt>
     */
    idProperty: 'id',

    /**
     * @cfg {String} totalProperty Name of the property from which to
     * retrieve the total number of records in the dataset. This is only needed
     * if the whole dataset is not passed in one go, but is being paged from
     * the remote server.  Defaults to <tt>total</tt>.
     */
    totalProperty: 'total',

    /**
     * @cfg {String} successProperty Name of the property from which to
     * retrieve the success attribute. Defaults to <tt>success</tt>.  See
     * {@link Ext.data.DataProxy}.{@link Ext.data.DataProxy#exception exception}
     * for additional information.
     */
    successProperty: 'success',

    /**
     * @cfg {String} root <b>Required</b>.  The name of the property
     * which contains the Array of row objects.  Defaults to <tt>undefined</tt>.
     * An exception will be thrown if the root property is undefined. The data
     * packet value for this property should be an empty array to clear the data
     * or show no data.
     */
    root: '',
    
    /**
     * @cfg {Boolean} implicitIncludes True to automatically parse models nested within other models in a response
     * object. See the Ext.data.Reader intro docs for full explanation. Defaults to true.
     */
    implicitIncludes: true,
    
    // Private. Empty ResultSet to return when response is falsy (null|undefined|empty string)
    nullResultSet: new Ext.data.ResultSet({
        total  : 0,
        count  : 0,
        records: [],
        success: true
    }),

    constructor: function(config) {
        Ext.apply(this, config || {});

        this.model = Ext.ModelMgr.getModel(config.model);
        if (this.model) {
            this.buildExtractors();
        }
    },

    /**
     * Sets a new model for the reader.
     * @private
     * @param {Object} model The model to set.
     * @param {Boolean} setOnProxy True to also set on the Proxy, if one is configured
     */
    setModel: function(model, setOnProxy) {
        this.model = Ext.ModelMgr.getModel(model);
        this.buildExtractors(true);
        
        if (setOnProxy && this.proxy) {
            this.proxy.setModel(this.model, true);
        }
    },

    /**
     * Reads the given response object. This method normalizes the different types of response object that may be passed
     * to it, before handing off the reading of records to the {@link readRecords} function.
     * @param {Object} response The response object. This may be either an XMLHttpRequest object or a plain JS object
     * @return {Ext.data.ResultSet} The parsed ResultSet object
     */
    read: function(response) {
        var data = response;
        
        if (response && response.responseText) {
            data = this.getResponseData(response);
        }
        
        if (data) {
            return this.readRecords(data);
        } else {
            return this.nullResultSet;
        }
    },

    /**
     * Abstracts common functionality used by all Reader subclasses. Each subclass is expected to call
     * this function before running its own logic and returning the Ext.data.ResultSet instance. For most
     * Readers additional processing should not be needed.
     * @param {Mixed} data The raw data object
     * @return {Ext.data.ResultSet} A ResultSet object
     */
    readRecords: function(data) {
        /**
         * The raw data object that was last passed to readRecords. Stored for further processing if needed
         * @property rawData
         * @type Mixed
         */
        this.rawData = data;

        data = this.getData(data);

        var root    = this.getRoot(data),
            total   = root.length,
            success = true,
            value, records, recordCount;

        if (this.totalProperty) {
            value = parseInt(this.getTotal(data), 10);
            if (!isNaN(value)) {
                total = value;
            }
        }

        if (this.successProperty) {
            value = this.getSuccess(data);
            if (value === false || value === 'false') {
                success = false;
            }
        }

        records = this.extractData(root, true);
        recordCount = records.length;

        return new Ext.data.ResultSet({
            total  : total || recordCount,
            count  : recordCount,
            records: records,
            success: success
        });
    },

    /**
     * Returns extracted, type-cast rows of data.  Iterates to call #extractValues for each row
     * @param {Object[]/Object} data-root from server response
     * @param {Boolean} returnRecords [false] Set true to return instances of Ext.data.Record
     * @private
     */
    extractData : function(root, returnRecords) {
        var values  = [],
            records = [],
            Model   = this.model,
            length  = root.length,
            idProp  = this.idProperty,
            node, id, record, i;

        for (i = 0; i < length; i++) {
            node   = root[i];
            values = this.extractValues(node);
            id     = this.getId(node);

            if (returnRecords === true) {
                record = new Model(values, id);
                record.raw = node;
                records.push(record);
                
                if (this.implicitIncludes) {
                    this.readAssociated(record, node);
                }
            } else {
                values[idProp] = id;
                records.push(values);
            }
        }

        return records;
    },
    
    /**
     * @private
     * Loads a record's associations from the data object. This prepopulates hasMany and belongsTo associations
     * on the record provided.
     * @param {Ext.data.Model} record The record to load associations for
     * @param {Mixed} data The data object
     * @return {String} Return value description
     */
    readAssociated: function(record, data) {
        var associations = record.associations.items,
            length       = associations.length,
            association, associationName, associatedModel, associationData, inverseAssociation, proxy, reader, store, i;
        
        for (i = 0; i < length; i++) {
            association     = associations[i];
            associationName = association.name;
            associationData = this.getAssociatedDataRoot(data, association.associationKey || associationName);
            associatedModel = association.associatedModel;
            
            if (associationData) {
                proxy = associatedModel.proxy;
                
                // if the associated model has a Reader already, use that, otherwise attempt to create a sensible one
                if (proxy) {
                    reader = proxy.getReader();
                } else {
                    reader = new this.constructor({
                        model: association.associatedName
                    });
                }
                
                if (association.type == 'hasMany') {
                    store = record[associationName]();
                    
                    store.add.apply(store, reader.read(associationData).records);
                    
                    //now that we've added the related records to the hasMany association, set the inverse belongsTo
                    //association on each of them if it exists
                    inverseAssociation = associatedModel.prototype.associations.findBy(function(assoc) {
                        return assoc.type == 'belongsTo' && assoc.associatedName == record.constructor.modelName;
                    });
                    
                    //if the inverse association was found, set it now on each record we've just created
                    if (inverseAssociation) {
                        store.data.each(function(associatedRecord) {
                            associatedRecord[inverseAssociation.instanceName] = record;
                        });                        
                    }

                } else if (association.type == 'belongsTo') {
                    record[association.instanceName] = reader.read([associationData]).records[0];
                }
            }
        }
    },
    
    /**
     * @private
     * Used internally by {@link #readAssociated}. Given a data object (which could be json, xml etc) for a specific
     * record, this should return the relevant part of that data for the given association name. This is only really
     * needed to support the XML Reader, which has to do a query to get the associated data object
     * @param {Mixed} data The raw data object
     * @param {String} associationName The name of the association to get data for (uses associationKey if present)
     * @return {Mixed} The root
     */
    getAssociatedDataRoot: function(data, associationName) {
        return data[associationName];
    },

    /**
     * @private
     * Given an object representing a single model instance's data, iterates over the model's fields and
     * builds an object with the value for each field.
     * @param {Object} data The data object to convert
     * @return {Object} Data object suitable for use with a model constructor
     */
    extractValues: function(data) {
        var fields = this.model.prototype.fields.items,
            length = fields.length,
            output = {},
            field, value, i;

        for (i = 0; i < length; i++) {
            field = fields[i];
            value = this.extractorFunctions[i](data) || field.defaultValue;

            output[field.name] = value;
        }

        return output;
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
     * @param {Mixed} data The data object
     * @return {Mixed} The same data object
     */
    getRoot: function(data) {
        return data;
    },

    /**
     * Takes a raw response object (as passed to this.read) and returns the useful data segment of it. This must be implemented by each subclass
     * @param {Object} response The responce object
     * @return {Object} The useful data from the response
     */
    getResponseData: function(response) {
        throw new Error("getResponseData must be implemented in the Ext.data.Reader subclass");
    },

    /**
     * @private
     * Reconfigures the meta data tied to this Reader
     */
    onMetaChange : function(meta) {
        var fields = meta.fields,
            newModel;
        
        Ext.apply(this, meta);
        
        if (fields) {
            newModel = Ext.regModel("JsonReader-Model" + Ext.id(), {fields: fields});
            this.setModel(newModel, true);
        } else {
            this.buildExtractors(true);
        }
    },

    /**
     * @private
     * This builds optimized functions for retrieving record data and meta data from an object.
     * Subclasses may need to implement their own getRoot function.
     * @param {Boolean} force True to automatically remove existing extractor functions first (defaults to false)
     */
    buildExtractors: function(force) {
        if (force === true) {
            delete this.extractorFunctions;
        }
        
        if (this.extractorFunctions) {
            return;
        }

        var idProp      = this.id || this.idProperty,
            totalProp   = this.totalProperty,
            successProp = this.successProperty,
            messageProp = this.messageProperty;

        //build the extractors for all the meta data
        if (totalProp) {
            this.getTotal = this.createAccessor(totalProp);
        }

        if (successProp) {
            this.getSuccess = this.createAccessor(successProp);
        }

        if (messageProp) {
            this.getMessage = this.createAccessor(messageProp);
        }

        if (idProp) {
            var accessor = this.createAccessor(idProp);

            this.getId = function(record) {
                var id = accessor(record);

                return (id == undefined || id == '') ? null : id;
            };
        } else {
            this.getId = function() {
                return null;
            };
        }
        this.buildFieldExtractors();
    },

    /**
     * @private
     */
    buildFieldExtractors: function() {
        //now build the extractors for all the fields
        var fields = this.model.prototype.fields.items,
            ln = fields.length,
            i  = 0,
            extractorFunctions = [],
            field, map;

        for (; i < ln; i++) {
            field = fields[i];
            map   = (field.mapping !== undefined && field.mapping !== null) ? field.mapping : field.name;

            extractorFunctions.push(this.createAccessor(map));
        }

        this.extractorFunctions = extractorFunctions;
    }
});
/**
 * @author Ed Spencer
 * @class Ext.data.Writer
 * @extends Object
 * 
 * <p>Base Writer class used by most subclasses of {@link Ext.data.ServerProxy}. This class is
 * responsible for taking a set of {@link Ext.data.Operation} objects and a {@link Ext.data.Request}
 * object and modifying that request based on the Operations.</p>
 * 
 * <p>For example a {@link Ext.data.JsonWriter} would format the Operations and their {@link Ext.data.Model} 
 * instances based on the config options passed to the {@link Ext.data.JsonWriter JsonWriter's} constructor.</p>
 * 
 * <p>Writers are not needed for any kind of local storage - whether via a
 * {@link Ext.data.WebStorageProxy Web Storage proxy} (see {@link Ext.data.LocalStorageProxy localStorage}
 * and {@link Ext.data.SessionStorageProxy sessionStorage}) or just in memory via a
 * {@link Ext.data.MemoryProxy MemoryProxy}.</p>
 * 
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.Writer = Ext.extend(Object, {

    constructor: function(config) {
        Ext.apply(this, config);
    },

    /**
     * Prepares a Proxy's Ext.data.Request object
     * @param {Ext.data.Request} request The request object
     * @return {Ext.data.Request} The modified request object
     */
    write: function(request) {
        var operation = request.operation,
            records   = operation.records || [],
            ln        = records.length,
            i         = 0,
            data      = [];

        for (; i < ln; i++) {
            data.push(this.getRecordData(records[i]));
        }
        return this.writeRecords(request, data);
    },

    /**
     * Formats the data for each record before sending it to the server. This
     * method should be overridden to format the data in a way that differs from the default.
     * @param {Object} record The record that we are writing to the server.
     * @return {Object} An object literal of name/value keys to be written to the server.
     * By default this method returns the data property on the record.
     */
    getRecordData: function(record) {
        return record.data;
    }
});

Ext.data.WriterMgr.registerType('base', Ext.data.Writer);
