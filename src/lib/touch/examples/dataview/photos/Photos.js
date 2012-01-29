Ext.define('Photos.view.Photos', {
    extend: 'Ext.DataView2',
    store: 'Photos.store.AllPhotos',
    
    //these would be determined automatically by the DataView
    itemsPerRow: 7,
    itemHeight: 40,
    
    //the above would be calculated with an algorithm like this:
    _renderItems: function() {
        /**
         * 1. render the first 10 items, see where the bottom of the last component's el is
         * 2. if it's 200px down a 500px high DataView then we render (500 - 200)/200 = 1.5x more components,
         *   so now we have 25 rendered in total (might be good to always add .5 - e.g. 2x in this case)
         * 3. Do a final check to see if we need to render any more items
         * 4. On each render, fetch the top and bottom px values of each component
         * 4. Set up listeners on the scroller. 
         */
        
        
        /**
         * Render first 10 items, see what the 'top' value of the last item is.
         * If it's zero, render more items until it goes up. Stop at some arbitrary number if it never goes aboce zero
         * Count how many components it took until one was not top: 0px. Set itemsPerRow to this number
         * Get the height of the first component, set itemHeight to this
         * Now, set DataView's inner height to (Math.ceil(store.getCount() / itemsPerRow) * itemHeight)
         */
         
         
        /**
         * Now that we know the height of each row and how many items there are per row, and also the height and width
         * of the DataView itself, we can render enough components to fill the space. Get the following:
         * 1. rowCount, which is Math.ceil(DataView.height / itemHeight)
         * 2. colCount = itemsPerRow
         * 3. itemsToRender = (rowCount + 1) * colCount
         * 
         * With a rowCount of 7 and a colCount of 6 we'd get 48 items to render because we always render one additional row
         */
        
        /**
         * Set up listeners on the scroller. Whenever we go 5 rows away from a given item, queue it for derendering
         * Whenever we come within 5 rows of a component render its row and the next 3 rows (all numbers variable...)
         */
    },
    
    itemTpl: [
        "<img class='image' src='tinysrc.com/{photo}?height=40px.jpg">
    ]
})