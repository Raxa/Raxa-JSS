Ext.define('Docs.controller.Comments', {
    extend: 'Docs.controller.Main',
    
    config: {
        before: {
            create : 'authenticate',
            destroy: 'authenticate'
        },
        
        after: {
            create: 'log'
        },

        routes: {
            '/content/:id/comments': 'show'
        },

        control: {
            '#commentForm': {
                submit: 'create'
            }
        },
        
        dependencies: {
            'show': 'Mail'
        }
    },
    
    profiles: ['phone'],
    
    testAction: function() {
        console.log('Running test action');
        console.log(arguments);
        
        // Ext.defer(function() {
        //     this.getApplication().dispatch({
        //         controller: 'Comments',
        //         action: 'testAction2'
        //     });            
        // }, 1000, this);
    },
    
    testAction2: function() {
        console.log('TEST ACTION 2');
        
        Ext.defer(function() {
            this.getApplication().dispatch({
                controller: 'Comments',
                action: 'testAction3',
                url: ''
            });
        }, 1000, this);
    },
    
    testAction3: function() {
        console.log('TEST ACTION THREE');
    },
    
    //this could have been defined inline in the control block above, but it's
    //unit testable this way
    create: function(commentForm) {
        Docs.model.Comment.create(commentForm.getValues());
    },
    
    show: function(contentId) {
        this.getMainView().add({
            xtype: 'comments',
            store: {
                autoLoad: true,
                model: 'Comment',
                filters: {
                    contentId: contentId
                }
            }
        });
        
        //alternatively
        Docs.model.Comment.find({
            contentId: contentId,
            scope: this,
            success: function(store) {
                this.getMainView().add({
                    xtype: 'comments',
                    store: store
                });
            }
        });
    }
});