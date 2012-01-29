//<feature logger>
Ext.define('Ext.log.writer.Console', {

    extend: 'Ext.log.writer.Writer',

    config: {
        throwOnErrors: true
    },

    doWrite: function(event) {
        var message = event.message,
            priority = event.priorityName,
            consoleMethod;

        if (priority === 'error' && this.getThrowOnErrors()) {
            throw new Error(message);
        }

        if (typeof console !== 'undefined') {
            consoleMethod = priority;

            if (consoleMethod === 'deprecate') {
                consoleMethod = 'warn';
            }

            if (!(consoleMethod in console)) {
                consoleMethod = 'log';
            }

            console[consoleMethod](message);
        }
    }
});
//</feature>
