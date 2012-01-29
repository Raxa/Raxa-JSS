// The raxaemr Viewport is an extension of the Ext.container.Viewport
Ext.define('raxaemr.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    requires: [
    'raxaemr.view.LoginForm'
    ],
    
    initComponent: function() {

        // Create new instance of the LoginForm.
        raxaemr.views.loginForm = new raxaemr.views.LoginForm();
        
        // Adding LoginForm to the Viewport
        this.items [
        raxaemr.views.loginForm
        ];

        // Similar to calling "super" in languages like Java.  Kicks off initialization in parent classes.
        raxaemr.views.Viewport.superclass.initComponent.apply(this, arguments);
    },
    
    layoutOrientation : function(orientation, w, h) {
        raxaemr.views.Viewport.superclass.layoutOrientation.call(this, orientation, w, h);
    }
});