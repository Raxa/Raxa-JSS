Ext.define('Ext.event.publisher.Publisher', {
    targetType: '',

    constructor: function() {
        var handledEvents = this.handledEvents,
            handledEventsMap,
            i, ln, event;

        handledEventsMap = this.handledEventsMap = {};

        for (i = 0,ln = handledEvents.length; i < ln; i++) {
            event = handledEvents[i];

            handledEventsMap[event] = true;
        }

        return this;
    },

    handles: function(eventName) {
        var map = this.handledEventsMap;

        return !!map[eventName] || !!map['*'] || eventName === '*';
    },

    getHandledEvents: function() {
        return this.handledEvents;
    },

    setDispatcher: function(dispatcher) {
        this.dispatcher = dispatcher;
    },

    subscribe: function() {
        return false;
    },

    unsubscribe: function() {
        return false;
    },

    notify: function() {
        return false;
    },

    getTargetType: function() {
        return this.targetType;
    },

    dispatch: function(target, eventName, args) {
        this.dispatcher.doDispatchEvent(this.targetType, target, eventName, args);
    }
});
