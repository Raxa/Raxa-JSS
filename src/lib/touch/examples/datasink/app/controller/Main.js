Ext.define('DataSink.controller.Main', {
    extend: 'Ext.app.Controller',

    stores: [
        'Demos',
        
        'sorting.Local',
        'sorting.Remote',

        'filtering.Local',
        'filtering.Remote',

        'associations.Users'
    ],

    refs: [
        {
            ref: 'viewport',
            selector: 'app-viewport'
        },
        {
            ref: 'list',
            selector: '#demo-list'
        }
    ],

    init: function() {
        this.control({
            'app-viewport > list': {
                select: 'onSelect'
            }
        });

        this.checkForHash();
    },

    checkForHash: function() {
        var index = parseInt(window.location.hash.replace('#', ''), 10),
            animation = this.getViewport().getLayout().getAnimation().getInAnimation(),
            duration = animation.getDuration();
        
        //defaults to 0
        if (!Ext.isNumber(index)) {
            index = 0;
        }

        animation.setDuration(0);
        this.getList().select(index);
        animation.setDuration(duration);
    },
    
    previousSelectedItemIndex: -1,
    
    onSelect: function(list, record) {
        var store = list.getStore(),
            className = this.getClassName(record),
            oldIndex = this.previousSelectedItemIndex,
            newIndex = store.indexOf(record),
            view;
        
        //reverse the animation if the item is before the previous item
        if (oldIndex > newIndex) {
            this.getViewport().getLayout().getAnimation().setReverse(true);
        }

        //create the view instance and set it as the active item
        view = Ext.create(className);
        this.getViewport().setActiveItem(view);

        //revert the animation direction
        this.getViewport().getLayout().getAnimation().setReverse(false);

        //set the new previous selected item index
        this.previousSelectedItemIndex = newIndex;

        //set the window hash
        window.location.hash = newIndex;
    },

    /**
     * Returns a className string for a specified record (for a view)
     */
    getClassName: function(record) {
        var category = record.get('category'),
            type = record.get('type'),
            classNamePrefix = "DataSink.view.demos.",
            className = "";
        
        className += category.toLowerCase() + '.';
        className += Ext.String.capitalize(type.replace(' ', ''));

        console.log(className);

        return classNamePrefix + className;
    }

    // getClassName: function(record) {
    //     var text = record.get('text'),
    //         names = text.split('-'),
    //         classNamePrefix = "DataSink.view.demos.",
    //         className = "",
    //         ln = names.length,
    //         i, name, fn;
        
    //     fn = function(string) {
    //         className += Ext.String.capitalize(string.replace(' ', ''));
    //     };

    //     for (i = 0; i < ln; i++) {
    //         name = names[i];
    //         name.split(' ').forEach(fn);
            
    //         if (i < (ln - 1)) {
    //             className += '.';
    //             className = className.toLowerCase();
    //         }
    //     }

    //     return classNamePrefix + className;
    // }
});
