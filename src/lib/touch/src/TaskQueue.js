Ext.define('Ext.TaskQueue', {
    singleton: true,

    tasks: [],

    delay: 1,

    lastTickTime: 0,

    constructor: function() {
        var me = this;

        this.tickFn = function() {
            me.tick.call(me);
            me.lastTickTime = Ext.Date.now();
            setTimeout(me.tickFn, me.delay);
        };
    },

    queue: function(fn, scope, args) {
        var item = {
            fn: fn,
            scope: scope,
            args: args,
            disabled: false
        };

        this.tasks.push(item);

        return item;
    },

    run: function() {
        this.tickFn();
    },

    tick: function() {
        var tasks = this.tasks,
            task;

        if (tasks.length > 0) {
            task = tasks.shift();

            if (task.disabled !== true) {
                task.fn.apply(task.scope, task.args);
            }
        }
    }
});
