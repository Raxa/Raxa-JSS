# Using DataViews in Sencha Touch 2

DataView makes it easy to create lots of components dynamically, usually based off a {@link Ext.data.Store Store}.
It's great for rendering lots of data from your server backend or any other data source and is what powers
components like {@link Ext.List}.

Use DataView whenever you want to show sets of the same component many times, for examples in apps like these:

* List of messages in an email app
* Showing latest news/tweets
* Tiled set of albums in an HTML5 music player

## Creating a Simple DataView

At its simplest, a DataView is just a Store full of data and a simple template that we use to render each item:

    var touchTeam = Ext.create('Ext.DataView', {
        store: {
            fields: ['name', 'age'],
            data: [
                {name: 'Jamie Avins',  age: 100},
                {name: 'Rob Dougan',   age: 21},
                {name: 'Tommy Maintz', age: 24},
                {name: 'Jacky Nguyen', age: 24},
                {name: 'Ed Spencer',   age: 26}
            ]
        },

        itemConfig: {
            tpl: '{name} is {age} years old'
        }
    });

Here we just defined everything inline so it's all local with nothing being loaded from a server. For each of the 5
data items defined in our Store, DataView will render a {@link Ext.Component Component} and pass in the name and age
data. The component will use the tpl we provided above, rendering the data in the curly bracket placeholders we
provided.

Because DataView is integrated with Store, any changes to the Store are immediately reflected on the screen. For
example, if we add a new record to the Store it will be rendered into our DataView:

    touchTeam.getStore().add({
        name: 'Abe Elias',
        age: 33
    });

We didn't have to manually update the DataView, it's just automatically updated. The same happens if we modify one
of the existing records in the Store:

    touchTeam.getStore().getAt(0).set('age', 42);

This will get the first record in the Store (Jamie), change the age to 42 and automatically update what's on the
screen.

## Loading data from a server

We often want to load data from our server or some other web service so that we don't have to hard code it all
locally. Let's say we want to load all of the latest tweets about Sencha Touch into a DataView, and for each one
render the user's profile picture, user name and tweet message. To do this all we have to do is modify the
{@link Ext.dataview.DataView#store store} and {@link Ext.dataview.DataView#itemConfig itemConfig} a little:

    Ext.create('Ext.DataView', {
        fullscreen: true,
        store: {
            autoLoad: true,
            fields: ['from_user', 'text', 'profile_image_url'],

            proxy: {
                type: 'jsonp',
                url: 'http://search.twitter.com/search.json?q=Sencha Touch',

                reader: {
                    type: 'json',
                    root: 'results'
                }
            }
        },

        itemConfig: {
            tpl: '<img src="{profile_image_url}" /><h2>{from_user}</h2><p>{text}</p>'
        }
    });

The Store no longer has hard coded data, instead we've provided a {@link Ext.data.proxy.Proxy Proxy}, which fetches
the data for us. In this case we used a JSON-P proxy so that we can load from Twitter's JSON-P search API. We also
specified the fields present for each tweet, and used Store's {@link Ext.data.Store#autoLoad autoLoad} configuration
to load automatically. Finally, we configured a Reader to decode the response from Twitter, telling it to expect
JSON and that the tweets can be found in the 'results' part of the JSON response.

The last thing we did is update our template to render the image, twitter username and message. All we need to do
now is add a little CSS to style the list the way we want it and we end up with this
