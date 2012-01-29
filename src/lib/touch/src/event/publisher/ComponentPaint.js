Ext.define('Ext.event.publisher.ComponentPaint', {

    extend: 'Ext.event.publisher.Publisher',

    targetType: 'component',

    handledEvents: ['painted', 'erased'],

    idSelectorRegex: /^#([\w\-]+)$/i,

    eventNames: {
        painted: 'painted',
        erased: 'erased'
    },

    constructor: function() {
        this.callParent(arguments);

        this.dispatchingQueue = [];

        this.subscribers = {};
    },

    getSubscribers: function(eventName, createIfNotExist) {
        var subscribers = this.subscribers;

        if (!subscribers.hasOwnProperty(eventName)) {
            if (!createIfNotExist) {
                return null;
            }

            subscribers[eventName] = {
                $length: 0
            };
        }

        return subscribers[eventName];
    },

    setDispatcher: function(dispatcher) {
        var targetType = this.targetType;

        dispatcher.doAddListener(targetType, '*', 'renderedchange', 'onBeforeComponentRenderedChange', this, null, 'before');
        dispatcher.doAddListener(targetType, '*', 'hiddenchange', 'onBeforeComponentHiddenChange', this, null, 'before');
        dispatcher.doAddListener(targetType, '*', 'renderedchange', 'onComponentRenderedChange', this);
        dispatcher.doAddListener(targetType, '*', 'hiddenchange', 'onComponentHiddenChange', this);

        return this.callParent(arguments);
    },

    subscribe: function(target, eventName) {
        var match = target.match(this.idSelectorRegex),
            subscribers;

        if (!match) {
            return false;
        }

        subscribers = this.getSubscribers(eventName, true);
        subscribers[match[1]] = true;
        subscribers.$length++;

        return true;
    },

    unsubscribe: function(target, eventName) {
        var match = target.match(this.idSelectorRegex),
            subscribers;

        if (!match || !(subscribers = this.getSubscribers(eventName))) {
            return false;
        }

        delete subscribers[match[1]];
        subscribers.$length--;

        return true;
    },

    onBeforeComponentRenderedChange: function(container, component, rendered) {
        var eventNames = this.eventNames,
            eventName = rendered ? eventNames.painted : eventNames.erased,
            subscribers = this.getSubscribers(eventName);

        if (subscribers && subscribers.$length > 0) {
            this.publish(subscribers, component, eventName);
        }
    },

    onBeforeComponentHiddenChange: function(component, hidden) {
        var eventNames = this.eventNames,
            eventName = hidden ? eventNames.erased : eventNames.painted,
            subscribers = this.getSubscribers(eventName);

        if (subscribers && subscribers.$length > 0) {
            this.publish(subscribers, component, eventName);
        }
    },

    onComponentRenderedChange: function() {
        if (this.dispatchingQueue.length > 0) {
            this.dispatchQueue();
        }
    },

    onComponentHiddenChange: function() {
        if (this.dispatchingQueue.length > 0) {
            this.dispatchQueue();
        }
    },

    dispatchQueue: function() {
        var dispatcher = this.dispatcher,
            targetType = this.targetType,
            eventNames = this.eventNames,
            queue = this.dispatchingQueue.slice(),
            ln = queue.length,
            i, item, component, eventName, isPainted;

        this.dispatchingQueue.length = 0;

        if (ln > 0) {
            for (i = 0; i < ln; i++) {
                item = queue[i];
                component = item.component;
                eventName = item.eventName;
                isPainted = component.isPainted();

                if ((eventName === eventNames.painted && isPainted) || eventName === eventNames.erased && !isPainted) {
                    dispatcher.doDispatchEvent(targetType, '#' + item.id, eventName, [component]);
                }
            }
            queue.length = 0;
        }

    },

    publish: function(subscribers, component, eventName) {
        var id = component.getId(),
            needsDispatching = false,
            dispatchingQueue = this.dispatchingQueue,
            eventNames, items, i, ln, isPainted;

        if (subscribers[id]) {
            eventNames = this.eventNames;

            isPainted = component.isPainted();

            if ((eventName === eventNames.painted && !isPainted) || eventName === eventNames.erased && isPainted) {
                needsDispatching = true;
            }
            else {
                return this;
            }
        }

        if (component.isContainer) {
            items = component.getItems().items;

            for (i = 0,ln = items.length; i < ln; i++) {
                this.publish(subscribers, items[i], eventName);
            }
        }
        else if (component.isDecorator) {
            this.publish(subscribers, component.getComponent(), eventName);
        }

        if (needsDispatching) {
            dispatchingQueue.push({
                id: id,
                eventName: eventName,
                component: component
            });
        }
    }
});
