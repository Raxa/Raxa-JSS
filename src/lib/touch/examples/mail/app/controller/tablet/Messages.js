Ext.define('Mail.controller.tablet.Messages', {
    extend: 'Mail.controller.Messages',
    
    config: {
        refs: {
            nav: '#nav'
        }
    },
    
    init: function() {
        this.on('execute', 'onActionExecute');
    },
    
    onActionExecute: function(me, action) {
        console.log('on execute');
        var eventController = arguments[arguments.length - 1];
        
        if (action.getAction() === 'showMessage') {
            console.log('tests');
            eventController.pause();
            
            var messageList = this.getMessageList(),
                id = parseInt(action.getArgs()[0], 10);

            messageList.getStore().ensureLoaded(function(store) {
                this.getNav().setActiveItem(1);

                messageList.select(store.getById(id));
                messageList.ensureVisible(store.getById(id));

                console.log('timeout');
                setTimeout(function(){
                    console.log('resume');
                    eventController.resume();
                }, 2000);
            }, this);
        }
    },
    
    newMessage: function() {
        debugger;
        Ext.create('Mail.view.tablet.Compose').show();
    },
    
    //This is an unfortunate amount of code to restore state, but I can't see how to reduce it
    prepareShowMessage: function(action) {
        var messageList = this.getMessageList(),
            id = parseInt(action.getArgs()[0], 10);
        
        messageList.getStore().ensureLoaded(function(store) {
            this.getNav().setActiveItem(1);
            
            messageList.select(store.getById(id));
            messageList.ensureVisible(store.getById(id));
            
            this.execute(action, true);
        }, this);
    }
});