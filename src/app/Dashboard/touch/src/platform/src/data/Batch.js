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