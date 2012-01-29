/**
 * This is the output of the Sencha Touch 2.0 Getting Started Guide. It sets up a simple application with Sencha Touch,
 * creating a Tab Panel with 3 tabs - home, blog and contact. The home page just shows html, the blog page uses a 
 * nested list to display recent blog posts, and the contact page uses a form to wire up user feedback.
 */
Ext.application({
    name: 'Sencha',
    
    launch: function() {
        //The whole app UI lives in this tab panel
        Ext.create('Ext.TabPanel', {
            fullscreen: true,
            tabBarPosition: 'bottom',
            
            items: [
                //this is the home page, just some simple html
                {
                    title: 'Home',
                    iconCls: 'home',
                    cls: 'home',
                    html: [
                        '<img height=260 src="http://staging.sencha.com/img/sencha.png" />',
                        '<h1>Welcome to Sencha Touch</h1>',
                        "<p>Building the Getting Started app</p>",
                        '<h2>Sencha Touch (2.0.0pr1)</h2>'
                    ].join("")
                },
                
                //this is the recent blogs page. It uses a tree store to load its data from blog.json
                {
                    xtype: 'nestedlist',
                    title: 'Blog',
                    iconCls: 'star',
                    cls: 'blog',
                    displayField: 'title',
                    
                    store: Ext.create('Ext.data.TreeStore', {
                        fields: ['title', 'text'],
                        
                        root: {},
                        proxy: {
                            type: 'ajax',
                            url: 'blog.json'
                        }
                    }),
                    
                    //when a leaf node is tapped on this function is called. Whatever we return is shown on the page
                    //here we show a page containing the blog post's text
                    getDetailCard: function(node) {
                        if (node) {
                            return {
                                xtype: 'panel',
                                scrollable: true,
                                html: node.get('text')
                            };
                        }
                    }
                },
                
                //this is the contact page, which features a form and a button. The button submits the form
                {
                    xtype: 'formpanel',
                    title: 'Contact Us',
                    iconCls: 'user',
                    url: 'contact.php',
                    layout: 'vbox',
                    
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Contact Us',
                            instructions: 'Email address is optional',
                            
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Name',
                                    name: 'name'
                                },
                                {
                                    xtype: 'emailfield',
                                    label: 'Email',
                                    name: 'email'
                                },
                                {
                                    xtype: 'textareafield',
                                    label: 'Message',
                                    name: 'message',
                                    height: 90
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Send',
                            ui: 'confirm',
                            
                            //the handler is called when the button is tapped on
                            handler: function() {
                                //this looks up the items stack above, getting a reference to the first form it see
                                var form = this.up('formpanel');
                                
                                //sends an AJAX request with the form data to the url specified above (contact.php)
                                //success callback is called if we get a non-error response from the server
                                form.submit({
                                    success: function() {
                                        //the callback function is run when the user taps the 'ok' button
                                        Ext.Msg.alert('Thank You', 'Your message has been received', function() {
                                            form.reset();
                                        });
                                    }
                                });
                            }
                        }
                    ]
                }
            ]
        });
    }
});