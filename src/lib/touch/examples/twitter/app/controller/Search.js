/*
 * @class Twitter.controller.Search
 * @extends Ext.app.Controller
 *
 * This controller is the main, and only controller for this application. It handles all the views and functionality
 * of this application.
 */
Ext.define('Twitter.controller.Search', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase()
    },

    views : [
        'Main',
        'SearchBar',
        'SearchList',
        'TweetList'
    ],

    stores: ['Searches'],

    refs: [
        {
            ref       : 'main',
            selector  : 'mainview',
            xtype     : 'mainview',
            autoCreate: true
        },
        {
            ref: 'searchContainer',
            selector: '#searchcontainer'
        },
        {
            ref     : 'searchBar',
            selector: 'searchbar'
        },
        {
            ref     : 'searchList',
            selector: 'searchlist'
        },
        {
            ref     : 'tweetList',
            selector: 'tweetlist'
        },
        {
            ref: 'tweetToolbar',
            selector: 'tweetlist toolbar'
        },
        {
            ref     : 'searchField',
            selector: 'searchbar > searchfield'
        }
    ],

    init: function() {
        // Here we call the control method, which allows us to pass componentQuery selectors and add event listeners
        // using those selectors. This means that the components don't actually have the be rendered at this time.
        this.control({
            'searchlist': {
                select: this.onSearchSelect,
                itemswipe: this.onSearchSwipe
            },

            'searchlist searchlistitem button': {
                tap: this.onSearchDelete
            },

            'searchbar > searchfield': {
                keyup: this.onSearch
            },

            'tweetlist': {
                itemtap: this.onTweetTap
            },

            'tweetlist toolbar button': {
                tap: this.onBackButtonTap
            }
        });

        // Add a listener to the searches store, so when it loads we can call our own method
        var searchesStore = this.getSearchesStore();
        searchesStore.on({
            scope: this,

            load: 'onSearchesStoreLoad'
        });

        // LocalStorage is not working right now. For now, we can just call the above method ourselves.
        // When it is fixed, we should just call load on the store
        this.onSearchesStoreLoad();
    },

    /**
     * Called when the {@link #profile} configuration has changed. The value of this configuration should be either "desktop",
     * "tablet" or "phone". We then change the layout of the application based on what device it is.
     */
    updateProfile: function(profile) {
        this.getMain();
        var searchContainer = this.getSearchContainer(),
            tweetToolbar    = this.getTweetToolbar();

        if (profile == "phone") {
            // all we need to do for phones is show the toolbar at the top of the tweetList
            tweetToolbar.show();
        } else {
            // for all other devices, we dock the searchContainer to the left and give it a fixed width
            searchContainer.setDocked('left');
            searchContainer.setWidth(250);
        }
    },

    /**
     * Called when the searchesStore has been loaded from localStorage. If it is NOT a phone, it will select one of the searches
     * from the list, now that it is loaded.
     * We don't want to select a search when it is loaded on a phone, as it would trigger the tweetList view to display.
     */
    onSearchesStoreLoad: function() {
        var searchList    = this.getSearchList(),
            searchesStore = this.getSearchesStore(),
            profile       = this.getProfile(),
            model;

        model = searchesStore.getAt(0);
        if (model && profile != "phone") {
            searchList.select(model);
        }
    },

    /**
     * Called when the back button is tapped in the toolbar at the top of the tweetsList. This is only visible on phones, and it
     * sets the active view of the app to the searchContainer
     */
    onBackButtonTap: function() {
        var main            = this.getMain(),
            profile         = this.getProfile(),
            searchContainer = this.getSearchContainer();

        if (profile == "phone") {
            main.setActiveItem(searchContainer);
        }
    },

    /**
     * Called when a search is selected from the searchList. It sets the store of the tweetList to the tweets() store of the selected
     * search isntance. If the device is a phone, we set the active item to the tweetList. If it is now, we just ensure the tweetList
     * is visible
     */
    onSearchSelect: function(list, search) {
        var store = search.tweets(),
            profile = this.getProfile(),
            main = this.getMain(),
            searchList = this.getSearchList(),
            tweetList = this.getTweetList();

        tweetList.setStore(store);
        store.load();

        if (profile == "phone") {
            main.setActiveItem(tweetList);

            //hack to deselect an item.
            setTimeout(function() {
                searchList.deselect(search);
            }, 500);
        } else {
            tweetList.show();
        }
    },

    /**
     * Called when an item in the searchList is swiped. It will show the delete button in the swiped item.
     */
    onSearchSwipe: function(dataview, index, target) {
        //set the currentDeleteButton so we know what is it to hide it in the listener below
        this.currentDeleteButton = target.getDeleteButton();
        this.currentDeleteButton.show();

        //add a listener to the body, so we can hide the button if the user taps anywhere but the button.
        Ext.getBody().on('tap', this.onBodyTap, this);
    },

    /**
     * Called when the user taps on the body. Hides the delete button and removes the listener from the body.
     */
    onBodyTap: function(e) {
        if (this.currentDeleteButton) {
            this.currentDeleteButton.hide();
        }

        //remove the listener
        Ext.getBody().un('tap', this.onBodyTap, this);
    },

    /**
     * Called when a user taps on an item in the tweetList. This is used to check if the element the user tapped on is a hashtag.
     * If it is a hashtag, we get watchever that hashtag is and call {@link #doSearch} with it.
     * We could possibly extend this to users, too.
     */
    onTweetTap: function(list, index, target, record, e) {
        target = Ext.get(e.target);

        if (target && target.dom && target.hasCls('hashtag')) {
            this.doSearch(target.dom.innerHTML);
        }
    },

    /**
     * Called when a use taps the delete button on a searchList item
     */
    onSearchDelete: function(button, e) {
        var item   = button.getParent(),
            search = item.getRecord();

        this.fireAction('destroy', [search, button], 'doDestroy');
    },

    /**
     * Removes a specified search record from the searches store. If it is not a phone, it will select the nearest
     * search record in the searchesStore, and make the tweets for the search visible
     */
    doDestroy: function(search, button) {
        var searchesStore = this.getSearchesStore(),
            searchList    = this.getSearchList(),
            index         = searchesStore.indexOf(search),
            profile       = this.getProfile(),
            newSearch;
        
        //remove the item from the store, and hide the button
        searchesStore.remove(search);
        searchesStore.sync();
        button.hide();

        //check if another search exists in the store.
        newSearch = searchesStore.getAt(index - 1);
        if (profile != "phone") {
            if (newSearch) {
                searchList.select(newSearch);
            } else {
                //hide the search list if there is no other searches to select (so tweets for the current search doesnt continue to display)
                tweetList.hide();
            }
        }
    },

    /**
     * Called on the keyup event of the search field. If the enter/return key was pressed, it will fire the search action.
     */
    onSearch: function(field, e) {
        var keyCode = e.event.keyCode,
            searchField = this.getSearchField();

        //the return keyCode is 13.
        if (keyCode == 13) {
            //fire the search action with the current value of the searchField
            this.fireAction('search', [searchField.getValue()], 'doSearch');
        }
    },

    /**
     * Called with the search action above. Searches twitter for a specified search term or record
     */
    doSearch: function(search) {
        var model         = this.getModel('Search'),
            tweetList     = this.getTweetList(),
            searchList    = this.getSearchList(),
            searchesStore = this.getSearchesStore(),
            searchField   = this.getSearchField(),
            query, index;

        // ensure there is a search...
        if (!search) {
            return;
        }

        //ensure the tweetlist is visisble
        tweetList.show();

        //check if ths search already exists in the searchesStore
        index = searchesStore.find('query', search);
        if (index != -1) {
            //it exists, so lets just select it
            search = searchesStore.getAt(index);

            searchList.select(search);

            //empty the field and blur it so it looses focus
            searchField.setValue('');
            searchField.blur();

            return;
        }

        //if the passed argument is not an instance of a Search mode, create a new instance
        if (!(search instanceof Twitter.model.Search)) {
            query = search.replace("%20", " ");
            search = new model({
                query: query
            });
        }

        //add the new search instance to the searchsStore
        searchesStore.add(search);
        searchesStore.sync();

        // select the new record in the list
        searchList.select(search);

        //empty the field and remove focus from it
        searchField.setValue('');

        //When localStorage works, uncomment this line
        // searchesStore.sync();
        searchField.blur();
    }
});
