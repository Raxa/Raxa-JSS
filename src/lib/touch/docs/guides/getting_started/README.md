# Getting Started with Sencha Touch 2

## What is Sencha Touch?

Sencha Touch enables you to quickly and easily create HTML-5 based mobile apps that work on Android, iOS, and Blackberry devices and produce a native-app-like experience inside a browser.

## Things you'll need

Here's what you need to get started:

 - The free [Sencha Touch 2.0 SDK](http://www.sencha.com/blog/sencha-touch-2-developer-preview/), currently in developer preview
 - A web server running locally on your computer
 - A modern web browser; Chrome or Safari are recommended 

Download and unzip the latest version of the SDK. Place the unzipped folder into your web server's document root. If you don't have a web server or aren't sure, we recommend using a simple one-click installer like WAMP or MAMP.

Once you have the folder in the right place just open your web browser, point it to http://localhost/sencha-touch-folder (or wherever your web server is configured to serve from) and you should see the Sencha Touch Welcome page. If that's all working you're ready to start your first app.

## Starting your app

Sencha Touch apps work best when they follow the simple application structure guidelines we provide. This is a small set of conventions and classes that make writing maintainable apps simpler, especially when you work as part of a team.

The first step is to set up the simple folder structure that will house the app. Initially all you need is two files and a copy of Sencha Touch. By convention, these are:

* **index.html** - a simple HTML file that includes Sencha Touch and your application file
* **app.js** - a file where you define the app name, home screen icon, and what it's supposed to do on launch
* **touch** - a copy of the downloaded Sencha Touch folder 

Let's start with the index.html file. Here's what it looks like:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Getting Started</title>
        <link rel="stylesheet" href="touch/resources/css/sencha-touch.css" type="text/css">
        <script type="text/javascript" src="touch/sencha-touch-all.js"></script>
        <script type="text/javascript" src="app.js"></script>
    </head>
    <body></body>
    </html>

This is probably one of the simplest HTML pages you'll ever write. All it does is include Sencha Touch (the JavaScript file and its stylesheet), and your app.js. Note that the body is empty - we'll let Sencha Touch fill that up. 

Next, let's look at the contents of our app.js file. We'll keep things simple to start and just call `alert` to make sure everything's working:

    @example raw miniphone
    Ext.application({
        name: 'Sencha',

        launch: function() {
            alert('launched');
        }
    });

That's all you need to get started. Now, launch Safari or Chrome and make sure it works as expected. You can also click the small Preview icon next to the example above to run it. So far it doesn't do very much, but the fact that the alert message pops up means Sencha Touch is on the page and the app launched.

We're ready to start building our interface now, starting with a TabPanel, which creates a tabbed interface providing navigation between as many pages as needed. In this case we'll start with just one, the home page, like this:

    @example raw miniphone
    Ext.application({
        name: 'Sencha',

        launch: function() {
            Ext.create("Ext.TabPanel", {
                fullscreen: true,
                items: [
                    {
                        title: 'Home',
                        iconCls: 'home',
                        html: 'Welcome'
                    }
                ]
            });
        }
    });

If you run this in the browser (click the Preview button), a TabPanel should appear on top of the screen. The home page could be a bit more welcoming, so let's add some content to it and reposition the tab bar at the bottom of the page. We do that with the {@link Ext.tab.Panel#tabBarPosition tabBarPosition} config and by adding a bit of HTML:

    @example raw portrait
    Ext.application({
        name: 'Sencha',

        launch: function() {
            Ext.create("Ext.TabPanel", {
                fullscreen: true,
                tabBarPosition: 'bottom',
                
                items: [
                    {
                        title: 'Home',
                        iconCls: 'home',
                        html: [
                            '<img src="http://staging.sencha.com/img/sencha.png" />',
                            '<h1>Welcome to Sencha Touch</h1>',
                            "<p>You're creating the Getting Started app. This demonstrates how ",
                            "to use tabs, lists and forms to create a simple app</p>",
                            '<h2>Sencha Touch (2.0.0pr1)</h2>'
                        ].join("")
                    }
                ]
            });
        }
    });

Click the Preview button next to the example to have a look: you should see some HTML content but it won't look very good. We'll add a {@link Ext.Component#cls cls} config and add it to the panel, adding a CSS class that we can target to make things look better. All of the CSS we're adding is in the examples/getting_started/index.html file in the SDK download. Here's how our home page looks now:

    @example raw preview portrait
    Ext.application({
        name: 'Sencha',

        launch: function() {
            Ext.create("Ext.TabPanel", {
                fullscreen: true,
                tabBarPosition: 'bottom',
                
                items: [
                    {
                        title: 'Home',
                        iconCls: 'home',
                        cls: 'home',
                        
                        html: [
                            '<img src="http://staging.sencha.com/img/sencha.png" />',
                            '<h1>Welcome to Sencha Touch</h1>',
                            "<p>You're creating the Getting Started app. This demonstrates how ",
                            "to use tabs, lists and forms to create a simple app</p>",
                            '<h2>Sencha Touch (2.0.0pr1)</h2>'
                        ].join("")
                    }
                ]
            });
        }
    });

Now that we have a decent looking home page, let's expand it to show a list of our latest blog posts on a separate tab. To get started we'll just fake the data - in this case a few recent posts from [http://sencha.com/blog](sencha.com/blog). The code for the list is within the home page tab; click the Preview to see it run:

    @example raw portrait
    Ext.application({
        name: 'Sencha',

        launch: function() {
            Ext.create("Ext.TabPanel", {
                fullscreen: true,
                tabBarPosition: 'bottom',
            
                items: [
                    {
                        title: 'Home',
                        iconCls: 'home',
                        cls: 'home',
                        html: [
                            '<img width="65%" src="http://staging.sencha.com/img/sencha.png" />',
                            '<h1>Welcome to Sencha Touch</h1>',
                            "<p>You're creating the Getting Started app. This demonstrates how ",
                            "to use tabs, lists and forms to create a simple app</p>",
                            '<h2>Sencha Touch (2.0.0pr1)</h2>'
                        ].join("")
                    },
                    {
                        xtype: 'list',
                        title: 'Blog',
                        iconCls: 'star',
                        
                        itemTpl: '{title}',
                        store: {
                            fields: ['title', 'url'],
                            data: [
                                {title: 'Ext Scheduler 2.0', url: 'ext-scheduler-2-0-upgrading-to-ext-js-4'},
                                {title: 'Previewing Sencha Touch 2', url: 'sencha-touch-2-what-to-expect'},
                                {title: 'Sencha Con 2011', url: 'senchacon-2011-now-packed-with-more-goodness'},
                                {title: 'Documentation in Ext JS 4', url: 'new-ext-js-4-documentation-center'}
                            ]
                        }
                    }
                ]
            }).setActiveItem(1);
        }
    });

We'll come back and add some logic to open up the blog posts later, but for now let's finish the app by adding a contact form. We'll add a third and final tab, this time with a form panel and a fieldset, like this:

    @example raw preview portrait
    //We've added a third and final item to our tab panel - scroll down to see it
    Ext.application({
        name: 'Sencha',

        launch: function() {
            Ext.create("Ext.TabPanel", {
                fullscreen: true,
                tabBarPosition: 'bottom',
        
                items: [
                    {
                        title: 'Home',
                        iconCls: 'home',
                        cls: 'home',
                        html: [
                            '<img width="65%" src="http://staging.sencha.com/img/sencha.png" />',
                            '<h1>Welcome to Sencha Touch</h1>',
                            "<p>You're creating the Getting Started app. This demonstrates how ",
                            "to use tabs, lists and forms to create a simple app</p>",
                            '<h2>Sencha Touch (2.0.0pr1)</h2>'
                        ].join("")
                    },
                    {
                        xtype: 'list',
                        title: 'Blog',
                        iconCls: 'star',
                    
                        itemTpl: '{title}',
                        store: {
                            fields: ['title', 'url'],
                            data: [
                                {title: 'Ext Scheduler 2.0', url: 'ext-scheduler-2-0-upgrading-to-ext-js-4'},
                                {title: 'Previewing Sencha Touch 2', url: 'sencha-touch-2-what-to-expect'},
                                {title: 'Sencha Con 2011', url: 'senchacon-2011-now-packed-with-more-goodness'},
                                {title: 'Documentation in Ext JS 4', url: 'new-ext-js-4-documentation-center'}
                            ]
                        }
                    },
                    //this is the new item
                    {
                        title: 'Contact',
                        iconCls: 'user',
                        xtype: 'formpanel',
                        url: 'contact.php',
                        layout: 'vbox',
                        
                        items: [
                            {
                                xtype: 'fieldset',
                                title: 'Contact Us',
                                instructions: '(email address is optional)',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        label: 'Name'
                                    },
                                    {
                                        xtype: 'emailfield',
                                        label: 'Email'
                                    },
                                    {
                                        xtype: 'textareafield',
                                        label: 'Message'
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                text: 'Send',
                                ui: 'confirm',
                                handler: function() {
                                    this.up('formpanel').submit();
                                }
                            }
                        ]
                    }
                ]
            }).setActiveItem(2);
        }
    });

As our third item we added a form which contains three fields and a submit button. We used a vbox [layout](#!/guide/layouts) to position the button underneath the fieldset. The fieldset itself is configured with a {@link Ext.form.FieldSet#title title} and some {@link Ext.form.FieldSet#instructions instructions}. Finally, we used a {@link Ext.field.Text textfield}, an {@link Ext.field.Email email field} and a {@link Ext.field.TextArea text area}.

You can find the full source code of the getting started app in the examples/getting_started folder of the Sencha Touch 2.0 SDK download.

## Further Reading

Now that we've put a very basic app together, it's time to explore the rest of the framework. You can learn more from the following guides and component examples.

### Guides

* [Components and Containers](#!/guide/components)
* [The Layout System](#!/guide/layouts)
* [The Data Package](#!/guide/data)
* [What's New in Sencha Touch 2](#!/guide/whats_new)

### Application Examples

* [Kitchen Sink](#!/example/kitchensink/index.html)
* [Twitter](#!/example/twitter/index.html)
* [Kiva](#!/example/kiva/index.html)

### Component Examples

* [Carousel](#!/example/carousel/index.html)
* [Forms](#!/example/forms/index.html)
* [Date Picker](#!/example/picker/index.html)