//<feature logger>
(function() {
var Logger = Ext.define('Ext.log.Logger', {

    extend: 'Ext.log.Base',

    statics: {
        defaultPriority: 'info',

        priorities: {
            verbose:    0,
            info:       1,
            deprecate:  2,
            warn:       3,
            error:      4
        }
    },

    config: {
        enabled: true,
        minPriority: 'deprecate',
        writers: {}
    },

    log: function(message, priority, callerId) {
        if (!this.getEnabled()) {
            return this;
        }

        var statics = Logger,
            priorities = statics.priorities,
            priorityValue = priorities[priority],
            caller = this.log.caller,
            callerDisplayName = '',
            writers = this.getWriters(),
            event, i, originalCaller;

        if (!priority) {
            priority = 'info';
        }

        if (priorities[this.getMinPriority()] > priorityValue) {
            return this;
        }

        if (!callerId) {
            callerId = 1;
        }

        if (Ext.isArray(message)) {
            message = message.join(" ");
        }
        else {
            message = String(message);
        }

        if (typeof callerId == 'number') {
            i = callerId;

            do {
                i--;

                caller = caller.caller;

                if (!caller) {
                    break;
                }

                if (!originalCaller) {
                    originalCaller = caller.caller;
                }

                if (i <= 0 && caller.displayName) {
                    break;
                }
            }
            while (caller !== originalCaller);

            callerDisplayName = Ext.getDisplayName(caller);
        }
        else {
            caller = caller.caller;
            callerDisplayName = Ext.getDisplayName(callerId) + '#' + caller.$name;
        }

        event = {
            time: Ext.Date.now(),
            priority: priorityValue,
            priorityName: priority,
            message: message,
            caller: caller,
            callerDisplayName: callerDisplayName
        };

        for (i in writers) {
            if (writers.hasOwnProperty(i)) {
                writers[i].write(Ext.merge({}, event));
            }
        }

        return this;
    }

}, function() {
    Ext.Object.each(this.priorities, function(priority) {
        this.override(priority, function(message, callerId) {
            if (!callerId) {
                callerId = 1;
            }

            if (typeof callerId == 'number') {
                callerId += 1;
            }

            this.log(message, priority, callerId);
        });
    }, this);
});

})();
//</feature>
